"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DoctorDirectory from "@/components/DoctorDirectory";
import ChatbotPanel from "@/components/ChatbotPanel";
import ServicesMarquee from "@/components/ServicesMarquee";
import HeroSlideshow from "@/components/HeroSlideshow";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useGsapFadeUp } from "@/hooks/useGsapFadeUp";
import { useGsapStagger } from "@/hooks/useGsapStagger";
import { useGsapRevealImage } from "@/hooks/useGsapRevealImage";
import { useScrollSections } from "@/hooks/useScrollSections";





const faqs = [
  {
    q: "What is online counselling, and how does it work?",
    a: "Online counselling involves professional therapy sessions conducted via secure video calls. You can book a slot with a licensed therapist, join the session from the comfort of your home, and receive the same quality of care as in-person visits.",
  },
  {
    q: "What types of issues can I seek help for through online counselling?",
    a: "You can seek help for a wide range of issues including stress, anxiety, depression, relationship problems, trauma, grief, and personal growth. Our therapists are trained to handle various psychological and emotional challenges.",
  },
  {
    q: "What should I expect during an online counselling session?",
    a: "During a session, you will speak with your therapist over a secure video link. The therapist will listen to your concerns, help you understand your feelings, and work with you to develop coping strategies and solutions.",
  },
  {
    q: "How do I schedule an appointment?",
    a: "Scheduling is easy. Simply browse our list of qualified therapists, choose one that suits your needs, select a convenient time slot, and complete the secure payment process to confirm your booking.",
  },
  {
    q: "When can I understand It’s time to see a therapist?",
    a: "If you are feeling overwhelmed, persistently sad, anxious, or if your daily functioning is affected by your emotions, it might be time to see a therapist. Seeking help is a sign of strength, not weakness.",
  },
  {
    q: "How can I access online counselling in Kerala?",
    a: "Our platform is accessible from anywhere, including Kerala. All you need is a device with an internet connection to connect with our therapists who are available to support you.",
  },
  {
    q: "Is online counselling in Kerala available worldwide?",
    a: "Yes, our online counselling services are available worldwide. No matter where you are located, you can access our platform and connect with our experienced therapists.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.2 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
};

export default function HomeClient() {
  const [healthScore, setHealthScore] = useState<number | undefined>(undefined);

  // Initialize scroll-based animations for elements with data-fade-section attribute
  useScrollSections();

  // Create refs for hero section animations
  const heroTitleRef = useGsapFadeUp<HTMLHeadingElement>({
    duration: 0.7,
    yOffset: 30,
  });
  const heroSubtitleRef = useGsapFadeUp<HTMLParagraphElement>({
    delay: 0.2,
    duration: 0.6,
  });
  const heroCtaRef = useGsapFadeUp<HTMLDivElement>({
    delay: 0.3,
    duration: 0.6,
  });
  const heroImageRef = useGsapRevealImage<HTMLDivElement>({
    delay: 0.4,
    duration: 0.8,
  });

  const handleChatbotComplete = (score: number) => {
    setHealthScore(score);
  };

  return (
    <>
      <main id="home" className="min-h-screen bg-brand-light">
        {/* Hero Banner */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-brand-blue/15"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-brand-blue/30 shadow-sm bg-gradient-to-r from-brand-blue/50 via-white to-brand-light">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#1c4966,transparent_25%),radial-gradient(circle_at_80%_10%,#5f8b70,transparent_25%),radial-gradient(circle_at_50%_80%,#8fbdd7,transparent_25%)]" />
              <div className="relative grid grid-cols-1 md:grid-cols-[1fr_1.05fr] items-center">
                <div className="p-5 md:p-8 space-y-3 md:space-y-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/70 border border-brand-blue/40 text-xs font-semibold text-brand-dark">
                    Healing Begins With a Single Conversation.
                  </span>
                  <h1
                    ref={heroTitleRef}
                    id="heroTitle"
                    className="text-2xl md:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight"
                  >
                    When Life Feels Heavy,{" "}
                    <span className="text-brand-green">
                      Let Us Help You Carry It.
                    </span>
                  </h1>
                  <p
                    ref={heroSubtitleRef}
                    id="heroSubtitle"
                    className="text-brand-dark/80 text-sm md:text-base lg:text-lg leading-relaxed"
                  >
                    Welcome to Relicus. We provide a safe, non-judgmental space
                    where evidence-based psychology meets holistic
                    rehabilitation. Whether you are healing from trauma or
                    seeking growth, you don&apos;t have to do it alone.
                  </p>
                  <div
                    ref={heroCtaRef}
                    id="heroCTA"
                    className="flex gap-2 md:gap-3 flex-wrap"
                  >
                    <a
                      href="#book"
                      className="button-primary text-sm md:text-base px-4 md:px-5 py-2.5"
                    >
                      Find a Specialist
                    </a>
                    <Link
                      href="/about"
                      className="px-4 md:px-5 py-2.5 text-sm md:text-base rounded-lg border border-brand-dark/30 text-brand-dark hover:border-brand-dark transition"
                    >
                      Our Story
                    </Link>
                  </div>
                </div>
                <div ref={heroImageRef} id="heroImage" className="p-4 md:p-6">
                  <HeroSlideshow />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <ServicesMarquee />
        </motion.div>

        {/* Doctor Directory */}
        <section
          id="therapists"
          className="bg-white py-6 md:py-10"
          data-fade-section
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-4 md:space-y-6">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <DoctorDirectory
                healthScore={healthScore}
              />
            </motion.div>

            {/* Mid-page CTA */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="rounded-xl md:rounded-2xl bg-brand-blue/25 border border-brand-blue/40 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="text-center md:text-left">
                <p className="text-xs md:text-sm text-brand-dark/80">
                  Need help choosing?
                </p>
                <h3 className="text-lg md:text-xl font-semibold text-brand-dark">
                  Still unsure which help to take?
                </h3>
              </div>
              <div className="flex gap-2 md:gap-3 flex-wrap justify-center">
                <button
                  className="px-4 py-2.5 text-sm md:text-base rounded-lg bg-white text-brand-dark border border-brand-light hover:border-brand-dark transition"
                  onClick={() => {
                    const chatbotButton = document.querySelector(
                      'button[class*="fixed bottom-6 right-6"]'
                    ) as HTMLButtonElement;
                    if (chatbotButton) chatbotButton.click();
                  }}
                >
                  Take assessment
                </button>
                <a href="#book" className="button-primary text-sm md:text-base">
                  Talk to an expert
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section
          className="bg-brand-light py-8 md:py-16 border-t border-brand-light/60"
          data-fade-section
        >
          <motion.div
            className="max-w-4xl mx-auto px-4 md:px-6 space-y-6 md:space-y-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold text-brand-dark"
            >
              Any Questions?
            </motion.h2>
            <motion.div variants={fadeInUp} className="space-y-0">
              {faqs.map((item) => (
                <details
                  key={item.q}
                  className="group border-b border-gray-200"
                >
                  <summary className="flex items-center justify-between py-4 md:py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden touch-manipulation">
                    <span className="text-base md:text-lg font-medium text-brand-dark group-hover:text-brand-blue transition-colors pr-4">
                      {item.q}
                    </span>
                    <ChevronRightIcon className="w-5 h-5 text-brand-dark transition-transform duration-300 group-open:rotate-90 flex-shrink-0" />
                  </summary>
                  <div className="pb-4 md:pb-5 text-sm md:text-base text-brand-dark/70 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <ChatbotPanel onComplete={handleChatbotComplete} />
      </main>
    </>
  );
}
