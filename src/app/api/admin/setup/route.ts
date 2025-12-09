import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// POST - create initial admin user with ADMIN_SETUP_SECRET
export async function POST(request: NextRequest) {
  try {
    const setupSecret = process.env.ADMIN_SETUP_SECRET;
    if (!setupSecret) {
      return NextResponse.json(
        { success: false, error: "Setup secret not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { secret, email, password, name } = body;

    if (!secret || secret !== setupSecret) {
      return NextResponse.json(
        { success: false, error: "Invalid setup secret" },
        { status: 401 }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashed,
      name: name || "Admin",
      role: "admin",
    });

    return NextResponse.json(
      { success: true, data: { id: user._id, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create admin" },
      { status: 500 }
    );
  }
}
