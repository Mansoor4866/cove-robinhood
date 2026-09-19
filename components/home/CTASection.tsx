"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { HatchGuideModal } from "@/components/ui/HatchGuideModal";

export const CTASection: React.FC = () => {
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [walletError, setWalletError] = useState("");

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
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="relative rounded-3xl p-10 lg:p-16 overflow-hidden bg-gradient-to-br from-[#0A140E] via-[#0E1B13] to-[#050B07] border border-[#00FF87]/30 shadow-[0_0_50px_rgba(0,255,135,0.15)] flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Ambient Glowing Portal in Background */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00FF87]/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-xl relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00FF87] mb-4 bg-[#00FF87]/10 px-3 py-1 rounded-full border border-[#00FF87]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free Genesis Hatching Active</span>
            </div>

            <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-4">
              Hatch Your Sovereign<br />
              <span className="text-gradient-mint">Companion in Sherwood.</span>
            </h2>

            <p className="text-[#8E9E94] text-base leading-relaxed font-sans font-light">
              One tweet on 𝕏 to begin. Zero gas fees on Robinhood Chain. Your companion lives, learns, and battles autonomously.
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-center md:items-end">
            <button
              onClick={handleHatchClick}
              className="btn-neon font-display font-bold text-sm px-9 py-4 rounded-full flex items-center gap-2 tracking-wide uppercase shadow-[0_0_30px_rgba(0,255,135,0.4)] whitespace-nowrap"
            >
              <span>Begin Hatching on 𝕏</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {walletError && (
              <p className="font-mono text-xs font-bold text-red-300 bg-red-950/90 border border-red-500/50 px-3 py-1.5 rounded-lg mt-3 animate-bounce">
                {walletError}
              </p>
            )}

            <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/40 mt-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00FF87]" />
              <span>Self-custody · 100% Non-Custodial EVM</span>
            </div>
          </div>
        </div>
      </section>

      <HatchGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
      />
    </>
  );
};
