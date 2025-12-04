import { useMemo } from 'react';
import { useAppointments } from '@/features/appointments/hooks/useAppointments';
import { useAppointmentStore } from '@/stores';
import {
  processFinancialData,
  formatPieChartData,
  formatBarChartData,
  formatLineChartData,
  type FinancialSummary,
} from '../utils/financialCalculations';

export const useReports = (dashboardId?: string) => {
  // Always call hooks in the same order - use a default dashboardId if none provided
  const defaultDashboardId = dashboardId || 'default';
  const { appointments: dashboardAppointments, isLoading, error } = useAppointments(defaultDashboardId);
  const allAppointments = useAppointmentStore((state) => state.appointments);

  // Use dashboard appointments if dashboardId is provided and we have data, otherwise use all appointments
  const appointments = dashboardId && dashboardAppointments.length > 0 ? dashboardAppointments : allAppointments;

  const financialSummary: FinancialSummary = useMemo(() => {
    return processFinancialData(appointments);
  }, [appointments]);

  const pieChartData = useMemo(() => {
    return formatPieChartData(financialSummary.incomeByCategory);
  }, [financialSummary.incomeByCategory]);

  const barChartData = useMemo(() => {
    return formatBarChartData(financialSummary.monthlyData);
  }, [financialSummary.monthlyData]);

  const lineChartData = useMemo(() => {
    return formatLineChartData(financialSummary.monthlyData);
  }, [financialSummary.monthlyData]);

  return {
    financialSummary,
    pieChartData,
    barChartData,
    lineChartData,
    isLoading,
    error,
  };
};