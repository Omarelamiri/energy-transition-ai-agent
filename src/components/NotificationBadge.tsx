// src/components/NotificationBadge.tsx
'use client'
import { useDashboard } from '@/store/dashboard'

const BADGE_COLORS: Record<string, string> = {
  HIGH:   'bg-green-500/20 text-green-400 border-green-500/30',
  MEDIUM: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  LOW:    'bg-red-500/20 text-red-400 border-red-500/30',
}

export default function NotificationBadge() {
  const { osemosysData } = useDashboard()
  const badge = osemosysData?.badge_global ?? 'MEDIUM'

  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${BADGE_COLORS[badge] ?? BADGE_COLORS.MEDIUM}`}>
      Confiance : {badge}
    </span>
  )
}