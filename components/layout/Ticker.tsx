import React from "react";

export const Ticker: React.FC = () => {
  const items = [
    { label: "COVE DESK", value: "▲ SYSTEMS NORMAL", isUp: true },
    { label: "CHAIN", value: "▲ ROBINHOOD", isUp: true },
    { label: "LAUNCH", value: "▲ ROBINHOOD", isUp: true },
    { label: "MINT PRICE", value: "▲ $0.00", isUp: true },
    { label: "FEED COOLDOWN", value: "▼ 60:00", isUp: false },
    { label: "NETWORK", value: "▲ 𝕏 · LIVE", isUp: true },
    { label: "COMPANIONS BORN", value: "▲ 12,480", isUp: true },
    { label: "EXP MULTIPLIER", value: "▲ 1.0X", isUp: true },
  ];

  return (
    <div className="ticker-wrap" aria-label="System status ticker">
      <div className="ticker">
        {/* Render twice for seamless infinite scroll */}
        {[...items, ...items].map((item, index) => (
          <span key={index}>
            {item.label}{" "}
            <span className={item.isUp ? "tk-up" : "tk-down"}>{item.value}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
