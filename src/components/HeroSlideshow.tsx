"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";


interface Banner {
  _id: string;
  title: string;
  imageUrl: string;
  link?: string;
}

const DEFAULT_BANNER: Banner = {
  _id: "default",
  title: "Relicus Care",
  imageUrl: "/header.jpg",
};

export default function HeroSlideshow() {
  const [banners, setBanners] = useState<Banner[]>([DEFAULT_BANNER]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // fetchBanners(); // Disabled to force local image
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get("/api/banners");
      if (response.data.success && response.data.banners.length > 0) {
        setBanners(response.data.banners);
      }
    } catch (error) {
      console.error("Failed to fetch banners:", error);
    }
  };

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-white group">
      {/* Slideshow Images */}
      <div className="relative w-full h-full">
        {banners.map((banner, index) => (
          <div
            key={banner._id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {banner.link ? (
              <a
                href={banner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full relative"
              >
                <Image
                  src={banner.imageUrl}
                  alt={banner.title}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </a>
            ) : (
              <div className="w-full h-full relative">
                <Image
                  src={banner.imageUrl}
                  alt={banner.title}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
          </div>

        ))}
      </div>

      {/* Navigation Arrows (only if multiple banners) */}
      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-brand-dark p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Previous slide"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-brand-dark p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Next slide"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator (only if multiple banners) */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
