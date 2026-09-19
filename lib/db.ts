import { createClient } from "@supabase/supabase-js";
import { Companion } from "@/types/companion";
import { CANONICAL_ROSTER, MOCK_LEADERBOARD } from "@/data/companions";

// Initialize Supabase Client if env vars exist
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseKey && !supabaseUrl.includes("your-project")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// ==========================================================
// 🛡️ High-Performance In-Memory DB Store (Development Fallback)
// Ensures 0 crash & seamless local persistence
// ==========================================================
class MemoryDatabase {
  private companions: Map<string, Companion> = new Map();

  constructor() {
    // Seed initial mock leaderboard companions
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
// 🚀 Unified Database Operations (Supabase + In-Memory Fallback)
// ==========================================================

export async function dbGetCompanion(handle: string): Promise<Companion | null> {
  const cleanHandle = handle.startsWith("@") ? handle : `@${handle}`;

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("companions")
      .select("*")
      .ilike("owner_handle", cleanHandle)
      .single();

    if (!error && data) {
      return {
        id: data.id,
        name: data.name,
        species: data.species,
        role: data.role,
        description: data.description,
        quote: data.quote,
        primeStat: data.prime_stat,
        level: data.level,
        exp: data.exp,
        maxExp: data.max_exp || 100,
        hunger: data.hunger,
        maxHunger: 100,
        happiness: data.happiness,
        health: data.health,
        energy: data.energy,
        hatchedAt: data.hatched_at,
        lastFedAt: data.last_fed_at,
        ownerHandle: data.owner_handle,
        ownerAddress: data.owner_address,
        avatarIcon: data.avatar_icon,
        badge: data.badge,
        rarity: data.rarity,
      };
    }
  }

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

  if (isSupabaseConfigured && supabase) {
    await supabase.from("companions").upsert({
      name: newCompanion.name,
      species: newCompanion.species,
      role: newCompanion.role,
      rarity: newCompanion.rarity,
      avatar_icon: newCompanion.avatarIcon,
      badge: newCompanion.badge,
      description: newCompanion.description,
      quote: newCompanion.quote,
      prime_stat: newCompanion.primeStat,
      level: newCompanion.level,
      exp: newCompanion.exp,
      hunger: newCompanion.hunger,
      happiness: newCompanion.happiness,
      health: newCompanion.health,
      energy: newCompanion.energy,
      owner_handle: newCompanion.ownerHandle,
      owner_address: newCompanion.ownerAddress,
      last_fed_at: newCompanion.lastFedAt,
      hatched_at: newCompanion.hatchedAt,
    });
  }

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
  const reaction = `▲ desk: ${companion.name} ${reactions[Math.floor(Math.random() * reactions.length)]}`;

  if (isSupabaseConfigured && supabase) {
    await supabase
      .from("companions")
      .update({
        hunger: companion.hunger,
        exp: companion.exp,
        level: companion.level,
        happiness: companion.happiness,
        last_fed_at: companion.lastFedAt,
      })
      .eq("owner_handle", cleanHandle);

    // Record activity log
    await supabase.from("activity_logs").insert({
      owner_handle: cleanHandle,
      action_type: "feed",
      prompt_text: `feed ${foodName}`,
      response_text: reaction,
      reward_exp: 15,
    });
  }

  return { success: true, companion, reaction };
}

export async function dbGetLeaderboard(limit: number = 50): Promise<Companion[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("companions")
      .select("*")
      .order("level", { ascending: false })
      .order("exp", { ascending: false })
      .limit(limit);

    if (!error && data && data.length > 0) {
      return data.map((d) => ({
        id: d.id,
        name: d.name,
        species: d.species,
        role: d.role,
        description: d.description,
        quote: d.quote,
        primeStat: d.prime_stat,
        level: d.level,
        exp: d.exp,
        maxExp: 100,
        hunger: d.hunger,
        maxHunger: 100,
        happiness: d.happiness,
        health: d.health,
        energy: d.energy,
        hatchedAt: d.hatched_at,
        lastFedAt: d.last_fed_at,
        ownerHandle: d.owner_handle,
        ownerAddress: d.owner_address,
        avatarIcon: d.avatar_icon,
        badge: d.badge,
        rarity: d.rarity,
      }));
    }
  }

  return memoryDb.getLeaderboard(limit);
}
