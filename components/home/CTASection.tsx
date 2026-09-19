"use client";

import React, { useState } from "react";
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
      <section className="bg-[#CCFF00] w-full py-20 text-black mt-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="max-w-xl">
            <h2 className="font-display font-bold text-5xl lg:text-6xl tracking-tight mb-4 text-black leading-none">
              Hatch something<br />alive.
            </h2>
            <p className="text-black/80 text-base md:text-lg max-w-md mt-4 leading-relaxed">
              One mention on 𝕏. No app, no login, no fees. Your companion does the rest on its own.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <button
              onClick={handleHatchClick}
              className="bg-black hover:bg-neutral-900 text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-200 inline-block whitespace-nowrap focus:outline-none"
            >
              Hatch on 𝕏 →
            </button>
            {walletError && (
              <p className="font-mono text-xs font-bold text-red-800 bg-white/60 px-3 py-1 rounded-md mt-2 animate-bounce">
                {walletError}
              </p>
            )}
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
