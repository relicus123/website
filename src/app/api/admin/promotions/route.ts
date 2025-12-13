import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Ad from "@/models/Ad";

export async function GET() {
  try {
    await connectDB();
    const ads = await Ad.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(ads);
  } catch (error) {
    console.error("Error fetching ads:", error);
    return NextResponse.json({ error: "Failed to fetch ads" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();

    const ad = await Ad.create(body);
    return NextResponse.json(ad, { status: 201 });
  } catch (error) {
    console.error("Error creating ad:", error);
    return NextResponse.json({ error: "Failed to create ad" }, { status: 500 });
  }
}
