import React from "react";
import { CANONICAL_ROSTER } from "@/data/companions";

export const CompanionRoster: React.FC = () => {
  return (
    <div className="space-y-6" id="roster">
      <div className="border-b border-[#00FF87]/15 pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-[#00FF87] font-bold">
          009 · Roster & Factions
        </span>
        <h2 className="font-display font-bold text-3xl text-white mt-2">
          Sherwood Forest Companions
        </h2>
        <p className="text-[#8E9E94] text-sm mt-2 leading-relaxed font-sans font-light">
          Sherwood Forest is home to 12 unique legendary companions, divided into specialized tactical factions. Each has their own custom role and vital duties on Robinhood Chain.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {CANONICAL_ROSTER.map((comp, idx) => (
          <div
            key={idx}
            className="glass-panel glass-panel-hover rounded-2xl p-5 border border-[#00FF87]/15 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 rounded-xl bg-[#050B07] border border-[#00FF87]/20">
                    {comp.avatarIcon}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-base text-white flex items-center gap-1.5">
                      <span>{comp.name}</span>
                      <span>{comp.badge}</span>
                    </h3>
                    <span className="text-xs text-[#00FF87] font-semibold">{comp.role}</span>
                  </div>
                </div>
                <span className="font-mono text-[9px] uppercase px-2.5 py-0.5 rounded-full bg-[#00FF87]/15 text-[#00FF87] font-bold border border-[#00FF87]/30">
                  {comp.rarity}
                </span>
              </div>

              <p className="text-xs text-[#8E9E94] leading-relaxed mt-2 font-sans font-light">
                “{comp.description}”
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] font-mono">
              <span className="text-white/40">Prime Stat:</span>
              <span className="text-[#00FF87] font-bold">{comp.primeStat}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
