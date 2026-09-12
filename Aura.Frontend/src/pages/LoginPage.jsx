import { useState } from 'react'
import { ArrowLeft, Mail, Lock, AudioWaveform } from 'lucide-react'

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.55-5.17 3.55-8.66z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.94-2.92l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54v-3.1H1.27a12 12 0 0 0 0 10.74z" />
      <path fill="#EA4335" d="M12 4.77c1.77 0 3.35.6 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.63l4 3.1C6.22 6.88 8.87 4.77 12 4.77z" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M16.36 1.43c0 1.14-.47 2.2-1.19 2.98-.79.86-2.09 1.53-3.18 1.44-.14-1.1.4-2.24 1.14-3 .82-.86 2.22-1.5 3.23-1.42zM20.5 17.17c-.55 1.28-.82 1.85-1.53 2.98-1 1.57-2.4 3.53-4.15 3.55-1.55.02-1.95-1.02-4.05-1-2.1.01-2.54 1.02-4.09 1-1.75-.02-3.08-1.78-4.08-3.35-2.8-4.4-3.1-9.57-1.37-12.32 1.23-1.96 3.17-3.11 5-3.11 1.86 0 3.03 1.03 4.57 1.03 1.49 0 2.4-1.03 4.56-1.03 1.63 0 3.36.9 4.59 2.44-4.04 2.22-3.39 8.02.55 9.81z" />
    </svg>
  )
}

export default function LoginPage({ setView }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6 py-16">
      <button
        onClick={() => setView('landing')}
        className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 hover:text-white sm:left-10 sm:top-10"
      >
        <ArrowLeft size={15} />
        Back
      </button>

      <div className="glass-card w-full max-w-md animate-fade-in-up p-8 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full gradient-surface shadow-[0_0_40px_-8px_rgba(236,72,153,0.85)]">
            <AudioWaveform size={26} className="text-white" strokeWidth={2.2} />
          </span>
          <h1 className="font-display mt-5 text-2xl font-bold text-white">Welcome back</h1>
          <p className="mt-1.5 text-sm text-white/50">Sign in to hear who's waiting.</p>
        </div>

        <form
          className="mt-8 space-y-5"
          onSubmit={(e) => {
            e.preventDefault()
            setView('discover')
          }}
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/70">Email</label>
            <div className="relative">
              <Mail size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="field pl-11"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="block text-sm font-medium text-white/70">Password</label>
              <a href="#" className="text-xs font-medium text-pink-400 hover:text-pink-300">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="field pl-11"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">
            Sign In
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/40">or continue with</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="space-y-3">
          <button className="btn-secondary w-full !bg-white/[0.04]">
            <GoogleIcon />
            Continue with Google
          </button>
          <button className="btn-secondary w-full !bg-white/[0.04]">
            <AppleIcon />
            Continue with Apple
          </button>
        </div>

        <p className="mt-7 text-center text-sm text-white/50">
          New to Aura?{' '}
          <button onClick={() => setView('registerinterests')} className="font-medium text-pink-400 hover:text-pink-300">
            Create an account
          </button>
        </p>
      </div>
    </div>
  )
}
