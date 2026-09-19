import React from "react";
import { Brain, Cpu, Dna, Share2, Compass, Key, Sparkles, ArrowRight } from "lucide-react";

export const FeatureDesk: React.FC = () => {
  const pillars = [
    {
      num: "01",
      title: "Cognitive Memory Engine",
      tag: "Autonomous AI",
      desc: "Every Cove companion remembers your past interactions, diet preferences, and combat training on X timeline through dynamic contextual LLM embeddings.",
      icon: <Brain className="w-5 h-5 text-[#00FF87]" />,
      accent: "from-[#00FF87]/20 to-transparent",
    },
    {
      num: "02",
      title: "Robinhood L2 Finality",
      tag: "Instant & Zero Gas",
      desc: "Built directly on the Robinhood EVM Layer-2. Companion state changes, egg cracking, and stat boosts execute with sub-millisecond finality.",
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      accent: "from-emerald-500/20 to-transparent",
    },
    {
      num: "03",
      title: "Living Dynamic DNA",
      tag: "Evolving Metadata",
      desc: "Your companion is not a static JPEG. Its visual traits, archery proficiency, and rarity badges morph as it gains levels through public quests.",
      icon: <Dna className="w-5 h-5 text-[#00FF87]" />,
      accent: "from-[#00FF87]/20 to-transparent",
    },
    {
      num: "04",
      title: "Timeline Autonomy",
      tag: "Public 𝕏 Raising",
      desc: "No separate mobile app needed. Tag @Covepets on X to feed, explore, or spar. Your pet responds autonomously with custom pixel expressions.",
      icon: <Share2 className="w-5 h-5 text-amber-400" />,
      accent: "from-amber-500/20 to-transparent",
    },
    {
      num: "05",
      title: "Sherwood Forest Expeditions",
      tag: "RPG Bounties",
      desc: "Dispatch your pet to explore mystical biomes (Willow Glen, Sherwood Keep, Shadow Fen) to discover ancient artifacts and $COVE bounties.",
      icon: <Compass className="w-5 h-5 text-[#00FF87]" />,
      accent: "from-[#00FF87]/20 to-transparent",
    },
    {
      num: "06",
      title: "Soulbound Sovereignty",
      tag: "100% Non-Custodial",
      desc: "Your companion lives in your self-custody Robinhood Wallet or MetaMask. You own the cryptographic seed and all historical logs forever.",
      icon: <Key className="w-5 h-5 text-emerald-400" />,
      accent: "from-emerald-500/20 to-transparent",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00FF87] mb-3">
            <Sparkles className="w-4 h-4" />
            <span>001 · THE SANCTUARY MATRIX</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Designed for Autonomous Life<br />
            <span className="text-gradient-mint">on the Decentralized Web.</span>
          </h2>
        </div>
        <p className="text-[#8E9E94] text-sm md:text-base max-w-md font-sans leading-relaxed">
          Six foundational technological pillars that power the living Sherwood ecosystem on Robinhood Chain.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillars.map((p, idx) => (
          <div
            key={idx}
            className="glass-panel glass-panel-hover rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden group border border-[#00FF87]/15"
          >
            {/* Ambient Corner Radial Glow */}
            <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${p.accent} blur-2xl opacity-40 group-hover:opacity-80 transition-all`}></div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-bold text-white/30 tracking-widest">
                  {p.num}
                </span>
                <span className="font-mono text-[10px] uppercase font-bold text-[#00FF87] bg-[#00FF87]/10 px-2.5 py-0.5 rounded-full border border-[#00FF87]/20">
                  {p.tag}
                </span>
              </div>

              <div className="p-3 w-max rounded-2xl bg-[#050B07] border border-[#00FF87]/20 mb-4 shadow-sm group-hover:border-[#00FF87]/50 transition">
                {p.icon}
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-2.5 group-hover:text-[#00FF87] transition">
                {p.title}
              </h3>

              <p className="text-[#8E9E94] text-xs font-sans leading-relaxed">
                {p.desc}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/40 group-hover:text-[#00FF87] transition">
              <span>Read Architecture</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
