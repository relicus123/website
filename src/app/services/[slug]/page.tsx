"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/data/servicesData";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ServicePage({ params }: ServicePageProps) {
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <motion.main
      className="min-h-screen bg-white"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50/50 to-white pt-20 pb-12 sm:pt-28 md:pt-40 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            {/* Left: Title & Description */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-brand-dark leading-tight"
              >
                {(() => {
                  const words = service.title.split(" ");
                  const lastWord = words.pop();
                  const firstPart = words.join(" ");
                  return (
                    <>
                      {firstPart}{" "}
                      <span className="text-brand-green">{lastWord}</span>
                    </>
                  );
                })()}
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg md:text-xl text-brand-dark/80 leading-relaxed max-w-lg"
              >
                {service.shortDescription}
              </motion.p>

              {/* CTA Button */}
              <motion.div variants={itemVariants} className="mt-6 sm:mt-8">
                <Link
                  href="/#book"
                  className="inline-block button-primary px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                >
                  Book Now
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Hero Image */}
            <motion.div
              variants={itemVariants}
              className="relative h-64 sm:h-80 md:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl"
            >
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Content Section */}
      <section className="py-12 sm:py-16 md:py-24 border-b border-brand-light/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={pageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="prose prose-lg max-w-none text-brand-dark/80"
          >
            <p className="text-base sm:text-lg md:text-xl leading-relaxed whitespace-pre-line">
              {service.fullDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Types Section */}
      {service.slug === "counselling-psychotherapy" && (
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-emerald-50/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.h2
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
            >
              Individual, Family & Couple
            </motion.h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
            >
              <motion.div
                variants={itemVariants}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-brand-light/20 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg sm:text-xl font-bold text-brand-green mb-3">
                  Individual Counselling
                </h3>
                <p className="text-brand-dark/80 leading-relaxed">
                  Personal one-to-one therapy sessions to help with stress,
                  anxiety, depression, and personal emotional growth.
                </p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-md border border-brand-light/20 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-brand-blue mb-3">
                  Family & Couple Therapy
                </h3>
                <p className="text-brand-dark/80 leading-relaxed">
                  Sessions designed to improve communication, solve conflicts,
                  and build healthy emotional connections.
                </p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-md border border-brand-light/20 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-brand-dark mb-3">
                  Behavior Therapy
                </h3>
                <p className="text-brand-dark/80 leading-relaxed">
                  Goal-oriented therapy focused on changing negative behaviors
                  and developing positive habits.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Psychological Assessment Types Section */}
      {service.slug === "psychological-assessments" && (
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-emerald-50/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.h2
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
            >
              Types of Assessments
            </motion.h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            >
              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-md border border-brand-light/20 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-brand-green mb-3">
                  Psychological Assessment
                </h3>
                <p className="text-brand-dark/80 leading-relaxed">
                  Comprehensive evaluation of emotional, behavioral, and mental
                  health for accurate diagnosis and treatment planning.
                </p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-md border border-brand-light/20 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-brand-blue mb-3">
                  Neurocognitive Assessment
                </h3>
                <p className="text-brand-dark/80 leading-relaxed">
                  Assessment of memory, attention, thinking skills, and brain
                  functions to identify cognitive difficulties.
                </p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-md border border-brand-light/20 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-brand-dark mb-3">
                  Learning Disability Assessment
                </h3>
                <p className="text-brand-dark/80 leading-relaxed">
                  Specialized assessments to identify learning difficulties like
                  dyslexia, dyscalculia, or attention-related problems.
                </p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-md border border-brand-light/20 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-brand-green mb-3">
                  IQ Assessment
                </h3>
                <p className="text-brand-dark/80 leading-relaxed">
                  Standardized testing to measure intellectual abilities for
                  academic support, clinical, and career guidance.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Learning Support Section */}
      {service.slug === "learning-support-remedial-services" && (
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-emerald-50/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.h2
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
            >
              Remedial Training
            </motion.h2>
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white p-5 sm:p-8 md:p-10 rounded-lg shadow-md border border-brand-light/20"
            >
              <p className="text-base sm:text-lg md:text-xl text-brand-dark/80 leading-relaxed text-center">
                Specialised academic support for children with learning
                difficulties to improve reading, writing, attention, and
                academic performance.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Speech & Language Section */}
      {service.slug === "speech-language-services" && (
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-emerald-50/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.h2
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
            >
              Speech Therapy
            </motion.h2>
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white p-8 md:p-10 rounded-lg shadow-md border border-brand-light/20"
            >
              <p className="text-lg md:text-xl text-brand-dark/80 leading-relaxed text-center">
                Therapy sessions to improve speech, language, communication, and
                swallowing difficulties in children and adults.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Training & Internships Section */}
      {service.slug === "training-internships" && (
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-emerald-50/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.h2
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
            >
              Programs & Training
            </motion.h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            >
              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-md border border-brand-light/20 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-brand-blue mb-3">
                  Internship Program
                </h3>
                <p className="text-brand-dark/80 leading-relaxed">
                  Hands-on training for psychology students to gain clinical
                  exposure and real-world experience under supervision.
                </p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-md border border-brand-light/20 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-brand-dark mb-3">
                  Workshops & Webinars
                </h3>
                <p className="text-brand-dark/80 leading-relaxed">
                  Interactive programs focused on mental health awareness,
                  professional skill-based training sessions, and educational
                  workshops.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Referral & Support Services Section */}
      {service.slug === "referral-support-services" && (
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-emerald-50/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.h2
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
            >
              Support & Referral Services
            </motion.h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            >
              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-md border border-brand-light/20 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-brand-blue mb-3">
                  Trauma Care & Crisis Interventions
                </h3>
                <p className="text-brand-dark/80 leading-relaxed">
                  Immediate and long term emotional support and therapy for
                  individuals coping with trauma, abuse, grief, accidents, and
                  other crisis situations to help begin healing and recovery.
                </p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-md border border-brand-light/20 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-brand-dark mb-3">
                  Referral Services
                </h3>
                <p className="text-brand-dark/80 leading-relaxed">
                  Guidance and connection to psychiatrists other medical
                  professionals, special educators, or rehabilitation centers
                  for additional care when needed.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
            >
              Frequently Asked Questions
            </motion.h2>

            <div className="space-y-3 sm:space-y-4">
              {service.faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="border border-brand-light/30 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* FAQ Header */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 md:py-5 flex items-center justify-between bg-white hover:bg-brand-light/20 transition-colors text-left gap-3"
                  >
                    <span className="font-semibold text-brand-dark text-sm sm:text-base md:text-lg">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDownIcon className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600" />
                    </motion.div>
                  </button>

                  {/* FAQ Body */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedFAQ === index ? "auto" : 0,
                      opacity: expandedFAQ === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden bg-brand-light/10"
                  >
                    <p className="px-4 sm:px-6 py-3 sm:py-4 text-brand-dark/80 leading-relaxed text-sm sm:text-base md:text-lg">
                      {faq.answer}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-emerald-50 to-teal-50 border-t border-brand-light/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-brand-dark"
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-brand-dark/70 mb-6 sm:mb-8 max-w-2xl mx-auto"
            >
              Take the first step toward your wellness journey. Our experienced
              professionals are here to support you every step of the way.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex gap-3 sm:gap-4 justify-center flex-wrap"
            >
              <Link
                href="/#book"
                className="button-primary px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
              >
                Book Now
              </Link>
              <Link
                href="/#therapists"
                className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-emerald-600 text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors text-sm sm:text-base"
              >
                Meet Our Team
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
