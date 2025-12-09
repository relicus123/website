import mongoose, { Schema, Document } from "mongoose";

export interface ITherapist extends Document {
  name: string;
  designation: string;
  photo: string;
  price: number;
  bio?: string;
  specialties?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TherapistSchema = new Schema<ITherapist>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    bio: {
      type: String,
      default: "",
    },
    specialties: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for searching
TherapistSchema.index({ name: "text", designation: "text" });

export default mongoose.models.Therapist ||
  mongoose.model<ITherapist>("Therapist", TherapistSchema);
