"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Zap, Heart, Swords, Apple, CheckCircle2, ChevronRight, Terminal, RefreshCw } from "lucide-react";
import { sounds } from "@/lib/audio";
import { HatchGuideModal } from "@/components/ui/HatchGuideModal";

export const FactoHero: React.FC = () => {
  const [level, setLevel] = useState(3);
  const [exp, setExp] = useState(65);
  const [mana, setMana] = useState(85);
  const [toast, setToast] = useState<string | null>(null);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"pet" | "feed" | "quest">("pet");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleFeed = () => {
    sounds.playFeedCrunch();
    const newExp = exp + 20;
    if (newExp >= 100) {
      setLevel((prev) => prev + 1);
      setExp(newExp - 100);
      sounds.playHatchFanfare();
      showToast(`⭐ LEVEL UP! Robin Fox reached LVL ${level + 1}!`);
    } else {
      setExp(newExp);
      setMana((prev) => Math.min(100, prev + 15));
      showToast("🍓 Savoring Sherwood Berries (+20 EXP, +15 Mana)");
    }
  };

  const handleSpar = () => {
    sounds.playBlip();
    if (mana < 15) {
      showToast("⚠️ Low Mana! Feed Robin Fox first.");
      return;
    }
    setMana((prev) => Math.max(0, prev - 15));
    setExp((prev) => Math.min(100, prev + 15));
    showToast("⚔️ Archery Sparring completed (+15 EXP)");
  };

  const handlePet = () => {
    sounds.playBlip();
    showToast("🦊 *purr* Robin Fox bonds with you! (Max Morale)");
  };

  return (
    <>
      <section className="w-full pt-8 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Main Hero Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Facto Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start pt-4 lg:pt-8">
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 bg-white border border-[#0d0e11]/10 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-[#0d0e11] mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#58e78f] animate-pulse"></span>
              <span>Robinhood Chain L2 Ecosystem</span>
              <span className="text-[#0d0e11]/30">|</span>
              <span className="text-[#f243ac]">Zero Gas AI</span>
            </div>

            {/* Facto Hero Headline */}
            <h1 className="font-display font-medium text-[42px] sm:text-[58px] lg:text-[72px] leading-[1.05] tracking-tight text-[#0d0e11] mb-6">
              Turn pixel companions <br className="hidden sm:inline" />
              into <span className="font-semibold text-[#0d0e11]">living on-chain legends</span>.
            </h1>

            {/* Subtitle */}
            <p className="text-[#0d0e11]/70 text-lg sm:text-xl max-w-xl font-sans font-normal leading-relaxed mb-8">
              Cove APIs and autonomous on-chain agents allow virtual companions to hatch, evolve, and spar on Robinhood EVM Layer-2 — approving every interaction against live balances in real time.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={() => setGuideModalOpen(true)}
                className="v2-btn v2-btn-dark !min-h-[56px] !px-8 !text-base"
              >
                <span>Hatch on 𝕏 Timeline</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("features");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="v2-btn v2-btn-light !min-h-[56px] !px-7 !text-base"
              >
                <span>Protocol Features</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#0d0e11]/10 w-full text-xs font-mono text-[#0d0e11]/60">
              <div className="flex items-center gap-1.5 text-[#0d0e11] font-semibold">
                <Shield className="w-4 h-4 text-[#58e78f]" />
                <span>Verified Robinhood EVM L2</span>
              </div>
              <span>•</span>
              <div>Sub-second finality</div>
              <span>•</span>
              <div className="text-[#f243ac] font-semibold">Sponsored Zero Gas</div>
            </div>
          </div>

          {/* Right Column: Facto Interactive Simulator Stage */}
          <div className="lg:col-span-5 relative">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#f243ac]/10 via-[#58e78f]/10 to-transparent rounded-3xl blur-2xl pointer-events-none"></div>

            {/* Facto Obsidian Card */}
            <div className="facto-dark-card p-6 sm:p-7 relative overflow-hidden flex flex-col gap-5">
              {/* Toast */}
              {toast && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#58e78f] text-[#0d0e11] font-display font-bold text-xs px-4 py-2 rounded-full shadow-lg animate-bounce whitespace-nowrap">
                  {toast}
                </div>
              )}

              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#58e78f] animate-pulse"></div>
                  <span className="font-mono text-xs uppercase tracking-wider text-white/70">
                    Live Simulator · Stage 01
                  </span>
                </div>
                <span className="font-mono text-xs bg-white/10 px-2.5 py-1 rounded text-white font-semibold">
                  LVL {level}
                </span>
              </div>

              {/* Character Stage & Holographic Ring */}
              <div className="relative py-6 flex flex-col items-center justify-center bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden">
                {/* Overhead Holographic Emitter Light */}
                <div className="absolute top-0 w-28 h-1 bg-gradient-to-r from-transparent via-[#58e78f] to-transparent shadow-[0_0_15px_#58e78f]"></div>

                {/* Pixel Character Avatar */}
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-b from-white/10 to-transparent flex items-center justify-center text-6xl shadow-inner mb-2 border border-white/10 select-none">
                  🦊
                </div>

                <h3 className="font-display font-bold text-xl text-white mt-2">
                  Robin Fox
                </h3>
                <span className="text-xs text-white/50 font-mono">
                  Genesis Archetype #001 · Sherwood Archer
                </span>

                {/* Pedestal */}
                <div className="w-28 h-2 rounded-full bg-gradient-to-r from-transparent via-[#58e78f]/50 to-transparent mt-3"></div>
              </div>

              {/* Progress & Stat Matrix */}
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-white/70 mb-1">
                    <span>Growth EXP</span>
                    <span className="text-[#58e78f] font-bold">{exp} / 100</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#58e78f] to-[#f243ac] h-full transition-all duration-300"
                      style={{ width: `${exp}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="text-white/40 block text-[10px] uppercase">Mana Power</span>
                    <span className="text-white font-bold">{mana} / 100</span>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="text-white/40 block text-[10px] uppercase">Network Latency</span>
                    <span className="text-[#58e78f] font-bold">&lt; 14ms</span>
                  </div>
                </div>
              </div>

              {/* Interactive Action Triggers */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                <button
                  onClick={handleFeed}
                  className="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-sans text-xs py-2.5 px-2 rounded-xl transition flex flex-col items-center gap-1 font-semibold"
                >
                  <Apple className="w-4 h-4 text-[#f243ac]" />
                  <span>Feed</span>
                </button>

                <button
                  onClick={handlePet}
                  className="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-sans text-xs py-2.5 px-2 rounded-xl transition flex flex-col items-center gap-1 font-semibold"
                >
                  <Heart className="w-4 h-4 text-[#58e78f]" />
                  <span>Pet</span>
                </button>

                <button
                  onClick={handleSpar}
                  className="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-sans text-xs py-2.5 px-2 rounded-xl transition flex flex-col items-center gap-1 font-semibold"
                >
                  <Swords className="w-4 h-4 text-[#f59e0b]" />
                  <span>Spar</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Facto Trust Partner Marquee Strip */}
        <div className="mt-16 pt-8 border-t border-[#0d0e11]/10 flex flex-col sm:flex-row items-center gap-6 overflow-hidden">
          <p className="text-xs font-mono uppercase tracking-wider text-[#0d0e11]/50 whitespace-nowrap">
            Integrated With
          </p>

          <div className="overflow-hidden w-full">
            <div className="facto-marquee-track flex items-center gap-12 text-[#0d0e11]/60 font-display font-semibold text-sm">
              <span className="hover:text-[#0d0e11] transition">Robinhood Chain L2</span>
              <span className="text-[#0d0e11]/20">/</span>
              <span className="hover:text-[#0d0e11] transition">Ethereum EVM</span>
              <span className="text-[#0d0e11]/20">/</span>
              <span className="hover:text-[#0d0e11] transition">Arbitrum Orbit</span>
              <span className="text-[#0d0e11]/20">/</span>
              <span className="hover:text-[#0d0e11] transition">OpenEden Yield</span>
              <span className="text-[#0d0e11]/20">/</span>
              <span className="hover:text-[#0d0e11] transition">Solayer Network</span>
              <span className="text-[#0d0e11]/20">/</span>
              <span className="hover:text-[#0d0e11] transition">Morpho Blue</span>
              <span className="text-[#0d0e11]/20">/</span>
              <span className="hover:text-[#0d0e11] transition">Monad EVM</span>
              <span className="text-[#0d0e11]/20">/</span>
              {/* Duplicate for seamless infinite loop */}
              <span className="hover:text-[#0d0e11] transition">Robinhood Chain L2</span>
              <span className="text-[#0d0e11]/20">/</span>
              <span className="hover:text-[#0d0e11] transition">Ethereum EVM</span>
              <span className="text-[#0d0e11]/20">/</span>
              <span className="hover:text-[#0d0e11] transition">Arbitrum Orbit</span>
              <span className="text-[#0d0e11]/20">/</span>
              <span className="hover:text-[#0d0e11] transition">OpenEden Yield</span>
              <span className="text-[#0d0e11]/20">/</span>
              <span className="hover:text-[#0d0e11] transition">Solayer Network</span>
              <span className="text-[#0d0e11]/20">/</span>
              <span className="hover:text-[#0d0e11] transition">Morpho Blue</span>
              <span className="text-[#0d0e11]/20">/</span>
              <span className="hover:text-[#0d0e11] transition">Monad EVM</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Hatch Guide Modal */}
      <HatchGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
      />
    </>
  );
};
