import { useState } from 'react'
import { Check, ArrowLeft, ArrowRight, Music, Guitar, Disc, Radio, Headphones, Mic2, Music2, Disc3 } from 'lucide-react'
import RegisterRail from '../components/RegisterRail.jsx'
import { genreOptions } from '../data/mockData.js'

const ICONS = {
  guitar: Guitar,
  disc: Disc,
  radio: Radio,
  headphones: Headphones,
  music: Music,
  mic2: Mic2,
  music2: Music2,
  disc3: Disc3,
}

const MAX_SELECT = 5

export default function RegisterInterestsPage({ setView }) {
  const [selected, setSelected] = useState(['jazz', 'lofi', 'indie'])

  const toggle = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= MAX_SELECT) return prev
      return [...prev, id]
    })
  }

  return (
    <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-[420px_1fr]">
      <RegisterRail activeStep={3} stepSubtitle="Interests" />

      <div className="flex items-center px-6 pb-12 sm:px-10 lg:py-16">
        <div className="glass-card w-full animate-fade-in-up p-6 sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="pill inline-flex items-center gap-1.5 !py-1.5 text-white/70">
              <Music size={13} className="text-pink-400" />
              Music
            </span>
            <span className="text-sm font-semibold text-pink-400">Selected {selected.length}/{MAX_SELECT}</span>
          </div>

          <h2 className="font-display mt-6 text-2xl font-bold text-white sm:text-3xl">
            What makes your soul sing?
          </h2>
          <p className="mt-2 text-sm text-white/50">Pick up to 5 genres so we can match you by sound.</p>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {genreOptions.map((genre) => {
              const Icon = ICONS[genre.icon]
              const isSelected = selected.includes(genre.id)
              return (
                <button
                  key={genre.id}
                  onClick={() => toggle(genre.id)}
                  className={`pill flex items-center justify-center gap-1.5 ${isSelected ? 'pill-selected' : ''}`}
                >
                  <Icon size={14} />
                  {genre.label}
                  {isSelected && <Check size={13} />}
                </button>
              )
            })}
          </div>

          <div className="mt-9 flex items-center justify-between">
            <button onClick={() => setView('login')} className="btn-secondary">
              <ArrowLeft size={16} />
              Back
            </button>
            <button onClick={() => setView('registerprofile')} className="btn-primary">
              Continue to Finish
              <ArrowRight size={16} />
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-white/45">
            Already have an account?{' '}
            <button onClick={() => setView('login')} className="font-medium text-pink-400 hover:text-pink-300">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
