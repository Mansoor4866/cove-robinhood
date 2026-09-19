import React from "react";

export const ActiveStatsBanner: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 my-12">
      <div className="bg-[#0E1402] border border-black/10 rounded-3xl p-6 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#CCFF00] font-bold mb-6">
          <span>🌲</span>
          <span>SHERWOOD FOREST ACTIVE STATS</span>
        </div>

        {/* 5 Stats Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 font-mono">
          {/* 1. Forest Population */}
          <div className="bg-[#1A2207] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-[10px] uppercase tracking-wider text-white/40">
              FOREST POPULATION
            </span>
            <span className="text-3xl lg:text-4xl font-bold text-white mt-4">
              0
            </span>
          </div>

          {/* 2. Hatched Today */}
          <div className="bg-[#1A2207] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-[10px] uppercase tracking-wider text-white/40">
              HATCHED TODAY
            </span>
            <span className="text-3xl lg:text-4xl font-bold text-white mt-4">
              0
            </span>
          </div>

          {/* 3. Adventures Today */}
          <div className="bg-[#1A2207] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-[10px] uppercase tracking-wider text-white/40">
              ADVENTURES TODAY
            </span>
            <span className="text-3xl lg:text-4xl font-bold text-white mt-4">
              0
            </span>
          </div>

          {/* 4. Lost Today */}
          <div className="bg-[#1A2207] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-[10px] uppercase tracking-wider text-white/40">
              LOST TODAY
            </span>
            <span className="text-3xl lg:text-4xl font-bold text-white mt-4">
              0
            </span>
          </div>

          {/* 5. Famished Right Now (Highlighted) */}
          <div className="bg-[#7A9A00] border border-[#CCFF00]/40 rounded-2xl p-5 flex flex-col justify-between text-black col-span-2 sm:col-span-1 shadow-lg">
            <span className="text-[10px] uppercase tracking-wider text-black/70 font-bold flex items-center gap-1">
              <span>⚠️</span> FAMISHED RIGHT NOW
            </span>
            <span className="text-3xl lg:text-4xl font-bold text-black mt-4">
              0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
