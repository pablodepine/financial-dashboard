export const ExpenseAppointmentEnum = {
  MERCADO: 'Mercado',
  LAZER: 'Lazer',
  APARTAMENTO: 'Apartamento',
  PESSOAL: 'Pessoal',
  TAXAS_TARIFAS: 'TaxasTarifas',
  INVESTIMENTO: 'Investimento',
  OLAVO: 'Olavo',
  FARMACIA: 'Farmacia',
} as const;

export type ExpenseAppointmentEnum =
  (typeof ExpenseAppointmentEnum)[keyof typeof ExpenseAppointmentEnum];

export const IncomeAppointmentEnum = {
  SALARIO: 'Salário',
  CAJU: 'Caju',
  OUTROS: 'Outros',
} as const;

export type IncomeAppointmentEnum =
  (typeof IncomeAppointmentEnum)[keyof typeof IncomeAppointmentEnum];

export const PaymentMethodEnum = {
  DINHEIRO: 'Dinheiro',
  DEBITO: 'Débito',
  CREDITO: 'Crédito',
  PIX: 'PIX',
  TRANSFERENCIA: 'Transferência',
  BOLETO: 'Boleto',
} as const;

export type PaymentMethodEnum = (typeof PaymentMethodEnum)[keyof typeof PaymentMethodEnum];

export type AppointmentType = ExpenseAppointmentEnum | IncomeAppointmentEnum;
