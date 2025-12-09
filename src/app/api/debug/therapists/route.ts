import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Therapist from "@/models/Therapist";

// GET - Debug endpoint to see all therapists with all fields
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const allTherapists = await Therapist.find({});
    const activeTherapists = await Therapist.find({ isActive: true });

    return NextResponse.json({
      success: true,
      total: allTherapists.length,
      active: activeTherapists.length,
      allTherapists: allTherapists,
      activeTherapists: activeTherapists,
    });
  } catch (error) {
    console.error("Error fetching therapists:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
