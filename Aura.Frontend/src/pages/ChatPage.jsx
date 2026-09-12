import { useState } from 'react'
import { Phone, Video, Mic, Send } from 'lucide-react'
import VoicePlayer from '../components/VoicePlayer.jsx'
import { chatThreads } from '../data/mockData.js'

export default function ChatPage() {
  const [threads] = useState(chatThreads)
  const [activeId, setActiveId] = useState(threads[0].id)
  const [draft, setDraft] = useState('')
  const [extra, setExtra] = useState({})

  const active = threads.find((t) => t.id === activeId)
  const allMessages = [...active.messages, ...(extra[activeId] || [])]

  const send = () => {
    if (!draft.trim()) return
    setExtra((prev) => ({
      ...prev,
      [activeId]: [
        ...(prev[activeId] || []),
        { id: Date.now(), from: 'me', type: 'text', text: draft.trim(), time: 'now' },
      ],
    }))
    setDraft('')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="glass-card grid grid-cols-1 overflow-hidden lg:h-[calc(100vh-160px)] lg:grid-cols-[300px_1fr]">
        {/* Thread list */}
        <div className="flex flex-col border-b border-white/[0.06] lg:border-b-0 lg:border-r lg:border-white/10">
          <div className="px-5 py-5">
            <h2 className="font-display text-xl font-bold text-white">Messages</h2>
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto px-2 pb-4 lg:max-h-none">
            {threads.map((thread) => {
              const isActive = thread.id === activeId
              return (
                <button
                  key={thread.id}
                  onClick={() => setActiveId(thread.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors ${
                    isActive ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img src={thread.photo} alt={thread.name} className="h-11 w-11 rounded-full object-cover" />
                    {thread.online && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-aura-panel bg-emerald-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-white">{thread.name}</p>
                    <p className="truncate text-sm text-white/45">{thread.preview}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <span className="text-xs text-white/35">{thread.time}</span>
                    {thread.unread > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full gradient-surface text-[11px] font-semibold text-white">
                        {thread.unread}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Active thread */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <img src={active.photo} alt={active.name} className="h-10 w-10 rounded-full object-cover" />
              <div>
                <p className="font-medium text-white">{active.name}</p>
                <p className={`flex items-center gap-1.5 text-xs ${active.online ? 'text-emerald-400' : 'text-white/40'}`}>
                  {active.online && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                  {active.online ? 'Online now' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-9 w-9 items-center justify-center rounded-full text-white/50 hover:bg-white/5 hover:text-white">
                <Phone size={16} />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-full text-white/50 hover:bg-white/5 hover:text-white">
                <Video size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-6">
            {allMessages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.from === 'me' ? 'items-end' : 'items-start'}`}>
                {msg.type === 'voice' ? (
                  <div
                    className={`w-72 rounded-2xl px-4 py-3 ${
                      msg.from === 'me' ? 'gradient-surface' : 'border border-white/10 bg-white/[0.05]'
                    }`}
                  >
                    <VoicePlayer duration={msg.duration} seed={msg.id} size="sm" />
                  </div>
                ) : (
                  <div
                    className={`max-w-xs rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-md ${
                      msg.from === 'me'
                        ? 'gradient-surface text-white'
                        : 'border border-white/10 bg-white/[0.05] text-white/90'
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
                <span className="mt-1 px-1 text-[11px] text-white/30">{msg.time}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 border-t border-white/10 px-5 py-4">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              type="text"
              placeholder="Send a message..."
              className="field flex-1"
            />
            <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/50 hover:bg-white/5 hover:text-white">
              <Mic size={17} />
            </button>
            <button
              onClick={send}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full gradient-surface text-white shadow-[0_0_20px_-6px_rgba(236,72,153,0.8)] transition-transform hover:scale-105"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
