import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Physiologist from "@/models/Physiologist";
import { verifyWebhookSignature, issueRefund } from "@/lib/razorpay";
import { sendBookingConfirmation, sendRefundNotification } from "@/lib/email";

/**
 * POST /api/webhooks/razorpay
 * Phase C: Scenario 2 - Ghost Payment Recovery
 * Background webhook processing for failed client callbacks
 * Auto-creates bookings from order notes
 * Handles race conditions with auto-refund
 */
export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      console.error("❌ Webhook signature missing");
      return NextResponse.json({ error: "Signature missing" }, { status: 400 });
    }

    // Verify webhook signature
    const isValid = verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.error("❌ Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);
    if (process.env.NODE_ENV === "development") {
      console.log("📥 Webhook received:", event.event);
    }

    // Only process payment.captured events
    if (event.event !== "payment.captured") {
      return NextResponse.json({ message: "Event ignored" }, { status: 200 });
    }

    await connectDB();

    const payment = event.payload.payment.entity;
    const orderId = payment.order_id;
    const paymentId = payment.id;

    // Check if booking already exists with this payment
    const existingBooking = await Booking.findOne({
      razorpayPaymentId: paymentId,
    }).lean();

    if (existingBooking) {
      if (process.env.NODE_ENV === "development") {
        console.log("✅ Booking already processed:", existingBooking._id);
      }
      return NextResponse.json(
        { message: "Already processed" },
        { status: 200 }
      );
    }

    // Find booking by order ID
    const booking = await Booking.findOne({
      razorpayOrderId: orderId,
    }).populate("doctor");

    if (!booking) {
      console.warn("⚠️ No booking found for order:", orderId);

      // Attempt recovery from order notes if booking doesn't exist
      // This handles ghost payments where order was created but booking failed
      try {
        const orderNotes = payment.notes;

        if (!orderNotes || !orderNotes.doctorId) {
          console.error("❌ Cannot recover: missing order notes");
          return NextResponse.json(
            { error: "Cannot recover booking" },
            { status: 400 }
          );
        }

        const doctor = await Physiologist.findById(orderNotes.doctorId);
        if (!doctor) {
          console.error("❌ Doctor not found for recovery");
          return NextResponse.json(
            { error: "Doctor not found" },
            { status: 404 }
          );
        }

        const bookingDate = new Date(orderNotes.date);
        const startOfDay = new Date(bookingDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(bookingDate);
        endOfDay.setHours(23, 59, 59, 999);

        // Race condition check
        const conflictingBooking = await Booking.findOne({
          doctor: orderNotes.doctorId,
          date: { $gte: startOfDay, $lte: endOfDay },
          timeSlot: orderNotes.timeSlot,
          paymentStatus: "PAID",
        });

        if (conflictingBooking) {
          console.warn("⚠️ Race condition in webhook! Issuing refund...");

          // Issue refund
          await issueRefund(paymentId);

          // Send refund notification
          try {
            await sendRefundNotification(orderNotes.clientEmail, {
              clientName: orderNotes.clientName,
              amount: payment.amount / 100,
              reason: "Slot was already booked by another user",
              refundId: paymentId,
            });
          } catch (emailError) {
            console.error("⚠️ Refund email failed (non-blocking):", emailError);
          }

          return NextResponse.json(
            {
              message: "Race condition detected, refund issued",
              refund: true,
            },
            { status: 200 }
          );
        }

        // Create new booking from webhook (recovery path)
        const recoveredBooking = await Booking.create({
          clientName: orderNotes.clientName,
          clientEmail: orderNotes.clientEmail,
          clientPhone: orderNotes.clientPhone,
          doctor: orderNotes.doctorId,
          date: bookingDate,
          timeSlot: orderNotes.timeSlot,
          paymentStatus: "PAID",
          razorpayOrderId: orderId,
          razorpayPaymentId: paymentId,
          amountPaid: payment.amount / 100,
          healthScore: parseInt(orderNotes.healthScore) || undefined,
          bookingSource: "WEBHOOK",
        });

        if (process.env.NODE_ENV === "development") {
          console.log("✅ Booking recovered from webhook:", recoveredBooking._id);
        }

        // Send confirmation email
        try {
          await sendBookingConfirmation(orderNotes.clientEmail, {
            clientName: orderNotes.clientName,
            doctorName: doctor.name,
            date: bookingDate.toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            timeSlot: orderNotes.timeSlot,
            amountPaid: payment.amount / 100,
            bookingId: recoveredBooking._id.toString(),
          });
        } catch (emailError) {
          console.error("⚠️ Email sending failed (non-blocking):", emailError);
        }

        return NextResponse.json({
          success: true,
          message: "Booking recovered via webhook",
          bookingId: recoveredBooking._id.toString(),
        });
      } catch (recoveryError) {
        console.error("❌ Recovery failed:", recoveryError);
        return NextResponse.json({ error: "Recovery failed" }, { status: 500 });
      }
    }

    // Booking exists, update it to PAID
    if (booking.paymentStatus === "PAID") {
      if (process.env.NODE_ENV === "development") {
        console.log("✅ Booking already paid:", booking._id);
      }
      return NextResponse.json({ message: "Already paid" }, { status: 200 });
    }

    // Race condition check for existing booking
    const startOfDay = new Date(booking.date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(booking.date);
    endOfDay.setHours(23, 59, 59, 999);

    const conflictingBooking = await Booking.findOne({
      _id: { $ne: booking._id },
      doctor: booking.doctor._id,
      date: { $gte: startOfDay, $lte: endOfDay },
      timeSlot: booking.timeSlot,
      paymentStatus: "PAID",
    });

    if (conflictingBooking) {
      console.warn("⚠️ Race condition in webhook! Issuing refund...");

      // Issue refund
      await issueRefund(paymentId);

      // Update booking to REFUNDED
      booking.paymentStatus = "REFUNDED";
      booking.razorpayPaymentId = paymentId;
      await booking.save();

      // Send refund notification
      try {
        await sendRefundNotification(booking.clientEmail, {
          clientName: booking.clientName,
          amount: payment.amount / 100,
          reason: "Slot was already booked by another user",
          refundId: paymentId,
        });
      } catch (emailError) {
        console.error("⚠️ Refund email failed (non-blocking):", emailError);
      }

      return NextResponse.json(
        {
          message: "Race condition detected, refund issued",
          refund: true,
        },
        { status: 200 }
      );
    }

    // Update booking to PAID
    booking.paymentStatus = "PAID";
    booking.razorpayPaymentId = paymentId;
    await booking.save();

    if (process.env.NODE_ENV === "development") {
      console.log("✅ Webhook processed, booking confirmed:", booking._id);
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
      message: "Webhook processed successfully",
    });
  } catch (error) {
    console.error("❌ Webhook processing failed:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
