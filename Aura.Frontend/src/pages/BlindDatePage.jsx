import { useState } from 'react'
import { Sparkles, HelpCircle, Navigation2, Clock, MapPin, ShieldCheck, X } from 'lucide-react'
import VoicePlayer from '../components/VoicePlayer.jsx'
import { blindDate } from '../data/mockData.js'
import mapImg from '../assets/map-placeholder.js'

export default function BlindDatePage() {
  const [decision, setDecision] = useState(null)

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 sm:px-10">
      <div className="text-center">
        <span className="pill inline-flex items-center gap-2 !py-1.5 text-white/70">
          <Sparkles size={13} className="text-pink-400" />
          Blind Date
        </span>
        <h1 className="font-display mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          A <span className="gradient-text">{blindDate.chemistryScore}%</span> chemistry match is waiting
        </h1>
        <p className="mx-auto mt-3 max-w-md text-white/55">
          Listen first, see later. Meet at a spot right between you both.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Mystery match */}
        <div className="glass-card flex flex-col items-center p-8 text-center">
          <p className="text-xs font-semibold tracking-widest text-white/45">MYSTERY MATCH</p>

          <div className="relative mt-5 flex h-32 w-32 items-center justify-center rounded-full">
            <div className="absolute inset-0 rounded-full gradient-surface opacity-90 blur-md" />
            <div className="absolute inset-1 rounded-full bg-aura-panel/70 backdrop-blur-sm" />
            <HelpCircle size={42} className="relative text-white" strokeWidth={1.6} />
          </div>

          <p className="mt-5 text-sm font-medium text-white/60">Their voice intro</p>

          <div className="mt-4 w-full rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
            <VoicePlayer duration={blindDate.voiceDuration} seed={92} size="md" />
          </div>

          <div className="mt-7 flex w-full gap-3">
            <button
              onClick={() => setDecision('pass')}
              className={`btn-secondary flex-1 ${decision === 'pass' ? 'opacity-60' : ''}`}
            >
              <X size={16} />
              Pass
            </button>
            <button
              onClick={() => setDecision('in')}
              className={`btn-primary flex-1 ${decision === 'pass' ? 'opacity-40' : ''}`}
            >
              <Sparkles size={16} />
              I'm in
            </button>
          </div>

          {decision === 'in' && (
            <p className="mt-4 text-sm font-medium text-emerald-400">
              You're in — we'll confirm once they say yes too.
            </p>
          )}
          {decision === 'pass' && (
            <p className="mt-4 text-sm font-medium text-white/40">
              No worries — your next mystery match is on the way.
            </p>
          )}
        </div>

        {/* Suggested midpoint */}
        <div className="glass-card overflow-hidden text-left">
          <div className="relative h-44 w-full overflow-hidden">
            <img src={mapImg} alt="Suggested meetup midpoint map" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-aura-panel via-transparent to-transparent" />
            <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              <Navigation2 size={12} className="text-pink-400" />
              Suggested midpoint
            </span>
            <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full gradient-surface shadow-[0_0_25px_-6px_rgba(236,72,153,0.9)]">
              <MapPin size={17} className="text-white" fill="white" />
            </span>
          </div>

          <div className="p-6">
            <h3 className="font-display text-lg font-bold text-white">{blindDate.venue.name}</h3>
            <p className="mt-1 text-sm text-white/55">{blindDate.venue.description}</p>

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-500/15 text-pink-400">
                  <Clock size={15} />
                </span>
                <div>
                  <p className="text-xs text-white/45">Proposed time</p>
                  <p className="font-medium text-white">{blindDate.venue.proposedTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-500/15 text-purple-300">
                  <MapPin size={15} />
                </span>
                <div>
                  <p className="text-xs text-white/45">Distance</p>
                  <p className="font-medium text-white">{blindDate.venue.distance}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3">
              <ShieldCheck size={16} className="shrink-0 text-emerald-400" />
              <p className="text-xs font-medium text-emerald-300/90">
                Verified public venue · Safe meeting spot
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
