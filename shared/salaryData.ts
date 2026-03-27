/**
 * Dados Salariais - Lei Complementar 323/2006 e Lei 19.313/2025
 * Estrutura de Carreira de Enfermagem do Estado de Santa Catarina
 * 
 * ATENÇÃO: Todos os dados baseados EXCLUSIVAMENTE na legislação.
 * Ignorar interpretações anteriores - usar apenas fontes legais.
 */

/**
 * Lei Complementar 323/2006 - Art. 2º
 * Estrutura de Carreira: 3 Níveis (Auxiliar, Técnico, Enfermeiro)
 * Lei 19.313/2025 - Atualiza tabela para 16 níveis
 * 
 * Para Enfermeiros: Níveis 13-16 (conforme Lei 19.313/2025)
 */
export const SALARY_LEVELS: Record<string, string> = {
  "1": "Nível 1",
  "2": "Nível 2",
  "3": "Nível 3",
  "4": "Nível 4",
  "5": "Nível 5",
  "6": "Nível 6",
  "7": "Nível 7",
  "8": "Nível 8",
  "9": "Nível 9",
  "10": "Nível 10",
  "11": "Nível 11",
  "12": "Nível 12",
  "13": "Nível 13 - Enfermeiro",
  "14": "Nível 14 - Enfermeiro",
  "15": "Nível 15 - Enfermeiro",
  "16": "Nível 16 - Enfermeiro",
};

/**
 * Lei Complementar 323/2006 - Art. 8º
 * Progressão Horizontal: A cada 2 anos sobe uma letra (A-J)
 */
export const SALARY_LETTERS: Record<string, string> = {
  "A": "Referência A",
  "B": "Referência B",
  "C": "Referência C",
  "D": "Referência D",
  "E": "Referência E",
  "F": "Referência F",
  "G": "Referência G",
  "H": "Referência H",
  "I": "Referência I",
  "J": "Referência J",
};

/**
 * Lei 19.313/2025 - Tabela de Vencimentos Básicos (ANEXO III)
 * Valores em R$ (conforme Lei 19.313/2025)
 * Estrutura: [Nível][Letra] = Vencimento Básico
 */
