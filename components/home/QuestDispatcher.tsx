"use client";

import React, { useState } from "react";
import { Compass, Swords, Shield, Trophy, Sparkles, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { sounds } from "@/lib/audio";

interface Quest {
  id: string;
  title: string;
  biome: string;
  difficulty: "Easy" | "Medium" | "Heroic";
  durationSeconds: number;
  expReward: number;
  tokenReward: string;
  description: string;
  icon: string;
}

export const QuestDispatcher: React.FC = () => {
  const [activeQuestId, setActiveQuestId] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [questResult, setQuestResult] = useState<string | null>(null);

  const quests: Quest[] = [
    {
      id: "q1",
      title: "Forage Ancient Honey Acorns",
      biome: "Willow Glen Sanctuary",
      difficulty: "Easy",
      durationSeconds: 4,
      expReward: 25,
      tokenReward: "50 $COVE",
      description: "Send Robin Fox into the ancient hollow trees to harvest ripe honey berries and golden acorns.",
      icon: "🌰",
    },
    {
      id: "q2",
      title: "Ambush the Sheriff's Caravan",
      biome: "Kingsroad Crossway",
      difficulty: "Medium",
      durationSeconds: 6,
      expReward: 60,
      tokenReward: "250 $COVE",
      description: "Intercept the corrupt tax wagons passing through Sherwood and redistribute loot to the forest guild.",
      icon: "🏹",
    },
    {
      id: "q3",
      title: "Infiltrate Nottingham Keep",
      biome: "Shadowkeep Citadel",
      difficulty: "Heroic",
      durationSeconds: 9,
      expReward: 120,
      tokenReward: "1,000 $COVE",
      description: "Scale the fortress ramparts under moon cover to retrieve the Sovereign Genesis Seal.",
      icon: "🏰",
    },
  ];

  const handleStartQuest = (quest: Quest) => {
    sounds.playBlip();
    setActiveQuestId(quest.id);
    setCountdown(quest.durationSeconds);
    setQuestResult(null);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setActiveQuestId(null);
          sounds.playHatchFanfare();
          setQuestResult(`🏆 VICTORY! Robin Fox returned from ${quest.title} with +${quest.expReward} EXP and ${quest.tokenReward}!`);
          setTimeout(() => setQuestResult(null), 5000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <section id="expeditions" className="max-w-7xl mx-auto px-6 py-20 relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00FF87] mb-3">
            <Compass className="w-4 h-4" />
            <span>002 · SHERWOOD EXPEDITION MATRIX</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Dispatch Your Companion on<br />
            <span className="text-gradient-mint">Autonomous Forest Quests.</span>
          </h2>
        </div>
        <p className="text-[#8E9E94] text-sm md:text-base max-w-md font-sans leading-relaxed">
          Select an on-chain expedition. Your pet ventures into Sherwood, battles hostile scouts, and returns with EXP & $COVE bounties.
        </p>
      </div>

      {/* Quest Result Notification */}
      {questResult && (
        <div className="mb-8 p-4 rounded-2xl bg-[#00FF87]/20 border border-[#00FF87]/50 text-[#00FF87] font-mono text-sm flex items-center gap-3 shadow-[0_0_30px_rgba(0,255,135,0.25)] animate-bounce">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-[#00FF87]" />
          <span>{questResult}</span>
        </div>
      )}

      {/* Quests Grid */}
      <div className="grid md:grid-cols-3 gap-6 font-mono">
        {quests.map((q) => {
          const isCurrentRunning = activeQuestId === q.id;

          return (
            <div
              key={q.id}
              className="glass-panel glass-panel-hover rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden border border-[#00FF87]/15 group"
            >
              <div>
                {/* Top Badge & Biome */}
                <div className="flex items-center justify-between mb-4 text-[11px]">
                  <span className="text-white/40 uppercase">{q.biome}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                      q.difficulty === "Easy"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : q.difficulty === "Medium"
                        ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        : "bg-red-500/15 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </div>

                <div className="text-4xl mb-3">{q.icon}</div>

                <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-[#00FF87] transition">
                  {q.title}
                </h3>

                <p className="text-[#8E9E94] text-xs font-sans leading-relaxed mb-6 font-light">
                  {q.description}
                </p>

                {/* Reward Pill */}
                <div className="bg-[#050B07] p-3 rounded-2xl border border-white/5 space-y-2 mb-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/50">EXP Reward:</span>
                    <span className="text-[#00FF87] font-bold">+{q.expReward} EXP</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/50">Bounty Loot:</span>
                    <span className="text-white font-bold">{q.tokenReward}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {isCurrentRunning ? (
                <div className="w-full bg-[#00FF87]/15 border border-[#00FF87]/40 text-[#00FF87] py-3 rounded-xl text-center font-bold text-xs flex items-center justify-center gap-2 animate-pulse">
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>Expedition in Progress ({countdown}s)...</span>
                </div>
              ) : (
                <button
                  onClick={() => handleStartQuest(q)}
                  disabled={Boolean(activeQuestId)}
                  className="w-full btn-glass hover:border-[#00FF87] hover:text-[#00FF87] font-display font-bold text-xs py-3.5 rounded-xl transition flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-40"
                >
                  <span>Dispatch Companion</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
