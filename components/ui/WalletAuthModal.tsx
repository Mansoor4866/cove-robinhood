"use client";

import React, { useState, useEffect } from "react";
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

  // Detect installed wallets strictly on open
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWallets(getAvailableWallets());
      const savedAddr = localStorage.getItem("cove_wallet_address");
      const savedName = localStorage.getItem("cove_wallet_name") || "Robinhood Wallet";
      setActiveAddress(savedAddr);
      setActiveWalletName(savedName);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-white border border-black/10 rounded-3xl w-full max-w-[420px] p-6 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0E1402] flex items-center justify-center text-[#CCFF00] font-bold text-sm shadow-sm">
              🏹
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-black leading-none">
                {activeAddress ? "Connected Account" : "Connect & Sign In"}
              </h3>
              <p className="font-mono text-[10px] text-black/40 mt-1">
                Robinhood Chain · Non-Custodial EVM
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-black/40 hover:text-black hover:bg-black/5 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200/80 rounded-xl flex items-start gap-2 text-red-700 text-xs font-mono">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1 leading-tight">{errorMessage}</div>
          </div>
        )}

        {/* Connected State View */}
        {activeAddress ? (
          <div className="py-5 space-y-4">
            {showSuccessToast && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl flex items-center gap-2 font-mono animate-fade-in">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Successfully signed in with {activeWalletName}!</span>
              </div>
            )}

            {/* Account Card */}
            <div className="bg-[#FAFAF7] border border-black/10 rounded-2xl p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-black/50 text-[11px]">Wallet Provider:</span>
                <span className="font-bold text-black flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {activeWalletName || "Robinhood Wallet"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-black/50 text-[11px]">Address:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-black">{formatAddress(activeAddress)}</span>
                  <button
                    onClick={handleCopy}
                    className="p-1 hover:bg-black/5 rounded text-black/50 hover:text-black transition"
                    title="Copy full address"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-black/50 text-[11px]">Network:</span>
                <span className="font-bold text-[#4C6B00] flex items-center gap-1">
                  <span className="live-dot"></span> Robinhood Chain
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-black/50 text-[11px]">Status:</span>
                <span className="text-[10px] bg-emerald-100/80 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  Authenticated & Signed
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  onClose();
                  if (onHatchRedirect) onHatchRedirect();
                }}
                className="w-full bg-[#CCFF00] hover:bg-[#DFFF3D] hover:shadow-[0_0_20px_rgba(140,179,0,0.35)] text-black font-bold text-xs py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Hatch Companion on 𝕏 →</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleDisconnect}
                className="w-full bg-transparent hover:bg-red-50 text-black/60 hover:text-red-600 border border-black/10 hover:border-red-200 font-mono text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Disconnect Wallet</span>
              </button>
            </div>
          </div>
        ) : (
          /* Connect / Sign-in View */
          <div className="py-4 space-y-3.5">
            <p className="text-xs text-black/60 leading-relaxed font-sans">
              Choose your wallet to detect and sign the authentication request for **Robinhood Chain**.
            </p>

            {/* Loading / Signing status indicator */}
            {isConnecting && (
              <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3.5 text-center space-y-1.5 animate-pulse font-mono text-xs">
                <div className="flex items-center justify-center gap-2 text-[#4C6B00] font-bold">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Wallet Interaction in Progress</span>
                </div>
                <p className="text-[11px] text-black/70 font-semibold">{statusMessage}</p>
                <p className="text-[10px] text-black/45">
                  Please approve the connection & signature prompt in your wallet extension.
                </p>
              </div>
            )}

            {/* Wallet Options List */}
            <div className="space-y-2 font-mono text-xs">
              {wallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className={`p-3 rounded-2xl border transition flex items-center justify-between ${
                    wallet.isInstalled
                      ? "border-emerald-300/80 bg-emerald-50/40 hover:bg-emerald-50/70"
                      : "border-black/10 bg-[#FAFAF7] hover:bg-white hover:border-black/20"
                  }`}
                >
                  <button
                    onClick={() => handleConnect(wallet)}
                    disabled={isConnecting}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    <span className="text-2xl p-1.5 rounded-xl bg-white border border-black/5 shadow-2xs">
                      {wallet.icon}
                    </span>
                    <div>
                      <div className="font-semibold text-xs text-black flex items-center gap-1.5">
                        <span>{wallet.name}</span>
                        {wallet.isInstalled ? (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded border border-emerald-200">
                            Detected
                          </span>
                        ) : (
                          <span className="text-[9px] text-black/35 font-normal">
                            Not Detected
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-black/45 font-sans leading-tight mt-0.5">
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
                        className="text-[10px] text-black/40 hover:text-black hover:underline flex items-center gap-0.5"
                        title="Get extension"
                      >
                        <span>Get</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                    <button
                      onClick={() => handleConnect(wallet)}
                      disabled={isConnecting}
                      className="p-1 text-black/30 hover:text-[#4C6B00] transition"
                    >
                      {connectingWalletId === wallet.id ? (
                        <RefreshCw className="w-4 h-4 animate-spin text-[#4C6B00]" />
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
        <div className="pt-3 border-t border-black/5 flex items-center justify-between text-[10px] font-mono text-black/40">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#4C6B00]" /> Sign-In With Ethereum (SIWE)
          </span>
          <span>Zero Gas Fees</span>
        </div>
      </div>
    </div>
  );
};
