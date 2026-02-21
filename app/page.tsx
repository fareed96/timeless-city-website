"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Crown,
  Swords,
  Building2,
  Dices,
  Trophy,
  Shield,
  ChevronDown,
  Star,
  Zap,
  Users,
  Sparkles,
  Apple,
  Scroll,
  Gem,
  Castle,
} from "lucide-react";
import Link from "next/link";

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
   CHARACTER CARD
   ═══════════════════════════════════════════ */

function CharacterCard({
  name,
  title,
  quote,
  image,
  color,
  delay,
}: {
  name: string;
  title: string;
  quote: string;
  image: string;
  color: string;
  delay: string;
}) {
  return (
    <div
      className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-[#d4a853]/30 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div className="flex items-start gap-4">
        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 ${color} flex-shrink-0`}>
          <Image src={image} alt={name} width={80} height={80} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-[family-name:var(--font-heading)] text-white font-bold text-base">{name}</h3>
          <p className="text-[#d4a853] text-xs mb-2">{title}</p>
          <p className="text-white/40 text-sm leading-relaxed italic">&ldquo;{quote}&rdquo;</p>
        </div>
      </div>
    </div>
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
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d18] to-[#0a0a0f]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4a853]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#8b2020]/5 rounded-full blur-[100px]" />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs text-[#d4a853] mb-6 animate-fade-in-up">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A kingdom lies in ruins. Will you rebuild it?</span>
            </div>

            <h1
              className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.15s" }}
            >
              <span className="text-white">The Wheel</span>
              <br />
              <span className="text-white">Spins.</span>
              <br />
              <span className="gold-text">Fate Answers.</span>
            </h1>

            <p
              className="text-base md:text-lg text-white/50 max-w-lg mb-8 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              Deep beneath a fallen castle lies the Wheel of Fortune — an ancient device
              that spins gold from nothing. King Aldric needs a champion.
              <span className="text-[#d4a853]"> That champion is you.</span>
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
                <Scroll className="w-4 h-4" />
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

          {/* Right: Mini Slot Game */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <MiniSlot />
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
  return (
    <section id="story" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4a853]/[0.02] to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="ornament-divider max-w-xs mx-auto mb-6">
            <Scroll className="w-4 h-4 text-[#d4a853]/50" />
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold mb-4">
            <span className="gold-text">The Chronicle</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto text-sm md:text-base">
            Nine story arcs. One destiny. Every spin writes a new chapter.
          </p>
        </div>

        {/* Opening narrative */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 mb-12">
          <div className="flex items-start gap-4">
            <Image src="/game/King.png" alt="King Aldric" width={64} height={64} className="w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 border-[#d4a853]/30 object-cover flex-shrink-0" />
            <div>
              <p className="text-[#d4a853] text-xs font-bold mb-1">King Aldric</p>
              <p className="text-white/60 text-sm md:text-base leading-relaxed italic">
                &ldquo;Welcome, brave soul. My kingdom lies in ruins — war, famine, and dark magic have torn it apart.
                I have waited long for someone like you. Will you take up this burden? Will you restore what was lost?&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Story arcs timeline */}
        <div className="space-y-0">
          <StoryArc number="I" title="The Fallen Kingdom" teaser="A ruined city, a desperate king, and a mysterious Wheel of Fortune hidden beneath the castle. Your journey begins with a single spin." icon={<Crown className="w-4 h-4" />} delay="0s" />
          <StoryArc number="II" title="Shadows at the Border" teaser="Your growing wealth attracts dark forces. Raiders wearing the sigil of a forgotten house march toward your walls. Train soldiers — quickly." icon={<Swords className="w-4 h-4" />} delay="0.1s" />
          <StoryArc number="III" title="The Wizard's Secret" teaser="Merwyn confesses: he created the Wheel centuries ago with forbidden magic. It consumed a kingdom once before. And it's learning from you." icon={<Sparkles className="w-4 h-4" />} delay="0.2s" />
          <StoryArc number="IV" title="The Pretender" teaser="A man claiming to be Prince Edric — lost son of King Thorn — appears with an army. His claim to the throne may be legitimate." icon={<Shield className="w-4 h-4" />} delay="0.3s" />
          <StoryArc number="V" title="The Dark Wheel" teaser="The Wheel is alive. It feeds on ambition, on desire, on the spinning itself. It whispers to Merwyn, asking to be set free." icon={<Zap className="w-4 h-4" />} delay="0.4s" />
          <StoryArc number="VI" title="War of Crowns" teaser="The Pretender's army marches. Merwyn offers to unlock the Wheel's full power — but the cost would bind it to the city forever." icon={<Swords className="w-4 h-4" />} delay="0.5s" />
          <StoryArc number="VII" title="The Endless Throne" teaser="Other kingdoms with their own Wheels emerge. The age of isolated kingdoms ends. A new age begins — the Age of Wheels." icon={<Castle className="w-4 h-4" />} delay="0.6s" />
          <StoryArc number="VIII" title="The Sword & The Anvil" teaser="Sir Aldric the Knight and Master Borin the Blacksmith join your cause. New allies, new powers, new forges to master." icon={<Star className="w-4 h-4" />} delay="0.7s" />
          <StoryArc number="IX" title="The Medallion's Call" teaser="A mysterious medallion pulses with ancient power. The reputation system awakens. Your rank among rulers is about to change everything." icon={<Gem className="w-4 h-4" />} delay="0.8s" />
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
            <Users className="w-4 h-4 text-[#d4a853]/50" />
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold mb-4">
            <span className="gold-text">Your Allies</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto text-sm md:text-base">
            Each character has their own story, secrets, and motives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <CharacterCard
            name="King Aldric"
            title="The Weary Ruler"
            quote="I am old and weary. I cannot rebuild alone. Will you take up this burden?"
            image="/game/King.png"
            color="border-[#d4a853]/40"
            delay="0s"
          />
          <CharacterCard
            name="Merwyn the Wizard"
            title="Keeper of Secrets"
            quote="I created the Wheel. Centuries ago, with magic that should never have been used."
            image="/game/Wizard.png"
            color="border-purple-500/40"
            delay="0.1s"
          />
          <CharacterCard
            name="Sir Aldric"
            title="Knight-Commander"
            quote="A true ruler must know the art of war. I shall advise you in all matters of battle."
            image="/game/Knight.png"
            color="border-red-500/40"
            delay="0.2s"
          />
          <CharacterCard
            name="Master Borin"
            title="The Blacksmith"
            quote="Every great kingdom was built on steel and fire. Bring me your cards — I'll forge them into something greater."
            image="/game/Blacksmith.png"
            color="border-orange-500/40"
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
  const features = [
    { icon: <Dices className="w-6 h-6" />, title: "Spin the Wheel", desc: "An ancient device that spins gold from nothing. Match symbols for gold, troops, gems, and rare rewards." },
    { icon: <Building2 className="w-6 h-6" />, title: "Build Your City", desc: "Construct taverns, barracks, farms, and more. Each building shapes your economy and defense." },
    { icon: <Swords className="w-6 h-6" />, title: "Wage War", desc: "Train armies, find opponents, and fight for glory. Mini-games add skill-based combat bonuses." },
    { icon: <Trophy className="w-6 h-6" />, title: "Rise in Rank", desc: "From Wanderer to Emperor — your reputation grows with every building, battle, and citizen." },
    { icon: <Sparkles className="w-6 h-6" />, title: "Live Events", desc: "Gold Rush, Battle Frenzy, Harvest Feast — limited-time events with massive bonus multipliers." },
    { icon: <Users className="w-6 h-6" />, title: "Compete Globally", desc: "Leaderboards for Wealth, Power, and Army. Prove you are the greatest lord in the realm." },
  ];

  return (
    <section id="play" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4a853]/[0.02] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="ornament-divider max-w-xs mx-auto mb-6">
            <Zap className="w-4 h-4 text-[#d4a853]/50" />
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold mb-4">
            <span className="gold-text">Forge Your Legacy</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto text-sm md:text-base">
            Four pillars of gameplay. One seamless medieval experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#d4a853]/30 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#d4a853]/10 flex items-center justify-center text-[#d4a853] mb-4 group-hover:bg-[#d4a853]/20 transition-colors">
                {f.icon}
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/35 leading-relaxed">{f.desc}</p>
            </div>
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
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
      </div>
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Image src="/game/Wizard.png" alt="Merwyn" width={80} height={80} className="w-20 h-20 rounded-full border-2 border-purple-500/30 mx-auto mb-6 object-cover" />
        <blockquote className="font-[family-name:var(--font-heading)] text-xl md:text-2xl text-white/70 leading-relaxed italic mb-4">
          &ldquo;The Wheel is not just a machine of fortune. It is alive. It feeds on ambition,
          on desire, on the spinning itself. Every turn makes it stronger.&rdquo;
        </blockquote>
        <p className="text-[#d4a853]/60 text-sm">— Merwyn the Wizard, Arc V: The Dark Wheel</p>
      </div>
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4a853]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Image src="/game/Crown.png" alt="Crown" width={80} height={80} className="w-20 h-20 mx-auto mb-8 animate-float object-contain" />

        <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold mb-6">
          <span className="text-white">Your Throne</span>{" "}
          <span className="gold-text">Awaits</span>
        </h2>

        <p className="text-white/40 max-w-lg mx-auto mb-10 leading-relaxed text-sm md:text-base">
          The Wheel of Fortune spins beneath the castle. King Aldric waits for his champion.
          Download free and begin your reign today.
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
  return (
    <>
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
    </>
  );
}
