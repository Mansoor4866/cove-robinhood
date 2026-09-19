import React from "react";

export const CardShowcase: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-black/10" id="cards">
      <div className="mb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-black/40">
          002 · Cards
        </span>
        <h2 className="font-display font-bold text-3xl mt-2 max-w-xl text-black">
          Hand-rendered snapshots.
        </h2>
        <p className="text-black/60 max-w-2xl mt-3 leading-relaxed">
          Every reply ships as a card. Built to sit perfectly on daylight surfaces with rounded corners and a premium reactive border glow.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="col-span-full text-center py-12 text-black/40 font-mono text-xs">
          No companion records found in database.
        </div>
      </div>
    </section>
  );
};
