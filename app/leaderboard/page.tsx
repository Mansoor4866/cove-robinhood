"use client";

import React, { useState } from "react";
import { CANONICAL_ROSTER, MOCK_LEADERBOARD } from "@/data/companions";
import { Trophy, Search, Sparkles, Shield, Zap } from "lucide-react";

export default function LeaderboardPage() {
  const [search, setSearch] = useState("");

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

  const filtered = fullLeaderboard.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.ownerHandle.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#4C6B00] font-bold mb-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Robinhood Chain Live Rankings</span>
          </div>
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-black">
            Sherwood Leaderboard
          </h1>
          <p className="text-black/60 text-sm mt-2">
            Companions ranked by Level, EXP, and timeline achievements.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
          <input
            type="text"
            placeholder="Filter companion or @user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/10 bg-white font-mono text-xs focus:outline-none focus:border-[#4C6B00] shadow-sm"
          />
        </div>
      </div>

      {/* Leaderboard Table / Cards */}
      <div className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-sm border-glow">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAFAF7] border-b border-black/10 font-mono text-[11px] uppercase tracking-wider text-black/60">
                <th className="py-4 px-6">Rank</th>
                <th className="py-4 px-6">Companion</th>
                <th className="py-4 px-6">Owner</th>
                <th className="py-4 px-6">Role & Faction</th>
                <th className="py-4 px-6">Level</th>
                <th className="py-4 px-6">EXP</th>
                <th className="py-4 px-6 text-right">Rarity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-sm">
              {filtered.map((entry, index) => (
                <tr
                  key={entry.id}
                  className="hover:bg-emerald-50/40 transition-colors group"
                >
                  <td className="py-4 px-6 font-mono font-bold">
                    {index === 0 ? (
                      <span className="text-amber-500 text-base">🥇 #1</span>
                    ) : index === 1 ? (
                      <span className="text-slate-400 text-base">🥈 #2</span>
                    ) : index === 2 ? (
                      <span className="text-amber-700 text-base">🥉 #3</span>
                    ) : (
                      <span className="text-black/40">#{index + 1}</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-1.5 rounded-lg bg-[#FAFAF7] border border-black/5">
                        {entry.avatarIcon}
                      </span>
                      <div>
                        <span className="font-display font-bold text-black group-hover:text-[#4C6B00] transition">
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
                      className="text-[#4C6B00] hover:underline font-bold"
                    >
                      {entry.ownerHandle}
                    </a>
                  </td>
                  <td className="py-4 px-6 text-xs text-black/70">{entry.role}</td>
                  <td className="py-4 px-6 font-mono font-bold text-black">
                    LVL {entry.level}
                  </td>
                  <td className="py-4 px-6 font-mono text-xs text-black/60">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-black/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#4C6B00] h-full rounded-full"
                          style={{ width: `${entry.exp}%` }}
                        ></div>
                      </div>
                      <span>{entry.exp}/100</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-mono text-[9px] uppercase px-2.5 py-1 rounded bg-black text-[#CCFF00] font-bold">
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
