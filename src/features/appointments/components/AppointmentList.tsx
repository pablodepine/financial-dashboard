import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Button } from '@/shared/components/ui';
import { AppointmentCard } from './AppointmentCard';
import { CreateAppointmentModal } from './CreateAppointmentModal';
import { EditAppointmentModal } from './EditAppointmentModal';
import type { Appointment } from '@/types';

interface AppointmentListProps {
  appointments: Appointment[];
  isLoading: boolean;
  onCreate: (appointmentData: Omit<Appointment, 'id' | 'dashboardId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onUpdate: (id: string, updates: Partial<Appointment>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const AppointmentList = ({
  appointments,
  isLoading,
  onCreate,
  onUpdate,
  onDelete,
}: AppointmentListProps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  const handleCreate = async (appointmentData: Omit<Appointment, 'id' | 'dashboardId' | 'createdAt' | 'updatedAt'>) => {
    await onCreate(appointmentData);
    setIsCreateModalOpen(false);
  };

  const handleUpdate = async (updates: Partial<Appointment>) => {
    if (editingAppointment) {
      await onUpdate(editingAppointment.id, updates);
      setEditingAppointment(null);
    }
  };

  const handleDelete = async (appointmentId: string) => {
    await onDelete(appointmentId);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com ações */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">
            Appointments ({appointments.length})
          </h3>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Appointment
        </Button>
      </div>

      {/* Lista de appointments */}
      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Plus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Nenhum appointment cadastrado</h3>
          <p className="text-muted-foreground mb-6">
            Comece adicionando seu primeiro appointment financeiro
          </p>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Criar Primeiro Appointment
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onEdit={() => setEditingAppointment(appointment)}
              onDelete={() => handleDelete(appointment.id)}
            />
          ))}
        </div>
      )}

      {/* Modais */}
      <CreateAppointmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
      />

      {editingAppointment && (
        <EditAppointmentModal
          isOpen={!!editingAppointment}
          onClose={() => setEditingAppointment(null)}
          appointment={editingAppointment}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
};