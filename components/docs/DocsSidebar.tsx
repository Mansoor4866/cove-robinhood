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
      <div className="sticky top-28 space-y-1 glass-panel p-4 rounded-2xl border border-[#00FF87]/15">
        <div className="text-[10px] uppercase tracking-widest text-[#00FF87] font-bold mb-3 px-2 flex items-center gap-1.5">
          <span className="beacon-dot"></span>
          <span>Index</span>
        </div>
        <nav className="space-y-1">
          {DOCS_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
                activeSection === sec.id
                  ? "bg-[#00FF87]/20 text-[#00FF87] font-bold border border-[#00FF87]/30 shadow-[0_0_10px_rgba(0,255,135,0.1)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
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
                ? "bg-[#00FF87]/20 text-[#00FF87] font-bold border border-[#00FF87]/30 shadow-[0_0_10px_rgba(0,255,135,0.1)]"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>009 Roster & Factions</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};
