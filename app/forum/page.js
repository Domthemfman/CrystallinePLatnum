'use client'

import { useState } from 'react'

export default function Forum() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Anonymous Truth Seeker',
      isAnonymous: true,
      title: 'My story needs to be heard',
      content: 'After years of silence, I\'m ready to share my truth. This platform gives me the safety I needed.',
      timestamp: '2 hours ago',
      validations: 47,
      replies: 12,
      crystallized: true
    },
    {
      id: 2,
      author: 'Sarah M. (Verified)',
      isAnonymous: false,
      title: 'Resources for survivors',
      content: 'Here are some helpful resources I found during my healing journey...',
      timestamp: '5 hours ago',
      validations: 89,
      replies: 23,
      crystallized: true
    },
    {
      id: 3,
      author: 'Anonymous',
      isAnonymous: true,
      title: 'Question about legal process',
      content: 'Has anyone here gone through the legal system? I have questions...',
      timestamp: '1 day ago',
      validations: 34,
      replies: 18,
      crystallized: false
    }
  ])

  const [newPost, setNewPost] = useState({ title: '', content: '', isAnonymous: true })
  const [showNewPostForm, setShowNewPostForm] = useState(false)

  const handleSubmitPost = async () => {
    if (!newPost.title || !newPost.content) return
    
    const post = {
      id: posts.length + 1,
      author: newPost.isAnonymous ? 'Anonymous' : 'You (Verified)',
      isAnonymous: newPost.isAnonymous,
      title: newPost.title,
      content: newPost.content,
      timestamp: 'Just now',
      validations: 0,
      replies: 0,
      crystallized: false
    }

    setPosts([post, ...posts])
    setNewPost({ title: '', content: '', isAnonymous: true })
    setShowNewPostForm(false)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Community Forum
          </h1>
          <p className="text-gray-400">Share your truth, support others, and grow together</p>
        </div>

        {/* New Post Button */}
        <button 
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          className="mb-6 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition w-full md:w-auto"
        >
          {showNewPostForm ? '✕ Cancel' : '✍️ Create New Post'}
        </button>

        {/* New Post Form */}
        {showNewPostForm && (
          <div className="bg-purple-900/30 backdrop-blur border border-purple-500/30 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Share Your Truth</h3>
            
            <div className="mb-4">
              <label className="flex items-center gap-2 mb-2">
                <input 
                  type="checkbox" 
                  checked={newPost.isAnonymous}
                  onChange={(e) => setNewPost({...newPost, isAnonymous: e.target.checked})}
                  className="w-4 h-4"
                />
                <span>Post Anonymously (recommended)</span>
              </label>
            </div>

            <input 
              type="text"
              placeholder="Post Title"
              value={newPost.title}
              onChange={(e) => setNewPost({...newPost, title: e.target.value})}
              className="w-full bg-black/30 border border-purple-500/30 rounded px-4 py-2 mb-4 focus:outline-none focus:border-purple-500"
            />

            <textarea 
              placeholder="Share your story, ask questions, or offer support..."
              value={newPost.content}
              onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              rows="6"
              className="w-full bg-black/30 border border-purple-500/30 rounded px-4 py-2 mb-4 focus:outline-none focus:border-purple-500"
            />

            <div className="flex gap-4">
              <button 
                onClick={handleSubmitPost}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded font-semibold transition"
              >
                Submit to Blockchain
              </button>
              <button 
                onClick={() => setShowNewPostForm(false)}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded font-semibold transition"
              >
                Cancel
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              ⛓️ Your post will be permanently recorded on the Polygon blockchain
            </p>
          </div>
        )}

        {/* Forum Posts */}
        <div className="space-y-6">
          {posts.map(post => (
            <article 
              key={post.id} 
              className={`bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur border rounded-lg p-6 hover:border-purple-400/50 transition ${
                post.crystallized ? 'border-purple-400/50 crystal-glow' : 'border-purple-500/30'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">
                      {post.isAnonymous ? '🎭 ' : '✅ '}
                      {post.author}
                    </span>
                    {post.crystallized && <span className="text-purple-400">💎</span>}
                  </div>
                  <span className="text-sm text-gray-400">{post.timestamp}</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
              <p className="text-gray-300 mb-4">{post.content}</p>

              <div className="flex gap-6 text-sm border-t border-purple-500/30 pt-4">
                <button className="flex items-center gap-2 hover:text-purple-400 transition">
                  <span>💎</span>
                  <span>{post.validations} Validations</span>
                </button>
                <button className="flex items-center gap-2 hover:text-purple-400 transition">
                  <span>💬</span>
                  <span>{post.replies} Replies</span>
                </button>
                <button className="flex items-center gap-2 hover:text-purple-400 transition">
                  <span>🔗</span>
                  <span>Share</span>
                </button>
                <button className="flex items-center gap-2 hover:text-red-400 transition">
                  <span>🚨</span>
                  <span>Report</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Safety Notice */}
        <div className="mt-8 bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
          <p className="text-sm text-gray-300">
            <strong>💙 Community Guidelines:</strong> This is a safe space for healing and truth. 
            Be respectful, validate others' experiences, and report any harmful content. 
            We're all here to support each other.
          </p>
        </div>
      </div>
    </main>
  )
}
