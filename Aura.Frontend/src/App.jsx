import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Compass,
  Sparkles,
  MessageCircle,
  User,
  Heart,
  X,
  Play,
  Pause,
  Mic,
  Send,
  Phone,
  Video,
  Upload,
  ArrowLeft,
  Check,
  Plus,
  MapPin,
  Clock,
  ShieldCheck,
  Mail,
  Lock,
  Camera,
  MessageSquare,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Global styles: keyframes for the "alive" motion the brief asks for */
/* ------------------------------------------------------------------ */
const GlobalStyle = () => (
  <style>{`
    @keyframes auraFloat {
      0%, 100% { transform: translate(0px, 0px) scale(1); }
      50% { transform: translate(18px, -26px) scale(1.04); }
    }
    .aura-float { animation: auraFloat 9s ease-in-out infinite; }

    @keyframes auraWave {
      0%, 100% { transform: scaleY(var(--min, 0.25)); }
      50% { transform: scaleY(var(--max, 1)); }
    }
    .aura-wave-bar {
      transform-origin: bottom center;
      animation-name: auraWave;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }

    @keyframes auraPulseGlow {
      0%, 100% { box-shadow: 0 0 18px 0 rgba(236, 72, 153, 0.45), 0 0 0 0 rgba(168, 85, 247, 0.0); }
      50% { box-shadow: 0 0 38px 8px rgba(236, 72, 153, 0.65), 0 0 20px 4px rgba(168, 85, 247, 0.35); }
    }
    .aura-pulse { animation: auraPulseGlow 2.6s ease-in-out infinite; }

    @keyframes auraSpinSlow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .aura-spin-slow { animation: auraSpinSlow 6s linear infinite; }

    @keyframes auraFadeUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .aura-fade-up { animation: auraFadeUp 0.5s ease-out both; }

    .aura-scrollbar::-webkit-scrollbar { width: 6px; }
    .aura-scrollbar::-webkit-scrollbar-thumb { background: rgba(236,72,153,0.35); border-radius: 999px; }
    .aura-scrollbar::-webkit-scrollbar-track { background: transparent; }
  `}</style>
);

/* ------------------------------------------------------------------ */
/*  Reusable bits                                                      */
/* ------------------------------------------------------------------ */

const Logo = ({ size = "md" }) => {
  const dims = size === "lg" ? "w-14 h-14" : "w-9 h-9";
  const text = size === "lg" ? "text-xl" : "text-base";
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`${dims} rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shrink-0 aura-pulse`}
      >
        <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none">
          <path
            d="M2 12h2l2-6 3 12 3-16 3 14 2-8 2 4h3"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className={`${text} font-bold text-white tracking-tight`}>Aura</span>
    </div>
  );
};

