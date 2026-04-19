import { Annotation } from '@langchain/langgraph'

export const CopilotStateAnnotation = Annotation.Root({
  region:              Annotation<string>({ default: () => 'marrakech_safi', reducer: (_, b) => b }),
  scenario_active:     Annotation<string>({ default: () => 'central',        reducer: (_, b) => b }),
  betas:               Annotation<Record<string, any>>({ default: () => ({}),  reducer: (_, b) => b }),
  gap_summary:         Annotation<Record<string, any>>({ default: () => ({}),  reducer: (_, b) => b }),
  result_badge_global: Annotation<string>({ default: () => 'MEDIUM',          reducer: (_, b) => b }),
  messages:            Annotation<Array<{role: string; content: string}>>({ default: () => [], reducer: (_, b) => b }),
  turn_count:          Annotation<number>({ default: () => 0,                 reducer: (_, b) => b }),
  current_response:    Annotation<string>({ default: () => '',                reducer: (_, b) => b }),
  response_badge:      Annotation<string>({ default: () => 'MEDIUM',          reducer: (_, b) => b }),
  response_sources:    Annotation<string[]>({ default: () => [],              reducer: (_, b) => b }),
  intent:              Annotation<string>({ default: () => 'other',           reducer: (_, b) => b }),
  needs_clarification: Annotation<boolean>({ default: () => false,            reducer: (_, b) => b }),
  error:               Annotation<string | null>({ default: () => null,       reducer: (_, b) => b }),
})

export type CopilotState = typeof CopilotStateAnnotation.State