import { useState } from 'react'
import { X, Plus } from 'lucide-react'

export default function TagChipGroup({ title, tags, onChange, placeholder }) {
  const [draft, setDraft] = useState('')

  const addTag = () => {
    const value = draft.trim()
    if (!value) return
    onChange([...tags, value])
    setDraft('')
  }

  const removeTag = (tag) => {
    onChange(tags.filter((t) => t !== tag))
  }

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
      <h4 className="text-sm font-semibold text-white/80">{title}</h4>

      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1.5 rounded-full gradient-surface px-3.5 py-1.5 text-sm font-medium text-white"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="rounded-full p-0.5 hover:bg-white/20"
              aria-label={`Remove ${tag}`}
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTag()}
          type="text"
          placeholder={placeholder}
          className="field !py-2.5 flex-1"
        />
        <button
          onClick={addTag}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gradient-surface text-white transition-transform hover:scale-105"
          aria-label={`Add to ${title}`}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  )
}
