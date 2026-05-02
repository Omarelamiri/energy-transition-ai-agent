// src/components/GapTable.tsx
'use client'
import { useDashboard } from '@/store/dashboard'

const BADGE_COLORS: Record<string, string> = {
  HIGH:   'bg-green-500/20 text-green-400',
  MEDIUM: 'bg-yellow-500/20 text-yellow-400',
  LOW:    'bg-red-500/20 text-red-400',
}

const ROWS = [
  { key: 'solar_pv',   label: '☀️ Solaire PV',  unit: 'MW'  },
  { key: 'wind',       label: '💨 Éolien',       unit: 'MW'  },
  { key: 'storage',    label: '🔋 Stockage',     unit: 'MW'  },
  { key: 'efficiency', label: '⚡ Efficacité',   unit: 'GWh' },
]

export default function GapTable() {
  const { osemosysData } = useDashboard()
  const techs = osemosysData?.technologies ?? {}

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-900 text-gray-400 text-xs uppercase tracking-wider">
            <th className="px-4 py-3 text-left">Technologie</th>
            <th className="px-4 py-3 text-right">Existant</th>
            <th className="px-4 py-3 text-right">Requis 2030</th>
            <th className="px-4 py-3 text-right">Gap</th>
            <th className="px-4 py-3 text-right">LCOE (MAD/kWh)</th>
            <th className="px-4 py-3 text-center">Confiance</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {ROWS.map(row => {
            const t     = techs[row.key] ?? {}
            const exist = t.existing_mw  ?? t.existing_gwh  ?? '—'
            const need  = t.needed_mw    ?? t.needed_gwh    ?? '—'
            const gap   = t.gap_mw       ?? t.gap_gwh       ?? '—'
            const lcoe  = t.lcoe != null ? t.lcoe.toFixed(2) : '—'
            const badge = t.badge ?? 'MEDIUM'

            return (
              <tr key={row.key} className="bg-gray-950 hover:bg-gray-900 transition-colors">
                <td className="px-4 py-3 font-medium text-white">{row.label}</td>
                <td className="px-4 py-3 text-right text-gray-400">{exist} {row.unit}</td>
                <td className="px-4 py-3 text-right text-gray-300">{need} {row.unit}</td>
                <td className="px-4 py-3 text-right font-semibold text-yellow-400">{gap} {row.unit}</td>
                <td className="px-4 py-3 text-right text-gray-400">{lcoe}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${BADGE_COLORS[badge] ?? BADGE_COLORS.MEDIUM}`}>
                    {badge}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}