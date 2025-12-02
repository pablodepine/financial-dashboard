import { useEffect } from 'react';
import { useDashboardStore } from '@/stores';
import { useAuthStore } from '@/stores';
import { dashboardService } from '@/shared/services';
import type { Dashboard } from '@/types';

export const useDashboards = () => {
  const { user } = useAuthStore();
  const {
    dashboards,
    selectedDashboard,
    isLoading,
    error,
    setDashboards,
    addDashboard,
    updateDashboard,
    deleteDashboard,
    selectDashboard,
    setLoading,
    setError,
  } = useDashboardStore();

  useEffect(() => {
    if (user) {
      loadDashboards();
    }
  }, [user]);

  const loadDashboards = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const dashboards = await dashboardService.getByUserId(user.id);
      setDashboards(dashboards);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dashboards');
    } finally {
      setLoading(false);
    }
  };

  const createDashboard = async (name: string, description: string) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const dashboard = await dashboardService.create(user.id, name, description);
      addDashboard(dashboard);
      return dashboard;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar dashboard');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateDashboardInfo = async (id: string, updates: Partial<Dashboard>) => {
    try {
      setLoading(true);
      setError(null);
      await dashboardService.update(id, updates);
      updateDashboard(id, updates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar dashboard');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeDashboard = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await dashboardService.delete(id);
      deleteDashboard(id);
      if (selectedDashboard?.id === id) {
        selectDashboard(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar dashboard');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    dashboards,
    selectedDashboard,
    isLoading,
    error,
    createDashboard,
    updateDashboard: updateDashboardInfo,
    deleteDashboard: removeDashboard,
    selectDashboard,
    refresh: loadDashboards,
  };
};
