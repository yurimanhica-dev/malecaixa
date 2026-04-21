export interface CreditTerms {
  id: number;
  name: string;
  maxAmount: number;
  minAmount: number;
  maxMonths: number;
  minMonths: number;
  interestRates: {
    [key: number]: number; // months -> interest rate
  };
}

export const CREDIT_TYPES: CreditTerms[] = [
  {
    id: 1,
    name: "Crédito Consumo",
    maxAmount: 35000,
    minAmount: 5000,
    maxMonths: 6,
    minMonths: 1,
    interestRates: {
      1: 0.25,
      2: 0.25,
      3: 0.25,
      4: 0.3,
      5: 0.3,
      6: 0.3,
    },
  },
  {
    id: 2,
    name: "Funcionário Público",
    maxAmount: 100000,
    minAmount: 10000,
    maxMonths: 24,
    minMonths: 6,
    interestRates: {
      6: 0.2,
      12: 0.22,
      18: 0.24,
      24: 0.25,
    },
  },
  {
    id: 3,
    name: "Crédito Comercial",
    maxAmount: 500000,
    minAmount: 50000,
    maxMonths: 36,
    minMonths: 12,
    interestRates: {
      12: 0.18,
      24: 0.2,
      36: 0.22,
    },
  },
];

export function getCreditTerms(creditTypeId: number): CreditTerms {
  const terms = CREDIT_TYPES.find((credit) => credit.id === creditTypeId);
  if (!terms) {
    throw new Error(
      `Tipo de crédito não encontrado para o ID: ${creditTypeId}`,
    );
  }
  return terms;
}

export function getInterestRate(terms: CreditTerms, months: number): number {
  return (
    terms.interestRates[months] ||
    Math.max(...Object.values(terms.interestRates))
  );
}

export function calculateMonthlyPayment(
  amount: number,
  months: number,
  creditTypeId: number,
): number {
  const terms = getCreditTerms(creditTypeId);
  const interestRate = getInterestRate(terms, months);
  const totalAmount = amount * (1 + interestRate);
  return totalAmount / months;
}

export function calculateEncargos(
  amount: number,
  months: number,
  creditTypeId: number,
): number {
  const terms = getCreditTerms(creditTypeId);
  const interestRate = getInterestRate(terms, months);

  const totalAmount = amount * (1 + interestRate); // total com juros
  return totalAmount * 0.02; // 2% sobre o total
}

export function calculateTotalPayback(
  amount: number,
  months: number,
  creditTypeId: number,
): number {
  const terms = getCreditTerms(creditTypeId);
  const interestRate = getInterestRate(terms, months);
  return amount * (1 + interestRate);
}

export function validateCreditRequest(
  amount: number,
  months: number,
  creditTypeId: number,
): string | null {
  const terms = getCreditTerms(creditTypeId);

  if (amount < terms.minAmount) {
    return `O valor mínimo para ${terms.name} é ${terms.minAmount} MZN`;
  }

  if (amount > terms.maxAmount) {
    return `O valor máximo para ${terms.name} é ${terms.maxAmount} MZN`;
  }

  if (months < terms.minMonths) {
    return `O prazo mínimo para ${terms.name} é ${terms.minMonths} meses`;
  }

  if (months > terms.maxMonths) {
    return `O prazo máximo para ${terms.name} é ${terms.maxMonths} meses`;
  }

  if (!terms.interestRates[months]) {
    return `Prazo de ${months} meses não disponível para ${terms.name}`;
  }

  return null;
}
