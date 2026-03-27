import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SALARY_LETTERS,
  SALARY_LEVELS,
  PERFORMANCE_PERIODS,
  calculateInitialLetter,
  projectCareer,
} from "@/../../shared/salaryData";
import { useSalaryCalculator, type SalaryCalculatorInput } from "@/hooks/useSalaryCalculator";
import { Trash2, Plus, BookOpen } from "lucide-react";
import { toast } from "sonner";

interface SimulationHistory {
  id: string;
  timestamp: Date;
  input: SalaryCalculatorInput;
  monthlyGrossSalary: number;
}

export function SalarySimulator() {
  const [yearsOfPreviousService, setYearsOfPreviousService] = useState(0);
  const [input, setInput] = useState<SalaryCalculatorInput>({
    level: 13,
    letter: "A",
    yearsOfPreviousService: 0,
    yearsOfService: 0,
    performancePeriod: "after_december_2025",
    nighttimeHours: 0,
    plantaoHours: 0,
    plantaoHourlyRate: 50,
    sobreaviso: {
      hours: 0,
      hourlyRate: 50,
      convoked: true,
    },
    foodAllowance: 550,
    dependents: 0,
  });

  const [history, setHistory] = useState<SimulationHistory[]>([]);
  const salary = useSalaryCalculator(input);

  // Calcular letra inicial baseada em tempo anterior
  const calculatedInitialLetter = useMemo(
    () => calculateInitialLetter(yearsOfPreviousService),
    [yearsOfPreviousService]
  );

  // Atualizar letra quando tempo anterior muda
  const handlePreviousServiceChange = (years: number) => {
    setYearsOfPreviousService(years);
    const newLetter = calculateInitialLetter(years);
    setInput({ ...input, yearsOfPreviousService: years, letter: newLetter });
  };

  // Projeção de carreira
  const careerProjection = useMemo(
    () => projectCareer(input.level, input.letter, yearsOfPreviousService, 10),
    [input.level, input.letter, yearsOfPreviousService]
  );

  const handleAddSimulation = () => {
    const newSimulation: SimulationHistory = {
      id: Date.now().toString(),
      timestamp: new Date(),
      input: { ...input },
      monthlyGrossSalary: salary.monthlyGrossSalary,
    };
    setHistory([newSimulation, ...history]);
    toast.success("Simulação adicionada ao histórico!");
  };

  const handleRemoveFromHistory = (id: string) => {
    setHistory(history.filter((item) => item.id !== id));
    toast.success("Simulação removida do histórico");
  };

  const handleClearHistory = () => {
    setHistory([]);
    toast.success("Histórico limpo");
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="simulator" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="simulator">Simulador</TabsTrigger>
          <TabsTrigger value="carreira">Carreira</TabsTrigger>
          <TabsTrigger value="history">Histórico ({history.length})</TabsTrigger>
          <TabsTrigger value="info" className="gap-1">
            <BookOpen className="w-4 h-4" />
            Info
          </TabsTrigger>
        </TabsList>

        <TabsContent value="simulator" className="space-y-6">
          {/* Seção 0: Tempo de Serviço Anterior */}
          <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
            <CardHeader>
              <CardTitle className="text-lg">Tempo de Serviço Anterior</CardTitle>
              <CardDescription>Lei Complementar 323/2006, Art. 33 - Aproveitamento de Tempo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="previousService">
                  Anos como Servidor Público Anterior (em outro órgão/entidade)
                </Label>
                <Input
                  id="previousService"
                  type="number"
                  min="0"
                  max="50"
                  value={yearsOfPreviousService}
                  onChange={(e) => handlePreviousServiceChange(parseFloat(e.target.value) || 0)}
                  placeholder="Digite o número de anos"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  A cada 2 anos de serviço anterior, você sobe uma letra automaticamente
                </p>
              </div>

              {yearsOfPreviousService > 0 && (
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Letra Inicial Calculada</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {calculatedInitialLetter}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    {Math.floor(yearsOfPreviousService / 2)} progressões de letra ({yearsOfPreviousService} anos ÷ 2)
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seção 1: Identificação do Cargo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">1. Identificação do Cargo</CardTitle>
              <CardDescription>Conforme Lei Complementar 323/2006 e Lei 19.313/2025</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="level">Nível (1-16)</Label>
                  <Select
                    value={input.level.toString()}
                    onValueChange={(value) =>
                      setInput({ ...input, level: parseInt(value) })
                    }
                  >
                    <SelectTrigger id="level">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(SALARY_LEVELS).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="letter">Referência (Letra A-J)</Label>
                  <Select value={input.letter} onValueChange={(value) => setInput({ ...input, letter: value })}>
                    <SelectTrigger id="letter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(SALARY_LETTERS).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Vencimento Básico (Lei 19.313/2025)</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  R$ {salary.basicSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Seção 2: Gratificação de Desempenho */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">2. Gratificação de Desempenho em Saúde</CardTitle>
              <CardDescription>Lei 15.984/2013, alterada pela Lei 19.313/2025</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="performancePeriod">Período de Cálculo</Label>
                <Select
                  value={input.performancePeriod}
                  onValueChange={(value) =>
                    setInput({
                      ...input,
                      performancePeriod: value as "before_may_2025" | "may_to_december_2025" | "after_december_2025",
                    })
                  }
                >
                  <SelectTrigger id="performancePeriod">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PERFORMANCE_PERIODS).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {salary.details.performanceBonusPercentage}% do Vencimento Básico
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  R$ {salary.performanceBonus.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Seção 3: Adicional Trienal */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">3. Adicional Trienal</CardTitle>
              <CardDescription>Lei Complementar 323/2006, Art. 15 - 3% a cada 3 anos (máx 36%)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="yearsOfService">Anos de Serviço na Posição Atual</Label>
                <Input
                  id="yearsOfService"
                  type="number"
                  min="0"
                  max="50"
                  value={input.yearsOfService}
                  onChange={(e) => setInput({ ...input, yearsOfService: parseFloat(e.target.value) || 0 })}
                  placeholder="Digite o número de anos"
                />
              </div>

              {input.yearsOfService > 0 && (
                <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {salary.details.triennialPercentage}% de bônus ({Math.floor(input.yearsOfService / 3)} triênios)
                  </p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    R$ {salary.triennialBonus.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seção 4: Adicional Noturno */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">4. Adicional Noturno</CardTitle>
              <CardDescription>Lei Complementar 323/2006, Art. 16 - 25% sobre horas 22h-06h</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nighttimeHours">Horas Noturnas (22h-06h) por Mês</Label>
                <Input
                  id="nighttimeHours"
                  type="number"
                  min="0"
                  value={input.nighttimeHours}
                  onChange={(e) => setInput({ ...input, nighttimeHours: parseFloat(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>

              {input.nighttimeHours > 0 && (
                <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">25% sobre horas noturnas</p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    R$ {salary.nighttimeAdditional.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seção 5: Variáveis Extras */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">5. Variáveis Extras</CardTitle>
              <CardDescription>Hora-Plantão e Sobreaviso conforme Lei 323/2006</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hora-Plantão */}
              <div className="space-y-4 pb-6 border-b">
                <h4 className="font-semibold text-sm">Hora-Plantão</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plantaoHours">Horas de Plantão</Label>
                    <Input
                      id="plantaoHours"
                      type="number"
                      min="0"
                      value={input.plantaoHours}
                      onChange={(e) => setInput({ ...input, plantaoHours: parseFloat(e.target.value) || 0 })}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plantaoRate">Valor/Hora (R$)</Label>
                    <Input
                      id="plantaoRate"
                      type="number"
                      min="0"
                      step="0.01"
                      value={input.plantaoHourlyRate}
                      onChange={(e) => setInput({ ...input, plantaoHourlyRate: parseFloat(e.target.value) || 0 })}
                      placeholder="50.00"
                    />
                  </div>
                </div>
                {input.plantaoHours > 0 && (
                  <div className="bg-indigo-50 dark:bg-indigo-950 p-3 rounded">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total de Hora-Plantão</p>
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      R$ {salary.plantaoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                )}
              </div>

              {/* Sobreaviso */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm">Sobreaviso</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sobreavisoHours">Horas de Sobreaviso</Label>
                    <Input
                      id="sobreavisoHours"
                      type="number"
                      min="0"
                      max="200"
                      value={input.sobreaviso.hours}
                      onChange={(e) =>
                        setInput({
                          ...input,
                          sobreaviso: { ...input.sobreaviso, hours: parseFloat(e.target.value) || 0 },
                        })
                      }
                      placeholder="0"
                    />
                    <p className="text-xs text-gray-500">Máximo 200 horas/mês</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sobreavisoRate">Valor/Hora (R$)</Label>
                    <Input
                      id="sobreavisoRate"
                      type="number"
                      min="0"
                      step="0.01"
                      value={input.sobreaviso.hourlyRate}
                      onChange={(e) =>
                        setInput({
                          ...input,
                          sobreaviso: { ...input.sobreaviso, hourlyRate: parseFloat(e.target.value) || 0 },
                        })
                      }
                      placeholder="50.00"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={input.sobreaviso.convoked}
                      onChange={(e) =>
                        setInput({
                          ...input,
                          sobreaviso: { ...input.sobreaviso, convoked: e.target.checked },
                        })
                      }
                      className="rounded"
                    />
                    <span className="text-sm">
                      Convocado (100%) {!input.sobreaviso.convoked && "- Não convocado (50%)"}
                    </span>
                  </Label>
                </div>

                {input.sobreaviso.hours > 0 && (
                  <div className="bg-cyan-50 dark:bg-cyan-950 p-3 rounded">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total de Sobreaviso ({input.sobreaviso.convoked ? "100%" : "50%"})
                    </p>
                    <p className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
                      R$ {salary.sobreavisoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Seção 6: Auxílios */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">6. Auxílios</CardTitle>
              <CardDescription>Auxílio Alimentação e Salário-Família conforme Lei 323/2006</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="foodAllowance">Auxílio Alimentação (R$)</Label>
                  <Input
                    id="foodAllowance"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.foodAllowance}
                    onChange={(e) => setInput({ ...input, foodAllowance: parseFloat(e.target.value) || 0 })}
                    placeholder="550.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dependents">Dependentes (Salário-Família)</Label>
                  <Input
                    id="dependents"
                    type="number"
                    min="0"
                    value={input.dependents}
                    onChange={(e) => setInput({ ...input, dependents: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
              </div>

              {input.foodAllowance > 0 && (
                <div className="bg-amber-50 dark:bg-amber-950 p-3 rounded">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Auxílio Alimentação</p>
                  <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
                    R$ {salary.foodAllowance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              )}

              {input.dependents > 0 && (
                <div className="bg-rose-50 dark:bg-rose-950 p-3 rounded">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Salário-Família ({input.dependents} dependente{input.dependents > 1 ? "s" : ""})
                  </p>
                  <p className="text-xl font-bold text-rose-600 dark:text-rose-400">
                    R$ {salary.salaryFamily.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resultado Final */}
          <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950">
            <CardHeader>
              <CardTitle className="text-lg">Salário Bruto Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Vencimento</p>
                    <p className="font-semibold">
                      R$ {salary.basicSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Desempenho</p>
                    <p className="font-semibold">
                      R$ {salary.performanceBonus.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  {salary.triennialBonus > 0 && (
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Triênio</p>
                      <p className="font-semibold">
                        R$ {salary.triennialBonus.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  )}
                  {salary.nighttimeAdditional > 0 && (
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Noturno</p>
                      <p className="font-semibold">
                        R$ {salary.nighttimeAdditional.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t-2 border-green-200 dark:border-green-800 pt-4">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Salário Bruto Mensal</p>
                  <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                    R$ {salary.monthlyGrossSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Anual: R$ {salary.annualGrossSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Férias com 1/3: R$ {salary.vacationWithThirds.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>

                <Button onClick={handleAddSimulation} className="w-full gap-2" size="lg">
                  <Plus className="w-4 h-4" />
                  Adicionar ao Histórico
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Carreira - Projeção */}
        <TabsContent value="carreira" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Projeção de Carreira (10 Anos)</CardTitle>
              <CardDescription>
                Progressão Horizontal (letra a cada 2 anos) e Vertical (nível a cada 5 anos com 120h capacitação)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b-2 border-gray-300 dark:border-gray-700">
                    <tr>
                      <th className="text-left py-2 px-3">Ano</th>
                      <th className="text-left py-2 px-3">Nível</th>
                      <th className="text-left py-2 px-3">Letra</th>
                      <th className="text-left py-2 px-3">Total de Serviço</th>
                      <th className="text-left py-2 px-3">Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    {careerProjection.map((proj) => (
                      <tr
                        key={proj.year}
                        className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                      >
                        <td className="py-2 px-3 font-semibold">{proj.year}</td>
                        <td className="py-2 px-3">{proj.level}</td>
                        <td className="py-2 px-3 font-bold text-blue-600 dark:text-blue-400">{proj.letter}</td>
                        <td className="py-2 px-3">{proj.totalYearsOfService} anos</td>
                        <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{proj.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Histórico */}
        <TabsContent value="history" className="space-y-4">
          {history.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500 py-8">Nenhuma simulação no histórico ainda</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <Button variant="outline" onClick={handleClearHistory} className="w-full">
                Limpar Histórico
              </Button>
              <div className="space-y-3">
                {history.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 space-y-2">
                          <p className="text-sm text-gray-500">
                            {item.timestamp.toLocaleString("pt-BR")}
                          </p>
                          <p className="text-sm">
                            <span className="font-semibold">Nível {item.input.level}</span> - Referência{" "}
                            <span className="font-semibold">{item.input.letter}</span> •{" "}
                            <span className="font-semibold">{item.input.yearsOfService}</span> anos na posição
                          </p>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            R$ {item.monthlyGrossSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFromHistory(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>

        {/* Informações */}
        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aproveitamento de Tempo de Serviço Anterior</CardTitle>
              <CardDescription>Lei Complementar 323/2006, Art. 33</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">✓ É Real!</h4>
                <p>
                  Sim, sua amiga está correta! O tempo que você trabalhou como servidora pública antes conta para progressão automática de letra.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Como Funciona:</h4>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    <strong>Progressão Horizontal (Letra):</strong> A cada 2 anos de serviço, você sobe uma letra (A→B→C→...→J)
                  </li>
                  <li>
                    <strong>Tempo Anterior Contado:</strong> Todo o tempo que você trabalhou como servidor público antes entra nessa contagem
                  </li>
                  <li>
                    <strong>Automático:</strong> Você não precisa fazer nada, o tempo é aproveitado automaticamente
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">Exemplo Prático:</h4>
                <p>
                  Se você trabalhou <strong>6 anos</strong> como servidora pública antes de entrar como Enfermeira:
                </p>
                <ul className="space-y-1 list-disc list-inside text-xs">
                  <li>6 anos ÷ 2 = 3 progressões de letra</li>
                  <li>Você entra como Enfermeira Nível 13 na <strong>letra D</strong> (não na letra A)</li>
                  <li>Depois de 2 anos na função, sobe para letra E</li>
                  <li>E assim por diante...</li>
                </ul>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">O Tempo Anterior Conta Para:</h4>
                <ul className="space-y-1 list-disc list-inside text-xs">
                  <li>Progressão horizontal (mudança de letra) ✓</li>
                  <li>Progressão vertical (mudança de nível com 120h capacitação) ✓</li>
                  <li>Concessão de licença-prêmio ✓</li>
                  <li>Aposentadoria ✓</li>
                  <li>Outros direitos previstos em lei ✓</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progressão de Carreira</CardTitle>
              <CardDescription>Lei Complementar 323/2006</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="space-y-3">
                <h4 className="font-semibold">Progressão Horizontal (Letra)</h4>
                <p>
                  <strong>Frequência:</strong> A cada 2 anos de serviço<br />
                  <strong>Sequência:</strong> A → B → C → D → E → F → G → H → I → J<br />
                  <strong>Automática:</strong> Não requer capacitação adicional
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Progressão Vertical (Nível)</h4>
                <p>
                  <strong>Requisito:</strong> 120 horas de capacitação profissional<br />
                  <strong>Frequência:</strong> Conforme disponibilidade de vagas e capacitação<br />
                  <strong>Seleção:</strong> Mediante avaliação de desempenho
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">Importante:</h4>
                <p>
                  A progressão vertical (mudança de nível) requer 120 horas de capacitação profissional. Você pode fazer cursos, especialização, mestrado, etc. para cumprir esse requisito.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Adicionais e Benefícios</CardTitle>
              <CardDescription>Lei Complementar 323/2006 e Lei 19.313/2025</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold">Gratificação de Desempenho em Saúde</h4>
                <p>
                  <strong>Lei 15.984/2013, alterada por Lei 19.313/2025</strong><br />
                  • 80% do vencimento (a partir de 1º maio 2025)<br />
                  • 90% do vencimento (a partir de 1º dezembro 2025)
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Adicional Noturno</h4>
                <p>
                  <strong>25% sobre o valor da hora</strong> trabalhada entre 22h e 06h
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Adicional Trienal</h4>
                <p>
                  <strong>3% sobre o vencimento básico</strong> a cada 3 anos de serviço, até máximo de 36%
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Auxílios</h4>
                <p>
                  • Auxílio Alimentação: valor fixo mensal<br />
                  • Salário-Família: 5% do salário mínimo por dependente<br />
                  • Auxílio Transporte: conforme legislação
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Licença-Prêmio</h4>
                <p>
                  <strong>A cada 5 anos:</strong> 3 meses de licença remunerada (não conversível em dinheiro)
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Férias</h4>
                <p>
                  <strong>30 dias anuais</strong> + acréscimo de 1/3 do salário durante as férias
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Legislação Aplicável</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <strong>Lei Complementar nº 323/2006:</strong> Estabelece a estrutura de carreira de enfermagem
              </p>
              <p>
                <strong>Lei nº 19.313/2025:</strong> Atualiza a tabela de vencimentos (16 níveis)
              </p>
              <p>
                <strong>Lei nº 15.984/2013:</strong> Institui a Gratificação de Desempenho em Saúde
              </p>
              <p>
                <strong>Lei nº 18.371/2022:</strong> Altera a gratificação para 70% (depois 80% e 90%)
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
