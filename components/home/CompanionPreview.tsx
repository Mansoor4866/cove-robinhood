"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Shield, Heart, Zap, Award, Apple, Compass } from "lucide-react";

interface CompanionPreviewProps {
  username?: string;
}

export const CompanionPreview: React.FC<CompanionPreviewProps> = ({
  username: propUsername,
}) => {
  const [displayHandle, setDisplayHandle] = useState<string>("@COVE_TRAINER");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [feedEffect, setFeedEffect] = useState<string | null>(null);
  const [exp, setExp] = useState<number>(0);
  const [happiness, setHappiness] = useState<number>(0);

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
      } else if (propUsername) {
        setDisplayHandle(propUsername.startsWith("@") ? propUsername : `@${propUsername}`);
        setIsConnected(false);
      }
    };

    updateUserInfo();
    window.addEventListener("storage", updateUserInfo);
    window.addEventListener("cove_auth_changed", updateUserInfo);
    return () => {
      window.removeEventListener("storage", updateUserInfo);
      window.removeEventListener("cove_auth_changed", updateUserInfo);
    };
  }, [propUsername]);

  const handleTestFeed = () => {
    setFeedEffect("🍎 +15 EXP! Robin Fox is purring with delight!");
    setExp((prev) => Math.min(100, prev + 15));
    setHappiness((prev) => Math.min(100, prev + 20));
    setTimeout(() => {
      setFeedEffect(null);
    }, 2800);
  };

  return (
    <div className="w-full max-w-[440px] justify-self-center md:justify-self-end relative">
      {/* Background Outer Glow */}
      <div className="absolute -inset-1 bg-gradient-to-b from-[#00FF87]/20 via-[#10B981]/10 to-transparent rounded-3xl blur-xl opacity-75"></div>

      {/* Futuristic Holographic Capsule Card */}
      <div className="glass-panel border border-[#00FF87]/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col gap-4">
        {/* Top Holographic Header */}
        <div className="flex justify-between items-center font-mono text-[11px] pb-3 border-b border-[#00FF87]/15">
          <div className="flex items-center gap-2">
            <span className="beacon-dot"></span>
            <span className="text-white/60 tracking-wider">HOLOGRAPHIC POD</span>
            {isConnected ? (
              <span className="text-[#00FF87] font-bold bg-[#00FF87]/15 px-2 py-0.5 rounded text-[10px] border border-[#00FF87]/30">
                ACTIVE
              </span>
            ) : (
              <span className="text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded text-[10px] border border-amber-400/20">
                READY TO HATCH
              </span>
            )}
          </div>

          <span className="bg-[#00FF87]/10 text-[#00FF87] border border-[#00FF87]/30 px-2.5 py-0.5 rounded-full font-bold text-[10px] tracking-wide">
            {displayHandle.toUpperCase()}
          </span>
        </div>

        {/* 3D Holographic Chamber Stage */}
        <div className="relative py-4 flex flex-col items-center justify-center rounded-2xl hologram-pod overflow-hidden">
          {/* Holographic Light Beam from Top */}
          <div className="absolute top-0 w-32 h-1 bg-gradient-to-r from-transparent via-[#00FF87] to-transparent shadow-[0_0_15px_#00FF87]"></div>
          
          {/* Reaction Toast */}
          {feedEffect && (
            <div className="absolute top-3 z-30 bg-[#00FF87] text-[#050B07] font-display font-bold text-xs px-3 py-1.5 rounded-full shadow-lg animate-bounce flex items-center gap-1.5">
              <span>{feedEffect}</span>
            </div>
          )}

          {/* Floating Pixel Art Companion */}
          <div className="relative w-44 h-44 select-none animate-float z-10">
            <Image
              src="/robin-fox.png"
              alt="Robin Fox Hologram"
              fill
              className="object-contain drop-shadow-[0_0_20px_rgba(0,255,135,0.4)]"
              priority
            />
          </div>

          {/* Hologram Pedestal Grid Base */}
          <div className="w-28 h-4 rounded-full bg-gradient-to-r from-transparent via-[#00FF87]/30 to-transparent border-t border-[#00FF87]/50 blur-[0.5px] -mt-2"></div>
        </div>

        {/* Identity & Level Ribbon */}
        <div className="pt-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-extrabold text-2xl text-white tracking-tight flex items-center gap-2">
                <span>Robin Fox</span>
                <span className="text-xs font-mono text-[#00FF87] bg-[#00FF87]/10 px-2 py-0.5 rounded border border-[#00FF87]/30">
                  GENESIS #001
                </span>
              </h2>
              <p className="font-mono text-xs text-white/50 mt-0.5">
                Archery Master · Forest Ranger Guild
              </p>
            </div>
            <div className="text-right font-mono">
              <span className="text-xs uppercase px-3 py-1 rounded-full bg-[#00FF87]/15 text-[#00FF87] font-bold border border-[#00FF87]/30">
                LEVEL 0
              </span>
            </div>
          </div>
        </div>

        {/* Cyber EXP Bar */}
        <div className="font-mono text-xs space-y-1.5 bg-[#050B07]/60 p-3 rounded-xl border border-[#00FF87]/15">
          <div className="flex justify-between text-xs">
            <span className="text-white/60">GROWTH EXP:</span>
            <span className="font-bold text-[#00FF87]">{exp} / 100</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-0.5 border border-[#00FF87]/20">
            <div
              className="bg-gradient-to-r from-[#10B981] to-[#00FF87] h-full rounded-full transition-all duration-500 shadow-[0_0_10px_#00FF87]"
              style={{ width: `${exp}%` }}
            ></div>
          </div>
        </div>

        {/* Cyber RPG Vitals Matrix */}
        <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
          {/* Health */}
          <div className="bg-[#050B07]/50 p-2.5 rounded-xl border border-white/5">
            <div className="flex justify-between items-center text-[11px] mb-1">
              <span className="text-white/60 flex items-center gap-1">
                <Heart className="w-3 h-3 text-red-400" /> Vitality
              </span>
              <span className="font-bold text-white">100/100</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full rounded-full w-full"></div>
            </div>
          </div>

          {/* Energy */}
          <div className="bg-[#050B07]/50 p-2.5 rounded-xl border border-white/5">
            <div className="flex justify-between items-center text-[11px] mb-1">
              <span className="text-white/60 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" /> Mana Energy
              </span>
              <span className="font-bold text-white">100/100</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full w-full"></div>
            </div>
          </div>

          {/* Hunger */}
          <div className="bg-[#050B07]/50 p-2.5 rounded-xl border border-white/5">
            <div className="flex justify-between items-center text-[11px] mb-1">
              <span className="text-white/60 flex items-center gap-1">
                🍗 Hunger
              </span>
              <span className="font-bold text-white">0/100</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#00FF87] h-full rounded-full w-[0%]"></div>
            </div>
          </div>

          {/* Happiness */}
          <div className="bg-[#050B07]/50 p-2.5 rounded-xl border border-white/5">
            <div className="flex justify-between items-center text-[11px] mb-1">
              <span className="text-white/60 flex items-center gap-1">
                ✨ Morale
              </span>
              <span className="font-bold text-[#00FF87]">{happiness}/100</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#00FF87] h-full rounded-full transition-all duration-300"
                style={{ width: `${happiness}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 4 Combat Attributes Grid */}
        <div className="grid grid-cols-4 gap-2 text-center font-mono text-[10px] pt-1">
          <div className="bg-[#050B07]/40 p-2 rounded-lg border border-white/5">
            <div className="text-white/40">ARCHERY</div>
            <div className="text-white font-bold text-sm mt-0.5">0</div>
          </div>
          <div className="bg-[#050B07]/40 p-2 rounded-lg border border-white/5">
            <div className="text-white/40">WISDOM</div>
            <div className="text-white font-bold text-sm mt-0.5">0</div>
          </div>
          <div className="bg-[#050B07]/40 p-2 rounded-lg border border-white/5">
            <div className="text-white/40">AGILITY</div>
            <div className="text-white font-bold text-sm mt-0.5">0</div>
          </div>
          <div className="bg-[#050B07]/40 p-2 rounded-lg border border-white/5">
            <div className="text-white/40">LUCK</div>
            <div className="text-[#00FF87] font-bold text-sm mt-0.5">0</div>
          </div>
        </div>

        {/* Quick Test Feed Simulator Button */}
        <button
          onClick={handleTestFeed}
          className="w-full btn-glass hover:border-[#00FF87] font-mono text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition"
        >
          <Apple className="w-3.5 h-3.5 text-[#00FF87]" />
          <span>Test Feed Wild Berry (+15 EXP)</span>
        </button>
      </div>
    </div>
  );
};
