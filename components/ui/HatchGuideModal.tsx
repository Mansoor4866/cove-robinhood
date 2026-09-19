"use client";

import React, { useState, useEffect } from "react";
import { X, Check, ArrowRight, RefreshCw, Wallet } from "lucide-react";
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
  const [twitterHandle, setTwitterHandle] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectSuccess, setConnectSuccess] = useState(false);
  const [activeConnectMode, setActiveConnectMode] = useState<"choose" | "x_input" | "wallet_select">("choose");

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setActiveConnectMode("choose");
      const savedHandle = localStorage.getItem("cove_user_handle") || "";
      const savedAddress = localStorage.getItem("cove_wallet_address") || "";
      setTwitterHandle(savedHandle);
      setWalletAddress(savedAddress);
      setConnectSuccess(Boolean(savedHandle || savedAddress));
    }
  }, [isOpen]);

  // Countdown timer simulation
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

  const handleSaveTwitter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!twitterHandle.trim()) return;
    const cleanHandle = twitterHandle.startsWith("@") ? twitterHandle : `@${twitterHandle}`;
    setIsConnecting(true);
    setTimeout(() => {
      localStorage.setItem("cove_user_handle", cleanHandle);
      setTwitterHandle(cleanHandle);
      setIsConnecting(false);
      setConnectSuccess(true);
      setActiveConnectMode("choose");
      if (onConnected) {
        onConnected({ handle: cleanHandle, address: walletAddress || "0x742d...44e" });
      }
    }, 600);
  };

  const handleConnectWallet = async (walletType: string) => {
    setIsConnecting(true);
    const walletId = walletType.toLowerCase().includes("robinhood")
      ? "robinhood"
      : walletType.toLowerCase().includes("meta")
      ? "metamask"
      : "walletconnect";

    try {
      const session = await authenticateWithWallet(walletId);
      setWalletAddress(session.address);
      const handle = twitterHandle || "@sherwood_hero";
      localStorage.setItem("cove_user_handle", handle);
      setTwitterHandle(handle);
      setConnectSuccess(true);
      setActiveConnectMode("choose");
      if (onConnected) {
        onConnected({ handle, address: session.address });
      }
    } catch (err) {
      console.error("Guide modal wallet sign error:", err);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans">
      {/* Fixed Dimension Modal Container */}
      <div className="bg-white border border-black/10 rounded-2xl w-full max-w-[440px] min-h-[430px] p-8 shadow-2xl relative text-center flex flex-col justify-between overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-black/30 hover:text-black transition z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dynamic Step Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Step 0: Welcome Slide */}
          {currentStep === 0 && (
            <div className="space-y-3 animate-fade-in">
              <div className="text-5xl select-none mb-2">🥚</div>
              <h3 className="font-display font-bold text-2xl text-black">
                Hey Cove! 👋
              </h3>
              <p className="text-black/60 text-sm max-w-xs mx-auto leading-relaxed">
                Wanna hatch some eggs to join the empire?<br />
                Take a little tour around X and let&apos;s start.
              </p>
            </div>
          )}

          {/* Step 1: Go to 𝕏 */}
          {currentStep === 1 && (
            <div className="space-y-3 animate-fade-in">
              <div className="text-5xl select-none mb-2">🐣</div>
              <h3 className="font-display font-bold text-2xl text-black">
                Step 1: Go to 𝕏
              </h3>
              <p className="text-black/60 text-sm max-w-xs mx-auto leading-relaxed">
                Click continue at the end of this guide to open our official Twitter profile{" "}
                <span className="font-bold text-[#4C6B00]">@Covepets</span>.
              </p>
            </div>
          )}

          {/* Step 2: Crack Your Egg */}
          {currentStep === 2 && (
            <div className="space-y-3 animate-fade-in">
              <div className="text-5xl select-none mb-2">⚡</div>
              <h3 className="font-display font-bold text-2xl text-black">
                Step 2: Crack Your Egg
              </h3>
              <p className="text-black/60 text-sm max-w-xs mx-auto leading-relaxed">
                Every time you tag{" "}
                <span className="font-bold text-[#4C6B00]">@Covepets</span> on X, your egg
                cracks and your Cove starts growing!
              </p>
            </div>
          )}

          {/* Step 3: Feed & Care */}
          {currentStep === 3 && (
            <div className="space-y-2 animate-fade-in">
              <div className="text-4xl select-none mb-1">🍎</div>
              <h3 className="font-display font-bold text-2xl text-black">
                Step 3: Feed & Care
              </h3>
              <p className="text-black/60 text-xs max-w-xs mx-auto leading-relaxed">
                Feed or train your Cove on X using natural language! Try replying with:
              </p>
              <div className="bg-[#FAFAF7] border border-black/10 rounded-xl py-1.5 px-3 font-mono text-xs text-black/80 max-w-xs mx-auto">
                &quot;Feed my pet a strawberry&quot;
              </div>
            </div>
          )}

          {/* Step 4: Claim Airdrop / Connect Wallet / Connect 𝕏 */}
          {currentStep === 4 && (
            <div className="space-y-3 animate-fade-in w-full">
              <div className="text-3xl select-none">🏆</div>
              <h3 className="font-display font-bold text-xl text-black">
                Step 4: Connect & Claim
              </h3>
              <p className="text-black/60 text-xs max-w-xs mx-auto leading-relaxed">
                Raise your pet to enter the Top 3 Leaderboard and claim your share of the{" "}
                <span className="font-bold text-[#4C6B00]">10,000 $COVE</span> reward pool!
              </p>
              <div className="font-mono text-[11px] text-[#4C6B00] font-bold">
                Time Remaining: {timeLeft}
              </div>

              {/* Mode: Default Choose (Connect 𝕏 or Connect Wallet) */}
              {activeConnectMode === "choose" && (
                <div className="space-y-2 pt-1 w-full max-w-xs mx-auto font-mono text-xs">
                  {connectSuccess && (
                    <div className="bg-emerald-50 border border-emerald-200 text-[#4C6B00] px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>Linked: {twitterHandle || walletAddress}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveConnectMode("x_input")}
                      className="bg-black hover:bg-neutral-800 text-white font-semibold py-2.5 px-2 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>𝕏 Connect</span>
                      {twitterHandle && <Check className="w-3 h-3 text-[#CCFF00]" />}
                    </button>

                    <button
                      onClick={() => setActiveConnectMode("wallet_select")}
                      className="bg-[#CCFF00] hover:bg-[#DFFF3D] text-black font-semibold py-2.5 px-2 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Wallet className="w-3.5 h-3.5" />
                      <span>Wallet</span>
                      {walletAddress && <Check className="w-3 h-3 text-black" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Mode: 𝕏 Handle Input Form */}
              {activeConnectMode === "x_input" && (
                <form onSubmit={handleSaveTwitter} className="space-y-2 max-w-xs mx-auto w-full pt-1">
                  <input
                    type="text"
                    placeholder="@your_username"
                    value={twitterHandle}
                    onChange={(e) => setTwitterHandle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-black/15 bg-[#FAFAF7] font-mono text-xs text-black focus:outline-none focus:border-[#4C6B00]"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveConnectMode("choose")}
                      className="w-1/3 py-2 border border-black/10 rounded-xl text-xs font-mono text-black/60 hover:text-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isConnecting || !twitterHandle.trim()}
                      className="flex-1 bg-black text-white font-semibold py-2 rounded-xl text-xs transition disabled:opacity-50"
                    >
                      {isConnecting ? "Linking..." : "Save 𝕏 Handle"}
                    </button>
                  </div>
                </form>
              )}

              {/* Mode: Wallet Select Modal */}
              {activeConnectMode === "wallet_select" && (
                <div className="space-y-1.5 max-w-xs mx-auto w-full pt-1 font-mono text-xs">
                  <button
                    onClick={() => handleConnectWallet("Robinhood Wallet")}
                    disabled={isConnecting}
                    className="w-full py-2 px-3 rounded-lg border border-black/10 bg-[#FAFAF7] hover:bg-emerald-50 text-left flex items-center justify-between text-black transition"
                  >
                    <span>🏹 Robinhood Wallet</span>
                    <span className="text-[9px] text-[#4C6B00] font-bold">Connect</span>
                  </button>

                  <button
                    onClick={() => handleConnectWallet("MetaMask")}
                    disabled={isConnecting}
                    className="w-full py-2 px-3 rounded-lg border border-black/10 bg-[#FAFAF7] hover:bg-emerald-50 text-left flex items-center justify-between text-black transition"
                  >
                    <span>🦊 MetaMask</span>
                    <span className="text-[9px] text-[#4C6B00] font-bold">Connect</span>
                  </button>

                  <button
                    onClick={() => setActiveConnectMode("choose")}
                    className="text-[10px] text-black/40 hover:text-black pt-1 block mx-auto underline"
                  >
                    Back to options
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Area with Navigation */}
        <div className="w-full space-y-4 pt-3 border-t border-black/5 mt-2">
          {/* Step Progress Dots & Navigation */}
          <div className="flex items-center justify-between font-mono text-xs text-black/60 px-1">
            <div className="w-16 text-left">
              {currentStep > 0 ? (
                <button
                  onClick={handleBack}
                  className="hover:text-black transition font-medium"
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
                      ? "bg-[#CCFF00] w-3.5"
                      : "bg-black/15 w-1.5"
                  }`}
                ></span>
              ))}
            </div>

            <div className="w-16 text-right">
              {currentStep < totalSteps - 1 ? (
                <button
                  onClick={handleNext}
                  className="hover:text-black font-semibold transition"
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
                className="bg-[#FAFAF7] hover:bg-black/5 text-black font-semibold text-xs py-3 rounded-xl transition"
              >
                Skip Guide
              </button>
              <button
                onClick={handleNext}
                className="bg-black hover:bg-neutral-800 text-white font-semibold text-xs py-3 rounded-xl transition"
              >
                Next Step
              </button>
            </div>
          ) : (
            <button
              onClick={onClose}
              className="w-full bg-[#CCFF00] hover:bg-[#DFFF3D] text-black font-bold text-xs py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
            >
              <span>{connectSuccess ? "Continue with Linked Account →" : "Continue to 𝕏 →"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
