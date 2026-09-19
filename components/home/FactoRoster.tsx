"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CANONICAL_ROSTER, MOCK_LEADERBOARD } from "@/data/companions";
import { Trophy, ArrowRight, Shield, Zap, Sparkles } from "lucide-react";

export const FactoRoster: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"roster" | "leaderboard">("roster");

  return (
    <section className="w-full py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0d0e11]/50 block mb-2">
            Decentralized Ecosystem
          </span>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-[#0d0e11] tracking-tight">
            Sherwood Archetypes & Rankings
          </h2>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-[#0d0e11]/5 p-1 rounded-xl font-mono text-xs">
          <button
            onClick={() => setActiveTab("roster")}
            className={`px-4 py-2 rounded-lg transition-all font-semibold ${
              activeTab === "roster"
                ? "bg-white text-[#0d0e11] shadow-sm"
                : "text-[#0d0e11]/60 hover:text-[#0d0e11]"
            }`}
          >
            Companion Archetypes
          </button>
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`px-4 py-2 rounded-lg transition-all font-semibold ${
              activeTab === "leaderboard"
                ? "bg-white text-[#0d0e11] shadow-sm"
                : "text-[#0d0e11]/60 hover:text-[#0d0e11]"
            }`}
          >
            Live Rankings
          </button>
        </div>
      </div>

      {/* Archetypes Grid */}
      {activeTab === "roster" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CANONICAL_ROSTER.map((comp) => (
            <div
              key={comp.name}
              className="facto-card p-6 flex flex-col justify-between group hover:border-[#0d0e11]/30 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-[#0d0e11]/5 text-[#0d0e11]">
                    {comp.rarity}
                  </span>
                  <span className="text-xl">{comp.badge}</span>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-[#f4f4f4] border border-[#0d0e11]/5 flex items-center justify-center text-4xl mb-4 group-hover:scale-105 transition duration-300">
                  {comp.avatarIcon}
                </div>

                <h3 className="font-display font-bold text-xl text-[#0d0e11] mb-1">
                  {comp.name}
                </h3>
                <span className="text-xs font-mono text-[#f243ac] font-semibold block mb-3">
                  {comp.role}
                </span>

                <p className="text-xs text-[#0d0e11]/70 leading-relaxed">
                  {comp.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#0d0e11]/10 flex items-center justify-between font-mono text-xs">
                <span className="text-[#0d0e11]/50">Prime Stat</span>
                <span className="font-semibold text-[#0d0e11]">{comp.primeStat}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Leaderboard Table */}
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
