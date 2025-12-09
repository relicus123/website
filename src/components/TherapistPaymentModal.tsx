"use client";

import { useState } from "react";

interface TherapistPaymentModalProps {
  isOpen: boolean;
  therapistId: string;
  therapistName: string;
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function TherapistPaymentModal({
  isOpen,
  therapistId,
  therapistName,
  amount,
  onClose,
  onSuccess,
}: TherapistPaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError("");

      // Create order
      const orderResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          therapistId,
          therapistName,
          amount,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        setError("Failed to create payment order");
        return;
      }

      const order = orderData.data;

      // Initialize Razorpay
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        const razorpay = new window.Razorpay({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          order_id: order.id,
          amount: order.amount,
          currency: order.currency,
          name: "Relicus - Therapist Booking",
          description: `Booking with ${therapistName}`,
          handler: async (response: any) => {
            try {
              // Verify payment on backend
              const verifyResponse = await fetch("/api/payments/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  orderId: order.id,
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                  therapistId,
                  therapistName,
                  amount,
                }),
              });

              const verifyData = await verifyResponse.json();

              if (verifyData.success) {
                onSuccess();
                onClose();
              } else {
                setError("Payment verification failed");
              }
            } catch (err) {
              setError("Payment verification error");
              console.error(err);
            }
          },
          prefill: {
            contact: "",
            email: "",
          },
          theme: {
            color: "#5f8b70",
          },
        });
        razorpay.open();
      };
      document.body.appendChild(script);
    } catch (err) {
      setError("Payment initialization failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">
            Confirm Booking
          </h2>
          <p className="text-sm text-brand-dark/60">Complete your payment</p>
        </div>

        {/* Booking Details */}
        <div className="bg-brand-light/30 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <p className="text-brand-dark/70">Therapist:</p>
            <p className="font-semibold text-brand-dark">{therapistName}</p>
          </div>
          <div className="flex justify-between border-t border-brand-light pt-3">
            <p className="text-brand-dark/70">Session Price:</p>
            <p className="text-xl font-bold text-brand-green">₹{amount}</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 border border-brand-dark text-brand-dark hover:bg-brand-light/30 font-semibold rounded-lg transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-brand-green hover:bg-brand-dark text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay ₹" + amount}
          </button>
        </div>
      </div>
    </div>
  );
}
