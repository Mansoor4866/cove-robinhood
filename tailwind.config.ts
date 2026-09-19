import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          DEFAULT: "#CCFF00",
          hover: "#DFFF3D",
          glow: "rgba(204, 255, 0, 0.45)",
        },
        forest: {
          light: "#E8F0D6",
          DEFAULT: "#4C6B00",
          dark: "#2A3C00",
          night: "#0E1402",
        },
        surface: {
          DEFAULT: "#FAFAF7",
          card: "#FFFFFF",
          cardMuted: "#F4F4EF",
          border: "rgba(0, 0, 0, 0.08)",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        ticker: "ticker 25s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 4s ease-in-out infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
