import React from "react";

export const TerminalLog: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-black/10">
      <div className="mb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-black/40">
          003 · From the timeline
        </span>
        <h2 className="font-display font-bold text-3xl mt-2 mb-6 max-w-xl text-black">
          What a reply actually looks like.
        </h2>
        <p className="text-black/60 max-w-2xl mt-3 leading-relaxed">
          Real system output and command samples. Watch the autonomous engine translate raw mentions into companion interactions in real-time.
        </p>
      </div>

      <div className="bg-black border border-black/10 rounded-xl overflow-hidden max-w-2xl">
        <div className="flex items-center gap-2 px-4 py-3 bg-[#111310] border-b border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/50"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/50"></span>
          <span className="font-mono text-[10px] text-white/40 ml-2 uppercase tracking-widest">
            reply-thread.log
          </span>
        </div>
        <pre className="p-5 font-mono text-xs leading-relaxed overflow-x-auto text-[#CCFF00]">
          <span className="text-white/40">$</span>{" "}
          <span className="text-white">you: &quot;serve my companion forest gyoza&quot;</span>
          <br />
          <span className="text-[#CCFF00]">▲ desk: carefully dipping each one, savoring every bite!</span>
          <br />
          <span className="text-white/50">↳ hunger reset · meal count +1 · card attached</span>
        </pre>
      </div>
    </section>
  );
};
