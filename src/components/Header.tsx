"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AdMarquee from "./AdMarquee";
import { useNavbarScroll } from "@/hooks/useNavbarScroll";
import { servicesData } from "@/data/servicesData";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout>();

  // Add navbar scroll animation
  useNavbarScroll("navbar");

  // Handle dropdown hover for desktop
  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setServicesDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 200); // Small delay to allow moving to dropdown
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      id="navbar"
      className="bg-white border-b border-brand-light/60 fixed top-0 left-0 right-0 z-50 w-full"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-10 md:h-12 w-auto relative navbar-logo">
            <Image
              src="/logo-relicus.png"
              alt="Relicus"
              width={140}
              height={36}
              priority
              className="md:w-[160px] md:h-[40px]"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-8 text-sm text-brand-dark font-medium">
          <Link href="/" className="hover:text-brand-dark/70 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-brand-dark/70 transition">
            About Us
          </Link>

          {/* Services Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              className="hover:text-brand-dark/70 transition flex items-center gap-2"
            >
              Services
              <svg
                className={`w-4 h-4 transition-transform ${
                  servicesDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {servicesDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-lg border border-brand-light/20 py-2 min-w-max z-50">
                {servicesData.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="block px-6 py-3 hover:bg-emerald-50/50 transition text-brand-dark text-sm font-medium whitespace-nowrap"
                    onClick={() => setServicesDropdownOpen(false)}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/#therapists"
            className="hover:text-brand-dark/70 transition"
          >
            Therapists
          </Link>
          <Link
            href="/#book"
            className="button-primary px-5 py-2 text-sm font-semibold whitespace-nowrap shadow-sm"
          >
            Book a Therapy
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-brand-dark hover:bg-brand-light/50 rounded-lg transition"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-brand-light/60 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
            <Link
              href="/"
              className="px-4 py-3 hover:bg-brand-light/30 rounded-lg transition text-brand-dark font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="px-4 py-3 hover:bg-brand-light/30 rounded-lg transition text-brand-dark font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>

            {/* Mobile Services Submenu */}
            <div className="px-4 py-3">
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="w-full text-left font-medium text-brand-dark flex items-center justify-between hover:bg-brand-light/30 p-2 rounded-lg transition"
              >
                Services
                <svg
                  className={`w-4 h-4 transition-transform ${
                    servicesDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>

              {servicesDropdownOpen && (
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  {servicesData.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="px-4 py-2 hover:bg-emerald-50/50 rounded-lg transition text-brand-dark text-sm font-medium"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setServicesDropdownOpen(false);
                      }}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/#therapists"
              className="px-4 py-3 hover:bg-brand-light/30 rounded-lg transition text-brand-dark font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Therapists
            </Link>
            <Link
              href="/#book"
              className="button-primary px-5 py-3 text-center font-semibold shadow-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book a Therapy
            </Link>
          </div>
        </nav>
      )}

      <AdMarquee />
    </header>
  );
}
