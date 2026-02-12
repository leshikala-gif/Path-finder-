import { useState, useEffect } from 'react'
import CubeLandingPage from './components/CubeLandingPage'

/* Cinematic Landing Page + ChatApp in one file
   - LandingPage: POV at edge of digital abyss with bridge, HUD, and animations
   - ChatApp: updated dark-themed chat UI integrated after 'Enter'
*/

function LandingPage({ onEnter }) {
  const [transitioning, setTransitioning] = useState(false)
  const [scroll, setScroll] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop
      setScroll(Math.min(y / window.innerHeight, 1))
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Transition animation
  const handleBegin = () => {
    setTransitioning(true)
    setTimeout(() => {
      setTransitioning(false)
      onEnter()
    }, 1200)
  }

  // Hero section split
  return (
    <div className={`relative w-full h-screen overflow-hidden transition-all duration-700 ${transitioning ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
      {/* Left: Animated gradient sky with moving clouds */}
      <div className="absolute left-0 top-0 h-full w-1/2 z-10" style={{
        background: `linear-gradient(180deg, #aeefff 0%, #6ec6ff 60%, #fff 100%)`,
        opacity: 1 - scroll,
        transition: 'opacity 0.5s'
      }}>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="absolute rounded-full blur-2xl bg-white/60" style={{
            width: `${80 + (i % 3) * 40}px`, height: `${40 + (i % 3) * 20}px`,
            left: `${10 + (i * 7)}%`, top: `${10 + (i * 6)}%`,
            animation: `cloudMove ${12 + (i % 4)}s linear infinite`, opacity: 0.22
          }} />
        ))}
      </div>

      {/* Right: Starfield with twinkle and noise */}
      <div className="absolute right-0 top-0 h-full w-1/2 z-10" style={{
        background: `radial-gradient(ellipse at top, #1a2233 0%, #0a0e1a 100%)`,
        opacity: scroll,
        transition: 'opacity 0.5s'
      }}>
        <CubeLandingPage onEnter={onEnter} />
        {/* Subtle animated noise overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-10" style={{ pointerEvents: 'none' }} />
      </div>

      {/* Center: Silhouette balancing on vertical rope */}
      <div className="absolute left-1/2 top-1/2 z-30" style={{ transform: 'translate(-50%, -50%)' }}>
        <div className="flex flex-col items-center">
          {/* Rope */}
          <div className="w-2 h-72 bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 shadow-lg" />
          {/* Silhouette figure */}
          <svg width="80" height="120" viewBox="0 0 80 120" className="mt-[-110px] animate-float animate-breathe">
            <ellipse cx="40" cy="30" rx="18" ry="22" fill="#222" /> {/* Head */}
            <rect x="32" y="52" width="16" height="40" rx="8" fill="#222" /> {/* Body */}
            <rect x="20" y="52" width="12" height="36" rx="6" fill="#222" transform="rotate(-20 26 70)" /> {/* Left arm */}
            <rect x="48" y="52" width="12" height="36" rx="6" fill="#222" transform="rotate(20 54 70)" /> {/* Right arm */}
            <rect x="32" y="92" width="8" height="24" rx="4" fill="#222" /> {/* Left leg */}
            <rect x="40" y="92" width="8" height="24" rx="4" fill="#222" /> {/* Right leg */}
          </svg>
        </div>
      </div>

      {/* Foreground text and button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-200 tracking-tight drop-shadow-lg">PATHFINDER</h1>
        <p className="text-xl md:text-2xl text-blue-700/80 mt-2 mb-6 font-light tracking-wide">Balance Your Journey</p>
        <div className="flex gap-4 pointer-events-auto">
          <button onClick={handleBegin} className="px-8 py-4 rounded-md bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold hover:scale-105 transition">Begin Your Journey</button>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-blue-400 text-xs font-mono z-30">Hero: Sky & Space • Rope Balance • Scroll Transition</div>

      <style>{`
        @keyframes cloudMove { 0%{transform:translateX(0)}100%{transform:translateX(60px)} }
        @keyframes twinkle { 0%,100%{opacity:0.7} 50%{opacity:1} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.02)} }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-breathe { animation: breathe 2.5s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

function ChatApp() {
  const [messages, setMessages] = useState([{ role: 'ai', content: "Hi! I'm Pathfinder. What learning goal can I help you diagnose today?" }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages(m => [...m, userMsg]); setInput(''); setLoading(true)
    try {
      const res = await fetch('http://127.0.0.1:8000/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: input }) })
      if (!res.ok) throw new Error('Server error')
      const d = await res.json()
      setMessages(m => [...m, { role: 'ai', content: d.reply }])
    } catch (e) {
      setMessages(m => [...m, { role: 'ai', content: 'Error: Could not reach the Pathfinder Brain.' }])
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#021424] to-[#00121a] text-cyan-100">
      <header className="p-4 border-b border-cyan-400/10 backdrop-blur"> 
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">PATHFINDER</div>
            <div className="text-xs text-cyan-300">Personalized Skill Gap Self-Diagnosis</div>
          </div>
          <button onClick={() => window.location.reload()} className="text-sm px-3 py-1 border border-cyan-400/20 rounded">← Back to Landing</button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-4 rounded-2xl max-w-[80%] ${m.role === 'user' ? 'bg-cyan-600/80 text-white' : 'bg-[#072238]/70 border border-cyan-400/10 text-cyan-100'}`}>{m.content}</div>
            </div>
          ))}
          {loading && <div className="text-cyan-200">Pathfinder is analyzing your skill gaps...</div>}
        </div>
      </main>

      <footer className="p-4 border-t border-cyan-400/10">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input value={input} onChange={_e => setInput(_e.target.value)} onKeyDown={_e => _e.key === 'Enter' && sendMessage()} className="flex-1 px-4 py-3 rounded bg-[#01121a]/70 border border-cyan-400/10 text-cyan-100" placeholder="Type your message..." />
          <button onClick={sendMessage} className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded text-white">Send</button>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  const [showLanding, setShowLanding] = useState(true)
  return showLanding ? <CubeLandingPage onEnter={() => setShowLanding(false)} /> : <ChatApp />
}
