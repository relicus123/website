'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, BookOpen, Users, Brain, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const aboutContent = {
  intro: {
    title: "Empowering Minds, Healing Hearts",
    subtitle: "A comprehensive psychological service platform dedicated to holistic well-being.",
    description: "Relicus is an initiative introduced by a group of psychologists that strives to make professional psychological support accessible and approachable. Our work spans therapy, trauma care, rehabilitation, education, and workplace wellbeing. We aim to create a supportive environment where mental health is prioritized and stigma is reduced.",
  },
  mission: {
    title: "Our Mission",
    text: "To provide compassionate, evidence-based, and personalized mental health care through a holistic and multidisciplinary approach. We address a wide spectrum of needs through psychotherapy, counseling, rehabilitation, and career guidance. By advancing innovative research and fostering continuous learning, we empower individuals to achieve personal growth and lead meaningful lives."
  },
  vision: {
    title: "Our Vision",
    text: "Fostering mental health, well-being, and inclusivity through psychological care, education, research, and holistic rehabilitation—delivered with evidence-based, compassionate services that empower individuals across all walks of life to recover, grow, and flourish."
  },
  philosophy: "At Relicus, we believe that psychological well-being is the foundation of a healthy, empowered society. Our client-centered approach integrates evidence-based practices with compassion and care."
};

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.2 } }
};

export default function AboutUs() {
  return (
    <div className="w-full bg-white overflow-hidden font-sans text-slate-800">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Decorative Background Blobs */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
        
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left: Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-emerald-100"
            >
              <ShieldCheck className="w-4 h-4" />
              Evidence-Based Care
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="text-slate-800">Welcome to </span>
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Relicus
              </span>
            </h1>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-600">
              {aboutContent.intro.title}
            </h2>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              {aboutContent.intro.description}
            </p>
          </motion.div>

          {/* Right: Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
             <div className="relative max-w-md mx-auto">
               <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
                  <Image 
                    src="/about-us-hero.png" 
                    alt="Relicus Psychology Support" 
                    width={450} 
                    height={375}
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  />
               </div>
               {/* Floating decorative element */}
               <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-emerald-100 flex items-center gap-3 z-10"
               >
                  <div className="bg-teal-100 p-2 rounded-full text-teal-600">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                     <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Focus</p>
                     <p className="text-sm font-bold text-slate-800">Holistic Wellbeing</p>
                  </div>
               </motion.div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Mission & Vision Bento Grid */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-slate-50">
        <div className="container mx-auto">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Mission Card */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border-l-4 border-emerald-500 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-center"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800">{aboutContent.mission.title}</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg">
                {aboutContent.mission.text}
              </p>
            </motion.div>

            {/* Vision Card - Double Coloring inverted */}
            <motion.div 
               variants={fadeInUp}
               className="bg-emerald-900 p-8 md:p-12 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-center"
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full mix-blend-overlay filter blur-3xl opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-emerald-800/50 rounded-2xl text-emerald-300 border border-emerald-700">
                    <Globe className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{aboutContent.vision.title}</h3>
                </div>
                <p className="text-emerald-100 leading-relaxed text-lg">
                  {aboutContent.vision.text}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Who We Are / Philosophy */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  Who We Are
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-700 italic font-medium leading-relaxed mb-16">
                &quot;{aboutContent.philosophy}&quot;
              </p>
            </motion.div>

            {/* Stats / Features Row */}
            <motion.div 
               variants={staggerContainer}
               initial="initial"
               whileInView="whileInView"
               viewport={{ once: true }}
               className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
               {[
                 { icon: Heart, label: "Therapy", color: "text-rose-500", bg: "bg-rose-50" },
                 { icon: Users, label: "Community", color: "text-blue-500", bg: "bg-blue-50" },
                 { icon: BookOpen, label: "Workshops", color: "text-amber-500", bg: "bg-amber-50" },
                 { icon: Brain, label: "Research", color: "text-purple-500", bg: "bg-purple-50" }
               ].map((item, idx) => (
                 <motion.div 
                   key={idx}
                   variants={fadeInUp}
                   className="flex flex-col items-center gap-3 group"
                 >
                   <div className={`p-4 rounded-2xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-300 box-shadow`}>
                     <item.icon className="w-8 h-8" />
                   </div>
                   <span className="font-semibold text-slate-600">{item.label}</span>
                 </motion.div>
               ))}
            </motion.div>
        </div>
      </section>

    </div>
  );
}
