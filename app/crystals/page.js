'use client'

import { useEffect, useRef, useState } from 'react'

export default function Crystals() {
  const canvasRef = useRef(null)
  const [selectedCrystal, setSelectedCrystal] = useState(null)
  const [crystals, setCrystals] = useState([
    {
      id: 1,
      title: 'Survivor Stories',
      validations: 234,
      color: '#a78bfa',
      size: 'large',
      resonance: 'high',
      integrity: 98
    },
    {
      id: 2,
      title: 'Legal Resources',
      validations: 156,
      color: '#60a5fa',
      size: 'medium',
      resonance: 'medium',
      integrity: 95
    },
    {
      id: 3,
      title: 'Healing Journey',
      validations: 189,
      color: '#c084fc',
      size: 'large',
      resonance: 'high',
      integrity: 97
    },
    {
      id: 4,
      title: 'Support Networks',
      validations: 98,
      color: '#818cf8',
      size: 'medium',
      resonance: 'medium',
      integrity: 92
    },
    {
      id: 5,
      title: 'Truth Unveiled',
      validations: 301,
      color: '#e879f9',
      size: 'large',
      resonance: 'high',
      integrity: 99
    }
  ])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationFrame

    // Simple 2D crystal visualization
    const drawCrystal = (x, y, size, color, glow) => {
      ctx.save()
      
      // Glow effect
      if (glow) {
        ctx.shadowBlur = 20
        ctx.shadowColor = color
      }

      // Draw crystal shape (hexagon)
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const px = x + size * Math.cos(angle)
        const py = y + size * Math.sin(angle)
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()

      // Fill with gradient
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
      gradient.addColorStop(0, color + 'ff')
      gradient.addColorStop(0.5, color + 'aa')
      gradient.addColorStop(1, color + '22')
      ctx.fillStyle = gradient
      ctx.fill()

      // Border
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.restore()
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 30, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      crystals.forEach((crystal, index) => {
        const x = (canvas.width / (crystals.length + 1)) * (index + 1)
        const y = canvas.height / 2 + Math.sin(Date.now() / 1000 + index) * 30
        const size = crystal.size === 'large' ? 60 : 40
        const glow = crystal.resonance === 'high'

        drawCrystal(x, y, size, crystal.color, glow)

        // Label
        ctx.fillStyle = '#fff'
        ctx.font = '12px Inter'
        ctx.textAlign = 'center'
        ctx.fillText(crystal.validations + ' validations', x, y + size + 20)
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [crystals])

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Knowledge Crystals
          </h1>
          <p className="text-gray-400">
            Watch truth crystallize through community validation
          </p>
        </div>

        {/* Canvas */}
        <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur border border-purple-500/30 rounded-lg overflow-hidden mb-8">
          <canvas 
            ref={canvasRef} 
            className="w-full h-96 cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = e.clientX - rect.left
              const clickedIndex = Math.floor((x / rect.width) * crystals.length)
              setSelectedCrystal(crystals[clickedIndex])
            }}
          />
        </div>

        {/* Crystal Details */}
        {selectedCrystal && (
          <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur border border-purple-500/30 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{selectedCrystal.title}</h2>
              <button 
                onClick={() => setSelectedCrystal(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-black/30 rounded p-4">
                <div className="text-sm text-gray-400 mb-1">Validations</div>
                <div className="text-2xl font-bold">{selectedCrystal.validations}</div>
              </div>
              <div className="bg-black/30 rounded p-4">
                <div className="text-sm text-gray-400 mb-1">Resonance</div>
                <div className="text-2xl font-bold capitalize">{selectedCrystal.resonance}</div>
              </div>
              <div className="bg-black/30 rounded p-4">
                <div className="text-sm text-gray-400 mb-1">Integrity</div>
                <div className="text-2xl font-bold">{selectedCrystal.integrity}%</div>
              </div>
            </div>

            <div className="bg-black/30 rounded p-4">
              <div className="text-sm text-gray-400 mb-2">Crystal Status</div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full crystal-glow"
                  style={{ backgroundColor: selectedCrystal.color }}
                />
                <span>Crystallized and Growing</span>
              </div>
            </div>
          </div>
        )}

        {/* Crystal Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crystals.map(crystal => (
            <div 
              key={crystal.id}
              onClick={() => setSelectedCrystal(crystal)}
              className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur border border-purple-500/30 rounded-lg p-6 cursor-pointer hover:border-purple-400 transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-8 h-8 rounded-full crystal-glow"
                  style={{ backgroundColor: crystal.color }}
                />
                <h3 className="font-bold">{crystal.title}</h3>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Validations</span>
                  <span className="font-semibold">{crystal.validations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Integrity</span>
                  <span className="font-semibold">{crystal.integrity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Resonance</span>
                  <span className="font-semibold capitalize">{crystal.resonance}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-purple-500/30">
                <div className="flex gap-2">
                  <button className="flex-1 bg-purple-600/50 hover:bg-purple-600 px-4 py-2 rounded text-sm transition">
                    Validate
                  </button>
                  <button className="flex-1 bg-blue-600/50 hover:bg-blue-600 px-4 py-2 rounded text-sm transition">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 bg-blue-900/30 border border-blue-500/30 rounded-lg p-6">
          <h3 className="font-bold mb-4">Understanding Crystals</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-purple-400">💎 Validations:</strong> Community confirmations of truth
            </div>
            <div>
              <strong className="text-blue-400">🔊 Resonance:</strong> Harmonic alignment with truth
            </div>
            <div>
              <strong className="text-indigo-400">✨ Integrity:</strong> Structural soundness of knowledge
            </div>
            <div>
              <strong className="text-purple-300">🌟 Growth:</strong> Crystals grow as more truth is added
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
