import { Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui';
import { AppointmentList } from '@/features/appointments/components/AppointmentList';
import { useAppointments } from '@/features/appointments/hooks/useAppointments';

interface AppointmentsSectionProps {
  dashboardId: string;
}

export const AppointmentsSection = ({ dashboardId }: AppointmentsSectionProps) => {
  const { appointments, isLoading, createAppointment, updateAppointment, deleteAppointment } = useAppointments(dashboardId);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Appointments
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <AppointmentList
          appointments={appointments}
          isLoading={isLoading}
          onCreate={createAppointment}
          onUpdate={updateAppointment}
          onDelete={deleteAppointment}
        />
      </CardContent>
    </Card>
  );
};