export const SALARY_TABLE: Record<string, Record<string, number>> = {
  "1": {
    "A": 1495.07,
    "B": 1514.50,
    "C": 1534.17,
    "D": 1554.13,
    "E": 1574.34,
    "F": 1594.78,
    "G": 1615.54,
    "H": 1636.52,
    "I": 1657.80,
    "J": 1679.36,
  },
  "2": {
    "A": 1701.18,
    "B": 1723.29,
    "C": 1745.72,
    "D": 1768.37,
    "E": 1791.38,
    "F": 1814.68,
    "G": 1838.26,
    "H": 1862.16,
    "I": 1886.37,
    "J": 1910.90,
  },
  "3": {
    "A": 1935.74,
    "B": 1960.89,
    "C": 1986.38,
    "D": 2012.20,
    "E": 2038.36,
    "F": 2064.87,
    "G": 2091.71,
    "H": 2118.92,
    "I": 2146.46,
    "J": 2174.35,
  },
  "4": {
    "A": 2202.62,
    "B": 2231.24,
    "C": 2260.25,
    "D": 2289.64,
    "E": 2319.43,
    "F": 2349.55,
    "G": 2380.11,
    "H": 2411.04,
    "I": 2442.40,
    "J": 2474.15,
  },
  "5": {
    "A": 1613.09,
    "B": 1634.07,
    "C": 1655.31,
    "D": 1676.81,
    "E": 1698.62,
    "F": 1720.68,
    "G": 1743.07,
    "H": 1765.72,
    "I": 1788.69,
    "J": 1811.93,
  },
  "6": {
    "A": 1835.50,
    "B": 1859.33,
    "C": 1883.51,
    "D": 1908.00,
    "E": 1932.81,
    "F": 1957.95,
    "G": 1983.38,
    "H": 2009.18,
    "I": 2035.29,
    "J": 2061.76,
  },
  "7": {
    "A": 2088.56,
    "B": 2115.70,
    "C": 2143.19,
    "D": 2171.07,
    "E": 2199.29,
    "F": 2227.87,
    "G": 2256.84,
    "H": 2286.20,
    "I": 2315.90,
    "J": 2346.02,
  },
  "8": {
    "A": 2376.50,
    "B": 2407.42,
    "C": 2438.71,
    "D": 2470.41,
    "E": 2502.51,
    "F": 2535.06,
    "G": 2568.01,
    "H": 2601.39,
    "I": 2635.20,
    "J": 2669.47,
  },
  "9": {
    "A": 1770.44,
    "B": 1797.00,
    "C": 1823.95,
    "D": 1851.31,
    "E": 1879.10,
    "F": 1907.29,
    "G": 1935.90,
    "H": 1964.93,
    "I": 1994.40,
    "J": 2024.32,
  },
  "10": {
    "A": 2054.70,
    "B": 2085.49,
    "C": 2116.82,
    "D": 2148.55,
    "E": 2180.79,
    "F": 2213.48,
    "G": 2246.68,
    "H": 2280.40,
    "I": 2314.59,
    "J": 2349.33,
  },
  "11": {
    "A": 2384.54,
    "B": 2420.31,
    "C": 2456.62,
    "D": 2493.47,
    "E": 2530.88,
    "F": 2568.84,
    "G": 2607.35,
    "H": 2646.48,
    "I": 2686.16,
    "J": 2726.46,
  },
  "12": {
    "A": 2767.35,
    "B": 2808.87,
    "C": 2851.01,
    "D": 2893.76,
    "E": 2937.17,
    "F": 2981.24,
    "G": 3025.96,
    "H": 3071.35,
    "I": 3117.41,
    "J": 3164.17,
  },
  "13": {
    "A": 2360.61,
    "B": 2407.83,
    "C": 2455.99,
    "D": 2505.11,
    "E": 2555.21,
    "F": 2606.31,
    "G": 2658.43,
    "H": 2711.59,
    "I": 2765.84,
    "J": 2821.16,
  },
  "14": {
    "A": 2877.57,
    "B": 2935.13,
    "C": 2993.83,
    "D": 3053.70,
    "E": 3114.76,
    "F": 3177.06,
    "G": 3240.61,
    "H": 3305.44,
    "I": 3371.56,
    "J": 3438.96,
  },
  "15": {
    "A": 3507.74,
    "B": 3577.91,
    "C": 3649.46,
    "D": 3722.46,
    "E": 3796.88,
    "F": 3872.85,
    "G": 3950.29,
    "H": 4029.28,
    "I": 4109.88,
    "J": 4192.08,
  },
  "16": {
    "A": 4275.92,
    "B": 4361.45,
    "C": 4448.67,
    "D": 4537.63,
    "E": 4628.40,
    "F": 4720.96,
    "G": 4815.37,
    "H": 4911.68,
    "I": 5009.93,
    "J": 5110.09,
  },
};

/**
 * Lei 15.984/2013, alterada por Lei 18.371/2022 e Lei 19.313/2025
 * Gratificação de Desempenho em Saúde
 * 
 * Percentuais conforme período:
 * - Até 30 abr 2025: 70%
 * - 1º mai 2025 a 30 nov 2025: 80% (50% em mai, 50% em jun)
 * - A partir 1º dez 2025: 90% (50% em dez, 50% em jan/2026)
 */
export const PERFORMANCE_PERIODS: Record<string, string> = {
  "before_may_2025": "Até 30 de abril de 2025 (70%)",
  "may_to_december_2025": "1º de maio a 30 de novembro de 2025 (80%)",
  "after_december_2025": "A partir de 1º de dezembro de 2025 (90%)",
};

export const PERFORMANCE_BONUS_PERCENTAGE: Record<string, number> = {
  "before_may_2025": 0.70,
  "may_to_december_2025": 0.80,
  "after_december_2025": 0.90,
};

/**
 * Lei Complementar 323/2006 - Art. 14º
 * Adicional de Pós-Graduação (não cumulativo)
 * 
 * Percentuais sobre o vencimento básico:
 * - Especialização: 13%
 * - Mestrado: 16%
 * - Doutorado: 19%
 * 
 * NÃO CUMULATIVO: Só um tipo de pós-graduação por vez
 */
export const POST_GRADUATION_PERCENTAGES: Record<string, number> = {
  "none": 0.00,
  "specialization": 0.13,
  "masters": 0.16,
  "doctorate": 0.19,
};

/**
 * Lei Complementar 323/2006 - Art. 12
 * Adicional de Insalubridade
 * Valor fixo calculado sobre Nivel 9, Referencia A
 * 
 * Setores Gerais:
 * - Minimo: 13% (conforme edital)
 * - Medio: 17%
 * - Maximo: 23%
 * 
 * Setores Especificos (Psiquiatria, Infectologia):
 * - Minimo: 17%
 * - Medio: 26%
 * - Maximo: 34%
 */
