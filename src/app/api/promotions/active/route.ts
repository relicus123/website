import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Ad from "@/models/Ad";

export async function GET() {
  try {
    await connectDB();
    const now = new Date();

    const activeAds = await Ad.find({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(activeAds);
  } catch (error) {
    console.error("Error fetching active ads:", error);
    return NextResponse.json(
      { error: "Failed to fetch active ads" },
      { status: 500 }
    );
  }
}
