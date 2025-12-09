"use client";

import { useEffect } from "react";

interface ServiceDetailModalProps {
  service: {
    title: string;
    image: string;
    description: string;
  } | null;
  onClose: () => void;
  onFindSpecialist: () => void;
}

export default function ServiceDetailModal({
  service,
  onClose,
  onFindSpecialist,
}: ServiceDetailModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Section */}
        <div className="relative h-80 w-full overflow-hidden bg-brand-light">
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-brand-light transition z-10"
          >
            <svg
              className="w-6 h-6 text-brand-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-brand-dark mb-2">
              {service.title}
            </h2>
            <div className="h-1 w-16 bg-brand-green rounded-full" />
          </div>

          <p className="text-lg text-brand-dark/80 leading-relaxed">
            {service.description}
          </p>

          {/* CTA Section */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onFindSpecialist}
              className="flex-1 bg-brand-green text-white font-semibold py-3 px-4 rounded-lg hover:bg-brand-dark transition shadow-md"
            >
              Find a Specialist
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-lg border-2 border-brand-light text-brand-dark font-semibold hover:bg-brand-light transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
