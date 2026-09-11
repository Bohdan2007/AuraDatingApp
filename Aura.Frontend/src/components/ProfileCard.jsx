import { useState } from 'react'
import { X, Star, Heart, MapPin, Mic } from 'lucide-react'

export default function ProfileCard({ profile, onLike, onPass, onSuperlike }) {
  const [status, setStatus] = useState(null) // 'liked' | 'passed' | 'super'

  const handle = (action, cb) => {
    setStatus(action)
    cb?.(profile)
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-aura-card shadow-xl transition-all duration-300 ${
        status === 'passed' ? 'scale-95 opacity-40' : 'hover:-translate-y-1'
      }`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <img
          src={profile.photo}
          alt={profile.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          <MapPin size={12} className="text-pink-400" />
          {profile.distanceKm} km away
        </span>

        {profile.hasVoiceIntro && (
          <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
            <Mic size={14} className="text-fuchsia-400" />
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-xl font-bold text-white">
            {profile.name}, {profile.age}
          </h3>
          <p className="mt-1 text-sm text-white/75">{profile.bio}</p>
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
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 border-t border-white/[0.06] bg-aura-card px-4 py-4">
        <button
          onClick={() => handle('passed', onPass)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-all hover:scale-110 hover:border-white/25 hover:text-white"
          aria-label={`Pass on ${profile.name}`}
        >
          <X size={20} />
        </button>
        <button
          onClick={() => handle('super', onSuperlike)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-amber-300 transition-all hover:scale-110 hover:border-amber-300/40"
          aria-label={`Superlike ${profile.name}`}
        >
          <Star size={18} />
        </button>
        <button
          onClick={() => handle('liked', onLike)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-aura-gradient text-white shadow-glow-sm transition-all hover:scale-110"
          aria-label={`Like ${profile.name}`}
        >
          <Heart size={20} fill="white" />
        </button>
      </div>
    </div>
  )
}
