"use client";

import React, { useState } from "react";
import { Sparkles, Terminal, Swords, Shield, Zap, ArrowRight, CheckCircle2, ChevronRight, Activity } from "lucide-react";

export const FactoCaseDeck: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0);

  const features = [
    {
      id: "01",
      tag: "AI EVOLUTION",
      title: "Natural Language Care on 𝕏 Timeline",
      description: "Tag @CoveSherwood on 𝕏 to feed, train, and pet your companion. The autonomous AI agent processes your tweets in natural language, updating your on-chain pet attributes with zero friction.",
      accent: "#f243ac",
      bgGradient: "from-[#f243ac]/10 to-transparent",
      badge: "Zero-Gas Agent",
      stats: [
        { label: "Execution Latency", value: "< 0.8s" },
        { label: "Language Models", value: "Llama-3 & GPT-4o" },
        { label: "On-Chain Sync", value: "Robinhood EVM" },
      ],
      previewType: "tweet",
    },
    {
      id: "02",
      tag: "SHERWOOD QUESTS",
      title: "Real-Time Forest Expeditions",
      description: "Dispatch your pixel companion on simulated dungeon ambushes, Nottingham Keep infiltrations, and acorn foraging missions. Earn weekly $COVE bounty rewards.",
      accent: "#58e78f",
      bgGradient: "from-[#58e78f]/10 to-transparent",
      badge: "Real-Time RPG",
      stats: [
        { label: "Weekly Bounty Pool", value: "10,000 $COVE" },
        { label: "Quest Success Rate", value: "Dynamic (Stats-Based)" },
        { label: "Gas Cost", value: "100% Sponsored" },
      ],
      previewType: "quest",
    },
    {
      id: "03",
      tag: "DEVELOPER API",
      title: "Sub-Millisecond On-Chain APIs",
      description: "Direct REST and WebSocket APIs to query companion vital matrices, trigger battles, and integrate virtual companions into Discord, Telegram, or custom Web3 game engines.",
      accent: "#0053ff",
      bgGradient: "from-[#0053ff]/10 to-transparent",
      badge: "Enterprise SDK",
      stats: [
        { label: "Endpoint SLA", value: "99.99%" },
        { label: "Format", value: "OpenAPI 3.0 / JSON" },
        { label: "SDKs", value: "TypeScript & Python" },
      ],
      previewType: "api",
    },
    {
      id: "04",
      tag: "ROBINHOOD L2",
      title: "Native Yield & Instant Settlement",
      description: "Settled natively on Robinhood Chain with sub-second block times and automated state verification. Backed by institutional-grade EVM rollups.",
      accent: "#f59e0b",
      bgGradient: "from-[#f59e0b]/10 to-transparent",
      badge: "EVM Layer-2",
      stats: [
        { label: "Block Time", value: "< 250ms" },
        { label: "Consensus", value: "Robinhood Rollup" },
        { label: "State Verification", value: "Instant" },
      ],
      previewType: "settlement",
    },
  ];

  return (
    <section id="features" className="w-full py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Facto Section Header */}
      <div className="mb-14">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0d0e11]/50 block mb-3">
          Architecture & Protocol Capabilities
        </span>
        <h2 className="font-display font-medium text-3xl sm:text-5xl text-[#0d0e11] tracking-tight max-w-2xl">
          Engineered for autonomous life <br />
          on <span className="font-semibold">Robinhood Layer-2</span>.
        </h2>
      </div>

      {/* Facto Interactive Card Deck */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar / Spine (4 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {features.map((item, idx) => {
            const isSelected = activeCard === idx;
            return (
              <button
                key={item.id}
                onClick={() => setActiveCard(idx)}
                className={`text-left p-5 sm:p-6 rounded-2xl transition-all duration-300 flex items-start justify-between border ${
                  isSelected
                    ? "bg-white border-[#0d0e11]/20 shadow-md transform -translate-y-0.5"
                    : "bg-transparent border-transparent hover:bg-white/60 hover:border-[#0d0e11]/5"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5 font-mono text-xs">
                    <span className="font-bold text-[#0d0e11]/40">{item.id}</span>
                    <span className="text-[#0d0e11]/20">/</span>
                    <span
                      className="font-bold tracking-wider uppercase text-[11px]"
                      style={{ color: isSelected ? item.accent : "#0d0e1180" }}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <h3
                    className={`font-display font-semibold text-lg sm:text-xl leading-tight transition-colors ${
                      isSelected ? "text-[#0d0e11]" : "text-[#0d0e11]/70"
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? "bg-[#0d0e11] text-white" : "text-[#0d0e11]/30"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Visual Deck (7 Cols) */}
        <div className="lg:col-span-7">
          {features.map((item, idx) => {
            if (activeCard !== idx) return null;

            return (
              <div
                key={item.id}
                className="facto-card p-6 sm:p-10 flex flex-col justify-between min-h-[500px] relative overflow-hidden animate-fade-in"
              >
                {/* Background Accent Glow */}
                <div
                  className={`absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none`}
                  style={{ backgroundColor: item.accent }}
                ></div>

                {/* Stage Header */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#0d0e11]/5 text-[#0d0e11]">
                      {item.badge}
                    </span>
                    <span className="font-mono text-xs text-[#0d0e11]/40">
                      SYS_ID: 0x{item.id}AF_2026
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#0d0e11] mb-4">
                    {item.title}
                  </h3>

                  <p className="text-[#0d0e11]/70 text-base sm:text-lg leading-relaxed font-sans mb-8">
                    {item.description}
                  </p>
                </div>

                {/* Interactive Dynamic Stage Body */}
                <div className="bg-[#0d0e11] text-white rounded-2xl p-5 sm:p-6 font-mono text-xs shadow-xl mb-6">
                  {item.previewType === "tweet" && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-white/60 text-[11px] border-b border-white/10 pb-2">
                        <span>𝕏 Timeline Parser</span>
                        <span className="text-[#58e78f] ml-auto font-bold">● Active 24/7</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-white/90">
                        <span className="text-[#f243ac] font-bold">@user:</span> @CoveSherwood feed my Robin Fox some wild forest berries and spar for archery practice! 🏹
                      </div>
                      <div className="bg-[#58e78f]/10 text-[#58e78f] p-3 rounded-xl border border-[#58e78f]/30 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>AI Response: Robin Fox fed (+20 EXP). Sparring complete (+15 Mana). State recorded on Robinhood L2.</span>
                      </div>
                    </div>
                  )}

                  {item.previewType === "quest" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-white/60">Sherwood Expedition Log</span>
                        <span className="text-[#f59e0b] font-bold">Bounty Pool: 10,000 $COVE</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="bg-white/5 p-2.5 rounded-xl">
                          <span className="text-white/40 block">Current Location</span>
                          <span className="text-white font-bold">Sherwood Canopy</span>
                        </div>
                        <div className="bg-white/5 p-2.5 rounded-xl">
                          <span className="text-white/40 block">Loot Found</span>
                          <span className="text-[#58e78f] font-bold">+240 Silver Acorns</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {item.previewType === "api" && (
                    <div className="space-y-2">
                      <div className="text-white/50 text-[11px]">POST /v1/companions/interact</div>
                      <pre className="text-[#58e78f] bg-black/40 p-3 rounded-xl overflow-x-auto text-[11px]">
{`{
  "trainer": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  "action": "FEED_EXPEDITION",
  "status": "SETTLED_ROBINHOOD_L2",
  "latencyMs": 11.4
}`}
                      </pre>
                    </div>
                  )}

                  {item.previewType === "settlement" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-white/60">EVM State Hash</span>
                        <span className="text-[#58e78f] font-bold">Confirmed #18,940,211</span>
                      </div>
                      <div className="text-white/80 text-[11px] leading-relaxed">
                        Transaction validated by Robinhood L2 sequencer with zero gas penalty for registered trainers.
                      </div>
                    </div>
                  )}
                </div>

                {/* 3 Metric Stat Pillars */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#0d0e11]/10 font-mono text-xs">
                  {item.stats.map((st, i) => (
                    <div key={i}>
                      <span className="text-[#0d0e11]/40 block text-[10px] uppercase">
                        {st.label}
                      </span>
                      <span className="text-[#0d0e11] font-bold text-xs sm:text-sm">
                        {st.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
