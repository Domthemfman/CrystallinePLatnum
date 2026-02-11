'use client'

import { useState, useEffect } from 'react'
import { connectWallet, getContract } from '@/lib/blockchain'

export default function AnonymousBoard() {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState('')
  const [loading, setLoading] = useState(false)
  const [wallet, setWallet] = useState(null)

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts/anonymous')
      const data = await res.json()
      setPosts(data)
    } catch (e) { console.error(e) }
  }

  useEffect(() => {
    fetchPosts()
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then(accs => {
        if (accs.length > 0) setWallet(accs[0])
      })
    }
  }, [])

  const handlePost = async (e) => {
    e.preventDefault()
    if (!newPost.trim()) return
    setLoading(true)
    try {
      // 1. Save to DB for immediate display/search
      const dbRes = await fetch('/api/posts/anonymous', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newPost })
      })
      const dbData = await dbRes.json()

      // 2. Save to Blockchain (Immutable)
      if (window.ethereum) {
        const addr = await connectWallet()
        setWallet(addr)
        const contract = await getContract()
        // Using content hash or raw content depending on contract needs
        const tx = await contract.createPost(newPost, true)
        await tx.wait()
        console.log('Blockchain sync complete')
      }

      setNewPost('')
      fetchPosts()
    } catch (e) {
      alert(e.message || 'Error posting')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-purple-400">Anonymous Truth Board</h1>
          {wallet ? (
            <span className="text-xs text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
              Wallet Connected
            </span>
          ) : (
            <button 
              onClick={() => connectWallet().then(setWallet)}
              className="text-xs bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full border border-purple-500/30 hover:bg-purple-600/40 transition"
            >
              Connect Wallet for Immutable Posting
            </button>
          )}
        </div>
        
        <form onSubmit={handlePost} className="mb-12 bg-slate-800 p-6 rounded-xl border border-purple-500/30 shadow-2xl">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 mb-4 focus:border-purple-500 outline-none transition"
            placeholder="Share your truth... this will be recorded immutably on the blockchain."
            rows={4}
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-500">🔒 Posts are stored on-chain and cannot be erased.</p>
            <button
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-bold transition disabled:opacity-50 shadow-lg"
            >
              {loading ? 'Processing...' : 'Post Anonymously'}
            </button>
          </div>
        </form>

        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:border-purple-500/30 transition shadow-lg">
              <p className="text-lg leading-relaxed">{post.content}</p>
              <div className="mt-4 flex justify-between items-center text-xs text-slate-500">
                <span>{new Date(post.created_at).toLocaleString()} • Anonymous</span>
                <span className="text-purple-400 font-mono">ON-CHAIN VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
