import { useMemo } from "react";
import {
  BASIC_SALARY,
  NIGHTTIME_ADDITIONAL_PERCENTAGE,
  TRIENNIAL_BONUS,
  PERFORMANCE_BONUS_PERCENTAGE,
  DEFAULT_FOOD_ALLOWANCE,
} from "@/../../shared/salaryData";

export interface SalaryCalculatorInput {
  // Identificação do cargo
  level: number; // 1-16
  letter: string; // A-J
  
  // Tempo de serviço
  yearsOfPreviousService: number; // Tempo anterior como servidor público
  yearsOfService: number; // Tempo na posição atual
  
  // Período para cálculo de gratificação
  performancePeriod: "before_may_2025" | "may_to_december_2025" | "after_december_2025";
  
  // Variáveis conforme Lei 323/2006
  nighttimeHours: number; // Horas 22h-06h
  plantaoHours: number; // Hora-plantão
  plantaoHourlyRate: number;
  sobreaviso: {
    hours: number;
    hourlyRate: number;
    convoked: boolean; // true = 100%, false = 50%
  };
  
  // Auxílios
  foodAllowance: number;
  dependents: number;
}

export interface SalaryBreakdown {
  // Componentes fixos (Lei 323/2006)
  basicSalary: number;
  performanceBonus: number; // Gratificação de Desempenho (Lei 15.984/2013, alterada por Lei 19.313/2025)
  triennialBonus: number; // Adicional Trienal (Art. 15)
  nighttimeAdditional: number; // Adicional Noturno (Art. 16) - 25%
  
  // Variáveis (Lei 323/2006)
  plantaoTotal: number; // Hora-plantão
  sobreavisoTotal: number; // Sobreaviso
  
  // Auxílios (Lei 323/2006)
  foodAllowance: number; // Auxílio Alimentação
  salaryFamily: number; // Salário-Família
  
  // Totais
  monthlyGrossSalary: number;
  annualGrossSalary: number;
  vacationWithThirds: number; // Férias + 1/3
  
  details: {
    basicSalaryValue: number;
    performanceBonusPercentage: number;
    performanceBonusValue: number;
    triennialPercentage: number;
    triennialValue: number;
    nighttimeHours: number;
    nighttimePercentage: number;
    nighttimeAdditionalValue: number;
    plantaoHours: number;
    plantaoHourlyRate: number;
    plantaoTotal: number;
    sobreavisoHours: number;
    sobreavisoHourlyRate: number;
    sobreavisoPercentage: number;
    sobreavisoTotal: number;
    foodAllowance: number;
    dependents: number;
    salaryFamilyPercentage: number;
    salaryFamilyValue: number;
  };
}

// Salário mínimo estadual de referência para Salário-Família
const STATE_MINIMUM_SALARY = 1412.0;

export function useSalaryCalculator(input: SalaryCalculatorInput): SalaryBreakdown {
  return useMemo(() => {
    // 1. Vencimento Básico (Lei 19.313/2025 - Anexo III)
    const basicSalaryValue =
      BASIC_SALARY[input.level as keyof typeof BASIC_SALARY]?.[
        input.letter as keyof (typeof BASIC_SALARY)[1]
      ] || 0;

    // 2. Gratificação de Desempenho em Saúde (Lei 15.984/2013, alterada por Lei 19.313/2025)
    // § 4º: 80% (1º maio 2025) e 90% (1º dezembro 2025)
    const performanceBonusPercentage =
      PERFORMANCE_BONUS_PERCENTAGE[
        input.performancePeriod as keyof typeof PERFORMANCE_BONUS_PERCENTAGE
      ] || 0.70;
    const performanceBonusValue = basicSalaryValue * performanceBonusPercentage;

    // 3. Adicional Trienal (Lei 323/2006, Art. 15)
    // 3% sobre vencimento básico a cada 3 anos, até 36%
    const triennialPercentage = TRIENNIAL_BONUS(input.yearsOfService);
    const triennialValue = (basicSalaryValue * triennialPercentage) / 100;

    // 4. Adicional Noturno (Lei 323/2006, Art. 16)
    // 25% sobre hora trabalhada entre 22h e 06h
    const hourlyRate = basicSalaryValue / 160; // 160 horas/mês
    const nighttimeAdditionalValue =
      hourlyRate * NIGHTTIME_ADDITIONAL_PERCENTAGE * input.nighttimeHours;

    // 5. Hora-Plantão (Lei 323/2006)
    const plantaoTotal = input.plantaoHours * input.plantaoHourlyRate;

    // 6. Sobreaviso (Lei 323/2006)
    // 50% se não convocado, 100% se convocado
    const sobreavisoMultiplier = input.sobreaviso.convoked ? 1 : 0.5;
    const sobreavisoTotal =
      input.sobreaviso.hours * input.sobreaviso.hourlyRate * sobreavisoMultiplier;

    // 7. Auxílio Alimentação (Lei 323/2006)
    const foodAllowanceValue = input.foodAllowance;

    // 8. Salário-Família (Lei 323/2006)
    // 5% do salário mínimo por dependente
    const salaryFamilyValue = STATE_MINIMUM_SALARY * 0.05 * input.dependents;

    // Cálculos de totais
    const monthlyGrossSalary =
      basicSalaryValue +
      performanceBonusValue +
      triennialValue +
      nighttimeAdditionalValue +
      plantaoTotal +
      sobreavisoTotal +
      foodAllowanceValue +
      salaryFamilyValue;

    const annualGrossSalary = monthlyGrossSalary * 12;
    const vacationWithThirds = monthlyGrossSalary + monthlyGrossSalary / 3;

    return {
      basicSalary: basicSalaryValue,
      performanceBonus: performanceBonusValue,
      triennialBonus: triennialValue,
      nighttimeAdditional: nighttimeAdditionalValue,
      plantaoTotal,
      sobreavisoTotal,
      foodAllowance: foodAllowanceValue,
      salaryFamily: salaryFamilyValue,
      monthlyGrossSalary,
      annualGrossSalary,
      vacationWithThirds,
      details: {
        basicSalaryValue,
        performanceBonusPercentage: performanceBonusPercentage * 100,
        performanceBonusValue,
        triennialPercentage,
        triennialValue,
        nighttimeHours: input.nighttimeHours,
        nighttimePercentage: NIGHTTIME_ADDITIONAL_PERCENTAGE * 100,
        nighttimeAdditionalValue,
        plantaoHours: input.plantaoHours,
        plantaoHourlyRate: input.plantaoHourlyRate,
        plantaoTotal,
        sobreavisoHours: input.sobreaviso.hours,
        sobreavisoHourlyRate: input.sobreaviso.hourlyRate,
        sobreavisoPercentage: sobreavisoMultiplier * 100,
        sobreavisoTotal,
        foodAllowance: foodAllowanceValue,
        dependents: input.dependents,
        salaryFamilyPercentage: 5,
        salaryFamilyValue,
      },
    };
  }, [input]);
}
