import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Physiologist from "@/models/Physiologist";

/**
 * GET /api/doctors
 * Fetch all verified physiologists
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const doctors = await Physiologist.find({ verified: true })
      .select(
        "name email specialty experience bio qualifications languages pricePerSession imageUrl rating reviewCount"
      )
      .sort({ rating: -1, reviewCount: -1 });

    return NextResponse.json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.error("❌ Error fetching doctors:", error);
    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
}
