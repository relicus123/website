"use client";

import Image from "next/image";




interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  bio?: string;
  qualifications: string[];
  pricePerSession: number;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  onBook: () => void;
  onViewProfile?: () => void;
}

export default function DoctorCard({
  doctor,
  onBook,
  onViewProfile,
}: DoctorCardProps) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-brand-light/60 shadow-sm hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:border-brand-green/50 transition-all duration-300 flex flex-row p-4 gap-4 h-full">
      {/* Left Section: Information */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-brand-dark leading-tight">
            {doctor.name}
          </h3>
          <p className="text-brand-green font-medium text-xs uppercase tracking-wide">
            {doctor.specialty}
          </p>
        </div>

        {/* Specialities / Qualifications */}
        {doctor.qualifications && doctor.qualifications.length > 0 && (
          <div className="flex flex-wrap gap-1.5 min-h-[1.5em]">
            {doctor.qualifications.slice(0, 3).map((qual, idx) => (
              <span
                key={idx}
                className="text-[10px] items-center justify-center px-2 py-0.5 bg-brand-light/50 text-brand-dark/70 rounded-md border border-brand-light"
              >
                {qual}
              </span>
            ))}
          </div>
        )}

        {/* Bio */}
        <p className="text-xs text-brand-dark/60 line-clamp-2 leading-relaxed">
          {doctor.bio || "Experienced specialist dedicated to providing quality mental health care and support."}
        </p>

        {/* Price - Pushed to bottom of left column */}
        <div className="mt-auto pt-2">
          <p className="text-sm font-semibold text-brand-dark">
            <span className="text-brand-green">₹{doctor.pricePerSession}</span>
            <span className="text-brand-dark/50 text-xs font-normal"> / session</span>
          </p>
        </div>
      </div>

      {/* Right Section: Photo & Action */}
      <div className="flex flex-col items-center gap-3 shrink-0 w-[120px]">
        
        {/* Helper container for alignment */}
        <div className="flex flex-col items-center gap-1">
          {/* Rounded Rectangle Image Container */}
          <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-brand-light border-2 border-white shadow-sm ring-1 ring-brand-blue/10 group-hover:ring-brand-green/30 transition-all flex items-center justify-center">
            {doctor.imageUrl ? (
              <Image
                src={doctor.imageUrl}
                alt={doctor.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="112px"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-1 text-brand-dark/40 pb-1">
                  <div className="p-1.5 bg-brand-blue/20 rounded-full text-brand-blue">
                    <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-wider">Photo</span>
              </div>
            )}
          </div>
        </div>
        {/* Book Button */}
        <button
          onClick={onBook}
          className="w-full py-2 bg-brand-green text-white text-xs font-bold rounded-lg hover:bg-green-600 transition-colors shadow-sm hover:shadow-md active:transform active:scale-95"
        >
          Book now
        </button>
      </div>
    </article>
  );
}
