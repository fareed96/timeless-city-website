import {
  Crown,
  Swords,
  Building2,
  Dices,
  Trophy,
  Shield,
  Flame,
  ChevronDown,
  Star,
  Zap,
  Users,
  Sparkles,
  Apple,
} from "lucide-react";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Crown className="w-7 h-7 text-medieval-gold group-hover:scale-110 transition-transform" />
          <span className="font-[family-name:var(--font-heading)] text-lg font-bold gold-text">
            Timeless City
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#features" className="hover:text-medieval-gold transition-colors">
            Features
          </a>
          <a href="#gameplay" className="hover:text-medieval-gold transition-colors">
            Gameplay
          </a>
          <a href="#reviews" className="hover:text-medieval-gold transition-colors">
            Reviews
          </a>
          <a
            href="#download"
            className="px-5 py-2 bg-medieval-gold/10 border border-medieval-gold/30 rounded-full text-medieval-gold hover:bg-medieval-gold/20 transition-all"
          >
            Download
          </a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-medieval-dark via-[#0d0d18] to-medieval-dark" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-medieval-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-medieval-dark to-transparent" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-medieval-gold/30 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs text-medieval-gold mb-8 animate-fade-in-up">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Available on the App Store</span>
        </div>

        {/* Main heading */}
        <h1
          className="font-[family-name:var(--font-heading)] text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="text-white">Build Your</span>
          <br />
          <span className="gold-text">Medieval Empire</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          Spin the reels of fate, forge a mighty kingdom, train legendary armies,
          and conquer your rivals in this epic strategy adventure.
        </p>

        {/* CTA */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.45s" }}
        >
          <a
            href="#download"
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-medieval-gold to-medieval-gold-light text-medieval-dark font-bold rounded-2xl hover:scale-105 transition-all shadow-lg shadow-medieval-gold/20 animate-glow"
          >
            <Apple className="w-5 h-5" />
            <span>Download Free</span>
          </a>
          <a
            href="#features"
            className="flex items-center gap-2 px-8 py-4 glass rounded-2xl text-white/70 hover:text-white transition-colors"
          >
            <span>Explore Features</span>
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>

        {/* Stats */}
        <div
          className="flex items-center justify-center gap-8 md:gap-16 mt-16 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          {[
            { value: "Free", label: "To Play" },
            { value: "4.8★", label: "Rating" },
            { value: "50+", label: "Quests" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold gold-text font-[family-name:var(--font-heading)]">
                {stat.value}
              </div>
              <div className="text-xs text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-5 h-5 text-medieval-gold/40" />
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <Dices className="w-7 h-7" />,
      title: "Spin the Reels of Fate",
      description:
        "A unique slot machine mechanic determines your fortune — earn gold, resources, troops, and rare rewards with every spin.",
    },
    {
      icon: <Building2 className="w-7 h-7" />,
      title: "Build Your Kingdom",
      description:
        "Construct taverns, blacksmiths, barracks, and more. Upgrade buildings to unlock new abilities and boost your economy.",
    },
    {
      icon: <Swords className="w-7 h-7" />,
      title: "Epic Mini-Game Battles",
      description:
        "Test your reflexes in Sword Strike, rhythm in War Drums, precision in Archer's Eye, and power in Catapult Launch.",
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Train & Command Armies",
      description:
        "Recruit soldiers, archers, cavalry, and elite units. Deploy them strategically to crush your opponents.",
    },
    {
      icon: <Trophy className="w-7 h-7" />,
      title: "Compete on Leaderboards",
      description:
        "Rise through the ranks in Wealth, Power, and Army categories. Prove you are the greatest lord in the realm.",
    },
    {
      icon: <Flame className="w-7 h-7" />,
      title: "Daily Rewards & Events",
      description:
        "Log in daily for streak bonuses, participate in limited-time events, and unlock exclusive achievements.",
    },
  ];

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-medieval-gold/[0.02] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="ornament-divider max-w-xs mx-auto mb-6">
            <Star className="w-4 h-4 text-medieval-gold/50" />
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold mb-4">
            <span className="gold-text">Forge Your Legacy</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto">
            Every decision shapes your destiny. Build, battle, and become legendary.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl glass hover:border-medieval-gold/30 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-medieval-gold/10 flex items-center justify-center text-medieval-gold mb-5 group-hover:bg-medieval-gold/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GameplaySection() {
  const pillars = [
    {
      icon: <Dices className="w-6 h-6" />,
      title: "Spin & Earn",
      description:
        "The slot machine is the heart of your economy. Match symbols to earn gold, food, materials, gems, and even troop reinforcements. Trigger Fever Mode for massive multipliers.",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "City Building",
      description:
        "Place and upgrade over 10 building types across your medieval city. Each building contributes to population, happiness, production, and defense. Balance your economy wisely.",
    },
    {
      icon: <Swords className="w-6 h-6" />,
      title: "Battle Arena",
      description:
        "Enter the War Room to find opponents, deploy your troops, and fight for glory. Win battles to earn rewards and climb the leaderboards. Mini-games add skill-based combat bonuses.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Social & Competitive",
      description:
        "Compete against players worldwide on three leaderboard categories. Complete 15+ achievements, maintain daily streaks, and build the most powerful empire in the realm.",
    },
  ];

  return (
    <section id="gameplay" className="relative py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="ornament-divider max-w-xs mx-auto mb-6">
            <Zap className="w-4 h-4 text-medieval-gold/50" />
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold mb-4">
            <span className="gold-text">How It Plays</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto">
            Four pillars of gameplay woven into one seamless medieval experience.
          </p>
        </div>

        <div className="space-y-6">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="group flex flex-col md:flex-row items-start gap-6 p-8 rounded-2xl glass hover:border-medieval-gold/20 transition-all"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-medieval-gold/10 flex items-center justify-center text-medieval-gold">
                {pillar.icon}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-medieval-gold/50 font-mono">
                    0{i + 1}
                  </span>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-white">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-white/40 leading-relaxed max-w-2xl">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const reviews = [
    {
      name: "MedievalFan92",
      rating: 5,
      text: "The slot mechanic combined with city building is genius. I can't stop playing!",
    },
    {
      name: "StrategyKing",
      rating: 5,
      text: "Finally a mobile game that rewards skill in battles. The mini-games are so addictive.",
    },
    {
      name: "CasualGamer_X",
      rating: 5,
      text: "Beautiful medieval theme, smooth gameplay, and the daily rewards keep me coming back.",
    },
    {
      name: "EmpireBuilder",
      rating: 4,
      text: "Love the city building aspect. Watching my kingdom grow is incredibly satisfying.",
    },
    {
      name: "BattleLord",
      rating: 5,
      text: "The leaderboard competition is fierce. Best strategy game on iOS right now.",
    },
    {
      name: "RealmExplorer",
      rating: 5,
      text: "The attention to detail in the medieval theme is amazing. Feels like a premium game.",
    },
  ];

  return (
    <section id="reviews" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-medieval-gold/[0.02] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="ornament-divider max-w-xs mx-auto mb-6">
            <Trophy className="w-4 h-4 text-medieval-gold/50" />
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold mb-4">
            <span className="gold-text">Voices of the Realm</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto">
            Hear what fellow lords and ladies have to say about their journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="p-6 rounded-2xl glass hover:border-medieval-gold/20 transition-all"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-medieval-gold fill-medieval-gold"
                  />
                ))}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <Star key={`e-${i}`} className="w-4 h-4 text-white/10" />
                ))}
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="text-xs text-medieval-gold/60 font-medium">
                — {review.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DownloadSection() {
  return (
    <section id="download" className="relative py-32">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-medieval-gold/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Crown className="w-16 h-16 text-medieval-gold mx-auto mb-8 animate-float" />

        <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold mb-6">
          <span className="text-white">Begin Your</span>{" "}
          <span className="gold-text">Reign</span>
        </h2>

        <p className="text-white/40 max-w-lg mx-auto mb-10 leading-relaxed">
          Download Timeless City for free and start building your medieval empire
          today. Your throne awaits.
        </p>

        <a
          href="https://apps.apple.com/app/timeless-city"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-medieval-gold to-medieval-gold-light text-medieval-dark font-bold text-lg rounded-2xl hover:scale-105 transition-all shadow-lg shadow-medieval-gold/20 animate-glow"
        >
          <Apple className="w-6 h-6" />
          <div className="text-left">
            <div className="text-[10px] font-normal opacity-70 leading-none">
              Download on the
            </div>
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

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Crown className="w-5 h-5 text-medieval-gold/50" />
            <span className="font-[family-name:var(--font-heading)] text-sm text-white/40">
              Timeless City
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-white/30">
            <Link
              href="/privacy"
              className="hover:text-medieval-gold transition-colors"
            >
              Privacy Policy
            </Link>
            <a href="mailto:support@thetimeless.city" className="hover:text-medieval-gold transition-colors">
              Contact
            </a>
          </div>

          <div className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Timeless City. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <GameplaySection />
        <ReviewsSection />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
