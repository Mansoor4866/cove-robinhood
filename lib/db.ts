import { createClient } from "@supabase/supabase-js";
import { Companion } from "@/types/companion";
import { CANONICAL_ROSTER, MOCK_LEADERBOARD } from "@/data/companions";

// ==========================================================
// 🛡️ Supabase Client
// ==========================================================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// ==========================================================
// ⏱️ Cooldown constants
// ==========================================================
export const COOLDOWNS = {
  FEED_MS:  60 * 60 * 1000,       // 60 minutes
  PET_MS:   30 * 60 * 1000,       // 30 minutes
  SPAR_MS:  4  * 60 * 60 * 1000,  // 4 hours
  MANA_REGEN_PER_HOUR: 10,
};

// ==========================================================
// 🔄 Row <-> Companion mappers
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
    foodTokens: row.food_tokens ?? 10,
    mana: row.mana ?? 100,
    sparWins: row.spar_wins ?? 0,
    daysActive: row.days_active ?? 1,
    weeklyScore: row.weekly_score ?? 0,
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
    food_tokens: 10,
    mana: 100,
  };
}

// ==========================================================
// 🚀 Core DB Operations (Supports Handle OR Wallet Address)
// ==========================================================

export async function findCompanionRow(identifier: string): Promise<any | null> {
  if (!identifier) return null;
  const clean = identifier.trim();
  const cleanHandle = clean.startsWith("@") ? clean : `@${clean}`;
  const rawHandle = clean.replace(/^@/, "");

  // 1. Try matching owner_handle with or without @
  const { data: byHandle } = await supabase
    .from("companions")
    .select("*")
    .or(`owner_handle.ilike.${cleanHandle},owner_handle.ilike.${rawHandle}`)
    .maybeSingle();

  if (byHandle) return byHandle;

  // 2. Try matching owner_address (EVM wallet address)
  const { data: byAddress } = await supabase
    .from("companions")
    .select("*")
    .ilike("owner_address", clean)
    .maybeSingle();

  if (byAddress) return byAddress;

  return null;
}

export async function dbGetCompanion(identifier: string): Promise<Companion | null> {
  const row = await findCompanionRow(identifier);
  if (!row) return null;
  return rowToCompanion(row);
}

export async function dbGetCompanionRaw(identifier: string): Promise<any | null> {
  return await findCompanionRow(identifier);
}

export async function dbCreateCompanion(
  ownerHandle: string,
  ownerAddress?: string
): Promise<Companion> {
  const address = ownerAddress || "";
  const formattedAddr = address && address.length > 10
    ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    : address;
  const cleanHandle = ownerHandle && !ownerHandle.startsWith("@mock")
    ? ownerHandle
    : (formattedAddr || "@sherwood_hero");

  // Check if companion already exists for this handle or wallet address
  // This guarantees user NEVER loses their existing pet on re-hatching!
  const existing =
    (address ? await findCompanionRow(address) : null) ||
    (cleanHandle ? await findCompanionRow(cleanHandle) : null);

  if (existing) {
    return rowToCompanion(existing);
  }

  // Each NEW user gets a RANDOM companion from the canonical roster!
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
    ownerAddress: address || "0x0000...0000",
  };
  const { data, error } = await supabase
    .from("companions")
    .insert(companionToRow(newCompanion))
    .select()
    .single();
  if (error) {
    console.error("dbCreateCompanion error:", error.message);
    return newCompanion;
  }
  return rowToCompanion(data);
}

// ==========================================================
// 🍓 FEED — costs 1 Food Token, 60min cooldown, +20 EXP
// ==========================================================
export async function dbFeedCompanion(
  ownerHandle: string,
  foodName: string
): Promise<{ success: boolean; companion?: Companion; reaction?: string; error?: string; cooldownMs?: number }> {
  const row = await findCompanionRow(ownerHandle);
  if (!row) return { success: false, error: "Companion not found" };

  // Check food tokens
  if ((row.food_tokens ?? 0) < 1) {
    return { success: false, error: "Not enough Food Tokens! Earn more by logging in daily or sparring." };
  }

  // Check cooldown
  if (row.last_fed_at) {
    const elapsed = Date.now() - new Date(row.last_fed_at).getTime();
    if (elapsed < COOLDOWNS.FEED_MS) {
      return { success: false, error: "Feed cooldown active!", cooldownMs: COOLDOWNS.FEED_MS - elapsed };
    }
  }

  const expGain = 20;
  const newExp = row.exp + expGain;
  const isLevelUp = newExp >= (row.max_exp ?? 100);

  const updates = {
    hunger: 0,
    food_tokens: (row.food_tokens ?? 1) - 1,
    exp: isLevelUp ? newExp - (row.max_exp ?? 100) : newExp,
    level: isLevelUp ? row.level + 1 : row.level,
    happiness: Math.min(100, (row.happiness ?? 100) + 5),
    last_fed_at: new Date().toISOString(),
  };

  const { data: updated, error: updateErr } = await supabase
    .from("companions")
    .update(updates)
    .eq("id", row.id)
    .select()
    .single();

  if (updateErr || !updated) return { success: false, error: "Failed to update companion" };

  const companion = rowToCompanion(updated);
  const reactions = [
    `savoring every bite of ${foodName}, paws glowing softly!`,
    `crunching on ${foodName}, energy refilled and tail wagging!`,
    `dipping ${foodName} carefully, purring with content!`,
  ];
  const reaction = isLevelUp
    ? `⭐ LEVEL UP! ${companion.name} reached LVL ${companion.level}!`
    : `▲ sanctuary: ${companion.name} ${reactions[Math.floor(Math.random() * reactions.length)]}`;

  return { success: true, companion, reaction };
}

