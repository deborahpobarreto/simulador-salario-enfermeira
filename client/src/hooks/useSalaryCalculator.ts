/**
 * Hook de Cálculo de Salário
 * Lei Complementar 323/2006 e Lei 19.313/2025
 * 
 * Implementa cálculos conforme legislação, sem interpretações adicionais
 */

import {
  SALARY_TABLE,
  PERFORMANCE_BONUS_PERCENTAGE,
  POST_GRADUATION_PERCENTAGES,
  NIGHTTIME_ADDITIONAL_PERCENTAGE,
  TRIENNIAL_PERCENTAGE,
  TRIENNIAL_MAX_PERCENTAGE,
  SALARY_FAMILY_PERCENTAGE,
  VACATION_THIRD_PERCENTAGE,
  FUNCTION_GRATIFICATIONS,
  INSALUBRITY_PERCENTAGES,
} from "@/../../shared/salaryData";
import { calculateINSS, calculateIRRF } from "@/../../shared/taxCalculator";
import { useMemo } from "react";

/**
 * Interface de entrada para cálculo
 * Lei Complementar 323/2006
 */
export interface SalaryCalculatorInput {
  // Identificação do cargo (Lei 19.313/2025)
  cargo?: string; // Nome do cargo
  level: number; // 13-16 para Enfermeiro
  letter: string; // A-J

  // Tempo de serviço
  yearsOfPreviousService: number; // Tempo anterior (Art. 33)
  yearsOfService: number; // Tempo na posição atual

  // Período para cálculo de gratificação (Lei 19.313/2025)
  performancePeriod: "before_may_2025" | "may_to_december_2025" | "after_december_2025";

  // Pós-Graduação (Art. 14 - não cumulativo)
  postGraduation: "none" | "specialization" | "masters" | "doctorate";

  // Adicional Noturno (Art. 11)
  nighttimeHours: number; // Horas entre 22h-06h

  // Hora-Plantão (Art. 16)
  // Calculada automaticamente como 50% do valor/hora do vencimento básico
  plantaoHours: number;

  // Sobreaviso (Art. 17)
  sobreaviso: {
    hours: number; // Máximo 200/mês
    hourlyRate: number;
    convoked: boolean; // true = 100%, false = 50%
  };

  // Insalubridade (Art. 12)
  insalubrity: string; // Tipo de insalubridade: none, general_minimum, general_medium, general_maximum, specific_minimum, specific_medium, specific_maximum

  // Gratificação de Função (ANEXO IV)
  functionGratification: string; // GF-1 a GF-9 ou "none"

  // Auxílios
  foodAllowance: number; // Art. 18
  dependents: number; // Para Salário-Família (Art. 19)
}

/**
 * Interface de saída com detalhes do cálculo
 */
export interface SalaryCalculatorOutput {
  // Componentes principais
  basicSalary: number;
  performanceBonus: number;
  postGraduationBonus: number;
  triennialBonus: number;
  insalubrity: number;
  nighttimeAdditional: number;
  plantaoTotal: number;
  sobreavisoTotal: number;
  functionGratification: number;
  foodAllowance: number;
  salaryFamily: number;

  // Totalizadores
  monthlyGrossSalary: number;
  annualGrossSalary: number;
  thirteenthSalary: number; // 13º salário
  vacationWithThirds: number;
  annualImpact: number; // Salário anual + 13º + férias com 1/3

  // Descontos e Salário Líquido
  inss: number;
  irrf: number;
  totalDeductions: number;
  netSalary: number;
  effectiveTaxRate: number;

  // Detalhes
  details: {
    performanceBonusPercentage: number;
    postGraduationPercentage: number;
    triennialPercentage: number;
    triennialYears: number;
  };
}

/**
 * Hook para cálculo de salário
 * Implementa Lei Complementar 323/2006 e Lei 19.313/2025
 */
