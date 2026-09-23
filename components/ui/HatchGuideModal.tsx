"use client";

import React, { useState, useEffect } from "react";
import { X, Check, ArrowRight, Wallet, Sparkles } from "lucide-react";
import { authenticateWithWallet, formatAddress } from "@/lib/web3";

interface HatchGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnected?: (data: { handle: string; address: string }) => void;
}

export const HatchGuideModal: React.FC<HatchGuideModalProps> = ({
  isOpen,
  onClose,
  onConnected,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState("09:11:42");

  // Connect States for Step 4
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeConnectMode, setActiveConnectMode] = useState<"choose" | "wallet_select">("choose");

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setActiveConnectMode("choose");
      const savedAddress = localStorage.getItem("cove_wallet_address") || "";
      setWalletAddress(savedAddress);
    }
  }, [isOpen]);

  // Countdown timer simulation for Genesis Snapshot
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hours = String(9 - (now.getHours() % 10)).padStart(2, "0");
      const minutes = String(59 - now.getMinutes()).padStart(2, "0");
      const seconds = String(59 - now.getSeconds()).padStart(2, "0");
      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConnectWallet = async (walletType: string) => {
    setIsConnecting(true);
    const walletId = walletType.toLowerCase().includes("robinhood")
      ? "robinhood"
      : walletType.toLowerCase().includes("phantom")
      ? "phantom"
      : walletType.toLowerCase().includes("meta")
      ? "metamask"
      : "walletconnect";

    try {
      const session = await authenticateWithWallet(walletId);
      setWalletAddress(session.address);
      setActiveConnectMode("choose");
      if (onConnected) {
        onConnected({ handle: formatAddress(session.address), address: session.address });
      }
    } catch (err) {
      console.error("Guide modal wallet sign error:", err);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
      {/* Fixed Dimension Modal Container */}
      <div className="bg-[#0A140E] border border-[#00FF87]/30 rounded-3xl w-full max-w-[440px] min-h-[430px] p-8 shadow-[0_0_50px_rgba(0,255,135,0.15)] relative text-center flex flex-col justify-between overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-white/40 hover:text-white transition z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dynamic Step Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Step 0: Welcome Slide */}
          {currentStep === 0 && (
            <div className="space-y-3 animate-fade-in">
              <div className="text-5xl select-none mb-2 drop-shadow-[0_0_15px_#00FF87]">🥚</div>
              <h3 className="font-display font-extrabold text-2xl text-white">
                Welcome to Cove! 👋
              </h3>
              <p className="text-white/60 text-sm max-w-xs mx-auto leading-relaxed">
                Ready to hatch your sovereign AI companion on Robinhood Chain?<br />
                Take a quick tour and start your journey.
              </p>
            </div>
          )}

          {/* Step 1: Connect Wallet */}
          {currentStep === 1 && (
            <div className="space-y-3 animate-fade-in">
              <div className="text-5xl select-none mb-2 drop-shadow-[0_0_15px_#00FF87]">🏹</div>
              <h3 className="font-display font-extrabold text-2xl text-white">
                Step 1: Connect Your Wallet
              </h3>
              <p className="text-white/60 text-sm max-w-xs mx-auto leading-relaxed">
                Connect your Robinhood, Phantom, or MetaMask EVM wallet. Transactions are{" "}
                <span className="font-bold text-[#00FF87]">zero-gas</span> and settled instantly on Robinhood Layer-2.
              </p>
            </div>
          )}

          {/* Step 2: Crack & Hatch Your Egg */}
          {currentStep === 2 && (
            <div className="space-y-3 animate-fade-in">
              <div className="text-5xl select-none mb-2 drop-shadow-[0_0_15px_#00FF87]">⚡</div>
              <h3 className="font-display font-extrabold text-2xl text-white">
                Step 2: Crack Your Egg
              </h3>
              <p className="text-white/60 text-sm max-w-xs mx-auto leading-relaxed">
                Hatch your Mystic Egg to reveal 1 of 10 canonical Sherwood companions with distinct stats, combat roles, and on-chain DNA!
              </p>
            </div>
          )}

          {/* Step 3: Feed & Train */}
          {currentStep === 3 && (
            <div className="space-y-2.5 animate-fade-in">
              <div className="text-4xl select-none mb-1">🍓</div>
              <h3 className="font-display font-extrabold text-2xl text-white">
                Step 3: Feed & Spar in Sanctuary
              </h3>
              <p className="text-white/60 text-xs max-w-xs mx-auto leading-relaxed">
                Spend Food Tokens to gain EXP, pet your companion for Happiness, and enter tactical spars to climb the ranks!
              </p>
              <div className="bg-[#050B07] border border-[#00FF87]/30 rounded-xl py-2 px-3.5 font-mono text-xs text-[#00FF87] max-w-xs mx-auto">
                &quot;Daily logins grant +2 Food Tokens and restore Mana automatically.&quot;
              </div>
            </div>
          )}

          {/* Step 4: Compete & Claim */}
          {currentStep === 4 && (
            <div className="space-y-3 animate-fade-in w-full">
              <div className="text-3xl select-none">🏆</div>
              <h3 className="font-display font-extrabold text-xl text-white">
                Step 4: Compete & Earn $COVE
              </h3>
              <p className="text-white/60 text-xs max-w-xs mx-auto leading-relaxed">
                Level up your companion on the Sherwood Leaderboard to qualify for the{" "}
                <span className="font-bold text-[#00FF87]">$COVE Token Airdrop</span> & Whitelist tiers!
              </p>
              <div className="font-mono text-[11px] text-[#00FF87] font-bold">
                Snapshot Countdown: {timeLeft}
              </div>

              {/* Mode: Default Choose / Verified Status */}
              {activeConnectMode === "choose" && (
                <div className="space-y-2 pt-1 w-full max-w-xs mx-auto font-mono text-xs">
                  {walletAddress ? (
                    <div className="bg-[#00FF87]/15 border border-[#00FF87]/30 text-[#00FF87] px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 text-[#00FF87]" />
                      <span>Verified Trainer: {formatAddress(walletAddress)}</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveConnectMode("wallet_select")}
                      className="w-full btn-neon py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 font-mono text-xs font-bold shadow-md"
                    >
                      <Wallet className="w-4 h-4" />
                      <span>Connect Wallet Now</span>
                    </button>
                  )}
                </div>
              )}

              {/* Mode: Wallet Select Modal */}
              {activeConnectMode === "wallet_select" && (
                <div className="space-y-2 max-w-xs mx-auto w-full pt-1 font-mono text-xs">
                  <button
                    onClick={() => handleConnectWallet("Robinhood Wallet")}
                    disabled={isConnecting}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-white/10 bg-[#050B07] hover:border-[#00FF87]/40 text-left flex items-center justify-between text-white transition"
                  >
                    <span>🏹 Robinhood Wallet</span>
                    <span className="text-[10px] text-[#00FF87] font-bold">Connect</span>
                  </button>

                  <button
                    onClick={() => handleConnectWallet("Phantom")}
                    disabled={isConnecting}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-white/10 bg-[#050B07] hover:border-[#00FF87]/40 text-left flex items-center justify-between text-white transition"
                  >
                    <span>👻 Phantom</span>
                    <span className="text-[10px] text-[#00FF87] font-bold">Connect</span>
                  </button>

                  <button
                    onClick={() => handleConnectWallet("MetaMask")}
                    disabled={isConnecting}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-white/10 bg-[#050B07] hover:border-[#00FF87]/40 text-left flex items-center justify-between text-white transition"
                  >
                    <span>🦊 MetaMask</span>
                    <span className="text-[10px] text-[#00FF87] font-bold">Connect</span>
                  </button>

                  <button
                    onClick={() => setActiveConnectMode("choose")}
                    className="text-[10px] text-white/40 hover:text-white pt-1 block mx-auto underline"
                  >
                    Back to status
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Area with Navigation */}
        <div className="w-full space-y-4 pt-4 border-t border-white/5 mt-2">
          {/* Step Progress Dots */}
          <div className="flex items-center justify-between font-mono text-xs text-white/50 px-1">
            <div className="w-16 text-left">
              {currentStep > 0 ? (
                <button
                  onClick={handleBack}
                  className="hover:text-white transition font-medium"
                >
                  ← Back
                </button>
              ) : null}
            </div>

            {/* 5 Dots */}
            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3, 4].map((dot) => (
                <span
                  key={dot}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    dot === currentStep
                      ? "bg-[#00FF87] w-4 shadow-[0_0_8px_#00FF87]"
                      : "bg-white/15 w-1.5"
                  }`}
                ></span>
              ))}
            </div>

            <div className="w-16 text-right">
              {currentStep < totalSteps - 1 ? (
                <button
                  onClick={handleNext}
                  className="hover:text-white font-semibold transition"
                >
                  Next →
                </button>
              ) : null}
            </div>
          </div>

          {/* Bottom Action Buttons */}
          {currentStep < totalSteps - 1 ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onClose}
                className="btn-glass text-white/70 hover:text-white font-semibold text-xs py-3 rounded-xl transition"
              >
                Skip Guide
              </button>
              <button
                onClick={handleNext}
                className="btn-neon font-display font-bold text-xs py-3 rounded-xl transition"
              >
                Next Step
              </button>
            </div>
          ) : (
            <button
              onClick={onClose}
              className="w-full btn-neon font-display font-bold text-xs py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,255,135,0.4)]"
            >
              <span>Continue to Sanctuary →</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
