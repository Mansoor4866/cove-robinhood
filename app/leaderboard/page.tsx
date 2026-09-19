"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CANONICAL_ROSTER, MOCK_LEADERBOARD } from "@/data/companions";
import { Trophy, Search, Sparkles, Shield, ArrowRight } from "lucide-react";

export default function LeaderboardPage() {
  const [search, setSearch] = useState("");
  const [filterRarity, setFilterRarity] = useState<string>("ALL");

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0d0e11]/10 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#0d0e11]/60 font-semibold mb-3">
            <Trophy className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Robinhood Chain Real-Time Consensus Rankings</span>
          </div>
          <h1 className="font-display font-medium text-4xl sm:text-5xl text-[#0d0e11] tracking-tight">
            Sherwood Leaderboard
          </h1>
          <p className="text-[#0d0e11]/70 text-sm mt-2 max-w-xl font-sans">
            Companions ranked by Level, Battle EXP, and on-chain timeline achievements on Robinhood EVM Layer-2.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="flex bg-[#0d0e11]/5 p-1 rounded-xl font-mono text-xs">
            {["ALL", "LEGENDARY", "MYTHIC", "RARE"].map((r) => (
              <button
                key={r}
                onClick={() => setFilterRarity(r)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filterRarity === r
                    ? "bg-white text-[#0d0e11] font-bold shadow-sm"
                    : "text-[#0d0e11]/60 hover:text-[#0d0e11]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0d0e11]/40" />
            <input
              type="text"
              placeholder="Search companion or @user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#0d0e11]/10 bg-white font-mono text-xs focus:outline-none focus:border-[#0d0e11] shadow-sm transition"
            />
          </div>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {fullLeaderboard.slice(0, 3).map((champion, idx) => {
          const rankMeta = [
            { rank: 1, title: "Grand Champion", badge: "🥇 Rank #1", border: "border-[#f59e0b]/40", bg: "bg-white" },
            { rank: 2, title: "Runner Up", badge: "🥈 Rank #2", border: "border-slate-300", bg: "bg-white" },
            { rank: 3, title: "Third Place", badge: "🥉 Rank #3", border: "border-amber-700/30", bg: "bg-white" },
          ][idx];

          return (
            <div
              key={champion.id}
              className={`facto-card p-6 rounded-2xl border ${rankMeta.border} relative flex flex-col items-center text-center`}
            >
              <div className="absolute top-4 left-4 font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#0d0e11]/5 text-[#0d0e11]">
                {rankMeta.badge}
              </div>

              <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-md my-4 border border-[#0d0e11]/10">
                {champion.image ? (
                  <Image
                    src={champion.image}
                    alt={champion.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <span className="text-4xl flex items-center justify-center w-full h-full">
                    {champion.avatarIcon}
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-2xl text-[#0d0e11]">
                {champion.name}
              </h3>
              <span className="font-mono text-xs text-[#0053ff] font-semibold mt-0.5">
                {champion.ownerHandle}
              </span>
              <p className="text-xs text-[#0d0e11]/60 font-sans mt-1">
                {champion.role}
              </p>

              <div className="w-full grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-[#0d0e11]/10 font-mono text-xs">
                <div className="bg-[#f4f4f4] p-2.5 rounded-xl">
                  <span className="text-[#0d0e11]/40 block text-[10px] uppercase">Level</span>
                  <span className="text-[#0d0e11] font-bold text-sm">LVL {champion.level}</span>
                </div>
                <div className="bg-[#f4f4f4] p-2.5 rounded-xl">
                  <span className="text-[#0d0e11]/40 block text-[10px] uppercase">EXP Sync</span>
                  <span className="text-[#58e78f] font-bold text-sm">{champion.exp} / 100</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leaderboard Table */}
      <div className="facto-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f4f4f4] border-b border-[#0d0e11]/10 font-mono text-[11px] uppercase tracking-wider text-[#0d0e11]/60">
                <th className="py-4 px-6">Rank</th>
                <th className="py-4 px-6">Companion</th>
                <th className="py-4 px-6">Trainer (Owner)</th>
                <th className="py-4 px-6">Role & Archetype</th>
                <th className="py-4 px-6">Level</th>
                <th className="py-4 px-6">EXP Progress</th>
                <th className="py-4 px-6 text-right">Rarity Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0d0e11]/5 font-sans text-sm">
              {filtered.map((entry, index) => (
                <tr key={entry.id} className="hover:bg-[#f4f4f4]/60 transition">
                  <td className="py-4 px-6 font-mono font-bold">
                    {index === 0 ? "🥇 #1" : index === 1 ? "🥈 #2" : index === 2 ? "🥉 #3" : `#${index + 1}`}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#0d0e11]/10 shrink-0">
                        {entry.image ? (
                          <Image
                            src={entry.image}
                            alt={entry.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <span className="text-2xl flex items-center justify-center w-full h-full bg-[#f4f4f4]">
                            {entry.avatarIcon}
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="font-display font-bold text-[#0d0e11]">
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
                      className="text-[#0053ff] hover:underline font-semibold"
                    >
                      {entry.ownerHandle}
                    </a>
                  </td>
                  <td className="py-4 px-6 text-xs text-[#0d0e11]/70">{entry.role}</td>
                  <td className="py-4 px-6 font-mono font-bold text-[#0d0e11]">
                    LVL {entry.level}
                  </td>
                  <td className="py-4 px-6 font-mono text-xs text-[#0d0e11]/60">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-[#0d0e11]/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#58e78f] h-full rounded-full"
                          style={{ width: `${entry.exp}%` }}
                        ></div>
                      </div>
                      <span>{entry.exp}/100</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-mono text-[9px] uppercase px-2.5 py-1 rounded bg-[#0d0e11] text-white font-bold">
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
