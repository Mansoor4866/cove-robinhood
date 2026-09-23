"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#f4f4f4] border-t border-[#0d0e11]/10 pt-16 pb-12 px-4 sm:px-6 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Col 1: Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/cove-icon-dark.jpg"
                alt="Cove"
                height={36}
                width={36}
                className="h-9 w-9 object-contain rounded-lg"
              />
            </div>
            <p className="text-sm text-[#0d0e11]/60 font-sans max-w-sm leading-relaxed mb-4">
              Autonomous AI companion protocol on Robinhood Chain L2. Hatch, train, and spar with sovereign on-chain creatures in natural language.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#0d0e11]/50">
              <span className="w-2 h-2 rounded-full bg-[#58e78f]"></span>
              <span>All Sequencers Operational</span>
            </div>
          </div>

          {/* Col 2: Protocol */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0d0e11]/40 mb-4">
              Protocol
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-[#0d0e11]/70">
              <li>
                <Link href="/" className="hover:text-[#0d0e11] transition">
                  Sanctuary
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-[#0d0e11] transition">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-[#0d0e11] transition">
                  Documentation
                </Link>
              </li>
              <li>
                <span className="text-[#0d0e11]/40">Bounty Rewards</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Ecosystem */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0d0e11]/40 mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-[#0d0e11]/70">
              <li>
                <a
                  href="https://x.com/CoveSherwood"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0d0e11] transition flex items-center gap-1"
                >
                  <span>𝕏 Timeline</span>
                  <ArrowUpRight className="w-3 h-3 text-[#0d0e11]/40" />
                </a>
              </li>
              <li>
                <span className="text-[#0d0e11]/40">Robinhood L2 Explorer</span>
              </li>
              <li>
                <span className="text-[#0d0e11]/40">Sherwood Guilds</span>
              </li>
              <li>
                <span className="text-[#0d0e11]/40">Brand Assets</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Network Status */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0d0e11]/40 mb-4">
              Network
            </h4>
            <div className="bg-white border border-[#0d0e11]/10 p-3.5 rounded-xl font-mono text-xs space-y-1.5 shadow-sm">
              <div className="flex justify-between text-[#0d0e11]/60">
                <span>Chain ID:</span>
                <span className="font-bold text-[#0d0e11]">EVM 42161</span>
              </div>
              <div className="flex justify-between text-[#0d0e11]/60">
                <span>Avg Block:</span>
                <span className="font-bold text-[#58e78f]">0.25s</span>
              </div>
              <div className="flex justify-between text-[#0d0e11]/60">
                <span>Gas Fee:</span>
                <span className="font-bold text-[#f243ac]">$0.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Facto Mega Wordmark */}
        <div className="select-none pointer-events-none py-6 border-t border-[#0d0e11]/10 text-center">
          <div className="font-display font-black text-[clamp(60px,14vw,180px)] text-[#0d0e11]/[0.06] tracking-tighter leading-none">
            COVE PROTOCOL
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 border-t border-[#0d0e11]/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#0d0e11]/50">
          <p>© 2026 Cove Protocol. Built on Robinhood EVM Layer-2.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#0d0e11] cursor-pointer">Privacy</span>
            <span className="hover:text-[#0d0e11] cursor-pointer">Terms</span>
            <span className="hover:text-[#0d0e11] cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
