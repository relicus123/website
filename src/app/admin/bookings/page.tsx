"use client";

import { useEffect, useMemo, useState, useCallback } from "react";

type Booking = {
  _id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  doctor?: { name: string; email?: string; specialty?: string } | string;
  date: string;
  timeSlot: string;
  paymentStatus: "PENDING" | "PAID" | "REFUNDED" | "FAILED";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  amountPaid?: number;
  bookingSource: "DIRECT" | "WEBHOOK";
  createdAt: string;
};

type Doctor = { _id: string; name: string };

const statusOptions = [
  { label: "All", value: "" },
  { label: "Paid", value: "PAID" },
  { label: "Pending", value: "PENDING" },
  { label: "Refunded", value: "REFUNDED" },
  { label: "Failed", value: "FAILED" },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const [status, setStatus] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (doctorId) params.set("doctorId", doctorId);
    if (search) params.set("search", search);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    params.set("page", String(page));
    params.set("limit", "20");
    return params.toString();
  }, [doctorId, from, page, search, status, to]);

  const loadBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`/api/admin/bookings?${queryString}`);
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to load bookings");
      }
      setBookings(data.data || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err: any) {
      setError(err.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, [queryString]);

  const loadDoctors = async () => {
    try {
      const res = await fetch("/api/doctors");
      if (!res.ok) return;
      const data = await res.json();
      const list: Doctor[] = data.doctors || data.data || [];
      setDoctors(list.map((d: any) => ({ _id: d._id, name: d.name })));
    } catch (err) {
      // non-blocking
    }
  };

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleExport = () => {
    const params = new URLSearchParams(queryString);
    params.set("format", "pdf");
    window.open(`/api/admin/bookings?${params.toString()}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-brand-light">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-brand-dark">Bookings</h1>
            <p className="text-sm text-brand-dark/70">
              View bookings, payments, and export PDF.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="px-4 py-2 rounded-lg bg-white border border-brand-light text-brand-dark shadow-sm hover:bg-brand-light/70"
            >
              Export PDF (filters)
            </button>
          </div>
        </div>

        <div className="bg-white border border-brand-light rounded-xl shadow-sm p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="space-y-1">
            <label className="text-sm text-brand-dark/80">Status</label>
            <select
              value={status}
              onChange={(e) => {
                setPage(1);
                setStatus(e.target.value);
              }}
              className="w-full px-3 py-2 border border-brand-light rounded-lg text-sm"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-brand-dark/80">Doctor</label>
            <select
              value={doctorId}
              onChange={(e) => {
                setPage(1);
                setDoctorId(e.target.value);
              }}
              className="w-full px-3 py-2 border border-brand-light rounded-lg text-sm"
            >
              <option value="">All</option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-brand-dark/80">From</label>
            <input
              type="date"
              value={from}
              onChange={(e) => {
                setPage(1);
                setFrom(e.target.value);
              }}
              className="w-full px-3 py-2 border border-brand-light rounded-lg text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-brand-dark/80">To</label>
            <input
              type="date"
              value={to}
              onChange={(e) => {
                setPage(1);
                setTo(e.target.value);
              }}
              className="w-full px-3 py-2 border border-brand-light rounded-lg text-sm"
            />
          </div>

          <div className="space-y-1 md:col-span-2 lg:col-span-4">
            <label className="text-sm text-brand-dark/80">
              Search (name/email/phone)
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Search client name, email, phone..."
              className="w-full px-3 py-2 border border-brand-light rounded-lg text-sm"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 border border-red-200 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="bg-white border border-brand-light rounded-xl shadow-sm">
          <div className="p-4 flex items-center justify-between text-sm text-brand-dark/70">
            <span>
              Showing {bookings.length} of {total} bookings
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 border border-brand-light rounded-md disabled:opacity-50"
              >
                Prev
              </button>
              <span>
                Page {page} / {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1 border border-brand-light rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-brand-light border-b border-brand-light">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-brand-dark">
                    Client
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-brand-dark">
                    Doctor
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-brand-dark">
                    Date / Time
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-brand-dark">
                    Status
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-brand-dark">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-brand-dark">
                    Source
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-brand-dark">
                    Order
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-brand-dark">
                    Payment
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-brand-dark text-right">
                    Manage
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-6 text-center text-brand-dark/60"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-6 text-center text-brand-dark/60"
                    >
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => {
                    const doctorName =
                      typeof b.doctor === "string" ? b.doctor : b.doctor?.name;
                    const statusColor =
                      b.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-700"
                        : b.paymentStatus === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : b.paymentStatus === "REFUNDED"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700";
                    return (
                      <tr
                        key={b._id}
                        className="border-b border-brand-light hover:bg-brand-light/30"
                      >
                        <td className="px-4 py-3 text-sm text-brand-dark">
                          <div className="font-semibold">{b.clientName}</div>
                          <div className="text-xs text-brand-dark/70">
                            {b.clientEmail}
                          </div>
                          <div className="text-xs text-brand-dark/70">
                            {b.clientPhone}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-brand-dark/80">
                          {doctorName || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-brand-dark/80">
                          {new Date(b.date).toLocaleDateString("en-IN")},{" "}
                          {b.timeSlot}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${statusColor}`}
                          >
                            {b.paymentStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-brand-dark font-semibold">
                          ₹{b.amountPaid ?? 0}
                        </td>
                        <td className="px-4 py-3 text-sm text-brand-dark/70">
                          {b.bookingSource}
                        </td>
                        <td className="px-4 py-3 text-xs text-brand-dark/70 break-all">
                          {b.razorpayOrderId || "-"}
                        </td>
                        <td className="px-4 py-3 text-xs text-brand-dark/70 break-all">
                          {b.razorpayPaymentId || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <button
                            onClick={() => setSelectedBooking(b)}
                            className="px-3 py-2 rounded-lg border border-brand-light text-brand-dark hover:bg-brand-light/70"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSelectedBooking(null)}
            />
            <div className="relative bg-white rounded-2xl shadow-2xl border border-brand-light max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between px-6 py-4 border-b border-brand-light">
                <div>
                  <h2 className="text-xl font-semibold text-brand-dark">
                    Manage Booking
                  </h2>
                  <p className="text-sm text-brand-dark/70">
                    Review details, reach out, or copy references.
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-brand-dark/60 hover:text-brand-dark"
                  aria-label="Close manage dialog"
                >
                  ✕
                </button>
              </div>

              <div className="px-6 py-5 space-y-4 text-sm text-brand-dark">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-brand-light/60 rounded-xl">
                    <div className="text-xs uppercase text-brand-dark/60">
                      Client
                    </div>
                    <div className="font-semibold text-brand-dark">
                      {selectedBooking.clientName}
                    </div>
                    <div className="text-brand-dark/70">
                      {selectedBooking.clientEmail}
                    </div>
                    <div className="text-brand-dark/70">
                      {selectedBooking.clientPhone}
                    </div>
                  </div>
                  <div className="p-3 bg-brand-light/60 rounded-xl">
                    <div className="text-xs uppercase text-brand-dark/60">
                      Doctor
                    </div>
                    <div className="font-semibold text-brand-dark">
                      {typeof selectedBooking.doctor === "string"
                        ? selectedBooking.doctor
                        : selectedBooking.doctor?.name || "-"}
                    </div>
                    {typeof selectedBooking.doctor !== "string" && (
                      <div className="text-brand-dark/70">
                        {selectedBooking.doctor?.specialty ||
                          selectedBooking.doctor?.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 border border-brand-light rounded-xl">
                    <div className="text-xs uppercase text-brand-dark/60">
                      Schedule
                    </div>
                    <div className="font-semibold">
                      {new Date(selectedBooking.date).toLocaleDateString(
                        "en-IN"
                      )}
                      , {selectedBooking.timeSlot}
                    </div>
                    <div className="text-brand-dark/70">
                      Created{" "}
                      {new Date(selectedBooking.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 border border-brand-light rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-xs uppercase text-brand-dark/60">
                        Payment Status
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs bg-brand-light text-brand-dark">
                        {selectedBooking.paymentStatus}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-brand-dark/80">
                      <span>Amount</span>
                      <span className="font-semibold">
                        ₹{selectedBooking.amountPaid ?? 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-brand-dark/80">
                      <span>Source</span>
                      <span className="font-semibold">
                        {selectedBooking.bookingSource}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 border border-dashed border-brand-light rounded-xl space-y-1">
                    <div className="text-xs uppercase text-brand-dark/60">
                      Order ID
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-brand-dark/80 break-all">
                        {selectedBooking.razorpayOrderId || "-"}
                      </span>
                      {selectedBooking.razorpayOrderId && (
                        <button
                          onClick={() =>
                            navigator?.clipboard?.writeText?.(
                              selectedBooking.razorpayOrderId || ""
                            )
                          }
                          className="text-xs px-2 py-1 border border-brand-light rounded-lg text-brand-dark hover:bg-brand-light/70"
                        >
                          Copy
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="p-3 border border-dashed border-brand-light rounded-xl space-y-1">
                    <div className="text-xs uppercase text-brand-dark/60">
                      Payment ID
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-brand-dark/80 break-all">
                        {selectedBooking.razorpayPaymentId || "-"}
                      </span>
                      {selectedBooking.razorpayPaymentId && (
                        <button
                          onClick={() =>
                            navigator?.clipboard?.writeText?.(
                              selectedBooking.razorpayPaymentId || ""
                            )
                          }
                          className="text-xs px-2 py-1 border border-brand-light rounded-lg text-brand-dark hover:bg-brand-light/70"
                        >
                          Copy
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedBooking.clientEmail && (
                    <a
                      href={`mailto:${selectedBooking.clientEmail}`}
                      className="px-3 py-2 rounded-lg bg-brand-dark text-white text-sm"
                    >
                      Email client
                    </a>
                  )}
                  {selectedBooking.clientPhone && (
                    <a
                      href={`tel:${selectedBooking.clientPhone}`}
                      className="px-3 py-2 rounded-lg border border-brand-light text-brand-dark text-sm"
                    >
                      Call client
                    </a>
                  )}
                  {selectedBooking.razorpayPaymentId && (
                    <a
                      href={`https://dashboard.razorpay.com/app/payments/${selectedBooking.razorpayPaymentId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-lg border border-brand-light text-brand-dark text-sm hover:bg-brand-light/70"
                    >
                      Open in Razorpay
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
