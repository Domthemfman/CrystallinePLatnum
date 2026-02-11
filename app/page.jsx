'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center space-y-8 px-4">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Crystalline Truth Network
        </h1>
        <p className="text-slate-300 text-xl max-w-2xl mx-auto">
          Explore truth through interactive 3D crystal visualizations and connect with others on their journey.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/crystals"
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition shadow-lg text-lg"
          >
            View Crystals
          </Link>
          <Link
            href="/profiles"
            className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition shadow-lg text-lg"
          >
            Browse Profiles
          </Link>
          <Link
            href="/anonymous"
            className="px-8 py-4 bg-cyan-700 hover:bg-cyan-600 text-white font-bold rounded-lg transition shadow-lg text-lg"
          >
            Anonymous Board
          </Link>
          <Link
            href="/profile/edit"
            className="px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-lg transition shadow-lg text-lg"
          >
            Create Profile
          </Link>
        </div>
      </div>
    </div>
  )
}
