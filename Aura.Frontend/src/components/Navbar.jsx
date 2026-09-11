import { Heart } from 'lucide-react'

const NAV_LINKS = [
  { key: 'landing', label: 'How it works' },
  { key: 'blinddate', label: 'Blind Date' },
  { key: 'discover', label: 'Safety' },
  { key: 'chat', label: 'Stories' },
]

export default function Navbar({ view, setView }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-aura-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <button
          onClick={() => setView('landing')}
          className="flex items-center gap-2 focus:outline-none"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-aura-gradient shadow-glow-sm">
            <Heart className="text-white" strokeWidth={2.5} size={18} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white">Aura</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.key}
              onClick={() => setView(link.key)}
              className={`text-sm font-medium transition-colors ${
                view === link.key ? 'text-white' : 'text-white/55 hover:text-white/90'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setView('onboarding')}
            className="hidden text-sm font-medium text-white/70 hover:text-white sm:inline-block"
          >
            Sign in
          </button>
          <button onClick={() => setView('onboarding')} className="btn-primary px-5 py-2.5 text-sm">
            Join free
          </button>
        </div>
      </div>
    </header>
  )
}
