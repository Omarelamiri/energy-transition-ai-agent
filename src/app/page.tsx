// src/app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useDashboard } from '@/store/dashboard'
import GapTable from '@/components/GapTable'
import KpiSidebar from '@/components/KpiSidebar'
import Copilot from '@/components/Copilot'
import ObjectivesBar from '@/components/ObjectivesBar'
import NotificationBadge from '@/components/NotificationBadge'

export default function DashboardPage() {
  const { setOsemosysData, setBetasData, scenario, setScenario } = useDashboard()
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setOsemosysData(data.osemosys)
        setBetasData(data.betas)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-gray-950 text-white text-lg">
      Chargement des données…
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center h-screen bg-gray-950 text-red-400 text-lg">
      Erreur : {error}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">

      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">TransitionAgent</h1>
          <p className="text-sm text-gray-400">Marrakech-Safi · Prototype v1.0</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Scenario selector */}
          <select
            value={scenario}
            onChange={e => setScenario(e.target.value as any)}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded px-3 py-1.5"
          >
            <option value="central">Scénario central</option>
            <option value="optimistic">Optimiste</option>
            <option value="transition">Transition</option>
          </select>
          <NotificationBadge />
        </div>
      </header>

      {/* Objectives bar */}
      <ObjectivesBar />

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left sidebar — KPIs */}
        <aside className="w-64 border-r border-gray-800 p-4 overflow-y-auto shrink-0">
          <KpiSidebar />
        </aside>

        {/* Center — Gap table */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4 text-gray-100">
            Gap résiduel 2030
          </h2>
          <GapTable />
        </main>

        {/* Right — Copilot */}
        <aside className="w-96 border-l border-gray-800 flex flex-col shrink-0">
          <div className="px-4 py-3 border-b border-gray-800">
            <h2 className="text-sm font-semibold text-gray-300">Co-pilot IA</h2>
            <p className="text-xs text-gray-500">Gemini 2.5 Flash · Badge MEDIUM</p>
          </div>
          <Copilot />
        </aside>

      </div>
    </div>
  )
}