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
    <article className="group bg-white rounded-2xl overflow-hidden border border-brand-light/60 shadow-sm hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:border-brand-green/50 transition-all duration-300 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-60 w-full bg-brand-light/30 overflow-hidden">
        {doctor.imageUrl ? (
          <Image
            src={doctor.imageUrl || "/header.jpg"} // Fallback to header image

            alt={doctor.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />


        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-dark/20">
            <svg
              className="w-16 h-16"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        )}
        
        {/* Price Tag Overlay */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-bold text-brand-dark shadow-sm">
          ₹{doctor.pricePerSession}/session
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow gap-1.5">
        <div>
          <h3 className="text-lg font-bold text-brand-dark leading-tight">
            {doctor.name}
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-brand-green font-medium text-xs">
              {doctor.specialty}
            </p>
          </div>
        </div>

        {/* Specialties / Qualifications */}
        {doctor.qualifications && doctor.qualifications.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-0.5">
            {doctor.qualifications.slice(0, 3).map((qual, idx) => (
              <span
                key={idx}
                className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-brand-light/50 text-brand-dark/70 rounded-md"
              >
                {qual}
              </span>
            ))}
          </div>
        )}

        {/* Bio Preview (Optional) */}
        {doctor.bio && (
          <p className="text-[11px] text-brand-dark/60 line-clamp-2 mt-1">
            {doctor.bio}
          </p>
        )}
      </div>

      {/* Action Section */}
      <div className="p-4 pt-0 mt-auto">
        <button
          onClick={onBook}
          className="w-full py-2.5 bg-brand-dark text-white text-sm font-semibold rounded-xl hover:bg-brand-green transition-colors duration-300 shadow-sm flex items-center justify-center gap-2 group-hover:shadow-md"
        >
          <span>Book Now</span>
          <svg 
            className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </article>
  );
}
