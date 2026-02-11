'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { officialGroups } from '@/lib/groupsData'

export default function AnonymousBoard() {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState('')
  const [sending, setSending] = useState(false)

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts/anonymous')
      const data = await res.json()
      setPosts(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newPost.trim()) return
    setSending(true)
    try {
      await fetch('/api/posts/anonymous', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newPost })
      })
      setNewPost('')
      fetchPosts()
    } catch (e) {
      console.error(e)
    }
    setSending(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-400 mb-8">Anonymous Truth Board</h1>
        
        <form onSubmit={handleSubmit} className="mb-12 bg-slate-800 p-6 rounded-xl border border-purple-500/30">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 mb-4 focus:border-purple-500 outline-none"
            placeholder="Share your truth anonymously..."
            rows={4}
          />
          <button
            disabled={sending}
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-bold transition disabled:opacity-50"
          >
            {sending ? 'Posting...' : 'Post Anonymously'}
          </button>
        </form>

        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
              <p className="text-lg leading-relaxed">{post.content}</p>
              <div className="mt-4 text-sm text-slate-500">
                Posted {new Date(post.created_at).toLocaleString()} • Anonymous
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
