"use client";

import React, { useState } from "react";
import { CANONICAL_ROSTER, MOCK_LEADERBOARD } from "@/data/companions";
import { Trophy, Search, Sparkles, Shield, Zap, Swords, Flame, Crown } from "lucide-react";

export default function LeaderboardPage() {
  const [search, setSearch] = useState("");
  const [filterRarity, setFilterRarity] = useState<string>("ALL");

  // Combine mock leaderboard with rest of roster for rich 12 items
  const fullLeaderboard = [
    ...MOCK_LEADERBOARD,
    ...CANONICAL_ROSTER.slice(3).map((c, i) => ({
      ...c,
      id: `comp-00${i + 4}`,
      level: 30 - i * 2,
      exp: 40 + i * 5,
      hunger: 20,
      happiness: 90,
      health: 100,
      energy: 85,
      hatchedAt: "2026-03-05T00:00:00Z",
      ownerHandle: `@sherwood_ranger_${i + 1}`,
      ownerAddress: `0x${(i + 1) * 3333}...abc`,
    })),
  ];

  const filtered = fullLeaderboard.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.ownerHandle.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase());
    const matchesRarity = filterRarity === "ALL" || item.rarity === filterRarity;
    return matchesSearch && matchesRarity;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#00FF87]/15 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00FF87] font-bold mb-3 bg-[#0A140E] border border-[#00FF87]/20 px-3 py-1 rounded-full">
            <Trophy className="w-3.5 h-3.5 text-[#00FF87]" />
            <span>Robinhood Chain Real-Time Consensus Rankings</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-white">
            Sherwood <span className="text-gradient-mint">Leaderboard</span>
          </h1>
          <p className="text-[#8E9E94] text-sm mt-2 max-w-xl font-sans font-light">
            Sovereign companions ranked by Level, Battle EXP, and on-chain timeline achievements on Robinhood EVM Layer-2.
          </p>
        </div>

        {/* Filter & Search Input */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="flex bg-[#0A140E] border border-white/10 rounded-xl p-1 font-mono text-xs">
            {["ALL", "LEGENDARY", "MYTHIC", "RARE"].map((r) => (
              <button
                key={r}
                onClick={() => setFilterRarity(r)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filterRarity === r
                    ? "bg-[#00FF87] text-black font-bold shadow-[0_0_10px_rgba(0,255,135,0.4)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search companion or @user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-[#0A140E] text-white font-mono text-xs focus:outline-none focus:border-[#00FF87] transition"
            />
          </div>
        </div>
      </div>

      {/* Top 3 Visual Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {fullLeaderboard.slice(0, 3).map((champion, idx) => {
          const podiumStyles = [
            { rank: 1, title: "Grand Champion", border: "border-amber-400/50", glow: "shadow-[0_0_35px_rgba(251,191,36,0.2)]", badge: "bg-amber-400/20 text-amber-300 border-amber-400/40", icon: "👑" },
            { rank: 2, title: "Runner Up", border: "border-slate-300/40", glow: "shadow-[0_0_25px_rgba(203,213,225,0.15)]", badge: "bg-slate-300/20 text-slate-200 border-slate-300/40", icon: "🥈" },
            { rank: 3, title: "Third Place", border: "border-amber-700/40", glow: "shadow-[0_0_25px_rgba(180,83,9,0.15)]", badge: "bg-amber-700/20 text-amber-400 border-amber-700/40", icon: "🥉" },
          ][idx];

          return (
            <div
              key={champion.id}
              className={`glass-panel p-6 rounded-3xl border ${podiumStyles.border} ${podiumStyles.glow} relative overflow-hidden flex flex-col items-center text-center`}
            >
              <div className="absolute top-4 left-4 font-mono text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 bg-[#0A140E]">
                <span>{podiumStyles.icon}</span>
                <span className="text-white">RANK #{podiumStyles.rank}</span>
              </div>
              <div className="text-6xl my-4 transform hover:scale-110 transition duration-300">
                {champion.avatarIcon}
              </div>
              <h3 className="font-display font-bold text-2xl text-white mt-1">
                {champion.name}
              </h3>
              <div className="font-mono text-xs text-[#00FF87] font-semibold mt-0.5">
                {champion.ownerHandle}
              </div>
              <p className="text-xs text-white/50 font-sans mt-1">
                {champion.role}
              </p>

              <div className="w-full grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-white/10 font-mono text-xs">
                <div className="bg-[#0A140E] p-2.5 rounded-xl border border-white/5">
                  <span className="text-white/40 block text-[10px] uppercase">Level</span>
                  <span className="text-white font-bold text-sm">LVL {champion.level}</span>
                </div>
                <div className="bg-[#0A140E] p-2.5 rounded-xl border border-white/5">
                  <span className="text-white/40 block text-[10px] uppercase">EXP Sync</span>
                  <span className="text-[#00FF87] font-bold text-sm">{champion.exp} / 100</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leaderboard Table */}
      <div className="glass-panel border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-[#0A140E]/80 border-b border-white/10 font-mono text-[11px] uppercase tracking-wider text-white/50">
                <th className="py-4 px-6">Rank</th>
                <th className="py-4 px-6">Companion</th>
                <th className="py-4 px-6">Trainer (Owner)</th>
                <th className="py-4 px-6">Role & Archetype</th>
                <th className="py-4 px-6">Level</th>
                <th className="py-4 px-6">EXP Progress</th>
                <th className="py-4 px-6 text-right">Rarity Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filtered.map((entry, index) => (
                <tr
                  key={entry.id}
                  className="hover:bg-[#00FF87]/5 transition-colors group"
                >
                  <td className="py-4 px-6 font-mono font-bold">
                    {index === 0 ? (
                      <span className="text-amber-400 font-bold">👑 #1</span>
                    ) : index === 1 ? (
                      <span className="text-slate-300 font-bold">🥈 #2</span>
                    ) : index === 2 ? (
                      <span className="text-amber-600 font-bold">🥉 #3</span>
                    ) : (
                      <span className="text-white/40">#{index + 1}</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 rounded-xl bg-[#0A140E] border border-white/10">
                        {entry.avatarIcon}
                      </span>
                      <div>
                        <span className="font-display font-bold text-white group-hover:text-[#00FF87] transition">
                          {entry.name}
                        </span>
                        <span className="ml-2 text-xs">{entry.badge}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs">
                    <a
                      href={`https://x.com/${entry.ownerHandle.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00FF87] hover:underline font-bold"
                    >
                      {entry.ownerHandle}
                    </a>
                  </td>
                  <td className="py-4 px-6 text-xs text-white/70">{entry.role}</td>
                  <td className="py-4 px-6 font-mono font-bold text-white">
                    LVL {entry.level}
                  </td>
                  <td className="py-4 px-6 font-mono text-xs text-white/60">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#00FF87] h-full rounded-full shadow-[0_0_8px_rgba(0,255,135,0.8)]"
                          style={{ width: `${entry.exp}%` }}
                        ></div>
                      </div>
                      <span>{entry.exp}/100</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-mono text-[9px] uppercase px-3 py-1 rounded-full bg-[#0A140E] border border-[#00FF87]/30 text-[#00FF87] font-bold">
                      {entry.rarity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
