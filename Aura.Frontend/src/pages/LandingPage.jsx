import { Sparkles, ArrowRight, PlayCircle, Heart } from 'lucide-react'
import WaveformPlayer from '../components/WaveformPlayer.jsx'
import { stats } from '../data/mockData.js'

export default function LandingPage({ setView }) {
  return (
    <div className="relative overflow-hidden bg-aura-radial">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
        {/* Left: hero copy */}
        <div>
          <span className="pill inline-flex items-center gap-2 !py-1.5 text-white/70">
            <Sparkles size={14} className="text-pink-400" />
            Voice-first dating, reimagined
          </span>

          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Fall for a <span className="gradient-text">voice</span>,<br />
            not a filter.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
            Aura pairs you on real chemistry with blind, audio-first introductions. See the person
            only once the conversation clicks.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button onClick={() => setView('onboarding')} className="btn-primary">
              Start matching
              <ArrowRight size={18} />
            </button>
            <button className="btn-secondary">
              <PlayCircle size={18} />
              Watch demo
            </button>
          </div>

          <div className="mt-14 flex items-center gap-10">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-bold text-white">{s.value}</p>
                <p className="mt-1 text-sm text-white/45">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: match preview card */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute -inset-10 -z-10 rounded-full bg-aura-gradient opacity-20 blur-[100px]" />

          <div className="glass-card w-full max-w-md animate-floatY p-6 shadow-glow">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-aura-gradient text-lg font-bold text-white">
                ?
              </div>
              <div>
                <p className="font-display font-semibold text-white">Blind match found</p>
                <p className="text-sm text-white/50">92% chemistry score</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/[0.06] bg-black/30 p-5">
              <WaveformPlayer duration="0:14" seed={7} size="lg" />
              <p className="mt-3 text-xs font-medium text-white/40">Voice intro</p>
            </div>

            <div className="mt-5 flex justify-end">
              <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm font-medium text-white/85">
                <Heart size={14} className="fill-pink-500 text-pink-500" />
                It's a match!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
