import { useState } from 'react'
import { Heart } from 'lucide-react'
import ProfileCard from '../components/ProfileCard.jsx'
import { profiles } from '../data/mockData.js'

export default function DiscoverPage() {
  const [lastMatch, setLastMatch] = useState(null)

  const handleLike = (profile) => {
    setLastMatch(profile.name)
    setTimeout(() => setLastMatch(null), 2200)
  }

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-10 sm:px-10">
      <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
        Discover your <span className="gradient-text">frequency</span>
      </h1>
      <p className="mt-2 text-white/50">People near you, matched by sound and soul.</p>

      <div className="mt-9 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} onLike={handleLike} />
        ))}
      </div>

      {lastMatch && (
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 animate-fade-in-up">
          <div className="glass-card flex items-center gap-2 px-5 py-3 shadow-[0_0_30px_-8px_rgba(236,72,153,0.6)]">
            <Heart size={16} className="fill-pink-500 text-pink-500" />
            <span className="text-sm font-medium text-white">You liked {lastMatch}</span>
          </div>
        </div>
      )}
    </div>
  )
}
