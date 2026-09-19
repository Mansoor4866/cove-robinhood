"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Wallet } from "lucide-react";
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
      <header className="border-b border-black/10 bg-white/85 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0E1402] flex items-center justify-center text-[#CCFF00] font-bold text-xs shadow-sm">
              🏹
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-black">
              Cove<span className="text-[#4C6B00]">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-black/50">
            <Link
              href="/"
              className={`hover:text-black transition ${
                pathname === "/" ? "text-black" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/docs"
              className={`hover:text-black transition ${
                pathname.startsWith("/docs") ? "text-black" : ""
              }`}
            >
              Docs
            </Link>
            <button
              onClick={handleHatchClick}
              className="hover:text-black transition uppercase font-mono text-xs tracking-widest focus:outline-none"
            >
              𝕏
            </button>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3 relative">
            {/* Wallet Connect Button */}
            {walletAddress ? (
              <button
                onClick={() => setWalletModalOpen(true)}
                className="bg-black/5 hover:bg-black/10 border border-black/10 text-black font-mono text-xs px-3.5 py-2 rounded-full transition flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{formatAddress(walletAddress)}</span>
              </button>
            ) : (
              <button
                onClick={() => setWalletModalOpen(true)}
                className="bg-black hover:bg-neutral-800 text-white font-mono text-xs px-4 py-2 rounded-full transition flex items-center gap-1.5 shadow-sm"
              >
                <Wallet className="w-3.5 h-3.5 text-[#CCFF00]" />
                <span>Connect Wallet</span>
              </button>
            )}

            {/* Hatch Yours Button */}
            <div className="relative">
              <button
                onClick={handleHatchClick}
                className="bg-[#CCFF00] hover:bg-[#DFFF3D] hover:shadow-[0_0_24px_rgba(140,179,0,0.35)] text-black font-semibold text-xs px-5 py-2.5 rounded-full transition-all duration-200 focus:outline-none"
              >
                Hatch yours →
              </button>
              {walletError && (
                <div className="absolute right-0 top-11 whitespace-nowrap bg-red-50 border border-red-200 text-red-600 font-mono text-[10px] px-2.5 py-1 rounded-md shadow-lg animate-bounce z-50">
                  {walletError}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-black/70 hover:text-black"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-black/10 bg-white/95 backdrop-blur-xl px-6 py-6 space-y-4 font-mono text-xs uppercase tracking-widest">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-black/80 hover:text-black"
            >
              Home
            </Link>
            <Link
              href="/docs"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-black/80 hover:text-black"
            >
              Docs
            </Link>
            <button
              onClick={() => {
                setMobileOpen(false);
                setWalletModalOpen(true);
              }}
              className="w-full text-center bg-black text-white font-mono text-xs py-3 rounded-full"
            >
              {walletAddress ? `Wallet (${formatAddress(walletAddress)})` : "Connect Wallet"}
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                handleHatchClick();
              }}
              className="w-full text-center bg-[#CCFF00] hover:bg-[#DFFF3D] text-black font-semibold text-xs py-3 rounded-full mt-2"
            >
              Hatch yours →
            </button>
            {walletError && (
              <p className="text-red-600 text-center font-mono text-xs font-bold mt-2">
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
