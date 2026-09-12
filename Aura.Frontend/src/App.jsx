import { useState } from 'react'
import BackgroundOrbs from './components/BackgroundOrbs.jsx'
import Navbar from './components/Navbar.jsx'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterInterestsPage from './pages/RegisterInterestsPage.jsx'
import RegisterProfilePage from './pages/RegisterProfilePage.jsx'
import DiscoverPage from './pages/DiscoverPage.jsx'
import BlindDatePage from './pages/BlindDatePage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import EditProfilePage from './pages/EditProfilePage.jsx'

const PAGES = {
  landing: { component: LandingPage, showNavbar: false },
  login: { component: LoginPage, showNavbar: false },
  registerinterests: { component: RegisterInterestsPage, showNavbar: false },
  registerprofile: { component: RegisterProfilePage, showNavbar: false },
  discover: { component: DiscoverPage, showNavbar: true },
  blinddate: { component: BlindDatePage, showNavbar: true },
  chat: { component: ChatPage, showNavbar: true },
  editprofile: { component: EditProfilePage, showNavbar: true },
}

const DEV_SWITCHER = [
  { key: 'landing', label: 'Landing' },
  { key: 'login', label: 'Login' },
  { key: 'registerinterests', label: 'Interests' },
  { key: 'registerprofile', label: 'Final Touch' },
  { key: 'discover', label: 'Discover' },
  { key: 'blinddate', label: 'Blind Date' },
  { key: 'chat', label: 'Chat' },
  { key: 'editprofile', label: 'Profile' },
]

export default function App() {
  const [view, setView] = useState('landing')
  const page = PAGES[view] ?? PAGES.landing
  const ActiveView = page.component

  return (
    <div className="relative min-h-screen text-white">
      <BackgroundOrbs />
      {page.showNavbar && <Navbar view={view} setView={setView} />}
      <ActiveView setView={setView} />

      {/* Floating dev/demo switcher so every screen is reachable at a glance */}
      <div className="fixed bottom-5 right-5 z-50 max-w-[92vw]">
        <div className="glass-card flex max-w-full items-center gap-1 overflow-x-auto p-1.5 shadow-[0_0_25px_-8px_rgba(236,72,153,0.5)]">
          {DEV_SWITCHER.map((item) => (
            <button
              key={item.key}
              onClick={() => setView(item.key)}
              className={`shrink-0 rounded-2xl px-3 py-2 text-xs font-medium transition-colors ${
                view === item.key ? 'gradient-surface text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
