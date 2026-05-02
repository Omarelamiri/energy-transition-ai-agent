// src/components/Copilot.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import { useDashboard } from '@/store/dashboard'

interface Message {
  role: 'user' | 'assistant'
  content: string
  badge?: string
  sources?: string[]
}

export default function Copilot() {
  const { scenario } = useDashboard()
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Bonjour ! Je suis votre co-pilot TransitionAgent. Posez-moi vos questions sur les gaps énergétiques, les élasticités ou les scénarios 2030.' }
  ])
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef             = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send() {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: 'user', content: text }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          messages_history: messages.map(m => ({ role: m.role, content: m.content })),
          scenario_active: scenario,
        }),
      })
      const data = await res.json()
      setMessages([...history, {
        role: 'assistant',
        content: data.response ?? data.error ?? 'Erreur inconnue.',
        badge: data.badge,
        sources: data.sources,
      }])
    } catch {
      setMessages([...history, { role: 'assistant', content: '❌ Erreur réseau.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
              m.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-100'
            }`}>
              <p className="whitespace-pre-wrap">{m.content}</p>
              {m.badge && (
                <p className="text-xs text-gray-400 mt-1">
                  Confiance : {m.badge}
                  {m.sources?.length ? ` · ${m.sources.join(', ')}` : ''}
                </p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-xl px-3 py-2 text-sm text-gray-400 animate-pulse">
              Analyse en cours…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-800 p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Posez votre question…"
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Envoyer
        </button>
      </div>

    </div>
  )
}