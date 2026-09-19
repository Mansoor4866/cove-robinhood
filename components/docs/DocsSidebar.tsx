"use client";

import React from "react";
import { DOCS_SECTIONS } from "@/data/docsData";

interface DocsSidebarProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
}

export const DocsSidebar: React.FC<DocsSidebarProps> = ({
  activeSection,
  onSelectSection,
}) => {
  return (
    <aside className="w-full md:w-64 shrink-0 font-mono text-xs">
      <div className="sticky top-24 space-y-1 facto-card p-4">
        <div className="text-[10px] uppercase tracking-wider text-[#0d0e11]/40 font-bold mb-3 px-2 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#58e78f]"></span>
          <span>Index</span>
        </div>
        <nav className="space-y-1">
          {DOCS_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
                activeSection === sec.id
                  ? "bg-[#0d0e11] text-white font-bold"
                  : "text-[#0d0e11]/70 hover:text-[#0d0e11] hover:bg-[#f4f4f4]"
              }`}
            >
              <span>
                {sec.number} {sec.title}
              </span>
            </button>
          ))}
          <button
            onClick={() => onSelectSection("roster")}
            className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
              activeSection === "roster"
                ? "bg-[#0d0e11] text-white font-bold"
                : "text-[#0d0e11]/70 hover:text-[#0d0e11] hover:bg-[#f4f4f4]"
            }`}
          >
            <span>009 Roster & Factions</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};
