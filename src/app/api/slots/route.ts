import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Physiologist from "@/models/Physiologist";

export const dynamic = "force-dynamic";

/**
 * GET /api/slots
 * Returns available slots for a specific doctor on a given date
 * Phase A: The Filter - subtracts confirmed/paid bookings
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctorId");
    const date = searchParams.get("date"); // Format: YYYY-MM-DD

    if (!doctorId || !date) {
      return NextResponse.json(
        { error: "doctorId and date are required" },
        { status: 400 }
      );
    }

    // Fetch doctor details
    const doctor = await Physiologist.findById(doctorId).lean();
    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    // Parse the requested date
    const requestedDate = new Date(date);
    const dayName = requestedDate.toLocaleDateString("en-US", {
      weekday: "long",
    });

    // Find doctor's availability for this day
    const dayAvailability = doctor.availability.find(
      (avail) => avail.day === dayName
    );

    if (!dayAvailability || !dayAvailability.slots.length) {
      return NextResponse.json({
        availableSlots: [],
        message: "Doctor not available on this day",
      });
    }

    // Get all booked slots for this doctor on this date (PAID or PENDING status)
    const startOfDay = new Date(requestedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(requestedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const bookedSlots = await Booking.find({
      doctor: doctorId,
      date: { $gte: startOfDay, $lte: endOfDay },
      paymentStatus: { $in: ["PAID", "PENDING"] },
    })
      .select("timeSlot")
      .lean();

    const bookedTimeSlots = bookedSlots.map((booking) => booking.timeSlot);

    // Filter out booked slots
    const availableSlots = dayAvailability.slots.filter(
      (slot) => !bookedTimeSlots.includes(slot)
    );

    return NextResponse.json({
      availableSlots,
      doctorName: doctor.name,
      pricePerSession: doctor.pricePerSession,
      date: date,
    });
  } catch (error) {
    console.error("❌ Error fetching slots:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
