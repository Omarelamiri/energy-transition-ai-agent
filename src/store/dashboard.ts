import { create } from 'zustand'

interface DashboardState {
  scenario: 'optimistic' | 'central' | 'transition'
  osemosysData: any | null
  betasData: any | null
  sliderOverrides: { solar_pv_mw: number; wind_mw: number; tourism_growth: number; ee_ambition: number }
  setScenario: (s: DashboardState['scenario']) => void
  setOsemosysData: (d: any) => void
  setBetasData: (d: any) => void
  updateSlider: (key: string, value: number) => void
}

export const useDashboard = create<DashboardState>((set) => ({
  scenario: 'central',
  osemosysData: null,
  betasData: null,
  sliderOverrides: { solar_pv_mw: 0, wind_mw: 0, tourism_growth: 0, ee_ambition: 0 },
  setScenario: (scenario) => set({ scenario }),
  setOsemosysData: (osemosysData) => set({ osemosysData }),
  setBetasData: (betasData) => set({ betasData }),
  updateSlider: (key, value) =>
    set((state) => ({ sliderOverrides: { ...state.sliderOverrides, [key]: value } })),
}))
