"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CANONICAL_ROSTER, MOCK_LEADERBOARD } from "@/data/companions";
import { Trophy, ArrowRight, Shield, Zap, Sparkles, Swords, Compass, Lock, Star } from "lucide-react";
import { sounds } from "@/lib/audio";

// Rich custom visual metadata for each companion
const COMPANION_THEMES: Record<string, { bg: string; border: string; glow: string; textAccent: string; iconBg: string; power: number }> = {
  "Robin Fox": {
    bg: "from-emerald-500/15 via-teal-500/5 to-transparent",
    border: "group-hover:border-emerald-500/40",
    glow: "rgba(16, 185, 129, 0.2)",
    textAccent: "text-emerald-600",
    iconBg: "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-emerald-500/30",
    power: 96,
  },
  "Hartley": {
    bg: "from-amber-500/15 via-orange-500/5 to-transparent",
    border: "group-hover:border-amber-500/40",
    glow: "rgba(245, 158, 11, 0.2)",
    textAccent: "text-amber-600",
    iconBg: "bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-amber-500/30",
    power: 91,
  },
  "Little John": {
    bg: "from-blue-600/15 via-indigo-500/5 to-transparent",
    border: "group-hover:border-blue-500/40",
    glow: "rgba(37, 99, 235, 0.2)",
    textAccent: "text-blue-600",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-700 text-white shadow-blue-500/30",
    power: 98,
  },
  "Harelock": {
    bg: "from-cyan-500/15 via-sky-500/5 to-transparent",
    border: "group-hover:border-cyan-500/40",
    glow: "rgba(6, 182, 212, 0.2)",
    textAccent: "text-cyan-600",
    iconBg: "bg-gradient-to-br from-cyan-400 to-sky-600 text-white shadow-cyan-500/30",
    power: 84,
  },
  "Nutley": {
    bg: "from-rose-500/15 via-pink-500/5 to-transparent",
    border: "group-hover:border-rose-500/40",
    glow: "rgba(244, 63, 94, 0.2)",
    textAccent: "text-rose-600",
    iconBg: "bg-gradient-to-br from-rose-400 to-pink-600 text-white shadow-rose-500/30",
    power: 86,
  },
  "Badgerick": {
    bg: "from-stone-500/15 via-amber-700/5 to-transparent",
    border: "group-hover:border-stone-500/40",
    glow: "rgba(120, 113, 108, 0.2)",
    textAccent: "text-stone-700",
    iconBg: "bg-gradient-to-br from-stone-500 to-stone-700 text-white shadow-stone-500/30",
    power: 88,
  },
  "Olliver": {
    bg: "from-purple-500/15 via-violet-500/5 to-transparent",
    border: "group-hover:border-purple-500/40",
    glow: "rgba(168, 85, 247, 0.2)",
    textAccent: "text-purple-600",
    iconBg: "bg-gradient-to-br from-purple-400 to-indigo-600 text-white shadow-purple-500/30",
    power: 94,
  },
  "Willow": {
    bg: "from-fuchsia-500/15 via-pink-500/5 to-transparent",
    border: "group-hover:border-fuchsia-500/40",
    glow: "rgba(217, 70, 239, 0.2)",
    textAccent: "text-fuchsia-600",
    iconBg: "bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white shadow-fuchsia-500/30",
    power: 93,
  },
  "Prickle": {
    bg: "from-lime-500/15 via-emerald-500/5 to-transparent",
    border: "group-hover:border-lime-500/40",
    glow: "rgba(132, 204, 22, 0.2)",
    textAccent: "text-lime-700",
    iconBg: "bg-gradient-to-br from-lime-500 to-emerald-600 text-white shadow-lime-500/30",
    power: 79,
  },
  "Rook": {
    bg: "from-slate-700/15 via-zinc-800/5 to-transparent",
    border: "group-hover:border-slate-500/40",
    glow: "rgba(71, 85, 105, 0.2)",
    textAccent: "text-slate-800",
    iconBg: "bg-gradient-to-br from-slate-700 to-zinc-900 text-white shadow-slate-700/30",
    power: 87,
  },
  "Merry": {
    bg: "from-amber-400/15 via-yellow-500/5 to-transparent",
    border: "group-hover:border-amber-400/40",
    glow: "rgba(251, 191, 36, 0.2)",
    textAccent: "text-amber-600",
    iconBg: "bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-amber-400/30",
    power: 82,
  },
  "Cawthorne": {
    bg: "from-sky-500/15 via-teal-500/5 to-transparent",
    border: "group-hover:border-sky-500/40",
    glow: "rgba(14, 165, 233, 0.2)",
    textAccent: "text-sky-600",
    iconBg: "bg-gradient-to-br from-sky-400 to-teal-600 text-white shadow-sky-500/30",
    power: 92,
  },
};

