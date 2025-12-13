import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Therapist from "@/models/Therapist";

export const dynamic = "force-dynamic";

// GET all therapists or search
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    let therapists;

    if (query) {
      // Search by name or designation
      therapists = await Therapist.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { designation: { $regex: query, $options: "i" } },
        ],
        isActive: true,
      })
        .select("name designation photo price bio specialties")
        .lean();
    } else {
      // Get all active therapists
      therapists = await Therapist.find({ isActive: true })
        .select("name designation photo price bio specialties")
        .sort({ name: 1 })
        .lean();
    }

    return NextResponse.json({ success: true, data: therapists });
  } catch (error) {
    console.error("Error fetching therapists:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch therapists" },
      { status: 500 }
    );
  }
}
