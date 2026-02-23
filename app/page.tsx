"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronDown, Apple } from "lucide-react";
import Link from "next/link";
import { createContext, useContext } from "react";

/* ═══════════════════════════════════════════
   GAME ICON COMPONENT
   ═══════════════════════════════════════════ */

function GameIcon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  return (
    <Image
      src={`/game/icons/${name}.svg`}
      alt={name}
      width={24}
      height={24}
      className={`${className} object-contain`}
    />
  );
}

/* ═══════════════════════════════════════════
   MODE CONTEXT
   ═══════════════════════════════════════════ */

type GameMode = "slot" | "mining";
const ModeContext = createContext<{ mode: GameMode; setMode: (m: GameMode) => void }>({ mode: "slot", setMode: () => {} });
const useMode = () => useContext(ModeContext);

/* ═══════════════════════════════════════════
   SCROLL-TRIGGERED ANIMATION HOOK
   ═══════════════════════════════════════════ */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimateIn({ children, delay = "0s", className = "" }: { children: React.ReactNode; delay?: string; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`} style={{ transitionDelay: delay }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MODE TOGGLE PILL
   ═══════════════════════════════════════════ */

function ModeToggle() {
  const { mode, setMode } = useMode();
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-full glass border border-[#d4a853]/20">
      <button
        onClick={() => setMode("slot")}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
          mode === "slot" ? "bg-[#d4a853]/20 text-[#d4a853] shadow-inner" : "text-white/40 hover:text-white/60"
        }`}
      >
        <GameIcon name="icon-sparkle" className="w-3.5 h-3.5" /> Fortune
      </button>
      <button
        onClick={() => setMode("mining")}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
          mode === "mining" ? "bg-[#d4a853]/20 text-[#d4a853] shadow-inner" : "text-white/40 hover:text-white/60"
        }`}
      >
        <GameIcon name="icon-pickaxe" className="w-3.5 h-3.5" /> Mining
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SLOT MINI-GAME
   ═══════════════════════════════════════════ */

const SYMBOLS = ["👑", "⚔️", "🏰", "💎", "🛡️", "🎯", "🔥", "⭐"];

function MiniSlot() {
  const [reels, setReels] = useState(["👑", "🏰", "💎"]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [spins, setSpins] = useState(0);

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    setSpins((s) => s + 1);

    let ticks = 0;
    const interval = setInterval(() => {
      setReels([
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      ]);
      ticks++;
      if (ticks > 15) {
        clearInterval(interval);
        const final = [
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        ];
        setReels(final);
        setSpinning(false);
        if (final[0] === final[1] && final[1] === final[2]) {
          setResult("JACKPOT! 🎉");
        } else if (final[0] === final[1] || final[1] === final[2] || final[0] === final[2]) {
          setResult("Nice match! ✨");
        }
      }
    }, 80);
  }, [spinning]);

  return (
    <div className="relative">
      <div className="bg-gradient-to-b from-[#1a1428] to-[#0d0a15] border border-[#d4a853]/20 rounded-3xl p-6 md:p-8 max-w-sm mx-auto">
        <div className="text-center mb-4">
          <p className="text-[#d4a853] text-xs font-bold tracking-widest uppercase">Wheel of Fortune</p>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          {reels.map((symbol, i) => (
            <div
              key={i}
              className={`w-20 h-20 md:w-24 md:h-24 bg-[#0a0a0f] border-2 border-[#d4a853]/30 rounded-2xl flex items-center justify-center text-4xl md:text-5xl transition-transform ${
                spinning ? "animate-pulse scale-95" : "scale-100"
              }`}
            >
              {symbol}
            </div>
          ))}
        </div>

        {result && (
          <div className="text-center mb-4 animate-bounce">
            <span className="text-[#d4a853] font-bold text-lg">{result}</span>
          </div>
        )}

        <button
          onClick={spin}
          disabled={spinning}
          className="w-full py-3.5 bg-gradient-to-r from-[#d4a853] to-[#e8c97a] text-[#0a0a0f] font-bold text-lg rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-[#d4a853]/20"
        >
          {spinning ? "Spinning..." : "⚡ SPIN"}
        </button>

        <p className="text-center text-white/20 text-xs mt-3">
          {spins} spin{spins !== 1 ? "s" : ""} — Try your luck!
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MINING MINI-GAME
   ═══════════════════════════════════════════ */

const MINE_ICONS = ["💎", "🪙", "⛏️", "🪨", "🔥", "🛡️", "📜", "💀"];
const MINE_HIDDEN = "🪨";

function MiniMine() {
  const [grid, setGrid] = useState<string[]>(Array(9).fill(""));
  const [revealed, setRevealed] = useState<boolean[]>(Array(9).fill(false));
  const [picks, setPicks] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    setGrid(Array(9).fill("").map(() => MINE_ICONS[Math.floor(Math.random() * MINE_ICONS.length)]));
  }, []);

  const dig = (i: number) => {
    if (revealed[i]) return;
    const newRevealed = [...revealed];
    newRevealed[i] = true;
    setRevealed(newRevealed);
    setPicks((p) => p + 1);

    if (grid[i] === "💎") setResult("Gem found! 💎");
    else if (grid[i] === "💀") setResult("Trap! 💀");
    else if (grid[i] === "🪙") setResult("Gold! 🪙");
    else setResult(null);
  };

  const reset = () => {
    setGrid(Array(9).fill("").map(() => MINE_ICONS[Math.floor(Math.random() * MINE_ICONS.length)]));
    setRevealed(Array(9).fill(false));
    setPicks(0);
    setResult(null);
  };

  return (
    <div className="relative">
      <div className="bg-gradient-to-b from-[#1a1008] to-[#0d0a05] border border-[#d4a853]/20 rounded-3xl p-6 md:p-8 max-w-sm mx-auto">
        <div className="text-center mb-4">
          <p className="text-[#d4a853] text-xs font-bold tracking-widest uppercase">Deep Mine</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {grid.map((icon, i) => (
            <button
              key={i}
              onClick={() => dig(i)}
              disabled={revealed[i]}
              className={`w-full aspect-square rounded-xl text-2xl md:text-3xl flex items-center justify-center transition-all duration-300 ${
                revealed[i]
                  ? "bg-[#1a1428] border-2 border-[#d4a853]/30 scale-95"
                  : "bg-[#0a0a0f] border-2 border-white/10 hover:border-[#d4a853]/40 hover:scale-105 cursor-pointer"
              }`}
            >
              {revealed[i] ? icon : MINE_HIDDEN}
            </button>
          ))}
        </div>

        {result && (
          <div className="text-center mb-3 animate-bounce">
            <span className="text-[#d4a853] font-bold text-lg">{result}</span>
          </div>
        )}

        <button
          onClick={reset}
          className="w-full py-3.5 bg-gradient-to-r from-[#8b6914] to-[#d4a853] text-[#0a0a0f] font-bold text-lg rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#d4a853]/20"
        >
          ⛏️ NEW MINE
        </button>

        <p className="text-center text-white/20 text-xs mt-3">
          {picks} pick{picks !== 1 ? "s" : ""} — Tap to dig!
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CHARACTER CARD
   ═══════════════════════════════════════════ */

function CharacterCard({
  name,
  title,
  quote,
  image,
  glowColor,
  delay,
}: {
  name: string;
  title: string;
  quote: string;
  image: string;
  color?: string;
  glowColor: string;
  delay: string;
}) {
  return (
    <AnimateIn delay={delay}>
      <div className="group relative flex flex-col items-center text-center">
        {/* Floating character image — no box, no border */}
        <div className="relative z-10 -mb-12">
          {/* Glow behind character */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-12 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
            style={{ background: glowColor }}
          />
          {/* Character PNG — transparent bg shines through */}
          <Image
            src={image}
            alt={name}
            width={160}
            height={200}
            className="w-28 h-36 md:w-32 md:h-40 object-contain drop-shadow-2xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500"
          />
        </div>

        {/* Info card below character */}
        <div
          className="relative w-full pt-14 pb-5 px-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm group-hover:border-opacity-100 transition-all duration-500"
          style={{ borderColor: `${glowColor}15` }}
        >
          {/* Subtle top glow line */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] rounded-full opacity-50 group-hover:opacity-100 group-hover:w-24 transition-all duration-500"
            style={{ background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)` }}
          />

          <h3 className="font-[family-name:var(--font-heading)] text-white font-bold text-base mb-0.5">{name}</h3>
          <p className="text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: glowColor }}>{title}</p>
          <p className="text-white/35 text-sm leading-relaxed italic">&ldquo;{quote}&rdquo;</p>
        </div>
      </div>
    </AnimateIn>
  );
}

