import { useState } from 'react'
import { User, Upload, Save } from 'lucide-react'
import TagChipGroup from '../components/TagChipGroup.jsx'
import { initialProfileInterests } from '../data/mockData.js'

const BIO_LIMIT = 250

export default function EditProfilePage() {
  const [name, setName] = useState('Jordan Rivera')
  const [bio, setBio] = useState('Sound-led romantic. I fall for a good b-side and a slow Sunday.')
  const [interests, setInterests] = useState(initialProfileInterests)
  const [saved, setSaved] = useState(false)

  const updateGroup = (group, tags) => {
    setInterests((prev) => ({ ...prev, [group]: tags }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 sm:px-10">
      <h1 className="font-display text-3xl font-extrabold text-white">Your profile</h1>
      <p className="mt-2 text-white/50">Keep it fresh — this is your first impression.</p>

      <div className="glass-card mt-7 p-6 sm:p-8">
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <User size={26} className="text-white/40" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full gradient-surface text-white ring-4 ring-aura-panel">
              <Upload size={11} />
            </span>
          </div>
          <div>
            <p className="font-medium text-white">Profile photo</p>
            <p className="mt-0.5 text-xs text-white/45">A clear, well-lit shot works best.</p>
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-1.5 block text-sm font-medium text-white/70">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="field" />
        </div>

        <div className="mt-6">
          <label className="mb-1.5 block text-sm font-medium text-white/70">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, BIO_LIMIT))}
            rows={3}
            className="field resize-none"
          />
          <p className="mt-1.5 text-right text-xs text-white/35">
            {bio.length} / {BIO_LIMIT}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-xl font-bold text-white">My Interests</h2>
        <p className="mt-1 text-sm text-white/50">Add or remove tags to fine-tune your matches.</p>

        <div className="mt-5 space-y-4">
          {Object.entries(interests).map(([group, tags]) => (
            <TagChipGroup
              key={group}
              title={group}
              tags={tags}
              onChange={(next) => updateGroup(group, next)}
              placeholder={`Add to ${group.toLowerCase()}...`}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-3">
        {saved && <span className="text-sm font-medium text-emerald-400">Saved!</span>}
        <button onClick={handleSave} className="btn-primary">
          <Save size={16} />
          Save Changes
        </button>
      </div>
    </div>
  )
}
