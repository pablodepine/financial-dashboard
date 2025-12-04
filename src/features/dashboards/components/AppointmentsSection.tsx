import { Plus, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/shared/components/ui';

interface AppointmentsSectionProps {
  dashboardId: string;
}

export const AppointmentsSection = ({ dashboardId }: AppointmentsSectionProps) => {
  // TODO: Use dashboardId when implementing appointments feature
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Appointments
          </CardTitle>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Appointment
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhum appointment cadastrado</h3>
          <p className="text-muted-foreground mb-6">
            Comece adicionando seu primeiro appointment financeiro
          </p>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Criar Primeiro Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};