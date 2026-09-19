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
      <div className="sticky top-24 space-y-1">
        <div className="text-[10px] uppercase tracking-widest text-black/40 font-bold mb-4 px-3">
          Documentation Index
        </div>
        <nav className="space-y-0.5">
          {DOCS_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                activeSection === sec.id
                  ? "bg-black text-[#CCFF00] font-bold"
                  : "text-black/60 hover:text-black hover:bg-black/5"
              }`}
            >
              <span>
                {sec.number} {sec.title}
              </span>
            </button>
          ))}
          <button
            onClick={() => onSelectSection("roster")}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
              activeSection === "roster"
                ? "bg-black text-[#CCFF00] font-bold"
                : "text-black/60 hover:text-black hover:bg-black/5"
            }`}
          >
            <span>009 Roster & Factions</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};
