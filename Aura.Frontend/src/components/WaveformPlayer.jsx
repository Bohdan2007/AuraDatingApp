import { useMemo, useState } from 'react'
import { Play, Pause } from 'lucide-react'

// Deterministic pseudo-random bar heights so the waveform looks organic
// but doesn't reshuffle on every re-render.
function useBars(seed, count) {
  return useMemo(() => {
    let s = seed
    const rand = () => {
      s = (s * 9301 + 49297) % 233280
      return s / 233280
    }
    return Array.from({ length: count }, () => 0.25 + rand() * 0.75)
  }, [seed, count])
}

export default function WaveformPlayer({
  duration = '0:14',
  seed = 42,
  barCount = 40,
  size = 'md',
  accent = true,
}) {
  const [playing, setPlaying] = useState(false)
  const bars = useBars(seed, barCount)

  const heightClass = size === 'sm' ? 'h-8' : size === 'lg' ? 'h-14' : 'h-10'
  const buttonSize = size === 'lg' ? 'h-12 w-12' : 'h-10 w-10'

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setPlaying((p) => !p)}
        className={`flex ${buttonSize} shrink-0 items-center justify-center rounded-full bg-aura-gradient text-white shadow-glow-sm transition-transform hover:scale-105 active:scale-95`}
        aria-label={playing ? 'Pause voice intro' : 'Play voice intro'}
      >
        {playing ? <Pause size={18} fill="white" /> : <Play size={18} fill="white" className="ml-0.5" />}
      </button>

      <div className={`flex ${heightClass} flex-1 items-center gap-[3px] overflow-hidden`}>
        {bars.map((h, i) => (
          <span
            key={i}
            className={`w-[3px] shrink-0 rounded-full ${
              accent ? 'bg-gradient-to-t from-fuchsia-500 to-pink-400' : 'bg-white/30'
            } ${playing ? 'animate-pulseSlow' : ''}`}
            style={{
              height: `${h * 100}%`,
              animationDelay: `${i * 0.03}s`,
            }}
          />
        ))}
      </div>

      <span className="shrink-0 text-xs font-medium text-white/50">{duration}</span>
    </div>
  )
}
