import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Physiologist from "@/models/Physiologist";
import mongoose from "mongoose";

type PaymentStatus = "PENDING" | "PAID" | "REFUNDED" | "FAILED";

function parseDate(value?: string | null) {
  if (!value) return undefined;
  const d = new Date(value);
  return isNaN(d.getTime()) ? undefined : d;
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = req.nextUrl;
    const status = searchParams.get("status") as PaymentStatus | null;
    const doctorId = searchParams.get("doctorId");
    const search = searchParams.get("search");
    const from = parseDate(searchParams.get("from"));
    const to = parseDate(searchParams.get("to"));
    const page = Number(searchParams.get("page") || 1);
    const limit = Math.min(Number(searchParams.get("limit") || 20), 200);
    const format = searchParams.get("format") || "json";

    const filter: Record<string, any> = {};

    if (status && ["PENDING", "PAID", "REFUNDED", "FAILED"].includes(status)) {
      filter.paymentStatus = status;
    }

    if (doctorId && mongoose.Types.ObjectId.isValid(doctorId)) {
      filter.doctor = doctorId;
    }

    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = from;
      if (to) {
        const end = new Date(to);
        end.setHours(23, 59, 59, 999);
        filter.date.$lte = end;
      }
    }

    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { clientName: regex },
        { clientEmail: regex },
        { clientPhone: regex },
      ];
    }

    // Base query
    const query = Booking.find(filter)
      .populate({
        path: "doctor",
        model: Physiologist,
        select: "name email specialty",
      })
      .sort({ createdAt: -1 });

    // PDF export path (no pagination, but cap results to 1000)
    if (format === "pdf") {
      const records = await query.limit(1000).lean();
      const PDFDocument = (await import("pdfkit")).default;

      const doc = new PDFDocument({ margin: 32, size: "A4" });
      const chunks: Uint8Array[] = [];
      doc.on("data", (chunk) => chunks.push(chunk));

      doc.fontSize(16).text("Booking Report", { align: "center" });
      doc.moveDown(0.5);
      doc
        .fontSize(9)
        .fillColor("#555")
        .text(`Generated: ${new Date().toLocaleString()}`);
      if (status) doc.text(`Status: ${status}`);
      if (doctorId) doc.text(`Doctor ID: ${doctorId}`);
      if (search) doc.text(`Search: ${search}`);
      if (from || to)
        doc.text(
          `Date range: ${from?.toDateString() || "-"} -> ${
            to?.toDateString() || "-"
          }`
        );
      doc.moveDown();

      records.forEach((b, idx) => {
        const doctor = (b as any).doctor;
        doc
          .fontSize(11)
          .fillColor("#000")
          .text(`${idx + 1}. ${b.clientName} (${b.clientEmail})`, {
            continued: false,
          });
        doc
          .fontSize(9)
          .fillColor("#444")
          .text(
            `Doctor: ${doctor?.name || "-"} | Status: ${
              b.paymentStatus
            } | Amount: ₹${b.amountPaid ?? 0}`
          );
        doc.text(
          `Date: ${new Date(b.date).toLocaleDateString("en-IN")}, ${
            b.timeSlot
          } | Source: ${b.bookingSource}`
        );
        doc.text(
          `Order: ${b.razorpayOrderId || "-"} | Payment: ${
            b.razorpayPaymentId || "-"
          }`
        );
        doc.moveDown(0.6);
      });

      doc.end();

      const buffer = await new Promise<Buffer>((resolve) => {
        doc.on("end", () => resolve(Buffer.concat(chunks)));
      });

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=bookings.pdf",
        },
      });
    }

    const total = await Booking.countDocuments(filter);
    const data = await query
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
