"use client";

import React from "react";
import { FactoHero } from "@/components/home/FactoHero";
import { FactoCaseDeck } from "@/components/home/FactoCaseDeck";
import { FactoApiSection } from "@/components/home/FactoApiSection";
import { FactoRoster } from "@/components/home/FactoRoster";
import { FactoCTA } from "@/components/home/FactoCTA";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 01 · Facto Hero Stage: Giant Typography, Trust Marquee & Interactive Companion Simulator */}
      <FactoHero />

      {/* 02 · Facto Interactive Case Deck: Expandable Horizontal Feature Stages */}
      <FactoCaseDeck />

      {/* 03 · Facto Developer API & Real-Time Execution Sandbox */}
      <FactoApiSection />

      {/* 04 · Facto Archetypes Roster & Decentralized Standings */}
      <FactoRoster />

      {/* 05 · Facto Final Call to Action */}
      <FactoCTA />
    </div>
  );
}
