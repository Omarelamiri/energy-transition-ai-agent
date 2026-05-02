// src/components/ObjectivesBar.tsx
'use client'
import { useDashboard } from '@/store/dashboard'

const OBJECTIVES = [
  { label: 'Solaire PV',  target: 280, unit: 'MW',  key: 'solar_pv',   color: 'bg-yellow-400' },
  { label: 'Éolien',      target: 160, unit: 'MW',  key: 'wind',       color: 'bg-blue-400'   },
  { label: 'Stockage',    target: 50,  unit: 'MW',  key: 'storage',    color: 'bg-purple-400' },
  { label: 'Efficacité',  target: 80,  unit: 'GWh', key: 'efficiency', color: 'bg-green-400'  },
]

export default function ObjectivesBar() {
  const { osemosysData } = useDashboard()
  const techs = osemosysData?.technologies ?? {}

  return (
    <div className="border-b border-gray-800 px-6 py-3 flex gap-6 bg-gray-900/50">
      {OBJECTIVES.map(obj => {
        const tech     = techs[obj.key]
        const existing = tech?.existing_mw ?? tech?.existing_gwh ?? 0
        const pct      = Math.min(Math.round((existing / obj.target) * 100), 100)

        return (
          <div key={obj.key} className="flex-1 min-w-0">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>{obj.label}</span>
              <span>{existing} / {obj.target} {obj.unit}</span>
            </div>
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${obj.color}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}