import { StateGraph, END } from '@langchain/langgraph'
import { CopilotStateAnnotation } from './state'
import { classifyIntent, callLLM, formatResponse } from './nodes'

export function buildCopilotGraph() {
  const graph = new StateGraph(CopilotStateAnnotation)

  graph.addNode('classify_intent', classifyIntent)
  graph.addNode('call_llm', callLLM)
  graph.addNode('format_response', formatResponse)
  graph.setEntryPoint('classify_intent')
  graph.addEdge('classify_intent', 'call_llm')
  graph.addEdge('call_llm', 'format_response')
  graph.addEdge('format_response', END)
  return graph.compile()
}