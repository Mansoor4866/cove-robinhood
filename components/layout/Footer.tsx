import React from "react";
import Link from "next/link";
import { ShieldCheck, Terminal, Compass, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#00FF87]/15 bg-[#030704] py-14 text-white/60 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/5">
          {/* Brand Logo & Info */}
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00FF87] to-[#059669] p-0.5">
              <div className="w-full h-full bg-[#050B07] rounded-[10px] flex items-center justify-center text-xs font-bold text-[#00FF87]">
                🏹
              </div>
            </div>
            <div>
              <span className="font-display font-bold text-white text-base tracking-tight">
                COVE<span className="text-[#00FF87]">.</span>
              </span>
              <p className="text-[11px] text-white/40">The Autonomous Pet Protocol on Robinhood Chain</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-wider">
            <Link href="/" className="hover:text-[#00FF87] transition">
              Sanctuary
            </Link>
            <Link href="/docs" className="hover:text-[#00FF87] transition">
              Documentation
            </Link>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#00FF87] transition flex items-center gap-1"
            >
              <span>𝕏 Timeline</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[11px] text-white/40">
          <p>© 2026 Cove Protocol · Sherwood Autonomous Life Engine</p>
          <div className="flex items-center gap-2 text-[#00FF87]">
            <span className="beacon-dot"></span>
            <span>Robinhood EVM L2 Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
