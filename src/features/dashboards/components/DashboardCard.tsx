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
      className="card-hover cursor-pointer group border-2 hover:border-primary/20 transition-all duration-300 overflow-hidden"
      onClick={onSelect}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <LayoutDashboard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {dashboard.name}
              </CardTitle>
              <CardDescription className="mt-1 line-clamp-2">
                {dashboard.description}
              </CardDescription>
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all duration-200"
            aria-label="Deletar dashboard"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Criado em {formatDate(dashboard.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-primary font-medium">
            <span>Ver detalhes</span>
            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </CardContent>

      {/* Efeito de gradiente no hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
};
