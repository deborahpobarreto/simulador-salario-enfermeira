/**
 * Dados estruturados conforme Lei Complementar nº 323/2006 e Lei 19.313/2025
 * Tabela de Vencimentos - Secretaria de Estado da Saúde - SC
 */

export const SALARY_LEVELS = {
  1: "Nível 1",
  2: "Nível 2",
  3: "Nível 3",
  4: "Nível 4",
  5: "Nível 5",
  6: "Nível 6",
  7: "Nível 7",
  8: "Nível 8",
  9: "Nível 9",
  10: "Nível 10",
  11: "Nível 11",
  12: "Nível 12",
  13: "Nível 13 (Enfermeiro)",
  14: "Nível 14 (Enfermeiro)",
  15: "Nível 15 (Enfermeiro)",
  16: "Nível 16 (Enfermeiro)",
} as const;

export const SALARY_LETTERS = {
  A: "A",
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

/**
 * Tabela de Vencimentos - Lei 19.313/2025
 * Valores em reais (R$)
 */
export const BASIC_SALARY: Record<number, Record<string, number>> = {
  1: {
    A: 1629.63,
    B: 1650.81,
    C: 1672.25,
    D: 1694.00,
    E: 1716.03,
    F: 1738.31,
    G: 1760.94,
    H: 1783.81,
    I: 1807.00,
    J: 1830.50,
  },
  2: {
    A: 1854.29,
    B: 1878.39,
    C: 1902.83,
    D: 1927.52,
    E: 1952.60,
    F: 1978.00,
    G: 2003.70,
    H: 2029.75,
    I: 2056.14,
    J: 2082.88,
  },
  3: {
    A: 2109.96,
    B: 2137.37,
    C: 2165.15,
    D: 2193.30,
    E: 2221.81,
    F: 2250.71,
    G: 2279.96,
    H: 2309.62,
    I: 2339.64,
    J: 2370.04,
  },
  4: {
    A: 2400.86,
    B: 2432.05,
    C: 2463.67,
    D: 2495.71,
    E: 2528.18,
    F: 2561.01,
    G: 2594.32,
    H: 2628.03,
    I: 2662.22,
    J: 2696.82,
  },
  5: {
    A: 1758.27,
    B: 1781.14,
    C: 1804.29,
    D: 1827.72,
    E: 1851.50,
    F: 1875.54,
    G: 1899.95,
    H: 1924.63,
    I: 1949.67,
    J: 1975.00,
  },
  6: {
    A: 2000.70,
    B: 2026.67,
    C: 2053.03,
    D: 2079.72,
    E: 2106.76,
    F: 2134.17,
    G: 2161.88,
    H: 2190.01,
    I: 2218.47,
    J: 2247.32,
  },
  7: {
    A: 2276.53,
    B: 2306.11,
    C: 2336.08,
    D: 2336.08,
    E: 2397.23,
    F: 2428.38,
    G: 2459.96,
    H: 2491.96,
    I: 2524.33,
    J: 2557.16,
  },
  8: {
    A: 2590.39,
    B: 2624.09,
    C: 2658.19,
    D: 2692.75,
    E: 2727.74,
    F: 2763.22,
    G: 2799.13,
    H: 2835.52,
    I: 2872.37,
    J: 2909.72,
  },
  9: {
    A: 1929.78,
    B: 1958.73,
    C: 1988.11,
    D: 2017.93,
    E: 2048.22,
    F: 2078.95,
    G: 2110.13,
    H: 2141.77,
    I: 2173.90,
    J: 2206.51,
  },
  10: {
    A: 2239.62,
    B: 2273.18,
    C: 2307.33,
    D: 2341.92,
    E: 2377.06,
    F: 2412.69,
    G: 2448.88,
    H: 2485.64,
    I: 2522.90,
    J: 2560.77,
  },
  11: {
    A: 2599.15,
    B: 2638.14,
    C: 2677.72,
    D: 2717.88,
    E: 2758.66,
    F: 2800.04,
    G: 2842.01,
    H: 2884.66,
    I: 2927.91,
    J: 2971.84,
  },
  12: {
    A: 3016.41,
    B: 3061.67,
    C: 3107.60,
    D: 3154.20,
    E: 3201.52,
    F: 3249.55,
    G: 3298.30,
    H: 3347.77,
    I: 3397.98,
    J: 3448.95,
  },
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
    F: 3463.00,
    G: 3532.26,
    H: 3602.93,
    I: 3675.00,
    J: 3748.47,
  },
  15: {
    A: 3823.44,
    B: 3899.92,
    C: 3977.91,
    D: 4057.48,
    E: 4138.60,
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
    J: 5570.00,
  },
};

/**
 * Gratificação de Desempenho em Saúde
 * Lei 15.984/2013, alterada pela Lei 19.313/2025
 * § 4º Fica a vantagem fixada em:
 * I – 80% do vencimento a contar de 1º de maio de 2025
 * II – 90% do vencimento a contar de 1º de dezembro de 2025
 */
export const PERFORMANCE_BONUS_PERCENTAGE = {
  before_may_2025: 0.70, // Antes da Lei 19.313/2025
  may_to_december_2025: 0.80, // 1º maio a 30 novembro 2025
  after_december_2025: 0.90, // A partir de 1º dezembro 2025
} as const;

/**
 * Adicional Noturno - Lei Complementar 323/2006, Art. 16
 * 25% sobre o valor da hora trabalhada entre 22h e 06h
 */
export const NIGHTTIME_ADDITIONAL_PERCENTAGE = 0.25;

/**
 * Triênio - Lei Complementar 323/2006, Art. 15
 * 3% sobre o vencimento básico a cada 3 anos de serviço, até 36%
 */
export const TRIENNIAL_BONUS = (years: number): number => {
  const triennial = Math.floor(years / 3);
  const percentage = Math.min(triennial * 3, 36);
  return percentage;
};

/**
 * Adicionais fixos (conforme legislação)
 */
export const DEFAULT_FOOD_ALLOWANCE = 550;

/**
 * Tipos de período para cálculo de gratificação
 */
export const PERFORMANCE_PERIODS = {
  before_may_2025: "Antes de 1º maio 2025",
  may_to_december_2025: "1º maio a 30 nov 2025",
  after_december_2025: "A partir de 1º dez 2025",
} as const;

/**
 * Tipos de pós-graduação (conforme Lei 323/2006)
 */
export const POSTGRAD_TYPES = {
  none: "Nenhuma",
  especialization: "Especialização",
  masters: "Mestrado",
  doctorate: "Doutorado",
} as const;

/**
 * Tipos de insalubridade (conforme Lei 323/2006, Art. 15)
 */
export const INSALUBRITY_LEVELS = {
  none: "Nenhuma",
  minimum: "Mínima",
  medium: "Média",
  maximum: "Máxima",
} as const;

/**
 * Setores de insalubridade
 */
export const INSALUBRITY_SECTORS = {
  general: "Setores Gerais",
  specific: "Setores Específicos",
} as const;
