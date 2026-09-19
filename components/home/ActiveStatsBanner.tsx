import React from "react";
import { Activity, Zap, Users, Trophy, Flame } from "lucide-react";

export const ActiveStatsBanner: React.FC = () => {
  const stats = [
    { label: "Active Guardians", value: "3,412", delta: "+18% today", icon: <Users className="w-4 h-4 text-[#00FF87]" /> },
    { label: "Total Forest EXP", value: "1.42M", delta: "On-Chain", icon: <Zap className="w-4 h-4 text-amber-400" /> },
    { label: "Reward Pool", value: "10,000 $COVE", delta: "Active Epoch", icon: <Trophy className="w-4 h-4 text-[#00FF87]" /> },
    { label: "Daily Interactions", value: "48.6K", delta: "𝕏 Mentions", icon: <Flame className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-6">
      <div className="glass-panel border border-[#00FF87]/20 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#00FF87]/15">
          <div className="flex items-center gap-2.5">
            <span className="beacon-dot"></span>
            <h3 className="font-display font-bold text-base text-white tracking-wide">
              SHERWOOD FOREST LIVE TELEMETRY
            </h3>
          </div>
          <span className="font-mono text-xs text-[#00FF87] bg-[#00FF87]/10 px-3 py-1 rounded-full border border-[#00FF87]/25">
            ROBINHOOD EVM SYNCHRONIZED
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          {stats.map((s, idx) => (
            <div key={idx} className="bg-[#050B07]/60 p-4 rounded-2xl border border-white/5 hover:border-[#00FF87]/30 transition group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/50 text-xs">{s.label}</span>
                <div className="p-2 rounded-xl bg-white/5 group-hover:bg-[#00FF87]/10 transition">
                  {s.icon}
                </div>
              </div>
              <div className="text-2xl font-bold font-display text-white group-hover:text-[#00FF87] transition">
                {s.value}
              </div>
              <div className="text-[10px] text-[#00FF87] mt-1 font-semibold">
                {s.delta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
