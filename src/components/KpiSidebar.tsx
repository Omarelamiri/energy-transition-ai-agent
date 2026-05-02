// src/components/KpiSidebar.tsx
'use client'
import { useDashboard } from '@/store/dashboard'

function KpiCard({ label, value, sub, color }: {
  label: string; value: string; sub?: string; color: string
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 mb-3">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </div>
  )
}

export default function KpiSidebar() {
  const { osemosysData, betasData } = useDashboard()
  const o = osemosysData ?? {}
  const b = betasData?.betas ?? {}

  const gapMw   = o.gap_total_mw ?? '—'
  const gapCost = o.gap_total_cost_mad
    ? `${(o.gap_total_cost_mad / 1e9).toFixed(1)} Md MAD`
    : '—'

  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Indicateurs clés
      </p>

      <KpiCard
        label="Gap total 2030"
        value={`${gapMw} MW`}
        sub="Scénario central"
        color="text-yellow-400"
      />
      <KpiCard
        label="Coût estimé"
        value={gapCost}
        sub="Investissement requis"
        color="text-blue-400"
      />
      <KpiCard
        label="β₁ PIB régional"
        value={b.b1?.value ?? '—'}
        sub={`IC [${b.b1?.ci_lower ?? '?'}, ${b.b1?.ci_upper ?? '?'}]`}
        color="text-green-400"
      />
      <KpiCard
        label="β₂ Population"
        value={b.b2?.value ?? '—'}
        sub={`Badge : ${b.b2?.badge ?? '?'}`}
        color="text-green-400"
      />
      <KpiCard
        label="β₃ Prix élec."
        value={b.b3?.value ?? '—'}
        sub="Élasticité-prix"
        color="text-red-400"
      />
      <KpiCard
        label="R² modèle"
        value={betasData?.r_squared ?? '—'}
        sub={betasData?.period ?? ''}
        color="text-purple-400"
      />
    </div>
  )
}