/** Animated waveform. `bars` count, `active` toggles animation, `color` variant */
const Waveform = ({
  bars = 40,
  height = 48,
  className = "",
  barClassName = "bg-gradient-to-t from-pink-500 to-purple-400",
  gap = "gap-[3px]",
  active = true,
}) => {
  const seeds = useMemo(
    () =>
      Array.from({ length: bars }, () => ({
        base: 20 + Math.random() * 80,
        min: 0.15 + Math.random() * 0.25,
        max: 0.6 + Math.random() * 0.4,
        dur: 0.7 + Math.random() * 0.9,
        delay: -(Math.random() * 2),
      })),
    [bars]
  );

  return (
    <div
      className={`flex items-end ${gap} ${className}`}
      style={{ height }}
    >
      {seeds.map((s, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-full ${barClassName} ${active ? "aura-wave-bar" : ""}`}
          style={{
            height: `${s.base}%`,
            "--min": active ? s.min : 1,
            "--max": active ? s.max : 1,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

/** Floating glassy background shapes shared by landing / auth screens */
const FloatingBackdrop = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute top-16 left-16 w-32 h-32 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl aura-float"
      style={{ animationDelay: "-1s" }}
    />
    <div
      className="absolute bottom-24 left-40 w-16 h-16 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl aura-float"
      style={{ animationDelay: "-4s" }}
    />
    <div
      className="absolute top-1/3 right-16 w-40 h-40 rounded-full bg-purple-600/20 blur-3xl aura-float"
      style={{ animationDelay: "-2.5s" }}
    />
    <div
      className="absolute bottom-16 right-24 w-24 h-24 rounded-full bg-pink-500/20 blur-2xl aura-float"
      style={{ animationDelay: "-6s" }}
    />
  </div>
);

const GradientButton = ({ children, className = "", pulse = false, ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:brightness-110 active:brightness-95 transition ${
      pulse ? "aura-pulse" : ""
    } ${className}`}
  >
    {children}
  </button>
);

const GhostButton = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center gap-2 rounded-full font-medium text-white/80 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition ${className}`}
  >
    {children}
  </button>
);

const GlassCard = ({ children, className = "" }) => (
  <div
    className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl ${className}`}
  >
    {children}
  </div>
);

/* ------------------------------------------------------------------ */
/*  Top navigation for the main app                                    */
/* ------------------------------------------------------------------ */

const NAV_ITEMS = [
  { key: "discover", label: "Discover", icon: Compass },
  { key: "blind-date", label: "Blind Date", icon: Sparkles },
  { key: "chat", label: "Chat", icon: MessageCircle },
  { key: "edit-profile", label: "My Profile", icon: User },
];

const NavBar = ({ current, onNavigate }) => (
  <div className="sticky top-0 z-30 px-4 sm:px-8 pt-5">
    <div className="max-w-6xl mx-auto flex items-center justify-between bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 sm:px-6 py-3">
      <button onClick={() => onNavigate("discover")} className="shrink-0">
        <Logo />
      </button>

      <nav className="hidden md:flex items-center gap-1 bg-black/20 rounded-full p-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const activeItem =
            current === item.key ||
            (current === "chat" && item.key === "chat");
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition ${
                activeItem
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Icon size={15} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <button className="w-10 h-10 rounded-full bg-black/30 border border-white/10 flex items-center justify-center text-pink-400 hover:text-pink-300 transition shrink-0">
        <Heart size={17} fill="currentColor" />
      </button>
    </div>

    {/* mobile nav */}
    <div className="md:hidden max-w-6xl mx-auto mt-3 flex items-center justify-between bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const activeItem = current === item.key;
        return (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-full text-[10px] font-medium transition ${
              activeItem
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                : "text-white/50"
            }`}
          >
            <Icon size={15} />
            {item.label}
          </button>
        );
      })}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  1. Landing                                                         */
/* ------------------------------------------------------------------ */

const LandingView = ({ onNavigate }) => (
  <div className="relative min-h-screen overflow-hidden flex flex-col">
    <FloatingBackdrop />

    {/* full-bleed waveform behind the wordmark */}
    <div className="absolute inset-x-0 bottom-0 h-[46%] opacity-70">
      <Waveform bars={90} height="100%" gap="gap-[4px]" className="px-6" />
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0612] via-transparent to-[#0a0612]" />

    <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-8">
      <Logo />
      <span className="text-xs sm:text-sm text-white/50">Voice-first dating</span>
    </header>

    <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
      <span className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-pink-200 bg-pink-500/10 border border-pink-400/20 rounded-full px-4 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
        Now in early access
      </span>

      <h1 className="text-[16vw] sm:text-8xl md:text-9xl font-extrabold leading-none bg-gradient-to-b from-pink-300 via-pink-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
        AURA
      </h1>

      <p className="mt-6 text-lg sm:text-xl text-white/70">
        Fall for a voice, not a filter.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <GradientButton
          pulse
          onClick={() => onNavigate("register-interests")}
          className="px-8 py-3.5 text-base"
        >
          Create Account <ArrowLeft size={16} className="rotate-180" />
        </GradientButton>
        <GhostButton onClick={() => onNavigate("login")} className="px-8 py-3.5 text-base">
          Sign In
        </GhostButton>
      </div>
    </main>

    <footer className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 px-6 sm:px-10 py-6 text-xs text-white/40 border-t border-white/5">
      <span>© 2026 Aura Labs, Inc.</span>
      <div className="flex items-center gap-5">
        <span className="hover:text-white/70 cursor-pointer transition">Terms</span>
        <span className="hover:text-white/70 cursor-pointer transition">Privacy</span>
        <span className="hover:text-white/70 cursor-pointer transition">Support</span>
      </div>
    </footer>
  </div>
);

/* ------------------------------------------------------------------ */
/*  2. Login                                                            */
/* ------------------------------------------------------------------ */

const LoginView = ({ onNavigate }) => (
  <div className="relative min-h-screen flex items-center justify-center px-6 py-10">
    <FloatingBackdrop />

    <button
      onClick={() => onNavigate("landing")}
      className="absolute top-8 left-6 sm:left-10 z-10 flex items-center gap-2 text-sm text-white/70 hover:text-white bg-white/5 border border-white/10 rounded-full px-4 py-2 transition"
    >
      <ArrowLeft size={15} /> Back
    </button>

    <GlassCard className="relative z-10 w-full max-w-md p-8 sm:p-10">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-5 aura-pulse">
          <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none">
            <path
              d="M2 12h2l2-6 3 12 3-16 3 14 2-8 2 4h3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
        <p className="text-sm text-white/50 mt-1">Sign in to hear who's waiting.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-white/60 mb-1.5 block">Email</label>
          <div className="flex items-center gap-2.5 bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus-within:border-pink-400/50 transition">
            <Mail size={16} className="text-white/40" />
            <input
              type="email"
              placeholder="you@example.com"
              className="bg-transparent outline-none text-sm text-white placeholder-white/30 w-full"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-white/60">Password</label>
          </div>
          <div className="flex items-center gap-2.5 bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus-within:border-pink-400/50 transition">
            <Lock size={16} className="text-white/40" />
            <input
              type="password"
              placeholder="••••••••"
              className="bg-transparent outline-none text-sm text-white placeholder-white/30 w-full"
            />
          </div>
          <div className="text-right mt-1.5">
            <span className="text-xs text-pink-300 hover:text-pink-200 cursor-pointer transition">
              Forgot password?
            </span>
          </div>
        </div>

        <GradientButton
          onClick={() => onNavigate("discover")}
          className="w-full py-3.5 mt-2"
        >
          Sign In
        </GradientButton>

        <div className="flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[11px] text-white/40">or continue with</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <GhostButton className="w-full py-3">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.85-.08-1.66-.22-2.44H12v4.62h6.46a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.56-5.17 3.56-8.81Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1A12 12 0 0 0 12 24Z"
            />
            <path
              fill="#FBBC05"
              d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.27a12 12 0 0 0 0 10.78l4-3.1Z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.61l4 3.1C6.22 6.86 8.87 4.75 12 4.75Z"
            />
          </svg>
          Continue with Google
        </GhostButton>
        <GhostButton className="w-full py-3">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
            <path d="M16.365 1.43c0 1.14-.475 2.14-1.24 2.9-.83.83-2.15 1.47-3.26 1.38-.13-1.09.47-2.24 1.19-2.95.79-.82 2.16-1.44 3.31-1.33Zm3.03 6.9c-.1.06-1.83 1.05-1.83 3.24 0 2.54 2.23 3.44 2.29 3.46-.02.07-.36 1.24-1.19 2.44-.72 1.04-1.48 2.08-2.66 2.1-1.15.02-1.52-.68-2.84-.68-1.32 0-1.73.66-2.82.7-1.14.04-2-1.12-2.73-2.16-1.5-2.13-2.65-6.03-1.1-8.66.76-1.31 2.12-2.13 3.6-2.15 1.12-.02 2.17.75 2.85.75.68 0 1.96-.93 3.3-.79.56.02 2.14.23 3.15 1.75Z" />
          </svg>
          Continue with Apple
        </GhostButton>
      </div>

      <p className="text-center text-sm text-white/50 mt-7">
        New to Aura?{" "}
        <span
          onClick={() => onNavigate("register-interests")}
          className="text-pink-300 hover:text-pink-200 cursor-pointer font-medium"
        >
          Create an account
        </span>
      </p>
    </GlassCard>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Shared registration shell (steps + left panel)                     */
/* ------------------------------------------------------------------ */

const STEPS = [
  { n: 1, label: "The Basics" },
  { n: 2, label: "Photos" },
  { n: 3, label: "Interests" },
  { n: 4, label: "Final Touch" },
];

const RegisterShell = ({ activeStep, stepLabel, children, onNavigate }) => (
  <div className="relative min-h-screen flex flex-col lg:flex-row">
    <FloatingBackdrop />

    {/* left informational panel */}
    <div className="relative z-10 w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-14 py-14 lg:py-0">
      <Logo />
      <h1 className="mt-8 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
        Build your <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">portfolio</span>
      </h1>
      <p className="mt-2 text-sm text-white/50">
        Step {activeStep} of 4: <span className="text-white/70">{stepLabel}</span>
      </p>

      <div className="mt-8 space-y-3 max-w-md">
        {STEPS.map((s) => {
          const done = s.n < activeStep;
          const active = s.n === activeStep;
          return (
            <div
              key={s.n}
              className={`flex items-center justify-between rounded-2xl px-5 py-4 border transition ${
                active
                  ? "border-pink-400/50 bg-white/5"
                  : "border-white/5 bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    done
                      ? "bg-gradient-to-br from-pink-500 to-purple-600 text-white"
                      : active
                      ? "bg-white/10 text-white border border-pink-400/50"
                      : "bg-white/5 text-white/40"
                  }`}
                >
                  {done ? <Check size={14} /> : s.n}
                </span>
                <span
                  className={`text-sm font-medium ${
                    done || active ? "text-white" : "text-white/40"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {done && (
                <span className="text-[11px] font-semibold text-pink-300">DONE</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 max-w-md">
        <Waveform bars={44} height={56} gap="gap-[3px]" />
      </div>
    </div>

    {/* right form panel */}
    <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center px-6 py-10 lg:py-14">
      <GlassCard className="w-full max-w-md p-8 sm:p-10">{children}</GlassCard>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  3. Register — Interests (music genres)                             */
/* ------------------------------------------------------------------ */

const GENRES = [
  "Rock",
  "Jazz",
  "EDM",
  "Lo-fi",
  "Pop",
  "Hip-hop",
  "Classical",
  "R&B",
  "Indie",
  "Techno",
  "Soul",
  "Metal",
];

const RegisterInterestsView = ({ onNavigate, selectedGenres, setSelectedGenres }) => {
  const toggle = (g) => {
    setSelectedGenres((prev) => {
      if (prev.includes(g)) return prev.filter((x) => x !== g);
      if (prev.length >= 5) return prev;
      return [...prev, g];
    });
  };

  return (
    <RegisterShell activeStep={3} stepLabel="Interests" onNavigate={onNavigate}>
      <div className="flex items-center justify-between mb-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-pink-200 bg-pink-500/10 border border-pink-400/20 rounded-full px-3 py-1">
          <MessageSquare size={11} /> Music
        </span>
        <span className="text-xs font-semibold text-pink-300">
          Selected {selectedGenres.length}/5
        </span>
      </div>

      <h2 className="text-2xl font-bold text-white mt-3">What makes your soul sing?</h2>
      <p className="text-sm text-white/50 mt-1.5">
        Pick up to 5 genres so we can match you by sound.
      </p>

      <div className="grid grid-cols-3 gap-2.5 mt-6">
        {GENRES.map((g) => {
          const active = selectedGenres.includes(g);
          return (
            <button
              key={g}
              onClick={() => toggle(g)}
              className={`flex items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-sm font-medium border transition ${
                active
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white border-transparent"
                  : "bg-black/20 text-white/60 border-white/10 hover:border-white/20 hover:text-white/80"
              }`}
            >
              {g}
              {active && <Check size={13} />}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-8">
        <GhostButton onClick={() => onNavigate("register-interests")} className="px-5 py-2.5 text-sm">
          <ArrowLeft size={14} /> Back
        </GhostButton>
        <GradientButton
          onClick={() => onNavigate("register-profile")}
          className="px-6 py-2.5 text-sm"
        >
          Continue to Finish <ArrowLeft size={14} className="rotate-180" />
        </GradientButton>
      </div>

      <p className="text-center text-xs text-white/40 mt-6">
        Already have an account?{" "}
        <span onClick={() => onNavigate("login")} className="text-pink-300 hover:text-pink-200 cursor-pointer">
          Sign in
        </span>
      </p>
    </RegisterShell>
  );
};

/* ------------------------------------------------------------------ */
/*  4. Register — Profile (final touch)                                */
/* ------------------------------------------------------------------ */

const RegisterProfileView = ({ onNavigate, profile, setProfile }) => (
  <RegisterShell activeStep={4} stepLabel="Final Touch" onNavigate={onNavigate}>
    <h2 className="text-2xl font-bold text-white">Complete your profile</h2>
    <p className="text-sm text-white/50 mt-1.5">This is the first thing your matches will see.</p>

    <div className="mt-6 flex items-center gap-4 bg-black/20 border border-white/10 rounded-2xl p-4">
      <div className="relative shrink-0">
        <div className="w-16 h-16 rounded-full bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden">
          {profile.photo ? (
            <img src={profile.photo} alt="" className="w-full h-full object-cover" />
          ) : (
            <User size={26} className="text-white/30" />
          )}
        </div>
        <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-pink-500 border-2 border-[#1a1023] flex items-center justify-center">
          <Check size={11} className="text-white" />
        </span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">Upload photo</p>
        <p className="text-xs text-white/40">JPG or PNG, up to 5MB.</p>
        <button
          onClick={() =>
            setProfile((p) => ({
              ...p,
              photo:
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&q=80",
            }))
          }
          className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-white/80 bg-white/10 hover:bg-white/15 rounded-full px-3.5 py-1.5 transition"
        >
          <Upload size={12} /> Change
        </button>
      </div>
    </div>

    <div className="mt-5">
      <label className="text-xs font-medium text-white/60 mb-1.5 block">Name</label>
      <input
        value={profile.name}
        onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-pink-400/50 transition"
      />
    </div>

    <div className="mt-5">
      <label className="text-xs font-medium text-white/60 mb-1.5 flex items-center gap-1.5">
        <MessageSquare size={12} /> Bio
      </label>
      <textarea
        maxLength={250}
        rows={3}
        value={profile.bio}
        onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
        placeholder="Tell people what makes you, you..."
        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-pink-400/50 transition resize-none"
      />
      <p className="text-right text-[11px] text-white/30 mt-1">{profile.bio.length} / 250</p>
    </div>

    <div className="flex items-center justify-between mt-6">
      <GhostButton onClick={() => onNavigate("register-interests")} className="px-5 py-2.5 text-sm">
        <ArrowLeft size={14} /> Back
      </GhostButton>
      <GradientButton pulse onClick={() => onNavigate("discover")} className="px-6 py-2.5 text-sm">
        <Sparkles size={14} /> Finish &amp; Enter App
      </GradientButton>
    </div>

    <p className="text-center text-xs text-white/40 mt-6">
      Already have an account?{" "}
      <span onClick={() => onNavigate("login")} className="text-pink-300 hover:text-pink-200 cursor-pointer">
        Sign in
      </span>
    </p>
  </RegisterShell>
);

/* ------------------------------------------------------------------ */
/*  5. Discover                                                        */
/* ------------------------------------------------------------------ */

const DISCOVER_USERS = [
  {
    id: 1,
    name: "Maya",
    age: 27,
    distance: "3 km away",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop&q=80",
    tags: ["Film photography", "Vinyl", "Lo-fi"],
  },
  {
    id: 2,
    name: "Liam",
    age: 29,
    distance: "5 km away",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop&q=80",
    tags: ["Indie rock", "Hiking", "Espresso"],
  },
  {
    id: 3,
    name: "Sofia",
    age: 25,
    distance: "2 km away",
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop&q=80",
    tags: ["Wine tasting", "Jazz", "Painting"],
  },
  {
    id: 4,
    name: "Noah",
    age: 31,
    distance: "7 km away",
    photo:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=800&fit=crop&q=80",
    tags: ["Techno", "Cycling", "Sourdough"],
  },
];

const DiscoverView = () => {
  const [passed, setPassed] = useState([]);
  const visible = DISCOVER_USERS.filter((u) => !passed.includes(u.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
        Discover your{" "}
        <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          frequency
        </span>
      </h1>
      <p className="text-white/50 mt-2 text-sm sm:text-base">
        People near you, matched by sound and soul.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {visible.map((u) => (
          <div
            key={u.id}
            className="relative rounded-3xl overflow-hidden h-[440px] group aura-fade-up"
          >
            <img
              src={u.photo}
              alt={u.name}
              className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />

            <span className="absolute top-4 left-4 text-xs font-medium text-white bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1">
              {u.distance}
            </span>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-2xl font-bold text-white">
                {u.name} <span className="font-normal text-white/80">{u.age}</span>
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-2 mb-4">
                {u.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-medium text-white/85 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPassed((p) => [...p, u.id])}
                  className="w-11 h-11 rounded-full bg-black/50 border border-white/15 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition"
                >
                  <X size={18} />
                </button>
                <button className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white hover:brightness-110 transition aura-pulse">
                  <Heart size={18} fill="currentColor" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {visible.length === 0 && (
          <div className="col-span-full text-center py-20 text-white/40">
            You're all caught up — check back later for new frequencies.
          </div>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  6. Chat                                                             */
/* ------------------------------------------------------------------ */

const CONVERSATIONS = [
  {
    id: 1,
    name: "Maya",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80",
    online: true,
    preview: "Sent a voice note",
    time: "2m",
    unread: 2,
    messages: [
      { from: "them", text: "Your playlist genuinely made my week", time: "9:41" },
      { from: "me", text: "Right? Wait until you hear side B", time: "9:42" },
      { from: "them", voice: true, duration: "0:24", time: "9:44" },
      { from: "me", text: "Okay that laugh at 0:12 — I'm obsessed", time: "9:45" },
    ],
  },
  {
    id: 2,
    name: "Liam",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80",
    online: false,
    preview: "That gig was unreal",
    time: "1h",
    unread: 0,
    messages: [
      { from: "them", text: "That gig was unreal, you have to come next time", time: "8:10" },
      { from: "me", text: "Deal. Send me the date", time: "8:15" },
    ],
  },
  {
    id: 3,
    name: "Sofia",
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&q=80",
    online: true,
    preview: "Wine & Vinyl on Friday?",
    time: "3h",
    unread: 1,
    messages: [{ from: "them", text: "Wine & Vinyl on Friday?", time: "6:02" }],
  },
  {
    id: 4,
    name: "Noah",
    photo:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&q=80",
    online: false,
    preview: "Ha! Same energy",
    time: "1d",
    unread: 0,
    messages: [{ from: "them", text: "Ha! Same energy", time: "Yesterday" }],
  },
];

const VoiceNoteBubble = ({ duration }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-2xl px-4 py-3 max-w-xs">
      <button
        onClick={() => setPlaying((p) => !p)}
        className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shrink-0"
      >
        {playing ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
      </button>
      <Waveform bars={22} height={22} gap="gap-[2px]" active={playing} barClassName="bg-white/70" />
      <span className="text-[11px] text-white/50 shrink-0">{duration}</span>
    </div>
  );
};

const ChatView = () => {
  const [activeId, setActiveId] = useState(1);
  const [draft, setDraft] = useState("");
  const active = CONVERSATIONS.find((c) => c.id === activeId);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [activeId]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
      <GlassCard className="grid grid-cols-1 md:grid-cols-[300px_1fr] h-[640px] overflow-hidden">
        {/* sidebar */}
        <div className="border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-lg font-bold text-white">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto aura-scrollbar">
            {CONVERSATIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`w-full flex items-center gap-3 px-5 py-3 text-left transition ${
                  activeId === c.id ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <div className="relative shrink-0">
                  <img src={c.photo} alt={c.name} className="w-11 h-11 rounded-full object-cover" />
                  {c.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#1a1023]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white truncate">{c.name}</span>
                    <span className="text-[11px] text-white/40 shrink-0 ml-2">{c.time}</span>
                  </div>
                  <p className="text-xs text-white/50 truncate">{c.preview}</p>
                </div>
                {c.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-[10px] font-bold text-white flex items-center justify-center shrink-0">
                    {c.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* conversation */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <img src={active.photo} alt={active.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-white">{active.name}</p>
                <p className="text-[11px] text-white/40 flex items-center gap-1">
                  {active.online && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                  {active.online ? "Online now" : "Offline"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white/50">
              <Phone size={17} className="hover:text-white cursor-pointer transition" />
              <Video size={18} className="hover:text-white cursor-pointer transition" />
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto aura-scrollbar px-5 py-5 space-y-4">
            {active.messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.from === "me" ? "items-end" : "items-start"}`}>
                {m.voice ? (
                  <VoiceNoteBubble duration={m.duration} />
                ) : (
                  <div
                    className={`max-w-xs sm:max-w-sm rounded-2xl px-4 py-2.5 text-sm ${
                      m.from === "me"
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                        : "bg-white/10 text-white/90 border border-white/10"
                    }`}
                  >
                    {m.text}
                  </div>
                )}
                <span className="text-[10px] text-white/30 mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          <div className="px-5 py-4 border-t border-white/10 shrink-0">
            <div className="flex items-center gap-3 bg-black/25 border border-white/10 rounded-full px-4 py-2.5">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Send a message..."
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder-white/30"
              />
              <Mic size={17} className="text-white/40 hover:text-white/70 cursor-pointer transition shrink-0" />
              <button className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  7. Blind Date                                                       */
/* ------------------------------------------------------------------ */

const BlindDateView = () => {
  const [playing, setPlaying] = useState(true);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-pink-200 bg-pink-500/10 border border-pink-400/20 rounded-full px-3.5 py-1.5">
          <Sparkles size={12} /> Blind Date
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4">
          A <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">92% chemistry</span> match is waiting
        </h1>
        <p className="text-white/50 mt-2 text-sm sm:text-base">
          Listen first, see later. Meet at a spot right between you both.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-8 flex flex-col items-center text-center">
          <span className="text-[11px] font-semibold tracking-wide text-white/40 mb-6">
            MYSTERY MATCH
          </span>
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-500/60 to-purple-600/60 flex items-center justify-center mb-6 aura-pulse">
            <span className="text-5xl font-bold text-white">?</span>
          </div>
          <p className="text-sm text-white/60 mb-4">Their voice intro</p>

          <div className="w-full flex items-center gap-3 bg-black/25 border border-white/10 rounded-2xl px-4 py-3 mb-8">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shrink-0"
            >
              {playing ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
            </button>
            <Waveform bars={26} height={24} gap="gap-[2px]" active={playing} barClassName="bg-white/70" />
            <span className="text-xs text-white/50 shrink-0">0:18</span>
          </div>

          <div className="flex items-center gap-3 w-full">
            <GhostButton className="flex-1 py-3">
              <X size={15} /> Pass
            </GhostButton>
            <GradientButton pulse className="flex-1 py-3">
              <Sparkles size={15} /> I'm in
            </GradientButton>
          </div>
        </GlassCard>

        <GlassCard className="overflow-hidden">
          <div className="relative h-52">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-[#1a0f2e] to-black">
              <svg width="100%" height="100%" viewBox="0 0 400 210" className="opacity-40">
                {Array.from({ length: 9 }).map((_, i) => (
                  <line key={"h" + i} x1="0" y1={i * 26} x2="400" y2={i * 26} stroke="#ec4899" strokeWidth="1" />
                ))}
                {Array.from({ length: 12 }).map((_, i) => (
                  <line key={"v" + i} x1={i * 34} y1="0" x2={i * 34} y2="210" stroke="#a855f7" strokeWidth="1" />
                ))}
              </svg>
            </div>
            <span className="absolute top-4 left-4 flex items-center gap-1.5 text-xs font-medium text-white bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1">
              <MapPin size={12} /> Suggested midpoint
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center shadow-[0_0_30px_10px_rgba(236,72,153,0.5)]">
                <MapPin size={18} className="text-white" />
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-white">Lumiere Wine &amp; Vinyl</h3>
            <p className="text-sm text-white/50 mt-1">A candlelit listening bar with natural wine.</p>

            <div className="flex items-center gap-8 mt-5">
              <div className="flex items-start gap-2.5">
                <Clock size={16} className="text-pink-400 mt-0.5" />
                <div>
                  <p className="text-[11px] text-white/40">Proposed time</p>
                  <p className="text-sm font-medium text-white">Friday, 7:30 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-pink-400 mt-0.5" />
                <div>
                  <p className="text-[11px] text-white/40">Distance</p>
                  <p className="text-sm font-medium text-white">6 min from each of you</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-400/20 rounded-xl px-4 py-2.5">
              <ShieldCheck size={14} />
              Verified public venue · Safe meeting spot
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  8. Edit profile                                                     */
/* ------------------------------------------------------------------ */

const TagGroup = ({ label, values, setValues, placeholder }) => {
  const [draft, setDraft] = useState("");

  const add = () => {
    const v = draft.trim();
    if (!v) return;
    setValues((prev) => [...prev, v]);
    setDraft("");
  };

  const remove = (v) => setValues((prev) => prev.filter((x) => x !== v));

  return (
    <div className="bg-black/20 border border-white/10 rounded-2xl p-5">
      <p className="text-sm font-semibold text-white mb-3">{label}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {values.map((v) => (
          <span
            key={v}
            className="flex items-center gap-1.5 text-xs font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full pl-3 pr-2 py-1.5"
          >
            {v}
            <button onClick={() => remove(v)} className="hover:opacity-70 transition">
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder={placeholder}
          className="flex-1 bg-transparent border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-pink-400/50 transition"
        />
        <button
          onClick={add}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shrink-0"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
};

const EditProfileView = ({ profile, setProfile }) => {
  const [movies, setMovies] = useState(["In the Mood for Love", "Her", "Lost in Translation"]);
  const [music, setMusic] = useState(["Lo-fi", "Jazz", "Indie"]);
  const [hobbies, setHobbies] = useState(["Film photography", "Vinyl hunting", "Pottery"]);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Your profile</h1>
      <p className="text-white/50 mt-1.5 text-sm">Keep it fresh — this is your first impression.</p>

      <GlassCard className="p-6 sm:p-7 mt-6">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-full bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden">
              {profile.photo ? (
                <img src={profile.photo} className="w-full h-full object-cover" alt="" />
              ) : (
                <User size={26} className="text-white/30" />
              )}
            </div>
            <button className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-pink-500 border-2 border-[#1a1023] flex items-center justify-center">
              <Camera size={11} className="text-white" />
            </button>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Profile photo</p>
            <p className="text-xs text-white/40">A clear, well-lit shot works best.</p>
          </div>
        </div>

        <div className="mt-5">
          <label className="text-xs font-medium text-white/60 mb-1.5 block">Name</label>
          <input
            value={profile.name}
            onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-pink-400/50 transition"
          />
        </div>

        <div className="mt-5">
          <label className="text-xs font-medium text-white/60 mb-1.5 flex items-center gap-1.5">
            <MessageSquare size={12} /> Bio
          </label>
          <textarea
            maxLength={250}
            rows={2}
            value={profile.bio}
            onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-pink-400/50 transition resize-none"
          />
          <p className="text-right text-[11px] text-white/30 mt-1">{profile.bio.length} / 250</p>
        </div>
      </GlassCard>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-white">My Interests</h2>
        <p className="text-xs text-white/40 mt-1">Add or remove tags to fine-tune your matches.</p>

        <div className="space-y-4 mt-4">
          <TagGroup label="Favorite Movies" values={movies} setValues={setMovies} placeholder="Add to favorite movies..." />
          <TagGroup label="Music" values={music} setValues={setMusic} placeholder="Add to music..." />
          <TagGroup label="Hobbies" values={hobbies} setValues={setHobbies} placeholder="Add to hobbies..." />
        </div>
      </div>

      <div className="flex justify-end mt-7">
        <GradientButton onClick={save} className="px-6 py-3 text-sm">
          <Check size={15} /> {saved ? "Saved!" : "Save Changes"}
        </GradientButton>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  App shell                                                           */
/* ------------------------------------------------------------------ */

const APP_VIEWS = ["discover", "blind-date", "chat", "edit-profile"];

export default function App() {
  const [view, setView] = useState("landing");
  const [selectedGenres, setSelectedGenres] = useState(["Jazz", "Lo-fi", "Indie"]);
  const [profile, setProfile] = useState({
    name: "Jordan Rivera",
    bio: "Sound-led romantic. I fall for a good b-side and a slow Sunday.",
    photo: "",
  });

  const isAppShell = APP_VIEWS.includes(view);

  return (
    <div className="min-h-screen bg-[#0a0612] text-white font-sans selection:bg-pink-500/30">
      <GlobalStyle />

      {isAppShell && <NavBar current={view} onNavigate={setView} />}

      {view === "landing" && <LandingView onNavigate={setView} />}
      {view === "login" && <LoginView onNavigate={setView} />}
      {view === "register-interests" && (
        <RegisterInterestsView
          onNavigate={setView}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
      )}
      {view === "register-profile" && (
        <RegisterProfileView onNavigate={setView} profile={profile} setProfile={setProfile} />
      )}
      {view === "discover" && <DiscoverView />}
      {view === "blind-date" && <BlindDateView />}
      {view === "chat" && <ChatView />}
      {view === "edit-profile" && <EditProfileView profile={profile} setProfile={setProfile} />}
    </div>
  );
}
