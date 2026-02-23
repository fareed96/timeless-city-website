import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Game Config ───

export interface GameConfigRow {
  key: string;
  value: any;
  updated_at: string;
}

export interface RarityWeights {
  common: number;
  rare: number;
  epic: number;
  legendary: number;
}

export interface RarityPresets {
  [name: string]: RarityWeights & { cardpack_boost?: number };
}

export async function fetchAllConfig(): Promise<GameConfigRow[]> {
  const { data, error } = await supabase
    .from("game_config")
    .select("*")
    .order("key");
  if (error) throw error;
  return data || [];
}

export async function updateConfig(key: string, value: any): Promise<void> {
  const { error } = await supabase
    .from("game_config")
    .upsert(
      { key, value, updated_at: new Date().toISOString() },
      { onConflict: "key" }
    );
  if (error) throw error;
}

// ─── Events ───

export interface EventRow {
  id: string;
  event_type: string;
  bonus_multiplier: number;
  start_date: string;
  end_date: string;
  title: string;
  description: string | null;
}

export async function fetchActiveEvents(): Promise<EventRow[]> {
  const { data, error } = await supabase
    .from("events")
    .select("id, event_type, bonus_multiplier, start_date, end_date, title, description")
    .gte("end_date", new Date().toISOString())
    .order("start_date", { ascending: false })
    .limit(20);
  if (error) throw error;
  return data || [];
}

export async function createEvent(event: {
  event_type: string;
  bonus_multiplier: number;
  start_date: string;
  end_date: string;
  title: string;
  description: string;
}): Promise<void> {
  const { error } = await supabase.from("events").insert(event);
  if (error) throw error;
}

export async function deleteEvent(id: string): Promise<void> {
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw error;
}

// ─── Seasonal Events ───

export interface RewardTier {
  min_rank: number;
  max_rank: number;
  gems: number;
  gold: number;
  chest_type: string;
}

export interface SeasonalEventRow {
  id: string;
  name: string;
  theme: string;
  start_date: string;
  end_date: string;
  chest_costs: number[];
  is_active: boolean;
  reward_tiers: RewardTier[];
}

export async function fetchSeasonalEvents(): Promise<SeasonalEventRow[]> {
  const { data, error } = await supabase
    .from("seasonal_events")
    .select("*")
    .order("start_date", { ascending: false })
    .limit(20);
  if (error) throw error;
  return data || [];
}

export async function createSeasonalEvent(event: {
  name: string;
  theme: string;
  start_date: string;
  end_date: string;
  chest_costs: number[];
  is_active: boolean;
  reward_tiers: RewardTier[];
}): Promise<void> {
  const { error } = await supabase.from("seasonal_events").insert(event);
  if (error) throw error;
}

export async function deleteSeasonalEvent(id: string): Promise<void> {
  const { error } = await supabase.from("seasonal_events").delete().eq("id", id);
  if (error) throw error;
}

export async function toggleSeasonalEvent(id: string, isActive: boolean): Promise<void> {
  const { error } = await supabase.from("seasonal_events").update({ is_active: isActive }).eq("id", id);
  if (error) throw error;
}

// ─── Guilds ───

export interface GuildRow {
  id: string;
  name: string;
  description: string;
  emblem_index: number;
  is_open: boolean;
  min_level: number;
  leader_id: string;
  created_at: string;
  member_count?: number;
}

export interface GuildMemberRow {
  id: string;
  guild_id: string;
  player_id: string;
  role: string;
  display_name: string;
  weekly_contribution: number;
  joined_at: string;
}

export async function fetchGuilds(): Promise<GuildRow[]> {
  const { data, error } = await supabase
    .from("guilds")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) throw error;
  return data || [];
}

export async function fetchGuildMembers(guildId: string): Promise<GuildMemberRow[]> {
  const { data, error } = await supabase
    .from("guild_members")
    .select("*")
    .eq("guild_id", guildId)
    .order("role");
  if (error) throw error;
  return data || [];
}

export async function deleteGuild(id: string): Promise<void> {
  const { error } = await supabase.from("guilds").delete().eq("id", id);
  if (error) throw error;
}

export async function removeGuildMember(memberId: string): Promise<void> {
  const { error } = await supabase.from("guild_members").delete().eq("id", memberId);
  if (error) throw error;
}

// ─── Leaderboard Rewards ───

export interface LeaderboardSnapshotRow {
  id: string;
  player_id: string;
  category: string;
  rank: number;
  score: number;
  week_start: string;
  reward_claimed: boolean;
}

export async function fetchLeaderboardSnapshots(): Promise<LeaderboardSnapshotRow[]> {
  const { data, error } = await supabase
    .from("leaderboard_weekly_snapshots")
    .select("*")
    .order("week_start", { ascending: false })
    .limit(100);
  if (error) throw error;
  return data || [];
}

export async function createLeaderboardSnapshot(snapshot: {
  player_id: string;
  category: string;
  rank: number;
  score: number;
  week_start: string;
}): Promise<void> {
  const { error } = await supabase.from("leaderboard_weekly_snapshots").insert(snapshot);
  if (error) throw error;
}

// ─── Player Stats (for admin overview) ───

export interface PlayerStatsRow {
  id: string;
  display_name: string;
  gold: number;
  gems: number;
  total_spins: number;
  created_at: string;
}

export async function fetchPlayerStats(): Promise<PlayerStatsRow[]> {
  const { data, error } = await supabase
    .from("players")
    .select("id, display_name, gold, gems, total_spins, created_at")
    .order("gold", { ascending: false })
    .limit(50);
  if (error) throw error;
  return data || [];
}

// ─── Battle Stats (for admin) ───

export interface BattleStatsRow {
  id: string;
  attacker_id: string;
  defender_id: string;
  attacker_won: boolean;
  gold_looted: number;
  created_at: string;
}

export async function fetchRecentBattles(): Promise<BattleStatsRow[]> {
  const { data, error } = await supabase
    .from("battles")
    .select("id, attacker_id, defender_id, attacker_won, gold_looted, created_at")
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) throw error;
  return data || [];
}
