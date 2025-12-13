export default function DoctorCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-brand-light/60 p-4 flex gap-4 h-full animate-pulse">
      {/* Left Section: Information */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="space-y-2">
          {/* Name Skeleton */}
          <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
          {/* Designation Skeleton */}
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>

        {/* Tags Skeleton */}
        <div className="flex gap-2 mt-1">
          <div className="h-5 w-16 bg-gray-200 rounded"></div>
          <div className="h-5 w-16 bg-gray-200 rounded"></div>
        </div>

        {/* Bio Skeleton */}
        <div className="space-y-1 mt-2">
          <div className="h-3 w-full bg-gray-200 rounded"></div>
          <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
        </div>

        {/* Price Skeleton */}
        <div className="mt-auto pt-2">
          <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Right Section: Image & Button */}
      <div className="flex flex-col items-center gap-3 shrink-0 w-[120px]">
        {/* Image Skeleton */}
        <div className="w-28 h-28 rounded-2xl bg-gray-200"></div>
        {/* Button Skeleton */}
        <div className="w-full h-8 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}
