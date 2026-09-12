import { Check, AudioWaveform } from 'lucide-react'
import { registerSteps } from '../data/mockData.js'
import AnimatedWaveform from './AnimatedWaveform.jsx'

export default function RegisterRail({ activeStep, stepSubtitle }) {
  return (
    <div className="flex flex-col px-6 py-12 sm:px-10 lg:py-16">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full gradient-surface shadow-[0_0_20px_-6px_rgba(236,72,153,0.8)]">
          <AudioWaveform size={16} className="text-white" strokeWidth={2.5} />
        </span>
        <span className="font-display text-lg font-bold text-white">Aura</span>
      </div>

      <h1 className="font-display mt-10 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
        Build your <span className="gradient-text">portfolio</span>
      </h1>
      <p className="mt-3 text-sm text-white/50">
        Step {activeStep} of {registerSteps.length}: {stepSubtitle}
      </p>

      <ol className="mt-10 space-y-3">
        {registerSteps.map((step) => {
          const isDone = step.id < activeStep
          const isActive = step.id === activeStep
          return (
            <li
              key={step.id}
              className={`flex items-center justify-between rounded-2xl border px-5 py-4 transition-all ${
                isActive
                  ? 'border-pink-400/40 bg-white/[0.06]'
                  : isDone
                  ? 'border-white/[0.06] bg-white/[0.02]'
                  : 'border-white/[0.06] bg-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    isDone
                      ? 'gradient-surface text-white'
                      : isActive
                      ? 'border-2 border-pink-400 text-pink-400'
                      : 'border border-white/15 text-white/40'
                  }`}
                >
                  {isDone ? <Check size={13} /> : step.id}
                </span>
                <span className={`font-medium ${isActive ? 'text-white' : isDone ? 'text-white/70' : 'text-white/35'}`}>
                  {step.label}
                </span>
              </div>
              {isDone && <span className="text-xs font-semibold tracking-wide text-pink-400">DONE</span>}
            </li>
          )
        })}
      </ol>

      <div className="mt-auto hidden pt-16 lg:block">
        <AnimatedWaveform barCount={36} heightClass="h-16" className="opacity-70" />
      </div>
    </div>
  )
}
