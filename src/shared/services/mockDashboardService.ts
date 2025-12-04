import { api } from './api';
import type { Dashboard } from '@/types';

interface DashboardDTO {
  id: string;
  userId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const mapToDashboard = (dto: DashboardDTO): Dashboard => ({
  ...dto,
  createdAt: new Date(dto.createdAt),
  updatedAt: new Date(dto.updatedAt),
});

export const mockDashboardService = {
  async create(userId: string, name: string, description: string): Promise<Dashboard> {
    const now = new Date().toISOString();
    const newDashboard: DashboardDTO = {
      id: `dash-${Date.now()}`,
      userId,
      name,
      description,
      createdAt: now,
      updatedAt: now,
    };

    const created = await api.post<DashboardDTO>('/dashboards', newDashboard);
    return mapToDashboard(created);
  },

  async getById(id: string): Promise<Dashboard | null> {
    try {
      const dashboard = await api.get<DashboardDTO>(`/dashboards/${id}`);
      return mapToDashboard(dashboard);
    } catch {
      return null;
    }
  },

  async getByUserId(userId: string): Promise<Dashboard[]> {
    const dashboards = await api.get<DashboardDTO[]>(`/dashboards?userId=${userId}`);
    return dashboards.map(mapToDashboard);
  },

  async update(id: string, updates: Partial<Omit<Dashboard, 'id'>>): Promise<void> {
    const updateData: Partial<DashboardDTO> = {
      name: updates.name,
      description: updates.description,
      updatedAt: new Date().toISOString(),
    };

    if (updates.createdAt) {
      updateData.createdAt = updates.createdAt.toISOString();
    }

    await api.patch(`/dashboards/${id}`, updateData);
  },

  async delete(id: string): Promise<void> {
    // Também deleta todos os appointments do dashboard
    const appointments = await api.get<{ id: string }[]>(`/appointments?dashboardId=${id}`);
    
    await Promise.all(
      appointments.map((apt) => api.delete(`/appointments/${apt.id}`))
    );

    await api.delete(`/dashboards/${id}`);
  },
};
