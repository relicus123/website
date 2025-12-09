import mongoose, { Schema, Document } from "mongoose";

export interface IHeroBanner extends Document {
  title: string;
  imageUrl: string;
  link?: string;
  displayOrder: number;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const HeroBannerSchema = new Schema<IHeroBanner>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      trim: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

HeroBannerSchema.index({ isActive: 1, displayOrder: 1 });

export default mongoose.models.HeroBanner ||
  mongoose.model<IHeroBanner>("HeroBanner", HeroBannerSchema);
