import { useMemo } from "react";
import {
  BASIC_SALARY,
  INSALUBRITY_BONUS,
  POSTGRAD_BONUS,
  TRIENNIAL_BONUS,
} from "@/../../shared/salaryData";

export interface SalaryCalculatorInput {
  level: number;
  letter: string;
  postgrad: string;
  insalubrity: string;
  sector: "general" | "specific";
  yearsOfService: number;
  plantaoHours: number;
  plantaoHourlyRate: number;
  sobreaviso: {
    hours: number;
    hourlyRate: number;
    convoked: boolean; // true = 100%, false = 50%
  };
}

export interface SalaryBreakdown {
  basicSalary: number;
  postgradBonus: number;
  insalubrity: number;
  triennialBonus: number;
  plantaoTotal: number;
  sobreaviso: number;
  grossSalary: number;
  details: {
    basicSalaryValue: number;
    postgradPercentage: number;
    postgradValue: number;
    insalubrity: number;
    triennialPercentage: number;
    triennialValue: number;
    plantaoHours: number;
    plantaoHourlyRate: number;
    plantaoTotal: number;
    sobreavisoHours: number;
    sobreavisoHourlyRate: number;
    sobreavisoPercentage: number;
    sobreavisoTotal: number;
  };
}

export function useSalaryCalculator(input: SalaryCalculatorInput): SalaryBreakdown {
  return useMemo(() => {
    // 1. Vencimento Básico (Tabela 1)
    const basicSalaryValue = BASIC_SALARY[input.level as keyof typeof BASIC_SALARY]?.[
      input.letter as keyof (typeof BASIC_SALARY)[13]
    ] || 0;

    // 2. Adicional de Pós-Graduação (Tabela 2)
    const postgradData = POSTGRAD_BONUS[input.postgrad as keyof typeof POSTGRAD_BONUS] || {
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

    // 5. Variáveis Extras
    const plantaoTotal = input.plantaoHours * input.plantaoHourlyRate;

    const sobreavisoMultiplier = input.sobreaviso.convoked ? 1 : 0.5;
    const sobreavisoTotal = input.sobreaviso.hours * input.sobreaviso.hourlyRate * sobreavisoMultiplier;

    // Total
    const grossSalary =
      basicSalaryValue + postgradValue + insalubrity + triennialValue + plantaoTotal + sobreavisoTotal;

    return {
      basicSalary: basicSalaryValue,
      postgradBonus: postgradValue,
      insalubrity,
      triennialBonus: triennialValue,
      plantaoTotal,
      sobreaviso: sobreavisoTotal,
      grossSalary,
      details: {
        basicSalaryValue,
        postgradPercentage: postgradData.percentage,
        postgradValue,
        insalubrity,
        triennialPercentage,
        triennialValue,
        plantaoHours: input.plantaoHours,
        plantaoHourlyRate: input.plantaoHourlyRate,
        plantaoTotal,
        sobreavisoHours: input.sobreaviso.hours,
        sobreavisoHourlyRate: input.sobreaviso.hourlyRate,
        sobreavisoPercentage: sobreavisoMultiplier * 100,
        sobreavisoTotal,
      },
    };
  }, [input]);
}
