import { useReports } from '../hooks/useReports';
import { PieChart } from './PieChart';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import { StatCard } from './StatCard';
import { formatCurrency } from '@/shared/utils';

export const ReportsPage = () => {
  const {
    financialSummary,
    pieChartData,
    barChartData,
    lineChartData,
    isLoading,
    error,
  } = useReports();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Carregando relatórios...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-600">Erro ao carregar relatórios: {error}</div>
        </div>
      </div>
    );
  }

  if (!financialSummary) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Nenhum dado disponível para relatórios</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Relatórios Financeiros</h1>
        <p className="text-muted-foreground mt-2">
          Análise detalhada dos seus dados financeiros
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Receita Total"
          value={financialSummary.totalIncome}
          change={{ value: 12.5, type: 'increase' }}
        />
        <StatCard
          title="Despesas Totais"
          value={financialSummary.totalExpenses}
          change={{ value: 8.2, type: 'decrease' }}
        />
        <StatCard
          title="Saldo Líquido"
          value={financialSummary.totalBalance}
          change={{ value: 15.3, type: 'increase' }}
        />
        <StatCard
          title="Média Mensal Receitas"
          value={financialSummary.averageMonthlyIncome}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChart
          data={pieChartData}
          title="Distribuição por Categoria"
        />

        <BarChart
          data={barChartData}
          title="Receitas por Mês"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <LineChart
          data={lineChartData}
          title="Tendência de Receitas"
        />
      </div>

      {/* Resumo Detalhado */}
      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Resumo Detalhado</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium mb-2">Receitas por Categoria</h3>
            <div className="space-y-1">
              {financialSummary.incomeByCategory.map((category) => (
                <div key={category.name} className="flex justify-between text-sm">
                  <span>{category.name}</span>
                  <span className="font-medium">{formatCurrency(category.value)}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Dados Mensais</h3>
            <div className="space-y-1">
              {financialSummary.monthlyData.slice(-6).map((month) => (
                <div key={month.month} className="flex justify-between text-sm">
                  <span>{month.month}</span>
                  <span className="font-medium">{formatCurrency(month.balance)}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Métricas Gerais</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Média Mensal Receitas</span>
                <span className="font-medium">
                  {formatCurrency(financialSummary.averageMonthlyIncome)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Média Mensal Despesas</span>
                <span className="font-medium">
                  {formatCurrency(financialSummary.averageMonthlyExpenses)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};