import { create } from 'zustand';
import { Dashboard } from '@/types';

interface DashboardState {
  dashboards: Dashboard[];
  selectedDashboard: Dashboard | null;
  isLoading: boolean;
  error: string | null;
  setDashboards: (dashboards: Dashboard[]) => void;
  addDashboard: (dashboard: Dashboard) => void;
  updateDashboard: (id: string, updates: Partial<Dashboard>) => void;
  deleteDashboard: (id: string) => void;
  selectDashboard: (dashboard: Dashboard | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  dashboards: [],
  selectedDashboard: null,
  isLoading: false,
  error: null,
  setDashboards: (dashboards) => set({ dashboards }),
  addDashboard: (dashboard) => set((state) => ({ dashboards: [...state.dashboards, dashboard] })),
  updateDashboard: (id, updates) =>
    set((state) => ({
      dashboards: state.dashboards.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    })),
  deleteDashboard: (id) =>
    set((state) => ({
      dashboards: state.dashboards.filter((d) => d.id !== id),
    })),
  selectDashboard: (dashboard) => set({ selectedDashboard: dashboard }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
