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

      <div className="space-y-4">
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;

          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(item.value)}
                </span>
              </div>

              <div className="relative">
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-300"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: item.fill,
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