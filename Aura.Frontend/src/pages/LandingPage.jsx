import { ArrowRight, AudioWaveform } from 'lucide-react'
import AnimatedWaveform from '../components/AnimatedWaveform.jsx'

export default function LandingPage({ setView }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-6 py-6 sm:px-10">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full gradient-surface shadow-[0_0_20px_-6px_rgba(236,72,153,0.8)]">
            <AudioWaveform size={16} className="text-white" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold text-white">Aura</span>
        </div>
        <span className="hidden text-sm text-white/45 sm:block">Voice-first dating</span>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
        <span className="pill mb-8 inline-flex items-center gap-2 !py-1.5 text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
          Now in early access
        </span>

        <div className="relative w-full max-w-3xl">
          <AnimatedWaveform
            barCount={72}
            heightClass="h-48 sm:h-56"
            className="absolute inset-0"
          />
          <h1 className="font-display relative text-[4.2rem] font-extrabold leading-none tracking-tight text-transparent sm:text-[7rem]">
            <span className="bg-gradient-to-b from-pink-400 via-fuchsia-400 to-purple-500 bg-clip-text">
              AURA
            </span>
          </h1>
        </div>

        <p className="mt-8 text-lg text-white/65 sm:text-xl">Fall for a voice, not a filter.</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => setView('registerinterests')} className="btn-primary">
            Create Account
            <ArrowRight size={18} />
          </button>
          <button onClick={() => setView('login')} className="btn-secondary">
            Sign In
          </button>
        </div>
      </main>

      <footer className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] px-6 py-6 text-xs text-white/40 sm:flex-row sm:px-10">
        <span>© 2026 Aura Labs, Inc.</span>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white/70">Terms</a>
          <a href="#" className="hover:text-white/70">Privacy</a>
          <a href="#" className="hover:text-white/70">Support</a>
        </div>
      </footer>
    </div>
  )
}
