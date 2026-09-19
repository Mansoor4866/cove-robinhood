"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Sparkles, Shield, Zap, ArrowRight, Activity, Terminal } from "lucide-react";
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
    }, 400);
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
      <div className="flex flex-col relative z-10">
        {/* Status Beacon Badge */}
        <div className="inline-flex items-center gap-2.5 bg-[#0A140E] border border-[#00FF87]/20 rounded-full px-3.5 py-1.5 w-max mb-6 shadow-[0_0_20px_rgba(0,255,135,0.08)]">
          <span className="beacon-dot"></span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#00FF87] font-semibold">
            Sherwood Genesis Matrix · Online
          </span>
        </div>

        {/* Hero Title with Gradient */}
        <h1 className="font-display font-extrabold text-5xl lg:text-6xl tracking-tight leading-[1.08] mb-6">
          <span className="text-white">Living AI Companions.</span><br />
          <span className="text-gradient-mint">Bound On-Chain.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[#8E9E94] text-lg max-w-lg mb-8 leading-relaxed font-sans font-light">
          Cove transforms digital creatures into sovereign AI companions on <span className="text-white font-medium">Robinhood Chain</span>. Hatch in Sherwood, care on 𝕏 in natural language, and train your pet with dynamic on-chain DNA.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <button
            onClick={handleHatchClick}
            className="btn-neon font-display font-bold text-sm px-8 py-3.5 rounded-full flex items-center gap-2 tracking-wide uppercase shadow-[0_0_30px_rgba(0,255,135,0.3)]"
          >
            <span>Hatch on 𝕏 Timeline</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <Link
            href="/docs"
            className="btn-glass font-mono text-xs px-6 py-3.5 rounded-full flex items-center gap-2 uppercase tracking-wider"
          >
            <Terminal className="w-4 h-4 text-[#00FF87]" />
            <span>View Docs & Protocol</span>
          </Link>
        </div>

        {/* Wallet Error Alert */}
        {walletError && (
          <div className="mb-6 font-mono text-xs font-bold text-red-300 bg-red-950/80 border border-red-500/60 px-4 py-2 rounded-xl inline-block w-max animate-bounce">
            {walletError}
          </div>
        )}

        {/* Live Ecosystem Metric Pillars */}
        <div className="grid grid-cols-3 gap-3 max-w-lg mb-8 font-mono">
          <div className="glass-panel p-3.5 rounded-2xl border border-[#00FF87]/15">
            <div className="text-[10px] text-white/50 uppercase">Hatched</div>
            <div className="text-lg font-bold text-white mt-0.5">14,892+</div>
            <div className="text-[9px] text-[#00FF87] flex items-center gap-1 mt-0.5">
              <span>▲ Live</span>
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-2xl border border-[#00FF87]/15">
            <div className="text-[10px] text-white/50 uppercase">Speed</div>
            <div className="text-lg font-bold text-white mt-0.5">&lt;0.001s</div>
            <div className="text-[9px] text-[#00FF87] flex items-center gap-1 mt-0.5">
              <span>Robinhood L2</span>
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-2xl border border-[#00FF87]/15">
            <div className="text-[10px] text-white/50 uppercase">Mint Gas</div>
            <div className="text-lg font-bold text-[#00FF87] mt-0.5">$0.00</div>
            <div className="text-[9px] text-white/50 mt-0.5">Sponsored</div>
          </div>
        </div>

        {/* Lookup User Dashboard Card */}
        <div className="glass-panel rounded-2xl p-5 max-w-lg border border-[#00FF87]/20 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-[#00FF87]" />
              <span>Sanctuary Companion Inspector</span>
            </h3>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#00FF87] bg-[#00FF87]/10 px-2 py-0.5 rounded border border-[#00FF87]/20">
              Live Index
            </span>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter @username or wallet 0x..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-4 pr-3 py-2.5 rounded-xl border border-[#00FF87]/20 bg-[#050B07]/80 text-white font-mono text-xs focus:outline-none focus:border-[#00FF87] focus:shadow-[0_0_15px_rgba(0,255,135,0.2)] transition"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#00FF87] hover:bg-[#34D399] text-[#050B07] font-display font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              {isLoading ? "Querying..." : "Lookup"}
            </button>
          </form>
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
