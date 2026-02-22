"use client";

import { useEffect, useState, useCallback } from "react";
import {
  fetchAllConfig,
  updateConfig,
  fetchActiveEvents,
  createEvent,
  deleteEvent,
  fetchSeasonalEvents,
  createSeasonalEvent,
  deleteSeasonalEvent,
  toggleSeasonalEvent,
  type GameConfigRow,
  type RarityWeights,
  type RarityPresets,
  type EventRow,
  type SeasonalEventRow,
} from "../lib/supabase";

// ─── Constants ───

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "timeless2026";

const EVENT_TYPES = [
  { value: "gold_rush", label: "Gold Rush", icon: "💰", color: "text-yellow-400" },
  { value: "battle_frenzy", label: "Battle Frenzy", icon: "⚔️", color: "text-red-400" },
  { value: "building_boom", label: "Building Boom", icon: "🏗️", color: "text-blue-400" },
  { value: "spin_festival", label: "Spin Festival", icon: "✨", color: "text-purple-400" },
  { value: "harvest_feast", label: "Harvest Feast", icon: "🌿", color: "text-green-400" },
  { value: "troop_rally", label: "Troop Rally", icon: "🛡️", color: "text-orange-400" },
  { value: "gem_mine", label: "Gem Mine", icon: "💎", color: "text-cyan-400" },
  { value: "siege_war", label: "Siege War", icon: "🏰", color: "text-red-500" },
] as const;

const DEFAULT_PRESETS: RarityPresets = {
  balanced: { common: 50, rare: 30, epic: 15, legendary: 5 },
  card_heavy: { common: 30, rare: 25, epic: 25, legendary: 20, cardpack_boost: 0.15 },
  clover_rush: { common: 35, rare: 25, epic: 20, legendary: 20 },
  gem_rain: { common: 30, rare: 25, epic: 25, legendary: 20 },
  test_mode: { common: 20, rare: 30, epic: 25, legendary: 25 },
};

