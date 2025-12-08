"use client";

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  experience: number;
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
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded ${
              i < fullStars
                ? "bg-brand-green"
                : i === fullStars && hasHalfStar
                ? "bg-brand-green/50"
                : "bg-brand-light"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <article className="bg-white rounded-lg border border-brand-light/60 p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Left Column */}
        <div className="flex-1 space-y-3">
          {/* Name and Designation */}
          <div>
            <h3 className="text-lg font-semibold text-brand-dark">
              {doctor.name}
            </h3>
            <p className="text-sm text-brand-dark/70">{doctor.specialty}</p>
          </div>

          {/* View Profile Button */}
          <button
            onClick={onViewProfile || onBook}
            className="px-4 py-2 bg-brand-light text-brand-dark rounded-lg text-sm font-medium hover:bg-brand-light/80 transition"
          >
            View profile
          </button>

          {/* Rating Boxes */}
          <div className="flex items-center gap-2">
            {doctor.rating ? (
              <>
                {renderStars(doctor.rating)}
                <span className="text-xs text-brand-dark/70">
                  {doctor.rating.toFixed(1)}
                </span>
              </>
            ) : (
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded bg-brand-light"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Begins at Rate */}
          <div>
            <p className="text-sm text-brand-dark font-medium">
              Begins at ₹{doctor.pricePerSession}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-end gap-3">
          {/* Image */}
          <div className="w-24 h-24 bg-brand-blue/30 rounded-lg flex items-center justify-center overflow-hidden">
            {doctor.imageUrl ? (
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl">👤</span>
            )}
          </div>

          {/* Book Now Button */}
          <button
            onClick={onBook}
            className="button-primary whitespace-nowrap"
          >
            Book now
          </button>
        </div>
      </div>
    </article>
  );
}
