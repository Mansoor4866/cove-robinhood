"use client";

import React, { useState } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { CompanionPreview } from "@/components/home/CompanionPreview";
import { ActiveStatsBanner } from "@/components/home/ActiveStatsBanner";
import { FeatureDesk } from "@/components/home/FeatureDesk";
import { CardShowcase } from "@/components/home/CardShowcase";
import { TerminalLog } from "@/components/home/TerminalLog";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  const [activeUser, setActiveUser] = useState("");

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 grid lg:grid-cols-2 gap-12 items-center">
        <HeroSection onSearchUser={(username) => setActiveUser(username)} />
        <CompanionPreview username={activeUser} />
      </section>

      {/* Sherwood Forest Active Telemetry Banner */}
      <ActiveStatsBanner />

      {/* 001 · The Sanctuary Matrix (Bento Grid) */}
      <FeatureDesk />

      {/* 002 · Timeline Log & Interactive CLI */}
      <TerminalLog />

      {/* 003 · Sovereign Companion Roster */}
      <CardShowcase />

      {/* 004 · Bottom Portal CTA Banner */}
      <CTASection />
    </div>
  );
}
