import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Meus Dashboards</h1>
            <p className="text-muted-foreground mt-2">
              Olá, <span className="font-medium">{user?.displayName || user?.email}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setIsModalOpen(true)} size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Novo Dashboard
            </Button>
            <Button onClick={handleSignOut} variant="outline" size="lg">
              <LogOut className="mr-2 h-5 w-5" />
              Sair
            </Button>
          </div>
        </div>

        {/* Dashboards Grid */}
        {dashboards.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nenhum dashboard criado</h3>
            <p className="text-muted-foreground mb-6">
              Comece criando seu primeiro dashboard financeiro
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2 h-5 w-5" />
              Criar Primeiro Dashboard
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboards.map((dashboard) => (
              <DashboardCard
                key={dashboard.id}
                dashboard={dashboard}
                onSelect={() => handleSelectDashboard(dashboard.id)}
                onDelete={() => handleDeleteDashboard(dashboard.id)}
              />
            ))}
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
