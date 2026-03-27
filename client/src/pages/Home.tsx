import { SalarySimulator } from "@/components/SalarySimulator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, BookOpen, Calculator } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-50">
        <div className="container py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Simulador de Salário - Enfermagem
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Lei 19.313/2025 - Progressão de Carreira
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Tabs defaultValue="simulator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="simulator" className="gap-2">
              <Calculator className="w-4 h-4" />
              Simulador
            </TabsTrigger>
            <TabsTrigger value="info" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Informações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="simulator" className="space-y-6">
            <SalarySimulator />
          </TabsContent>

          <TabsContent value="info" className="space-y-6">
            {/* Informações sobre as Tabelas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-500" />
                  Como Funciona o Simulador
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  Este simulador calcula o salário bruto de enfermeiras baseado na Lei 19.313/2025. O cálculo
                  considera todos os componentes de remuneração:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Vencimento Básico:</strong> Determinado pelo Nível (13-16) e Letra (A-J)
                  </li>
                  <li>
                    <strong>Pós-Graduação:</strong> Adicional fixo (não cumulativo) de 13%, 16% ou 19%
                  </li>
                  <li>
                    <strong>Insalubridade:</strong> Adicional fixo conforme grau e tipo de setor
                  </li>
                  <li>
                    <strong>Triênios:</strong> 3% a cada 3 anos de serviço, até o limite de 36%
                  </li>
                  <li>
                    <strong>Variáveis:</strong> Plantões e sobreaviso conforme horas trabalhadas
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Tabela 1: Vencimento Básico */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tabela 1: Vencimento Básico</CardTitle>
                <CardDescription>
                  Salário base por Nível e Letra (Lei 19.313/2025)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-800">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold">Letra</th>
                        <th className="px-3 py-2 text-right font-semibold">Nível 13</th>
                        <th className="px-3 py-2 text-right font-semibold">Nível 14</th>
                        <th className="px-3 py-2 text-right font-semibold">Nível 15</th>
                        <th className="px-3 py-2 text-right font-semibold">Nível 16</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {[
                        ["A", "R$ 2.573,06", "R$ 3.136,55", "R$ 3.823,44", "R$ 4.660,75"],
                        ["B", "R$ 2.624,53", "R$ 3.199,29", "R$ 3.899,92", "R$ 4.753,98"],
                        ["C", "R$ 2.677,03", "R$ 3.263,27", "R$ 3.977,91", "R$ 4.849,05"],
                        ["D", "R$ 2.730,57", "R$ 3.328,53", "R$ 4.057,48", "R$ 4.946,02"],
                        ["E", "R$ 2.785,18", "R$ 3.395,09", "R$ 4.138,60", "R$ 5.044,96"],
                        ["F", "R$ 2.840,88", "R$ 3.463,00", "R$ 4.221,41", "R$ 5.145,85"],
                        ["G", "R$ 2.897,69", "R$ 3.532,26", "R$ 4.305,82", "R$ 5.248,75"],
                        ["H", "R$ 2.955,63", "R$ 3.602,93", "R$ 4.391,92", "R$ 5.353,73"],
                        ["I", "R$ 3.014,77", "R$ 3.675,00", "R$ 4.479,77", "R$ 5.460,82"],
                        ["J", "R$ 3.075,06", "R$ 3.748,47", "R$ 4.569,37", "R$ 5.570,00"],
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                          <td className="px-3 py-2 font-semibold">{row[0]}</td>
                          <td className="px-3 py-2 text-right">{row[1]}</td>
                          <td className="px-3 py-2 text-right">{row[2]}</td>
                          <td className="px-3 py-2 text-right">{row[3]}</td>
                          <td className="px-3 py-2 text-right">{row[4]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Tabela 2: Pós-Graduação */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tabela 2: Adicional de Pós-Graduação</CardTitle>
                <CardDescription>
                  Valores fixos (não cumulativos), calculados sobre Nível 13, Letra A
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-800">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold">Titulação</th>
                        <th className="px-3 py-2 text-right font-semibold">Percentual</th>
                        <th className="px-3 py-2 text-right font-semibold">Valor Fixo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {[
                        ["Especialização", "13%", "R$ 334,50"],
                        ["Mestrado", "16%", "R$ 411,69"],
                        ["Doutorado", "19%", "R$ 488,88"],
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                          <td className="px-3 py-2">{row[0]}</td>
                          <td className="px-3 py-2 text-right">{row[1]}</td>
                          <td className="px-3 py-2 text-right font-semibold">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Tabela 3: Insalubridade */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tabela 3: Adicional de Insalubridade</CardTitle>
                <CardDescription>
                  Valores fixos, calculados sobre Nível 9, Letra A (R$ 1.929,78)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-800">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold">Grau</th>
                        <th className="px-3 py-2 text-right font-semibold">Setores Gerais</th>
                        <th className="px-3 py-2 text-right font-semibold">Específicos*</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {[
                        ["Mínimo", "R$ 231,57", "-"],
                        ["Médio", "R$ 328,06", "R$ 328,06"],
                        ["Máximo", "R$ 443,85", "R$ 501,74"],
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                          <td className="px-3 py-2">{row[0]}</td>
                          <td className="px-3 py-2 text-right">{row[1]}</td>
                          <td className="px-3 py-2 text-right">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  * Psiquiatria, Infectologia e setores específicos de outras unidades
                </p>
              </CardContent>
            </Card>

            {/* Tabela 4: Triênios */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tabela 4: Adicional Trienal</CardTitle>
                <CardDescription>
                  Percentual sobre o Vencimento Básico atual, máximo de 36%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-800">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold">Tempo de Serviço</th>
                        <th className="px-3 py-2 text-right font-semibold">Percentual</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {[
                        ["3 anos (1 Triênio)", "3%"],
                        ["6 anos (2 Triênios)", "6%"],
                        ["9 anos (3 Triênios)", "9%"],
                        ["12 anos (4 Triênios)", "12%"],
                        ["15 anos (5 Triênios)", "15%"],
                        ["36 anos (12 Triênios)", "36% (Máximo)"],
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                          <td className="px-3 py-2">{row[0]}</td>
                          <td className="px-3 py-2 text-right font-semibold">{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Exemplo Prático */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-lg">Exemplo Prático</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="font-semibold">Simulação: Daqui a 4 anos</p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Nível:</strong> 13 | <strong>Letra:</strong> C (progressão após 2 anos)
                  </li>
                  <li>
                    <strong>Vencimento Básico:</strong> R$ 2.677,03
                  </li>
                  <li>
                    <strong>Pós-Graduação:</strong> Especialização = R$ 334,50
                  </li>
                  <li>
                    <strong>Insalubridade:</strong> Média (Setores Gerais) = R$ 328,06
                  </li>
                  <li>
                    <strong>Triênios:</strong> 1 triênio (3%) = R$ 80,31
                  </li>
                </ul>
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded mt-4">
                  <p className="text-gray-600 dark:text-gray-400">Total Fixo Estimado</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">R$ 3.419,90</p>
                  <p className="text-xs text-gray-500 mt-2">+ eventuais plantões/sobreaviso</p>
                </div>
              </CardContent>
            </Card>

            {/* Notas Importantes */}
            <Card className="border-l-4 border-l-amber-500">
              <CardHeader>
                <CardTitle className="text-lg">Notas Importantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    ✓ <strong>Progressão Horizontal:</strong> A cada 2 anos, você progride de letra (A→B→C...)
                  </li>
                  <li>
                    ✓ <strong>Progressão Vertical:</strong> Ao cumprir horas de capacitação, você progride de nível
                    (13→14→15→16)
                  </li>
                  <li>
                    ✓ <strong>Triênios:</strong> Calculados sobre o vencimento básico atual, aumentam quando você
                    muda de letra/nível
                  </li>
                  <li>
                    ✓ <strong>Pós-Graduação:</strong> Não é cumulativa - você recebe apenas a maior titulação
                  </li>
                  <li>
                    ✓ <strong>Sobreaviso:</strong> Máximo 200 horas/mês; 100% se convocado, 50% se apenas em
                    prontidão
                  </li>
                  <li>
                    ✓ <strong>Insalubridade:</strong> Setores específicos (Psiquiatria/Infectologia) recebem
                    percentuais diferenciados
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-12">
        <div className="container py-6 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>
            Simulador baseado na <strong>Lei 19.313/2025</strong> - Referências salariais de Enfermeiras
          </p>
          <p className="mt-2 text-xs">
            Este simulador é uma ferramenta informativa. Para informações oficiais, consulte a legislação vigente.
          </p>
        </div>
      </footer>
    </div>
  );
}
