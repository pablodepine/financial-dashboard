import { api } from './api';
import type { Appointment, ExpenseAppointment, IncomeAppointment } from '@/types';
import type { ExpenseAppointmentEnum } from '@/types/enums';

interface AppointmentDTO {
  id: string;
  dashboardId: string;
  name: string;
  description: string;
  type: string;
  date: string;
  value: number;
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
}

const mapToAppointment = (dto: AppointmentDTO): Appointment => {
  const base = {
    id: dto.id,
    dashboardId: dto.dashboardId,
    name: dto.name,
    description: dto.description,
    type: dto.type,
    date: new Date(dto.date),
    value: dto.value,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
  };

  if (dto.paymentMethod) {
    return {
      ...base,
      type: dto.type as ExpenseAppointmentEnum,
      paymentMethod: dto.paymentMethod,
    } as ExpenseAppointment;
  }

  return base as IncomeAppointment;
};

export const mockAppointmentService = {
  async create(
    dashboardId: string,
    appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Appointment> {
    const now = new Date().toISOString();
    const newAppointment: AppointmentDTO = {
      id: `apt-${Date.now()}`,
      dashboardId,
      name: appointment.name,
      description: appointment.description,
      type: appointment.type,
      date: appointment.date.toISOString(),
      value: appointment.value,
      createdAt: now,
      updatedAt: now,
    };

    // Add paymentMethod if it's an expense
    if ('paymentMethod' in appointment && appointment.paymentMethod) {
      newAppointment.paymentMethod = appointment.paymentMethod as string;
    }

    const created = await api.post<AppointmentDTO>('/appointments', newAppointment);
    return mapToAppointment(created);
  },

  async getByDashboardId(dashboardId: string): Promise<Appointment[]> {
    const appointments = await api.get<AppointmentDTO[]>(
      `/appointments?dashboardId=${dashboardId}`
    );
    return appointments.map(mapToAppointment);
  },

  async update(id: string, updates: Partial<Appointment>): Promise<void> {
    const updateData: Partial<AppointmentDTO> = {
      updatedAt: new Date().toISOString(),
    };

    if (updates.name) updateData.name = updates.name;
    if (updates.description) updateData.description = updates.description;
    if (updates.type) updateData.type = updates.type;
    if (updates.value !== undefined) updateData.value = updates.value;
    if (updates.date) updateData.date = updates.date.toISOString();
    if ('paymentMethod' in updates && updates.paymentMethod) {
      updateData.paymentMethod = updates.paymentMethod as string;
    }

    await api.patch(`/appointments/${id}`, updateData);
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/appointments/${id}`);
  },
};
