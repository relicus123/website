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
      <section className="bg-gradient-to-b from-emerald-50/50 to-white pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Title & Description */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent leading-tight"
              >
                {service.title}
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-brand-dark/80 leading-relaxed max-w-lg"
              >
                {service.shortDescription}
              </motion.p>

              {/* CTA Button */}
              <motion.div variants={itemVariants} className="mt-8">
                <Link
                  href="/#book"
                  className="inline-block button-primary px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Book Now
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Hero Image */}
            <motion.div
              variants={itemVariants}
              className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
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
      <section className="py-16 md:py-24 border-b border-brand-light/20">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <motion.div
            variants={pageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="prose prose-lg max-w-none text-brand-dark/80"
          >
            <p className="text-lg md:text-xl leading-relaxed">
              {service.fullDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
            >
              Frequently Asked Questions
            </motion.h2>

            <div className="space-y-4">
              {service.faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="border border-brand-light/30 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* FAQ Header */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 md:py-5 flex items-center justify-between bg-white hover:bg-brand-light/20 transition-colors text-left"
                  >
                    <span className="font-semibold text-brand-dark text-lg">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-4"
                    >
                      <ChevronDownIcon className="w-5 h-5 text-emerald-600" />
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
                    <p className="px-6 py-4 text-brand-dark/80 leading-relaxed text-base md:text-lg">
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
      <section className="py-16 md:py-20 bg-gradient-to-r from-emerald-50 to-teal-50 border-t border-brand-light/20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark"
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-brand-dark/70 mb-8 max-w-2xl mx-auto"
            >
              Take the first step toward your wellness journey. Our experienced
              professionals are here to support you every step of the way.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex gap-4 justify-center flex-wrap"
            >
              <Link
                href="/#book"
                className="button-primary px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Book Now
              </Link>
              <Link
                href="/#therapists"
                className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
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
