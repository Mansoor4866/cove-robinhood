"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Wallet, ArrowRight, Shield } from "lucide-react";
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
      setWalletError("Please connect wallet first");
      setWalletModalOpen(true);
      setTimeout(() => setWalletError(""), 4000);
    } else {
      setGuideModalOpen(true);
    }
  };

  return (
    <>
      {/* Facto Floating Top Navigation */}
      <div className="sticky top-4 z-50 px-4 sm:px-6 w-full">
        <header className="v2-floating-nav h-[64px] px-4 sm:px-6 flex items-center justify-between">
          {/* Cove Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-9 w-auto">
              <Image
                src="/cove-logo-light.jpg"
                alt="Cove"
                height={36}
                width={120}
                className="h-9 w-auto object-contain"
                priority
              />
            </div>
            <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-wider bg-[#0d0e11]/5 px-2 py-0.5 rounded text-[#0d0e11]/60 font-semibold">
              Robinhood L2
            </span>
          </Link>

          {/* Facto Centered Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#0d0e11]/70">
            <Link
              href="/"
              className={`transition-colors hover:text-[#0d0e11] ${
                pathname === "/" ? "text-[#0d0e11] font-semibold" : ""
              }`}
            >
              Protocol
            </Link>
            <Link
              href="/leaderboard"
              className={`transition-colors hover:text-[#0d0e11] ${
                pathname.startsWith("/leaderboard") ? "text-[#0d0e11] font-semibold" : ""
              }`}
            >
              Leaderboard
            </Link>
            <Link
              href="/docs"
              className={`transition-colors hover:text-[#0d0e11] ${
                pathname.startsWith("/docs") ? "text-[#0d0e11] font-semibold" : ""
              }`}
            >
              Documentation
            </Link>
            <button
              onClick={handleHatchClick}
              className="hover:text-[#0d0e11] transition-colors"
            >
              𝕏 Evolution
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {walletAddress ? (
              <button
                onClick={() => setWalletModalOpen(true)}
                className="v2-btn v2-btn-light !min-h-[42px] !py-2 !px-4 !text-xs font-mono font-semibold"
              >
                <span className="w-2 h-2 rounded-full bg-[#58e78f] mr-1.5"></span>
                <span>{formatAddress(walletAddress)}</span>
              </button>
            ) : (
              <button
                onClick={() => setWalletModalOpen(true)}
                className="v2-btn v2-btn-light !min-h-[42px] !py-2 !px-4 !text-xs"
              >
                <Wallet className="w-3.5 h-3.5 mr-1.5" />
                <span>Connect</span>
              </button>
            )}

            <button
              onClick={handleHatchClick}
              className="v2-btn v2-btn-dark !min-h-[42px] !py-2 !px-5 !text-xs !rounded-lg"
            >
              <span>Hatch Pet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#0d0e11]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden mt-2 p-4 bg-white/95 backdrop-blur-xl border border-black/10 rounded-2xl shadow-xl space-y-3 font-medium text-sm text-[#0d0e11]">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block py-1.5 hover:text-[#f243ac]"
            >
              Protocol Overview
            </Link>
            <Link
              href="/leaderboard"
              onClick={() => setMobileOpen(false)}
              className="block py-1.5 hover:text-[#f243ac]"
            >
              Sherwood Leaderboard
            </Link>
            <Link
              href="/docs"
              onClick={() => setMobileOpen(false)}
              className="block py-1.5 hover:text-[#f243ac]"
            >
              Documentation
            </Link>
            <div className="pt-2 flex flex-col gap-2 border-t border-black/5">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setWalletModalOpen(true);
                }}
                className="v2-btn v2-btn-light !min-h-[44px] !w-full !text-xs font-mono"
              >
                {walletAddress ? formatAddress(walletAddress) : "Connect Wallet"}
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleHatchClick();
                }}
                className="v2-btn v2-btn-dark !min-h-[44px] !w-full !text-xs"
              >
                Hatch Companion →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Wallet Auth Modal */}
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
