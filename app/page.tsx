"use client";

import React, { useState } from "react";
import { HeroSanctuary } from "@/components/home/HeroSanctuary";
import { ActiveStatsBanner } from "@/components/home/ActiveStatsBanner";
import { QuestDispatcher } from "@/components/home/QuestDispatcher";
import { LeaderboardPodium } from "@/components/home/LeaderboardPodium";
import { FeatureDesk } from "@/components/home/FeatureDesk";
import { TerminalLog } from "@/components/home/TerminalLog";
import { CardShowcase } from "@/components/home/CardShowcase";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  const [activeUser, setActiveUser] = useState("");

  return (
    <div className="w-full relative">
      {/* 001 · Master Hero Sanctuary: Interactive 3D Holographic Pod, Egg Incubator, & Pet Care Arena */}
      <HeroSanctuary onSearchUser={(username) => setActiveUser(username)} />

      {/* 002 · Sherwood Forest Active Telemetry Banner */}
      <ActiveStatsBanner />

      {/* 003 · Forest Expeditions & Quest Dispatcher */}
      <QuestDispatcher />

      {/* 004 · 3D Holographic Leaderboard Podium & Standings */}
      <LeaderboardPodium />

      {/* 005 · The Sanctuary Matrix (Bento Grid) */}
      <FeatureDesk />

      {/* 006 · Timeline Log & Interactive CLI */}
      <TerminalLog />

      {/* 007 · Sovereign Companion Roster */}
      <CardShowcase />

      {/* 008 · Bottom Portal CTA Banner */}
      <CTASection />
    </div>
  );
}
