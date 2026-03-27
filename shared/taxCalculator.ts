/**
 * Cálculo de Impostos - INSS e IRRF
 * Baseado nas alíquotas 2025
 */

/**
 * Calcula INSS (Contribuição Social)
 * Alíquota: 11% do salário bruto (até o teto)
 * Teto INSS 2025: R$ 7.786,02
 * 
 * @param grossSalary Salário bruto
 * @returns Valor do desconto INSS
 */
export function calculateINSS(grossSalary: number): number {
  const INSS_RATE = 0.11;
  const INSS_CEILING = 7786.02; // Teto INSS 2025

  // INSS é calculado sobre o salário bruto, mas limitado ao teto
  const inssTaxableBase = Math.min(grossSalary, INSS_CEILING);
  return inssTaxableBase * INSS_RATE;
}

/**
 * Calcula IRRF (Imposto de Renda Retido na Fonte)
 * Alíquotas progressivas 2025
 * 
 * Faixas de renda (após deduções):
 * - Até R$ 2.112,00: isento
 * - De R$ 2.112,01 a R$ 2.826,65: 7,5%
 * - De R$ 2.826,66 a R$ 3.751,05: 15%
 * - De R$ 3.751,06 a R$ 4.664,68: 22,5%
 * - Acima de R$ 4.664,68: 27,5%
 * 
 * Deduções por dependente: R$ 189,59 (2025)
 * 
 * @param grossSalary Salário bruto
 * @param dependents Número de dependentes
 * @returns Valor do desconto IRRF
 */
export function calculateIRRF(grossSalary: number, dependents: number = 0): number {
  const IRRF_DEPENDENT_DEDUCTION = 189.59; // 2025
  const inss = calculateINSS(grossSalary);

  // Base de cálculo: Salário bruto - INSS - Deduções por dependente
  const deductionBase = inss + (dependents * IRRF_DEPENDENT_DEDUCTION);
  const taxableIncome = Math.max(0, grossSalary - deductionBase);

  // Alíquotas progressivas
  if (taxableIncome <= 2112.0) {
    return 0;
  } else if (taxableIncome <= 2826.65) {
    return (taxableIncome - 2112.0) * 0.075;
  } else if (taxableIncome <= 3751.05) {
    return (2826.65 - 2112.0) * 0.075 + (taxableIncome - 2826.65) * 0.15;
  } else if (taxableIncome <= 4664.68) {
    return (2826.65 - 2112.0) * 0.075 +
           (3751.05 - 2826.65) * 0.15 +
           (taxableIncome - 3751.05) * 0.225;
  } else {
    return (2826.65 - 2112.0) * 0.075 +
           (3751.05 - 2826.65) * 0.15 +
           (4664.68 - 3751.05) * 0.225 +
           (taxableIncome - 4664.68) * 0.275;
  }
}

/**
 * Interface com detalhes de descontos
 */
export interface TaxDetails {
  grossSalary: number;
  inss: number;
  irrf: number;
  totalDeductions: number;
  netSalary: number;
  effectiveTaxRate: number; // Percentual do salário bruto
}

/**
 * Calcula todos os descontos e salário líquido
 * 
 * @param grossSalary Salário bruto
 * @param dependents Número de dependentes
 * @returns Detalhes dos descontos e salário líquido
 */
export function calculateNetSalary(grossSalary: number, dependents: number = 0): TaxDetails {
  const inss = calculateINSS(grossSalary);
  const irrf = calculateIRRF(grossSalary, dependents);
  const totalDeductions = inss + irrf;
  const netSalary = grossSalary - totalDeductions;
  const effectiveTaxRate = (totalDeductions / grossSalary) * 100;

  return {
    grossSalary,
    inss,
    irrf,
    totalDeductions,
    netSalary,
    effectiveTaxRate,
  };
}
