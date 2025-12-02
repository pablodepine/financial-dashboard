export enum ExpenseAppointmentEnum {
  MERCADO = 'Mercado',
  LAZER = 'Lazer',
  APARTAMENTO = 'Apartamento',
  PESSOAL = 'Pessoal',
  TAXAS_TARIFAS = 'TaxasTarifas',
  INVESTIMENTO = 'Investimento',
  OLAVO = 'Olavo',
  FARMACIA = 'Farmacia',
}

export enum IncomeAppointmentEnum {
  SALARIO = 'Salário',
  CAJU = 'Caju',
  OUTROS = 'Outros',
}

export enum PaymentMethodEnum {
  DINHEIRO = 'Dinheiro',
  DEBITO = 'Débito',
  CREDITO = 'Crédito',
  PIX = 'PIX',
  TRANSFERENCIA = 'Transferência',
  BOLETO = 'Boleto',
}

export type AppointmentType = ExpenseAppointmentEnum | IncomeAppointmentEnum;
