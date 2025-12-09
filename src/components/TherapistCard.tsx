"use client";

interface TherapistCardProps {
  id: string;
  name: string;
  designation: string;
  photo: string;
  price: number;
  onBook: (therapistId: string, name: string, price: number) => void;
}

export default function TherapistCard({
  id,
  name,
  designation,
  photo,
  price,
  onBook,
}: TherapistCardProps) {
  return (
    <div className="h-full bg-white border border-brand-light/60 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200 flex flex-col p-5">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-lg bg-brand-light flex items-center justify-center overflow-hidden border border-brand-light/80">
          <img src={photo} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-1 flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-brand-dark truncate">
            {name}
          </h3>
          <p className="text-sm text-brand-dark/70 truncate">{designation}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-brand-dark/70">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-brand-green" />
          <span className="font-semibold text-brand-dark">
            Begins at ₹{price}
          </span>
        </div>
      </div>

      <div className="mt-auto pt-6 flex items-center justify-between gap-3">
        <button className="px-4 py-2 text-brand-dark border border-brand-light rounded-lg bg-white hover:bg-brand-light/60 text-sm font-semibold">
          View profile
        </button>
        <button
          onClick={() => onBook(id, name, price)}
          className="px-5 py-2 bg-brand-green hover:bg-brand-dark text-white font-semibold rounded-lg text-sm"
        >
          Book now
        </button>
      </div>
    </div>
  );
}
