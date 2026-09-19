"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { HatchGuideModal } from "@/components/ui/HatchGuideModal";

export const FactoCTA: React.FC = () => {
  const [guideModalOpen, setGuideModalOpen] = useState(false);

  return (
    <>
      <section className="w-full py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="facto-dark-card p-10 sm:p-16 text-center relative overflow-hidden flex flex-col items-center">
          {/* Subtle Pink & Emerald Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-[#f243ac]/20 via-[#58e78f]/15 to-[#0053ff]/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#58e78f] mb-6 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Robinhood EVM Layer-2 Live Genesis</span>
          </div>

          <h2 className="font-display font-medium text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight max-w-3xl leading-[1.08] mb-6">
            Ready to bring your companion <br />
            to life on Robinhood Chain?
          </h2>

          <p className="text-white/70 text-base sm:text-lg max-w-xl font-sans leading-relaxed mb-10">
            Join thousands of rangers in Sherwood Forest. Hatch your autonomous pixel companion on 𝕏 in seconds with zero gas fees.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setGuideModalOpen(true)}
              className="v2-btn v2-btn-pink !min-h-[56px] !px-8 !text-base font-bold"
            >
              <span>Hatch on 𝕏 Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/docs"
              className="v2-btn v2-btn-light !min-h-[56px] !px-7 !text-base !bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
            >
              <span>Read Documentation</span>
            </Link>
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
