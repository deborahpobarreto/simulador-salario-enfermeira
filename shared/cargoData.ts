/**
 * Dados de Cargos e Estrutura de Carreira
 * Lei Complementar 323/2006
 * 
 * Cada cargo tem um nível inicial e final conforme a estrutura de carreira
 */

export interface Cargo {
  nome: string;
  quantitativo: number;
  nivelInicial: number;
  nivelFinal: number;
}

export const CARGOS: Cargo[] = [
  // Nível 1-4: Agentes de Serviços Gerais
  { nome: "Agente de Serviços Gerais", quantitativo: 2284, nivelInicial: 1, nivelFinal: 4 },

  // Nível 5-8: Copeiros, Lactaristas
  { nome: "Copeiro", quantitativo: 50, nivelInicial: 5, nivelFinal: 8 },
  { nome: "Lactarista", quantitativo: 96, nivelInicial: 5, nivelFinal: 8 },

  // Nível 9-12: Agentes, Auxiliares, Técnicos
  { nome: "Agente Auxiliar de Saúde Pública", quantitativo: 100, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Agente de Manutenção", quantitativo: 30, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Agente de Portaria", quantitativo: 12, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Agente em Atividades Administrativas", quantitativo: 100, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Atendente de Saúde Pública", quantitativo: 90, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Auxiliar de Enfermagem", quantitativo: 900, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Auxiliar de Laboratório", quantitativo: 60, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Auxiliar de Serviços Hospitalares e Assistenciais", quantitativo: 400, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Caldeireiro", quantitativo: 20, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Carpinteiro", quantitativo: 5, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Costureiro", quantitativo: 10, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Cozinheiro", quantitativo: 70, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Eletricista", quantitativo: 40, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Encanador", quantitativo: 12, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Jardineiro", quantitativo: 12, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Marceneiro", quantitativo: 12, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Massagista", quantitativo: 2, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Mecânico", quantitativo: 6, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Motorista", quantitativo: 200, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Motorista Socorrista", quantitativo: 100, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Padeiro", quantitativo: 5, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Pedreiro", quantitativo: 12, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Pintor", quantitativo: 12, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Rádio-Operador", quantitativo: 5, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico Auxiliar de Regulação Médica", quantitativo: 20, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico de Radiologia e Imagem", quantitativo: 180, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico em Alimentos", quantitativo: 5, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico em Atividades Administrativas", quantitativo: 1900, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico em Contabilidade", quantitativo: 28, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico em Edificações", quantitativo: 6, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico em Eletricidade", quantitativo: 10, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico em Eletrônica", quantitativo: 4, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico em Enfermagem", quantitativo: 4400, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico em Fisioterapia", quantitativo: 10, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico em Higiene Dental", quantitativo: 10, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico em Imobilização Ortopédica", quantitativo: 37, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico em Informática", quantitativo: 40, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico em Instrumentação Cirúrgica", quantitativo: 300, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico em Laboratório", quantitativo: 146, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico em Manut. de Equip. Médicos Hospitalares", quantitativo: 22, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico em Nutrição", quantitativo: 80, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico em Patologia Clínica", quantitativo: 10, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico em Prótese e Órtese", quantitativo: 50, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico em Radioterapia", quantitativo: 10, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico em Segurança do Trabalho", quantitativo: 20, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Técnico em Vigilância Sanitária", quantitativo: 10, nivelInicial: 9, nivelFinal: 12 },
  { nome: "Telefonista", quantitativo: 200, nivelInicial: 9, nivelFinal: 12 },

  // Nível 13-16: Profissionais de Nível Superior
  { nome: "Administrador", quantitativo: 50, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Analista de Sistemas", quantitativo: 35, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Analista Técnico Administrativo", quantitativo: 30, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Arquiteto", quantitativo: 36, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Assistente Social", quantitativo: 160, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Auditor em Saúde", quantitativo: 10, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Bibliotecário", quantitativo: 10, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Biólogo", quantitativo: 25, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Bioquímico", quantitativo: 216, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Contador", quantitativo: 4, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Economista", quantitativo: 5, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Enfermeiro", quantitativo: 1310, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Engenheiro", quantitativo: 23, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Farmacêutico", quantitativo: 165, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Fiscal Sanitarista", quantitativo: 50, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Físico", quantitativo: 5, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Fisioterapeuta", quantitativo: 130, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Fonoaudiólogo", quantitativo: 70, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Médico", quantitativo: 1969, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Médico Veterinário", quantitativo: 15, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Nutricionista", quantitativo: 120, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Odontólogo", quantitativo: 120, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Pedagogo", quantitativo: 5, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Profissional de Educação Física", quantitativo: 10, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Psicólogo", quantitativo: 100, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Químico", quantitativo: 15, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Sanitarista", quantitativo: 50, nivelInicial: 13, nivelFinal: 16 },
  { nome: "Terapeuta Ocupacional", quantitativo: 70, nivelInicial: 13, nivelFinal: 16 },
];

/**
 * Função para obter nível inicial e final de um cargo
 */
export function getCargoNiveis(cargoNome: string): { nivelInicial: number; nivelFinal: number } | null {
  const cargo = CARGOS.find(c => c.nome === cargoNome);
  if (!cargo) return null;
  return {
    nivelInicial: cargo.nivelInicial,
    nivelFinal: cargo.nivelFinal,
  };
}

/**
 * Função para obter lista de cargos ordenada alfabeticamente
 */
export function getCargosList(): string[] {
  return CARGOS.map(c => c.nome).sort();
}
