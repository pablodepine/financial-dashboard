import { Calendar, Edit3 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/shared/components/ui';
import { formatDate } from '@/shared/utils';
import type { Dashboard } from '@/types';

interface DashboardHeaderProps {
  dashboard: Dashboard;
}

export const DashboardHeader = ({ dashboard }: DashboardHeaderProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold">{dashboard.name}</CardTitle>
            <CardDescription className="text-lg">{dashboard.description}</CardDescription>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Criado em {formatDate(dashboard.createdAt)}</span>
              </div>
              {dashboard.updatedAt !== dashboard.createdAt && (
                <div className="flex items-center gap-1">
                  <Edit3 className="h-4 w-4" />
                  <span>Atualizado em {formatDate(dashboard.updatedAt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};