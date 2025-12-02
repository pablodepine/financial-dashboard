import { LayoutDashboard, Calendar, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/components/ui';
import { formatDate } from '@/shared/utils';
import type { Dashboard } from '@/types';

interface DashboardCardProps {
  dashboard: Dashboard;
  onSelect: () => void;
  onDelete: () => void;
}

export const DashboardCard = ({ dashboard, onSelect, onDelete }: DashboardCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja excluir este dashboard?')) {
      onDelete();
    }
  };

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md hover:border-primary"
      onClick={onSelect}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">{dashboard.name}</CardTitle>
          </div>
          <button
            onClick={handleDelete}
            className="text-muted-foreground hover:text-destructive transition-colors"
            aria-label="Deletar dashboard"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <CardDescription className="mt-2">{dashboard.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Criado em {formatDate(dashboard.createdAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
};
