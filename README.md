# ⚡ Cove — Web3 AI Companion on Solana

A full-stack, state-of-the-art Web3 virtual pet and RPG simulation platform built for **Solana** with **Next.js 14**, **Tailwind CSS**, and **TypeScript**.

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 🌟 Key Features

1. **Live Marquee Status Ticker:** Real-time updates on Solana Network systems, mint price, and feed cooldown.
2. **Interactive Hatching & Companion Preview:** Live simulation of companion egg hatching, stats (Hunger, EXP, Health, Energy), and dynamic berry feeding.
3. **Solana Wallet Integration:** Native Sign-in with Solana (SIWS) supporting **Phantom**, **Solflare**, and **Backpack**.
4. **User Dashboard Lookup:** Live `@username` or Solana base58 wallet address lookup engine.
5. **Top 3 & Full Leaderboard:** On-chain live rankings with sorting and filtering.
6. **6 Feature Desk Showcases:** Glassmorphic cards with reactive hover border glow.
7. **Card Snapshot Gallery:** Hand-rendered pixel art companion cards.
8. **Interactive Terminal Log (`reply-thread.log`):** Real-time command demo for feeding, hatching, and adventures.
9. **Full Documentation Page (`/docs`):** 12 canonical Sherwood Forest companions (Robin Fox, Little John, Hartley, etc.), commands guide, and FAQ.
10. **Solana Anchor Smart Program:** Production Rust contract for hatching, cooldown feeding, leveling up, and on-chain state PDA.
11. **Serverless Backend API Endpoints:** Next.js API routes for lookup, hatching, and feeding.

---

## 📁 Architecture

- `app/`: Next.js 14 App Router pages (`/`, `/docs`, `/leaderboard`, API routes)
- `components/`: Modular UI components (Layout, Home, Docs, UI)
- `contracts/solana/`: Solana Anchor Rust smart contracts for Cove Companions
- `data/`: Canonical companions, lore, and docs dataset
- `types/`: Full TypeScript type definitions
- `lib/`: Utilities, Solana web3 configs, and authentication
