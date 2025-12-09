"use client";

import { useState, useEffect } from "react";

interface Ad {
  _id: string;
  content: string;
}

// Function to parse markdown-style bold text (*text*)
const parseMarkdown = (text: string) => {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <strong key={index} className="font-bold not-italic">
          {part.slice(1, -1)}
        </strong>
      );
    }
    return (
      <span key={index} className="italic">
        {part}
      </span>
    );
  });
};

export default function AdMarquee() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveAds = async () => {
      try {
        const res = await fetch("/api/promotions/active");
        const data = await res.json();
        setAds(data);
      } catch (error) {
        console.error("Error fetching active ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveAds();
  }, []);

  if (loading || ads.length === 0) return null;

  return (
    <div className="bg-brand-green text-white overflow-hidden py-3 relative z-40 w-full shadow-md flex items-center">
      <div className="flex whitespace-nowrap gap-4 px-8 w-full animate-ticker hover:[animation-play-state:paused]">
        {ads.map((ad) => (
          <span key={ad._id} className="text-sm md:text-base flex-shrink-0">
            {parseMarkdown(ad.content)}
          </span>
        ))}
      </div>
    </div>
  );
}
