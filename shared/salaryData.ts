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
 * Lei 19.313/2025 - Tabela de Vencimentos Básicos
 * Valores em R$ (conforme Lei 19.313/2025)
 * Estrutura: [Nível][Letra] = Vencimento Básico
 */
export const SALARY_TABLE: Record<string, Record<string, number>> = {
  "13": {
    "A": 2360.61,
    "B": 2472.64,
    "C": 2595.27,
    "D": 2727.03,
    "E": 2868.38,
    "F": 3019.79,
    "G": 3181.78,
    "H": 3355.87,
    "I": 3542.66,
    "J": 3742.80,
  },
  "14": {
    "A": 2580.67,
    "B": 2709.71,
    "C": 2848.19,
    "D": 2996.61,
    "E": 3155.44,
    "F": 3325.21,
    "G": 3506.47,
    "H": 3699.79,
    "I": 3905.78,
    "J": 4125.07,
  },
  "15": {
    "A": 2800.74,
    "B": 2940.78,
    "C": 3091.11,
    "D": 3252.19,
    "E": 3424.50,
    "F": 3608.63,
    "G": 3805.16,
    "H": 4014.71,
    "I": 4237.90,
    "J": 4475.34,
  },
  "16": {
    "A": 3020.80,
    "B": 3171.84,
    "C": 3334.03,
    "D": 3508.77,
    "E": 3696.56,
    "F": 3898.05,
    "G": 4113.85,
    "H": 4344.63,
    "I": 4591.02,
    "J": 4853.61,
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
 * Aproveitamento de Tempo de Serviço Anterior
 * 
 * Tempo anterior conta para:
 * - Progressão horizontal (letra)
 * - Progressão vertical (nível)
 * - Licença-prêmio
 * - Aposentadoria
 * - Outros direitos previstos em lei
 * 
 * MAS: Tempo em Licença-Prêmio gozada NÃO conta para progressão
 */
export const LETTERS_ARRAY = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] as const;

/**
 * Calcula letra inicial baseada em tempo de serviço anterior
 * Lei Complementar 323/2006, Art. 33 + Art. 8º
 * 
 * A cada 2 anos de serviço anterior, sobe uma letra
 * 
 * @param yearsOfPreviousService Anos de serviço anterior
 * @returns Letra inicial (A-J)
 */
export function calculateInitialLetter(yearsOfPreviousService: number): string {
  const lettersToAdvance = Math.floor(yearsOfPreviousService / HORIZONTAL_PROGRESSION_YEARS);
  const initialLetterIndex = Math.min(lettersToAdvance, LETTERS_ARRAY.length - 1);
  return LETTERS_ARRAY[initialLetterIndex];
}

/**
 * Interface para projeção de carreira
 */
export interface CareerProjection {
  year: number;
  level: number;
  letter: string;
  yearsInPosition: number;
  totalYearsOfService: number;
  description: string;
}

/**
 * Projeta carreira ao longo dos anos
 * Lei Complementar 323/2006, Art. 8º (Progressão Horizontal)
 * 
 * Progressão Horizontal: A cada 2 anos sobe uma letra (automática)
 * 
 * @param startingLevel Nível inicial (13-16)
 * @param startingLetter Letra inicial (A-J)
 * @param yearsOfPreviousService Anos de serviço anterior
 * @param yearsToProject Quantos anos projetar (máximo 10)
 * @returns Array com projeção de carreira
 */
export function projectCareer(
  startingLevel: number,
  startingLetter: string,
  yearsOfPreviousService: number,
  yearsToProject: number
): CareerProjection[] {
  const projections: CareerProjection[] = [];
  let currentLetterIndex = LETTERS_ARRAY.indexOf(startingLetter as any);

  for (let year = 0; year <= yearsToProject; year++) {
    const yearsInPosition = year;
    const totalYearsOfService = yearsOfPreviousService + year;

    // Progressão Horizontal: A cada 2 anos sobe uma letra
    currentLetterIndex = Math.min(
      LETTERS_ARRAY.indexOf(startingLetter as any) + Math.floor(yearsInPosition / HORIZONTAL_PROGRESSION_YEARS),
      LETTERS_ARRAY.length - 1
    );

    const currentLetter = LETTERS_ARRAY[currentLetterIndex];

    let description = `Ano ${year}`;
    if (year === 0) {
      description = "Entrada (com tempo anterior aproveitado)";
    } else if (year > 0 && yearsInPosition % HORIZONTAL_PROGRESSION_YEARS === 0) {
      description = `Progressão Horizontal: Letra ${currentLetter}`;
    }

    projections.push({
      year,
      level: startingLevel,
      letter: currentLetter,
      yearsInPosition,
      totalYearsOfService,
      description,
    });
  }

  return projections;
}
