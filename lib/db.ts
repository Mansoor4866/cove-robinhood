import { createClient } from "@supabase/supabase-js";
import { Companion } from "@/types/companion";
import { CANONICAL_ROSTER, MOCK_LEADERBOARD } from "@/data/companions";

// ==========================================================
// 🛡️ Supabase Client (Server-side only — uses service role key)
// ==========================================================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// ==========================================================
// 🔄 Row <-> Companion mappers (snake_case DB ↔ camelCase TS)
// ==========================================================
function rowToCompanion(row: any): Companion {
  return {
    id: row.id,
    name: row.name,
    species: row.species,
    role: row.role,
    description: row.description ?? "",
    quote: row.quote ?? "",
    primeStat: row.prime_stat ?? "",
    level: row.level,
    exp: row.exp,
    maxExp: row.max_exp ?? 100,
    hunger: row.hunger ?? 0,
    maxHunger: 100,
    happiness: row.happiness ?? 100,
    health: row.health ?? 100,
    energy: row.energy ?? 100,
    hatchedAt: row.hatched_at,
    lastFedAt: row.last_fed_at,
    ownerHandle: row.owner_handle,
    ownerAddress: row.owner_address ?? "",
    avatarIcon: row.avatar_icon ?? "🦊",
    badge: row.badge ?? "🌿",
    rarity: row.rarity ?? "Common",
  };
}

function companionToRow(c: Companion) {
  return {
    name: c.name,
    species: c.species,
    role: c.role,
    description: c.description,
    quote: c.quote,
    prime_stat: c.primeStat,
    level: c.level,
    exp: c.exp,
    max_exp: c.maxExp,
    hunger: c.hunger,
    happiness: c.happiness,
    health: c.health,
    energy: c.energy,
    hatched_at: c.hatchedAt,
    last_fed_at: c.lastFedAt ?? new Date().toISOString(),
    owner_handle: c.ownerHandle,
    owner_address: c.ownerAddress ?? "",
    avatar_icon: c.avatarIcon,
    badge: c.badge,
    rarity: c.rarity,
  };
}

// ==========================================================
// 🚀 Unified Database Operations
// ==========================================================

/**
 * Get companion by Twitter/X handle
 */
export async function dbGetCompanion(handle: string): Promise<Companion | null> {
  const cleanHandle = handle.startsWith("@") ? handle : `@${handle}`;

  const { data, error } = await supabase
    .from("companions")
    .select("*")
    .ilike("owner_handle", cleanHandle)
    .single();

  if (error || !data) return null;
  return rowToCompanion(data);
}

/**
 * Create a new companion (random archetype from CANONICAL_ROSTER)
 */
export async function dbCreateCompanion(
  ownerHandle: string,
  ownerAddress?: string
): Promise<Companion> {
  const cleanHandle = ownerHandle.startsWith("@") ? ownerHandle : `@${ownerHandle}`;
  const randomBase = CANONICAL_ROSTER[Math.floor(Math.random() * CANONICAL_ROSTER.length)];

  const newCompanion: Companion = {
    ...randomBase,
    id: crypto.randomUUID(),
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

  const { data, error } = await supabase
    .from("companions")
    .insert(companionToRow(newCompanion))
    .select()
    .single();

  if (error) {
    console.error("dbCreateCompanion error:", error.message);
    // Fallback: return the in-memory object if DB insert fails
    return newCompanion;
  }

  return rowToCompanion(data);
}

/**
 * Feed companion (+EXP, level up logic, hunger reset)
 */
export async function dbFeedCompanion(
  ownerHandle: string,
  foodName: string
): Promise<{ success: boolean; companion?: Companion; reaction?: string; error?: string }> {
  const cleanHandle = ownerHandle.startsWith("@") ? ownerHandle : `@${ownerHandle}`;

  // 1. Fetch current companion
  const { data: existing, error: fetchErr } = await supabase
    .from("companions")
    .select("*")
    .ilike("owner_handle", cleanHandle)
    .single();

  if (fetchErr || !existing) {
    return { success: false, error: "Companion not found" };
  }

  // 2. Calculate new stats
  const expGain = 15;
  const newExp = existing.exp + expGain;
  const isLevelUp = newExp >= existing.max_exp;

  const updates = {
    hunger: 0,
    exp: isLevelUp ? newExp - existing.max_exp : newExp,
    level: isLevelUp ? existing.level + 1 : existing.level,
    happiness: Math.min(100, existing.happiness + 10),
    last_fed_at: new Date().toISOString(),
  };

  // 3. Update in Supabase
  const { data: updated, error: updateErr } = await supabase
    .from("companions")
    .update(updates)
    .ilike("owner_handle", cleanHandle)
    .select()
    .single();

  if (updateErr || !updated) {
    return { success: false, error: "Failed to update companion" };
  }

  const companion = rowToCompanion(updated);
  const reactions = [
    `savoring every bite of ${foodName}, paws glowing softly!`,
    `crunching on ${foodName}, energy refilled and tail wagging!`,
    `dipping ${foodName} carefully, purring with content!`,
  ];
  const reaction = `▲ sanctuary: ${companion.name} ${reactions[Math.floor(Math.random() * reactions.length)]}`;

  return { success: true, companion, reaction };
}

/**
 * Get leaderboard — sorted by level desc, exp desc
 */
export async function dbGetLeaderboard(limit: number = 50): Promise<Companion[]> {
  const { data, error } = await supabase
    .from("companions")
    .select("*")
    .order("level", { ascending: false })
    .order("exp", { ascending: false })
    .limit(limit);

  if (error || !data) {
    // Fallback to mock data if DB is unavailable
    console.warn("dbGetLeaderboard fallback to mock:", error?.message);
    return MOCK_LEADERBOARD.slice(0, limit);
  }

  return data.map(rowToCompanion);
}
