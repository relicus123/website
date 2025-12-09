import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import HeroBanner from "@/models/HeroBanner";

/**
 * GET /api/banners
 * Fetch active hero banners for public display
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const now = new Date();

    const banners = await HeroBanner.find({
      isActive: true,
      $or: [
        { startDate: { $lte: now }, endDate: { $gte: now } },
        { startDate: { $exists: false }, endDate: { $exists: false } },
        { startDate: { $lte: now }, endDate: { $exists: false } },
      ],
    })
      .sort({ displayOrder: 1, createdAt: -1 })
      .select("title imageUrl link displayOrder")
      .lean();

    return NextResponse.json({
      success: true,
      banners,
    });
  } catch (error) {
    console.error("❌ Error fetching banners:", error);
    return NextResponse.json(
      { error: "Failed to fetch banners" },
      { status: 500 }
    );
  }
}