export function useSalaryCalculator(input: SalaryCalculatorInput): SalaryCalculatorOutput {
  return useMemo(() => {
    // 1. Vencimento Básico (Lei 19.313/2025)
    const basicSalary = SALARY_TABLE[input.level.toString()]?.[input.letter] || 0;

    // 2. Gratificação de Desempenho (Lei 15.984/2013, alterada por Lei 19.313/2025)
    const performanceBonusPercentage = PERFORMANCE_BONUS_PERCENTAGE[input.performancePeriod] || 0.70;
    const performanceBonus = basicSalary * performanceBonusPercentage;

    // 3. Adicional de Pós-Graduação (Art. 14 - não cumulativo)
    const postGraduationPercentage = POST_GRADUATION_PERCENTAGES[input.postGraduation] || 0;
    const postGraduationBonus = basicSalary * postGraduationPercentage;

    // 4. Adicional Trienal (Art. 15)
    // 3% a cada 3 anos, máximo 36%
    const totalYearsOfService = input.yearsOfPreviousService + input.yearsOfService;
    const triennialYears = Math.floor(totalYearsOfService / 3);
    const triennialPercentage = Math.min(
      triennialYears * TRIENNIAL_PERCENTAGE,
      TRIENNIAL_MAX_PERCENTAGE
    );
    const triennialBonus = basicSalary * triennialPercentage;

    // 5. Adicional Noturno (Art. 11)
    // 25% sobre valor da hora trabalhada entre 22h-06h
    const hourlyRate = basicSalary / 220; // Aproximadamente 220 horas/mês
    const nighttimeAdditional = input.nighttimeHours * hourlyRate * NIGHTTIME_ADDITIONAL_PERCENTAGE;

    // 6. Hora-Plantão (Art. 16)
    // 50% do valor/hora do vencimento básico
    const plantaoHourlyRate = (basicSalary / 220) * 0.5; // 50% da hora base
    const plantaoTotal = input.plantaoHours * plantaoHourlyRate;

    // 7. Sobreaviso (Art. 17)
    // 100% se convocado, 50% se não convocado
    const sobreavisoPercentage = input.sobreaviso.convoked ? 1.0 : 0.5;
    const sobreavisoTotal = input.sobreaviso.hours * input.sobreaviso.hourlyRate * sobreavisoPercentage;

    // 8. Insalubridade (Art. 12)
    // Calculado sobre Nivel 9, Referencia A
    const level9BaseValue = SALARY_TABLE["9"]?.["A"] || 1800.00;
    let insalubrity = 0;
    
    if (input.insalubrity === "general_minimum") {
      insalubrity = level9BaseValue * 0.13;
    } else if (input.insalubrity === "general_medium") {
      insalubrity = level9BaseValue * 0.17;
    } else if (input.insalubrity === "general_maximum") {
      insalubrity = level9BaseValue * 0.23;
    } else if (input.insalubrity === "specific_minimum") {
      insalubrity = level9BaseValue * 0.17;
    } else if (input.insalubrity === "specific_medium") {
      insalubrity = level9BaseValue * 0.26;
    } else if (input.insalubrity === "specific_maximum") {
      insalubrity = level9BaseValue * 0.34;
    }

    // 9. Gratificação de Função (ANEXO IV)
    let functionGratification = 0;
    if (input.functionGratification !== "none") {
      const gf = FUNCTION_GRATIFICATIONS[input.functionGratification as keyof typeof FUNCTION_GRATIFICATIONS];
      functionGratification = gf ? gf : 0;
    }

    // 11. Auxílio Alimentação (Art. 18)
    const foodAllowance = input.foodAllowance;

    // 12. Salário-Família (Art. 19)
    // 5% do salário mínimo por dependente (não implementado - usar 0)
    const salaryFamily = 0;

    // Totalizadores
    const monthlyGrossSalary =
      basicSalary +
      performanceBonus +
      postGraduationBonus +
      triennialBonus +
      insalubrity +
      nighttimeAdditional +
      plantaoTotal +
      sobreavisoTotal +
      functionGratification +
      foodAllowance +
      salaryFamily;

    const annualGrossSalary = monthlyGrossSalary * 12;

    // 13º salário (proporcional ao mês)
    const thirteenthSalary = monthlyGrossSalary;

    // Férias com 1/3 (Art. 21)
    const vacationWithThirds = monthlyGrossSalary * VACATION_THIRD_PERCENTAGE;

    // Impacto anual: salário anual + 13º + férias com 1/3
    const annualImpact = annualGrossSalary + thirteenthSalary + vacationWithThirds;

    // Função para arredondar para 2 casas decimais
    const round = (value: number) => Math.round(value * 100) / 100;

    // Cálculo de Impostos
    const inss = round(calculateINSS(monthlyGrossSalary));
    const irrf = round(calculateIRRF(monthlyGrossSalary, input.dependents));
    const totalDeductions = round(inss + irrf);
    const netSalary = round(monthlyGrossSalary - totalDeductions);
    const effectiveTaxRate = round((totalDeductions / monthlyGrossSalary) * 100);

    return {
      basicSalary: round(basicSalary),
      performanceBonus: round(performanceBonus),
      postGraduationBonus: round(postGraduationBonus),
      triennialBonus: round(triennialBonus),
      insalubrity: round(insalubrity),
      nighttimeAdditional: round(nighttimeAdditional),
      plantaoTotal: round(plantaoTotal),
      sobreavisoTotal: round(sobreavisoTotal),
      functionGratification: round(functionGratification),
      foodAllowance: round(foodAllowance),
      salaryFamily: round(salaryFamily),
      monthlyGrossSalary: round(monthlyGrossSalary),
      annualGrossSalary: round(annualGrossSalary),
      thirteenthSalary: round(thirteenthSalary),
      vacationWithThirds: round(vacationWithThirds),
      annualImpact: round(annualImpact),
      inss,
      irrf,
      totalDeductions,
      netSalary,
      effectiveTaxRate,
      details: {
        performanceBonusPercentage,
        postGraduationPercentage,
        triennialPercentage,
        triennialYears,
      },
    };
  }, [input]);
}
