import { useMemo } from 'react';
import { formatCurrency } from '@/shared/utils';
import { Info } from 'lucide-react';

interface PieChartData {
  name: string;
  value: number;
  percentage: number;
  fill: string;
}

interface PieChartProps {
  data: PieChartData[];
  title: string;
  description?: string;
  className?: string;
}

export const PieChart = ({ data, title, description, className = '' }: PieChartProps) => {
  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);

  const segments = useMemo(() => {
    type Segment = PieChartData & {
      percentage: number;
      pathData: string;
      midAngle: number;
    };

    return data.reduce((acc, item) => {
      const percentage = total > 0 ? (item.value / total) * 100 : 0;
      const angle = (percentage / 100) * 360;
      const startAngle = acc.currentAngle;
      const endAngle = startAngle + angle;

      // Calcular coordenadas para o path SVG
      const x1 = Math.cos((startAngle * Math.PI) / 180) * 50 + 50;
      const y1 = Math.sin((startAngle * Math.PI) / 180) * 50 + 50;
      const x2 = Math.cos((endAngle * Math.PI) / 180) * 50 + 50;
      const y2 = Math.sin((endAngle * Math.PI) / 180) * 50 + 50;

      const largeArcFlag = angle > 180 ? 1 : 0;

      const pathData = percentage > 0
        ? `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
        : '';

      acc.segments.push({
        ...item,
        percentage,
        pathData,
        midAngle: startAngle + angle / 2,
      });

      acc.currentAngle = endAngle;
      return acc;
    }, { segments: [] as Segment[], currentAngle: 0 }).segments;
  }, [data, total]);

  if (total === 0) {
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

      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Gráfico */}
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 100 100" className="mx-auto">
            {segments.map((segment, index) => (
              <path
                key={index}
                d={segment.pathData}
                fill={segment.fill}
                stroke="white"
                strokeWidth="0.5"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
          </svg>

          {/* Centro do gráfico */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full p-4 shadow-lg">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{formatCurrency(total)}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Total</div>
            </div>
          </div>
        </div>

        {/* Legenda */}
        <div className="flex-1 space-y-3">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50/50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full shadow-sm"
                  style={{ backgroundColor: segment.fill }}
                />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{segment.name}</span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {formatCurrency(segment.value)} <span className="text-slate-500 dark:text-slate-400 font-normal">({segment.percentage.toFixed(1)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};