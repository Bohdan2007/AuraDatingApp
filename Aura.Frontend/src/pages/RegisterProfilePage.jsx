import { useState } from 'react'
import { ArrowLeft, Sparkles, Upload, Check, User } from 'lucide-react'
import RegisterRail from '../components/RegisterRail.jsx'

const BIO_LIMIT = 250

export default function RegisterProfilePage({ setView }) {
  const [name, setName] = useState('Jordan Rivera')
  const [bio, setBio] = useState('')

  return (
    <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-[420px_1fr]">
      <RegisterRail activeStep={4} stepSubtitle="Final Touch" />

      <div className="flex items-center px-6 pb-12 sm:px-10 lg:py-16">
        <div className="glass-card w-full animate-fade-in-up p-6 sm:p-9">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Complete your profile</h2>
          <p className="mt-2 text-sm text-white/50">This is the first thing your matches will see.</p>

          <div className="mt-7 flex items-center gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="relative shrink-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <User size={26} className="text-white/40" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full gradient-surface text-white ring-4 ring-aura-panel">
                <Check size={12} strokeWidth={3} />
              </span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-white">Upload photo</p>
              <p className="mt-0.5 text-xs text-white/45">JPG or PNG, up to 5MB.</p>
            </div>
            <button className="btn-secondary !px-4 !py-2 text-xs">
              <Upload size={13} />
              Change
            </button>
          </div>

          <div className="mt-6">
            <label className="mb-1.5 block text-sm font-medium text-white/70">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="field"
            />
          </div>

          <div className="mt-6">
            <label className="mb-1.5 block text-sm font-medium text-white/70">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, BIO_LIMIT))}
              placeholder="Tell people what makes you, you..."
              rows={4}
              className="field resize-none"
            />
            <p className="mt-1.5 text-right text-xs text-white/35">
              {bio.length} / {BIO_LIMIT}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button onClick={() => setView('registerinterests')} className="btn-secondary">
              <ArrowLeft size={16} />
              Back
            </button>
            <button onClick={() => setView('discover')} className="btn-primary">
              <Sparkles size={16} />
              Finish &amp; Enter App
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
