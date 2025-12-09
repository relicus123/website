"use client";

import Image from "next/image";
import Link from "next/link";
import AdMarquee from "./AdMarquee";

export default function Header() {
  return (
    <header className="bg-white border-b border-brand-light/60 fixed top-0 left-0 right-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-12 w-auto">
            <Image
              src="/logo-relicus.png"
              alt="Relicus"
              width={160}
              height={40}
              priority
            />
          </div>
        </div>
        <nav className="flex items-center gap-5 md:gap-8 text-sm text-brand-dark font-medium">
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
      </div>
      <AdMarquee />
    </header>
  );
}
