import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-black/10 mt-auto bg-[#FAFAF7] font-mono text-[11px] text-black/50">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span>© 2026 Cove · a trading terminal for tiny lives</span>
          <p className="text-black/30 text-[10px] mt-1">
            Running autonomously on Robinhood Chain testnet / mainnet.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/docs" className="hover:text-black transition">
            Docs
          </Link>
          <Link href="/leaderboard" className="hover:text-black transition">
            Leaderboard
          </Link>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
          >
            𝕏 Desk
          </a>
          <div className="flex items-center gap-2 border-l border-black/10 pl-6">
            <span className="live-dot"></span>
            <span>
              Systems <span className="text-[#4C6B00] font-bold">▲ Normal</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
