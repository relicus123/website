import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPhysiologist extends Document {
  name: string;
  email: string;
  phone: string;
  specialty: string; // e.g., "Musculoskeletal", "Sports Rehab"
  experience: number; // years
  bio?: string;
  qualifications: string[];
  languages: string[];
  availability: {
    day: string; // "Monday", "Tuesday", etc.
    slots: string[]; // ["09:00", "10:00", "11:00"]
  }[];
  pricePerSession: number; // in Rupees
  imageUrl?: string;
  verified: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const PhysiologistSchema: Schema<IPhysiologist> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    specialty: { type: String, required: true },
    experience: { type: Number, required: true, default: 0 },
    bio: String,
    qualifications: [{ type: String }],
    languages: [{ type: String }],
    availability: [
      {
        day: { type: String, required: true },
        slots: [{ type: String }],
      },
    ],
    pricePerSession: { type: Number, required: true },
    imageUrl: String,
    verified: { type: Boolean, default: false },
    rating: { type: Number, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Avoid model overwrite in Next.js hot reload
const Physiologist: Model<IPhysiologist> =
  mongoose.models.Physiologist ||
  mongoose.model<IPhysiologist>("Physiologist", PhysiologistSchema);

export default Physiologist;
