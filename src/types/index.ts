import { ExpenseAppointmentEnum, IncomeAppointmentEnum, PaymentMethodEnum } from './enums';

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface Dashboard {
  id: string;
  userId: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseAppointment {
  id: string;
  dashboardId: string;
  name: string;
  description: string;
  date: Date;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IncomeAppointment extends BaseAppointment {
  type: IncomeAppointmentEnum;
}

export interface ExpenseAppointment extends BaseAppointment {
  type: ExpenseAppointmentEnum;
  paymentMethod: PaymentMethodEnum;
}

export type Appointment = IncomeAppointment | ExpenseAppointment;

export interface CustomCategory {
  id: string;
  userId: string;
  name: string;
  type: 'income' | 'expense';
  createdAt: Date;
}

export interface MonthlyFilter {
  month: number;
  year: number;
}

export interface AppointmentSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  incomeByCategory: Record<string, number>;
  expenseByCategory: Record<string, number>;
}
