import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut, BarChart3, Layout } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useDashboards } from '../hooks/useDashboards';
import { DashboardCard } from './DashboardCard';
import { CreateDashboardModal } from './CreateDashboardModal';
import { Button } from '@/shared/components/ui';

export const DashboardsListPage = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { dashboards, isLoading, createDashboard, deleteDashboard, selectDashboard } =
    useDashboards();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateDashboard = async (name: string, description: string) => {
    await createDashboard(name, description);
  };

  const handleSelectDashboard = (dashboardId: string) => {
    const dashboard = dashboards.find((d) => d.id === dashboardId);
    if (dashboard) {
      selectDashboard(dashboard);
      navigate(`/dashboard/${dashboardId}`);
    }
  };

  const handleDeleteDashboard = async (dashboardId: string) => {
    await deleteDashboard(dashboardId);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (isLoading && dashboards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Header Moderno */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Dashboard Financeiro
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gradient">
                Meus Dashboards
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Organize e visualize todas as suas finanças em um só lugar.
                Crie dashboards personalizados para acompanhar seus objetivos financeiros.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
              <Button
                onClick={() => navigate('/reports')}
                variant="outline"
                size="lg"
                className="border-2 hover:border-primary hover:bg-primary/5 transition-all duration-200"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                Ver Relatórios
              </Button>
              <Button
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className="btn-primary shadow-xl hover:shadow-2xl"
              >
                <Plus className="mr-2 h-5 w-5" />
                Novo Dashboard
              </Button>
            </div>
          </div>

          {/* Barra de status */}
          <div className="mt-8 flex items-center justify-between p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-foreground">
                  Olá, <span className="text-primary">{user?.displayName || user?.email}</span>
                </span>
              </div>
            </div>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>

        {/* Conteúdo Principal */}
        {dashboards.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto space-y-6">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-primary mb-6">
                <Layout className="h-12 w-12 text-white" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground">
                  Comece sua jornada financeira
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Crie seu primeiro dashboard para organizar receitas, despesas e acompanhar seus objetivos financeiros.
                </p>
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className="btn-primary shadow-xl hover:shadow-2xl px-8 py-4 text-lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                Criar Primeiro Dashboard
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                Seus Dashboards ({dashboards.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {dashboards.map((dashboard) => (
                <DashboardCard
                  key={dashboard.id}
                  dashboard={dashboard}
                  onSelect={() => handleSelectDashboard(dashboard.id)}
                  onDelete={() => handleDeleteDashboard(dashboard.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <CreateDashboardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateDashboard}
      />
    </div>
  );
};
