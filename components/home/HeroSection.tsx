"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HatchGuideModal } from "@/components/ui/HatchGuideModal";

interface HeroSectionProps {
  onSearchUser?: (username: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearchUser }) => {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [walletError, setWalletError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onSearchUser) onSearchUser(searchInput);
    }, 500);
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
      <div className="flex flex-col">
        {/* Live System Status Pill */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="font-mono text-xs uppercase tracking-widest text-black/40 flex items-center gap-2">
            <span className="live-dot"></span>
            <span>Live on 𝕏 · systems normal</span>
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-display font-bold text-5xl lg:text-6xl leading-[1.02] tracking-tight mb-5 text-black">
          Your companion,<br />
          <span className="text-[#4C6B00]">running on Robinhood Chain.</span>
        </h1>

        {/* Subtitle Lore */}
        <p className="text-black/60 text-lg max-w-md mb-8 leading-relaxed">
          Cove is the forest virtual pet platform on X — hatch a companion in Sherwood forest today, and train it to be a legendary Robin Hood protector using custom Pixel Art composites.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-3">
          <button
            onClick={handleHatchClick}
            className="bg-[#CCFF00] hover:bg-[#DFFF3D] hover:shadow-[0_0_24px_rgba(140,179,0,0.35)] text-black font-semibold text-sm px-7 py-3 rounded-full transition-all duration-200 focus:outline-none inline-flex items-center"
          >
            Hatch on 𝕏 →
          </button>
          <Link
            href="/docs"
            className="bg-transparent border border-black/20 hover:border-[#4C6B00] hover:text-[#4C6B00] text-black font-semibold text-sm px-7 py-3 rounded-full transition-all duration-200 flex items-center"
          >
            Read the docs
          </Link>
        </div>

        {/* Red Error Message if wallet not connected */}
        {walletError && (
          <div className="mb-6 font-mono text-xs font-bold text-red-600 bg-red-50 border border-red-200/80 px-3 py-1.5 rounded-lg inline-block w-max animate-bounce">
            {walletError}
          </div>
        )}
        {!walletError && <div className="mb-7"></div>}

        {/* Lookup User Dashboard Card */}
        <div className="bg-white border border-black/10 rounded-xl p-5 max-w-md border-glow">
          <h3 className="font-display font-bold text-sm text-black mb-3">
            Lookup User Dashboard
          </h3>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="@username or email"
              className="flex-1 px-3 py-1.5 border border-black/10 rounded-lg text-sm bg-transparent focus:outline-none focus:border-[#4C6B00] text-black font-mono"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-black hover:bg-neutral-800 text-white text-xs px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "Load"}
            </button>
          </form>
        </div>

        {/* Top 3 Pets Card */}
        <div className="bg-white border border-black/10 rounded-xl p-5 max-w-md border-glow mt-4">
          <h3 className="font-display font-bold text-sm text-black mb-3 flex justify-between items-center">
            <span>Top 3 Pets</span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-black/40">
              Leaderboard
            </span>
          </h3>
          <div className="flex flex-col gap-2.5">
            <div className="text-center py-4 text-black/40 text-[11px] font-mono">
              Loading top companions...
            </div>
          </div>
        </div>
      </div>

      {/* 5-Step Hatching Guide Modal */}
      <HatchGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
      />
    </>
  );
};
