import { useState } from 'react'
import { Search, SlidersHorizontal, Heart } from 'lucide-react'
import ProfileCard from '../components/ProfileCard.jsx'
import { profiles as initialProfiles } from '../data/mockData.js'

export default function DiscoverPage({ setView }) {
  const [profiles] = useState(initialProfiles)
  const [lastMatch, setLastMatch] = useState(null)

  const handleLike = (profile) => {
    setLastMatch(profile.name)
    setTimeout(() => setLastMatch(null), 2200)
  }

  return (
    <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-white">Discover</h1>
          <p className="mt-1 text-white/50">{profiles.length * 3} new people near you</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="btn-secondary !px-5 !py-2.5 text-sm">
            <Search size={16} />
            Search
          </button>
          <button
            onClick={() => setView('blinddate')}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 hover:text-white"
            aria-label="Filters"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} onLike={handleLike} />
        ))}
      </div>

      {lastMatch && (
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 animate-floatY">
          <div className="glass-card flex items-center gap-2 px-5 py-3 shadow-glow">
            <Heart size={16} className="fill-pink-500 text-pink-500" />
            <span className="text-sm font-medium text-white">You liked {lastMatch}</span>
          </div>
        </div>
      )}
    </div>
  )
}
