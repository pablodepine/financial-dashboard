import { useEffect } from 'react';
import { useDashboardStore } from '@/stores';
import { useAuthStore } from '@/stores';
import { activeDashboardService as dashboardService } from '@/shared/services';
import type { Dashboard } from '@/types';

// Global tracking to prevent duplicate fetches
let fetchedForUserId: string | null = null;
let isFetching = false;

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
    // Reset when user logs out
    if (!user) {
      fetchedForUserId = null;
      return;
    }

    // Skip if already fetched for this user or currently fetching
    if (fetchedForUserId === user.id || isFetching) {
      return;
    }

    const fetchDashboards = async () => {
      isFetching = true;
      try {
        setLoading(true);
        setError(null);
        const data = await dashboardService.getByUserId(user.id);
        setDashboards(data);
        fetchedForUserId = user.id;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar dashboards');
      } finally {
        setLoading(false);
        isFetching = false;
      }
    };

    fetchDashboards();
  }, [user, setDashboards, setLoading, setError]);

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

  const refresh = async () => {
    if (!user || isFetching) return;
    
    isFetching = true;
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.getByUserId(user.id);
      setDashboards(data);
      fetchedForUserId = user.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dashboards');
    } finally {
      setLoading(false);
      isFetching = false;
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
    refresh,
  };
};
