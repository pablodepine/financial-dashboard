import { useReports } from '../hooks/useReports';
import { PieChart } from './PieChart';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import { StatCard } from './StatCard';
import { formatCurrency } from '@/shared/utils';
import { Info } from 'lucide-react';

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
          Análise detalhada dos seus dados financeiros baseada nos últimos 6 meses de consultas e transações.
        </p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">💡 Sobre os Relatórios</h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Os dados são calculados automaticamente a partir dos seus agendamentos e transações.
            Passe o mouse sobre os ícones de informação (?) para obter detalhes sobre cada métrica.
          </p>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Receita Total"
          value={financialSummary.totalIncome}
          change={{ value: 12.5, type: 'increase' }}
          description="Soma de todas as receitas dos últimos 6 meses, incluindo salários, vendas e outros ganhos."
        />
        <StatCard
          title="Despesas Totais"
          value={financialSummary.totalExpenses}
          change={{ value: 8.2, type: 'decrease' }}
          description="Soma de todas as despesas dos últimos 6 meses, incluindo mercado, lazer, contas e outros gastos."
        />
        <StatCard
          title="Saldo Líquido"
          value={financialSummary.totalBalance}
          change={{ value: 15.3, type: 'increase' }}
          description="Diferença entre receitas e despesas totais. Valor positivo indica lucro, negativo indica prejuízo."
        />
        <StatCard
          title="Média Mensal Receitas"
          value={financialSummary.averageMonthlyIncome}
          description="Média das receitas mensais calculada sobre os últimos 6 meses disponíveis."
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChart
          data={pieChartData}
          title="Distribuição por Categoria"
          description="Mostra a proporção de receitas por categoria (ex: Salário, Caju, Outros). O gráfico de pizza ajuda a identificar quais fontes de renda são mais significativas."
        />

        <BarChart
          data={barChartData}
          title="Receitas por Mês"
          description="Exibe as receitas totais de cada mês nos últimos 6 meses. Permite visualizar tendências sazonais e identificar meses com maior ou menor faturamento."
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <LineChart
          data={lineChartData}
          title="Tendência de Saldo"
          description="Mostra a evolução do saldo líquido (receitas - despesas) ao longo dos meses. Uma linha ascendente indica melhoria financeira, enquanto descendente pode indicar necessidade de ajustes."
        />
      </div>

      {/* Resumo Detalhado */}
      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Resumo Detalhado</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-medium">Receitas por Categoria</h3>
              <span title="Quebra detalhada das receitas por tipo de serviço ou fonte de renda nos últimos 6 meses.">
                <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
              </span>
            </div>
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
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-medium">Dados Mensais</h3>
              <span title="Saldo líquido (receitas - despesas) de cada mês nos últimos 6 meses.">
                <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
              </span>
            </div>
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
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-medium">Métricas Gerais</h3>
              <span title="Médias calculadas sobre o período de 6 meses para ajudar na análise de tendências.">
                <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
              </span>
            </div>
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