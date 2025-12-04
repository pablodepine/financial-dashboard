import { formatCurrency } from '@/shared/utils';
import { Info } from 'lucide-react';

interface BarChartData {
  name: string;
  value: number;
  fill: string;
}

interface BarChartProps {
  data: BarChartData[];
  title: string;
  description?: string;
  className?: string;
}

export const BarChart = ({ data, title, description, className = '' }: BarChartProps) => {
  const maxValue = Math.max(...data.map(item => item.value), 0);

  if (maxValue === 0) {
    return (
      <div className={`bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/50 rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-6 shadow-lg ${className}`}>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">{title}</h3>
        <div className="flex items-center justify-center h-64 text-slate-500 dark:text-slate-400">
          Nenhum dado disponível
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/50 rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h3>
        {description && (
          <span title={description}>
            <Info className="h-5 w-5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-help transition-colors" />
          </span>
        )}
      </div>

      <div className="space-y-5">
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;

          return (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.name}</span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {formatCurrency(item.value)}
                </span>
              </div>

              <div className="relative">
                <div className="w-full bg-slate-200/50 dark:bg-slate-700/50 rounded-full h-4 shadow-inner">
                  <div
                    className="h-4 rounded-full transition-all duration-500 ease-out shadow-sm"
                    style={{
                      width: `${percentage}%`,
                      background: `linear-gradient(135deg, ${item.fill}, ${item.fill}dd)`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};