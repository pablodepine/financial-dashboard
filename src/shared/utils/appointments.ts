import { Appointment, ExpenseAppointment, IncomeAppointment, AppointmentSummary } from '@/types';
import { ExpenseAppointmentEnum, IncomeAppointmentEnum } from '@/types/enums';

export const isExpenseAppointment = (
  appointment: Appointment
): appointment is ExpenseAppointment => {
  return Object.values(ExpenseAppointmentEnum).includes(appointment.type as ExpenseAppointmentEnum);
};

export const isIncomeAppointment = (appointment: Appointment): appointment is IncomeAppointment => {
  return Object.values(IncomeAppointmentEnum).includes(appointment.type as IncomeAppointmentEnum);
};

export const calculateSummary = (appointments: Appointment[]): AppointmentSummary => {
  const summary: AppointmentSummary = {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    incomeByCategory: {},
    expenseByCategory: {},
  };

  appointments.forEach((appointment) => {
    if (isIncomeAppointment(appointment)) {
      summary.totalIncome += appointment.value;
      const category = appointment.type;
      summary.incomeByCategory[category] =
        (summary.incomeByCategory[category] || 0) + appointment.value;
    } else if (isExpenseAppointment(appointment)) {
      summary.totalExpense += appointment.value;
      const category = appointment.type;
      summary.expenseByCategory[category] =
        (summary.expenseByCategory[category] || 0) + appointment.value;
    }
  });

  summary.balance = summary.totalIncome - summary.totalExpense;

  return summary;
};

export const filterAppointmentsByMonth = (
  appointments: Appointment[],
  month: number,
  year: number
): Appointment[] => {
  return appointments.filter((appointment) => {
    const date = new Date(appointment.date);
    return date.getMonth() + 1 === month && date.getFullYear() === year;
  });
};
