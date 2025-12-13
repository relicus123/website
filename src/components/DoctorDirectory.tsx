"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DoctorCard from "@/components/DoctorCard";
import BookingModal from "@/components/BookingModal";
import DoctorCardSkeleton from "@/components/DoctorCardSkeleton";

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  bio?: string;
  qualifications: string[];
  languages: string[];
  pricePerSession: number;
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
}

interface DoctorDirectoryProps {
  healthScore?: number;
  initialDoctors?: Doctor[];
}

export default function DoctorDirectory({
  healthScore,
  initialDoctors = [],
}: DoctorDirectoryProps) {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [filteredDoctors, setFilteredDoctors] =
    useState<Doctor[]>(initialDoctors);
  const [loading, setLoading] = useState(initialDoctors.length === 0);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    if (initialDoctors.length === 0) {
      fetchDoctors();
    }
  }, [initialDoctors.length]);

  const applyFilters = useCallback(() => {
    const q = searchKeyword.trim().toLowerCase();
    if (!q) {
      setFilteredDoctors(doctors);
      return;
    }

    const filtered = doctors.filter(
      (doctor) =>
        (doctor.name || "").toLowerCase().includes(q) ||
        (doctor.specialty || "").toLowerCase().includes(q)
    );

    setFilteredDoctors(filtered);
    setVisibleCount(10); // Reset visible count on search
  }, [doctors, searchKeyword]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/doctors");
      setDoctors(response.data.doctors);
      setFilteredDoctors(response.data.doctors);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingComplete = () => {
    setSelectedDoctor(null);
  };

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {[...Array(6)].map((_, i) => (
          <DoctorCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white">
      <section id="book" className="space-y-4 md:space-y-6">
        {/* Search Section (pill) */}
        <div className="w-full">
          <div className="mx-auto max-w-2xl w-full">
            <div className="bg-[#f7f7f7] border border-[#dcdcdc] rounded-full px-4 md:px-6 py-3 md:py-4 flex items-center gap-2 md:gap-3 shadow-none">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-gray-700 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-5.2-5.2m0 0A6 6 0 105.8 5.8a6 6 0 0010 10z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search therapist name or service"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="flex-1 text-sm md:text-lg bg-transparent focus:outline-none placeholder:text-gray-400 text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Doctors List */}
        {filteredDoctors.length === 0 ? (
          <div className="bg-white rounded-lg p-6 md:p-8 text-center border border-brand-light/60">
            <p className="text-sm md:text-base text-slate-600">
              {doctors.length === 0
                ? "No doctors available. Please seed the database first."
                : "No doctors found matching your search."}
            </p>
            {doctors.length === 0 && (
              <a
                href="/api/seed"
                className="button-primary mt-4 inline-block text-sm md:text-base"
              >
                Seed Database
              </a>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {filteredDoctors.slice(0, visibleCount).map((doctor) => (
                <DoctorCard
                  key={doctor._id}
                  doctor={doctor}
                  onBook={() => setSelectedDoctor(doctor)}
                  onViewProfile={() => {
                    setSelectedDoctor(doctor);
                  }}
                />
              ))}
            </div>

            {visibleCount < filteredDoctors.length && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleViewMore}
                  className="px-5 md:px-6 py-2.5 text-sm md:text-base rounded-full bg-white border border-brand-dark/20 text-brand-dark font-medium hover:bg-brand-light hover:border-brand-dark/40 transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                  View More Therapists
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          healthScore={healthScore}
          onClose={() => setSelectedDoctor(null)}
          onComplete={handleBookingComplete}
        />
      )}
    </div>
  );
}
