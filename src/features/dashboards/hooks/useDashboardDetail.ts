import { useEffect, useState } from 'react';
import { useDashboardStore } from '@/stores';
import { activeDashboardService as dashboardService } from '@/shared/services';

export const useDashboardDetail = (dashboardId: string) => {
  const { selectedDashboard, selectDashboard } = useDashboardStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      // Se já temos o dashboard selecionado, usar ele
      if (selectedDashboard?.id === dashboardId) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Buscar dashboard específico da API
        const dashboard = await dashboardService.getById(dashboardId);
        selectDashboard(dashboard);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    if (dashboardId) {
      loadDashboard();
    }
  }, [dashboardId, selectedDashboard, selectDashboard]);

  return {
    dashboard: selectedDashboard,
    isLoading,
    error,
  };
};