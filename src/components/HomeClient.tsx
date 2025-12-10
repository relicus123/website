"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DoctorDirectory from "@/components/DoctorDirectory";
import ChatbotPanel from "@/components/ChatbotPanel";
import ServicesMarquee from "@/components/ServicesMarquee";
import HeroSlideshow from "@/components/HeroSlideshow";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

import { motion } from "framer-motion";

// ... existing imports

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  bio?: string;
  qualifications: string[];
  languages: string[];
  pricePerSession: number;
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
}

interface HomeClientProps {
  initialDoctors: Doctor[];
}

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
  transition: { duration: 0.2 }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } }
};

export default function HomeClient({ initialDoctors }: HomeClientProps) {
  const [healthScore, setHealthScore] = useState<number | undefined>(undefined);

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
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="relative overflow-hidden rounded-2xl border border-brand-blue/30 shadow-sm bg-gradient-to-r from-brand-blue/50 via-white to-brand-light">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#1c4966,transparent_25%),radial-gradient(circle_at_80%_10%,#5f8b70,transparent_25%),radial-gradient(circle_at_50%_80%,#8fbdd7,transparent_25%)]" />
              <div className="relative grid md:grid-cols-[1fr_1.05fr] items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="p-8 space-y-4"
                >
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
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="p-6"
                >
                  <HeroSlideshow />
                </motion.div>
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
        <section id="therapists" className="bg-white py-10">
          <div className="max-w-7xl mx-auto px-6 space-y-6">
            <motion.div
               variants={fadeInUp}
               initial="initial"
               whileInView="whileInView"
               viewport={{ once: true }}
            >
              <DoctorDirectory
                healthScore={healthScore}
                initialDoctors={initialDoctors}
              />
            </motion.div>

            {/* Mid-page CTA */}
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="rounded-2xl bg-brand-blue/25 border border-brand-blue/40 p-6 flex flex-col md:flex-row items-center justify-between gap-4"
            >
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
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-brand-light py-16 border-t border-brand-light/60">
          <motion.div 
            className="max-w-4xl mx-auto px-6 space-y-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-brand-dark">
              Any Questions?
            </motion.h2>
            <motion.div variants={fadeInUp} className="space-y-0">
              {faqs.map((item) => (
                <details
                  key={item.q}
                  className="group border-b border-gray-200"
                >
                  <summary className="flex items-center justify-between py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="text-lg font-medium text-brand-dark group-hover:text-brand-blue transition-colors">
                      {item.q}
                    </span>
                    <ChevronRightIcon className="w-5 h-5 text-brand-dark transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <div className="pb-5 text-brand-dark/70 leading-relaxed">
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
