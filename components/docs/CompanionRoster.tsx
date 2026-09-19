import React from "react";
import { CANONICAL_ROSTER } from "@/data/companions";

export const CompanionRoster: React.FC = () => {
  return (
    <div className="space-y-6" id="roster">
      <div className="border-b border-black/10 pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-[#4C6B00] font-bold">
          009 · Roster & Factions
        </span>
        <h2 className="font-display font-bold text-3xl text-black mt-2">
          Sherwood Forest Companions
        </h2>
        <p className="text-black/70 text-sm mt-2 leading-relaxed">
          Sherwood Forest is home to 12 unique legendary companions, divided into specialized tactical factions. Each has their own custom role and vital duties on Robinhood Chain.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {CANONICAL_ROSTER.map((comp, idx) => (
          <div
            key={idx}
            className="bg-white border border-black/10 rounded-2xl p-5 border-glow shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 rounded-xl bg-[#FAFAF7] border border-black/5">
                    {comp.avatarIcon}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-base text-black flex items-center gap-1.5">
                      <span>{comp.name}</span>
                      <span>{comp.badge}</span>
                    </h3>
                    <span className="text-xs text-[#4C6B00] font-semibold">{comp.role}</span>
                  </div>
                </div>
                <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-black text-[#CCFF00] font-bold">
                  {comp.rarity}
                </span>
              </div>

              <p className="text-xs text-black/70 leading-relaxed mt-2">
                “{comp.description}”
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-black/5 flex justify-between items-center text-[10px] font-mono">
              <span className="text-black/40">Prime Stat:</span>
              <span className="text-[#4C6B00] font-bold">{comp.primeStat}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
