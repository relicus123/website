import connectDB from "@/lib/mongodb";
import Physiologist from "@/models/Physiologist";

/**
 * Seed script to populate database with sample physiologists
 * Run once to initialize data: node --loader ts-node/esm src/scripts/seedDoctors.ts
 * Or create an API endpoint to trigger this
 */

const sampleDoctors = [
  {
    name: "Dr. Anjali Sharma",
    email: "anjali.sharma@example.com",
    phone: "+91-9876543210",
    specialty: "Musculoskeletal",
    experience: 12,
    bio: "Specializing in sports injuries and rehabilitation with over a decade of experience.",
    qualifications: ["BPT", "MPT (Orthopedics)", "Certified Manual Therapist"],
    languages: ["English", "Hindi", "Punjabi"],
    availability: [
      {
        day: "Monday",
        slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      },
      { day: "Tuesday", slots: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
      {
        day: "Wednesday",
        slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      },
      { day: "Thursday", slots: ["09:00", "10:00", "14:00", "15:00"] },
      {
        day: "Friday",
        slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      },
    ],
    pricePerSession: 1500,
    verified: true,
    rating: 4.9,
    reviewCount: 127,
  },
  {
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91-9876543211",
    specialty: "Neurological",
    experience: 15,
    bio: "Expert in stroke rehabilitation and neurological physiotherapy.",
    qualifications: [
      "BPT",
      "MPT (Neurology)",
      "PhD in Rehabilitation Sciences",
    ],
    languages: ["English", "Hindi", "Tamil"],
    availability: [
      { day: "Monday", slots: ["10:00", "11:00", "15:00", "16:00", "17:00"] },
      { day: "Tuesday", slots: ["10:00", "11:00", "15:00", "16:00", "17:00"] },
      { day: "Wednesday", slots: ["10:00", "11:00", "15:00", "16:00"] },
      { day: "Friday", slots: ["10:00", "11:00", "15:00", "16:00", "17:00"] },
      { day: "Saturday", slots: ["09:00", "10:00", "11:00"] },
    ],
    pricePerSession: 2000,
    verified: true,
    rating: 4.8,
    reviewCount: 98,
  },
  {
    name: "Dr. Priya Menon",
    email: "priya.menon@example.com",
    phone: "+91-9876543212",
    specialty: "Sports Rehabilitation",
    experience: 8,
    bio: "Passionate about helping athletes return to peak performance after injury.",
    qualifications: [
      "BPT",
      "MPT (Sports)",
      "Certified Strength & Conditioning Specialist",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    availability: [
      { day: "Monday", slots: ["08:00", "09:00", "10:00", "16:00", "17:00"] },
      { day: "Tuesday", slots: ["08:00", "09:00", "10:00", "16:00", "17:00"] },
      {
        day: "Wednesday",
        slots: ["08:00", "09:00", "10:00", "16:00", "17:00"],
      },
      { day: "Thursday", slots: ["08:00", "09:00", "10:00", "16:00", "17:00"] },
      { day: "Friday", slots: ["08:00", "09:00", "10:00"] },
    ],
    pricePerSession: 1800,
    verified: true,
    rating: 4.9,
    reviewCount: 76,
  },
  {
    name: "Dr. Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91-9876543213",
    specialty: "Cardiopulmonary",
    experience: 10,
    bio: "Focused on cardiac and respiratory rehabilitation for comprehensive recovery.",
    qualifications: [
      "BPT",
      "MPT (Cardiopulmonary)",
      "Certified Cardiac Rehab Specialist",
    ],
    languages: ["English", "Hindi", "Marathi"],
    availability: [
      { day: "Monday", slots: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
      { day: "Tuesday", slots: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
      { day: "Thursday", slots: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
      { day: "Friday", slots: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
      { day: "Saturday", slots: ["09:00", "10:00", "11:00"] },
    ],
    pricePerSession: 1700,
    verified: true,
    rating: 4.7,
    reviewCount: 64,
  },
];

export async function seedDoctors() {
  try {
    await connectDB();

    // Clear existing doctors (optional - remove in production)
    await Physiologist.deleteMany({});
    console.log("🗑️  Cleared existing doctors");

    // Insert sample doctors
    const insertedDoctors = await Physiologist.insertMany(sampleDoctors);
    console.log(`✅ Seeded ${insertedDoctors.length} doctors successfully`);

    return insertedDoctors;
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
}

// Uncomment to run directly with ts-node
// seedDoctors().then(() => process.exit(0));
