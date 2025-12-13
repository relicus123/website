import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Therapist from "@/models/Therapist";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

// GET single therapist
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: "Invalid therapist ID" },
        { status: 400 }
      );
    }

    const therapist = await Therapist.findById(params.id).lean();

    if (!therapist) {
      return NextResponse.json(
        { success: false, error: "Therapist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: therapist });
  } catch (error) {
    console.error("Error fetching therapist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch therapist" },
      { status: 500 }
    );
  }
}

// PUT - Update therapist
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: "Invalid therapist ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const therapist = await Therapist.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!therapist) {
      return NextResponse.json(
        { success: false, error: "Therapist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: therapist });
  } catch (error) {
    console.error("Error updating therapist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update therapist" },
      { status: 500 }
    );
  }
}

// DELETE therapist
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: "Invalid therapist ID" },
        { status: 400 }
      );
    }

    const therapist = await Therapist.findByIdAndDelete(params.id);

    if (!therapist) {
      return NextResponse.json(
        { success: false, error: "Therapist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Therapist deleted" });
  } catch (error) {
    console.error("Error deleting therapist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete therapist" },
      { status: 500 }
    );
  }
}
