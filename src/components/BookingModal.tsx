"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import axios from "axios";

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  pricePerSession: number;
}

interface BookingModalProps {
  doctor: Doctor;
  healthScore?: number;
  onClose: () => void;
  onComplete: () => void;
}

export default function BookingModal({
  doctor,
  healthScore,
  onClose,
  onComplete,
}: BookingModalProps) {
  const [step, setStep] = useState<
    "form" | "slots" | "processing" | "success" | "error"
  >("form");

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Form data
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  // Slots data
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Error/Success
  const [errorMessage, setErrorMessage] = useState("");
  const [successBookingId, setSuccessBookingId] = useState("");

  useEffect(() => {
    // Set minimum date to today
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setSelectedDate(`${year}-${month}-${day}`);
  }, []);

  const fetchAvailableSlots = useCallback(async () => {
    setLoadingSlots(true);
    try {
      const response = await axios.get("/api/slots", {
        params: {
          doctorId: doctor._id,
          date: selectedDate,
        },
      });
      setAvailableSlots(response.data.availableSlots);
    } catch (error: any) {
      console.error("Failed to fetch slots:", error);
      setErrorMessage(
        error.response?.data?.error || "Failed to load available slots"
      );
      setStep("error");
    } finally {
      setLoadingSlots(false);
    }
  }, [doctor._id, selectedDate]);

  useEffect(() => {
    if (selectedDate && step === "slots") {
      fetchAvailableSlots();
    }
  }, [fetchAvailableSlots, selectedDate, step]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName || !clientEmail || !clientPhone) {
      alert("Please fill all required fields");
      return;
    }

    setStep("slots");
  };

  const handleSlotSelection = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handlePayment = async () => {
    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }

    setStep("processing");

    try {
      // Create order
      const orderResponse = await axios.post("/api/payment/order", {
        clientName,
        clientEmail,
        clientPhone,
        doctorId: doctor._id,
        date: selectedDate,
        timeSlot: selectedSlot,
        healthScore,
      });

      const { orderId, amount, currency, keyId, bookingId } =
        orderResponse.data;

      // Load Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: keyId,
          amount: amount * 100, // Convert to paise
          currency: currency,
          name: "Physiologist Platform",
          description: `Consultation with ${doctor.name}`,
          order_id: orderId,
          handler: async (response: any) => {
            try {
              // Verify payment
              const verifyResponse = await axios.post("/api/payment/verify", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId,
              });

              if (verifyResponse.data.success) {
                setSuccessBookingId(verifyResponse.data.bookingId);
                setStep("success");
              }
            } catch (error: any) {
              console.error("Payment verification failed:", error);
              setErrorMessage(
                error.response?.data?.error ||
                  "Payment verification failed. Please contact support."
              );
              setStep("error");
            }
          },
          prefill: {
            name: clientName,
            email: clientEmail,
            contact: clientPhone,
          },
          theme: {
            color: "#5f8b70", // brand-green
          },
          modal: {
            ondismiss: () => {
              setStep("slots");
            },
          },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      };

      script.onerror = () => {
        setErrorMessage("Failed to load payment gateway");
        setStep("error");
      };
    } catch (error: any) {
      console.error("Order creation failed:", error);
      setErrorMessage(
        error.response?.data?.error ||
          "Failed to initiate payment. Please try again."
      );
      setStep("error");
    }
  };

  const getTodayMin = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Use portal to render at body level
  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 99999 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="bg-brand-dark text-white p-6 rounded-t-xl flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{doctor.name}</h2>
            <p className="text-brand-blue mt-1">{doctor.specialty}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === "form" && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-dark mb-4">
                Your Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                  placeholder="+91-XXXXXXXXXX"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={getTodayMin()}
                  className="w-full px-4 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                  required
                />
              </div>

              {healthScore !== undefined && (
                <div className="rounded-lg bg-brand-light/50 p-4 text-sm">
                  <p className="text-brand-dark">
                    <span className="font-semibold">
                      Health screening score:
                    </span>{" "}
                    {healthScore}
                  </p>
                  <p className="text-slate-600 text-xs mt-1">
                    This will be shared with your physiologist for better
                    context.
                  </p>
                </div>
              )}

              <button type="submit" className="button-primary w-full">
                Continue to slot selection
              </button>
            </form>
          )}

          {step === "slots" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-brand-dark">
                  Select Time Slot
                </h3>
                <button
                  onClick={() => setStep("form")}
                  className="text-sm text-brand-dark hover:underline"
                >
                  ← Edit details
                </button>
              </div>

              <div className="rounded-lg bg-brand-light/30 p-4 text-sm space-y-1">
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(selectedDate).toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>
                  <span className="font-semibold">Session fee:</span> ₹
                  {doctor.pricePerSession}
                </p>
              </div>

              {loadingSlots ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-slate-600 mt-3">
                    Loading available slots...
                  </p>
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-600">
                    No slots available on this date.
                  </p>
                  <button
                    onClick={() => setStep("form")}
                    className="text-brand-green hover:underline mt-2"
                  >
                    Choose another date
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => handleSlotSelection(slot)}
                        className={`py-3 px-4 rounded-lg border-2 text-sm font-medium transition ${
                          selectedSlot === slot
                            ? "bg-brand-dark text-white border-brand-dark"
                            : "bg-white text-brand-dark border-brand-dark hover:bg-brand-dark/5"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={!selectedSlot}
                    className={`w-full py-3 rounded-lg font-semibold transition ${
                      selectedSlot
                        ? "bg-brand-green text-white hover:bg-brand-dark"
                        : "bg-brand-light text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {selectedSlot
                      ? `Pay ₹${doctor.pricePerSession} & Book`
                      : "Select a slot to continue"}
                  </button>
                </>
              )}
            </div>
          )}

          {step === "processing" && (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-brand-dark mt-4 font-medium">
                Processing payment...
              </p>
              <p className="text-slate-600 text-sm mt-2">
                Please complete the payment in the popup window
              </p>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-slate-600 mb-4">
                Your appointment has been successfully booked. Check your email
                for confirmation details.
              </p>
              <div className="rounded-lg bg-brand-light/50 p-4 text-sm text-left mb-6">
                <p>
                  <span className="font-semibold">Booking ID:</span>{" "}
                  {successBookingId}
                </p>
                <p>
                  <span className="font-semibold">Doctor:</span> {doctor.name}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(selectedDate).toLocaleDateString("en-IN")}
                </p>
                <p>
                  <span className="font-semibold">Time:</span> {selectedSlot}
                </p>
              </div>
              <button onClick={onComplete} className="button-primary">
                Close
              </button>
            </div>
          )}

          {step === "error" && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl text-red-600">×</span>
              </div>
              <h3 className="text-2xl font-bold text-red-600 mb-2">
                Booking Failed
              </h3>
              <p className="text-slate-600 mb-6">{errorMessage}</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setStep("slots")}
                  className="button-primary"
                >
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-brand-dark text-brand-dark rounded-lg hover:bg-brand-light"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
