import { Calendar, DollarSign, CreditCard, Edit3, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/components/ui';
import { formatDate, formatCurrency } from '@/shared/utils';
import type { Appointment } from '@/types';

interface AppointmentCardProps {
  appointment: Appointment;
  onEdit: () => void;
  onDelete: () => void;
}

export const AppointmentCard = ({ appointment, onEdit, onDelete }: AppointmentCardProps) => {
  const isExpense = 'paymentMethod' in appointment;
  const isIncome = !isExpense;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja excluir este appointment?')) {
      onDelete();
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {isIncome ? (
              <div className="p-1.5 rounded-full bg-green-100">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
            ) : (
              <div className="p-1.5 rounded-full bg-red-100">
                <CreditCard className="h-4 w-4 text-red-600" />
              </div>
            )}
            <div>
              <CardTitle className="text-lg">{appointment.name}</CardTitle>
              <CardDescription className="text-sm">
                {appointment.type}
                {isExpense && ` • ${appointment.paymentMethod}`}
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={onEdit}
              className="p-1 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Editar appointment"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Deletar appointment"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(appointment.date)}</span>
          </div>
          <div className={`text-lg font-bold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
            {isIncome ? '+' : '-'}{formatCurrency(appointment.value)}
          </div>
        </div>
        {appointment.description && (
          <p className="text-sm text-muted-foreground mt-2">{appointment.description}</p>
        )}
      </CardContent>
    </Card>
  );
};