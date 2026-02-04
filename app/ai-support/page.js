'use client'

import { useState, useRef, useEffect } from 'react'

export default function AISupport() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello, I\'m here to support you. This is a safe, confidential space. You can share whatever is on your mind, ask questions, or just talk. How are you feeling today?'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input }
    setMessages([...messages, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Call Claude API
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are a compassionate AI counselor for survivors of trauma and abuse. You provide:
- Emotional support and validation
- Resources for healing and recovery
- Crisis intervention when needed
- Information about therapy, legal options, and support groups
- A safe, non-judgmental space to share

Always be empathetic, never minimize their experiences, and prioritize their safety and wellbeing. If someone is in immediate danger, encourage them to call emergency services.`,
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      })

      const data = await response.json()
      const assistantMessage = {
        role: 'assistant',
        content: data.content[0].text
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error calling Claude API:', error)
      const errorMessage = {
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment. If you\'re in crisis, please call the National Suicide Prevention Lifeline at 988.'
      }
      setMessages(prev => [...prev, errorMessage])
    }

    setIsLoading(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 h-screen flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            AI Support & Guidance
          </h1>
          <p className="text-gray-400">Powered by Claude AI - Available 24/7</p>
        </div>

        {/* Crisis Resources */}
        <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4 mb-6">
          <p className="text-sm font-semibold text-red-300 mb-2">🚨 Crisis Resources</p>
          <div className="grid md:grid-cols-3 gap-2 text-xs text-gray-300">
            <div>Suicide Prevention: <strong>988</strong></div>
            <div>Crisis Text Line: <strong>741741</strong></div>
            <div>RAINN Hotline: <strong>1-800-656-4673</strong></div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-purple-900/20 backdrop-blur border border-purple-500/30 rounded-lg overflow-hidden flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-purple-600'
                      : 'bg-blue-900/50 border border-blue-500/30'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">
                      {message.role === 'user' ? '👤' : '🤖'}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-300 whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-blue-900/50 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🤖</span>
                    <div className="flex gap-1">
                      <span className="animate-bounce">●</span>
                      <span className="animate-bounce delay-100">●</span>
                      <span className="animate-bounce delay-200">●</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-purple-500/30 p-4">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here... (Press Enter to send)"
                rows="3"
                className="flex-1 bg-black/30 border border-purple-500/30 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 resize-none"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 px-6 py-2 rounded-lg font-semibold transition"
              >
                Send
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              💙 Your conversation is confidential. Claude AI is here to listen and support you.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4">
          <p className="text-xs text-gray-300">
            <strong>⚠️ Important:</strong> This AI support is not a substitute for professional mental health care. 
            If you're experiencing a mental health crisis or are in danger, please contact emergency services or 
            call the crisis hotlines listed above.
          </p>
        </div>
      </div>
    </main>
  )
}
