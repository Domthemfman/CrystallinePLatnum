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
    <div className="relative min-h-screen bg-[#050510] text-slate-100 overflow-hidden font-sans">
      {/* Crystalline Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-pink-900/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col items-center justify-center text-center">
        <header className="mb-16 space-y-6">
          <div className="inline-block px-4 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium tracking-wider uppercase mb-4 backdrop-blur-md">
            The Digital Healing Network
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            <span className="block text-white">CRYSTALLINE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              TRUTH NETWORK
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            An immutable sanctuary for transparency, healing, and shared experiences. 
            Powered by blockchain technology to ensure your truth remains unerasable.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <Link href="/crystals" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative flex flex-col items-center p-8 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-purple-500/50 transition duration-500 h-full">
              <div className="text-4xl mb-4 group-hover:scale-110 transition duration-500">💎</div>
              <h2 className="text-xl font-bold text-white mb-2">View Crystals</h2>
              <p className="text-slate-400 text-sm">Explore interactive 3D truth visualizations.</p>
            </div>
          </Link>

          <Link href="/profiles" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-emerald-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative flex flex-col items-center p-8 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-cyan-500/50 transition duration-500 h-full">
              <div className="text-4xl mb-4 group-hover:scale-110 transition duration-500">👥</div>
              <h2 className="text-xl font-bold text-white mb-2">Community</h2>
              <p className="text-slate-400 text-sm">Connect with others on their healing journey.</p>
            </div>
          </Link>

          <Link href="/anonymous" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative flex flex-col items-center p-8 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-pink-500/50 transition duration-500 h-full">
              <div className="text-4xl mb-4 group-hover:scale-110 transition duration-500">🔒</div>
              <h2 className="text-xl font-bold text-white mb-2">Anon Board</h2>
              <p className="text-slate-400 text-sm">Post immutable truths on the blockchain.</p>
            </div>
          </Link>
        </div>

        <footer className="mt-20 flex gap-8">
          <Link href="/profile/edit" className="text-slate-500 hover:text-purple-400 transition text-sm font-medium tracking-widest uppercase">
            Initialize Profile
          </Link>
          <span className="text-slate-800">|</span>
          <div className="text-slate-600 text-sm font-medium tracking-widest uppercase">
            V 2.0 • POLYGON MAINNET
          </div>
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
