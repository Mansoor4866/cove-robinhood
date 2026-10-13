"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Wallet,
  Check,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { authenticateWithWallet, formatAddress } from "@/lib/web3";

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (handle: string, wallet: string) => void;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<"x" | "wallet">("x");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedHandle = localStorage.getItem("cove_twitter_handle") || "";
      const savedWallet = localStorage.getItem("cove_wallet_address") || "";
      setTwitterHandle(savedHandle);
      setWalletAddress(savedWallet);
      if (savedHandle && savedWallet) {
        setIsSuccess(true);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConnectTwitter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!twitterHandle.trim()) return;

    setIsConnecting(true);
    setTimeout(() => {
      const cleanHandle = twitterHandle.replace(/^@/, "").trim();
      localStorage.setItem("cove_twitter_handle", cleanHandle);
      setIsConnecting(false);

      if (walletAddress) {
        setIsSuccess(true);
        if (onSuccess) onSuccess(cleanHandle, walletAddress);
      } else {
        setActiveTab("wallet");
      }
    }, 600);
  };

  const handleConnectWallet = async (walletId: string) => {
    setIsConnecting(true);
    try {
      const session = await authenticateWithWallet(walletId);
      setWalletAddress(session.address);

      if (twitterHandle) {
        setIsSuccess(true);
        if (onSuccess) onSuccess(twitterHandle, session.address);
      } else {
        setActiveTab("x");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to connect Solana wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem("cove_twitter_handle");
    localStorage.removeItem("cove_wallet_address");
    localStorage.removeItem("cove_wallet_signature");
    localStorage.removeItem("cove_wallet_name");
    localStorage.removeItem("cove_wallet_time");
    setTwitterHandle("");
    setWalletAddress("");
    setIsSuccess(false);
    setActiveTab("x");
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-black/10 rounded-3xl w-full max-w-[420px] p-6 shadow-2xl relative overflow-hidden text-black font-sans">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#CCFF00] p-1 flex items-center justify-center text-black font-bold">
              ⚡
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-black leading-none">
                {isSuccess ? "Identity Linked" : "Connect Identity"}
              </h3>
              <p className="font-mono text-[10px] text-black/50 mt-1">
                Solana Network · Non-Custodial
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-black/40 hover:text-black hover:bg-black/5 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {!isSuccess ? (
          <div className="py-5 space-y-5">
            <p className="text-xs text-black/60 leading-relaxed">
              Link your 𝕏 account to raise your AI companion in public, and connect your Solana Wallet for sovereign on-chain ownership.
            </p>

            {/* Navigation Tabs */}
            <div className="flex bg-[#FAFAF7] p-1 rounded-xl border border-black/5 font-mono text-xs">
              <button
                onClick={() => setActiveTab("x")}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "x"
                    ? "bg-black text-[#CCFF00] font-bold shadow-sm"
                    : "text-black/60 hover:text-black"
                }`}
              >
                <span>𝕏 (Twitter)</span>
                {twitterHandle && <Check className="w-3 h-3 text-[#CCFF00]" />}
              </button>
              <button
                onClick={() => setActiveTab("wallet")}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "wallet"
                    ? "bg-black text-[#CCFF00] font-bold shadow-sm"
                    : "text-black/60 hover:text-black"
                }`}
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>Solana Wallet</span>
                {walletAddress && <Check className="w-3 h-3 text-[#CCFF00]" />}
              </button>
            </div>

            {/* Tab 1: Connect 𝕏 (Twitter) */}
            {activeTab === "x" && (
              <form onSubmit={handleConnectTwitter} className="space-y-3">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-black/50 mb-1.5 font-bold">
                    Your 𝕏 (Twitter) Handle
                  </label>
                  <input
                    type="text"
                    placeholder="@your_username"
                    value={twitterHandle}
                    onChange={(e) => setTwitterHandle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-[#FAFAF7] font-mono text-xs focus:outline-none focus:border-[#4C6B00] text-black"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isConnecting || !twitterHandle.trim()}
                  className="w-full bg-[#CCFF00] hover:bg-[#DFFF3D] text-black font-semibold text-xs py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {isConnecting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Verifying on 𝕏...</span>
                    </>
                  ) : (
                    <>
                      <span>Link 𝕏 Handle</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Tab 2: Connect Wallet (Solana) */}
            {activeTab === "wallet" && (
              <div className="space-y-2.5">
                <button
                  onClick={() => handleConnectWallet("phantom")}
                  disabled={isConnecting}
                  className="w-full p-3 rounded-xl border border-black/10 bg-white hover:bg-emerald-50/50 hover:border-[#4C6B00]/40 transition flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl p-1.5 rounded-lg bg-[#FAFAF7] border border-black/5">
                      👻
                    </span>
                    <div className="text-left">
                      <div className="font-semibold text-xs text-black group-hover:text-[#4C6B00]">
                        Phantom
                      </div>
                      <div className="font-mono text-[10px] text-black/40">
                        Solana Native & Multi-Chain
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#4C6B00] bg-emerald-50 px-2 py-0.5 rounded border border-[#4C6B00]/20">
                    Recommended
                  </span>
                </button>

                <button
                  onClick={() => handleConnectWallet("solflare")}
                  disabled={isConnecting}
                  className="w-full p-3 rounded-xl border border-black/10 bg-white hover:bg-emerald-50/50 hover:border-[#4C6B00]/40 transition flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl p-1.5 rounded-lg bg-[#FAFAF7] border border-black/5">
                      ☀️
                    </span>
                    <div className="text-left">
                      <div className="font-semibold text-xs text-black group-hover:text-[#4C6B00]">
                        Solflare
                      </div>
                      <div className="font-mono text-[10px] text-black/40">
                        Native Solana Web3 Extension
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-black transition" />
                </button>

                <button
                  onClick={() => handleConnectWallet("backpack")}
                  disabled={isConnecting}
                  className="w-full p-3 rounded-xl border border-black/10 bg-white hover:bg-emerald-50/50 hover:border-[#4C6B00]/40 transition flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl p-1.5 rounded-lg bg-[#FAFAF7] border border-black/5">
                      🎒
                    </span>
                    <div className="text-left">
                      <div className="font-semibold text-xs text-black group-hover:text-[#4C6B00]">
                        Backpack
                      </div>
                      <div className="font-mono text-[10px] text-black/40">
                        xNFT & Solana High Performance
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-black transition" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Linked State Summary View */
          <div className="py-5 space-y-4">
            <div className="bg-emerald-50 border border-emerald-200/60 rounded-2xl p-4 text-center">
              <div className="w-10 h-10 rounded-full bg-[#CCFF00] text-black mx-auto flex items-center justify-center font-bold text-lg shadow-sm mb-2">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-base text-black">
                Account Successfully Linked!
              </h4>
              <p className="text-[11px] text-black/60 mt-1">
                Your 𝕏 identity is now mapped to Solana.
              </p>
            </div>

            <div className="bg-[#FAFAF7] rounded-xl p-3.5 border border-black/5 space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-black/50">𝕏 Handle:</span>
                <span className="font-bold text-[#4C6B00]">{twitterHandle}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black/50">Solana Address:</span>
                <span className="font-bold text-black">{formatAddress(walletAddress)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black/50">Network:</span>
                <span className="font-bold text-black flex items-center gap-1">
                  <span className="live-dot"></span> Solana Devnet / Mainnet
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={onClose}
                className="flex-1 bg-black hover:bg-neutral-800 text-white font-semibold text-xs py-3 rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <span>Continue to Dashboard</span>
                <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
              </button>
              <button
                onClick={handleDisconnect}
                className="px-3 py-3 border border-black/10 hover:bg-red-50 hover:text-red-600 rounded-xl text-xs font-mono transition"
                title="Disconnect Account"
              >
                Unlink
              </button>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="pt-3 border-t border-black/5 flex items-center justify-between text-[10px] font-mono text-black/40">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#4C6B00]" /> Non-custodial Web3
          </span>
          <span>Solana High TPS v1.0</span>
        </div>
      </div>
    </div>
  );
};
