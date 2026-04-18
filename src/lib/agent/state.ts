export interface CopilotState {
  // Contexte injecté au démarrage (depuis Firestore)
  region: string
  scenario_active: string
  betas: Record<string, any>
  gap_summary: Record<string, any>
  result_badge_global: string

  // Mémoire de conversation
  messages: Array<{ role: string; content: string }>
  turn_count: number

  // Output de chaque nœud
  current_response: string
  response_badge: string
  response_sources: string[]

  // Contrôle du flux
  intent: string
  needs_clarification: boolean
  error: string | null
}
