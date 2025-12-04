import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui';
import { formatCurrency } from '@/shared/utils';
import { useAppointments } from '@/features/appointments/hooks/useAppointments';
import type { Dashboard } from '@/types';

interface DashboardStatsProps {
  dashboard: Dashboard;
}

export const DashboardStats = ({ dashboard }: DashboardStatsProps) => {
  const { appointments } = useAppointments(dashboard.id);

  // Calculate real stats from appointments
  const totalIncome = appointments
    .filter(apt => !('paymentMethod' in apt)) // Income appointments don't have paymentMethod
    .reduce((sum, apt) => sum + apt.value, 0);

  const totalExpenses = appointments
    .filter(apt => 'paymentMethod' in apt) // Expense appointments have paymentMethod
    .reduce((sum, apt) => sum + apt.value, 0);

  const balance = totalIncome - totalExpenses;
  const totalAppointments = appointments.length;

  const stats = [
    {
      title: 'Total de Receitas',
      value: formatCurrency(totalIncome),
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'Total de Despesas',
      value: formatCurrency(totalExpenses),
      icon: TrendingDown,
      color: 'text-red-600',
    },
    {
      title: 'Saldo Atual',
      value: formatCurrency(balance),
      icon: DollarSign,
      color: balance >= 0 ? 'text-green-600' : 'text-red-600',
    },
    {
      title: 'Appointments',
      value: totalAppointments.toString(),
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
              {stat.title === 'Appointments' ? 'Total cadastrados' : 'Valor acumulado'}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};;