"use client";

import { useState, useRef, useEffect } from "react";
import ServiceDetailModal from "./ServiceDetailModal";
import { SERVICES_WITH_DETAILS } from "@/data/servicesData";

const DUPLICATED = [...SERVICES_WITH_DETAILS, ...SERVICES_WITH_DETAILS];

export default function ServicesMarquee() {
  const [selectedService, setSelectedService] = useState<
    (typeof SERVICES_WITH_DETAILS)[0] | null
  >(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [scrollOffset, setScrollOffset] = useState(0);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Apply scroll offset whenever it changes
  useEffect(() => {
    if (marqueeTrackRef.current) {
      marqueeTrackRef.current.style.transform = `translateX(${scrollOffset}px)`;
    }
  }, [scrollOffset]);

  const handleFindSpecialist = () => {
    setSelectedService(null);
    const element = document.getElementById("therapists");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleManualScroll = (direction: "left" | "right") => {
    // Clear any existing resume timer
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }

    setIsAutoScroll(false);

    const scrollAmount = 320; // width of one card + gap
    setScrollOffset((prev) =>
      direction === "left" ? prev - scrollAmount : prev + scrollAmount
    );

    // Resume auto-scroll after 5 seconds of manual interaction
    resumeTimerRef.current = setTimeout(() => {
      setIsAutoScroll(true);
      setScrollOffset(0);
    }, 5000);
  };

  return (
    <>
      <section
        id="services"
        className="bg-brand-light border-y border-brand-light/60"
        aria-label="Relicus services"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10 space-y-4 md:space-y-6">
          <div className="text-center space-y-2 md:space-y-3">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark">
              Our <span className="text-brand-green">services</span>
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-brand-dark/80 max-w-3xl mx-auto leading-relaxed px-2">
              We offer a holistic approach to well-being and development.
              Explore our diverse range of services, from individual therapy and
              specialized support to professional training and community
              referrals.
            </p>
          </div>

          <div className="relative">
            {/* Left Navigation Button */}
            <button
              onClick={() => handleManualScroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-brand-green hover:bg-brand-dark text-white p-2 md:p-3 rounded-full shadow-lg transition -translate-x-12 md:-translate-x-16 lg:translate-x-0 active:scale-95"
              aria-label="Scroll left"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
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

            <div
              className={`services-marquee ${!isAutoScroll ? "paused" : ""}`}
            >
              <div
                className="marquee-track"
                ref={marqueeTrackRef}
                style={{ transform: `translateX(${scrollOffset}px)` }}
              >
                {DUPLICATED.map((service, idx) => (
                  <ServiceCard
                    key={`${service.title}-${idx}`}
                    service={service}
                    onSelect={() => setSelectedService(service)}
                  />
                ))}
              </div>
            </div>

            {/* Right Navigation Button */}
            <button
              onClick={() => handleManualScroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-brand-green hover:bg-brand-dark text-white p-2 md:p-3 rounded-full shadow-lg transition translate-x-12 md:translate-x-16 lg:translate-x-0 active:scale-95"
              aria-label="Scroll right"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
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
          </div>
        </div>
      </section>

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onFindSpecialist={handleFindSpecialist}
      />
    </>
  );
}

import Image from "next/image";

function ServiceCard({
  service,
  onSelect,
}: {
  service: (typeof SERVICES_WITH_DETAILS)[0];
  onSelect: () => void;
}) {
  return (
    <button onClick={onSelect} className="service-card group cursor-pointer">
      <div className="card h-full flex flex-col overflow-hidden shadow-md border border-brand-light/70 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group-hover:scale-105">
        <div className="h-48 w-full overflow-hidden bg-white relative">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 320px"
          />
        </div>
        <div className="p-4">
          <p className="text-base font-semibold text-brand-dark leading-snug group-hover:text-brand-green transition">
            {service.title}
          </p>
        </div>
      </div>
    </button>
  );
}
