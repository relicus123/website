import { NextRequest, NextResponse } from "next/server";
import { seedDoctors } from "@/scripts/seedDoctors";

/**
 * GET /api/seed
 * Trigger database seeding (use once for initial setup)
 * Remove or protect this endpoint in production
 */
export async function GET(request: NextRequest) {
  try {
    // Optional: Add authentication check here in production
    // const authHeader = request.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.SEED_SECRET}`) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    await seedDoctors();

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully with sample doctors",
    });
  } catch (error) {
    console.error("❌ Seeding API failed:", error);
    return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
  }
}
