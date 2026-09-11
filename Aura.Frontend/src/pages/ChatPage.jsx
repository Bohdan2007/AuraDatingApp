import { useState } from 'react'
import { Search, Phone, Video, Plus, Send, Headphones, Mic, Heart } from 'lucide-react'
import WaveformPlayer from '../components/WaveformPlayer.jsx'
import { chatThreads } from '../data/mockData.js'

function ThreadPreviewIcon({ icon }) {
  if (icon === 'headphones') return <Headphones size={13} className="text-white/40" />
  if (icon === 'mic') return <Mic size={13} className="text-white/40" />
  return null
}

export default function ChatPage() {
  const [threads] = useState(chatThreads)
  const [activeId, setActiveId] = useState(threads[0].id)
  const [draft, setDraft] = useState('')
  const [localMessages, setLocalMessages] = useState({})

  const active = threads.find((t) => t.id === activeId)
  const extraMessages = localMessages[activeId] || []
  const allMessages = [...active.messages, ...extraMessages]

  const sendMessage = () => {
    if (!draft.trim()) return
    setLocalMessages((prev) => ({
      ...prev,
      [activeId]: [
        ...(prev[activeId] || []),
        { id: Date.now(), from: 'me', type: 'text', text: draft.trim() },
      ],
    }))
    setDraft('')
  }

  return (
    <div className="mx-auto grid h-[calc(100vh-73px)] max-w-7xl grid-cols-1 lg:grid-cols-[340px_1fr]">
      {/* Thread list */}
      <div className="flex flex-col border-b border-white/[0.06] lg:border-b-0 lg:border-r">
        <div className="px-6 pb-4 pt-8">
          <h1 className="font-display text-2xl font-bold text-white">Messages</h1>
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5">
            <Search size={16} className="text-white/40" />
            <input
              type="text"
              placeholder="Search conversations"
              className="w-full bg-transparent text-sm text-white placeholder-white/35 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-6">
          {threads.map((thread) => {
            const isActive = thread.id === activeId
            return (
              <button
                key={thread.id}
                onClick={() => setActiveId(thread.id)}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors ${
                  isActive ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={thread.photo}
                    alt={thread.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  {thread.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-aura-bg bg-emerald-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-white">{thread.name}</p>
                  <p className="flex items-center gap-1 truncate text-sm text-white/45">
                    <ThreadPreviewIcon icon={thread.lastMessageIcon} />
                    {thread.lastMessage}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="text-xs text-white/35">{thread.time}</span>
                  {thread.unread > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-aura-gradient text-[11px] font-semibold text-white">
                      {thread.unread}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Active conversation */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
          <div className="flex items-center gap-3">
            <img src={active.photo} alt={active.name} className="h-10 w-10 rounded-full object-cover" />
            <div>
              <p className="font-medium text-white">{active.name}</p>
              <p className={`text-xs ${active.online ? 'text-emerald-400' : 'text-white/40'}`}>
                {active.online ? 'Online now' : 'Offline'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white">
              <Phone size={16} />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white">
              <Video size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
          <div className="flex justify-center">
            <span className="flex items-center gap-1.5 rounded-full bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/55">
              <Heart size={12} className="fill-pink-500 text-pink-500" />
              {active.matchedOn}
            </span>
          </div>

          {allMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              {msg.type === 'voice' ? (
                <div
                  className={`w-72 rounded-2xl border px-4 py-3 ${
                    msg.from === 'me'
                      ? 'border-transparent bg-aura-gradient'
                      : 'border-white/10 bg-white/[0.05]'
                  }`}
                >
                  <WaveformPlayer duration={msg.duration} seed={msg.id} size="sm" accent={msg.from !== 'me'} />
                </div>
              ) : (
                <div
                  className={`max-w-md rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.from === 'me'
                      ? 'bg-aura-gradient text-white'
                      : 'border border-white/10 bg-white/[0.05] text-white/90'
                  }`}
                >
                  {msg.text}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 border-t border-white/[0.06] px-6 py-5">
          <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white">
            <Plus size={18} />
          </button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            type="text"
            placeholder="Write a message..."
            className="flex-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-pink-400/50"
          />
          <button
            onClick={sendMessage}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-aura-gradient text-white shadow-glow-sm hover:scale-105 transition-transform"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
