import { Companion } from "@/types/companion";
import { CANONICAL_ROSTER, MOCK_LEADERBOARD } from "@/data/companions";

// ==========================================================
// 🛡️ High-Performance In-Memory DB Store (Zero Crash Guaranteed)
// ==========================================================
class MemoryDatabase {
  private companions: Map<string, Companion> = new Map();

  constructor() {
    MOCK_LEADERBOARD.forEach((comp) => {
      this.companions.set(comp.ownerHandle.toLowerCase(), comp);
    });
  }

  async getCompanionByHandle(handle: string): Promise<Companion | null> {
    const key = handle.toLowerCase();
    return this.companions.get(key) || null;
  }

  async saveCompanion(companion: Companion): Promise<Companion> {
    const key = companion.ownerHandle.toLowerCase();
    this.companions.set(key, companion);
    return companion;
  }

  async feedCompanion(
    handle: string,
    expGain: number = 15
  ): Promise<{ success: boolean; companion?: Companion; error?: string }> {
    const key = handle.toLowerCase();
    const companion = this.companions.get(key);

    if (!companion) {
      return { success: false, error: "Companion not found" };
    }

    const newExp = companion.exp + expGain;
    const isLevelUp = newExp >= companion.maxExp;

    const updated: Companion = {
      ...companion,
      hunger: 0,
      exp: isLevelUp ? newExp - companion.maxExp : newExp,
      level: isLevelUp ? companion.level + 1 : companion.level,
      happiness: Math.min(100, companion.happiness + 10),
      lastFedAt: new Date().toISOString(),
    };

    this.companions.set(key, updated);
    return { success: true, companion: updated };
  }

  async getLeaderboard(limit: number = 50): Promise<Companion[]> {
    const all = Array.from(this.companions.values());
    return all
      .sort((a, b) => b.level - a.level || b.exp - a.exp)
      .slice(0, limit);
  }
}

const memoryDb = new MemoryDatabase();

// ==========================================================
// 🚀 Unified Database Operations
// ==========================================================

export async function dbGetCompanion(handle: string): Promise<Companion | null> {
  const cleanHandle = handle.startsWith("@") ? handle : `@${handle}`;
  return memoryDb.getCompanionByHandle(cleanHandle);
}

export async function dbCreateCompanion(
  ownerHandle: string,
  ownerAddress?: string
): Promise<Companion> {
  const cleanHandle = ownerHandle.startsWith("@") ? ownerHandle : `@${ownerHandle}`;
  const randomBase = CANONICAL_ROSTER[Math.floor(Math.random() * CANONICAL_ROSTER.length)];

  const newCompanion: Companion = {
    ...randomBase,
    id: `comp-${Math.floor(Math.random() * 90000 + 10000)}`,
    level: 1,
    exp: 10,
    hunger: 0,
    happiness: 100,
    health: 100,
    energy: 100,
    hatchedAt: new Date().toISOString(),
    lastFedAt: new Date().toISOString(),
    ownerHandle: cleanHandle,
    ownerAddress: ownerAddress || "0x0000...0000",
  };

  return memoryDb.saveCompanion(newCompanion);
}

export async function dbFeedCompanion(
  ownerHandle: string,
  foodName: string
): Promise<{ success: boolean; companion?: Companion; reaction?: string; error?: string }> {
  const cleanHandle = ownerHandle.startsWith("@") ? ownerHandle : `@${ownerHandle}`;
  const result = await memoryDb.feedCompanion(cleanHandle, 15);

  if (!result.success || !result.companion) {
    return { success: false, error: result.error };
  }

  const companion = result.companion;
  const reactions = [
    `savoring every bite of ${foodName}, paws glowing softly!`,
    `crunching on ${foodName}, energy refilled and tail wagging!`,
    `dipping ${foodName} carefully, purring with content!`,
  ];
  const reaction = `▲ sanctuary: ${companion.name} ${reactions[Math.floor(Math.random() * reactions.length)]}`;

  return { success: true, companion, reaction };
}

export async function dbGetLeaderboard(limit: number = 50): Promise<Companion[]> {
  return memoryDb.getLeaderboard(limit);
}
