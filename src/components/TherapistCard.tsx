"use client";

interface TherapistCardProps {
  id: string;
  name: string;
  designation: string;
  photo: string;
  price: number;
  bio?: string;
  specialties?: string[];
  onBook: (therapistId: string, name: string, price: number) => void;
}

export default function TherapistCard({
  id,
  name,
  designation,
  photo,
  price,
  bio,
  specialties,
  onBook,
}: TherapistCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 md:gap-6">
        {/* Left side - Information */}
        <div className="flex-1 space-y-2 md:space-y-3 w-full sm:w-auto">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
              {name}
            </h3>
            <p className="text-sm md:text-base text-gray-600">{designation}</p>
          </div>

          {specialties && specialties.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Specialities
              </p>
              <div className="flex flex-wrap gap-2">
                {specialties.slice(0, 3).map((specialty, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          )}

          {bio && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Bio</p>
              <p className="text-sm text-gray-600 line-clamp-2">{bio}</p>
            </div>
          )}

          <div className="pt-2">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">
                Session price:
              </span>{" "}
              ₹{price}
            </p>
          </div>
        </div>

        {/* Right side - Photo and Button */}
        <div className="flex sm:flex-col items-center gap-3 w-full sm:w-auto">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl bg-blue-100 flex items-center justify-center overflow-hidden border border-blue-200 flex-shrink-0">
            {photo ? (
              <img
                src={photo}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <button
            onClick={() => onBook(id, name, price)}
            className="px-5 md:px-6 py-2.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold rounded-lg text-sm transition-colors duration-200 shadow-sm hover:shadow-md active:scale-95 flex-1 sm:flex-initial w-full sm:w-auto"
          >
            Book now
          </button>
        </div>
      </div>
    </div>
  );
}
