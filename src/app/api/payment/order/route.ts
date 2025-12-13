import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Physiologist from "@/models/Physiologist";
import { razorpayInstance } from "@/lib/razorpay";

/**
 * POST /api/payment/order
 * Phase B: The Gatekeeper - validates slot availability before creating Razorpay order
 * Embeds booking metadata in order notes for webhook recovery
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      clientName,
      clientEmail,
      clientPhone,
      doctorId,
      date,
      timeSlot,
      healthScore,
    } = body;

    // Validation
    if (
      !clientName ||
      !clientEmail ||
      !clientPhone ||
      !doctorId ||
      !date ||
      !timeSlot
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Fetch doctor
    const doctor = await Physiologist.findById(doctorId).lean();
    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    // Parse date for DB query
    const bookingDate = new Date(date);
    const startOfDay = new Date(bookingDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(bookingDate);
    endOfDay.setHours(23, 59, 59, 999);

    // CRITICAL: Gatekeeper check - ensure slot is still free
    const existingBooking = await Booking.findOne({
      doctor: doctorId,
      date: { $gte: startOfDay, $lte: endOfDay },
      timeSlot: timeSlot,
      paymentStatus: { $in: ["PAID", "PENDING"] },
    }).lean();

    if (existingBooking) {
      return NextResponse.json(
        { error: "Slot no longer available. Please select another time." },
        { status: 409 }
      );
    }

    // Create Razorpay order
    const amountInPaise = doctor.pricePerSession * 100; // Convert to paise

    if (!razorpayInstance) {
      return NextResponse.json(
        { error: "Payment service not configured" },
        { status: 503 }
      );
    }

    const orderOptions = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        // Embed booking details for webhook recovery
        clientName,
        clientEmail,
        clientPhone,
        doctorId: doctorId.toString(),
        date: date,
        timeSlot,
        healthScore: healthScore?.toString() || "0",
      },
    };

    const order = await razorpayInstance.orders.create(orderOptions);

    if (process.env.NODE_ENV === "development") {
      console.log("✅ Razorpay order created:", order.id);
    }

    // Create PENDING booking in database
    const newBooking = await Booking.create({
      clientName,
      clientEmail,
      clientPhone,
      doctor: doctorId,
      date: bookingDate,
      timeSlot,
      paymentStatus: "PENDING",
      razorpayOrderId: order.id,
      amountPaid: doctor.pricePerSession,
      healthScore,
      bookingSource: "DIRECT",
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: doctor.pricePerSession,
      currency: "INR",
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      bookingId: newBooking._id.toString(),
      doctorName: doctor.name,
    });
  } catch (error: any) {
    console.error("❌ Order creation failed:", error);

    // Handle duplicate booking race condition
    if (error.code === 11000) {
      return NextResponse.json(
        {
          error:
            "Slot was just booked by another user. Please try a different time.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create order. Please try again." },
      { status: 500 }
    );
  }
}
