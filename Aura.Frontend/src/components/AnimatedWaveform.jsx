import { useMemo } from 'react'

// Deterministic pseudo-random generator so the bar heights/durations look
// organic but are stable across re-renders (no reshuffle on parent updates).
function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

export default function AnimatedWaveform({
  barCount = 60,
  className = '',
  heightClass = 'h-40',
  seed = 11,
}) {
  const bars = useMemo(() => {
    const rand = seededRandom(seed)
    return Array.from({ length: barCount }, () => ({
      base: 0.15 + rand() * 0.85,
      duration: 0.9 + rand() * 1.1,
      delay: rand() * -2,
    }))
  }, [barCount, seed])

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none flex items-center justify-center gap-[3px] ${heightClass} ${className}`}
    >
      {bars.map((bar, i) => (
        <span
          key={i}
          className="wave-bar w-[3px] shrink-0 rounded-full bg-gradient-to-t from-purple-500/70 via-fuchsia-400/70 to-pink-300/70"
          style={{
            height: `${bar.base * 100}%`,
            animationDuration: `${bar.duration}s`,
            animationDelay: `${bar.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
