import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  // Client Info
  clientName: string;
  clientEmail: string;
  clientPhone: string;

  // Doctor Reference
  doctor: mongoose.Types.ObjectId;

  // Slot Info
  date: Date;
  timeSlot: string; // "10:00 AM"

  // Payment Reliability Fields
  paymentStatus: "PENDING" | "PAID" | "REFUNDED" | "FAILED";
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  amountPaid?: number; // In Rupees

  // Health Context (from Chatbot)
  healthScore?: number;

  // Audit Trail
  bookingSource: "DIRECT" | "WEBHOOK";

  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema<IBooking> = new Schema(
  {
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientPhone: { type: String, required: true },

    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Physiologist",
      required: true,
    },

    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "REFUNDED", "FAILED"],
      default: "PENDING",
    },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: String,
    razorpaySignature: String,
    amountPaid: Number,

    healthScore: Number,

    bookingSource: {
      type: String,
      enum: ["DIRECT", "WEBHOOK"],
      default: "DIRECT",
    },
  },
  { timestamps: true }
);

// Compound index to enforce slot uniqueness per doctor
BookingSchema.index({ doctor: 1, date: 1, timeSlot: 1 }, { unique: true });

// Avoid model overwrite in Next.js hot reload
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
