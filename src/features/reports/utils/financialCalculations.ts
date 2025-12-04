import type { Appointment } from '@/types';
import { startOfMonth, endOfMonth, eachMonthOfInterval, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface MonthlyData {
  month: string;
  year: number;
  income: number;
  expenses: number;
  balance: number;
}

export interface CategoryData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
  monthlyData: MonthlyData[];
  incomeByCategory: CategoryData[];
  expensesByCategory: CategoryData[];
  averageMonthlyIncome: number;
  averageMonthlyExpenses: number;
}

/**
 * Processa os appointments e gera um resumo financeiro completo
 */
export const processFinancialData = (appointments: Appointment[]): FinancialSummary => {
  const now = new Date();
  const sixMonthsAgo = subMonths(now, 5);

  // Filtrar appointments dos últimos 6 meses
  const recentAppointments = appointments.filter(apt =>
    apt.date >= sixMonthsAgo && apt.date <= now
  );

  // Calcular totais
  const totalIncome = recentAppointments
    .filter(apt => !('paymentMethod' in apt))
    .reduce((sum, apt) => sum + apt.value, 0);

  const totalExpenses = recentAppointments
    .filter(apt => 'paymentMethod' in apt)
    .reduce((sum, apt) => sum + apt.value, 0);

  const totalBalance = totalIncome - totalExpenses;

  // Gerar dados mensais
  const months = eachMonthOfInterval({ start: sixMonthsAgo, end: now });
  const monthlyData: MonthlyData[] = months.map(month => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);

    const monthAppointments = recentAppointments.filter(
      apt => apt.date >= monthStart && apt.date <= monthEnd
    );

    const income = monthAppointments
      .filter(apt => !('paymentMethod' in apt))
      .reduce((sum, apt) => sum + apt.value, 0);

    const expenses = monthAppointments
      .filter(apt => 'paymentMethod' in apt)
      .reduce((sum, apt) => sum + apt.value, 0);

    return {
      month: format(month, 'MMM', { locale: ptBR }),
      year: month.getFullYear(),
      income,
      expenses,
      balance: income - expenses,
    };
  });

  // Processar categorias de receita
  const incomeCategories = new Map<string, number>();
  recentAppointments
    .filter(apt => !('paymentMethod' in apt))
    .forEach(apt => {
      const current = incomeCategories.get(apt.type) || 0;
      incomeCategories.set(apt.type, current + apt.value);
    });

  const incomeByCategory: CategoryData[] = Array.from(incomeCategories.entries())
    .map(([name, value]) => ({
      name,
      value,
      percentage: totalIncome > 0 ? (value / totalIncome) * 100 : 0,
      color: getCategoryColor(name, 'income'),
    }))
    .sort((a, b) => b.value - a.value);

  // Processar categorias de despesa
  const expenseCategories = new Map<string, number>();
  recentAppointments
    .filter(apt => 'paymentMethod' in apt)
    .forEach(apt => {
      const current = expenseCategories.get(apt.type) || 0;
      expenseCategories.set(apt.type, current + apt.value);
    });

  const expensesByCategory: CategoryData[] = Array.from(expenseCategories.entries())
    .map(([name, value]) => ({
      name,
      value,
      percentage: totalExpenses > 0 ? (value / totalExpenses) * 100 : 0,
      color: getCategoryColor(name, 'expense'),
    }))
    .sort((a, b) => b.value - a.value);

  // Calcular médias mensais
  const averageMonthlyIncome = monthlyData.length > 0
    ? monthlyData.reduce((sum, month) => sum + month.income, 0) / monthlyData.length
    : 0;

  const averageMonthlyExpenses = monthlyData.length > 0
    ? monthlyData.reduce((sum, month) => sum + month.expenses, 0) / monthlyData.length
    : 0;

  return {
    totalIncome,
    totalExpenses,
    totalBalance,
    monthlyData,
    incomeByCategory,
    expensesByCategory,
    averageMonthlyIncome,
    averageMonthlyExpenses,
  };
};

/**
 * Retorna uma cor baseada na categoria e tipo
 */
const getCategoryColor = (category: string, type: 'income' | 'expense'): string => {
  const colors = {
    income: {
      'Salário': '#10b981', // green-500
      'Caju': '#059669',   // green-600
      'Outros': '#047857', // green-700
    },
    expense: {
      'Mercado': '#ef4444',    // red-500
      'Lazer': '#dc2626',     // red-600
      'Apartamento': '#b91c1c', // red-700
      'Pessoal': '#991b1b',   // red-800
      'TaxasTarifas': '#7f1d1d', // red-900
      'Investimento': '#f97316', // orange-500
      'Olavo': '#ea580c',     // orange-600
      'Farmacia': '#c2410c',  // orange-700
    },
  };

  return colors[type][category as keyof typeof colors[typeof type]] || '#6b7280'; // gray-500
};

/**
 * Formata dados para gráfico de pizza
 */
export const formatPieChartData = (data: CategoryData[]) => {
  return data.map(item => ({
    name: item.name,
    value: item.value,
    percentage: item.percentage,
    fill: item.color,
  }));
};

/**
 * Formata dados para gráfico de barras
 */
export const formatBarChartData = (monthlyData: MonthlyData[]) => {
  return monthlyData.map(month => ({
    name: month.month,
    value: month.income,
    fill: '#10b981', // green-500
  }));
};

/**
 * Formata dados para gráfico de linha (tendência)
 */
export const formatLineChartData = (monthlyData: MonthlyData[]) => {
  return monthlyData.map(month => ({
    name: month.month,
    value: month.balance,
    date: month.month,
  }));
};