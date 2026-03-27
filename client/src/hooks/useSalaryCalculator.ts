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
  TRIENAL_PERCENTAGE_PER_3_YEARS,
  TRIENAL_MAXIMUM_PERCENTAGE,
  SALARY_FAMILY_PERCENTAGE,
  MINIMUM_WAGE_2025,
  VACATION_THIRDS_PERCENTAGE,
} from "@/../../shared/salaryData";
import { useMemo } from "react";

/**
 * Interface de entrada para cálculo
 * Lei Complementar 323/2006
 */
export interface SalaryCalculatorInput {
  // Identificação do cargo (Lei 19.313/2025)
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
  plantaoHours: number;
  plantaoHourlyRate: number;

  // Sobreaviso (Art. 17)
  sobreaviso: {
    hours: number; // Máximo 200/mês
    hourlyRate: number;
    convoked: boolean; // true = 100%, false = 50%
  };

  // Insalubridade (Art. 12)
  insalubrity: string; // Tipo de insalubridade: none, general_minimum, general_medium, general_maximum, specific_minimum, specific_medium, specific_maximum

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
  foodAllowance: number;
  salaryFamily: number;

  // Totalizadores
  monthlyGrossSalary: number;
  annualGrossSalary: number;
  vacationWithThirds: number;

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
      triennialYears * TRIENAL_PERCENTAGE_PER_3_YEARS,
      TRIENAL_MAXIMUM_PERCENTAGE
    );
    const triennialBonus = basicSalary * triennialPercentage;

    // 5. Adicional Noturno (Art. 11)
    // 25% sobre valor da hora trabalhada entre 22h-06h
    const hourlyRate = basicSalary / 220; // Aproximadamente 220 horas/mês
    const nighttimeAdditional = input.nighttimeHours * hourlyRate * NIGHTTIME_ADDITIONAL_PERCENTAGE;

    // 6. Hora-Plantão (Art. 16)
    const plantaoTotal = input.plantaoHours * input.plantaoHourlyRate;

    // 7. Sobreaviso (Art. 17)
    // 100% se convocado, 50% se não convocado
    const sobreavisoPercentage = input.sobreaviso.convoked ? 1.0 : 0.5;
    const sobreavisoTotal = input.sobreaviso.hours * input.sobreaviso.hourlyRate * sobreavisoPercentage;

    // 8. Insalubridade (Art. 12)
    // Calculado sobre Nivel 9, Referencia A
    const level9BaseValue = SALARY_TABLE["9"]?.["A"] || 1800.00;
    let insalubrity = 0;
    
    if (input.insalubrity === "general_minimum") {
      insalubrity = level9BaseValue * 0.12;
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

    // 9. Auxílio Alimentação (Art. 18)
    const foodAllowance = input.foodAllowance;

    // 10. Salário-Família (Art. 19)
    // 5% do salário mínimo por dependente
    const salaryFamily = input.dependents * (MINIMUM_WAGE_2025 * SALARY_FAMILY_PERCENTAGE);

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
      foodAllowance +
      salaryFamily;

    const annualGrossSalary = monthlyGrossSalary * 12;

    // Férias com 1/3 (Art. 21)
    const vacationWithThirds = monthlyGrossSalary * VACATION_THIRDS_PERCENTAGE;

    return {
      basicSalary,
      performanceBonus,
      postGraduationBonus,
      triennialBonus,
      insalubrity,
      nighttimeAdditional,
      plantaoTotal,
      sobreavisoTotal,
      foodAllowance,
      salaryFamily,
      monthlyGrossSalary,
      annualGrossSalary,
      vacationWithThirds,
      details: {
        performanceBonusPercentage,
        postGraduationPercentage,
        triennialPercentage,
        triennialYears,
      },
    };
  }, [input]);
}
