import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import Booking from "@/models/Booking";
import connectDB from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { orderId, paymentId, signature, therapistId, userId, amount } =
      await request.json();

    // Validate required fields
    if (!orderId || !paymentId || !signature || !therapistId || !amount) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required payment fields",
        },
        { status: 400 }
      );
    }

    // Verify Razorpay signature
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment verification configuration missing",
        },
        { status: 500 }
      );
    }

    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature !== signature) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment verification failed - Invalid signature",
        },
        { status: 400 }
      );
    }

    // Create booking record
    const booking = await Booking.create({
      therapistId,
      userId: userId || null, // Allow anonymous bookings
      paymentId,
      orderId,
      amount,
      status: "confirmed",
      bookingDate: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          bookingId: booking._id,
          message: "Booking confirmed successfully",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Payment verification failed",
      },
      { status: 500 }
    );
  }
}