export const FactoRoster: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"roster" | "leaderboard">("roster");
  const [filterRarity, setFilterRarity] = useState<string>("ALL");

  const filteredRoster = CANONICAL_ROSTER.filter(
    (c) => filterRarity === "ALL" || c.rarity.toUpperCase() === filterRarity.toUpperCase()
  );

  return (
    <section className="w-full py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#0d0e11]/50 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#f243ac]" />
            <span>Decentralized Species & Archetypes</span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-[#0d0e11] tracking-tight">
            Sherwood Companion Roster
          </h2>
          <p className="text-[#0d0e11]/70 text-base mt-2 max-w-xl font-sans">
            12 sovereign pixel archetypes with autonomous AI behavioral matrices, battle specializations, and on-chain growth mechanics.
          </p>
        </div>

        {/* Action / View Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Rarity Filter */}
          <div className="flex bg-[#0d0e11]/5 p-1 rounded-xl font-mono text-xs">
            {["ALL", "LEGENDARY", "EPIC", "RARE"].map((r) => (
              <button
                key={r}
                onClick={() => {
                  sounds.playBlip();
                  setFilterRarity(r);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                  filterRarity === r
                    ? "bg-white text-[#0d0e11] shadow-sm font-bold"
                    : "text-[#0d0e11]/60 hover:text-[#0d0e11]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Section Toggle */}
          <div className="flex bg-[#0d0e11]/5 p-1 rounded-xl font-mono text-xs">
            <button
              onClick={() => {
                sounds.playBlip();
                setActiveTab("roster");
              }}
              className={`px-4 py-1.5 rounded-lg transition-all font-semibold ${
                activeTab === "roster"
                  ? "bg-[#0d0e11] text-white shadow-sm font-bold"
                  : "text-[#0d0e11]/60 hover:text-[#0d0e11]"
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => {
                sounds.playBlip();
                setActiveTab("leaderboard");
              }}
              className={`px-4 py-1.5 rounded-lg transition-all font-semibold ${
                activeTab === "leaderboard"
                  ? "bg-[#0d0e11] text-white shadow-sm font-bold"
                  : "text-[#0d0e11]/60 hover:text-[#0d0e11]"
              }`}
            >
              Standings
            </button>
          </div>
        </div>
      </div>

      {/* Roster Cards View */}
      {activeTab === "roster" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoster.map((comp) => {
            const theme = COMPANION_THEMES[comp.name] || {
              bg: "from-zinc-500/15 to-transparent",
              border: "group-hover:border-zinc-400",
              glow: "rgba(0,0,0,0.1)",
              textAccent: "text-zinc-700",
              iconBg: "bg-zinc-700 text-white",
              power: 85,
            };

            const rarityBadgeClass =
              comp.rarity.toLowerCase() === "legendary"
                ? "bg-amber-500/10 text-amber-700 border-amber-500/30"
                : comp.rarity.toLowerCase() === "epic"
                ? "bg-purple-500/10 text-purple-700 border-purple-500/30"
                : comp.rarity.toLowerCase() === "rare"
                ? "bg-cyan-500/10 text-cyan-700 border-cyan-500/30"
                : "bg-emerald-500/10 text-emerald-700 border-emerald-500/30";

            return (
              <div
                key={comp.name}
                className={`facto-card p-6 flex flex-col justify-between group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border border-[#0d0e11]/10 ${theme.border}`}
              >
                {/* Gradient Ambient Backing */}
                <div
                  className={`absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br ${theme.bg} blur-2xl pointer-events-none`}
                ></div>

                <div>
                  {/* Top Metadata Bar */}
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <span
                      className={`font-mono text-[10px] font-bold uppercase px-3 py-1 rounded-full border shadow-sm ${rarityBadgeClass}`}
                    >
                      ★ {comp.rarity}
                    </span>
                    <span className="text-sm font-mono text-[#0d0e11]/50 font-semibold flex items-center gap-1">
                      <span>{comp.badge}</span>
                      <span>{comp.species}</span>
                    </span>
                  </div>

                  {/* Character Illustration Stage */}
                  <div className="w-full h-36 rounded-2xl bg-gradient-to-b from-[#f4f4f4] to-white border border-[#0d0e11]/5 flex flex-col items-center justify-center relative overflow-hidden mb-5 group-hover:scale-[1.02] transition-transform duration-300">
                    {/* Glowing Platform */}
                    <div className="absolute bottom-2 w-24 h-2 rounded-full bg-gradient-to-r from-transparent via-[#0d0e11]/20 to-transparent"></div>

                    {/* Character Avatar Artwork */}
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-md z-10 select-none bg-white border border-[#0d0e11]/10">
                      {comp.image ? (
                        <Image
                          src={comp.image}
                          alt={comp.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">
                          {comp.avatarIcon}
                        </div>
                      )}
                    </div>

                    {/* Power Rating Pill */}
                    <div className="absolute top-2.5 right-2.5 bg-[#0d0e11] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm z-20">
                      <Zap className="w-2.5 h-2.5 text-[#58e78f]" />
                      <span>PWR {theme.power}</span>
                    </div>
                  </div>

                  {/* Title & Role */}
                  <div className="mb-3">
                    <h3 className="font-display font-bold text-2xl text-[#0d0e11] tracking-tight group-hover:text-[#0053ff] transition-colors">
                      {comp.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 font-mono text-xs">
                      <span className={`font-semibold ${theme.textAccent}`}>
                        {comp.role}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#0d0e11]/70 leading-relaxed font-sans mb-4">
                    {comp.description}
                  </p>

                  {/* Quote if present */}
                  {comp.quote && (
                    <div className="bg-[#f4f4f4] p-2.5 rounded-xl border border-[#0d0e11]/5 text-[11px] text-[#0d0e11]/80 italic mb-4 font-sans">
                      “{comp.quote}”
                    </div>
                  )}
                </div>

                {/* Bottom Stats Footer */}
                <div className="pt-4 border-t border-[#0d0e11]/10 flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-[#0d0e11]/40 block text-[10px] uppercase">
                      Prime Affinity
                    </span>
                    <span className="font-bold text-[#0d0e11] text-[11px]">
                      {comp.primeStat}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[#0d0e11]/40 block text-[10px] uppercase">
                      Max Growth
                    </span>
                    <span className="font-bold text-[#58e78f] text-[11px]">
                      100 EXP / Day
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Leaderboard View */}
      {activeTab === "leaderboard" && (
        <div className="facto-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f4f4f4] border-b border-[#0d0e11]/10 font-mono text-[11px] uppercase tracking-wider text-[#0d0e11]/60">
                  <th className="py-4 px-6">Rank</th>
                  <th className="py-4 px-6">Companion</th>
                  <th className="py-4 px-6">Trainer (Owner)</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Level</th>
                  <th className="py-4 px-6 text-right">Rarity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0d0e11]/5 font-sans text-sm">
                {MOCK_LEADERBOARD.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-[#f4f4f4]/60 transition">
                    <td className="py-4 px-6 font-mono font-bold">
                      {idx === 0 ? "🥇 #1" : idx === 1 ? "🥈 #2" : idx === 2 ? "🥉 #3" : `#${idx + 1}`}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.avatarIcon}</span>
                        <span className="font-display font-bold text-[#0d0e11]">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-[#0053ff] font-semibold">
                      {item.ownerHandle}
                    </td>
                    <td className="py-4 px-6 text-xs text-[#0d0e11]/70">{item.role}</td>
                    <td className="py-4 px-6 font-mono font-bold text-[#0d0e11]">
                      LVL {item.level}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="font-mono text-[9px] uppercase px-2.5 py-1 rounded bg-[#0d0e11] text-white font-bold">
                        {item.rarity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-[#f4f4f4] border-t border-[#0d0e11]/10 text-center">
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-2 font-mono text-xs text-[#0d0e11] font-bold hover:underline"
            >
              <span>View Full 1,000+ Leaderboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};
