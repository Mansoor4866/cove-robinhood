"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, Play, Zap, Shield, Sparkles } from "lucide-react";
import { sounds } from "@/lib/audio";

export const FactoApiSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [responseLog, setResponseLog] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const sampleSnippet = `// 1. Initialize Cove SDK on Robinhood Chain L2
import { CoveProtocol } from "@cove/sdk";

const cove = new CoveProtocol({
  network: "robinhood-l2",
  rpc: "https://rpc.robinhood-chain.internal",
  gasless: true
});

// 2. Fetch or evolve companion state
const companion = await cove.companion.get("@sherwood_ranger");
console.log(companion.level, companion.mana);`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleSnippet);
    setCopied(true);
    sounds.playBlip();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    sounds.playBlip();
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setResponseLog(JSON.stringify({
        status: "200_OK",
        companion: "Robin Fox #001",
        level: 4,
        mana: "95/100",
        blockNumber: 19482103,
        network: "Robinhood EVM Layer-2",
        zeroGasVerified: true
      }, null, 2));
      sounds.playHatchFanfare();
    }, 600);
  };

  return (
    <section className="w-full py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="facto-dark-card p-8 sm:p-12 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f243ac]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left: Info */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-mono text-[#58e78f] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#58e78f] animate-pulse"></span>
              <span>REST & WebSocket Engine</span>
            </div>

            <h2 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight mb-4">
              Integrate Cove <br />
              with one line of code.
            </h2>

            <p className="text-white/70 text-base font-sans leading-relaxed mb-8">
              Full programmatic access to companion vitals, inventory items, and battle logs. Built for bot developers, Discord guilds, and Web3 game studios.
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="v2-btn v2-btn-mint !min-h-[46px] !px-6 !text-xs font-mono uppercase font-bold"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? "Executing..." : "Execute Test API"}</span>
              </button>

              <button
                onClick={handleCopy}
                className="v2-btn v2-btn-light !min-h-[46px] !px-5 !text-xs !bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#58e78f]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy SDK"}</span>
              </button>
            </div>
          </div>

          {/* Right: Code Terminal */}
          <div className="lg:col-span-7 bg-black/60 border border-white/10 rounded-2xl p-5 sm:p-6 font-mono text-xs shadow-2xl relative">
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                <span className="text-white/40 text-[11px] ml-2">cove-sdk.ts</span>
              </div>
              <span className="text-[#58e78f] text-[11px] font-semibold">● 200 OK</span>
            </div>

            {/* Code Body */}
            <pre className="text-white/80 overflow-x-auto text-xs leading-relaxed py-2 font-mono">
              <code>{sampleSnippet}</code>
            </pre>

            {/* Live Response Box if executed */}
            {responseLog && (
              <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in">
                <div className="text-[#58e78f] text-[10px] uppercase font-bold mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#58e78f]"></span>
                  <span>Execution Output:</span>
                </div>
                <pre className="bg-white/5 p-3 rounded-xl text-[#58e78f] text-[11px] overflow-x-auto border border-[#58e78f]/20">
                  {responseLog}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
