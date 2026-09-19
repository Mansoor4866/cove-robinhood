import React from "react";
import Image from "next/image";
import { Sparkles, Shield, Award, ArrowUpRight } from "lucide-react";
import { CANONICAL_ROSTER } from "@/data/companions";

export const CardShowcase: React.FC = () => {
  // Show top canonical companions with rich holographic cards
  const displayCompanions = CANONICAL_ROSTER.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00FF87] mb-3">
            <Sparkles className="w-4 h-4" />
            <span>003 · SOVEREIGN COMPANION ROSTER</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Canonical Sherwood Guilds.<br />
            <span className="text-gradient-mint">Living On-Chain Collectibles.</span>
          </h2>
        </div>
        <p className="text-[#8E9E94] text-sm md:text-base max-w-md font-sans leading-relaxed">
          Each companion possesses unique archetype abilities, prime combat stats, and adaptive visual evolution traits.
        </p>
      </div>

      {/* Holographic Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayCompanions.map((c, idx) => (
          <div
            key={c.id || idx}
            className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group border border-[#00FF87]/15"
          >
            {/* Top Ribbon */}
            <div className="flex items-center justify-between font-mono text-[10px] mb-4">
              <span className="text-white/40">{c.avatarIcon} {c.role}</span>
              <span className="bg-[#00FF87]/15 text-[#00FF87] font-bold px-2 py-0.5 rounded-full border border-[#00FF87]/30">
                {c.rarity}
              </span>
            </div>

            {/* Companion Sprite Display Pod */}
            <div className="py-6 flex flex-col items-center justify-center relative my-2 bg-[#050B07]/60 rounded-2xl border border-white/5 group-hover:border-[#00FF87]/30 transition">
              <div className="relative w-32 h-32 select-none transform group-hover:scale-105 transition-all duration-300">
                <Image
                  src="/robin-fox.png"
                  alt={c.name}
                  fill
                  className="object-contain drop-shadow-[0_0_15px_rgba(0,255,135,0.2)]"
                />
              </div>
              <div className="w-20 h-1.5 bg-[#00FF87]/20 rounded-full mt-2 blur-[0.5px]"></div>
            </div>

            {/* Content & Stats */}
            <div className="pt-2">
              <h3 className="font-display font-bold text-lg text-white group-hover:text-[#00FF87] transition flex items-center justify-between">
                <span>{c.name}</span>
                <span className="font-mono text-xs text-white/50">{c.species}</span>
              </h3>

              <p className="text-[#8E9E94] text-xs font-sans mt-2 line-clamp-2 leading-relaxed">
                {c.description}
              </p>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[11px]">
                <span className="text-white/40">Prime Stat:</span>
                <span className="text-[#00FF87] font-bold">{c.primeStat}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
