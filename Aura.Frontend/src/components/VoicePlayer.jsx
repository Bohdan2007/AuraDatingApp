import { useMemo, useState } from 'react'
import { Play, Pause } from 'lucide-react'

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

export default function VoicePlayer({
  duration = '0:14',
  seed = 42,
  barCount = 34,
  size = 'md',
}) {
  const [playing, setPlaying] = useState(false)

  const bars = useMemo(() => {
    const rand = seededRandom(seed)
    return Array.from({ length: barCount }, () => ({
      base: 0.2 + rand() * 0.8,
      duration: 0.8 + rand() * 0.9,
      delay: rand() * -1.8,
    }))
  }, [barCount, seed])

  const heightClass = size === 'sm' ? 'h-7' : size === 'lg' ? 'h-12' : 'h-9'
  const buttonSize = size === 'lg' ? 'h-14 w-14' : 'h-10 w-10'

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setPlaying((p) => !p)}
        className={`flex ${buttonSize} shrink-0 items-center justify-center rounded-full gradient-surface text-white shadow-[0_0_25px_-8px_rgba(236,72,153,0.7)] transition-transform hover:scale-105 active:scale-95`}
        aria-label={playing ? 'Pause voice message' : 'Play voice message'}
      >
        {playing ? <Pause size={size === 'lg' ? 20 : 16} fill="white" /> : <Play size={size === 'lg' ? 20 : 16} fill="white" className="ml-0.5" />}
      </button>

      <div className={`flex ${heightClass} flex-1 items-center gap-[2.5px] overflow-hidden`}>
        {bars.map((bar, i) => (
          <span
            key={i}
            className={`wave-bar w-[3px] shrink-0 rounded-full bg-white/70 ${playing ? '' : 'wave-bar-paused'}`}
            style={{
              height: `${bar.base * 100}%`,
              animationDuration: `${bar.duration}s`,
              animationDelay: `${bar.delay}s`,
              transform: playing ? undefined : `scaleY(${bar.base})`,
            }}
          />
        ))}
      </div>

      <span className="shrink-0 text-xs font-medium text-white/55">{duration}</span>
    </div>
  )
}
