"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DoctorDirectory from "@/components/DoctorDirectory";
import ChatbotPanel from "@/components/ChatbotPanel";
import ServicesMarquee from "@/components/ServicesMarquee";
import HeroSlideshow from "@/components/HeroSlideshow";

export const dynamic = "force-dynamic";

const faqs = [
  {
    q: "What is online counselling and how does it work?",
    a: "Secure video sessions with licensed experts. Book a slot, join via a secure link, and receive a post-session summary.",
  },
  {
    q: "What types of issues can I seek help for?",
    a: "Stress, anxiety, relationship support, chronic pain, post-injury rehab, and preventive wellness.",
  },
  {
    q: "How do I schedule an appointment?",
    a: "Pick a therapist, choose an available slot, pay securely, and get an instant confirmation email.",
  },
  {
    q: "Can I reschedule or cancel?",
    a: "Yes. Contact support at least 12 hours before the session time for rescheduling options.",
  },
];

export default function HomePage() {
  const [healthScore, setHealthScore] = useState<number | undefined>(undefined);
  const smootherInitialized = useRef(false);

  useEffect(() => {
    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
          existing.addEventListener("load", () => resolve());
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(script);
      });

    const initSmoother = async () => {
      if (smootherInitialized.current) return;
      if (typeof window === "undefined") return;

      const win = window as any;

      if (!win.gsap) {
        await loadScript(
          "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"
        );
      }
      if (!win.ScrollSmoother) {
        await loadScript(
          "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollSmoother.min.js"
        );
      }

      if (win.gsap && win.ScrollSmoother && !win.ScrollSmoother.get()) {
        win.gsap.registerPlugin(win.ScrollSmoother);
        win.ScrollSmoother.create({
          wrapper: ".smooth-wrapper",
          content: ".smooth-content",
          smooth: 1,
          effects: true,
        });
        smootherInitialized.current = true;
      }
    };

    initSmoother().catch(() => {});

    return () => {
      const win = window as any;
      const smoother = win?.ScrollSmoother?.get?.();
      if (smoother && typeof smoother.kill === "function") {
        smoother.kill();
      }
      smootherInitialized.current = false;
    };
  }, []);

  const handleChatbotComplete = (score: number) => {
    setHealthScore(score);
  };

  return (
    <div className="smooth-wrapper">
      <div className="smooth-content">
        <main id="home" className="min-h-screen bg-brand-light">
          {/* Header */}
          <header className="bg-white border-b border-brand-light/60 sticky top-0 z-20">
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
                <Link
                  href="/about"
                  className="hover:text-brand-dark/70 transition"
                >
                  About Us
                </Link>
                <Link
                  href="#services"
                  className="hover:text-brand-dark/70 transition"
                >
                  Services
                </Link>
                <Link
                  href="#therapists"
                  className="hover:text-brand-dark/70 transition"
                >
                  Therapists
                </Link>
                <Link
                  href="#book"
                  className="button-primary px-5 py-2 text-sm font-semibold whitespace-nowrap shadow-sm"
                >
                  Book a Therapy
                </Link>
              </nav>
            </div>
          </header>

          {/* Hero Banner */}
          <section className="bg-brand-blue/15">
            <div className="max-w-7xl mx-auto px-6 py-10">
              <div className="relative overflow-hidden rounded-2xl border border-brand-blue/30 shadow-sm bg-gradient-to-r from-brand-blue/50 via-white to-brand-light">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#1c4966,transparent_25%),radial-gradient(circle_at_80%_10%,#5f8b70,transparent_25%),radial-gradient(circle_at_50%_80%,#8fbdd7,transparent_25%)]" />
                <div className="relative grid md:grid-cols-[1fr_1.05fr] items-center">
                  <div className="p-8 space-y-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/70 border border-brand-blue/40 text-xs font-semibold text-brand-dark">
                      Healing Begins With a Single Conversation.
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight">
                      When Life Feels Heavy,{" "}
                      <span className="text-brand-green">
                        Let Us Help You Carry It.
                      </span>
                    </h1>
                    <p className="text-brand-dark/80 text-base md:text-lg">
                      Welcome to Relicus. We provide a safe, non-judgmental
                      space where evidence-based psychology meets holistic
                      rehabilitation. Whether you are healing from trauma or
                      seeking growth, you don&apos;t have to do it alone.
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      <a href="#book" className="button-primary">
                        Find a Specialist
                      </a>
                      <Link
                        href="/about"
                        className="px-4 py-2 rounded-lg border border-brand-dark/30 text-brand-dark hover:border-brand-dark transition"
                      >
                        Our Story
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <HeroSlideshow />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About moved to /about */}

          <ServicesMarquee />

          {/* Doctor Directory */}
          <section id="therapists" className="bg-white py-10">
            <div className="max-w-7xl mx-auto px-6 space-y-6">
              <DoctorDirectory healthScore={healthScore} />

              {/* Mid-page CTA */}
              <div className="rounded-2xl bg-brand-blue/25 border border-brand-blue/40 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-brand-dark/80">
                    Need help choosing?
                  </p>
                  <h3 className="text-xl font-semibold text-brand-dark">
                    Still unsure which help to take?
                  </h3>
                </div>
                <div className="flex gap-3">
                  <button
                    className="px-4 py-2 rounded-lg bg-white text-brand-dark border border-brand-light hover:border-brand-dark transition"
                    onClick={() => {
                      const chatbotButton = document.querySelector(
                        'button[class*="fixed bottom-6 right-6"]'
                      ) as HTMLButtonElement;
                      if (chatbotButton) chatbotButton.click();
                    }}
                  >
                    Take assessment
                  </button>
                  <a href="#book" className="button-primary">
                    Talk to an expert
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-brand-light border-t border-brand-light/60">
            <div className="max-w-7xl mx-auto px-6 py-10 space-y-4">
              <h2 className="text-xl font-semibold text-brand-dark">
                Any Questions?
              </h2>
              <div className="space-y-3">
                {faqs.map((item) => (
                  <details
                    key={item.q}
                    className="bg-brand-light/50 border border-brand-light rounded-lg p-4"
                  >
                    <summary className="font-medium text-brand-dark cursor-pointer">
                      {item.q}
                    </summary>
                    <p className="mt-2 text-sm text-brand-dark/80">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-brand-dark text-white mt-10">
            <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
              <div>
                <p className="font-semibold mb-3">Services</p>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>Online Therapy</li>
                  <li>Physiotherapy</li>
                  <li>Clinical Psychology</li>
                  <li>Wellness Coaching</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-3">Company</p>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>About</li>
                  <li>Careers</li>
                  <li>Blogs</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-3">Support</p>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>FAQs</li>
                  <li>Privacy Policy</li>
                  <li>Terms & Conditions</li>
                  <li>Refunds</li>
                </ul>
              </div>
              <div className="space-y-3">
                <p className="font-semibold">Stay connected</p>
                <p className="text-sm text-white/80">
                  24/7 chat support and expert guidance whenever you need it.
                </p>
                <div className="flex gap-2">
                  <span className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center">
                    in
                  </span>
                  <span className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center">
                    fb
                  </span>
                  <span className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center">
                    ig
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t border-white/20 py-4 text-center text-xs text-white/70">
              © {new Date().getFullYear()} YourCare Platform. Built for
              reliable, conflict-free scheduling and payments.
            </div>
          </footer>

          <ChatbotPanel onComplete={handleChatbotComplete} />
        </main>
      </div>
    </div>
  );
}
