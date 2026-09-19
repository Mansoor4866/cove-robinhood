"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface CompanionPreviewProps {
  username?: string;
}

export const CompanionPreview: React.FC<CompanionPreviewProps> = ({
  username: propUsername,
}) => {
  const [displayHandle, setDisplayHandle] = useState<string>("@COVE_USER");
  const [isConnected, setIsConnected] = useState<boolean>(false);

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

  return (
    <div className="w-full max-w-[400px] justify-self-center md:justify-self-end">
      <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm flex flex-col gap-4 relative">
        {/* Top Header */}
        <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 flex justify-between items-center">
          <div>
            <span>HATCHING CARD </span>
            {isConnected ? (
              <span className="text-emerald-500 font-bold ml-1">READY TO HATCH</span>
            ) : (
              <span className="text-red-500 font-bold ml-1">OFFLINE</span>
            )}
          </div>
          <span className="bg-[#F0F4E4] text-[#4C6B00] px-2 py-0.5 rounded text-[9px] font-bold tracking-normal font-mono">
            {displayHandle.toUpperCase()}
          </span>
        </div>

        {/* Floating Pixel Art Sprite */}
        <div className="pt-2 pb-1 flex flex-col items-center justify-center">
          <div className="relative w-40 h-40 select-none">
            <Image
              src="/robin-fox.png"
              alt="Robin Fox Sprite"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* Shadow Pill */}
          <div className="w-20 h-1.5 bg-black/10 rounded-full mt-1 blur-[0.5px]"></div>
        </div>

        {/* Companion Title & Level Badge */}
        <div className="pt-1">
          <div className="flex items-center justify-between">
            <div className="font-display font-bold text-xl text-black">
              Robin Fox{" "}
              <span className="text-black/40 text-sm font-normal font-sans">
                (Fox)
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase px-2.5 py-0.5 rounded-full bg-[#F4F6EC] text-[#4C6B00] font-bold border border-[#4C6B00]/20">
              LEVEL 0
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1 font-mono text-xs">
            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#F0F4E4] text-[#4C6B00] font-bold">
              RANGER
            </span>
            <span className="text-black/50 text-[11px]">Forest Rangers</span>
          </div>
        </div>

        {/* EXP Bar (Starts from 0) */}
        <div className="font-mono text-[10px] pt-1">
          <div className="flex justify-between text-black/60 mb-1">
            <span className="font-bold text-[#5865F2]">EXP : 0</span>
            <span className="text-black/40">100</span>
          </div>
          <div className="w-full bg-black/5 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#5865F2] h-full rounded-full w-[0%]"></div>
          </div>
        </div>

        {/* RPG Vitals Grid (Initialized from Zero / Fresh) */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-2.5 font-mono text-[10px] text-black/60">
          {/* Health */}
          <div>
            <div className="flex justify-between mb-0.5">
              <span className="flex items-center gap-1 text-black/70">
                <span className="text-red-400">♥</span> Health
              </span>
              <span className="font-bold text-black">100/100</span>
            </div>
            <div className="w-full bg-black/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full rounded-full w-full"></div>
            </div>
          </div>

          {/* Energy */}
          <div>
            <div className="flex justify-between mb-0.5">
              <span className="flex items-center gap-1 text-black/70">
                <span className="text-amber-400">⚡</span> Energy
              </span>
              <span className="font-bold text-black">100/100</span>
            </div>
            <div className="w-full bg-black/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full w-full"></div>
            </div>
          </div>

          {/* Hunger (Starts at 0) */}
          <div>
            <div className="flex justify-between mb-0.5">
              <span className="flex items-center gap-1 text-black/70">
                <span className="text-orange-400">🍗</span> Hunger
              </span>
              <span className="font-bold text-black">0/100</span>
            </div>
            <div className="w-full bg-black/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-orange-500 h-full rounded-full w-[0%]"></div>
            </div>
          </div>

          {/* Happiness (Starts at 0) */}
          <div>
            <div className="flex justify-between mb-0.5">
              <span className="flex items-center gap-1 text-black/70">
                <span className="text-emerald-400">😊</span> Happiness
              </span>
              <span className="font-bold text-black">0/100</span>
            </div>
            <div className="w-full bg-black/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-[0%]"></div>
            </div>
          </div>
        </div>

        {/* 4 Attributes Row (Starts at 0) */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-1.5 font-mono text-[10px] text-black/60 pt-2 border-t border-black/5">
          <div className="flex justify-between">
            <span>🤝 Friendship</span>
            <span className="font-bold text-black">0/100</span>
          </div>
          <div className="flex justify-between">
            <span>⚔ Strength</span>
            <span className="font-bold text-black">0</span>
          </div>
          <div className="flex justify-between">
            <span>🧠 Intelligence</span>
            <span className="font-bold text-black">0</span>
          </div>
          <div className="flex justify-between">
            <span>🍀 Luck</span>
            <span className="font-bold text-black">0</span>
          </div>
        </div>

        {/* Lore Description */}
        <p className="font-mono text-[10px] text-black/60 italic leading-relaxed pt-1">
          Group leader. Expert in archery, strategizing, and leading ambush or rescue missions.
        </p>
      </div>
    </div>
  );
};
