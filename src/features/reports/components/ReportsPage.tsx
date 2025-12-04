import { useReports } from '../hooks/useReports';
import { PieChart } from './PieChart';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import { StatCard } from './StatCard';
import { formatCurrency } from '@/shared/utils';
import { Info, BarChart3 } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
              <BarChart3 className="w-4 h-4" />
              Relatórios Financeiros
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-3">
            Análise Financeira Completa
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Visualize seus dados financeiros dos últimos 6 meses com gráficos interativos,
            métricas detalhadas e insights para tomar melhores decisões.
          </p>
          <div className="mt-6 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" />
              Sobre os Relatórios
            </h3>
            <p className="text-sm text-muted-foreground">
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
      <div className="bg-card rounded-xl border-2 border-border/50 p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground">Resumo Detalhado</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg p-6 border border-blue-200/50 dark:border-blue-800/50">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-bold text-blue-900 dark:text-blue-100">Receitas por Categoria</h3>
              <span title="Quebra detalhada das receitas por tipo de serviço ou fonte de renda nos últimos 6 meses.">
                <Info className="h-4 w-4 text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 cursor-help transition-colors" />
              </span>
            </div>
            <div className="space-y-3">
              {financialSummary.incomeByCategory.map((category) => (
                <div key={category.name} className="flex justify-between items-center py-2 px-3 rounded-md bg-white/50 dark:bg-slate-800/50">
                  <span className="font-medium text-blue-900 dark:text-blue-100">{category.name}</span>
                  <span className="font-bold text-blue-700 dark:text-blue-300">{formatCurrency(category.value)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/20 rounded-lg p-6 border border-green-200/50 dark:border-green-800/50">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-bold text-green-900 dark:text-green-100">Dados Mensais</h3>
              <span title="Saldo líquido (receitas - despesas) de cada mês nos últimos 6 meses.">
                <Info className="h-4 w-4 text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 cursor-help transition-colors" />
              </span>
            </div>
            <div className="space-y-3">
              {financialSummary.monthlyData.slice(-6).map((month) => (
                <div key={month.month} className="flex justify-between items-center py-2 px-3 rounded-md bg-white/50 dark:bg-slate-800/50">
                  <span className="font-medium text-green-900 dark:text-green-100">{month.month}</span>
                  <span className="font-bold text-green-700 dark:text-green-300">{formatCurrency(month.balance)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg p-6 border border-purple-200/50 dark:border-purple-800/50">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-bold text-purple-900 dark:text-purple-100">Métricas Gerais</h3>
              <span title="Médias calculadas sobre o período de 6 meses para ajudar na análise de tendências.">
                <Info className="h-4 w-4 text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100 cursor-help transition-colors" />
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 px-4 rounded-md bg-white/50 dark:bg-slate-800/50">
                <span className="font-medium text-purple-900 dark:text-purple-100">Média Mensal Receitas</span>
                <span className="font-bold text-purple-700 dark:text-purple-300">
                  {formatCurrency(financialSummary.averageMonthlyIncome)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 rounded-md bg-white/50 dark:bg-slate-800/50">
                <span className="font-medium text-purple-900 dark:text-purple-100">Média Mensal Despesas</span>
                <span className="font-bold text-purple-700 dark:text-purple-300">
                  {formatCurrency(financialSummary.averageMonthlyExpenses)}
                </span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};