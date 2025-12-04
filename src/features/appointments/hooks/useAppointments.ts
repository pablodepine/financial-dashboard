import { useEffect } from 'react';
import { useAppointmentStore } from '@/stores';
import { useAuthStore } from '@/stores';
import { activeAppointmentService as appointmentService } from '@/shared/services';
import type { Appointment } from '@/types';

// Global tracking to prevent duplicate fetches
let fetchedForDashboardId: string | null = null;

export const useAppointments = (dashboardId: string) => {
  const { user } = useAuthStore();
  const {
    appointments,
    isLoading,
    error,
    setAppointments,
    updateAppointment,
    deleteAppointment,
    setLoading,
    setError,
  } = useAppointmentStore();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user || !dashboardId || fetchedForDashboardId === dashboardId) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await appointmentService.getByDashboardId(dashboardId);
        setAppointments(data);
        fetchedForDashboardId = dashboardId;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user, dashboardId, setAppointments, setLoading, setError]);

  const createAppointment = async (
    appointmentData: Omit<Appointment, 'id' | 'dashboardId' | 'createdAt' | 'updatedAt'>
  ): Promise<void> => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const fullAppointmentData = {
        ...appointmentData,
        dashboardId,
      };
      await appointmentService.create(dashboardId, fullAppointmentData);
      // Refresh appointments after creation
      const data = await appointmentService.getByDashboardId(dashboardId);
      setAppointments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar appointment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentById = async (id: string, updates: Partial<Appointment>) => {
    try {
      setLoading(true);
      setError(null);
      await appointmentService.update(id, updates);
      updateAppointment(id, updates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar appointment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointmentById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await appointmentService.delete(id);
      deleteAppointment(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar appointment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Filter appointments by dashboard
  const dashboardAppointments = appointments.filter(
    (appointment) => appointment.dashboardId === dashboardId
  );

  return {
    appointments: dashboardAppointments,
    isLoading,
    error,
    createAppointment,
    updateAppointment: updateAppointmentById,
    deleteAppointment: deleteAppointmentById,
  };
};