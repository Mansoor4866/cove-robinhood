"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  Heart,
  Award,
  Search,
  Volume2,
  VolumeX,
  Apple,
  Flame,
  Swords,
  Moon,
  RefreshCw,
  Terminal,
  Compass
} from "lucide-react";
import { sounds } from "@/lib/audio";
import { HatchGuideModal } from "@/components/ui/HatchGuideModal";

interface HeroSanctuaryProps {
  onSearchUser?: (username: string) => void;
}

export const HeroSanctuary: React.FC<HeroSanctuaryProps> = ({ onSearchUser }) => {
  const [mode, setMode] = useState<"incubator" | "pet" | "evolution">("pet");
  const [eggCracks, setEggCracks] = useState<number>(0);
  const [isHatched, setIsHatched] = useState<boolean>(true);
  const [eggShaking, setEggShaking] = useState<boolean>(false);
  const [displayHandle, setDisplayHandle] = useState<string>("@COVE_TRAINER");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [guideModalOpen, setGuideModalOpen] = useState<boolean>(false);
  const [walletError, setWalletError] = useState<string>("");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  // Live Pet Stats
  const [exp, setExp] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [health, setHealth] = useState<number>(100);
  const [mana, setMana] = useState<number>(100);
  const [morale, setMorale] = useState<number>(0);
  const [actionToast, setActionToast] = useState<string | null>(null);

  useEffect(() => {
    const updateUserInfo = () => {
      const savedHandle = localStorage.getItem("cove_user_handle");
      const savedWallet = localStorage.getItem("cove_wallet_address");
      if (savedHandle) {
        setDisplayHandle(savedHandle.startsWith("@") ? savedHandle : `@${savedHandle}`);
        setIsConnected(true);
      } else if (savedWallet) {
        setDisplayHandle(`@${savedWallet.substring(0, 6)}...${savedWallet.substring(savedWallet.length - 4)}`);
        setIsConnected(true);
      }
    };

    updateUserInfo();
    window.addEventListener("storage", updateUserInfo);
    window.addEventListener("cove_auth_changed", updateUserInfo);
    return () => {
      window.removeEventListener("storage", updateUserInfo);
      window.removeEventListener("cove_auth_changed", updateUserInfo);
    };
  }, []);

  const triggerToast = (msg: string) => {
    setActionToast(msg);
    setTimeout(() => setActionToast(null), 3000);
  };

  const handleToggleMute = () => {
    sounds.isMuted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Egg Crack Simulator
  const handleCrackEgg = () => {
    if (eggCracks >= 2) {
      // 3rd click: Hatch!
      sounds.playHatchFanfare();
      setEggCracks(3);
      setEggShaking(true);
      setTimeout(() => {
        setIsHatched(true);
        setMode("pet");
        setLevel(1);
        setExp(25);
        setMorale(50);
        triggerToast("🎉 Egg Hatched! Robin Fox materialized on Robinhood Chain!");
      }, 700);
    } else {
      sounds.playCrack();
      setEggShaking(true);
      setEggCracks((prev) => prev + 1);
      setTimeout(() => setEggShaking(false), 300);
    }
  };

  // Feeding & Caring
  const handleFeed = (food: string, expGain: number, manaGain: number) => {
    sounds.playFeedCrunch();
    const newExp = exp + expGain;
    if (newExp >= 100) {
      setLevel((prev) => prev + 1);
      setExp(newExp - 100);
      sounds.playHatchFanfare();
      triggerToast(`⭐ LEVEL UP! Robin Fox reached Level ${level + 1}!`);
    } else {
      setExp(newExp);
      setMana((prev) => Math.min(100, prev + manaGain));
      setMorale((prev) => Math.min(100, prev + 15));
      triggerToast(`🍎 Savoring ${food}! (+${expGain} EXP, +${manaGain} Mana)`);
    }
  };

  const handlePet = () => {
    sounds.playBlip();
    setMorale((prev) => Math.min(100, prev + 20));
    triggerToast("🦊 *purr* Robin Fox wags its tail happily! (+20 Morale)");
  };

  const handleSpar = () => {
    sounds.playBlip();
    if (mana < 15) {
      triggerToast("⚠️ Low Mana! Feed Robin Fox before sparring.");
      return;
    }
    setMana((prev) => Math.max(0, prev - 15));
    setExp((prev) => Math.min(100, prev + 20));
    triggerToast("⚔️ Target Practice complete! (+20 Archery EXP)");
  };

  const handleHatchClick = () => {
    const saved = localStorage.getItem("cove_wallet_address");
    if (!saved) {
      setWalletError("⚠️ Please connect your wallet first!");
      setTimeout(() => setWalletError(""), 3500);
    } else {
      setGuideModalOpen(true);
    }
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-14 grid lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Vision & Actions (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Top Cyber Beacon */}
          <div className="inline-flex items-center gap-3 bg-[#0A140E]/90 border border-[#00FF87]/25 rounded-full px-4 py-1.5 mb-6 shadow-[0_0_20px_rgba(0,255,135,0.1)]">
            <span className="beacon-dot"></span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#00FF87] font-bold">
              Sherwood Autonomous AI Matrix · Robinhood L2
            </span>
            <button
              onClick={handleToggleMute}
              className="ml-2 text-white/40 hover:text-white transition p-0.5"
              title={isMuted ? "Unmute SFX" : "Mute SFX"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#00FF87]" />}
            </button>
          </div>

          {/* Master Headline */}
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-[64px] tracking-tight leading-[1.04] mb-6">
            <span className="text-white">Living AI Pets.</span><br />
            <span className="text-gradient-mint">Born in Sherwood.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[#8E9E94] text-lg lg:text-xl max-w-xl mb-8 leading-relaxed font-sans font-light">
            Cove turns autonomous pixel companions into living, evolving on-chain creatures. Care on 𝕏 in natural language, spar in Sherwood Forest, and claim weekly rewards on <span className="text-white font-medium">Robinhood Chain</span>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={handleHatchClick}
              className="btn-neon font-display font-bold text-sm px-8 py-4 rounded-full flex items-center gap-2.5 tracking-wide uppercase shadow-[0_0_35px_rgba(0,255,135,0.4)]"
            >
              <span>Hatch on 𝕏 Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById("expeditions");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-glass font-mono text-xs px-6 py-4 rounded-full flex items-center gap-2 uppercase tracking-wider"
            >
              <Compass className="w-4 h-4 text-[#00FF87]" />
              <span>Forest Expeditions</span>
            </button>
          </div>

          {/* Error Prompt */}
          {walletError && (
            <div className="mb-6 font-mono text-xs font-bold text-red-300 bg-red-950/90 border border-red-500/60 px-4 py-2 rounded-xl animate-bounce">
              {walletError}
            </div>
          )}

          {/* Verified Robinhood Contract Pill */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/60 mb-8 pb-6 border-b border-white/5 w-full">
            <div className="flex items-center gap-1.5 text-[#00FF87]">
              <Shield className="w-4 h-4" />
              <span className="font-bold">Robinhood EVM L2 Verified</span>
            </div>
            <span className="text-white/20">|</span>
            <span className="text-white/50">Contract: 0x742d...44e9</span>
            <span className="text-white/20">|</span>
            <span className="text-white/70">Sponsored Zero Gas</span>
          </div>

          {/* 3 Metric Stat Pillars */}
          <div className="grid grid-cols-3 gap-3.5 w-full max-w-xl font-mono">
            <div className="glass-panel p-4 rounded-2xl border border-[#00FF87]/20">
              <div className="text-[10px] text-white/50 uppercase tracking-wider">Companions</div>
              <div className="text-xl font-bold text-white font-display mt-0.5">14,892+</div>
              <div className="text-[9px] text-[#00FF87] mt-1 font-semibold flex items-center gap-1">
                <span>▲ 100% On-Chain</span>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-[#00FF87]/20">
              <div className="text-[10px] text-white/50 uppercase tracking-wider">Execution Speed</div>
              <div className="text-xl font-bold text-white font-display mt-0.5">&lt;0.001s</div>
              <div className="text-[9px] text-[#00FF87] mt-1 font-semibold">
                Instant State Sync
              </div>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-[#00FF87]/20">
              <div className="text-[10px] text-white/50 uppercase tracking-wider">Weekly Bounty</div>
              <div className="text-xl font-bold text-[#00FF87] font-display mt-0.5">10,000 $COVE</div>
              <div className="text-[9px] text-white/50 mt-1">
                Leaderboard Pool
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Holographic Capsule & Simulator (5 Cols) */}
        <div className="lg:col-span-5 relative">
          {/* Outer Cosmic Aura */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-[#00FF87]/25 via-[#10B981]/15 to-transparent rounded-[36px] blur-2xl opacity-80 pointer-events-none"></div>

          {/* Main Capsule Glass Container */}
          <div className="glass-panel border border-[#00FF87]/35 rounded-[32px] p-6 shadow-2xl relative overflow-hidden flex flex-col gap-4 bg-[#0A140E]/90">
            {/* Action Response Toast */}
            {actionToast && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-[#00FF87] text-[#050B07] font-display font-bold text-xs px-4 py-2 rounded-full shadow-[0_0_20px_#00FF87] animate-bounce whitespace-nowrap">
                {actionToast}
              </div>
            )}

            {/* Mode Switcher Tabs */}
            <div className="flex bg-[#050B07] p-1.5 rounded-2xl border border-[#00FF87]/20 font-mono text-xs">
              <button
                onClick={() => {
                  sounds.playBlip();
                  setMode("pet");
                }}
                className={`flex-1 py-2 rounded-xl transition-all font-semibold flex items-center justify-center gap-1.5 ${
                  mode === "pet"
                    ? "bg-[#00FF87] text-[#050B07] font-bold shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <span>🦊 Sanctuary Pod</span>
              </button>

              <button
                onClick={() => {
                  sounds.playBlip();
                  setMode("incubator");
                }}
                className={`flex-1 py-2 rounded-xl transition-all font-semibold flex items-center justify-center gap-1.5 ${
                  mode === "incubator"
                    ? "bg-[#00FF87] text-[#050B07] font-bold shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <span>🥚 Incubator</span>
              </button>

              <button
                onClick={() => {
                  sounds.playBlip();
                  setMode("evolution");
                }}
                className={`flex-1 py-2 rounded-xl transition-all font-semibold flex items-center justify-center gap-1.5 ${
                  mode === "evolution"
                    ? "bg-[#00FF87] text-[#050B07] font-bold shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <span>🧬 DNA</span>
              </button>
            </div>

            {/* MODE 1: LIVING COMPANION POD */}
            {mode === "pet" && (
              <div className="space-y-4 animate-fade-in">
                {/* Hologram Stage */}
                <div className="relative py-6 flex flex-col items-center justify-center rounded-2xl hologram-pod overflow-hidden">
                  {/* Overhead Holographic Emitter Light */}
                  <div className="absolute top-0 w-36 h-1.5 bg-gradient-to-r from-transparent via-[#00FF87] to-transparent shadow-[0_0_20px_#00FF87]"></div>

                  {/* Floating Sprite */}
                  <div className="relative w-44 h-44 select-none animate-float z-10">
                    <Image
                      src="/robin-fox.png"
                      alt="Robin Fox Sprite"
                      fill
                      className="object-contain drop-shadow-[0_0_25px_rgba(0,255,135,0.45)]"
                      priority
                    />
                  </div>

                  {/* Luminous Pedestal */}
                  <div className="w-32 h-4 rounded-full bg-gradient-to-r from-transparent via-[#00FF87]/40 to-transparent border-t border-[#00FF87]/60 blur-[0.5px] -mt-2"></div>
                </div>

                {/* Identity & Level */}
                <div className="flex items-center justify-between font-mono">
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-white flex items-center gap-2">
                      <span>Robin Fox</span>
                      <span className="text-[10px] text-[#00FF87] bg-[#00FF87]/15 px-2 py-0.5 rounded-full border border-[#00FF87]/30">
                        GENESIS #001
                      </span>
                    </h3>
                    <p className="text-white/40 text-xs mt-0.5">
                      Guild: Sherwood Forest Rangers
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs uppercase px-3 py-1 rounded-full bg-[#00FF87]/20 text-[#00FF87] font-bold border border-[#00FF87]/40 shadow-[0_0_10px_rgba(0,255,135,0.2)]">
                      LEVEL {level}
                    </span>
                  </div>
                </div>

                {/* Growth EXP Gauge */}
                <div className="bg-[#050B07] p-3 rounded-2xl border border-[#00FF87]/20 font-mono text-xs space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60">GROWTH EXP:</span>
                    <span className="font-bold text-[#00FF87]">{exp} / 100</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-0.5 border border-[#00FF87]/25">
                    <div
                      className="bg-gradient-to-r from-[#10B981] to-[#00FF87] h-full rounded-full transition-all duration-500 shadow-[0_0_12px_#00FF87]"
                      style={{ width: `${exp}%` }}
                    ></div>
                  </div>
                </div>

                {/* Dual Vitals Matrix */}
                <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                  <div className="bg-[#050B07] p-2.5 rounded-xl border border-white/5">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-white/60 flex items-center gap-1">
                        <Heart className="w-3 h-3 text-red-400" /> Vitality
                      </span>
                      <span className="font-bold text-white">{health}/100</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full rounded-full w-full"></div>
                    </div>
                  </div>

                  <div className="bg-[#050B07] p-2.5 rounded-xl border border-white/5">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-white/60 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-400" /> Mana
                      </span>
                      <span className="font-bold text-amber-400">{mana}/100</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${mana}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Interactive Action Bar (Feed, Pet, Spar) */}
                <div className="space-y-2 pt-1 font-mono text-xs">
                  <div className="text-[10px] uppercase text-white/40 font-bold px-1">
                    Live Care & Training Bar:
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleFeed("Wild Honey Berries", 15, 10)}
                      className="btn-glass hover:border-[#00FF87] p-2.5 rounded-xl text-center flex flex-col items-center gap-1 group"
                    >
                      <span className="text-base group-hover:scale-125 transition">🍓</span>
                      <span className="text-[10px] text-white font-semibold">Berries</span>
                      <span className="text-[9px] text-[#00FF87] font-bold">+15 EXP</span>
                    </button>

                    <button
                      onClick={handlePet}
                      className="btn-glass hover:border-[#00FF87] p-2.5 rounded-xl text-center flex flex-col items-center gap-1 group"
                    >
                      <span className="text-base group-hover:scale-125 transition">✨</span>
                      <span className="text-[10px] text-white font-semibold">Pet</span>
                      <span className="text-[9px] text-[#00FF87] font-bold">+20 Morale</span>
                    </button>

                    <button
                      onClick={handleSpar}
                      className="btn-glass hover:border-[#00FF87] p-2.5 rounded-xl text-center flex flex-col items-center gap-1 group"
                    >
                      <span className="text-base group-hover:scale-125 transition">🏹</span>
                      <span className="text-[10px] text-white font-semibold">Spar</span>
                      <span className="text-[9px] text-amber-400 font-bold">-15 Mana</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MODE 2: INCUBATOR (Interactive Egg Cracker) */}
            {mode === "incubator" && (
              <div className="space-y-5 py-4 text-center animate-fade-in font-mono">
                <div className="text-xs text-white/60">
                  Click the egg 3 times to crack the shell on Robinhood Chain:
                </div>

                <div className="relative py-8 flex flex-col items-center justify-center">
                  <button
                    onClick={handleCrackEgg}
                    className={`cursor-pointer transform hover:scale-105 active:scale-95 transition select-none ${
                      eggShaking ? "animate-bounce" : ""
                    }`}
                  >
                    <div className="text-7xl drop-shadow-[0_0_30px_rgba(0,255,135,0.6)]">
                      {eggCracks === 0 ? "🥚" : eggCracks === 1 ? "⚡" : eggCracks === 2 ? "🐣" : "🦊"}
                    </div>
                  </button>

                  <div className="w-28 h-3 rounded-full bg-[#00FF87]/30 blur-sm mt-3"></div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs px-2">
                    <span className="text-white/60">CRACK STATUS:</span>
                    <span className="font-bold text-[#00FF87]">{eggCracks} / 3 CLICKS</span>
                  </div>

                  <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden p-0.5 border border-[#00FF87]/30">
                    <div
                      className="bg-gradient-to-r from-[#10B981] to-[#00FF87] h-full rounded-full transition-all duration-300"
                      style={{ width: `${(eggCracks / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={handleCrackEgg}
                  className="w-full btn-neon font-display font-bold py-3 rounded-xl text-xs uppercase tracking-wider"
                >
                  {eggCracks >= 2 ? "⚡ Final Crack to Hatch!" : "🔨 Click Egg to Strike Shell"}
                </button>
              </div>
            )}

            {/* MODE 3: EVOLUTION MATRIX */}
            {mode === "evolution" && (
              <div className="space-y-4 py-2 font-mono text-xs animate-fade-in">
                <div className="bg-[#050B07] p-3.5 rounded-2xl border border-[#00FF87]/20 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/50 text-[11px]">Species Archetype:</span>
                    <span className="font-bold text-white">Robin Fox (Vulpes Ranger)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/50 text-[11px]">Evolution Stage:</span>
                    <span className="font-bold text-[#00FF87]">Stage 1 · Forest Scout</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/50 text-[11px]">Next Evolution:</span>
                    <span className="text-amber-400 font-bold">Stage 2 · Shadow Marksman (LVL 5)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] uppercase text-white/40 font-bold">
                    Special Ability Matrix:
                  </div>

                  <div className="space-y-1.5">
                    <div className="p-2.5 rounded-xl bg-[#050B07] border border-white/5 flex items-center justify-between">
                      <span className="text-white flex items-center gap-1.5">
                        <span>🏹</span> Precision Snipe
                      </span>
                      <span className="text-[10px] text-[#00FF87] font-bold">UNLOCKED</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#050B07] border border-white/5 flex items-center justify-between opacity-60">
                      <span className="text-white flex items-center gap-1.5">
                        <span>🌲</span> Sherwood Ambush Cloak
                      </span>
                      <span className="text-[10px] text-white/40">Unlocks LVL 3</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#050B07] border border-white/5 flex items-center justify-between opacity-60">
                      <span className="text-white flex items-center gap-1.5">
                        <span>🦅</span> Golden Eagle Call
                      </span>
                      <span className="text-[10px] text-white/40">Unlocks LVL 5</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5-Step Hatching Guide Modal */}
      <HatchGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
      />
    </>
  );
};
