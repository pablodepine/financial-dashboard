import { formatCurrency } from '@/shared/utils';
import { Info } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

export const StatCard = ({ title, value, change, icon, description, className = '' }: StatCardProps) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'string') return val;
    return formatCurrency(val);
  };

  return (
    <div className={`bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/50 rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
              {title}
            </p>
            {description && (
              <span title={description}>
                <Info className="h-4 w-4 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-help transition-colors" />
              </span>
            )}
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            {formatValue(value)}
          </p>

          {change && (
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${
                change.type === 'increase'
                  ? 'bg-green-100/80 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200/50 dark:border-green-800/50'
                  : 'bg-red-100/80 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200/50 dark:border-red-800/50'
              }`}>
                {change.type === 'increase' ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                <span>{Math.abs(change.value)}%</span>
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                vs mês anterior
              </span>
            </div>
          )}
        </div>

        {icon && (
          <div className="text-slate-400 dark:text-slate-500 bg-slate-100/50 dark:bg-slate-800/50 p-3 rounded-full">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};