export const INSALUBRITY_PERCENTAGES = {
  general: {
    minimum: 0.13,
    medium: 0.17,
    maximum: 0.23,
  },
  specific: {
    minimum: 0.17,
    medium: 0.26,
    maximum: 0.34,
  },
};

export const INSALUBRITY_TYPES: Record<string, string> = {
  "none": "Sem Insalubridade",
  "general_minimum": "Geral - Minimo (13%)",
  "general_medium": "Geral - Medio (17%)",
  "general_maximum": "Geral - Maximo (23%)",
  "specific_minimum": "Especificos - Minimo (17%)",
  "specific_medium": "Especificos - Medio (26%)",
  "specific_maximum": "Especificos - Maximo (34%)",
};

/**
 * Lei Complementar 323/2006 - Art. 11º
 * Adicional Noturno
 * 25% sobre o valor da hora trabalhada entre 22h e 06h
 */
export const NIGHTTIME_ADDITIONAL_PERCENTAGE = 0.25;

/**
 * Lei Complementar 323/2006 - Art. 15º
 * Adicional Trienal
 * 3% a cada 3 anos de serviço, máximo 36% (12 triênios)
 * Contagem inclui tempo anterior (Art. 33)
 */
export const TRIENAL_PERCENTAGE_PER_3_YEARS = 0.03;
export const TRIENAL_MAXIMUM_PERCENTAGE = 0.36;

/**
 * Lei Complementar 323/2006 - Art. 18º
 * Auxílio Alimentação (valor padrão, customizável)
 */
export const DEFAULT_FOOD_ALLOWANCE = 550.00;

/**
 * Lei Complementar 323/2006 - Art. 19º
 * Salário-Família
 * 5% do salário mínimo por dependente
 * 
 * Salário mínimo 2025: R$ 1.412,00
 */
export const SALARY_FAMILY_PERCENTAGE = 0.05;
export const MINIMUM_WAGE_2025 = 1412.00;

/**
 * Lei Complementar 323/2006 - Art. 21º
 * Férias: 30 dias + 1/3 do salário
 */
export const VACATION_DAYS = 30;
export const VACATION_THIRDS_PERCENTAGE = 1 / 3;

/**
 * Lei Complementar 323/2006 - Art. 20º
 * Licença-Prêmio
 * A cada 5 anos: 3 meses remunerados
 * 
 * IMPORTANTE: Tempo gozado em Licença-Prêmio NÃO conta para progressão
 * Licença-Prêmio NÃO pode ser convertida em dinheiro
 */
export const LEAVE_REWARD_FREQUENCY_YEARS = 5;
export const LEAVE_REWARD_DURATION_MONTHS = 3;

/**
 * Lei Complementar 323/2006 - Art. 8º
 * Progressão Horizontal
 * A cada 2 anos de serviço, sobe uma letra
 */
export const HORIZONTAL_PROGRESSION_YEARS = 2;

/**
 * Lei Complementar 323/2006 - Art. 9º
 * Progressão Vertical
 * Requisito: 120 horas de capacitação profissional
 */
export const VERTICAL_PROGRESSION_HOURS = 120;

/**
 * Lei Complementar 323/2006 - Art. 33º
 * Aproveitamento de Tempo Anterior
 * Tempo em outro órgão público conta para progressão
 */
export const PREVIOUS_SERVICE_COUNTS_FOR_PROGRESSION = true;

/**
 * Lei Complementar 323/2006 - ANEXO IV
 * Gratificação de Função (GF)
 */
export const FUNCTION_GRATIFICATIONS: Record<string, { name: string; value: number }> = {
  "GF-1": { name: "Gestor I", value: 2332.80 },
  "GF-2": { name: "Gestor II", value: 1814.40 },
  "GF-3": { name: "Gestor III", value: 1555.20 },
  "GF-4": { name: "Apoio Gerencial I", value: 1244.10 },
  "GF-5": { name: "Apoio Gerencial II", value: 995.30 },
  "GF-6": { name: "Apoio Gerencial III", value: 796.20 },
  "GF-7": { name: "Apoio Gerencial IV", value: 347.40 },
  "GF-8": { name: "Chefe de Setor", value: 260.60 },
  "GF-9": { name: "Chefe de Seção", value: 217.10 },
};

/**
 * Função auxiliar para calcular letra inicial baseada em tempo anterior
 * Lei Complementar 323/2006 - Art. 33
 */
export function calculateInitialLetter(yearsOfPreviousService: number): string {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const letterIndex = Math.floor(yearsOfPreviousService / 2);
  return letters[Math.min(letterIndex, 9)];
}
