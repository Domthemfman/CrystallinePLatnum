'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isAnonymous, setIsAnonymous] = useState(true)

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="crystal-glow inline-block p-8 rounded-full mb-6">
          <span className="text-6xl">💎</span>
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Welcome to the Crystalline Truth Network
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          A decentralized platform where truth crystallizes through community validation, 
          powered by blockchain technology and AI support.
        </p>
      </section>

      {/* Identity Toggle */}
      <section className="max-w-md mx-auto mb-12 bg-purple-900/30 backdrop-blur p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-lg">Anonymous Mode</span>
          <button 
            onClick={() => setIsAnonymous(!isAnonymous)}
            className={`relative w-16 h-8 rounded-full transition ${isAnonymous ? 'bg-purple-600' : 'bg-gray-600'}`}
          >
            <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition transform ${isAnonymous ? 'translate-x-8' : ''}`}></div>
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-2">
          {isAnonymous ? '🎭 You are posting anonymously' : '✅ You are verified'}
        </p>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-gradient-to-br from-purple-800/40 to-blue-800/40 backdrop-blur p-6 rounded-lg border border-purple-500/30">
          <div className="text-4xl mb-4">🔗</div>
          <h3 className="text-xl font-bold mb-2">Blockchain Verified</h3>
          <p className="text-gray-300">
            All posts are recorded on Polygon blockchain for permanent, tamper-proof storage.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-800/40 to-indigo-800/40 backdrop-blur p-6 rounded-lg border border-blue-500/30">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-xl font-bold mb-2">Forum Discussions</h3>
          <p className="text-gray-300">
            Engage in threaded conversations with survivors and truth seekers worldwide.
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-800/40 to-purple-800/40 backdrop-blur p-6 rounded-lg border border-indigo-500/30">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-bold mb-2">AI Support</h3>
          <p className="text-gray-300">
            Claude AI provides 24/7 emotional support, resources, and guidance.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-800/40 to-pink-800/40 backdrop-blur p-6 rounded-lg border border-purple-500/30">
          <div className="text-4xl mb-4">💎</div>
          <h3 className="text-xl font-bold mb-2">Crystal Visualization</h3>
          <p className="text-gray-300">
            Watch knowledge crystallize in 3D as the community validates truth.
          </p>
        </div>

        <div className="bg-gradient-to-br from-pink-800/40 to-red-800/40 backdrop-blur p-6 rounded-lg border border-pink-500/30">
          <div className="text-4xl mb-4">🛡️</div>
          <h3 className="text-xl font-bold mb-2">Safety First</h3>
          <p className="text-gray-300">
            Panic buttons, content warnings, and community moderation keep you safe.
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-800/40 to-purple-800/40 backdrop-blur p-6 rounded-lg border border-red-500/30">
          <div className="text-4xl mb-4">🎭</div>
          <h3 className="text-xl font-bold mb-2">Anonymous Posting</h3>
          <p className="text-gray-300">
            Share your truth without fear. Switch between anonymous and verified modes.
          </p>
        </div>
      </section>

      {/* CTA Buttons */}
      <section className="flex gap-4 justify-center flex-wrap">
        <Link href="/forum" className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-semibold transition">
          Enter Forum
        </Link>
        <Link href="/crystals" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition">
          View Crystals
        </Link>
        <Link href="/ai-support" className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg font-semibold transition">
          Talk to AI Support
        </Link>
      </section>

      {/* Emergency Support */}
      <section className="mt-16 max-w-2xl mx-auto bg-red-900/30 border-2 border-red-500 p-6 rounded-lg">
        <h3 className="text-2xl font-bold mb-3 text-red-300">🚨 Emergency Support</h3>
        <p className="text-gray-300 mb-4">
          If you're in crisis or need immediate support:
        </p>
        <div className="space-y-2 text-sm">
          <p>• <strong>National Suicide Prevention Lifeline:</strong> 988</p>
          <p>• <strong>Crisis Text Line:</strong> Text HOME to 741741</p>
          <p>• <strong>RAINN Sexual Assault Hotline:</strong> 1-800-656-4673</p>
        </div>
        <button className="mt-4 bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-semibold transition">
          Emergency Exit (Panic Button)
        </button>
      </section>
    </main>
  )
}
