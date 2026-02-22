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
