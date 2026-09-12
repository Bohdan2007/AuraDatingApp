import { Radio, Sparkles, MessageCircle, User, Heart, AudioWaveform } from 'lucide-react'

const LINKS = [
  { key: 'discover', label: 'Discover', icon: Radio },
  { key: 'blinddate', label: 'Blind Date', icon: Sparkles },
  { key: 'chat', label: 'Chat', icon: MessageCircle },
  { key: 'editprofile', label: 'My Profile', icon: User },
]

export default function Navbar({ view, setView }) {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      <div className="glass-card mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-5">
        <button onClick={() => setView('landing')} className="flex items-center gap-2 focus:outline-none">
          <span className="flex h-9 w-9 items-center justify-center rounded-full gradient-surface shadow-[0_0_20px_-6px_rgba(236,72,153,0.7)]">
            <AudioWaveform size={16} className="text-white" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white">Aura</span>
        </button>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
          {LINKS.map((link) => {
            const Icon = link.icon
            const active = view === link.key
            return (
              <button
                key={link.key}
                onClick={() => setView(link.key)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  active
                    ? 'gradient-surface text-white shadow-[0_0_18px_-6px_rgba(236,72,153,0.7)]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Icon size={14} />
                {link.label}
              </button>
            )
          })}
        </nav>

        <button
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-pink-400 transition-colors hover:bg-white/10"
          aria-label="Your matches"
        >
          <Heart size={17} fill="currentColor" />
        </button>
      </div>

      {/* Mobile nav */}
      <div className="glass-card mx-auto mt-2 flex max-w-6xl items-center justify-between gap-1 p-1 md:hidden">
        {LINKS.map((link) => {
          const Icon = link.icon
          const active = view === link.key
          return (
            <button
              key={link.key}
              onClick={() => setView(link.key)}
              className={`flex flex-1 flex-col items-center gap-1 rounded-full px-2 py-2 text-[11px] font-medium transition-all ${
                active ? 'gradient-surface text-white' : 'text-white/55'
              }`}
            >
              <Icon size={15} />
              {link.label}
            </button>
          )
        })}
      </div>
    </header>
  )
}