// ─── Main Component ───

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<"config" | "events" | "seasons">("config");

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError(false);
      sessionStorage.setItem("tc_admin", "1");
    } else {
      setAuthError(true);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("tc_admin") === "1") {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <LoginGate password={password} setPassword={setPassword} authError={authError} onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-[#d4a853]/20 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏰</span>
            <h1 className="text-xl font-bold text-[#d4a853] tracking-wide font-[family-name:var(--font-cinzel)]">
              Timeless City — Admin
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Tab switcher */}
            <div className="flex gap-1 bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("config")}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                  activeTab === "config"
                    ? "bg-[#d4a853]/20 text-[#d4a853]"
                    : "text-white/40 hover:text-white/60"
                }`}
              >
                ⚙️ Config
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                  activeTab === "events"
                    ? "bg-[#d4a853]/20 text-[#d4a853]"
                    : "text-white/40 hover:text-white/60"
                }`}
              >
                📅 Events
              </button>
              <button
                onClick={() => setActiveTab("seasons")}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                  activeTab === "seasons"
                    ? "bg-[#d4a853]/20 text-[#d4a853]"
                    : "text-white/40 hover:text-white/60"
                }`}
              >
                🏆 Seasons
              </button>
            </div>
            <button
              onClick={() => {
                sessionStorage.removeItem("tc_admin");
                setIsAuthenticated(false);
              }}
              className="text-xs text-white/30 hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === "config" ? <ConfigPanel /> : activeTab === "events" ? <EventsPanel /> : <SeasonsPanel />}
      </main>
    </div>
  );
}

// ─── Login Gate ───

function LoginGate({
  password,
  setPassword,
  authError,
  onLogin,
}: {
  password: string;
  setPassword: (v: string) => void;
  authError: boolean;
  onLogin: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto px-6">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-[#d4a853] font-[family-name:var(--font-cinzel)]">
            Admin Access
          </h1>
          <p className="text-white/30 text-sm mt-2">Enter admin code to continue</p>
        </div>

        <div className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (authError) setPassword(e.target.value);
            }}
            onKeyDown={(e) => e.key === "Enter" && onLogin()}
            placeholder="Admin code"
            className={`w-full bg-white/5 border ${
              authError ? "border-red-500" : "border-white/10"
            } rounded-xl px-4 py-3 text-white text-center text-lg tracking-widest focus:border-[#d4a853]/50 focus:outline-none transition-colors`}
          />

          {authError && (
            <p className="text-red-400 text-sm text-center font-bold">Invalid code</p>
          )}

          <button
            onClick={onLogin}
            className="w-full bg-[#d4a853] text-[#0a0a0f] font-bold py-3 rounded-xl hover:bg-[#e8c97a] transition-colors text-lg"
          >
            Unlock
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Config Panel (from existing admin-panel) ───

function ConfigPanel() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [weights, setWeights] = useState<RarityWeights>({ common: 50, rare: 30, epic: 15, legendary: 5 });
  const [gameMode, setGameMode] = useState<"slot" | "mining">("slot");
  const [costMultiplier, setCostMultiplier] = useState(1.15);
  const [dupeCostMultiplier, setDupeCostMultiplier] = useState(1.2);
  const [cardPackBoost, setCardPackBoost] = useState(0.0);
  const [presets, setPresets] = useState<RarityPresets>(DEFAULT_PRESETS);
  const [repWeights, setRepWeights] = useState({ population: 1.2, happiness: 1.8, building_count: 15.0, attack: 0.6, defense: 0.8 });
  const [rankThresholds, setRankThresholds] = useState([0, 50, 150, 400, 800, 1500, 3000, 6000, 12000, 25000]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const loadConfig = useCallback(async () => {
    try {
      const rows = await fetchAllConfig();
      for (const row of rows) {
        switch (row.key) {
          case "rarity_weights": setWeights(row.value as RarityWeights); break;
          case "game_mode": setGameMode(row.value as "slot" | "mining"); break;
          case "cost_multiplier": setCostMultiplier(Number(row.value)); break;
          case "duplicate_cost_multiplier": setDupeCostMultiplier(Number(row.value)); break;
          case "cardpack_boost": setCardPackBoost(Number(row.value)); break;
          case "rarity_presets": setPresets(row.value as RarityPresets); break;
          case "reputation_weights": setRepWeights(row.value as typeof repWeights); break;
          case "rank_thresholds": setRankThresholds(row.value as number[]); break;
        }
      }
    } catch (e: any) {
      showToast("Failed to load config: " + e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadConfig(); }, [loadConfig]);

  const save = async (key: string, value: any) => {
    setSaving(key);
    try {
      await updateConfig(key, value);
      showToast(`✅ Saved "${key}"`);
    } catch (e: any) {
      showToast(`❌ Error: ${e.message}`);
    } finally {
      setSaving(null);
    }
  };

  const applyPreset = (name: string) => {
    const p = presets[name];
    if (!p) return;
    setWeights({ common: p.common, rare: p.rare, epic: p.epic, legendary: p.legendary });
    if (p.cardpack_boost !== undefined) setCardPackBoost(p.cardpack_boost);
    showToast(`Applied preset: ${name}`);
  };

  const weightsTotal = weights.common + weights.rare + weights.epic + weights.legendary;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#d4a853] text-lg animate-pulse">Loading config...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-4 bg-[#1a1a25] border border-[#d4a853]/30 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up">
          {toast}
        </div>
      )}

      {/* Rarity Weights */}
      <Section title="🎰 Rarity Weights" trailing={
        <span className={`text-sm font-mono ${weightsTotal === 100 ? "text-green-400" : "text-red-400"}`}>
          Total: {weightsTotal}/100
        </span>
      }>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {(["common", "rare", "epic", "legendary"] as const).map((rarity) => {
            const colors: Record<string, string> = { common: "bg-gray-400", rare: "bg-blue-400", epic: "bg-purple-400", legendary: "bg-yellow-400" };
            return (
              <div key={rarity} className="space-y-1">
                <label className="text-sm text-white/40 capitalize">{rarity}</label>
                <input
                  type="number" min={0} max={100} value={weights[rarity]}
                  onChange={(e) => setWeights({ ...weights, [rarity]: parseInt(e.target.value) || 0 })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-[#d4a853]/50 focus:outline-none"
                />
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${colors[rarity]}`} style={{ width: `${weights[rarity]}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {Object.keys(presets).map((name) => (
            <button key={name} onClick={() => applyPreset(name)}
              className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-lg hover:border-[#d4a853]/40 transition-colors capitalize">
              {name.replace(/_/g, " ")}
            </button>
          ))}
        </div>

        <SaveButton label="Save Weights" saving={saving === "rarity_weights"} disabled={weightsTotal !== 100}
          onClick={() => save("rarity_weights", weights)} />
      </Section>

      {/* Game Mode */}
      <Section title="⚔️ Game Mode">
        <div className="flex gap-4 mb-4">
          {(["slot", "mining"] as const).map((mode) => (
            <button key={mode} onClick={() => setGameMode(mode)}
              className={`px-6 py-3 rounded-lg border font-bold capitalize transition-all ${
                gameMode === mode
                  ? "bg-[#d4a853]/15 border-[#d4a853]/50 text-[#d4a853]"
                  : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
              }`}>
              {mode === "slot" ? "🎰 Slot Machine" : "⛏️ Ancient Mine"}
            </button>
          ))}
        </div>
        <SaveButton label="Save Mode" saving={saving === "game_mode"} onClick={() => save("game_mode", gameMode)} />
      </Section>

      {/* Economy */}
      <Section title="💰 Economy">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <NumberInput label="Building Cost Multiplier" value={costMultiplier} onChange={setCostMultiplier}
            step={0.01} min={1.0} max={2.0} hint={`Level 5 cost = base × ${costMultiplier}⁵ = ×${Math.pow(costMultiplier, 5).toFixed(2)}`} />
          <NumberInput label="Duplicate Building Multiplier" value={dupeCostMultiplier} onChange={setDupeCostMultiplier}
            step={0.01} min={1.0} max={3.0} hint={`3rd copy cost = base × ${dupeCostMultiplier}³ = ×${Math.pow(dupeCostMultiplier, 3).toFixed(2)}`} />
          <NumberInput label="Card Pack Boost (0–1)" value={cardPackBoost} onChange={setCardPackBoost}
            step={0.01} min={0} max={1} hint={`${(cardPackBoost * 100).toFixed(0)}% chance to force card pack per reel`} />
        </div>
        <SaveButton label="Save Economy" saving={saving !== null && saving !== "rarity_weights" && saving !== "game_mode"}
          onClick={async () => {
            await save("cost_multiplier", costMultiplier);
            await save("duplicate_cost_multiplier", dupeCostMultiplier);
            await save("cardpack_boost", cardPackBoost);
          }} />
      </Section>

      {/* Reputation Weights */}
      <Section title="⭐ Reputation Weights">
        <p className="text-white/30 text-xs mb-4">Controls how each stat contributes to reputation score. Higher = more impact.</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          {(["population", "happiness", "building_count", "attack", "defense"] as const).map((key) => (
            <div key={key} className="space-y-1">
              <label className="text-sm text-white/40 capitalize">{key.replace(/_/g, " ")}</label>
              <input
                type="number" step={0.1} min={0} max={50} value={repWeights[key]}
                onChange={(e) => setRepWeights({ ...repWeights, [key]: parseFloat(e.target.value) || 0 })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-[#d4a853]/50 focus:outline-none"
              />
            </div>
          ))}
        </div>
        <SaveButton label="Save Reputation Weights" saving={saving === "reputation_weights"}
          onClick={() => save("reputation_weights", repWeights)} />
      </Section>

      {/* Rank Thresholds */}
      <Section title="🏅 Rank Thresholds">
        <p className="text-white/30 text-xs mb-4">Reputation score needed for each rank (10 ranks: Wanderer → Emperor).</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
          {["Wanderer","Settler","Merchant","Baron","Viscount","Earl","Duke","Archduke","King","Emperor"].map((name, i) => (
            <div key={name} className="space-y-1">
              <label className="text-xs text-white/40">{name}</label>
              <input
                type="number" min={0} value={rankThresholds[i] ?? 0}
                onChange={(e) => {
                  const arr = [...rankThresholds];
                  arr[i] = parseInt(e.target.value) || 0;
                  setRankThresholds(arr);
                }}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#d4a853]/50 focus:outline-none"
              />
            </div>
          ))}
        </div>
        <SaveButton label="Save Thresholds" saving={saving === "rank_thresholds"}
          onClick={() => save("rank_thresholds", rankThresholds)} />
      </Section>

      {/* Live Preview */}
      <Section title="📊 Live Preview">
        <div className="grid grid-cols-4 gap-3">
          {(["common", "rare", "epic", "legendary"] as const).map((r) => {
            const colors: Record<string, string> = { common: "bg-gray-500", rare: "bg-blue-500", epic: "bg-purple-500", legendary: "bg-yellow-500" };
            return (
              <div key={r} className="text-center">
                <div className={`${colors[r]} rounded-lg mx-auto transition-all duration-300`}
                  style={{ width: 48, height: Math.max(8, weights[r] * 2) }} />
                <p className="text-xs mt-1 capitalize text-white/40">{r}</p>
                <p className="text-sm font-bold text-white">{weights[r]}%</p>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

// ─── Events Panel ───

function EventsPanel() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Form state
  const [selectedType, setSelectedType] = useState("gold_rush");
  const [durationHours, setDurationHours] = useState(24);
  const [bonusMultiplier, setBonusMultiplier] = useState(2.0);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const loadEvents = useCallback(async () => {
    try {
      const rows = await fetchActiveEvents();
      setEvents(rows);
    } catch (e: any) {
      showToast("Failed to load events: " + e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadEvents(); }, [loadEvents]);

  const handleCreate = async () => {
    setCreating(true);
    try {
      const now = new Date();
      const end = new Date(now.getTime() + durationHours * 3600 * 1000);
      const typeInfo = EVENT_TYPES.find((t) => t.value === selectedType)!;

      await createEvent({
        event_type: selectedType,
        bonus_multiplier: bonusMultiplier,
        start_date: now.toISOString(),
        end_date: end.toISOString(),
        title: typeInfo.label,
        description: `${typeInfo.label} event with ${bonusMultiplier}x bonus`,
      });

      showToast("✅ Event created!");
      await loadEvents();
    } catch (e: any) {
      showToast(`❌ Error: ${e.message}`);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id);
      showToast("🗑️ Event deleted");
      await loadEvents();
    } catch (e: any) {
      showToast(`❌ Error: ${e.message}`);
    }
  };

  const durationText = durationHours >= 24
    ? `${Math.floor(durationHours / 24)}d ${durationHours % 24}h`
    : `${durationHours}h`;

  const timeRemaining = (endDate: string) => {
    const remaining = Math.max(0, Math.floor((new Date(endDate).getTime() - Date.now()) / 1000));
    if (remaining <= 0) return "Ended";
    const hours = Math.floor(remaining / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    if (hours > 24) return `${Math.floor(hours / 24)}d ${hours % 24}h`;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-4 bg-[#1a1a25] border border-[#d4a853]/30 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up">
          {toast}
        </div>
      )}

      {/* Create Event */}
      <Section title="➕ Create Event">
        {/* Event Type Grid */}
        <div className="mb-6">
          <label className="text-sm text-white/40 mb-2 block">Event Type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {EVENT_TYPES.map((type) => (
              <button key={type.value} onClick={() => setSelectedType(type.value)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-bold transition-all ${
                  selectedType === type.value
                    ? "bg-[#d4a853]/15 border-[#d4a853]/50 text-[#d4a853]"
                    : "bg-white/5 border-white/10 text-white/50 hover:border-white/20"
                }`}>
                <span>{type.icon}</span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-white/40">Duration</label>
            <span className="text-sm font-bold text-[#d4a853] font-mono">{durationText}</span>
          </div>
          <input type="range" min={1} max={168} step={1} value={durationHours}
            onChange={(e) => setDurationHours(parseInt(e.target.value))}
            className="w-full accent-[#d4a853] h-2 bg-white/10 rounded-full appearance-none cursor-pointer" />
          <div className="flex justify-between text-xs text-white/20 mt-1">
            <span>1h</span><span>7 days</span>
          </div>
        </div>

        {/* Bonus Multiplier */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-white/40">Bonus Multiplier</label>
            <span className="text-sm font-bold text-green-400 font-mono">{bonusMultiplier.toFixed(1)}x</span>
          </div>
          <input type="range" min={1} max={5} step={0.5} value={bonusMultiplier}
            onChange={(e) => setBonusMultiplier(parseFloat(e.target.value))}
            className="w-full accent-green-400 h-2 bg-white/10 rounded-full appearance-none cursor-pointer" />
          <div className="flex justify-between text-xs text-white/20 mt-1">
            <span>1x</span><span>5x</span>
          </div>
        </div>

        {/* Preview */}
        <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg mb-6">
          <span className="text-2xl">{EVENT_TYPES.find((t) => t.value === selectedType)?.icon}</span>
          <div>
            <p className="font-bold text-white">{EVENT_TYPES.find((t) => t.value === selectedType)?.label}</p>
            <p className="text-xs text-white/40">{durationText} · {bonusMultiplier.toFixed(1)}x bonus</p>
          </div>
        </div>

        <button onClick={handleCreate} disabled={creating}
          className="w-full bg-[#d4a853] text-[#0a0a0f] font-bold py-3 rounded-xl hover:bg-[#e8c97a] transition-colors disabled:opacity-50 text-lg">
          {creating ? "Creating..." : "⚡ Create Event"}
        </button>
      </Section>

      {/* Active Events */}
      <Section title="📅 Active Events" trailing={
        <button onClick={() => { setLoading(true); loadEvents(); }}
          className="text-sm text-[#d4a853]/60 hover:text-[#d4a853] transition-colors">
          ↻ Refresh
        </button>
      }>
        {loading ? (
          <div className="text-center py-8 text-[#d4a853] animate-pulse">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2 opacity-20">📅</div>
            <p className="text-white/30 text-sm">No active events</p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => {
              const typeInfo = EVENT_TYPES.find((t) => t.value === event.event_type);
              return (
                <div key={event.id} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-2xl">{typeInfo?.icon || "📌"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white truncate">{typeInfo?.label || event.event_type}</p>
                    <p className="text-xs text-white/40">{timeRemaining(event.end_date)} remaining</p>
                  </div>
                  <span className="text-sm font-bold text-green-400 font-mono">
                    {event.bonus_multiplier?.toFixed(1) || "1.0"}x
                  </span>
                  <button onClick={() => handleDelete(event.id)}
                    className="text-red-400/50 hover:text-red-400 transition-colors p-1">
                    🗑️
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </div>
  );
}

// ─── Seasons Panel ───

const SEASON_THEMES = [
  { value: "medieval_festival", label: "Medieval Festival", icon: "👑", color: "text-yellow-400" },
  { value: "dragon_siege", label: "Dragon Siege", icon: "🔥", color: "text-red-400" },
  { value: "harvest_moon", label: "Harvest Moon", icon: "🌙", color: "text-orange-400" },
  { value: "frost_kingdom", label: "Frost Kingdom", icon: "❄️", color: "text-cyan-400" },
  { value: "shadow_war", label: "Shadow War", icon: "🛡️", color: "text-purple-400" },
] as const;

function SeasonsPanel() {
  const [seasons, setSeasons] = useState<SeasonalEventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [selectedTheme, setSelectedTheme] = useState("medieval_festival");
  const [seasonName, setSeasonName] = useState("Medieval Festival");
  const [durationDays, setDurationDays] = useState(7);
  const [chestCosts, setChestCosts] = useState([1, 3, 6, 12]);
  const [rewardTiers, setRewardTiers] = useState<import("../lib/supabase").RewardTier[]>([
    { min_rank: 1, max_rank: 1, gems: 50, gold: 5000, chest_type: "premium" },
    { min_rank: 2, max_rank: 3, gems: 30, gold: 3000, chest_type: "red" },
    { min_rank: 4, max_rank: 10, gems: 15, gold: 1500, chest_type: "emerald" },
    { min_rank: 11, max_rank: 50, gems: 5, gold: 500, chest_type: "wood" },
  ]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const loadSeasons = useCallback(async () => {
    try {
      const rows = await fetchSeasonalEvents();
      setSeasons(rows);
    } catch (e: any) {
      showToast("Failed to load seasons: " + e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadSeasons(); }, [loadSeasons]);

  const handleCreate = async () => {
    setCreating(true);
    try {
      const now = new Date();
      const end = new Date(now.getTime() + durationDays * 24 * 3600 * 1000);

      await createSeasonalEvent({
        name: seasonName,
        theme: selectedTheme,
        start_date: now.toISOString(),
        end_date: end.toISOString(),
        chest_costs: chestCosts,
        is_active: true,
        reward_tiers: rewardTiers,
      });

      showToast("✅ Season created!");
      await loadSeasons();
    } catch (e: any) {
      showToast(`❌ Error: ${e.message}`);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSeasonalEvent(id);
      showToast("🗑️ Season deleted");
      await loadSeasons();
    } catch (e: any) {
      showToast(`❌ Error: ${e.message}`);
    }
  };

  const handleToggle = async (id: string, current: boolean) => {
    try {
      await toggleSeasonalEvent(id, !current);
      showToast(current ? "⏸️ Season deactivated" : "▶️ Season activated");
      await loadSeasons();
    } catch (e: any) {
      showToast(`❌ Error: ${e.message}`);
    }
  };

  const timeRemaining = (endDate: string) => {
    const remaining = Math.max(0, Math.floor((new Date(endDate).getTime() - Date.now()) / 1000));
    if (remaining <= 0) return "Ended";
    const days = Math.floor(remaining / 86400);
    const hours = Math.floor((remaining % 86400) / 3600);
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const chestNames = ["🪵 Wood", "💚 Emerald", "❤️ Royal", "👑 Legendary"];

  return (
    <div className="space-y-8">
      {toast && (
        <div className="fixed top-20 right-4 bg-[#1a1a25] border border-[#d4a853]/30 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up">
          {toast}
        </div>
      )}

      {/* Create Season */}
      <Section title="🏆 Create Seasonal Event">
        {/* Theme Grid */}
        <div className="mb-6">
          <label className="text-sm text-white/40 mb-2 block">Theme</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {SEASON_THEMES.map((theme) => (
              <button key={theme.value} onClick={() => {
                setSelectedTheme(theme.value);
                setSeasonName(theme.label);
              }}
                className={`flex flex-col items-center gap-1 px-3 py-3 rounded-lg border text-sm font-bold transition-all ${
                  selectedTheme === theme.value
                    ? "bg-[#d4a853]/15 border-[#d4a853]/50 text-[#d4a853]"
                    : "bg-white/5 border-white/10 text-white/50 hover:border-white/20"
                }`}>
                <span className="text-xl">{theme.icon}</span>
                <span className="text-xs">{theme.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Season Name */}
        <div className="mb-6">
          <label className="text-sm text-white/40 mb-2 block">Season Name</label>
          <input
            type="text" value={seasonName}
            onChange={(e) => setSeasonName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#d4a853]/50 focus:outline-none"
            placeholder="e.g. Dragon Siege Season 1"
          />
        </div>

        {/* Duration */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-white/40">Duration</label>
            <span className="text-sm font-bold text-[#d4a853] font-mono">{durationDays} days</span>
          </div>
          <input type="range" min={1} max={30} step={1} value={durationDays}
            onChange={(e) => setDurationDays(parseInt(e.target.value))}
            className="w-full accent-[#d4a853] h-2 bg-white/10 rounded-full appearance-none cursor-pointer" />
          <div className="flex justify-between text-xs text-white/20 mt-1">
            <span>1 day</span><span>30 days</span>
          </div>
        </div>

        {/* Chest Key Costs */}
        <div className="mb-6">
          <label className="text-sm text-white/40 mb-3 block">Chest Key Costs</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {chestNames.map((name, i) => (
              <div key={name} className="space-y-1">
                <label className="text-xs text-white/40">{name}</label>
                <input
                  type="number" min={1} max={50} value={chestCosts[i]}
                  onChange={(e) => {
                    const arr = [...chestCosts];
                    arr[i] = parseInt(e.target.value) || 1;
                    setChestCosts(arr);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-[#d4a853]/50 focus:outline-none"
                />
                <p className="text-xs text-white/20">{chestCosts[i]} 🔑</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard Reward Tiers */}
        <div className="mb-6">
          <label className="text-sm text-white/40 mb-3 block">🏅 Leaderboard Reward Tiers</label>
          <div className="space-y-3">
            {rewardTiers.map((tier, i) => (
              <div key={i} className="grid grid-cols-6 gap-2 items-center p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="col-span-6 md:col-span-1">
                  <label className="text-xs text-white/30">Rank</label>
                  <div className="flex gap-1 items-center">
                    <input type="number" min={1} value={tier.min_rank}
                      onChange={(e) => { const arr = [...rewardTiers]; arr[i] = { ...arr[i], min_rank: parseInt(e.target.value) || 1 }; setRewardTiers(arr); }}
                      className="w-14 bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-sm focus:border-[#d4a853]/50 focus:outline-none" />
                    <span className="text-white/30 text-xs">–</span>
                    <input type="number" min={1} value={tier.max_rank}
                      onChange={(e) => { const arr = [...rewardTiers]; arr[i] = { ...arr[i], max_rank: parseInt(e.target.value) || 1 }; setRewardTiers(arr); }}
                      className="w-14 bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-sm focus:border-[#d4a853]/50 focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/30">💎 Gems</label>
                  <input type="number" min={0} value={tier.gems}
                    onChange={(e) => { const arr = [...rewardTiers]; arr[i] = { ...arr[i], gems: parseInt(e.target.value) || 0 }; setRewardTiers(arr); }}
                    className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-sm focus:border-[#d4a853]/50 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-white/30">💰 Gold</label>
                  <input type="number" min={0} value={tier.gold}
                    onChange={(e) => { const arr = [...rewardTiers]; arr[i] = { ...arr[i], gold: parseInt(e.target.value) || 0 }; setRewardTiers(arr); }}
                    className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-sm focus:border-[#d4a853]/50 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-white/30">📦 Chest</label>
                  <select value={tier.chest_type}
                    onChange={(e) => { const arr = [...rewardTiers]; arr[i] = { ...arr[i], chest_type: e.target.value }; setRewardTiers(arr); }}
                    className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-sm focus:border-[#d4a853]/50 focus:outline-none">
                    <option value="wood">Wood</option>
                    <option value="emerald">Emerald</option>
                    <option value="red">Royal</option>
                    <option value="premium">Legendary</option>
                    <option value="none">None</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button onClick={() => setRewardTiers(rewardTiers.filter((_, j) => j !== i))}
                    className="text-red-400/50 hover:text-red-400 text-sm p-1 transition-colors">✕</button>
                </div>
              </div>
            ))}
            <button onClick={() => setRewardTiers([...rewardTiers, { min_rank: rewardTiers.length > 0 ? (rewardTiers[rewardTiers.length-1].max_rank + 1) : 1, max_rank: 100, gems: 5, gold: 500, chest_type: "wood" }])}
              className="w-full py-2 border border-dashed border-white/20 rounded-lg text-white/40 text-sm hover:border-[#d4a853]/40 hover:text-[#d4a853]/60 transition-colors">
              + Add Reward Tier
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg mb-6">
          <span className="text-2xl">{SEASON_THEMES.find((t) => t.value === selectedTheme)?.icon}</span>
          <div>
            <p className="font-bold text-white">{seasonName}</p>
            <p className="text-xs text-white/40">{durationDays} days · Chests: {chestCosts.join(" / ")} 🔑 · {rewardTiers.length} reward tiers</p>
          </div>
        </div>

        <button onClick={handleCreate} disabled={creating || !seasonName.trim()}
          className="w-full bg-[#d4a853] text-[#0a0a0f] font-bold py-3 rounded-xl hover:bg-[#e8c97a] transition-colors disabled:opacity-50 text-lg">
          {creating ? "Creating..." : "🏆 Launch Season"}
        </button>
      </Section>

      {/* Active Seasons */}
      <Section title="📋 Seasonal Events" trailing={
        <button onClick={() => { setLoading(true); loadSeasons(); }}
          className="text-sm text-[#d4a853]/60 hover:text-[#d4a853] transition-colors">
          ↻ Refresh
        </button>
      }>
        {loading ? (
          <div className="text-center py-8 text-[#d4a853] animate-pulse">Loading seasons...</div>
        ) : seasons.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2 opacity-20">🏆</div>
            <p className="text-white/30 text-sm">No seasonal events</p>
          </div>
        ) : (
          <div className="space-y-3">
            {seasons.map((season) => {
              const themeInfo = SEASON_THEMES.find((t) => t.value === season.theme);
              const isEnded = new Date(season.end_date).getTime() < Date.now();
              return (
                <div key={season.id} className={`flex items-center gap-4 p-4 border rounded-xl transition-all ${
                  season.is_active && !isEnded
                    ? "bg-[#d4a853]/5 border-[#d4a853]/30"
                    : "bg-white/5 border-white/10 opacity-60"
                }`}>
                  <span className="text-2xl">{themeInfo?.icon || "🏆"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white truncate">{season.name}</p>
                    <p className="text-xs text-white/40">
                      {themeInfo?.label || season.theme} · {isEnded ? "Ended" : timeRemaining(season.end_date) + " left"}
                    </p>
                    <p className="text-xs text-white/30 mt-0.5">
                      Chests: {(season.chest_costs || [1,3,6,12]).join(" / ")} 🔑
                    </p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    season.is_active && !isEnded ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/30"
                  }`}>
                    {season.is_active && !isEnded ? "ACTIVE" : isEnded ? "ENDED" : "PAUSED"}
                  </span>
                  <button onClick={() => handleToggle(season.id, season.is_active)}
                    className="text-sm text-white/40 hover:text-[#d4a853] transition-colors p-1"
                    title={season.is_active ? "Deactivate" : "Activate"}>
                    {season.is_active ? "⏸️" : "▶️"}
                  </button>
                  <button onClick={() => handleDelete(season.id)}
                    className="text-red-400/50 hover:text-red-400 transition-colors p-1">
                    🗑️
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </div>
  );
}

// ─── Shared UI Components ───

function Section({ title, trailing, children }: { title: string; trailing?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-[#d4a853]">{title}</h2>
        {trailing}
      </div>
      {children}
    </section>
  );
}

function SaveButton({ label, saving, disabled, onClick }: { label: string; saving: boolean; disabled?: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={saving || disabled}
      className="px-5 py-2.5 bg-[#d4a853] text-[#0a0a0f] font-bold rounded-xl hover:bg-[#e8c97a] transition-colors disabled:opacity-40">
      {saving ? "Saving..." : label}
    </button>
  );
}

function NumberInput({ label, value, onChange, step, min, max, hint }: {
  label: string; value: number; onChange: (v: number) => void;
  step: number; min: number; max: number; hint: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-white/40">{label}</label>
      <input type="number" step={step} min={min} max={max} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || min)}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-[#d4a853]/50 focus:outline-none" />
      <p className="text-xs text-white/20">{hint}</p>
    </div>
  );
}
