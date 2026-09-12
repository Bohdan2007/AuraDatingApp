import { useState } from 'react'
import { X, Heart, MapPin } from 'lucide-react'

export default function ProfileCard({ profile, onLike }) {
  const [status, setStatus] = useState(null)

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl transition-all duration-300 ${
        status === 'passed' ? 'scale-95 opacity-40' : 'hover:-translate-y-1'
      }`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <img
          src={profile.photo}
          alt={profile.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

        <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          <MapPin size={12} className="text-pink-400" />
          {profile.distanceKm} km away
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-xl font-bold text-white">
            {profile.name} <span className="font-normal text-white/80">{profile.age}</span>
          </h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {profile.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-medium text-white/85 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setStatus('passed')}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/60"
              aria-label={`Pass on ${profile.name}`}
            >
              <X size={19} />
            </button>
            <button
              onClick={() => {
                setStatus('liked')
                onLike?.(profile)
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full gradient-surface text-white shadow-[0_0_20px_-6px_rgba(236,72,153,0.8)] transition-all hover:scale-110"
              aria-label={`Like ${profile.name}`}
            >
              <Heart size={19} fill="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
