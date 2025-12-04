import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Plus } from 'lucide-react';
import { useDashboardDetail } from '../hooks/useDashboardDetail';
import { DashboardHeader } from './DashboardHeader';
import { DashboardStats } from './DashboardStats';
import { AppointmentsSection } from './AppointmentsSection';
import { Button } from '@/shared/components/ui';

export const DashboardDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dashboard, isLoading, error } = useDashboardDetail(id!);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Carregando dashboard...</div>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Dashboard não encontrado</h2>
          <Button onClick={() => navigate('/dashboards')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Dashboards
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header com navegação */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboards')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Novo Appointment
            </Button>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="space-y-8">
          <DashboardHeader dashboard={dashboard} />
          <DashboardStats dashboard={dashboard} />
          <AppointmentsSection dashboardId={dashboard.id} />
        </div>
      </div>
    </div>
  );
};