export type FactionRole =
  | "Leader / Ranger"
  | "Tracker / Hunter"
  | "Guardian / Vanguard"
  | "Scout / Courier"
  | "Infiltrator / Rogue"
  | "Quartermaster / Engineer"
  | "Sage / Strategist"
  | "Marksman / Assassin"
  | "Trapper / Artificer"
  | "Spy / Smuggler"
  | "Tactician / Coordinator"
  | "Sky Sentinel / Scout";

export interface CompanionStats {
  defense: number;
  tactics: number;
  agility: number;
  strength: number;
  wisdom: number;
}

export interface Companion {
  id: string;
  name: string;
  species: string;
  role: FactionRole;
  description: string;
  quote: string;
  primeStat: string;
  level: number;
  exp: number;
  maxExp: number;
  hunger: number;
  maxHunger: number;
  happiness: number;
  health: number;
  energy: number;
  hatchedAt: string;
  lastFedAt?: string;
  ownerHandle: string;
  ownerAddress?: string;
  avatarIcon: string;
  image?: string;
  badge: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  foodTokens?: number;
  mana?: number;
  sparWins?: number;
  daysActive?: number;
  weeklyScore?: number;
}

export interface AdventureLog {
  id: string;
  timestamp: string;
  user1: string;
  companion1: string;
  user2?: string;
  companion2?: string;
  actionSummary: string;
  rewardExp: number;
}

export interface TickerItem {
  label: string;
  value: string;
  type: "up" | "down" | "neutral";
}
