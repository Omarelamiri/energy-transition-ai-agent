import { NextRequest, NextResponse } from 'next/server'
import { buildCopilotGraph } from '@/lib/agent/graph'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export async function POST(req: NextRequest) {
  try {
    const { message, messages_history, scenario_active } = await req.json()
    const [elasticDoc, osemosysDoc] = await Promise.all([
      getDoc(doc(db, 'elasticities', 'marrakech_safi')),
      getDoc(doc(db, 'osemosys_results', 'current')),
    ])
    const initialState = {
      region: 'marrakech_safi',
      scenario_active: scenario_active ?? 'central',
      betas: elasticDoc.data()?.betas ?? {},
      gap_summary: osemosysDoc.data()?.technologies ?? {},
      result_badge_global: osemosysDoc.data()?.badge_global ?? 'MEDIUM',
      messages: [...(messages_history ?? []), { role: 'user', content: message }],
      turn_count: messages_history?.length ?? 0,
      current_response: '', response_badge: 'MEDIUM',
      response_sources: [], intent: 'other',
      needs_clarification: false, error: null,
    }
    const graph = buildCopilotGraph()
    const finalState = await graph.invoke(initialState)
    return NextResponse.json({
      response: finalState.current_response,
      badge: finalState.response_badge,
      sources: finalState.response_sources,
    })
  } catch (err: any) {
    return NextResponse.json({ error: 'ERR_COP_02' }, { status: 500 })
  }
}
