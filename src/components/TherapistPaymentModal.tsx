"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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
  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
      style={{ zIndex: 99999 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-4 sm:p-6 space-y-4 sm:space-y-6 relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-brand-dark">
            Confirm Booking
          </h2>
          <p className="text-xs sm:text-sm text-brand-dark/60">
            Complete your payment
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-brand-light/30 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
          <div className="flex justify-between items-start gap-2">
            <p className="text-sm sm:text-base text-brand-dark/70">
              Therapist:
            </p>
            <p className="font-semibold text-sm sm:text-base text-brand-dark text-right">
              {therapistName}
            </p>
          </div>
          <div className="flex justify-between items-center gap-2 border-t border-brand-light pt-2 sm:pt-3">
            <p className="text-sm sm:text-base text-brand-dark/70">
              Session Price:
            </p>
            <p className="text-lg sm:text-xl font-bold text-brand-green">
              ₹{amount}
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-3 sm:py-2 border border-brand-dark text-brand-dark hover:bg-brand-light/30 font-semibold rounded-lg transition disabled:opacity-50 text-sm sm:text-base min-h-[44px] touch-manipulation"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="flex-1 px-4 py-3 sm:py-2 bg-brand-green hover:bg-brand-dark text-white font-semibold rounded-lg transition disabled:opacity-50 text-sm sm:text-base min-h-[44px] touch-manipulation"
          >
            {loading ? "Processing..." : "Pay ₹" + amount}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
