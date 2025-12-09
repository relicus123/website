import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import HeroBanner from "@/models/HeroBanner";

/**
 * GET /api/admin/banners/[id]
 * Fetch single banner by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const banner = await HeroBanner.findById(params.id);

    if (!banner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      banner,
    });
  } catch (error) {
    console.error("❌ Error fetching banner:", error);
    return NextResponse.json(
      { error: "Failed to fetch banner" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/banners/[id]
 * Update banner
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const banner = await HeroBanner.findByIdAndUpdate(
      params.id,
      {
        title,
        imageUrl,
        link,
        displayOrder,
        isActive,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      },
      { new: true, runValidators: true }
    );

    if (!banner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      banner,
    });
  } catch (error) {
    console.error("❌ Error updating banner:", error);
    return NextResponse.json(
      { error: "Failed to update banner" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/banners/[id]
 * Delete banner
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const banner = await HeroBanner.findByIdAndDelete(params.id);

    if (!banner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting banner:", error);
    return NextResponse.json(
      { error: "Failed to delete banner" },
      { status: 500 }
    );
  }
}
