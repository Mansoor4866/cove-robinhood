"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Heart, Swords, Apple, Coins } from "lucide-react";
import { sounds } from "@/lib/audio";
import { HatchGuideModal } from "@/components/ui/HatchGuideModal";

// Demo companion handle for homepage simulator
const DEMO_HANDLE = "@demo_robin";

function msToCountdown(ms: number): string {
  if (ms <= 0) return "Ready";
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export const FactoHero: React.FC = () => {
  const [level, setLevel] = useState(3);
  const [exp, setExp] = useState(65);
  const [mana, setMana] = useState(85);
  const [foodTokens, setFoodTokens] = useState(8);
  const [happiness, setHappiness] = useState(80);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);
  const [guideModalOpen, setGuideModalOpen] = useState(false);

  // Cooldown states (ms remaining)
  const [feedCooldown, setFeedCooldown] = useState(0);
  const [petCooldown, setPetCooldown] = useState(0);
  const [sparCooldown, setSparCooldown] = useState(0);

  // Loading states
  const [feedLoading, setFeedLoading] = useState(false);
  const [petLoading, setPetLoading] = useState(false);
  const [sparLoading, setSparLoading] = useState(false);

  const showToast = (msg: string, type: "success" | "error" | "info" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Tick down cooldowns every second
  useEffect(() => {
    const interval = setInterval(() => {
      setFeedCooldown((prev) => Math.max(0, prev - 1000));
      setPetCooldown((prev) => Math.max(0, prev - 1000));
      setSparCooldown((prev) => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Mana slow regen (1 per 6 minutes locally for demo feel)
  useEffect(() => {
    const interval = setInterval(() => {
      setMana((prev) => Math.min(100, prev + 1));
    }, 6 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleFeed = useCallback(async () => {
    if (feedCooldown > 0) {
      showToast(`⏳ Feed cooldown: ${msToCountdown(feedCooldown)}`, "info");
      return;
    }
    if (foodTokens < 1) {
      showToast("🍓 No Food Tokens! Login daily or win a Spar to earn more.", "error");
      return;
    }

    setFeedLoading(true);
    sounds.playFeedCrunch();

    try {
      const res = await fetch("/api/feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: DEMO_HANDLE, food: "Sherwood Berries" }),
      });
      const data = await res.json();

      if (data.success) {
        const newExp = exp + 20;
        if (newExp >= 100) {
          setLevel((p) => p + 1);
          setExp(newExp - 100);
          sounds.playHatchFanfare();
          showToast(`⭐ LEVEL UP! Robin Fox reached LVL ${level + 1}!`);
        } else {
          setExp(newExp);
          showToast("🍓 Savoring Sherwood Berries! +20 EXP");
        }
        setFoodTokens((p) => Math.max(0, p - 1));
        setFeedCooldown(60 * 60 * 1000); // 60 min
      } else {
        if (data.cooldownMs) setFeedCooldown(data.cooldownMs);
        showToast(data.error || "Feed failed", "error");
      }
    } catch {
      // Local fallback for demo
      const newExp = exp + 20;
      if (newExp >= 100) { setLevel((p) => p + 1); setExp(newExp - 100); sounds.playHatchFanfare(); }
      else setExp(newExp);
      setFoodTokens((p) => Math.max(0, p - 1));
      setFeedCooldown(60 * 60 * 1000);
      showToast("🍓 +20 EXP (local demo mode)");
    } finally {
      setFeedLoading(false);
    }
  }, [feedCooldown, foodTokens, exp, level]);

  const handlePet = useCallback(async () => {
    if (petCooldown > 0) {
      showToast(`⏳ Pet cooldown: ${msToCountdown(petCooldown)}`, "info");
      return;
    }

    setPetLoading(true);
    sounds.playBlip();

    try {
      const res = await fetch("/api/pet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: DEMO_HANDLE }),
      });
      const data = await res.json();

      if (data.success) {
        setHappiness((p) => Math.min(100, p + 10));
        setPetCooldown(30 * 60 * 1000); // 30 min
        showToast("🦊 *purr* Robin Fox bonds with you! +10 Happiness");
      } else {
        if (data.cooldownMs) setPetCooldown(data.cooldownMs);
        showToast(data.error || "Pet failed", "error");
      }
    } catch {
      setHappiness((p) => Math.min(100, p + 10));
      setPetCooldown(30 * 60 * 1000);
      showToast("🦊 *purr* Robin Fox bonds with you! +10 Happiness");
    } finally {
      setPetLoading(false);
    }
  }, [petCooldown]);

  const handleSpar = useCallback(async () => {
    if (sparCooldown > 0) {
      showToast(`⏳ Spar cooldown: ${msToCountdown(sparCooldown)}`, "info");
      return;
    }
    if (mana < 15) {
      showToast("⚠️ Low Mana! Mana regens 10/hour. Feed first.", "error");
      return;
    }

    setSparLoading(true);
    sounds.playBlip();

    try {
      const res = await fetch("/api/spar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: DEMO_HANDLE }),
      });
      const data = await res.json();

      if (data.success) {
        setMana((p) => Math.max(0, p - 15));
        setExp((p) => Math.min(99, p + 15));
        setSparCooldown(4 * 60 * 60 * 1000); // 4 hrs
        if (data.tokenReward) {
          setFoodTokens((p) => p + 1);
          showToast("⚔️ Spar won! +15 EXP +1 🍓 Food Token");
        } else {
          showToast("⚔️ Archery Sparring complete! +15 EXP");
        }
      } else {
        if (data.cooldownMs) setSparCooldown(data.cooldownMs);
        showToast(data.error || "Spar failed", "error");
      }
    } catch {
      setMana((p) => Math.max(0, p - 15));
      setExp((p) => Math.min(99, p + 15));
      setSparCooldown(4 * 60 * 60 * 1000);
      showToast("⚔️ Archery Sparring complete! +15 EXP");
    } finally {
      setSparLoading(false);
    }
  }, [sparCooldown, mana]);

  const toastColor =
    toast?.type === "error"
      ? "bg-red-500 text-white"
      : toast?.type === "info"
      ? "bg-[#f59e0b] text-[#0d0e11]"
      : "bg-[#58e78f] text-[#0d0e11]";

  return (
    <>
      <section className="w-full pt-8 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Main Hero Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start pt-4 lg:pt-8">
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 bg-white border border-[#0d0e11]/10 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-[#0d0e11] mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#58e78f] animate-pulse"></span>
              <span>Robinhood Chain L2 Ecosystem</span>
              <span className="text-[#0d0e11]/30">|</span>
              <span className="text-[#f243ac]">Zero Gas AI</span>
            </div>

            <h1 className="font-display font-medium text-[42px] sm:text-[58px] lg:text-[72px] leading-[1.05] tracking-tight text-[#0d0e11] mb-6">
              Turn pixel companions <br className="hidden sm:inline" />
              into <span className="font-semibold text-[#0d0e11]">living on-chain legends</span>.
            </h1>

            <p className="text-[#0d0e11]/70 text-lg sm:text-xl max-w-xl font-sans font-normal leading-relaxed mb-8">
              Cove APIs and autonomous on-chain agents allow virtual companions to hatch, evolve, and spar on Robinhood EVM Layer-2 — approving every interaction against live balances in real time.
            </p>

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

          {/* Right Column: Interactive Simulator */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#f243ac]/10 via-[#58e78f]/10 to-transparent rounded-3xl blur-2xl pointer-events-none"></div>

            <div className="facto-dark-card p-6 sm:p-7 relative overflow-hidden flex flex-col gap-5">
              {/* Toast */}
              {toast && (
                <div className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 ${toastColor} font-display font-bold text-xs px-4 py-2 rounded-full shadow-lg animate-bounce whitespace-nowrap`}>
                  {toast.msg}
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

              {/* Character Stage */}
              <div className="relative py-6 flex flex-col items-center justify-center bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden">
                <div className="absolute top-0 w-28 h-1 bg-gradient-to-r from-transparent via-[#58e78f] to-transparent shadow-[0_0_15px_#58e78f]"></div>
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-white/20 shadow-2xl mb-2 group">
                  <Image
                    src="/companions/robin-fox.jpg"
                    alt="Robin Fox Avatar"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
                <h3 className="font-display font-bold text-xl text-white mt-1">Robin Fox</h3>
                <span className="text-xs text-white/50 font-mono">Genesis Archetype #001 · Sherwood Archer</span>
                <div className="w-28 h-2 rounded-full bg-gradient-to-r from-transparent via-[#58e78f]/50 to-transparent mt-2"></div>
              </div>

              {/* Stats */}
              <div className="space-y-3 font-mono text-xs">
                {/* EXP Bar */}
                <div>
                  <div className="flex justify-between text-white/70 mb-1">
                    <span>Growth EXP</span>
                    <span className="text-[#58e78f] font-bold">{exp} / 100</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#58e78f] to-[#f243ac] h-full transition-all duration-500"
                      style={{ width: `${exp}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stat Grid */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="text-white/40 block text-[10px] uppercase">Mana Power</span>
                    <span className={`font-bold ${mana < 15 ? "text-red-400" : "text-white"}`}>{mana} / 100</span>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="text-white/40 block text-[10px] uppercase">😊 Happiness</span>
                    <span className="text-[#f243ac] font-bold">{happiness} / 100</span>
                  </div>
                </div>

                {/* Food Token Balance */}
                <div className="flex items-center justify-between bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-xl px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <Coins className="w-3.5 h-3.5 text-[#f59e0b]" />
                    <span className="text-[#f59e0b] uppercase tracking-wider text-[10px] font-semibold">Food Tokens</span>
                  </div>
                  <span className={`font-bold text-sm ${foodTokens === 0 ? "text-red-400" : "text-[#f59e0b]"}`}>
                    {foodTokens} 🍓
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                {/* Feed */}
                <button
                  onClick={handleFeed}
                  disabled={feedLoading}
                  className={`relative bg-white/10 hover:bg-white/20 active:scale-95 text-white font-sans text-xs py-2.5 px-2 rounded-xl transition flex flex-col items-center gap-1 font-semibold ${
                    feedCooldown > 0 || foodTokens < 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Apple className="w-4 h-4 text-[#f243ac]" />
                  <span>Feed</span>
                  {feedCooldown > 0 && (
                    <span className="text-[9px] text-white/40">{msToCountdown(feedCooldown)}</span>
                  )}
                  {feedCooldown === 0 && foodTokens < 1 && (
                    <span className="text-[9px] text-red-400">No tokens</span>
                  )}
                </button>

                {/* Pet */}
                <button
                  onClick={handlePet}
                  disabled={petLoading}
                  className={`relative bg-white/10 hover:bg-white/20 active:scale-95 text-white font-sans text-xs py-2.5 px-2 rounded-xl transition flex flex-col items-center gap-1 font-semibold ${
                    petCooldown > 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Heart className="w-4 h-4 text-[#58e78f]" />
                  <span>Pet</span>
                  {petCooldown > 0 && (
                    <span className="text-[9px] text-white/40">{msToCountdown(petCooldown)}</span>
                  )}
                </button>

                {/* Spar */}
                <button
                  onClick={handleSpar}
                  disabled={sparLoading}
                  className={`relative bg-white/10 hover:bg-white/20 active:scale-95 text-white font-sans text-xs py-2.5 px-2 rounded-xl transition flex flex-col items-center gap-1 font-semibold ${
                    sparCooldown > 0 || mana < 15 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Swords className="w-4 h-4 text-[#f59e0b]" />
                  <span>Spar</span>
                  {sparCooldown > 0 && (
                    <span className="text-[9px] text-white/40">{msToCountdown(sparCooldown)}</span>
                  )}
                  {sparCooldown === 0 && mana < 15 && (
                    <span className="text-[9px] text-red-400">Low mana</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Partner Marquee */}
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
              <span className="hover:text-[#0d0e11] transition">Robinhood Chain L2</span>
              <span className="text-[#0d0e11]/20">/</span>
              <span className="hover:text-[#0d0e11] transition">Ethereum EVM</span>
              <span className="text-[#0d0e11]/20">/</span>
              <span className="hover:text-[#0d0e11] transition">Arbitrum Orbit</span>
            </div>
          </div>
        </div>
      </section>

      <HatchGuideModal isOpen={guideModalOpen} onClose={() => setGuideModalOpen(false)} />
    </>
  );
};
