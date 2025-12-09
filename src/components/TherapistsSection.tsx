"use client";

import { useState, useEffect } from "react";
import TherapistCard from "./TherapistCard";
import TherapistPaymentModal from "./TherapistPaymentModal";

interface Therapist {
  _id: string;
  name: string;
  designation: string;
  photo: string;
  price: number;
  bio?: string;
}

export default function TherapistsSection() {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [filteredTherapists, setFilteredTherapists] = useState<Therapist[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    therapistId: "",
    therapistName: "",
    amount: 0,
  });

  // Fetch therapists
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/therapists");
        const data = await response.json();

        console.log("Therapists API response:", data);

        if (data.success) {
          console.log("Found therapists:", data.data);
          setTherapists(data.data);
          setFilteredTherapists(data.data);
        }
      } catch (error) {
        console.error("Error fetching therapists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim()) {
      const filtered = therapists.filter(
        (therapist) =>
          therapist.name.toLowerCase().includes(query.toLowerCase()) ||
          therapist.designation.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTherapists(filtered);
    } else {
      setFilteredTherapists(therapists);
    }
  };

  // Handle booking
  const handleBook = (therapistId: string, name: string, price: number) => {
    setPaymentModal({
      isOpen: true,
      therapistId,
      therapistName: name,
      amount: price,
    });
  };

  return (
    <>
      <section
        id="therapists"
        className="bg-gradient-to-b from-brand-light/60 via-white to-brand-light/60 border-y border-brand-light/60"
      >
        <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
              Our <span className="text-brand-green">Therapists</span>
            </h2>
            <p className="text-base md:text-lg text-brand-dark/80 max-w-3xl mx-auto leading-relaxed">
              Meet our experienced and certified therapists dedicated to your
              well-being. Book a session today.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-5xl mx-auto w-full">
            <div className="bg-[#f7f7f7] border border-[#dcdcdc] rounded-full px-5 py-3 flex items-center gap-3 shadow-none">
              <svg
                className="w-5 h-5 text-gray-700"
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
                placeholder="Search by Therapist name..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="flex-1 text-sm md:text-base bg-transparent focus:outline-none placeholder:text-gray-400 text-gray-800"
              />
            </div>
          </div>

          {/* Therapist Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-brand-light/80 rounded-lg shadow-sm animate-pulse"
                >
                  <div className="h-48 w-full bg-brand-light/70" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 w-2/3 bg-brand-light rounded" />
                    <div className="h-3 w-1/2 bg-brand-light rounded" />
                    <div className="h-10 w-full bg-brand-light rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredTherapists.length === 0 ? (
            <div className="bg-white/80 border border-brand-light rounded-2xl shadow-sm p-10 text-center space-y-4">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-brand-light flex items-center justify-center text-brand-green">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-brand-dark">
                {searchQuery ? "No matches found" : "No therapists yet"}
              </h3>
              <p className="text-brand-dark/70 max-w-xl mx-auto">
                {searchQuery
                  ? "Try a different keyword or clear the search to see all therapists."
                  : "Add your first therapist profile to start accepting bookings."}
              </p>
              <div className="flex items-center justify-center gap-3">
                {searchQuery && (
                  <button
                    onClick={() => handleSearch("")}
                    className="px-4 py-2 border border-brand-light text-brand-dark rounded-lg hover:bg-brand-light/50"
                  >
                    Clear search
                  </button>
                )}
                <a
                  href="/admin/therapists"
                  className="px-5 py-2 bg-brand-green text-white font-semibold rounded-lg hover:bg-brand-dark"
                >
                  Add Therapist
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTherapists.map((therapist) => (
                <TherapistCard
                  key={therapist._id}
                  id={therapist._id}
                  name={therapist.name}
                  designation={therapist.designation}
                  photo={therapist.photo}
                  price={therapist.price}
                  onBook={handleBook}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Payment Modal */}
      <TherapistPaymentModal
        isOpen={paymentModal.isOpen}
        therapistId={paymentModal.therapistId}
        therapistName={paymentModal.therapistName}
        amount={paymentModal.amount}
        onClose={() =>
          setPaymentModal({
            isOpen: false,
            therapistId: "",
            therapistName: "",
            amount: 0,
          })
        }
        onSuccess={() => {
          // Handle successful booking
          alert(`Booking confirmed with ${paymentModal.therapistName}!`);
        }}
      />
    </>
  );
}
