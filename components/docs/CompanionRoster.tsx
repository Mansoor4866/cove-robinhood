import React from "react";
import { CANONICAL_ROSTER } from "@/data/companions";

export const CompanionRoster: React.FC = () => {
  return (
    <div className="space-y-6" id="roster">
      <div className="border-b border-[#0d0e11]/10 pb-4">
        <span className="font-mono text-xs uppercase tracking-wider text-[#0053ff] font-bold">
          009 · Roster & Factions
        </span>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0d0e11] mt-2">
          Sherwood Forest Companions
        </h2>
        <p className="text-[#0d0e11]/70 text-sm mt-2 leading-relaxed font-sans">
          Sherwood Forest is home to 12 unique legendary companions, divided into specialized tactical factions. Each has their own custom role and vital duties on Robinhood Chain.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {CANONICAL_ROSTER.map((comp, idx) => (
          <div
            key={idx}
            className="facto-card p-5 flex flex-col justify-between hover:border-[#0d0e11]/30 transition"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 rounded-xl bg-[#f4f4f4]">
                    {comp.avatarIcon}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-base text-[#0d0e11] flex items-center gap-1.5">
                      <span>{comp.name}</span>
                      <span>{comp.badge}</span>
                    </h3>
                    <span className="text-xs text-[#f243ac] font-semibold">{comp.role}</span>
                  </div>
                </div>
                <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-[#0d0e11]/5 text-[#0d0e11] font-bold">
                  {comp.rarity}
                </span>
              </div>

              <p className="text-xs text-[#0d0e11]/70 leading-relaxed mt-2 font-sans">
                “{comp.description}”
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#0d0e11]/10 flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#0d0e11]/50">Prime Stat:</span>
              <span className="text-[#0d0e11] font-bold">{comp.primeStat}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
