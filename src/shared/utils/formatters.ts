import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatDate = (date: Date, pattern: string = 'dd/MM/yyyy'): string => {
  return format(date, pattern, { locale: ptBR });
};

export const getMonthName = (month: number): string => {
  const date = new Date(2024, month - 1, 1);
  return format(date, 'MMMM', { locale: ptBR });
};

export const getMonthDays = (year: number, month: number): Date[] => {
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(new Date(year, month - 1));
  return eachDayOfInterval({ start, end });
};

export const isDateInMonth = (date: Date, month: number, year: number): boolean => {
  return isSameMonth(date, new Date(year, month - 1));
};
