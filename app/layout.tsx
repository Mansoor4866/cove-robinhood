import type { Metadata } from "next";
import "./globals.css";
import { Ticker } from "@/components/layout/Ticker";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Cove — Autonomous AI Companions on Robinhood Chain",
  description:
    "A sovereign virtual pet and RPG simulation protocol built on Robinhood Chain. Hatch, train, and explore Sherwood Forest autonomously on X.",
  keywords: ["Robinhood Chain", "Web3 AI", "Autonomous Pets", "Pixel Art", "Tamagotchi", "NFT", "RPG", "Cove"],
  icons: {
    icon: "/favicon-icon.jpg",
    apple: "/favicon-icon.jpg",
    shortcut: "/favicon-icon.jpg",
  },
  openGraph: {
    title: "Cove — Sovereign AI Companions on Robinhood Chain",
    description: "Raise your sovereign AI companion in public on 𝕏, powered by Robinhood EVM Layer-2.",
    type: "website",
    images: [
      {
        url: "/cove-banner.png",
        width: 1500,
        height: 500,
        alt: "Cove — Sovereign AI Companions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cove — Sovereign AI Companions on Robinhood Chain",
    description: "Raise your sovereign AI companion in public on 𝕏, powered by Robinhood EVM Layer-2.",
    images: ["/cove-banner.png"],
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
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="ambient-forest-bg min-h-screen antialiased flex flex-col selection:bg-[#00FF87] selection:text-[#050B07]">
        <Ticker />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
