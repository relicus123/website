'use client';

import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import BackToTop from '@/components/BackToTop';

const refundData = [
  {
    id: "cancellations",
    title: "1. Session Cancellations",
    content: [
      "• If you wish to cancel or reschedule a session, please let us know at least 24 hours in advance.",
      "• Sessions cancelled with 24 hours’ notice can be either rescheduled or fully refunded.",
      "• If a session is cancelled less than 24 hours before the appointment, the fee will be charged in full."
    ]
  },
  {
    id: "no-show",
    title: "2. Missed Sessions (No-Show)",
    content: [
      "• If a client does not attend a scheduled session without prior information, the session will be considered used and no refund will be given."
    ]
  },
  {
    id: "packages",
    title: "3. Prepaid Packages",
    content: [
      "• For clients who purchase a package of sessions, refunds are possible for the unused sessions if you decide to discontinue.",
      "• The sessions already attended will be charged at the standard single-session rate before calculating the refund."
    ]
  },
  {
    id: "workshops",
    title: "4. Workshops and Training Programs",
    content: [
      "• Each workshop or training may have its own cancellation terms, which will be shared at the time of registration.",
      "• In general, cancellations made before the specified deadline are eligible for a refund."
    ]
  },
  {
    id: "special",
    title: "5. Special Considerations",
    content: [
      "We recognize that emergencies or unavoidable circumstances may occur. In such cases, please contact us, and we will review the situation with understanding and fairness."
    ]
  },
  {
    id: "process",
    title: "6. Refund Process",
    content: [
      "• Approved refunds will be completed within 7 working days."
    ]
  },
  {
    id: "contact",
    title: "7. Contact Us",
    content: [
      "For cancellations, rescheduling, or refund-related queries, you can reach us at:",
      "• Email: relicus.psy@gmail.com",
      "• WhatsApp: +91 623 5252 624"
    ]
  }
];

// Helper to parse bold text (**text**) - keeping consistent with Privacy Policy
const parseBold = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="text-slate-900 font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
};

export default function RefundPolicyPage() {
  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    // @ts-ignore
    const smoother = window.ScrollSmoother?.get();
    if (smoother) {
      smoother.scrollTo(element, true, "top 120px");
    } else {
      const yOffset = -120; 
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
            Return & Refund Policy
          </h1>
          <p className="text-emerald-100 text-lg opacity-90 max-w-2xl mx-auto">
            At Relicus, we value the trust you place in us and aim to provide supportive, reliable, and high quality mental health services. We also understand that unexpected situations can arise, and our refund and cancellation policy is designed to be clear and fair.
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
                {refundData.map((section) => (
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
             {refundData.map((section, index) => (
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
