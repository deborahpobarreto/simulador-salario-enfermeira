/**
 * Cálculo de Impostos - INSS e IRRF
 * Baseado nas alíquotas 2026 (janeiro em diante)
 * Lei nº 15.191, de 11 de agosto de 2025
 * Lei nº 15.270, de 26 de novembro de 2025 (Tabela de Redução)
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
 * Cálculo de IRRF (Imposto de Renda Retido na Fonte)
 * Lei nº 15.191, de 11 de agosto de 2025
 * Tabela de Incidência Mensal a partir de janeiro de 2026
 * 
 * Alíquotas progressivas 2026 (janeiro em diante)
 * 
 * Faixas de renda (após deduções):
 * - Até R$ 2.428,80: isento
 * - De R$ 2.428,81 a R$ 2.826,65: 7,5% (dedução R$ 182,16)
 * - De R$ 2.826,66 a R$ 3.751,05: 15% (dedução R$ 394,16)
 * - De R$ 3.751,06 a R$ 4.664,68: 22,5% (dedução R$ 675,49)
 * - Acima de R$ 4.664,68: 27,5% (dedução R$ 908,73)
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

  // Alíquotas progressivas (janeiro 2026 em diante)
  let irrf = 0;
  
  if (taxableIncome <= 2428.80) {
    irrf = 0;
  } else if (taxableIncome <= 2826.65) {
    irrf = (taxableIncome - 2428.80) * 0.075;
  } else if (taxableIncome <= 3751.05) {
    irrf = (2826.65 - 2428.80) * 0.075 + (taxableIncome - 2826.65) * 0.15;
  } else if (taxableIncome <= 4664.68) {
    irrf = (2826.65 - 2428.80) * 0.075 +
           (3751.05 - 2826.65) * 0.15 +
           (taxableIncome - 3751.05) * 0.225;
  } else {
    irrf = (2826.65 - 2428.80) * 0.075 +
           (3751.05 - 2826.65) * 0.15 +
           (4664.68 - 3751.05) * 0.225 +
           (taxableIncome - 4664.68) * 0.275;
  }

  // Aplicar Tabela de Redução (Lei nº 15.270/2025)
  // Para rendimentos tributáveis até R$ 7.350,00
  if (taxableIncome <= 7350.00) {
    let reduction = 0;
    
    if (taxableIncome <= 5000.00) {
      // Redução até R$ 312,89 de modo que o imposto seja zero
      reduction = Math.min(irrf, 312.89);
    } else if (taxableIncome <= 7350.00) {
      // Redução decrescente: R$ 978,62 - (0,133145 x rendimentos tributáveis)
      reduction = 978.62 - (0.133145 * taxableIncome);
      reduction = Math.max(0, Math.min(reduction, irrf));
    }
    
    irrf = Math.max(0, irrf - reduction);
  }

  return irrf;
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
