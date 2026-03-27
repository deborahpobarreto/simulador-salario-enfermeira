import { useMemo } from "react";
import {
  BASIC_SALARY,
  INSALUBRITY_BONUS,
  POSTGRAD_BONUS,
  TRIENNIAL_BONUS,
  PERFORMANCE_BONUS_PERCENTAGE,
  DEFAULT_FOOD_ALLOWANCE,
  DEFAULT_INSALUBRITY_SES,
} from "@/../../shared/salaryData";

export interface SalaryCalculatorInput {
  level: number;
  letter: string;
  postgrad: string;
  insalubrity: string;
  sector: "general" | "specific";
  yearsOfService: number;
  // Variáveis extras
  plantaoHours: number;
  plantaoHourlyRate: number;
  sobreaviso: {
    hours: number;
    hourlyRate: number;
    convoked: boolean;
  };
  nighttimeHours: number; // Horas noturnas (22h-06h)
  nighttimeExtraHours: number; // Horas extras noturnas
  foodAllowance: number;
  dependents: number; // Para salário-família
}

export interface SalaryBreakdown {
  // Componentes fixos
  basicSalary: number;
  postgradBonus: number;
  insalubrity: number;
  triennialBonus: number;
  performanceBonus: number;
  // Variáveis
  plantaoTotal: number;
  sobreavisoTotal: number;
  nighttimeAdditional: number;
  nighttimeExtraTotal: number;
  foodAllowance: number;
  salaryFamily: number;
  // Totais
  monthlyGrossSalary: number;
  annualGrossSalary: number;
  thirdsOfVacation: number;
  vacationWithThirds: number;
  details: {
    basicSalaryValue: number;
    postgradPercentage: number;
    postgradValue: number;
    insalubrity: number;
    triennialPercentage: number;
    triennialValue: number;
    performanceBonusPercentage: number;
    performanceBonusValue: number;
    plantaoHours: number;
    plantaoHourlyRate: number;
    plantaoTotal: number;
    sobreavisoHours: number;
    sobreavisoHourlyRate: number;
    sobreavisoPercentage: number;
    sobreavisoTotal: number;
    nighttimeHours: number;
    nighttimePercentage: number;
    nighttimeAdditionalValue: number;
    nighttimeExtraHours: number;
    nighttimeExtraTotal: number;
    foodAllowance: number;
    dependents: number;
    salaryFamilyPercentage: number;
    salaryFamilyValue: number;
  };
}

// Salário mínimo estadual de referência (para cálculo de salário-família)
const STATE_MINIMUM_SALARY = 1412.0; // Aproximado para 2025

export function useSalaryCalculator(input: SalaryCalculatorInput): SalaryBreakdown {
  return useMemo(() => {
    // 1. Vencimento Básico (Tabela 1)
    const basicSalaryValue =
      BASIC_SALARY[input.level as keyof typeof BASIC_SALARY]?.[
        input.letter as keyof (typeof BASIC_SALARY)[13]
      ] || 0;

    // 2. Adicional de Pós-Graduação (Tabela 2)
    const postgradData =
      POSTGRAD_BONUS[input.postgrad as keyof typeof POSTGRAD_BONUS] || {
        percentage: 0,
        value: 0,
      };
    const postgradValue = postgradData.value;

    // 3. Adicional de Insalubridade (Tabela 3)
    const insalubrity =
      INSALUBRITY_BONUS[input.insalubrity as keyof typeof INSALUBRITY_BONUS]?.[
        input.sector as "general" | "specific"
      ] || 0;

    // 4. Adicional Trienal (Tabela 4)
    const triennialPercentage = TRIENNIAL_BONUS(input.yearsOfService);
    const triennialValue = (basicSalaryValue * triennialPercentage) / 100;

    // 5. Gratificação de Desempenho em Saúde (70% do vencimento)
    const performanceBonusValue = basicSalaryValue * PERFORMANCE_BONUS_PERCENTAGE;

    // 6. Adicional Noturno (25% sobre hora trabalhada 22h-06h)
    // Considerando 160 horas/mês como base
    const hourlyRate = basicSalaryValue / 160;
    const nighttimeAdditionalValue = (hourlyRate * 0.25 * input.nighttimeHours);

    // 7. Horas Extras Noturnas (valor/hora customizável)
    const nighttimeExtraTotal = input.nighttimeExtraHours * (hourlyRate * 1.5); // 50% extra

    // 8. Plantão
    const plantaoTotal = input.plantaoHours * input.plantaoHourlyRate;

    // 9. Sobreaviso
    const sobreavisoMultiplier = input.sobreaviso.convoked ? 1 : 0.5;
    const sobreavisoTotal =
      input.sobreaviso.hours * input.sobreaviso.hourlyRate * sobreavisoMultiplier;

    // 10. Auxílio Alimentação
    const foodAllowanceValue = input.foodAllowance;

    // 11. Salário-Família (5% do menor salário por dependente)
    const salaryFamilyValue = (STATE_MINIMUM_SALARY * 0.05 * input.dependents);

    // Cálculos de salário mensal
    const monthlyGrossSalary =
      basicSalaryValue +
      postgradValue +
      insalubrity +
      triennialValue +
      performanceBonusValue +
      plantaoTotal +
      sobreavisoTotal +
      nighttimeAdditionalValue +
      nighttimeExtraTotal +
      foodAllowanceValue +
      salaryFamilyValue;

    // Cálculos anuais
    const annualGrossSalary = monthlyGrossSalary * 12;
    const thirdsOfVacation = monthlyGrossSalary / 3;
    const vacationWithThirds = monthlyGrossSalary + thirdsOfVacation;

    return {
      basicSalary: basicSalaryValue,
      postgradBonus: postgradValue,
      insalubrity,
      triennialBonus: triennialValue,
      performanceBonus: performanceBonusValue,
      plantaoTotal,
      sobreavisoTotal,
      nighttimeAdditional: nighttimeAdditionalValue,
      nighttimeExtraTotal,
      foodAllowance: foodAllowanceValue,
      salaryFamily: salaryFamilyValue,
      monthlyGrossSalary,
      annualGrossSalary,
      thirdsOfVacation,
      vacationWithThirds,
      details: {
        basicSalaryValue,
        postgradPercentage: postgradData.percentage,
        postgradValue,
        insalubrity,
        triennialPercentage,
        triennialValue,
        performanceBonusPercentage: PERFORMANCE_BONUS_PERCENTAGE * 100,
        performanceBonusValue,
        plantaoHours: input.plantaoHours,
        plantaoHourlyRate: input.plantaoHourlyRate,
        plantaoTotal,
        sobreavisoHours: input.sobreaviso.hours,
        sobreavisoHourlyRate: input.sobreaviso.hourlyRate,
        sobreavisoPercentage: sobreavisoMultiplier * 100,
        sobreavisoTotal,
        nighttimeHours: input.nighttimeHours,
        nighttimePercentage: 25,
        nighttimeAdditionalValue,
        nighttimeExtraHours: input.nighttimeExtraHours,
        nighttimeExtraTotal,
        foodAllowance: foodAllowanceValue,
        dependents: input.dependents,
        salaryFamilyPercentage: 5,
        salaryFamilyValue,
      },
    };
  }, [input]);
}

