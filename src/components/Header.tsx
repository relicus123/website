"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AdMarquee from "./AdMarquee";
import { useNavbarScroll } from "@/hooks/useNavbarScroll";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Add navbar scroll animation
  useNavbarScroll("navbar");

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
          <Link
            href="/#services"
            className="hover:text-brand-dark/70 transition"
          >
            Services
          </Link>
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
            <Link
              href="/#services"
              className="px-4 py-3 hover:bg-brand-light/30 rounded-lg transition text-brand-dark font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
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
