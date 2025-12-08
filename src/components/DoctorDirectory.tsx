"use client";

import { useState, useEffect } from "react";
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

export default function DoctorDirectory({
  healthScore,
}: DoctorDirectoryProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterByName, setFilterByName] = useState(false);
  const [filterByService, setFilterByService] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchKeyword, filterByName, filterByService, doctors]);

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

  const applyFilters = () => {
    let filtered = [...doctors];

    if (searchKeyword.trim()) {
      if (filterByName) {
        filtered = filtered.filter((doctor) =>
          doctor.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      } else if (filterByService) {
        filtered = filtered.filter((doctor) =>
          doctor.specialty.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      } else {
        // Search in both name and service if no specific filter selected
        filtered = filtered.filter(
          (doctor) =>
            doctor.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }
    }

    setFilteredDoctors(filtered);
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
    <div className="bg-brand-light">
      <section id="book" className="space-y-6">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl p-4 border border-brand-light/60 shadow-sm">
          <div className="flex gap-3 items-center mb-3">
            <input
              type="text"
              placeholder="Search therapist name or service"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="flex-1 px-4 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green text-brand-dark"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-10 h-10 flex items-center justify-center border border-brand-light rounded-lg hover:bg-brand-light transition text-brand-dark"
            >
              #
            </button>
          </div>

          {showFilters && (
            <div className="space-y-2 pt-2 border-t border-brand-light">
              <label className="flex items-center gap-2 text-sm text-brand-dark cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterByName}
                  onChange={(e) => {
                    setFilterByName(e.target.checked);
                    if (e.target.checked) setFilterByService(false);
                  }}
                  className="w-4 h-4 text-brand-green focus:ring-brand-green"
                />
                Search therapist by name
              </label>
              <label className="flex items-center gap-2 text-sm text-brand-dark cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterByService}
                  onChange={(e) => {
                    setFilterByService(e.target.checked);
                    if (e.target.checked) setFilterByName(false);
                  }}
                  className="w-4 h-4 text-brand-green focus:ring-brand-green"
                />
                Search therapist by service
              </label>
            </div>
          )}
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
