"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Trophy, Timer, Coins, Sparkles, Flame, Zap, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Companion } from "@/types/companion";

interface BiWeeklyRewardTrackerProps {
  companions?: Companion[];
}

export const BiWeeklyRewardTracker: React.FC<BiWeeklyRewardTrackerProps> = ({ companions = [] }) => {
  // Bi-weekly countdown calculation (target 14-day epoch ending)
  const [timeLeft, setTimeLeft] = useState({ days: 9, hours: 14, minutes: 22, seconds: 45 });
  const [checkHandle, setCheckHandle] = useState("");
  const [userResult, setUserResult] = useState<{
    found: boolean;
    name?: string;
    rank?: number;
    score?: number;
    tier?: string;
    rewardText?: string;
  } | null>(null);

  useEffect(() => {
    // Target date: 9.5 days from now for Genesis Token Launch Epoch
    const targetEpoch = Date.now() + (9 * 24 * 3600 + 14 * 3600 + 22 * 60 + 45) * 1000;

    const interval = setInterval(() => {
      const diff = Math.max(0, targetEpoch - Date.now());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCheckEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkHandle.trim()) return;

    const clean = checkHandle.trim().toLowerCase().replace("@", "");
    const foundIndex = companions.findIndex(
      (c) => c.ownerHandle.toLowerCase().replace("@", "") === clean
    );

    if (foundIndex !== -1) {
      const comp = companions[foundIndex];
      const rank = foundIndex + 1;
      const score =
        (comp.weeklyScore && comp.weeklyScore > 0)
          ? comp.weeklyScore
          : comp.level * 1000 + comp.exp * 10 + (comp.sparWins || 0) * 25 + (comp.daysActive || 1) * 50;

      let tier = "Early Explorer Status";
      let rewardText = "10 Food Tokens + Genesis Early Timeline Role";

      if (rank <= 10) {
        tier = "🥇 Mythic Pioneer Tier";
        rewardText = "15,000 $COVE Guaranteed Airdrop + Tier 1 Whitelist";
      } else if (rank <= 100) {
        tier = "🥈 Vanguard Tier";
        rewardText = "5,000 $COVE Allocation + 100 Food Tokens + Tier 2 Whitelist";
      } else if (rank <= 1000) {
        tier = "🥉 Ranger Whitelist Tier";
        rewardText = "Guaranteed $COVE Token Whitelist + 50 Food Tokens";
      }

      setUserResult({
        found: true,
        name: comp.name,
        rank,
        score,
        tier,
        rewardText,
      });
    } else {
      setUserResult({
        found: false,
      });
    }
  };

  return (
    <div className="relative mb-12 rounded-3xl overflow-hidden border border-white/10 bg-[#0d0e11] text-white p-6 sm:p-8 shadow-2xl">
      {/* Background glow effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#58e78f]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#f243ac]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="relative z-10">
        {/* Top Header Tag & Countdown */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono mb-3">
              <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></span>
              <span className="text-[#f59e0b] font-semibold">Bi-Weekly Genesis Season 01</span>
              <span className="text-white/30">•</span>
              <span className="text-white/70">Pre-Token Launch Epoch</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
              <span>$COVE Token Launch Snapshot</span>
              <Sparkles className="w-6 h-6 text-[#f59e0b]" />
            </h2>
            <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-xl font-sans leading-relaxed">
              Top 1,000 active trainers on the Sherwood Leaderboard at snapshot time unlock guaranteed $COVE Token Airdrops & Whitelist allocations.
            </p>
          </div>

          {/* Live Countdown Clock */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 sm:p-4 shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono text-white/50 mb-2">
              <Timer className="w-3.5 h-3.5 text-[#58e78f]" />
              <span>SNAPSHOT & TGE COUNTDOWN</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-center font-mono">
              <div className="bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 min-w-[52px]">
                <span className="font-bold text-xl sm:text-2xl text-white block">{timeLeft.days}</span>
                <span className="text-[9px] uppercase tracking-wider text-white/40">Days</span>
              </div>
              <span className="text-white/40 font-bold">:</span>
              <div className="bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 min-w-[52px]">
                <span className="font-bold text-xl sm:text-2xl text-white block">{String(timeLeft.hours).padStart(2, "0")}</span>
                <span className="text-[9px] uppercase tracking-wider text-white/40">Hours</span>
              </div>
              <span className="text-white/40 font-bold">:</span>
              <div className="bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 min-w-[52px]">
                <span className="font-bold text-xl sm:text-2xl text-white block">{String(timeLeft.minutes).padStart(2, "0")}</span>
                <span className="text-[9px] uppercase tracking-wider text-white/40">Mins</span>
              </div>
              <span className="text-white/40 font-bold">:</span>
              <div className="bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 min-w-[52px]">
                <span className="font-bold text-xl sm:text-2xl text-[#58e78f] block">{String(timeLeft.seconds).padStart(2, "0")}</span>
                <span className="text-[9px] uppercase tracking-wider text-white/40">Secs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reward Tiers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 my-6">
          {/* Tier 1 */}
          <div className="bg-gradient-to-b from-[#f59e0b]/15 to-white/[0.02] border border-[#f59e0b]/30 rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-bold text-[#f59e0b] uppercase px-2 py-0.5 rounded bg-[#f59e0b]/20">
                Rank #1 – #10
              </span>
              <Trophy className="w-4 h-4 text-[#f59e0b]" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-base">Mythic Pioneer</h4>
              <p className="text-[#f59e0b] font-mono font-bold text-sm mt-1">15,000 $COVE</p>
              <p className="text-white/50 text-[11px] mt-1 leading-snug">
                Tier 1 Guaranteed Airdrop + Exclusive Mythic Badge & Discord Role
              </p>
            </div>
          </div>

          {/* Tier 2 */}
          <div className="bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/20 rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-bold text-white uppercase px-2 py-0.5 rounded bg-white/15">
                Rank #11 – #100
              </span>
              <Zap className="w-4 h-4 text-[#58e78f]" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-base">Vanguard Elite</h4>
              <p className="text-[#58e78f] font-mono font-bold text-sm mt-1">5,000 $COVE Allocation</p>
              <p className="text-white/50 text-[11px] mt-1 leading-snug">
                + 100 Food Tokens + Tier 2 Token Whitelist access
              </p>
            </div>
          </div>

          {/* Tier 3 */}
          <div className="bg-gradient-to-b from-[#0053ff]/15 to-white/[0.02] border border-[#0053ff]/30 rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-bold text-[#0053ff] uppercase px-2 py-0.5 rounded bg-[#0053ff]/20">
                Rank #101 – #1,000
              </span>
              <ShieldCheck className="w-4 h-4 text-[#0053ff]" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-base">Sherwood Ranger</h4>
              <p className="text-white font-mono font-bold text-sm mt-1">Guaranteed Allocation</p>
              <p className="text-white/50 text-[11px] mt-1 leading-snug">
                Guaranteed Token Whitelist + 50 Food Tokens
              </p>
            </div>
          </div>

          {/* Tier 4 */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-bold text-white/60 uppercase px-2 py-0.5 rounded bg-white/10">
                All Active Players
              </span>
              <Coins className="w-4 h-4 text-[#f243ac]" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-base">Early Explorer</h4>
              <p className="text-[#f243ac] font-mono font-bold text-sm mt-1">10 Food Tokens</p>
              <p className="text-white/50 text-[11px] mt-1 leading-snug">
                Pioneer Status on Robinhood Chain + Daily bonus booster
              </p>
            </div>
          </div>
        </div>

        {/* Live Eligibility Checker & Action Bar */}
        <div className="mt-4 pt-5 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <form onSubmit={handleCheckEligibility} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Enter your @handle to check eligibility..."
              value={checkHandle}
              onChange={(e) => setCheckHandle(e.target.value)}
              className="bg-white/5 border border-white/15 focus:border-[#58e78f] text-white text-xs font-mono px-3.5 py-2.5 rounded-xl w-full sm:w-72 focus:outline-none transition shadow-inner placeholder:text-white/30"
            />
            <button
              type="submit"
              className="bg-[#58e78f] hover:bg-[#58e78f]/90 text-[#0d0e11] font-sans font-bold text-xs px-4 py-2.5 rounded-xl transition shrink-0 active:scale-95 shadow-sm"
            >
              Check
            </button>
          </form>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/15 px-4 py-2.5 rounded-xl transition"
            >
              <Flame className="w-3.5 h-3.5 text-[#f243ac]" />
              <span>Feed & Spar to Rank Up</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Eligibility Modal / Alert */}
        {userResult && (
          <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs animate-in fade-in">
            {userResult.found ? (
              <>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#58e78f] shrink-0" />
                  <div>
                    <span className="text-white font-bold">{userResult.name}</span>
                    <span className="text-white/50 ml-2">Rank #{userResult.rank}</span>
                    <span className="text-[#f59e0b] font-bold ml-2">({userResult.score?.toLocaleString()} pts)</span>
                    <div className="text-[#58e78f] font-semibold mt-0.5">{userResult.tier} — {userResult.rewardText}</div>
                  </div>
                </div>
                <Link
                  href="/"
                  className="text-xs bg-[#58e78f] text-[#0d0e11] font-bold px-3 py-1.5 rounded-lg shrink-0 hover:opacity-90"
                >
                  Boost Score Now →
                </Link>
              </>
            ) : (
              <div className="text-white/60">
                Handle not found in current snapshot. Hatch or link your companion to start qualifying for the $COVE Airdrop!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
