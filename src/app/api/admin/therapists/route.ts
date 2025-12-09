import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Therapist from "@/models/Therapist";

// POST - Create new therapist
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, designation, photo, price, bio, specialties, isActive } =
      body;

    if (!name || !designation || !photo || price === undefined) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const therapist = await Therapist.create({
      name,
      designation,
      photo,
      price,
      bio: bio || "",
      specialties: specialties || [],
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json(
      { success: true, data: therapist },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating therapist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create therapist" },
      { status: 500 }
    );
  }
}

// GET all therapists (admin view)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const therapists = await Therapist.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: therapists });
  } catch (error) {
    console.error("Error fetching therapists:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch therapists" },
      { status: 500 }
    );
  }
}
