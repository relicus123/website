import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import HeroBanner from "@/models/HeroBanner";

/**
 * GET /api/admin/banners
 * Fetch all hero banners (admin view)
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const banners = await HeroBanner.find()
      .sort({ displayOrder: 1, createdAt: -1 })
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

/**
 * POST /api/admin/banners
 * Create a new hero banner
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      title,
      imageUrl,
      link,
      displayOrder,
      isActive,
      startDate,
      endDate,
    } = body;

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: "Title and imageUrl are required" },
        { status: 400 }
      );
    }

    const banner = await HeroBanner.create({
      title,
      imageUrl,
      link,
      displayOrder: displayOrder || 0,
      isActive: isActive !== undefined ? isActive : true,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    });

    return NextResponse.json({
      success: true,
      banner,
    });
  } catch (error) {
    console.error("❌ Error creating banner:", error);
    return NextResponse.json(
      { error: "Failed to create banner" },
      { status: 500 }
    );
  }
}
