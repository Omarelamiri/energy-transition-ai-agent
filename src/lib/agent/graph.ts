import { StateGraph, END, START } from '@langchain/langgraph'
import { CopilotStateAnnotation } from './state'
import { classifyIntent, callLLM, formatResponse } from './nodes'

export function buildCopilotGraph() {
  return new StateGraph(CopilotStateAnnotation)
    .addNode('classify_intent', classifyIntent)
    .addNode('call_llm', callLLM)
    .addNode('format_response', formatResponse)
    .addEdge(START, 'classify_intent')
    .addEdge('classify_intent', 'call_llm')
    .addEdge('call_llm', 'format_response')
    .addEdge('format_response', END)
    .compile()
}