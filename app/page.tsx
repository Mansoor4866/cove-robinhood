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
  const [activeUser, setActiveUser] = useState("@mock_user");

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-12 items-start">
        <HeroSection onSearchUser={(username) => setActiveUser(username)} />
        <CompanionPreview username={activeUser} />
      </section>

      {/* Sherwood Forest Active Stats Banner */}
      <ActiveStatsBanner />

      {/* 001 · The desk */}
      <FeatureDesk />

      {/* 002 · Cards */}
      <CardShowcase />

      {/* 003 · From the timeline */}
      <TerminalLog />

      {/* Bottom CTA Banner */}
      <CTASection />
    </div>
  );
}
