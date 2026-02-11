'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative min-h-screen bg-[#0d0221] text-slate-100 overflow-hidden font-sans">
      {/* Amethyst Geode Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#4a148c]/30 blur-[130px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#7b1fa2]/20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-[#9c27b0]/15 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Geode Crystal Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #ce93d8 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col items-center justify-center text-center">
        <header className="mb-16 space-y-6">
          <div className="inline-block px-4 py-1 rounded-full border border-purple-400/30 bg-purple-900/20 text-purple-200 text-sm font-medium tracking-wider uppercase mb-4 backdrop-blur-md">
            The Digital Healing Network
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            <span className="block text-white">CRYSTALLINE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#e1bee7] via-[#9c27b0] to-[#4a148c] drop-shadow-[0_0_20px_rgba(156,39,176,0.6)]">
              TRUTH NETWORK
            </span>
          </h1>
          <p className="text-purple-200/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            An immutable sanctuary for transparency, healing, and shared experiences. 
            Powered by blockchain technology to ensure your truth remains unerasable.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <Link href="/crystals" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7b1fa2] to-[#4a148c] rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
            <div className="relative flex flex-col items-center p-8 bg-[#1a0633]/60 backdrop-blur-xl border border-purple-300/10 rounded-2xl hover:border-purple-400/50 transition duration-500 h-full">
              <div className="text-4xl mb-4 group-hover:scale-110 transition duration-500">💎</div>
              <h2 className="text-xl font-bold text-white mb-2">View Crystals</h2>
              <p className="text-purple-300/60 text-sm">Explore interactive 3D truth visualizations.</p>
            </div>
          </Link>

          <Link href="/profiles" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#9c27b0] to-[#7b1fa2] rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
            <div className="relative flex flex-col items-center p-8 bg-[#1a0633]/60 backdrop-blur-xl border border-purple-300/10 rounded-2xl hover:border-purple-400/50 transition duration-500 h-full">
              <div className="text-4xl mb-4 group-hover:scale-110 transition duration-500">👥</div>
              <h2 className="text-xl font-bold text-white mb-2">Community</h2>
              <p className="text-purple-300/60 text-sm">Connect with others on their healing journey.</p>
            </div>
          </Link>

          <Link href="/anonymous" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ba68c8] to-[#9c27b0] rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
            <div className="relative flex flex-col items-center p-8 bg-[#1a0633]/60 backdrop-blur-xl border border-purple-300/10 rounded-2xl hover:border-purple-400/50 transition duration-500 h-full">
              <div className="text-4xl mb-4 group-hover:scale-110 transition duration-500">🔒</div>
              <h2 className="text-xl font-bold text-white mb-2">Anon Board</h2>
              <p className="text-purple-300/60 text-sm">Post immutable truths on the blockchain.</p>
            </div>
          </Link>
        </div>

        <footer className="mt-20 flex flex-col items-center gap-6">
          <div className="flex gap-8">
            <Link href="/profile/edit" className="text-purple-400/70 hover:text-purple-300 transition text-sm font-medium tracking-widest uppercase">
              Initialize Profile
            </Link>
            <span className="text-purple-900">|</span>
            <div className="text-purple-500/50 text-sm font-medium tracking-widest uppercase">
              V 2.0 • POLYGON MAINNET
            </div>
          </div>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </footer>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        .animate-pulse {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  )
}
