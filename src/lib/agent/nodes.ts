import { CopilotState } from './state'
import { buildPrompt } from './prompts'
import { gemini } from '../gemini'

export async function classifyIntent(state: CopilotState): Promise<Partial<CopilotState>> {
  const last = state.messages[state.messages.length - 1].content
  const result = await gemini.generateContent(
    `Classifie en UN MOT : elasticity | gap | project | simulation | other\nQuestion: "${last}"\nRéponds uniquement avec le mot.`
  )
  return { intent: result.response.text().trim().toLowerCase() }
}

export async function callLLM(state: CopilotState): Promise<Partial<CopilotState>> {
  const systemPrompt = buildPrompt(state)
  const contents = [
    { role: 'user', parts: [{ text: systemPrompt }] },
    ...state.messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }))
  ]
  const result = await gemini.generateContent({ contents })
  const sources: string[] = []
  if (state.intent === 'elasticity') sources.push('betas_estimated', 'these_marrakech_safi')
  if (state.intent === 'gap')        sources.push('osemosys_fixture_v1', 'irena_2024')
  return {
    current_response: result.response.text(),
    response_badge: state.result_badge_global,
    response_sources: sources,
  }
}

export async function formatResponse(state: CopilotState): Promise<Partial<CopilotState>> {
  return { messages: [...state.messages, { role: 'assistant', content: state.current_response }], turn_count: state.turn_count + 1 }
}