// ==========================================================
// 💛 PET — free, 30min cooldown, +10 Happiness
// ==========================================================
export async function dbPetCompanion(
  ownerHandle: string
): Promise<{ success: boolean; companion?: Companion; reaction?: string; error?: string; cooldownMs?: number }> {
  const row = await findCompanionRow(ownerHandle);
  if (!row) return { success: false, error: "Companion not found" };

  // Check cooldown
  if (row.last_pet_at) {
    const elapsed = Date.now() - new Date(row.last_pet_at).getTime();
    if (elapsed < COOLDOWNS.PET_MS) {
      return { success: false, error: "Pet cooldown active!", cooldownMs: COOLDOWNS.PET_MS - elapsed };
    }
  }

  const { data: updated } = await supabase
    .from("companions")
    .update({
      happiness: Math.min(100, (row.happiness ?? 100) + 10),
      last_pet_at: new Date().toISOString(),
    })
    .eq("id", row.id)
    .select()
    .single();

  if (!updated) return { success: false, error: "Failed to pet companion" };

  return {
    success: true,
    companion: rowToCompanion(updated),
    reaction: `🦊 *purr* ${row.name} bonds with you! Happiness +10`,
  };
}

// ==========================================================
// ⚔️ SPAR — costs 15 Mana, 4hr cooldown, +15 EXP, chance +1 Food Token
// ==========================================================
export async function dbSparCompanion(
  ownerHandle: string
): Promise<{ success: boolean; companion?: Companion; reaction?: string; tokenReward?: boolean; error?: string; cooldownMs?: number }> {
  const row = await findCompanionRow(ownerHandle);
  if (!row) return { success: false, error: "Companion not found" };

  // Check mana
  const currentMana = row.mana ?? 100;
  if (currentMana < 15) {
    return { success: false, error: "Not enough Mana! Wait for mana to regenerate (10/hour)." };
  }

  // Check cooldown
  if (row.last_spar_at) {
    const elapsed = Date.now() - new Date(row.last_spar_at).getTime();
    if (elapsed < COOLDOWNS.SPAR_MS) {
      return { success: false, error: "Spar cooldown active!", cooldownMs: COOLDOWNS.SPAR_MS - elapsed };
    }
  }

  // 30% chance to win a Food Token
  const tokenReward = Math.random() < 0.3;
  const expGain = 15;
  const newExp = row.exp + expGain;
  const isLevelUp = newExp >= (row.max_exp ?? 100);

  const { data: updated } = await supabase
    .from("companions")
    .update({
      mana: Math.max(0, currentMana - 15),
      exp: isLevelUp ? newExp - (row.max_exp ?? 100) : newExp,
      level: isLevelUp ? row.level + 1 : row.level,
      spar_wins: (row.spar_wins ?? 0) + 1,
      food_tokens: tokenReward ? (row.food_tokens ?? 0) + 1 : (row.food_tokens ?? 0),
      last_spar_at: new Date().toISOString(),
    })
    .eq("id", row.id)
    .select()
    .single();

  if (!updated) return { success: false, error: "Failed to spar" };

  const reaction = isLevelUp
    ? `⭐ LEVEL UP from sparring! ${row.name} reached LVL ${updated.level}!`
    : tokenReward
    ? `⚔️ ${row.name} won the spar! +15 EXP +1 🍓 Food Token`
    : `⚔️ ${row.name} completed Archery Sparring! +15 EXP`;

  return { success: true, companion: rowToCompanion(updated), reaction, tokenReward };
}

// ==========================================================
// 🎁 DAILY LOGIN — +2 Food Tokens, mana regeneration
// ==========================================================
export async function dbClaimDailyLogin(
  ownerHandle: string
): Promise<{ success: boolean; tokensAwarded?: number; alreadyClaimed?: boolean; error?: string }> {
  const row = await findCompanionRow(ownerHandle);
  if (!row) return { success: false, error: "Companion not found" };

  // Check if already claimed today
  if (row.last_login_at) {
    const lastLogin = new Date(row.last_login_at);
    const now = new Date();
    const sameDay =
      lastLogin.getUTCFullYear() === now.getUTCFullYear() &&
      lastLogin.getUTCMonth() === now.getUTCMonth() &&
      lastLogin.getUTCDate() === now.getUTCDate();
    if (sameDay) return { success: true, alreadyClaimed: true, tokensAwarded: 0 };
  }

  // Regen mana based on hours elapsed
  const hoursElapsed = row.last_login_at
    ? Math.floor((Date.now() - new Date(row.last_login_at).getTime()) / (1000 * 60 * 60))
    : 0;
  const manaRegen = Math.min(100, (row.mana ?? 0) + hoursElapsed * COOLDOWNS.MANA_REGEN_PER_HOUR);

  await supabase
    .from("companions")
    .update({
      food_tokens: (row.food_tokens ?? 0) + 2,
      days_active: (row.days_active ?? 0) + 1,
      mana: manaRegen,
      last_login_at: new Date().toISOString(),
    })
    .eq("id", row.id);

  return { success: true, alreadyClaimed: false, tokensAwarded: 2 };
}

// ==========================================================
// 🏆 LEADERBOARD — sorted by weekly_score
// ==========================================================
export async function dbGetLeaderboard(limit: number = 50): Promise<Companion[]> {
  const { data, error } = await supabase
    .from("companions")
    .select("*")
    .order("weekly_score", { ascending: false })
    .order("level", { ascending: false })
    .limit(limit);

  if (error || !data) {
    console.warn("dbGetLeaderboard fallback to mock:", error?.message);
    return MOCK_LEADERBOARD.slice(0, limit);
  }
  return data.map(rowToCompanion);
}
