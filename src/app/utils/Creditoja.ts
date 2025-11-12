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
    name: "Crédito Já",
    maxAmount: 500000,
    minAmount: 1000,
    maxMonths: 6,
    minMonths: 1,
    interestRates: {
      1: 0.1, // 10%
      2: 0.2,
      3: 0.3,
      4: 0.4,
      5: 0.5,
      6: 0.6,
    },
  },
];

export function getCreditTerms(creditTypeId: number): CreditTerms {
  const terms = CREDIT_TYPES.find((credit) => credit.id === creditTypeId);
  if (!terms) {
    throw new Error(
      `Tipo de crédito não encontrado para o ID: ${creditTypeId}`
    );
  }
  return terms;
}

export function calculateMonthlyPayment(
  amount: number,
  months: number,
  creditTypeId: number
): number {
  const terms = getCreditTerms(creditTypeId);
  const interestRate =
    terms.interestRates[months] ||
    Math.max(...Object.values(terms.interestRates));

  const totalAmount = amount * (1 + interestRate);
  return totalAmount / months;
}

export function calculateEncargos(amount: number): number {
  const percentEncargos = 0.0205; // 1% + 0,3% + 0,75%
  const portesFixos = 100; // valor fixo de portes

  const totalEncargos = amount * percentEncargos + portesFixos;

  return Math.round(totalEncargos * 100) / 100; // arredonda para 2 casas decimais
}

export function calculateTotalPayback(
  amount: number,
  months: number,
  creditTypeId: number
): number {
  const terms = getCreditTerms(creditTypeId);
  const interestRate =
    terms.interestRates[months] ||
    Math.max(...Object.values(terms.interestRates));

  return amount * (1 + interestRate);
}

/**
 * Valida a solicitação de crédito com base nas regras:
 * - Montante dentro dos limites definidos
 * - Prazo válido
 * - Prestação mensal não pode ultrapassar 30% do rendimento mensal informado
 */
export function validateCreditRequest(
  amount: number,
  months: number,
  creditTypeId: number,
  monthlyIncome: number // novo parâmetro
): string | null {
  const terms = getCreditTerms(creditTypeId);

  if (amount < terms.minAmount) {
    return `O valor mínimo para ${terms.name} é ${terms.minAmount} MZN`;
  }

  if (amount > terms.maxAmount) {
    return `O valor máximo para ${terms.name} é ${terms.maxAmount} MZN`;
  }

  if (months < terms.minMonths) {
    return `O prazo mínimo para ${terms.name} é ${terms.minMonths} mês`;
  }

  if (months > terms.maxMonths) {
    return `O prazo máximo para ${terms.name} é ${terms.maxMonths} meses`;
  }

  if (!terms.interestRates[months]) {
    return `Prazo de ${months} meses não disponível para ${terms.name}`;
  }

  // 💰 Validação de rendimento mensal
  const monthlyPayment = calculateMonthlyPayment(amount, months, creditTypeId);
  const maxAllowedPayment = monthlyIncome * 0.3; // 30% do rendimento

  if (monthlyPayment > maxAllowedPayment) {
    return `A prestação mensal (${monthlyPayment.toFixed(
      2
    )} MZN) excede 30% do seu rendimento mensal (${maxAllowedPayment.toFixed(
      2
    )} MZN).`;
  }

  return null; // ✅ Válido
}
