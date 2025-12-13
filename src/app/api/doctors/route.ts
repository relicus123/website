import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Therapist from "@/models/Therapist";

export const dynamic = "force-dynamic";

/**
 * GET /api/doctors
 * Fetch all active therapists (replacing legacy Physiologists)
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const therapists = await Therapist.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();

    const PLACEHOLDER_IMAGES = [
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&q=80",
    ];

    // Map Therapist model to the frontend's expected Doctor format
    // Map Therapist model to the frontend's expected Doctor format
    const doctors = therapists.map((t, index) => ({
      _id: t._id,
      name: t.name,
      specialty: t.designation,
      bio: t.bio,
      qualifications: t.specialties || [],
      languages: ["English", "Hindi"], // Default value
      pricePerSession: t.price,
      imageUrl: t.photo || PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length],
      rating: 5.0, // Default value
      reviewCount: 0, // Default value
    }));


    return NextResponse.json(
      { success: true, doctors },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );

  } catch (error) {
    console.error("❌ Error fetching doctors:", error);
    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
}
