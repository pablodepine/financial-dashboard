import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui';
import type { Dashboard } from '@/types';

interface DashboardStatsProps {
  dashboard: Dashboard;
}

export const DashboardStats = ({ dashboard }: DashboardStatsProps) => {
  // TODO: Calculate real stats from appointments when feature is implemented
  console.log('Dashboard:', dashboard.id);
  const stats = [
    {
      title: 'Total de Receitas',
      value: 'R$ 0,00',
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'Total de Despesas',
      value: 'R$ 0,00',
      icon: TrendingDown,
      color: 'text-red-600',
    },
    {
      title: 'Saldo Atual',
      value: 'R$ 0,00',
      icon: DollarSign,
      color: 'text-blue-600',
    },
    {
      title: 'Appointments',
      value: '0',
      icon: Calendar,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.title === 'Appointments' ? 'Este mês' : 'Últimos 30 dias'}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};