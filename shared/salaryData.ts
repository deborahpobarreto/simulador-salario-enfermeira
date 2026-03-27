/**
 * Dados estruturados das tabelas salariais de Enfermeiras
 * Lei 19.313/2025
 */

export const SALARY_LEVELS = {
  13: "Nível 13 (Inicial)",
  14: "Nível 14",
  15: "Nível 15",
  16: "Nível 16 (Final)",
} as const;

export const SALARY_LETTERS = {
  A: "A (Ingresso)",
  B: "B",
  C: "C",
  D: "D",
  E: "E",
  F: "F",
  G: "G",
  H: "H",
  I: "I",
  J: "J",
} as const;

// Tabela 1: Vencimento Básico (em reais)
export const BASIC_SALARY: Record<number, Record<string, number>> = {
  13: {
    A: 2573.06,
    B: 2624.53,
    C: 2677.03,
    D: 2730.57,
    E: 2785.18,
    F: 2840.88,
    G: 2897.69,
    H: 2955.63,
    I: 3014.77,
    J: 3075.06,
  },
  14: {
    A: 3136.55,
    B: 3199.29,
    C: 3263.27,
    D: 3328.53,
    E: 3395.09,
    F: 3463.0,
    G: 3532.26,
    H: 3602.93,
    I: 3675.0,
    J: 3748.47,
  },
  15: {
    A: 3823.44,
    B: 3899.92,
    C: 3977.91,
    D: 4057.48,
    E: 4138.6,
    F: 4221.41,
    G: 4305.82,
    H: 4391.92,
    I: 4479.77,
    J: 4569.37,
  },
  16: {
    A: 4660.75,
    B: 4753.98,
    C: 4849.05,
    D: 4946.02,
    E: 5044.96,
    F: 5145.85,
    G: 5248.75,
    H: 5353.73,
    I: 5460.82,
    J: 5570.0,
  },
};

// Tabela 2: Adicional de Pós-Graduação (valores fixos)
export const POSTGRAD_BONUS: Record<string, { percentage: number; value: number }> = {
  none: { percentage: 0, value: 0 },
  especialization: { percentage: 13, value: 334.5 },
  masters: { percentage: 16, value: 411.69 },
  doctorate: { percentage: 19, value: 488.88 },
};

// Tabela 3: Adicional de Insalubridade (valores fixos)
export const INSALUBRITY_BONUS: Record<string, Record<string, number>> = {
  none: { general: 0, specific: 0 },
  minimum: { general: 231.57, specific: 0 },
  medium: { general: 328.06, specific: 328.06 },
  maximum: { general: 443.85, specific: 501.74 },
};

// Tabela 4: Adicional Trienal (percentual sobre vencimento básico)
export const TRIENNIAL_BONUS = (years: number): number => {
  const triennial = Math.floor(years / 3);
  const percentage = Math.min(triennial * 3, 36); // Máximo 36%
  return percentage;
};

// Tipos de setor para insalubridade
export const INSALUBRITY_SECTORS = {
  general: "Setores Gerais",
  specific: "Setores Específicos (Psiquiatria/Infectologia)",
} as const;

// Tipos de pós-graduação
export const POSTGRAD_TYPES = {
  none: "Nenhuma",
  especialization: "Especialização",
  masters: "Mestrado",
  doctorate: "Doutorado",
} as const;

// Tipos de insalubridade
export const INSALUBRITY_LEVELS = {
  none: "Nenhuma",
  minimum: "Mínima",
  medium: "Média",
  maximum: "Máxima",
} as const;

// Constantes para adicionais
export const PERFORMANCE_BONUS_PERCENTAGE = 0.7; // 70% do vencimento
export const DEFAULT_FOOD_ALLOWANCE = 550; // Auxílio alimentação padrão
export const DEFAULT_INSALUBRITY_SES = 300.97; // Valor de referência setembro/2024
