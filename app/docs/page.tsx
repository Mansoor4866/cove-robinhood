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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header Banner */}
      <div className="mb-12 border-b border-[#0d0e11]/10 pb-8">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#0d0e11]/60 font-semibold mb-3">
          <span className="w-2 h-2 rounded-full bg-[#58e78f]"></span>
          <span>System Manual & Protocol Specs · v1.0</span>
        </div>
        <h1 className="font-display font-medium text-4xl sm:text-5xl text-[#0d0e11] tracking-tight">
          Cove Protocol Documentation
        </h1>
        <p className="text-[#0d0e11]/70 text-lg max-w-2xl mt-3 font-sans">
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
              className="scroll-mt-24 border-b border-[#0d0e11]/10 pb-12 last:border-b-0"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-[#0053ff] font-bold">
                {sec.number} · {sec.title}
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0d0e11] mt-2 mb-4">
                {sec.subtitle || sec.title}
              </h2>
              <div className="text-[#0d0e11]/80 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4 font-sans">
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
