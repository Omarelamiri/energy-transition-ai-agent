import { StateGraph, END } from '@langchain/langgraph'
import { CopilotState } from './state'
import { classifyIntent, callLLM, formatResponse } from './nodes'

export function buildCopilotGraph() {
  const graph = new StateGraph<CopilotState>({
    channels: {
      region:               { default: () => 'marrakech_safi' },
      scenario_active:      { default: () => 'central' },
      betas:                { default: () => ({}) },
      gap_summary:          { default: () => ({}) },
      result_badge_global:  { default: () => 'MEDIUM' },
      messages:             { default: () => [] },
      turn_count:           { default: () => 0 },
      current_response:     { default: () => '' },
      response_badge:       { default: () => 'MEDIUM' },
      response_sources:     { default: () => [] },
      intent:               { default: () => 'other' },
      needs_clarification:  { default: () => false },
      error:                { default: () => null },
    }
  })
  graph.addNode('classify_intent', classifyIntent)
  graph.addNode('call_llm', callLLM)
  graph.addNode('format_response', formatResponse)
  graph.setEntryPoint('classify_intent')
  graph.addEdge('classify_intent', 'call_llm')
  graph.addEdge('call_llm', 'format_response')
  graph.addEdge('format_response', END)
  return graph.compile()
}
