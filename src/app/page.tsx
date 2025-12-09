import connectDB from "@/lib/mongodb";
import Therapist from "@/models/Therapist";
import HomeClient from "@/components/HomeClient";

export const dynamic = "force-dynamic";

async function getDoctors() {
  try {
    await connectDB();
    const therapists = await Therapist.find({ isActive: true }).sort({
      createdAt: -1,
    });

    return therapists.map((t) => ({
      _id: t._id.toString(),
      name: t.name,
      specialty: t.designation,
      bio: t.bio,
      qualifications: t.specialties || [],
      languages: ["English", "Hindi"],
      pricePerSession: t.price,
      imageUrl: t.photo,
      rating: 5.0,
      reviewCount: 0,
    }));
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    return [];
  }
}

export default async function HomePage() {
  const doctors = await getDoctors();

  return <HomeClient initialDoctors={doctors} />;
}
