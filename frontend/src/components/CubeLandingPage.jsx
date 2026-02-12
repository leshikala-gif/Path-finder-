import { useState } from 'react'
import Scene from './Scene'

export default function CubeLandingPage({ onEnter }) {
  const [transitioning, setTransitioning] = useState(false)
  // Generate particles once on mount
  const [particles] = useState(() => {
    const generateParticles = () => {
      const arr = []
      for (let i = 0; i < 20; i++) {
        arr.push({
          id: i,
          size: Math.random() * 10 + 5,
          left: Math.random() * 100,
          top: Math.random() * 100,
          duration: Math.random() * 5,
          delay: Math.random() * 5
        })
      }
      return arr
    }
    return generateParticles()
  })
  
  // Transition animation
  const handleBegin = () => {
    setTransitioning(true)
    setTimeout(() => {
      setTransitioning(false)
      onEnter()
    }, 1200)
  }

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-all duration-700 ${transitioning ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
      
      {/* 3D Scene Background with Rubik's Cube */}
      <div className="absolute inset-0">
        <Scene />
      </div>

      {/* Foreground content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="text-center backdrop-blur-sm bg-black/20 p-12 rounded-3xl border border-white/10 shadow-2xl">
          <h1 className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 tracking-tight drop-shadow-2xl mb-4">
            PATHFINDER
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-2 font-light tracking-wide">
            Unsolve. Discover. Learn.
          </p>
          <p className="text-sm md:text-base text-white/70 mb-8 font-mono">
            Interactive Rubik's Cube Learning Experience
          </p>
          
          <div className="pointer-events-auto">
            <button 
              onClick={handleBegin}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-500/50"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </div>

{/* Floating particles effect */}
<div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.length > 0 && particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white/20 blur-sm"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `float ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      {/* Bottom hint text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 text-xs md:text-sm font-mono z-10 text-center">
        <p>Drag to rotate • Scroll to zoom</p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </div>
  )
}

