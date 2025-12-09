"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DoctorCard from "@/components/DoctorCard";
import BookingModal from "@/components/BookingModal";

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  experience: number;
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
}

export default function DoctorDirectory({ healthScore }: DoctorDirectoryProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

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
  }, [doctors, searchKeyword]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const fetchDoctors = async () => {
    try {
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

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-brand-light">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-dark">Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <section id="book" className="space-y-6">
        {/* Search Section (pill) */}
        <div className="w-full">
          <div className="mx-auto max-w-md w-full">
            <div className="bg-[#f7f7f7] border border-[#dcdcdc] rounded-full px-4 py-2 flex items-center gap-3 shadow-none">
              <svg
                className="w-4 h-4 text-gray-700"
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
                className="flex-1 text-sm bg-transparent focus:outline-none placeholder:text-gray-400 text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Doctors List */}
        {filteredDoctors.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center border border-brand-light/60">
            <p className="text-slate-600">
              {doctors.length === 0
                ? "No doctors available. Please seed the database first."
                : "No doctors found matching your search."}
            </p>
            {doctors.length === 0 && (
              <a href="/api/seed" className="button-primary mt-4 inline-block">
                Seed Database
              </a>
            )}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDoctors.map((doctor) => (
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

            <div className="flex justify-center pt-2">
              <button className="px-5 py-2 rounded-full bg-white border border-brand-dark/30 text-brand-dark hover:bg-brand-light transition">
                View more therapists
              </button>
            </div>
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
