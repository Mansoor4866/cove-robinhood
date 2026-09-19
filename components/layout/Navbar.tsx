"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Wallet, Sparkles, Shield, Compass, BookOpen, MessageSquare } from "lucide-react";
import { HatchGuideModal } from "@/components/ui/HatchGuideModal";
import { WalletAuthModal } from "@/components/ui/WalletAuthModal";
import { formatAddress } from "@/lib/web3";

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletError, setWalletError] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const checkWallet = () => {
      const saved = localStorage.getItem("cove_wallet_address");
      setWalletAddress(saved);
    };
    checkWallet();
    window.addEventListener("storage", checkWallet);
    window.addEventListener("cove_auth_changed", checkWallet);
    return () => {
      window.removeEventListener("storage", checkWallet);
      window.removeEventListener("cove_auth_changed", checkWallet);
    };
  }, []);

  const handleHatchClick = () => {
    const current = localStorage.getItem("cove_wallet_address");
    if (!current) {
      setWalletError("⚠️ Please connect your wallet first!");
      setWalletModalOpen(true);
      setTimeout(() => setWalletError(""), 4000);
    } else {
      setGuideModalOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#00FF87]/10 bg-[#050B07]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Futuristic Luminous Brand Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF87] to-[#059669] p-0.5 shadow-[0_0_20px_rgba(0,255,135,0.25)] group-hover:shadow-[0_0_30px_rgba(0,255,135,0.45)] transition-all">
              <div className="w-full h-full bg-[#050B07] rounded-[10px] flex items-center justify-center text-base">
                🏹
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
                COVE<span className="text-[#00FF87]">.</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#00FF87]/70 -mt-1 font-bold">
                Robinhood L2
              </span>
            </div>
          </Link>

          {/* Desktop Cyber Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0A140E]/80 border border-[#00FF87]/15 rounded-full p-1.5 shadow-inner">
            <Link
              href="/"
              className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition ${
                pathname === "/"
                  ? "bg-[#00FF87]/15 text-[#00FF87] font-semibold border border-[#00FF87]/30"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Sanctuary
            </Link>
            <Link
              href="/docs"
              className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition ${
                pathname.startsWith("/docs")
                  ? "bg-[#00FF87]/15 text-[#00FF87] font-semibold border border-[#00FF87]/30"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Docs & Lore
            </Link>
            <button
              onClick={handleHatchClick}
              className="px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider text-white/60 hover:text-white hover:bg-white/5 transition flex items-center gap-1.5"
            >
              <span>𝕏 Timeline</span>
            </button>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3.5 relative">
            {/* Wallet Connect Button */}
            {walletAddress ? (
              <button
                onClick={() => setWalletModalOpen(true)}
                className="bg-[#0A140E] hover:bg-[#0E1B13] border border-[#00FF87]/30 text-[#ECFDF5] font-mono text-xs px-4 py-2 rounded-full transition flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,135,0.1)]"
              >
                <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse"></span>
                <span>{formatAddress(walletAddress)}</span>
              </button>
            ) : (
              <button
                onClick={() => setWalletModalOpen(true)}
                className="btn-glass font-mono text-xs px-4 py-2.5 rounded-full flex items-center gap-2"
              >
                <Wallet className="w-3.5 h-3.5 text-[#00FF87]" />
                <span>Connect Wallet</span>
              </button>
            )}

            {/* Hatch Yours Neon CTA */}
            <div className="relative">
              <button
                onClick={handleHatchClick}
                className="btn-neon font-display text-xs tracking-wide px-5 py-2.5 rounded-full flex items-center gap-1.5 uppercase font-bold"
              >
                <span>Hatch Companion</span>
                <span>→</span>
              </button>
              {walletError && (
                <div className="absolute right-0 top-12 whitespace-nowrap bg-red-950/90 border border-red-500/50 text-red-300 font-mono text-[10px] px-3 py-1.5 rounded-lg shadow-xl animate-bounce z-50">
                  {walletError}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6 text-[#00FF87]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#00FF87]/15 bg-[#050B07]/95 backdrop-blur-2xl px-6 py-6 space-y-4 font-mono text-xs uppercase tracking-widest">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-white/80 hover:text-[#00FF87]"
            >
              Sanctuary
            </Link>
            <Link
              href="/docs"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-white/80 hover:text-[#00FF87]"
            >
              Docs & Lore
            </Link>
            <button
              onClick={() => {
                setMobileOpen(false);
                setWalletModalOpen(true);
              }}
              className="w-full text-center btn-glass font-mono text-xs py-3 rounded-xl"
            >
              {walletAddress ? `Connected (${formatAddress(walletAddress)})` : "Connect Wallet"}
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                handleHatchClick();
              }}
              className="w-full text-center btn-neon font-display text-xs py-3 rounded-xl mt-2 font-bold uppercase"
            >
              Hatch Companion →
            </button>
            {walletError && (
              <p className="text-red-400 text-center font-mono text-xs font-bold mt-2">
                {walletError}
              </p>
            )}
          </div>
        )}
      </header>

      {/* Modern Web3 Detection & Sign-In Modal */}
      <WalletAuthModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        onHatchRedirect={() => setGuideModalOpen(true)}
      />

      {/* 5-Step Hatching Guide Modal */}
      <HatchGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
      />
    </>
  );
};
