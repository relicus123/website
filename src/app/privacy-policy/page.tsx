'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const privacyData = [
  {
    id: "definitions",
    title: "1. Definitions",
    content: [
      "**Company:** Relicus Psychology LLP, operating under the brand Relicus Psychological Services.",
      "**User/Client:** Any individual accessing or using Relicus services.",
      "**Platform:** Any website, mobile application, or communication channel used to deliver Relicus services.",
      "**Professional:** Licensed counselors, psychologists, or trainers authorized by Relicus."
    ]
  },
  {
    id: "nature",
    title: "2. Nature of Services",
    content: [
      "Relicus provides psychological and wellness support including:",
      "• Online and in-person counseling/therapy sessions.",
      "• Periodic self-assessments, psychological tests, and wellness evaluations.",
      "• Workshops, webinars, and training programs.",
      "• Self-help resources and educational content.",
      "• Private, encrypted communication with professionals.",
      "Relicus may modify or update services at its discretion."
    ]
  },
  {
    id: "consent",
    title: "3. Consent",
    content: ["By using Relicus services, you consent to the collection, storage, processing, disclosure, and transfer of your personal information as described in this Privacy Policy. You may withdraw consent at any time by contacting us, though withdrawing consent may limit your access to certain features."]
  },
  {
    id: "collection",
    title: "4. Personal Information We Collect",
    content: [
      "• **Identity Data:** Name, age, gender.",
      "• **Contact Data:** Email, phone number, emergency contacts.",
      "• **Health Data:** Medical or mental health history, therapy notes, assessment responses.",
      "• **Transaction Data:** Payment details, billing information.",
      "• **Technical Data:** IP address, device information, browser type, cookies."
    ]
  },
  {
    id: "how-collect",
    title: "5. How We Collect Your Data",
    content: [
      "• **Direct Interactions:** Registration, booking sessions, communication.",
      "• **Automated Technologies:** Cookies and similar tools.",
      "• **Third-Party Sources:** Partners or publicly available information."
    ]
  },
  {
    id: "purpose",
    title: "6. Purpose of Data Collection",
    content: [
      "• Provide and manage services effectively.",
      "• Communicate with you and respond to inquiries.",
      "• Improve user experience using analytics.",
      "• Process payments and transactions.",
      "• Comply with legal or regulatory obligations."
    ]
  },
  {
    id: "sharing",
    title: "7. Data Sharing",
    content: [
      "We may share data with Service Providers (IT, payments), Legal Authorities, and Professionals to facilitate sessions. We do not sell your personal information to third parties."
    ]
  },
  {
    id: "security",
    title: "8. Data Security",
    content: ["We implement strong security measures, including encryption and secure servers, to protect your data from unauthorized access, alteration, or disclosure."]
  },
  {
    id: "retention",
    title: "9. Data Retention",
    content: ["We retain personal information only as long as necessary to fulfill the purposes for which it was collected, including compliance with legal, accounting, or reporting requirements."]
  },
  {
    id: "rights",
    title: "10. Your Rights",
    content: [
      "You have the right to access, correct, or delete your data, and to object to processing. To exercise these rights, contact us at: relicus.psy@gmail.com"
    ]
  },
  {
    id: "cookies",
    title: "11. Cookies and Tracking",
    content: ["We use cookies and tracking technologies to enhance your experience. You can manage cookie preferences through your browser settings."]
  },
  {
    id: "links",
    title: "12. Third-Party Links",
    content: ["Our platform may include links to external websites. We are not responsible for their privacy practices."]
  },
  {
    id: "updates",
    title: "13. Changes to This Privacy Policy",
    content: ["We may update this policy periodically. Significant updates will be communicated via email or our platform."]
  },
  {
    id: "contact",
    title: "14. Contact Us",
    content: [
      "For questions regarding privacy:",
      "• Email: relicus.psy@gmail.com",
      "• WhatsApp: +91 623 5252 624"
    ]
  }
];

// Helper to parse bold text (**text**)
const parseBold = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="text-slate-900 font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
};

import BackToTop from '@/components/BackToTop';

export default function PrivacyPolicyPage() {

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    // Check for global GSAP ScrollSmoother
    // @ts-ignore
    const smoother = window.ScrollSmoother?.get();
    if (smoother) {
      // Offset for sticky header (approx 100px)
      smoother.scrollTo(element, true, "top 120px");
    } else {
      const yOffset = -120; // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* 1. Header Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 py-20 px-6 text-center text-white shadow-lg">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="container mx-auto max-w-4xl"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-emerald-100 text-lg opacity-90">
            Last Updated: December 10, 2025
          </p>
        </motion.div>
      </section>

      {/* 2. Main Body */}
      <div className="container mx-auto px-6 py-16 lg:py-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Left Column: Fixed TOC */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-32 space-y-2 max-h-[calc(100vh-10rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-emerald-200">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Contents</h3>
              <nav className="space-y-1">
                {privacyData.map((section) => (
                  <button
                    key={section.id}
                    onClick={(e) => scrollToSection(section.id, e)}
                    className="block w-full text-left px-3 py-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors duration-200 truncate"
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Right Column: Content */}
          <main className="lg:col-span-3 space-y-8">
             {privacyData.map((section, index) => (
               <motion.div 
                  key={section.id} 
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 scroll-mt-32"
               >
                 <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b border-slate-100">
                    {section.title}
                 </h2>
                 <div className="space-y-3 text-slate-600 leading-relaxed">
                   {section.content.map((line, idx) => {
                     // Check for Contact Us specific formatting
                     if (section.id === 'contact' && (line.includes('Email:') || line.includes('WhatsApp:'))) {
                        return (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg max-w-max">
                             {line.includes('Email') ? <Mail className="w-5 h-5 text-emerald-500" /> : <Phone className="w-5 h-5 text-teal-500" />}
                             <span className="font-medium text-slate-700">{line.replace(/.*: /, '')}</span>
                          </div>
                        );
                     }

                     // Standard Bullet Points
                     if (line.startsWith('•')) {
                       return (
                         <div key={idx} className="flex items-start gap-2 pl-4">
                           <span className="text-emerald-500 mt-1.5 min-w-[6px] h-[6px] rounded-full bg-emerald-500 block"></span>
                           <p className="flex-1">{parseBold(line.substring(1).trim())}</p>
                         </div>
                       );
                     }

                     // Regular Lines
                     return <p key={idx}>{parseBold(line)}</p>;
                   })}
                 </div>
               </motion.div>
             ))}
          </main>

        </div>
      </div>
      <BackToTop />
    </div>
  );
}
