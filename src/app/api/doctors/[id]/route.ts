import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Physiologist from "@/models/Physiologist";

/**
 * GET /api/doctors/[id]
 * Fetch single doctor details by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const doctor = await Physiologist.findById(params.id);

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      doctor,
    });
  } catch (error) {
    console.error("❌ Error fetching doctor:", error);
    return NextResponse.json(
      { error: "Failed to fetch doctor details" },
      { status: 500 }
    );
  }
}
