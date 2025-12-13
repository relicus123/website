import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Physiologist from "@/models/Physiologist";
import { verifyRazorpaySignature, issueRefund } from "@/lib/razorpay";
import { sendBookingConfirmation } from "@/lib/email";

/**
 * POST /api/payment/verify
 * Phase C: Scenario 1 - Happy Path
 * Verifies payment signature and updates booking to PAID
 * Handles race conditions with auto-refund
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !bookingId
    ) {
      return NextResponse.json(
        { error: "Missing payment verification parameters" },
        { status: 400 }
      );
    }

    // Verify signature
    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Find the booking
    const booking = await Booking.findById(bookingId).populate("doctor");
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Race condition check: verify slot is still available
    const startOfDay = new Date(booking.date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(booking.date);
    endOfDay.setHours(23, 59, 59, 999);

    const conflictingBooking = await Booking.findOne({
      _id: { $ne: bookingId }, // Exclude current booking
      doctor: booking.doctor._id,
      date: { $gte: startOfDay, $lte: endOfDay },
      timeSlot: booking.timeSlot,
      paymentStatus: "PAID",
    }).lean();

    if (conflictingBooking) {
      // SCENARIO 3: Race Condition - Slot stolen by another user
      console.warn("⚠️ Race condition detected! Issuing refund...");

      // Issue refund
      await issueRefund(razorpay_payment_id);

      // Update booking status to REFUNDED
      booking.paymentStatus = "REFUNDED";
      booking.razorpayPaymentId = razorpay_payment_id;
      booking.razorpaySignature = razorpay_signature;
      await booking.save();

      return NextResponse.json(
        {
          error: "Slot was already booked by another user. Refund initiated.",
          refund: true,
        },
        { status: 409 }
      );
    }

    // Update booking to PAID
    booking.paymentStatus = "PAID";
    booking.razorpayPaymentId = razorpay_payment_id;
    booking.razorpaySignature = razorpay_signature;
    await booking.save();

    if (process.env.NODE_ENV === "development") {
      console.log("✅ Payment verified and booking confirmed:", booking._id);
    }

    // Send confirmation email
    try {
      const doctor = booking.doctor as any;
      await sendBookingConfirmation(booking.clientEmail, {
        clientName: booking.clientName,
        doctorName: doctor.name,
        date: booking.date.toLocaleDateString("en-IN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        timeSlot: booking.timeSlot,
        amountPaid: booking.amountPaid || 0,
        bookingId: booking._id.toString(),
      });
    } catch (emailError) {
      console.error("⚠️ Email sending failed (non-blocking):", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Booking confirmed successfully",
      bookingId: booking._id.toString(),
    });
  } catch (error) {
    console.error("❌ Payment verification failed:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
