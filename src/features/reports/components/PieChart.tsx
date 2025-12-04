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
      <div className={`bg-card rounded-lg border p-6 ${className}`}>
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          Nenhum dado disponível
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card rounded-lg border p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <span title={description}>
            <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
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
            <div className="text-center">
              <div className="text-2xl font-bold">{formatCurrency(total)}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </div>
        </div>

        {/* Legenda */}
        <div className="flex-1 space-y-2">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: segment.fill }}
                />
                <span className="text-sm">{segment.name}</span>
              </div>
              <div className="text-sm font-medium">
                {formatCurrency(segment.value)} ({segment.percentage.toFixed(1)}%)
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};