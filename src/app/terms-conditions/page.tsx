'use client';

import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import BackToTop from '@/components/BackToTop';

const termsData = [
  {
    id: "definitions",
    title: "1. Definitions",
    content: [
      "• **Company:** Refers to Relicus Psychology LLP, operating under the brand name Relicus Psychological Services.",
      "• **Client/User:** Any individual accessing or using Relicus services.",
      "• **Platform:** Any website, online platform, or communication channel used to provide Relicus services.",
      "• **Professional:** Qualified counselors, psychologists, trainers, or mental health professionals authorized by Relicus.",
      "• **Third-Party Services:** External platforms or tools that Relicus may use for payments, communication, or learning."
    ]
  },
  {
    id: "nature",
    title: "2. Nature of Services",
    content: [
      "Relicus provides psychological support and wellness services, including:",
      "• Online and in-person counseling/therapy sessions.",
      "• Workshops, webinars, and training programs for personal and professional growth.",
      "• Psychological assessments and self-help resources.",
      "• Educational content, group sessions, and community support initiatives.",
      "Our services are designed to help clients process past experiences, build resilience, and create a healthier future. Relicus may modify, add, or discontinue offerings at its discretion."
    ]
  },
  {
    id: "acceptance",
    title: "3. Acceptance of Terms",
    content: [
      "By registering, booking, or using Relicus services, you acknowledge that you have read, understood, and agreed to these Terms, as well as our Privacy Policy and Refund Policy."
    ]
  },
  {
    id: "eligibility",
    title: "4. Eligibility",
    content: [
      "• Clients must be 18 years or older to book services independently.",
      "• Those under 18 may access services only with parental or guardian consent.",
      "• Accurate and up-to-date information must be provided during registration and booking."
    ]
  },
  {
    id: "responsibilities",
    title: "5. Client Responsibilities",
    content: [
      "As a client, you agree to:",
      "• Maintain confidentiality and security of your account or booking details.",
      "• Use services respectfully, ethically, and in accordance with applicable laws.",
      "• Communicate with professionals in a professional and courteous manner.",
      "• Participate actively in sessions to foster personal growth and healing.",
      "• Avoid misusing sessions or the platform for purposes unrelated to therapy or wellness."
    ]
  },
  {
    id: "limitations",
    title: "6. Services and Limitations",
    content: [
      "• Relicus services are not emergency services. In case of a crisis or medical emergency, please contact local emergency services or visit the nearest hospital.",
      "• While Relicus professionals are qualified, individual outcomes may vary. Our goal is to provide support, guidance, and tools to help clients navigate challenges and strengthen resilience."
    ]
  },
  {
    id: "fees",
    title: "7. Fees and Payments",
    content: [
      "• Fees are displayed prior to booking.",
      "• Payment is required in advance for individual sessions, workshops, or packages.",
      "• Payments are processed via trusted third-party platforms; using them implies acceptance of their terms.",
      "• Fees and payment terms may be updated with prior notice."
    ]
  },
  {
    id: "cancellations",
    title: "8. Cancellations and Refunds",
    content: [
      "• Clients may cancel or reschedule sessions with at least 24 hours’ notice.",
      "• Cancellations with sufficient notice are eligible for rescheduling or refund.",
      "• Missed sessions or late cancellations may incur full charges.",
      "• Refunds for packages, workshops, or courses follow our Refund Policy, available on the platform."
    ]
  },
  {
    id: "conduct",
    title: "9. User Conduct and Misconduct",
    content: [
      "Clients are expected to:",
      "• Treat all professionals and other clients with dignity, respect, and courtesy.",
      "• Avoid disruptive, aggressive, or inappropriate behavior.",
      "• Use services for their intended purpose: personal growth, mental wellness, and skill development.",
      "Prohibited actions include:",
      "• Sexually inappropriate, harassing, or offensive communication.",
      "• Payment fraud, fake bookings, or misuse of platform resources.",
      "• Recording, sharing, or distributing session content without permission.",
      "Violations may result in immediate termination of services without refund and potential legal action."
    ]
  },
  {
    id: "ip",
    title: "10. Intellectual Property",
    content: [
      "All content provided by Relicus (workshop materials, assessments, graphics, or written resources) is protected under intellectual property law. Unauthorized reproduction or distribution is prohibited."
    ]
  },
  {
    id: "privacy",
    title: "11. Privacy and Confidentiality",
    content: [
      "• Client information and therapy-related discussions are strictly confidential, except where disclosure is required by law (e.g., risk of harm to self or others, court orders).",
      "• Our Privacy Policy details how your data is collected, used, and protected."
    ]
  },
  {
    id: "liability",
    title: "12. Limitation of Liability",
    content: [
      "• Relicus is not liable for indirect, incidental, or consequential damages arising from the use of services.",
      "• Total liability is limited to the amount paid for the service in question."
    ]
  },
  {
    id: "indemnification",
    title: "13. Indemnification",
    content: [
      "Clients agree to indemnify and hold Relicus and its professionals harmless from any claims or damages arising from misuse of services, violation of Terms, or infringement of others’ rights."
    ]
  },
  {
    id: "termination",
    title: "14. Termination of Services",
    content: [
      "Relicus may suspend or terminate services for violation of Terms, misconduct, or misuse. Termination does not relieve clients of pending payments."
    ]
  },
  {
    id: "governing",
    title: "15. Governing Law",
    content: [
      "These Terms are governed by the laws of India. Disputes will be addressed under the Indian Arbitration and Conciliation Act, 1996, with proceedings conducted in English."
    ]
  },
  {
    id: "changes",
    title: "16. Changes to Terms",
    content: [
      "Relicus may revise these Terms as needed. Clients will be notified of major changes, and continued use of services signifies acceptance of updated Terms."
    ]
  },
  {
    id: "contact",
    title: "17. Contact Us",
    content: [
      "For questions, concerns, cancellations, or refunds:",
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

export default function TermsConditionsPage() {
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
            Terms and Conditions
          </h1>
          <p className="text-emerald-100 text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
            Welcome to Relicus Psychological Services, operated under Relicus Psychology LLP. The name “Relicus” reflects our philosophy: it represents something that has survived from the past. Through our services, we provide a safe space and nurturing environment where clients can confront challenges, heal, and grow.
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
                {termsData.map((section) => (
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
             {termsData.map((section, index) => (
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
             
             <div className="p-6 bg-slate-100 rounded-xl text-center text-slate-500 text-sm">
                By accessing or using our services, you agree to comply with and be bound by these Terms and Conditions.
             </div>
          </main>

        </div>
      </div>
      <BackToTop />
    </div>
  );
}
