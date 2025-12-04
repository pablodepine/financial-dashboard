import { formatCurrency } from '@/shared/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard = ({ title, value, change, icon, className = '' }: StatCardProps) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'string') return val;
    return formatCurrency(val);
  };

  return (
    <div className={`bg-card rounded-lg border p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{formatValue(value)}</p>

          {change && (
            <div className="flex items-center mt-1">
              <span
                className={`text-xs font-medium ${
                  change.type === 'increase'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {change.type === 'increase' ? '+' : '-'}
                {Math.abs(change.value)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                vs mês anterior
              </span>
            </div>
          )}
        </div>

        {icon && (
          <div className="text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};