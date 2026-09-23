"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  Wallet,
  Check,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Copy,
  LogOut,
  Sparkles,
  AlertCircle
} from "lucide-react";
import {
  getAvailableWallets,
  authenticateWithWallet,
  disconnectWallet,
  formatAddress,
  DetectedWallet,
  AuthSession
} from "@/lib/web3";

interface WalletAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onHatchRedirect?: () => void;
}

export const WalletAuthModal: React.FC<WalletAuthModalProps> = ({
  isOpen,
  onClose,
  onHatchRedirect,
}) => {
  const [wallets, setWallets] = useState<DetectedWallet[]>([]);
  const [activeAddress, setActiveAddress] = useState<string | null>(null);
  const [activeWalletName, setActiveWalletName] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingWalletId, setConnectingWalletId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [hasHatched, setHasHatched] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWallets(getAvailableWallets());
      const savedAddr = localStorage.getItem("cove_wallet_address");
      const savedName = localStorage.getItem("cove_wallet_name") || "Robinhood Wallet";
      setActiveAddress(savedAddr);
      setActiveWalletName(savedName);
      setHasHatched(localStorage.getItem("cove_has_hatched") === "true");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConnect = async (wallet: DetectedWallet) => {
    setErrorMessage("");
    setIsConnecting(true);
    setConnectingWalletId(wallet.id);
    setStatusMessage(`Connecting to ${wallet.name}...`);

    try {
      const session = await authenticateWithWallet(wallet.id, (msg) => {
        setStatusMessage(msg);
      });

      setActiveAddress(session.address);
      setActiveWalletName(session.walletName);
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
    } catch (err: any) {
      console.error("Wallet auth error:", err);
      setErrorMessage(err.message || "Failed to authenticate wallet.");
    } finally {
      setIsConnecting(false);
      setConnectingWalletId(null);
      setStatusMessage("");
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setActiveAddress(null);
    setActiveWalletName("");
    setErrorMessage("");
  };

  const handleCopy = () => {
    if (activeAddress) {
      navigator.clipboard.writeText(activeAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="bg-[#0A140E] border border-[#00FF87]/30 rounded-3xl w-full max-w-[420px] p-6 shadow-[0_0_50px_rgba(0,255,135,0.15)] relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#00FF87]/15">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00FF87] to-[#059669] p-0.5 shadow-sm">
              <div className="w-full h-full bg-[#050B07] rounded-[10px] flex items-center justify-center text-sm font-bold text-[#00FF87]">
                🏹
              </div>
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white leading-none">
                {activeAddress ? "Connected Sanctuary Account" : "Connect & Authenticate"}
              </h3>
              <p className="font-mono text-[10px] text-[#00FF87]/70 mt-1">
                Robinhood Chain · Non-Custodial EVM
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-950/80 border border-red-500/50 rounded-xl flex items-start gap-2 text-red-300 text-xs font-mono">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1 leading-tight">{errorMessage}</div>
          </div>
        )}

        {/* Connected State View */}
        {activeAddress ? (
          <div className="py-5 space-y-4">
            {showSuccessToast && (
              <div className="bg-[#00FF87]/15 border border-[#00FF87]/30 text-[#00FF87] text-xs p-3 rounded-xl flex items-center gap-2 font-mono animate-fade-in">
                <Check className="w-4 h-4 text-[#00FF87] shrink-0" />
                <span>Successfully authenticated with {activeWalletName}!</span>
              </div>
            )}

            {/* Account Details Box */}
            <div className="bg-[#050B07]/80 border border-[#00FF87]/20 rounded-2xl p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white/50 text-[11px]">Provider:</span>
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse"></span>
                  {activeWalletName || "Robinhood Wallet"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/50 text-[11px]">Address:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#00FF87]">{formatAddress(activeAddress)}</span>
                  <button
                    onClick={handleCopy}
                    className="p-1 hover:bg-white/10 rounded text-white/50 hover:text-white transition"
                    title="Copy address"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#00FF87]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/50 text-[11px]">Network:</span>
                <span className="font-bold text-white flex items-center gap-1">
                  <span className="beacon-dot"></span> Robinhood L2
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/50 text-[11px]">Signature:</span>
                <span className="text-[10px] bg-[#00FF87]/15 text-[#00FF87] font-bold px-2 py-0.5 rounded border border-[#00FF87]/30">
                  SIWE Cryptographic
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              {hasHatched ? (
                <Link
                  href="/"
                  onClick={onClose}
                  className="w-full bg-[#00FF87] hover:bg-[#00FF87]/90 active:scale-95 text-[#0d0e11] font-display font-bold text-xs py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,255,135,0.4)]"
                >
                  <span>Visit Sanctuary & Companion →</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#0d0e11]" />
                </Link>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    if (onHatchRedirect) onHatchRedirect();
                  }}
                  className="w-full bg-[#00FF87] hover:bg-[#00FF87]/90 active:scale-95 text-[#0d0e11] font-display font-bold text-xs py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,255,135,0.4)]"
                >
                  <span>Hatch Companion →</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#0d0e11]" />
                </button>
              )}

              <button
                onClick={handleDisconnect}
                className="w-full bg-transparent hover:bg-red-950/40 text-white/50 hover:text-red-400 border border-white/10 hover:border-red-500/30 font-mono text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Disconnect Wallet</span>
              </button>
            </div>
          </div>
        ) : (
          /* Connect Options List */
          <div className="py-4 space-y-3.5">
            <p className="text-xs text-white/60 leading-relaxed font-sans">
              Choose your wallet to detect and sign the authentication request for **Robinhood Chain**.
            </p>

            {/* Loading Indicator */}
            {isConnecting && (
              <div className="bg-[#00FF87]/10 border border-[#00FF87]/30 rounded-xl p-3.5 text-center space-y-1.5 animate-pulse font-mono text-xs">
                <div className="flex items-center justify-center gap-2 text-[#00FF87] font-bold">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Awaiting Wallet Approval</span>
                </div>
                <p className="text-[11px] text-white/80 font-semibold">{statusMessage}</p>
                <p className="text-[10px] text-white/45">
                  Please approve the connection & signature prompt in your wallet extension.
                </p>
              </div>
            )}

            {/* Wallets */}
            <div className="space-y-2 font-mono text-xs">
              {wallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className={`p-3 rounded-2xl border transition flex items-center justify-between ${
                    wallet.isInstalled
                      ? "border-[#00FF87]/40 bg-[#00FF87]/5 hover:bg-[#00FF87]/10"
                      : "border-white/5 bg-[#050B07]/60 hover:bg-white/5 hover:border-white/10"
                  }`}
                >
                  <button
                    onClick={() => handleConnect(wallet)}
                    disabled={isConnecting}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    <span className="text-2xl p-1.5 rounded-xl bg-[#050B07] border border-white/10">
                      {wallet.icon}
                    </span>
                    <div>
                      <div className="font-semibold text-xs text-white flex items-center gap-1.5">
                        <span>{wallet.name}</span>
                        {wallet.isInstalled ? (
                          <span className="text-[9px] bg-[#00FF87]/20 text-[#00FF87] font-bold px-1.5 py-0.2 rounded border border-[#00FF87]/30">
                            Detected
                          </span>
                        ) : (
                          <span className="text-[9px] text-white/30 font-normal">
                            Not Installed
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-white/45 font-sans leading-tight mt-0.5">
                        {wallet.description}
                      </div>
                    </div>
                  </button>

                  <div className="flex items-center gap-2">
                    {!wallet.isInstalled && wallet.downloadUrl && (
                      <a
                        href={wallet.downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-white/40 hover:text-[#00FF87] hover:underline flex items-center gap-0.5"
                        title="Get extension"
                      >
                        <span>Get</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                    <button
                      onClick={() => handleConnect(wallet)}
                      disabled={isConnecting}
                      className="p-1 text-white/30 hover:text-[#00FF87] transition"
                    >
                      {connectingWalletId === wallet.id ? (
                        <RefreshCw className="w-4 h-4 animate-spin text-[#00FF87]" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#00FF87]" /> SIWE Cryptographic Auth
          </span>
          <span>Zero Gas Fees</span>
        </div>
      </div>
    </div>
  );
};
