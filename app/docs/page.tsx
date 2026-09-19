"use client";

import React, { useState } from "react";
import { DOCS_SECTIONS } from "@/data/docsData";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { CompanionRoster } from "@/components/docs/CompanionRoster";
import { Sparkles, Terminal } from "lucide-react";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("about");

  const handleSelectSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header Banner */}
      <div className="mb-12 border-b border-[#00FF87]/15 pb-8">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00FF87] font-bold mb-3">
          <span className="beacon-dot"></span>
          <span>System Manual & Protocol Specs · v1.0</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-white tracking-tight">
          Cove Protocol <span className="text-gradient-mint">Documentation</span>
        </h1>
        <p className="text-[#8E9E94] text-lg max-w-2xl mt-3 font-sans font-light">
          Comprehensive guide to hatching, training, and exploring Sherwood with sovereign AI pixel companions on Robinhood Chain.
        </p>
      </div>

      {/* Grid Layout: Sidebar + Main Content */}
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <DocsSidebar
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
        />

        <div className="flex-1 space-y-16 max-w-3xl">
          {DOCS_SECTIONS.map((sec) => (
            <section
              key={sec.id}
              id={sec.id}
              className="scroll-mt-24 border-b border-white/5 pb-12 last:border-b-0"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-[#00FF87] font-bold">
                {sec.number} · {sec.title}
              </span>
              <h2 className="font-display font-bold text-3xl text-white mt-2 mb-4">
                {sec.subtitle || sec.title}
              </h2>
              <div className="text-[#8E9E94] text-sm leading-relaxed whitespace-pre-line space-y-4 font-sans font-light">
                {sec.content}
              </div>
            </section>
          ))}

          {/* 009 · Roster & Factions Component */}
          <CompanionRoster />
        </div>
      </div>
    </div>
  );
}
