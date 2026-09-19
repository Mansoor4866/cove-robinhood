import React from "react";

export const Ticker: React.FC = () => {
  const tickerItems = [
    { label: "COVE SANCTUARY", value: "ONLINE", isHighlight: true },
    { label: "ROBINHOOD CHAIN", value: "EVM L2 ACTIVE" },
    { label: "GENESIS MINT", value: "FREE / ZERO GAS", isHighlight: true },
    { label: "AI EXPEDITIONS", value: "SHERWOOD DEEP FOREST" },
    { label: "FEED COOLDOWN", value: "READY" },
    { label: "SOULBOUND EVOLUTION", value: "ACTIVE" },
  ];

  return (
    <div className="w-full bg-[#030704] border-b border-[#00FF87]/15 py-2.5 overflow-hidden select-none font-mono text-[11px]">
      <div className="flex w-max animate-ticker items-center gap-10 whitespace-nowrap">
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5">
            <span className="beacon-dot"></span>
            <span className="text-white/60 uppercase tracking-widest">{item.label}</span>
            <span className="text-[#00FF87] font-bold">▲</span>
            <span className={item.isHighlight ? "text-[#00FF87] font-bold" : "text-white/85 font-medium"}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
