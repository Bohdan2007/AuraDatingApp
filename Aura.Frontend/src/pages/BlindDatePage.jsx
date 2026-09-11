import { useState } from 'react'
import { Sparkles, HelpCircle, Navigation2, Clock, MapPinned, ShieldCheck, X, Heart } from 'lucide-react'
import WaveformPlayer from '../components/WaveformPlayer.jsx'
import { blindDate } from '../data/mockData.js'
import mapImg from '../assets/map-placeholder.js'

export default function BlindDatePage({ setView }) {
  const [decision, setDecision] = useState(null) // 'in' | 'pass'

  return (
    <div className="relative bg-aura-radial px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-5xl text-center">
        <span className="pill inline-flex items-center gap-2 !py-1.5 text-white/70">
          <Sparkles size={14} className="text-pink-400" />
          Tonight's Blind Date
        </span>

        <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
          A <span className="gradient-text">{blindDate.chemistryScore}% chemistry</span> match is
          waiting
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-white/55">
          Listen to their voice intro. The photo unblurs only when you both say yes.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Mystery match card */}
        <div className="glass-card flex flex-col items-center p-8 text-center">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-700/40 via-purple-700/30 to-pink-700/40 shadow-glow">
            <div className="absolute inset-0 rounded-full bg-black/30 backdrop-blur-md" />
            <HelpCircle size={44} className="relative text-white/80" strokeWidth={1.5} />
          </div>

          <h3 className="mt-5 font-display text-lg font-bold text-white">Mystery match</h3>
          <p className="mt-1 text-sm text-white/50">
            {blindDate.age} · {blindDate.distanceKm} km away · {blindDate.interestHint}
          </p>

          <div className="mt-6 w-full rounded-2xl border border-white/[0.06] bg-black/30 p-4">
            <WaveformPlayer duration={blindDate.voiceDuration} seed={92} size="md" />
            <p className="mt-2 text-left text-xs font-medium text-white/40">Voice introduction</p>
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
              <Heart size={16} fill="white" />
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
              No worries — we'll find your next mystery match soon.
            </p>
          )}
        </div>

        {/* Suggested midpoint card */}
        <div className="glass-card overflow-hidden text-left">
          <div className="relative h-44 w-full overflow-hidden">
            <img src={mapImg} alt="Suggested meetup midpoint map" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-aura-panel via-transparent to-transparent" />
            <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              <Navigation2 size={12} className="text-pink-400" />
              Suggested midpoint
            </span>
            <span className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-aura-gradient shadow-glow-sm">
              <MapPinned size={16} className="text-white" />
            </span>
          </div>

          <div className="p-6">
            <h3 className="font-display text-lg font-bold text-white">{blindDate.venue.name}</h3>
            <p className="mt-1 text-sm text-white/50">
              {blindDate.venue.address} · {blindDate.venue.description}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                <p className="flex items-center gap-1.5 text-xs font-medium text-white/45">
                  <Clock size={13} />
                  Proposed time
                </p>
                <p className="mt-1.5 font-semibold text-white">{blindDate.venue.proposedTime}</p>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                <p className="flex items-center gap-1.5 text-xs font-medium text-white/45">
                  <Navigation2 size={13} />
                  Distance
                </p>
                <p className="mt-1.5 font-semibold text-white">{blindDate.venue.distance}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3">
              <ShieldCheck size={16} className="shrink-0 text-emerald-400" />
              <p className="text-xs font-medium text-emerald-300/90">
                Public venue · location shared with a trusted contact for safety.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-5xl justify-center">
        <button onClick={() => setView('discover')} className="text-sm font-medium text-white/45 hover:text-white">
          Back to Discover
        </button>
      </div>
    </div>
  )
}
