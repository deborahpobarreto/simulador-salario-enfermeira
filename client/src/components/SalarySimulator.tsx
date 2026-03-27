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
  SALARY_TABLE,
  PERFORMANCE_PERIODS,
  calculateInitialLetter,
} from "@/../../shared/salaryData";
import { useSalaryCalculator, type SalaryCalculatorInput } from "@/hooks/useSalaryCalculator";
import { Trash2, Plus } from "lucide-react";
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
    postGraduation: "none",
    nighttimeHours: 0,
    plantaoHours: 0,
    plantaoHourlyRate: 50,
    sobreaviso: {
      hours: 0,
      hourlyRate: 50,
      convoked: true,
    },
    insalubrity: "none",
    functionGratification: "none",
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
  const careerProjection = useMemo(() => {
    const projection: any[] = [];
    let currentLevel = input.level;
    let currentLetter = input.letter;
    let totalYears = yearsOfPreviousService;

    for (let year = 0; year <= 10; year++) {
      projection.push({
        year,
        level: currentLevel,
        letter: currentLetter,
        description: year === 0 ? "Inicio" : "",
      });

      if (year < 10) {
        totalYears += 1;
        if (totalYears > 0 && totalYears % 2 === 0) {
          const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
          const currentIndex = letters.indexOf(currentLetter);
          if (currentIndex < 9) {
            currentLetter = letters[currentIndex + 1];
            projection[projection.length - 1].description = "Progressao Horizontal";
          }
        }
      }
    }

    return projection;
  }, [input.level, input.letter, yearsOfPreviousService]);

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
          <TabsTrigger value="info">Informações</TabsTrigger>
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
                  A cada 2 anos de serviço anterior, você sobe uma letra automaticamente (Art. 8º)
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
              <CardDescription>Lei 19.313/2025 - Tabela de Vencimentos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="level">Nível (13-16)</Label>
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
              <CardDescription>Lei 15.984/2013, alterada por Lei 19.313/2025</CardDescription>
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
                  {(salary.details.performanceBonusPercentage * 100).toFixed(0)}% do Vencimento Básico
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  R$ {salary.performanceBonus.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Seção 3: Pós-Graduação */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">3. Adicional de Pós-Graduação</CardTitle>
              <CardDescription>Lei Complementar 323/2006, Art. 14 - Não Cumulativo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="postGraduation">Qualificação Profissional</Label>
                <Select
                  value={input.postGraduation}
                  onValueChange={(value) =>
                    setInput({
                      ...input,
                      postGraduation: value as "none" | "specialization" | "masters" | "doctorate",
                    })
                  }
                >
                  <SelectTrigger id="postGraduation">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhuma</SelectItem>
                    <SelectItem value="specialization">Especialização (13%)</SelectItem>
                    <SelectItem value="masters">Mestrado (16%)</SelectItem>
                    <SelectItem value="doctorate">Doutorado (19%)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Não cumulativo: apenas um tipo de pós-graduação por vez
                </p>
              </div>

              {salary.postGraduationBonus > 0 && (
                <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {(salary.details.postGraduationPercentage * 100).toFixed(0)}% do Vencimento Básico
                  </p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    R$ {salary.postGraduationBonus.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seção 4: Adicional Trienal */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">4. Adicional Trienal</CardTitle>
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
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Inclui tempo anterior (Art. 33). Máximo 36% (12 triênios)
                </p>
              </div>

              {salary.triennialBonus > 0 && (
                <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {(salary.details.triennialPercentage * 100).toFixed(0)}% de bônus ({salary.details.triennialYears} triênios)
                  </p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    R$ {salary.triennialBonus.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seção 5: Insalubridade */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">5. Insalubridade</CardTitle>
              <CardDescription>Lei Complementar 323/2006, Art. 12 - Valor fixo sobre Nível 9, Letra A</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="insalubrity">Tipo de Insalubridade</Label>
                <Select
                  value={input.insalubrity}
                  onValueChange={(value) => setInput({ ...input, insalubrity: value })}
                >
                  <SelectTrigger id="insalubrity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sem Insalubridade</SelectItem>
                    <SelectItem value="general_minimum">Geral - Mínimo (12%)</SelectItem>
                    <SelectItem value="general_medium">Geral - Médio (17%)</SelectItem>
                    <SelectItem value="general_maximum">Geral - Máximo (23%)</SelectItem>
                    <SelectItem value="specific_minimum">Específicos - Mínimo (17%)</SelectItem>
                    <SelectItem value="specific_medium">Específicos - Médio (26%)</SelectItem>
                    <SelectItem value="specific_maximum">Específicos - Máximo (34%)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Setores Específicos: Psiquiatria, Infectologia, etc.
                </p>
              </div>

              {salary.insalubrity > 0 && (
                <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Insalubridade</p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    R$ {salary.insalubrity.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seção 6: Adicional Noturno */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">6. Adicional Noturno</CardTitle>
              <CardDescription>Lei Complementar 323/2006, Art. 11 - 25% sobre horas 22h-06h</CardDescription>
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

          {/* Seção 6: Hora-Plantão e Sobreaviso */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">6. Hora-Plantão e Sobreaviso</CardTitle>
              <CardDescription>Lei Complementar 323/2006, Art. 16 e 17</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hora-Plantão */}
              <div className="space-y-4 pb-6 border-b">
                <h4 className="font-semibold text-sm">Hora-Plantão (Art. 16)</h4>
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
                <h4 className="font-semibold text-sm">Sobreaviso (Art. 17)</h4>
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

          {/* Seção 7: Auxílios */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">7. Auxílios</CardTitle>
              <CardDescription>Lei Complementar 323/2006, Art. 18 e 19</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="foodAllowance">Auxílio Alimentação (Art. 18) - R$</Label>
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
                  <Label htmlFor="dependents">Dependentes (Salário-Família Art. 19)</Label>
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
                  {salary.postGraduationBonus > 0 && (
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Pós-Grad</p>
                      <p className="font-semibold">
                        R$ {salary.postGraduationBonus.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  )}
                  {salary.triennialBonus > 0 && (
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Triênio</p>
                      <p className="font-semibold">
                        R$ {salary.triennialBonus.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
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
                    Férias com 1/3 (Art. 21): R$ {salary.vacationWithThirds.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>

                {/* Seção de Descontos e Salário Líquido */}
                <div className="border-t-2 border-gray-200 dark:border-gray-800 pt-6 mt-6">
                  <h3 className="text-lg font-semibold mb-4">Descontos e Salário Líquido</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">INSS (11%)</p>
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                        R$ {salary.inss.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">IRRF (Progressivo)</p>
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                        R$ {salary.irrf.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Total de Descontos:</span>
                      <span className="font-bold">R$ {salary.totalDeductions.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Alíquota Efetiva:</span>
                      <span>{salary.effectiveTaxRate.toFixed(2)}%</span>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Salário Líquido (Mensal)</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      R$ {salary.netSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
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
                Progressão Horizontal (Letra): A cada 2 anos | Progressão Vertical (Nível): Com 120h de capacitação
                <br />
                <span className="text-xs text-gray-500">Lei Complementar 323/2006, Art. 8º e 9º | Lei 19.313/2025</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Resumo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Nível Atual</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{input.level}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Letra Atual</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{input.letter}</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Tempo Total</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {yearsOfPreviousService + input.yearsOfService} anos
                  </p>
                </div>
              </div>

              {/* Tabela de Projeção */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b-2 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="text-left py-3 px-3 font-semibold">Ano</th>
                      <th className="text-left py-3 px-3 font-semibold">Nível</th>
                      <th className="text-left py-3 px-3 font-semibold">Letra</th>
                      <th className="text-left py-3 px-3 font-semibold">Tempo Total</th>
                      <th className="text-left py-3 px-3 font-semibold">Vencimento Básico</th>
                      <th className="text-left py-3 px-3 font-semibold">Evento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {careerProjection.map((proj: any, idx: number) => {
                      const projSalary = SALARY_TABLE[proj.level.toString()]?.[proj.letter] || 0;
                      const isProgression = idx > 0 && proj.description.includes("Progressão");

                      return (
                        <tr
                          key={proj.year}
                          className={`border-b border-gray-200 dark:border-gray-800 ${
                            isProgression
                              ? "bg-green-50 dark:bg-green-950 hover:bg-green-100 dark:hover:bg-green-900"
                              : "hover:bg-gray-50 dark:hover:bg-gray-900"
                          }`}
                        >
                          <td className="py-3 px-3 font-semibold text-center">{proj.year}</td>
                          <td className="py-3 px-3 text-center font-bold text-blue-600 dark:text-blue-400">
                            {proj.level}
                          </td>
                          <td className="py-3 px-3 text-center font-bold text-lg text-green-600 dark:text-green-400">
                            {proj.letter}
                          </td>
                          <td className="py-3 px-3 text-center">{proj.totalYearsOfService} anos</td>
                          <td className="py-3 px-3 font-semibold text-right">
                            R$ {projSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 px-3">
                            {isProgression ? (
                              <span className="inline-block bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100 px-2 py-1 rounded text-xs font-semibold">
                                ↑ {proj.description}
                              </span>
                            ) : proj.year === 0 ? (
                              <span className="inline-block bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100 px-2 py-1 rounded text-xs font-semibold">
                                Início
                              </span>
                            ) : (
                              <span className="text-gray-500 text-xs">-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Legenda */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg space-y-2 text-sm">
                <h4 className="font-semibold">Legenda:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Progressão Horizontal (Letra):</strong> A cada 2 anos de serviço (Art. 8º)
                  </li>
                  <li>
                    <strong>Progressão Vertical (Nível):</strong> Requer 120 horas de capacitação (Art. 9º)
                  </li>
                  <li>
                    <strong>Vencimento Básico:</strong> Conforme Lei 19.313/2025
                  </li>
                </ul>
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
              <CardTitle>Variáveis do Simulador</CardTitle>
              <CardDescription>Lei Complementar 323/2006 e Lei 19.313/2025</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Seção 1: Identificação */}
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-600 dark:text-blue-400">1. Identificação do Cargo (Lei 19.313/2025)</h4>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded space-y-2 text-sm">
                  <p><strong>Nível:</strong> 13-16 para Enfermeiros</p>
                  <p><strong>Referência (Letra):</strong> A-J (Progressão Horizontal a cada 2 anos)</p>
                </div>
              </div>

              {/* Seção 2: Tempo de Serviço */}
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-600 dark:text-blue-400">2. Tempo de Serviço (Art. 33)</h4>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded space-y-2 text-sm">
                  <p><strong>Tempo Anterior:</strong> Serviço em outro órgão público (conta para progressão)</p>
                  <p><strong>Tempo na Posição Atual:</strong> Tempo no cargo atual</p>
                </div>
              </div>

              {/* Seção 3: Gratificação de Desempenho */}
              <div className="space-y-3">
                <h4 className="font-semibold text-green-600 dark:text-green-400">3. Gratificação de Desempenho (Lei 19.313/2025)</h4>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded space-y-2 text-sm">
                  <p><strong>Até 30/04/2025:</strong> 70% do vencimento básico</p>
                  <p><strong>01/05 a 30/11/2025:</strong> 80% (50% em maio, 50% em junho)</p>
                  <p><strong>A partir 01/12/2025:</strong> 90% (50% em dezembro, 50% em janeiro)</p>
                </div>
              </div>

              {/* Seção 4: Pós-Graduação */}
              <div className="space-y-3">
                <h4 className="font-semibold text-green-600 dark:text-green-400">4. Adicional de Pós-Graduação (Art. 14 - NÃO Cumulativo)</h4>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded space-y-2 text-sm">
                  <p><strong>Especialização:</strong> 13% do vencimento básico</p>
                  <p><strong>Mestrado:</strong> 16% do vencimento básico</p>
                  <p><strong>Doutorado:</strong> 19% do vencimento básico</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Apenas um tipo por vez</p>
                </div>
              </div>

              {/* Seção 5: Adicional Trienal */}
              <div className="space-y-3">
                <h4 className="font-semibold text-green-600 dark:text-green-400">5. Adicional Trienal (Art. 15)</h4>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded space-y-2 text-sm">
                  <p><strong>Cálculo:</strong> 3% a cada 3 anos de serviço</p>
                  <p><strong>Máximo:</strong> 36% (12 triênios)</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Inclui tempo anterior (Art. 33)</p>
                </div>
              </div>

              {/* Seção 6: Insalubridade */}
              <div className="space-y-3">
                <h4 className="font-semibold text-orange-600 dark:text-orange-400">6. Insalubridade (Art. 12)</h4>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded space-y-2 text-sm">
                  <p><strong>Base:</strong> Valor fixo sobre Nível 9, Letra A</p>
                  <p><strong>Setores Gerais:</strong> 12%, 17%, 23%</p>
                  <p><strong>Setores Específicos:</strong> 17%, 26%, 34% (Psiquiatria, Infectologia)</p>
                </div>
              </div>

              {/* Seção 7: Adicional Noturno */}
              <div className="space-y-3">
                <h4 className="font-semibold text-orange-600 dark:text-orange-400">7. Adicional Noturno (Art. 11)</h4>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded space-y-2 text-sm">
                  <p><strong>Percentual:</strong> 25% sobre valor da hora</p>
                  <p><strong>Horário:</strong> 22h às 06h</p>
                </div>
              </div>

              {/* Seção 8: Hora-Plantão */}
              <div className="space-y-3">
                <h4 className="font-semibold text-orange-600 dark:text-orange-400">8. Hora-Plantão (Art. 16)</h4>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded space-y-2 text-sm">
                  <p><strong>Definição:</strong> Período aguardando chamada no local de trabalho</p>
                  <p><strong>Valor:</strong> Customizável por hora</p>
                </div>
              </div>

              {/* Seção 9: Sobreaviso */}
              <div className="space-y-3">
                <h4 className="font-semibold text-orange-600 dark:text-orange-400">9. Sobreaviso (Art. 17)</h4>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded space-y-2 text-sm">
                  <p><strong>Se convocado:</strong> 100% do valor da hora</p>
                  <p><strong>Se não convocado:</strong> 50% do valor da hora</p>
                  <p><strong>Máximo:</strong> 200 horas/mês</p>
                </div>
              </div>

              {/* Seção 10: Auxílios */}
              <div className="space-y-3">
                <h4 className="font-semibold text-purple-600 dark:text-purple-400">10. Auxílios</h4>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded space-y-2 text-sm">
                  <p><strong>Auxílio Alimentação (Art. 18):</strong> Valor fixo mensal (indenizatório)</p>
                  <p><strong>Salário-Família (Art. 19):</strong> 5% do salário mínimo por dependente</p>
                </div>
              </div>

              {/* Seção 11: Férias e Licença */}
              <div className="space-y-3">
                <h4 className="font-semibold text-purple-600 dark:text-purple-400">11. Férias e Licença-Prêmio</h4>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded space-y-2 text-sm">
                  <p><strong>Férias (Art. 21):</strong> 30 dias + 1/3 do salário</p>
                  <p><strong>Licença-Prêmio (Art. 20):</strong> A cada 5 anos = 3 meses remunerados</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Licença-Prêmio NÃO conta para progressão</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
