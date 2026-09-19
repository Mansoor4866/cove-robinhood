import type { Metadata } from "next";
import "./globals.css";
import { Ticker } from "@/components/layout/Ticker";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Cove — Your pixel companion, running on Robinhood Chain",
  description:
    "An immersive virtual pet and RPG simulation set in the medieval Robin Hood universe, launched on Robinhood Chain, raised in public on X.",
  keywords: ["Robinhood Chain", "Web3 Game", "Pixel Art", "Tamagotchi", "NFT", "RPG", "Cove"],
  openGraph: {
    title: "Cove — Pixel companion on Robinhood Chain",
    description: "Raise your AI pixel companion in public on 𝕏, powered by Robinhood Chain.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain min-h-screen antialiased flex flex-col selection:bg-[#CCFF00] selection:text-black">
        <Ticker />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
