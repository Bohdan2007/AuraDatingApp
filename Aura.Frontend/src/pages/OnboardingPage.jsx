import { useState } from 'react'
import { Check, ArrowRight } from 'lucide-react'
import { interestOptions, onboardingSteps } from '../data/mockData.js'

const MAX_SELECT = 8

export default function OnboardingPage({ setView }) {
  const [selected, setSelected] = useState(['live-music', 'film-photo', 'hiking', 'vinyl', 'cooking'])

  const toggle = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= MAX_SELECT) return prev
      return [...prev, id]
    })
  }

  const percent = Math.min(100, (selected.length / MAX_SELECT) * 100)

  return (
    <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl grid-cols-1 lg:grid-cols-[380px_1fr]">
      {/* Left panel: steps */}
      <div className="border-b border-white/[0.06] px-6 py-12 lg:border-b-0 lg:border-r lg:px-10">
        <span className="pill !py-1.5 text-white/70">
          <span className="mr-1.5">✨</span>
          Step 3 of 5
        </span>

        <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-white">
          Build your portfolio
        </h1>
        <p className="mt-4 max-w-sm text-white/55">
          Pick the things that light you up. We use these to spark better blind conversations —
          not to judge a book by its cover.
        </p>

        <ol className="mt-14 space-y-5">
          {onboardingSteps.map((step) => {
            const isActive = step.id === 3
            const isDone = step.id < 3
            return (
              <li key={step.id} className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    isDone
                      ? 'bg-aura-gradient text-white'
                      : isActive
                      ? 'border-2 border-pink-400 text-pink-400'
                      : 'border border-white/15 text-white/40'
                  }`}
                >
                  {isDone ? <Check size={16} /> : step.id}
                </span>
                <span
                  className={`font-medium ${
                    isActive ? 'text-white' : isDone ? 'text-white/70' : 'text-white/40'
                  }`}
                >
                  {step.label}
                </span>
              </li>
            )
          })}
        </ol>
      </div>

      {/* Right panel: interest picker */}
      <div className="flex flex-col px-6 py-12 lg:px-10">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-white/50">
            Selected <span className="text-white">{selected.length}</span> / {MAX_SELECT}
          </p>
          <div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-aura-gradient transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <h2 className="mt-6 font-display text-2xl font-bold text-white">
          What could you talk about for hours?
        </h2>

        <div className="mt-8 flex flex-wrap gap-3">
          {interestOptions.map((opt) => {
            const isSelected = selected.includes(opt.id)
            return (
              <button
                key={opt.id}
                onClick={() => toggle(opt.id)}
                className={`pill flex items-center gap-1.5 ${isSelected ? 'pill-selected' : ''}`}
              >
                {isSelected && <Check size={14} />}
                {opt.label}
              </button>
            )
          })}
        </div>

        <div className="mt-auto flex items-center justify-between pt-14">
          <button
            onClick={() => setView('landing')}
            className="text-sm font-medium text-white/50 hover:text-white"
          >
            Back
          </button>
          <button onClick={() => setView('discover')} className="btn-primary">
            Continue
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
