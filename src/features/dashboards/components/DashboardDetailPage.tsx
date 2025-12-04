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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header Moderno */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/dashboards')}
                className="border-2 hover:border-primary hover:bg-primary/5 transition-all duration-200"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar
              </Button>

              <div className="hidden sm:block w-px h-12 bg-border"></div>

              <div>
                <h1 className="text-3xl font-bold text-gradient">
                  {dashboard.name}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {dashboard.description}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                className="border-2 hover:border-primary hover:bg-primary/5 transition-all duration-200"
              >
                <Settings className="h-5 w-5 mr-2" />
                Configurações
              </Button>
              <Button
                size="lg"
                className="btn-primary shadow-xl hover:shadow-2xl"
              >
                <Plus className="h-5 w-5 mr-2" />
                Novo Agendamento
              </Button>
            </div>
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