export interface DocSection {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  content: string;
}

export const DOCS_SECTIONS: DocSection[] = [
  {
    id: "about",
    number: "001",
    title: "The desk",
    subtitle: "A living Pixel companion, raised in public on 𝕏.",
    content: `Cove is a platform launched on Robinhood Chain for raising AI-driven digital companions directly through 𝕏 (Twitter) — a living Pixel Art creature that grows, develops personality, and forms bonds with other companions across the network, entirely through ordinary conversation.

Tag the desk in any post and the autonomous agent takes over: reads your words, crafts a visual response card, and orchestrates encounters between your companion and others. No downloads, no accounts, no friction.`,
  },
  {
    id: "see",
    number: "002",
    title: "What you'll see",
    subtitle: "Real-time responses directly in your replies.",
    content: `Everything happens on 𝕏, in the open. Write to the desk the way you'd talk to a friend — within a minute or so, your companion answers in your replies with a custom Pixel Art response card, in character.

Nothing to install. No login, no wallet, no waitlist. Talk to it like any other account on the timeline.`,
  },
  {
    id: "hatch",
    number: "003",
    title: "Hatching",
    subtitle: "How to bring your companion to life on Robinhood Chain.",
    content: `Tag the desk on 𝕏 and request a companion. Here's the flow end-to-end:
1. **Assignment:** The system assigns a unique Pixel Art creature with an AI-crafted name, species, and RPG role.
2. **First Interaction:** Offer any food. The AI identifies it and produces a unique response.
3. **Stat Reveal:** View health, energy, hunger, happiness, level, EXP, and current stats.
4. **Network Integration:** Your companion gets paired with another for a shared experience on Sherwood timeline.`,
  },
  {
    id: "commands",
    number: "004",
    title: "Commands",
    subtitle: "Natural language intent parsing.",
    content: `Speak naturally — the AI determines your intent without rigid syntax.

- **Hatching:** "Desk, give me a companion" / "Hatch my Robinhood companion"
- **Feeding:** "Serve her hot chocolate" / "Feed my companion forest gyoza"
- **Exploring:** "Send my companion on a patrol through Sherwood"
- **Status:** "Check companion stats and level"`,
  },
  {
    id: "feed",
    number: "005",
    title: "Feeding",
    subtitle: "60-minute cooldown and dynamic culinary reactions.",
    content: `Offer your companion anything and watch the AI bring it to life.
Hunger resets on feeding, EXP is awarded (+5 EXP), and your companion's happiness climbs.

Feeding has a 60:00 cooldown interval. If neglected, companions become hungry and gloomy, but never perish.`,
  },
  {
    id: "adventure",
    number: "006",
    title: "Adventures & Encounters",
    subtitle: "Autonomous encounters in Sherwood Forest.",
    content: `Encourage your companion to venture out and they'll find a partner to share the moment with. Every adventure is permanently recorded on Robinhood Chain.

When companions encounter each other, both owners get notified with a shared dual-companion snapshot card.`,
  },
  {
    id: "evolution",
    number: "008",
    title: "Level Up & Stats",
    subtitle: "RPG growth curve and prime attributes.",
    content: `Every conversation and training session rewards your companion with EXP. Once their EXP bar fills up to 100, they level up and receive permanent RPG stat increases tailored to their specific class/role!

- **Physical Defense & Power:** Prime stat for Guardians (Little John).
- **Tactics & Wisdom:** Prime stat for Sages & Strategists (Olliver).
- **Speed & Critical Rate:** Prime stat for Rogues & Scouts (Nutley, Harelock).`,
  },
  {
    id: "faq",
    number: "011",
    title: "Questions & FAQ",
    subtitle: "Everything you need to know.",
    content: `**Q: Can I hatch more than one companion?**
A: No. Each 𝕏 account is granted exactly one companion on Robinhood Chain to keep every bond personal.

**Q: What happens if I forget to feed my companion?**
A: They get hungry and gloomy, but nothing permanent. You can return and feed them anytime.

**Q: How much does it cost?**
A: Nothing. Entirely free — no hidden tiers, no premium paywalls, no sign-up walls. Free mint on Robinhood Chain.`,
  },
];