// Hook para projeção de carreira
export interface CareerProjectionInput {
  startingLevel: number;
  startingLetter: string;
  postgrad: string;
  insalubrity: string;
  sector: "general" | "specific";
  yearsToProject: number;
  plantaoHours: number;
  plantaoHourlyRate: number;
  nighttimeHours: number;
  foodAllowance: number;
  dependents: number;
}

export interface CareerYear {
  year: number;
  level: number;
  letter: string;
  progressionType: "horizontal" | "vertical" | "none";
  monthlyGrossSalary: number;
  annualGrossSalary: number;
  vacationWithThirds: number;
  yearsOfService: number;
}

export function useCareerProjection(
  input: CareerProjectionInput
): CareerYear[] {
  return useMemo(() => {
    const projection: CareerYear[] = [];
    let currentLevel = input.startingLevel;
    let currentLetter = input.startingLetter.charCodeAt(0) - "A".charCodeAt(0);
    const letters = "ABCDEFGHIJ".split("");

    for (let year = 0; year <= input.yearsToProject; year++) {
      let progressionType: "horizontal" | "vertical" | "none" = "none";

      // Lógica de progressão: alterna entre horizontal (letra) e vertical (nível)
      if (year > 0 && year % 2 === 0) {
        // A cada 2 anos
        if (year % 4 === 0) {
          // Progressão vertical (nível)
          if (currentLevel < 16) {
            currentLevel++;
            progressionType = "vertical";
          }
        } else {
          // Progressão horizontal (letra)
          if (currentLetter < 9) {
            currentLetter++;
            progressionType = "horizontal";
          }
        }
      }

      const letter = letters[currentLetter];

      // Calcular salário para este ano
      const salaryInput: SalaryCalculatorInput = {
        level: currentLevel,
        letter,
        postgrad: input.postgrad,
        insalubrity: input.insalubrity,
        sector: input.sector,
        yearsOfService: year,
        plantaoHours: input.plantaoHours,
        plantaoHourlyRate: input.plantaoHourlyRate,
        sobreaviso: { hours: 0, hourlyRate: 0, convoked: false },
        nighttimeHours: input.nighttimeHours,
        nighttimeExtraHours: 0,
        foodAllowance: input.foodAllowance,
        dependents: input.dependents,
      };

      const salary = useSalaryCalculator(salaryInput);

      projection.push({
        year,
        level: currentLevel,
        letter,
        progressionType,
        monthlyGrossSalary: salary.monthlyGrossSalary,
        annualGrossSalary: salary.annualGrossSalary,
        vacationWithThirds: salary.vacationWithThirds,
        yearsOfService: year,
      });
    }

    return projection;
  }, [input]);
}
