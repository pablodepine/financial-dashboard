import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DollarSign } from 'lucide-react';
import { Button } from '@/shared/components/ui';
import { Input } from '@/shared/components/ui';
import { Label } from '@/shared/components/ui';
import { Modal } from '@/shared/components/ui';
import type { Appointment, ExpenseAppointment } from '@/types';
import { ExpenseAppointmentEnum, IncomeAppointmentEnum, PaymentMethodEnum } from '@/types/enums';

const appointmentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  type: z.enum([...Object.values(ExpenseAppointmentEnum), ...Object.values(IncomeAppointmentEnum)]),
  date: z.string().min(1, 'Data é obrigatória'),
  value: z.number().min(0.01, 'Valor deve ser maior que zero'),
  paymentMethod: z.enum(Object.values(PaymentMethodEnum)).optional(),
  isExpense: z.boolean(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface EditAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment;
  onSubmit: (updates: Partial<Appointment>) => Promise<void>;
}

export const EditAppointmentModal = ({ isOpen, onClose, appointment, onSubmit }: EditAppointmentModalProps) => {
  const isExpense = 'paymentMethod' in appointment;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: appointment.name,
      description: appointment.description,
      type: appointment.type,
      date: appointment.date.toISOString().split('T')[0],
      value: appointment.value,
      paymentMethod: isExpense ? appointment.paymentMethod : undefined,
      isExpense,
    },
  });

  const watchedIsExpense = watch('isExpense');

  const handleTypeChange = (expense: boolean) => {
    setValue('isExpense', expense);
    // Reset type when switching between expense/income
    setValue('type', expense ? 'Mercado' as const : 'Salário' as const);
    setValue('paymentMethod', undefined);
  };

  const onFormSubmit = async (data: AppointmentFormData) => {
    const updates = {
      name: data.name,
      description: data.description || '',
      type: data.type,
      date: new Date(data.date),
      value: data.value,
    };

    if (watchedIsExpense && data.paymentMethod) {
      (updates as Partial<ExpenseAppointment>).paymentMethod = data.paymentMethod;
    }

    await onSubmit(updates);
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  // Reset form when appointment changes
  useEffect(() => {
    reset({
      name: appointment.name,
      description: appointment.description,
      type: appointment.type,
      date: appointment.date.toISOString().split('T')[0],
      value: appointment.value,
      paymentMethod: isExpense ? appointment.paymentMethod : undefined,
      isExpense,
    });
  }, [appointment, reset, isExpense]);

  const expenseTypes = Object.values(ExpenseAppointmentEnum);
  const incomeTypes = Object.values(IncomeAppointmentEnum);
  const paymentMethods = Object.values(PaymentMethodEnum);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Editar Compromisso">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Tipo: Receita ou Despesa */}
        <div>
          <Label className="text-base font-medium">Tipo de Appointment</Label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={!watchedIsExpense}
                onChange={() => handleTypeChange(false)}
                className="text-primary"
              />
              <DollarSign className="h-4 w-4 text-green-600" />
              <span>Receita</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={watchedIsExpense}
                onChange={() => handleTypeChange(true)}
                className="text-primary"
              />
              <DollarSign className="h-4 w-4 text-red-600" />
              <span>Despesa</span>
            </label>
          </div>
        </div>

        {/* Nome */}
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Ex: Salário, Conta de luz, etc."
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Categoria */}
        <div>
          <Label htmlFor="type">Categoria</Label>
          <select
            id="type"
            {...register('type')}
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
          >
            <option value="">Selecione uma categoria</option>
            {(watchedIsExpense ? expenseTypes : incomeTypes).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.type && (
            <p className="text-sm text-destructive mt-1">{errors.type.message}</p>
          )}
        </div>

        {/* Método de pagamento (apenas para despesas) */}
        {watchedIsExpense && (
          <div>
            <Label htmlFor="paymentMethod">Método de Pagamento</Label>
            <select
              id="paymentMethod"
              {...register('paymentMethod')}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="">Selecione um método</option>
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
            {errors.paymentMethod && (
              <p className="text-sm text-destructive mt-1">{errors.paymentMethod.message}</p>
            )}
          </div>
        )}

        {/* Data */}
        <div>
          <Label htmlFor="date">Data</Label>
          <Input
            id="date"
            type="date"
            {...register('date')}
          />
          {errors.date && (
            <p className="text-sm text-destructive mt-1">{errors.date.message}</p>
          )}
        </div>

        {/* Valor */}
        <div>
          <Label htmlFor="value">Valor (R$)</Label>
          <Input
            id="value"
            type="number"
            step="0.01"
            min="0"
            {...register('value', { valueAsNumber: true })}
            placeholder="0,00"
          />
          {errors.value && (
            <p className="text-sm text-destructive mt-1">{errors.value.message}</p>
          )}
        </div>

        {/* Descrição */}
        <div>
          <Label htmlFor="description">Descrição (opcional)</Label>
          <textarea
            id="description"
            {...register('description')}
            className="w-full px-3 py-2 border border-input rounded-md bg-background resize-none"
            rows={3}
            placeholder="Adicione uma descrição..."
          />
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};