/* ═══════════════════════════════════════════
   STORY ARC CARD
   ═══════════════════════════════════════════ */

function StoryArc({
  number,
  title,
  teaser,
  icon,
  delay,
}: {
  number: string;
  title: string;
  teaser: string;
  icon: React.ReactNode;
  delay: string;
}) {
  return (
    <div
      className="relative pl-8 pb-8 border-l border-[#d4a853]/20 last:border-l-0 animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-[#d4a853]/10 border border-[#d4a853]/30 flex items-center justify-center text-[#d4a853]">
        {icon}
      </div>
      <div className="ml-4">
        <span className="text-[#d4a853]/40 text-xs font-mono">Arc {number}</span>
        <h3 className="font-[family-name:var(--font-heading)] text-white font-bold text-lg mt-1">{title}</h3>
        <p className="text-white/40 text-sm leading-relaxed mt-2">{teaser}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass bg-[#0a0a0f]/80 backdrop-blur-xl" : ""}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/game/TimelessIcon.svg" alt="Timeless City" width={32} height={32} className="group-hover:scale-110 transition-transform" />
          <span className="font-[family-name:var(--font-heading)] text-lg font-bold gold-text hidden sm:inline">
            Timeless City
          </span>
        </Link>
        <div className="flex items-center gap-4 md:gap-8 text-sm text-white/60">
          <a href="#story" className="hover:text-[#d4a853] transition-colors hidden md:inline">Story</a>
          <a href="#characters" className="hover:text-[#d4a853] transition-colors hidden md:inline">Characters</a>
          <a href="#play" className="hover:text-[#d4a853] transition-colors hidden md:inline">Play</a>
          <a
            href="#download"
            className="px-5 py-2 bg-[#d4a853]/10 border border-[#d4a853]/30 rounded-full text-[#d4a853] hover:bg-[#d4a853]/20 transition-all text-xs md:text-sm font-bold"
          >
            Download
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */

function HeroSection() {
  const { mode } = useMode();
  const isSlot = mode === "slot";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d18] to-[#0a0a0f]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,100vw)] h-[600px] bg-[#d4a853]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[min(300px,80vw)] h-[300px] bg-[#8b2020]/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#d4a853]/20 rounded-full animate-float"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${5 + i}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs text-[#d4a853] mb-4 animate-fade-in-up">
              {isSlot ? <GameIcon name="icon-sparkle" className="w-3.5 h-3.5" /> : <GameIcon name="icon-pickaxe" className="w-3.5 h-3.5" />}
              <span>{isSlot ? "A kingdom lies in ruins. Will you rebuild it?" : "Ancient mines hold untold riches. Will you dig deep?"}</span>
            </div>

            <div className="mb-6 animate-fade-in-up">
              <ModeToggle />
            </div>

            <h1
              className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.15s" }}
            >
              {isSlot ? (
                <>
                  <span className="text-white">The Wheel</span><br />
                  <span className="text-white">Spins.</span><br />
                  <span className="gold-text">Fate Answers.</span>
                </>
              ) : (
                <>
                  <span className="text-white">The Depths</span><br />
                  <span className="text-white">Call.</span><br />
                  <span className="gold-text">Fortune Awaits.</span>
                </>
              )}
            </h1>

            <p
              className="text-base md:text-lg text-white/50 max-w-lg mb-8 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              {isSlot
                ? <>Deep beneath a fallen castle lies the Wheel of Fortune — an ancient device that spins gold from nothing. King Aldric needs a champion.<span className="text-[#d4a853]"> That champion is you.</span></>
                : <>Beneath the ruins lie ancient mines filled with gold, gems, relics, and traps. Every pick of the axe reveals a new fortune — or danger.<span className="text-[#d4a853]"> Dig deep, champion.</span></>
              }
            </p>

            <div
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4 animate-fade-in-up"
              style={{ animationDelay: "0.45s" }}
            >
              <a
                href="#download"
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#d4a853] to-[#e8c97a] text-[#0a0a0f] font-bold rounded-2xl hover:scale-105 transition-all shadow-lg shadow-[#d4a853]/20 animate-glow"
              >
                <Apple className="w-5 h-5" />
                <span>Play Free on iOS</span>
              </a>
              <a
                href="#story"
                className="flex items-center gap-2 px-6 py-4 glass rounded-2xl text-white/60 hover:text-white transition-colors"
              >
                <GameIcon name="icon-scroll" className="w-4 h-4" />
                <span>Read the Story</span>
              </a>
            </div>

            <div
              className="flex items-center gap-8 mt-10 animate-fade-in-up justify-center lg:justify-start"
              style={{ animationDelay: "0.6s" }}
            >
              {[
                { value: "Free", label: "To Play" },
                { value: "9", label: "Story Arcs" },
                { value: "50+", label: "Quests" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl md:text-2xl font-bold gold-text font-[family-name:var(--font-heading)]">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-white/30 mt-1 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mini Game (switches with mode) */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {isSlot ? <MiniSlot /> : <MiniMine />}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-5 h-5 text-[#d4a853]/30" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   STORY SECTION
   ═══════════════════════════════════════════ */

function StorySection() {
  const { mode } = useMode();
  const isSlot = mode === "slot";

  return (
    <section id="story" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4a853]/[0.02] to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6">
        <AnimateIn>
          <div className="text-center mb-16">
            <div className="ornament-divider max-w-xs mx-auto mb-6">
              <GameIcon name="icon-scroll" className="w-4 h-4" />
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold mb-4">
              <span className="gold-text">The Chronicle</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto text-sm md:text-base">
              {isSlot ? "Nine story arcs. One destiny. Every spin writes a new chapter." : "Nine story arcs. One destiny. Every dig uncovers a new chapter."}
            </p>
          </div>
        </AnimateIn>

        {/* Opening narrative */}
        <AnimateIn delay="0.1s">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 mb-12">
            <div className="flex items-start gap-4">
              <Image src="/game/King.png" alt="King Aldric" width={64} height={64} className="w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 border-[#d4a853]/30 object-cover flex-shrink-0" />
              <div>
                <p className="text-[#d4a853] text-xs font-bold mb-1">King Aldric</p>
                <p className="text-white/60 text-sm md:text-base leading-relaxed italic">
                  {isSlot
                    ? <>&ldquo;Welcome, brave soul. My kingdom lies in ruins — war, famine, and dark magic have torn it apart. I have waited long for someone like you. Will you take up this burden? Will you restore what was lost?&rdquo;</>
                    : <>&ldquo;Welcome, brave soul. Beneath our ruined city lie ancient mines — rich with gold, gems, and secrets. I need someone bold enough to dig into the darkness. Will you descend for the kingdom?&rdquo;</>
                  }
                </p>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* Story arcs timeline */}
        <div className="space-y-0">
          {isSlot ? (
            <>
              <StoryArc number="I" title="The Fallen Kingdom" teaser="A ruined city, a desperate king, and a mysterious Wheel of Fortune hidden beneath the castle. Your journey begins with a single spin." icon={<GameIcon name="icon-crown" className="w-4 h-4" />} delay="0s" />
              <StoryArc number="II" title="Shadows at the Border" teaser="Your growing wealth attracts dark forces. Raiders wearing the sigil of a forgotten house march toward your walls. Train soldiers — quickly." icon={<GameIcon name="icon-swords" className="w-4 h-4" />} delay="0.1s" />
              <StoryArc number="III" title="The Wizard's Secret" teaser="Merwyn confesses: he created the Wheel centuries ago with forbidden magic. It consumed a kingdom once before. And it's learning from you." icon={<GameIcon name="icon-sparkle" className="w-4 h-4" />} delay="0.2s" />
              <StoryArc number="IV" title="The Pretender" teaser="A man claiming to be Prince Edric — lost son of King Thorn — appears with an army. His claim to the throne may be legitimate." icon={<GameIcon name="icon-shield" className="w-4 h-4" />} delay="0.3s" />
              <StoryArc number="V" title="The Dark Wheel" teaser="The Wheel is alive. It feeds on ambition, on desire, on the spinning itself. It whispers to Merwyn, asking to be set free." icon={<GameIcon name="icon-energy" className="w-4 h-4" />} delay="0.4s" />
              <StoryArc number="VI" title="War of Crowns" teaser="The Pretender's army marches. Merwyn offers to unlock the Wheel's full power — but the cost would bind it to the city forever." icon={<GameIcon name="icon-swords" className="w-4 h-4" />} delay="0.5s" />
              <StoryArc number="VII" title="The Endless Throne" teaser="Other kingdoms with their own Wheels emerge. The age of isolated kingdoms ends. A new age begins — the Age of Wheels." icon={<GameIcon name="icon-castle" className="w-4 h-4" />} delay="0.6s" />
              <StoryArc number="VIII" title="The Sword & The Anvil" teaser="Sir Aldric the Knight and Master Borin the Blacksmith join your cause. New allies, new powers, new forges to master." icon={<GameIcon name="icon-star" className="w-4 h-4" />} delay="0.7s" />
              <StoryArc number="IX" title="The Medallion's Call" teaser="A mysterious medallion pulses with ancient power. The reputation system awakens. Your rank among rulers is about to change everything." icon={<GameIcon name="icon-gem" className="w-4 h-4" />} delay="0.8s" />
            </>
          ) : (
            <>
              <StoryArc number="I" title="The Fallen Kingdom" teaser="A ruined city, a desperate king, and ancient mines hidden beneath the castle. Your journey begins with a single pick." icon={<GameIcon name="icon-crown" className="w-4 h-4" />} delay="0s" />
              <StoryArc number="II" title="Shadows in the Tunnels" teaser="Your growing riches attract dark forces. Strange creatures stir in the deeper tunnels. Arm yourself — quickly." icon={<GameIcon name="icon-swords" className="w-4 h-4" />} delay="0.1s" />
              <StoryArc number="III" title="The Wizard's Secret" teaser="Merwyn confesses: he opened the mines centuries ago with forbidden magic. Something ancient sleeps below. And it's waking." icon={<GameIcon name="icon-sparkle" className="w-4 h-4" />} delay="0.2s" />
              <StoryArc number="IV" title="The Pretender" teaser="A man claiming to be Prince Edric appears with an army. He wants the mines — and the throne. His claim may be legitimate." icon={<GameIcon name="icon-shield" className="w-4 h-4" />} delay="0.3s" />
              <StoryArc number="V" title="The Living Mine" teaser="The mine is alive. It shifts, grows, and reshapes itself. It feeds on ambition and whispers to those who dig too deep." icon={<GameIcon name="icon-energy" className="w-4 h-4" />} delay="0.4s" />
              <StoryArc number="VI" title="War of Crowns" teaser="The Pretender's army marches. Merwyn offers to unlock the mine's deepest vein — but the cost would bind it to the city forever." icon={<GameIcon name="icon-swords" className="w-4 h-4" />} delay="0.5s" />
              <StoryArc number="VII" title="The Endless Depths" teaser="Other kingdoms with their own mines emerge. The age of isolated kingdoms ends. A new age begins — the Age of Depths." icon={<GameIcon name="icon-castle" className="w-4 h-4" />} delay="0.6s" />
              <StoryArc number="VIII" title="The Sword & The Anvil" teaser="Sir Aldric the Knight and Master Borin the Blacksmith join your cause. New allies, new forges, new ores to master." icon={<GameIcon name="icon-star" className="w-4 h-4" />} delay="0.7s" />
              <StoryArc number="IX" title="The Medallion's Call" teaser="A mysterious medallion pulses with ancient power deep in the mines. Your rank among rulers is about to change everything." icon={<GameIcon name="icon-gem" className="w-4 h-4" />} delay="0.8s" />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CHARACTERS SECTION
   ═══════════════════════════════════════════ */

function CharactersSection() {
  return (
    <section id="characters" className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="ornament-divider max-w-xs mx-auto mb-6">
            <GameIcon name="icon-army" className="w-4 h-4" />
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold mb-4">
            <span className="gold-text">Your Allies</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto text-sm md:text-base">
            Each character has their own story, secrets, and motives.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <CharacterCard
            name="King Aldric"
            title="The Weary Ruler"
            quote="I am old and weary. I cannot rebuild alone. Will you take up this burden?"
            image="/game/King.png"
            color="border-[#d4a853]/40"
            glowColor="#d4a853"
            delay="0s"
          />
          <CharacterCard
            name="Merwyn the Wizard"
            title="Keeper of Secrets"
            quote="I created the Wheel. Centuries ago, with magic that should never have been used."
            image="/game/Wizard.png"
            color="border-purple-500/40"
            glowColor="#a855f7"
            delay="0.1s"
          />
          <CharacterCard
            name="Sir Aldric"
            title="Knight-Commander"
            quote="A true ruler must know the art of war. I shall advise you in all matters of battle."
            image="/game/Knight.png"
            color="border-red-500/40"
            glowColor="#ef4444"
            delay="0.2s"
          />
          <CharacterCard
            name="Master Borin"
            title="The Blacksmith"
            quote="Every great kingdom was built on steel and fire. Bring me your cards — I'll forge them into something greater."
            image="/game/Blacksmith.png"
            color="border-orange-500/40"
            glowColor="#f97316"
            delay="0.3s"
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FEATURES SECTION
   ═══════════════════════════════════════════ */

function FeaturesSection() {
  const { mode } = useMode();
  const isSlot = mode === "slot";

  const slotFeatures = [
    { icon: <GameIcon name="icon-spinner" className="w-6 h-6" />, title: "Spin the Wheel", desc: "An ancient device that spins gold from nothing. Match symbols for gold, troops, gems, and rare rewards." },
    { icon: <GameIcon name="icon-castle" className="w-6 h-6" />, title: "Build Your City", desc: "Construct taverns, barracks, farms, and more. Each building shapes your economy and defense." },
    { icon: <GameIcon name="icon-swords" className="w-6 h-6" />, title: "Wage War", desc: "Train armies, find opponents, and fight for glory. Mini-games add skill-based combat bonuses." },
    { icon: <GameIcon name="icon-trophy" className="w-6 h-6" />, title: "Rise in Rank", desc: "From Wanderer to Emperor — your reputation grows with every building, battle, and citizen." },
    { icon: <GameIcon name="icon-sparkle" className="w-6 h-6" />, title: "Live Events", desc: "Gold Rush, Battle Frenzy, Harvest Feast — limited-time events with massive bonus multipliers." },
    { icon: <GameIcon name="icon-army" className="w-6 h-6" />, title: "Compete Globally", desc: "Leaderboards for Wealth, Power, and Army. Prove you are the greatest lord in the realm." },
  ];

  const miningFeatures = [
    { icon: <GameIcon name="icon-pickaxe" className="w-6 h-6" />, title: "Dig the Depths", desc: "Tap tiles to reveal gold, gems, relics, and traps. Every pick is a gamble — fortune or danger." },
    { icon: <GameIcon name="icon-castle" className="w-6 h-6" />, title: "Build Your City", desc: "Use mined resources to construct taverns, barracks, farms, and more. Shape your economy." },
    { icon: <GameIcon name="icon-swords" className="w-6 h-6" />, title: "Wage War", desc: "Train armies with troop tokens found in the mines. Fight for glory with skill-based combat." },
    { icon: <GameIcon name="icon-mine" className="w-6 h-6" />, title: "Explore Deeper", desc: "Surface, Tunnels, Caverns — each depth level offers richer rewards and greater dangers." },
    { icon: <GameIcon name="icon-gem" className="w-6 h-6" />, title: "Find Rare Cards", desc: "Discover card packs hidden in the mines. Collect and forge powerful cards to boost your kingdom." },
    { icon: <GameIcon name="icon-army" className="w-6 h-6" />, title: "Compete Globally", desc: "Leaderboards for Wealth, Power, and Army. Prove you are the greatest lord in the realm." },
  ];

  const features = isSlot ? slotFeatures : miningFeatures;

  return (
    <section id="play" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4a853]/[0.02] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        <AnimateIn>
          <div className="text-center mb-16">
            <div className="ornament-divider max-w-xs mx-auto mb-6">
              <GameIcon name="icon-energy" className="w-4 h-4" />
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold mb-4">
              <span className="gold-text">Forge Your Legacy</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto text-sm md:text-base">
              {isSlot ? "Four pillars of gameplay. One seamless medieval experience." : "Mine, build, battle, and conquer. The depths hold your destiny."}
            </p>
          </div>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <AnimateIn key={f.title} delay={`${i * 0.08}s`}>
              <div className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#d4a853]/30 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-[#d4a853]/10 flex items-center justify-center text-[#d4a853] mb-4 group-hover:bg-[#d4a853]/20 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/35 leading-relaxed">{f.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   WIZARD QUOTE (INTERLUDE)
   ═══════════════════════════════════════════ */

function WizardQuote() {
  const { mode } = useMode();
  const isSlot = mode === "slot";

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(500px,100vw)] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      </div>
      <AnimateIn>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <Image src="/game/Wizard.png" alt="Merwyn" width={80} height={80} className="w-20 h-20 rounded-full border-2 border-purple-500/30 mx-auto mb-6 object-cover" />
          <blockquote className="font-[family-name:var(--font-heading)] text-xl md:text-2xl text-white/70 leading-relaxed italic mb-4">
            {isSlot
              ? <>&ldquo;The Wheel is not just a machine of fortune. It is alive. It feeds on ambition, on desire, on the spinning itself. Every turn makes it stronger.&rdquo;</>
              : <>&ldquo;The mines are not mere tunnels of stone. They breathe, they shift, they remember. Every pick awakens something deeper. Dig wisely.&rdquo;</>
            }
          </blockquote>
          <p className="text-[#d4a853]/60 text-sm">
            {isSlot ? "— Merwyn the Wizard, Arc V: The Dark Wheel" : "— Merwyn the Wizard, Arc V: The Living Mine"}
          </p>
        </div>
      </AnimateIn>
    </section>
  );
}

/* ═══════════════════════════════════════════
   DOWNLOAD SECTION
   ═══════════════════════════════════════════ */

function DownloadSection() {
  return (
    <section id="download" className="relative py-24 md:py-32">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,100vw)] h-[600px] bg-[#d4a853]/5 rounded-full blur-[150px] pointer-events-none" />
      </div>

      <AnimateIn>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <Image src="/game/Crown.png" alt="Crown" width={80} height={80} className="w-20 h-20 mx-auto mb-8 animate-float object-contain" />

          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold mb-6">
            <span className="text-white">Your Throne</span>{" "}
            <span className="gold-text">Awaits</span>
          </h2>

          <p className="text-white/40 max-w-lg mx-auto mb-10 leading-relaxed text-sm md:text-base">
            King Aldric waits for his champion. Download free and begin your reign today.
          </p>

        <a
          href="https://apps.apple.com/app/timeless-city"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#d4a853] to-[#e8c97a] text-[#0a0a0f] font-bold text-lg rounded-2xl hover:scale-105 transition-all shadow-lg shadow-[#d4a853]/20 animate-glow"
        >
          <Apple className="w-6 h-6" />
          <div className="text-left">
            <div className="text-[10px] font-normal opacity-70 leading-none">Download on the</div>
            <div className="text-base font-bold leading-tight">App Store</div>
          </div>
        </a>

        <p className="text-xs text-white/20 mt-6">
          Requires iOS 17.0 or later. Free with optional in-app purchases.
        </p>
        </div>
      </AnimateIn>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/game/TimelessIcon.svg" alt="Timeless City" width={20} height={20} />
            <span className="font-[family-name:var(--font-heading)] text-sm text-white/40">
              Timeless City
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-white/30">
            <Link href="/privacy" className="hover:text-[#d4a853] transition-colors">Privacy Policy</Link>
            <a href="mailto:support@thetimeless.city" className="hover:text-[#d4a853] transition-colors">Contact</a>
          </div>

          <div className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Timeless City. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function Home() {
  const [mode, setMode] = useState<GameMode>("slot");

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <Navbar />
      <main>
        <HeroSection />
        <StorySection />
        <CharactersSection />
        <WizardQuote />
        <FeaturesSection />
        <DownloadSection />
      </main>
      <Footer />
    </ModeContext.Provider>
  );
}
