"use client";

import React, { useState } from "react";
import { Terminal as TerminalIcon, Sparkles, Send, Play } from "lucide-react";

export const TerminalLog: React.FC = () => {
  const [activeCommand, setActiveCommand] = useState<string>("/feed wild_berries");
  const [logs, setLogs] = useState<Array<{ sender: string; text: string; time: string; isAI?: boolean }>>([
    {
      sender: "@sherwood_hero",
      text: "@Covepets /hatch egg genesis_ranger",
      time: "14:22:01",
    },
    {
      sender: "Cove Guardian AI",
      text: "✨ Egg cracked! Robin Fox (#001) has materialized in Sherwood Keep. Ready for training.",
      time: "14:22:02",
      isAI: true,
    },
    {
      sender: "@sherwood_hero",
      text: "@Covepets feed Robin Fox delicious honey berries",
      time: "14:22:15",
    },
    {
      sender: "Robin Fox (Pet)",
      text: "🦊 *munch munch* Savoring honey berries! Paws glowing softly. (+15 EXP, Morale: 100%)",
      time: "14:22:16",
      isAI: true,
    },
  ]);

  const handleRunCommand = (cmd: string) => {
    const time = new Date().toLocaleTimeString();
    let responseText = "";

    if (cmd.includes("feed")) {
      responseText = "🦊 *crunch crunch* Robin Fox catches the wild berry mid-air! Energy refilled (+20 EXP).";
    } else if (cmd.includes("explore")) {
      responseText = "🌲 Robin Fox scouted Willow Glen and discovered an Ancient Golden Acorn (+50 EXP)!";
    } else if (cmd.includes("status")) {
      responseText = "📊 Status: Robin Fox (Level 1 Ranger) · Health 100/100 · Happiness 100% · Status: READY";
    } else {
      responseText = `⚡ Command '${cmd}' verified on Robinhood EVM block #849129.`;
    }

    setLogs((prev) => [
      ...prev,
      { sender: "@you", text: `@Covepets ${cmd}`, time },
      { sender: "Cove Autonomous Engine", text: responseText, time, isAI: true },
    ]);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00FF87] mb-3">
            <TerminalIcon className="w-4 h-4" />
            <span>002 · TIMELINE LOG & INTERACTIVE CLI</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Play with the Autonomous<br />
            <span className="text-gradient-mint">AI Execution Engine.</span>
          </h2>
        </div>
        <p className="text-[#8E9E94] text-sm md:text-base max-w-md font-sans leading-relaxed">
          Test real-time timeline simulation commands. Your companion processes natural language instructions autonomously.
        </p>
      </div>

      {/* Cyber Terminal Window */}
      <div className="glass-panel border border-[#00FF87]/25 rounded-3xl overflow-hidden shadow-2xl">
        {/* macOS / Cyber Window Header */}
        <div className="bg-[#030704] px-5 py-3.5 border-b border-[#00FF87]/15 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-[#00FF87]/80"></div>
            <span className="text-white/40 ml-3 text-[11px]">cove-timeline-stream.log</span>
          </div>
          <div className="text-[#00FF87] text-[10px] flex items-center gap-1.5 font-bold">
            <span className="beacon-dot"></span>
            <span>ROBINHOOD EVM L2 STREAM</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 font-mono text-xs space-y-4 max-h-[380px] overflow-y-auto bg-[#050B07]/90">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border ${
                log.isAI
                  ? "bg-[#00FF87]/5 border-[#00FF87]/20 text-[#ECFDF5]"
                  : "bg-white/5 border-white/10 text-white/80"
              }`}
            >
              <div className="flex justify-between items-center mb-1 text-[10px] opacity-60">
                <span className={log.isAI ? "text-[#00FF87] font-bold" : "text-white/80"}>
                  {log.sender}
                </span>
                <span>{log.time}</span>
              </div>
              <p className="leading-relaxed">{log.text}</p>
            </div>
          ))}
        </div>

        {/* Interactive Command Presets Bar */}
        <div className="p-4 bg-[#0A140E] border-t border-[#00FF87]/15 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-white/40 text-[11px] mr-1">Quick Presets:</span>
            {[
              "/feed wild_berries",
              "/explore willow_glen",
              "/status companion",
              "/spar shadow_fen",
            ].map((preset) => (
              <button
                key={preset}
                onClick={() => handleRunCommand(preset)}
                className="btn-glass px-3 py-1.5 rounded-lg text-[11px] hover:text-[#00FF87] transition flex items-center gap-1"
              >
                <Play className="w-2.5 h-2.5 text-[#00FF87]" />
                <span>{preset}</span>
              </button>
            ))}
          </div>

          <span className="text-[10px] font-mono text-white/40">
            Powered by Natural Language Agent Core
          </span>
        </div>
      </div>
    </section>
  );
};
