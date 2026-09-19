"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Trophy, Crown, Flame, Sparkles, Search, ArrowUpRight } from "lucide-react";

export const LeaderboardPodium: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState("");

  const topThree = [
    {
      rank: 1,
      crown: "👑",
      name: "Robin Fox",
      owner: "@sherwood_king",
      level: 18,
      exp: "1,420 EXP",
      reward: "5,000 $COVE",
      border: "border-amber-400/50",
      glow: "shadow-[0_0_35px_rgba(251,191,36,0.25)]",
      badge: "bg-amber-400/15 text-amber-300 border-amber-400/30",
    },
    {
      rank: 2,
      crown: "🥈",
      name: "Hartley",
      owner: "@sky_guardian",
      level: 16,
      exp: "1,280 EXP",
      reward: "3,000 $COVE",
      border: "border-slate-300/40",
      glow: "shadow-[0_0_30px_rgba(203,213,225,0.2)]",
      badge: "bg-slate-300/15 text-slate-200 border-slate-300/30",
    },
    {
      rank: 3,
      crown: "🥉",
      name: "Little John",
      owner: "@oak_crusher",
      level: 15,
      exp: "1,150 EXP",
      reward: "2,000 $COVE",
      border: "border-amber-700/50",
      glow: "shadow-[0_0_25px_rgba(180,83,9,0.2)]",
      badge: "bg-amber-700/15 text-amber-400 border-amber-700/30",
    },
  ];

  const fullList = [
    { rank: 4, name: "Marian", species: "Deer", owner: "@forest_healer", level: 14, exp: "980", fed: "12m ago" },
    { rank: 5, name: "Tuck", species: "Badger", owner: "@brewmaster_x", level: 13, exp: "890", fed: "28m ago" },
    { rank: 6, name: "Will Scarlet", species: "Wolf", owner: "@blade_runner", level: 12, exp: "820", fed: "1h ago" },
    { rank: 7, name: "Much", species: "Miller", owner: "@grain_keeper", level: 11, exp: "750", fed: "2h ago" },
    { rank: 8, name: "Alan Dale", species: "Minstrel", owner: "@lute_master", level: 10, exp: "690", fed: "3h ago" },
  ];

  const filtered = fullList.filter(
    (item) =>
      item.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.owner.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00FF87] mb-3">
            <Trophy className="w-4 h-4" />
            <span>004 · SHERWOOD LEADERBOARD & ARENA PODIUM</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Top Companion Guardians.<br />
            <span className="text-gradient-mint">10,000 $COVE Season 1 Pool.</span>
          </h2>
        </div>
        <p className="text-[#8E9E94] text-sm md:text-base max-w-md font-sans leading-relaxed">
          The top 3 companions at each 7-day epoch epoch receive on-chain token bounties directly to their Robinhood Wallet.
        </p>
      </div>

      {/* 3D Top 3 Holographic Podium Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12 items-end">
        {/* 2nd Place */}
        <div className={`glass-panel rounded-3xl p-6 border ${topThree[1].border} ${topThree[1].glow} relative order-2 md:order-1`}>
          <div className="flex justify-between items-center mb-4 font-mono text-xs">
            <span className="text-2xl">{topThree[1].crown}</span>
            <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] border ${topThree[1].badge}`}>
              RANK #2
            </span>
          </div>
          <div className="text-center py-4 bg-[#050B07]/60 rounded-2xl border border-white/5 mb-4">
            <div className="relative w-28 h-28 mx-auto">
              <Image src="/robin-fox.png" alt="Rank 2" fill className="object-contain" />
            </div>
          </div>
          <h3 className="font-display font-bold text-lg text-white text-center mb-1">
            {topThree[1].name}
          </h3>
          <p className="text-center font-mono text-xs text-white/50 mb-4">{topThree[1].owner}</p>
          <div className="bg-[#050B07] p-3 rounded-xl border border-white/5 space-y-1 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-white/40">Level:</span>
              <span className="text-white font-bold">LVL {topThree[1].level}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Prize Bounty:</span>
              <span className="text-[#00FF87] font-bold">{topThree[1].reward}</span>
            </div>
          </div>
        </div>

        {/* 1st Place (Center Podium - Taller & Highlighted) */}
        <div className={`glass-panel rounded-3xl p-8 border ${topThree[0].border} ${topThree[0].glow} relative order-1 md:order-2 md:-translate-y-4 bg-gradient-to-b from-amber-400/10 via-[#0A140E] to-[#050B07]`}>
          <div className="flex justify-between items-center mb-4 font-mono text-xs">
            <span className="text-3xl">{topThree[0].crown}</span>
            <span className={`px-3 py-1 rounded-full font-bold uppercase text-xs border ${topThree[0].badge}`}>
              CHAMPION #1
            </span>
          </div>
          <div className="text-center py-6 bg-[#050B07]/80 rounded-2xl border border-amber-400/30 mb-4 relative">
            <div className="absolute top-2 right-2 text-xs font-mono text-amber-300 flex items-center gap-1 font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>MVP</span>
            </div>
            <div className="relative w-36 h-36 mx-auto animate-float">
              <Image src="/robin-fox.png" alt="Rank 1" fill className="object-contain drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]" />
            </div>
          </div>
          <h3 className="font-display font-extrabold text-2xl text-white text-center mb-1">
            {topThree[0].name}
          </h3>
          <p className="text-center font-mono text-xs text-amber-300 mb-4 font-semibold">{topThree[0].owner}</p>
          <div className="bg-[#050B07] p-4 rounded-xl border border-amber-400/20 space-y-1.5 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-white/50">Level & EXP:</span>
              <span className="text-white font-bold">LVL {topThree[0].level} · {topThree[0].exp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Epoch Reward:</span>
              <span className="text-[#00FF87] font-bold text-sm">{topThree[0].reward}</span>
            </div>
          </div>
        </div>

        {/* 3rd Place */}
        <div className={`glass-panel rounded-3xl p-6 border ${topThree[2].border} ${topThree[2].glow} relative order-3`}>
          <div className="flex justify-between items-center mb-4 font-mono text-xs">
            <span className="text-2xl">{topThree[2].crown}</span>
            <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] border ${topThree[2].badge}`}>
              RANK #3
            </span>
          </div>
          <div className="text-center py-4 bg-[#050B07]/60 rounded-2xl border border-white/5 mb-4">
            <div className="relative w-28 h-28 mx-auto">
              <Image src="/robin-fox.png" alt="Rank 3" fill className="object-contain" />
            </div>
          </div>
          <h3 className="font-display font-bold text-lg text-white text-center mb-1">
            {topThree[2].name}
          </h3>
          <p className="text-center font-mono text-xs text-white/50 mb-4">{topThree[2].owner}</p>
          <div className="bg-[#050B07] p-3 rounded-xl border border-white/5 space-y-1 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-white/40">Level:</span>
              <span className="text-white font-bold">LVL {topThree[2].level}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Prize Bounty:</span>
              <span className="text-[#00FF87] font-bold">{topThree[2].reward}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ranks 4-8 Table */}
      <div className="glass-panel rounded-3xl p-6 border border-[#00FF87]/20 font-mono text-xs">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="beacon-dot"></span>
            <span className="font-display font-bold text-base text-white">Full Guild Rankings</span>
          </div>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search companion or handle..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-white/10 bg-[#050B07] text-white text-xs focus:outline-none focus:border-[#00FF87]"
            />
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-2.5 top-2" />
          </div>
        </div>

        <div className="space-y-2">
          {filtered.map((item) => (
            <div
              key={item.rank}
              className="p-3 rounded-xl bg-[#050B07]/60 hover:bg-[#050B07] border border-white/5 hover:border-[#00FF87]/30 transition flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <span className="font-bold text-white/40 w-6">#{item.rank}</span>
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>{item.name}</span>
                    <span className="text-[10px] text-white/40">({item.species})</span>
                  </div>
                  <div className="text-[10px] text-[#00FF87]">{item.owner}</div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-right">
                <div>
                  <div className="font-bold text-white">LVL {item.level}</div>
                  <div className="text-[10px] text-white/40">{item.exp} EXP</div>
                </div>
                <span className="text-[10px] text-white/30 hidden sm:inline">{item.fed}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
