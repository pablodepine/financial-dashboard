import { formatCurrency } from '@/shared/utils';
import { Info } from 'lucide-react';

interface LineChartData {
  name: string;
  value: number;
  date: string;
}

interface LineChartProps {
  data: LineChartData[];
  title: string;
  description?: string;
  className?: string;
}

export const LineChart = ({ data, title, description, className = '' }: LineChartProps) => {
  const maxValue = Math.max(...data.map(item => item.value), 0);
  const minValue = Math.min(...data.map(item => item.value), 0);

  if (data.length === 0 || maxValue === 0) {
    return (
      <div className={`bg-card rounded-lg border p-6 ${className}`}>
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          Nenhum dado disponível
        </div>
      </div>
    );
  }

  const chartHeight = 200;
  const chartWidth = 400;
  const padding = 40;

  const getY = (value: number) => {
    const range = maxValue - minValue;
    const normalizedValue = range > 0 ? (value - minValue) / range : 0;
    return chartHeight - padding - (normalizedValue * (chartHeight - 2 * padding));
  };

  const getX = (index: number) => {
    const totalPoints = data.length;
    return padding + (index / (totalPoints - 1)) * (chartWidth - 2 * padding);
  };

  const pathData = data
    .map((point, index) => {
      const x = getX(index);
      const y = getY(point.value);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

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

      <div className="relative">
        <svg
          width={chartWidth}
          height={chartHeight}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto"
        >
          {/* Grid lines */}
          <defs>
            <pattern
              id="grid"
              width="40"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const value = minValue + ratio * (maxValue - minValue);
            const y = getY(value);
            return (
              <g key={ratio}>
                <text
                  x={padding - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="text-xs fill-muted-foreground"
                >
                  {formatCurrency(value)}
                </text>
                <line
                  x1={padding}
                  y1={y}
                  x2={chartWidth - padding}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.2"
                />
              </g>
            );
          })}

          {/* Line */}
          <path
            d={pathData}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            className="drop-shadow-sm"
          />

          {/* Data points */}
          {data.map((point, index) => {
            const x = getX(index);
            const y = getY(point.value);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="hsl(var(--primary))"
                className="hover:r-6 transition-all cursor-pointer"
              />
            );
          })}
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between mt-2 px-10">
          {data.map((point, index) => (
            <span key={index} className="text-xs text-muted-foreground">
              {point.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};