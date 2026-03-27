import { useState } from "react";
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
  INSALUBRITY_LEVELS,
  INSALUBRITY_SECTORS,
  POSTGRAD_TYPES,
  SALARY_LETTERS,
  SALARY_LEVELS,
} from "@/../../shared/salaryData";
import { useSalaryCalculator, useCareerProjection, type SalaryCalculatorInput } from "@/hooks/useSalaryCalculator";
import { Trash2, Plus, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface SimulationHistory {
  id: string;
  timestamp: Date;
  input: SalaryCalculatorInput;
  monthlyGrossSalary: number;
}

export function SalarySimulator() {
  const [input, setInput] = useState<SalaryCalculatorInput>({
    level: 13,
    letter: "A",
    postgrad: "especialization",
    insalubrity: "medium",
    sector: "general",
    yearsOfService: 0,
    plantaoHours: 0,
    plantaoHourlyRate: 50,
    sobreaviso: {
      hours: 0,
      hourlyRate: 50,
      convoked: true,
    },
    nighttimeHours: 0,
    nighttimeExtraHours: 0,
    foodAllowance: 550,
    dependents: 0,
  });

  const [history, setHistory] = useState<SimulationHistory[]>([]);
  const salary = useSalaryCalculator(input);

  const careerProjection = useCareerProjection({
    startingLevel: input.level,
    startingLetter: input.letter,
    postgrad: input.postgrad,
    insalubrity: input.insalubrity,
    sector: input.sector,
    yearsToProject: 10,
    plantaoHours: input.plantaoHours,
    plantaoHourlyRate: input.plantaoHourlyRate,
    nighttimeHours: input.nighttimeHours,
    foodAllowance: input.foodAllowance,
    dependents: input.dependents,
  });

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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="simulator">Simulador</TabsTrigger>
          <TabsTrigger value="projection" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Carreira (10 anos)
          </TabsTrigger>
          <TabsTrigger value="history">Histórico ({history.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="simulator" className="space-y-6">
          {/* Seção 1: Vencimento Básico */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">1. Vencimento Básico</CardTitle>
              <CardDescription>Escolha seu nível e letra de progressão</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="level">Nível</Label>
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
                  <Label htmlFor="letter">Letra (Progressão Horizontal)</Label>
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Vencimento Básico</p>
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
              <CardDescription>70% do vencimento básico (Lei 18.371/2022)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">70% do Vencimento</p>
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
              <CardDescription>Selecione sua titulação (não cumulativo)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="postgrad">Titulação</Label>
                <Select value={input.postgrad} onValueChange={(value) => setInput({ ...input, postgrad: value })}>
                  <SelectTrigger id="postgrad">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(POSTGRAD_TYPES).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {input.postgrad !== "none" && (
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {salary.details.postgradPercentage}% de bônus
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    R$ {salary.postgradBonus.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seção 4: Insalubridade */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">4. Adicional de Insalubridade</CardTitle>
              <CardDescription>Grau de insalubridade e tipo de setor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insalubrity">Grau de Insalubridade</Label>
                  <Select
                    value={input.insalubrity}
                    onValueChange={(value) => setInput({ ...input, insalubrity: value })}
                  >
                    <SelectTrigger id="insalubrity">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(INSALUBRITY_LEVELS).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sector">Tipo de Setor</Label>
                  <Select
                    value={input.sector}
                    onValueChange={(value) =>
                      setInput({ ...input, sector: value as "general" | "specific" })
                    }
                  >
                    <SelectTrigger id="sector">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(INSALUBRITY_SECTORS).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {input.insalubrity !== "none" && (
                <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Adicional de Insalubridade</p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    R$ {salary.insalubrity.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seção 5: Triênios */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">5. Adicional Trienal</CardTitle>
              <CardDescription>3% a cada 3 anos de serviço (máximo 36%)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="yearsOfService">Anos de Serviço</Label>
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

          {/* Seção 6: Adicionais Noturnos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">6. Adicional Noturno</CardTitle>
              <CardDescription>25% sobre horas trabalhadas entre 22h e 06h</CardDescription>
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

          {/* Seção 7: Variáveis Extras */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">7. Variáveis Extras</CardTitle>
              <CardDescription>Plantões, sobreaviso e auxílios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Plantões */}
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total de Plantões</p>
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      R$ {salary.plantaoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                )}
              </div>

              {/* Sobreaviso */}
              <div className="space-y-4 pb-6 border-b">
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

              {/* Auxílios */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm">Auxílios</h4>
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
                    <Label htmlFor="dependents">Dependentes (para Salário-Família)</Label>
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">Salário-Família ({input.dependents} dependente{input.dependents > 1 ? "s" : ""})</p>
                    <p className="text-xl font-bold text-rose-600 dark:text-rose-400">
                      R$ {salary.salaryFamily.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                )}
              </div>
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
                  {salary.postgradBonus > 0 && (
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Pós-Grad</p>
                      <p className="font-semibold">
                        R$ {salary.postgradBonus.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  )}
                  {salary.insalubrity > 0 && (
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Insalubridade</p>
                      <p className="font-semibold">
                        R$ {salary.insalubrity.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
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

        {/* Projeção de Carreira */}
        <TabsContent value="projection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Projeção de Carreira - 10 Anos</CardTitle>
              <CardDescription>
                Alternância automática entre progressão horizontal (letra) e vertical (nível)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-800">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">Ano</th>
                      <th className="px-3 py-2 text-left font-semibold">Nível-Letra</th>
                      <th className="px-3 py-2 text-left font-semibold">Tipo</th>
                      <th className="px-3 py-2 text-right font-semibold">Mensal</th>
                      <th className="px-3 py-2 text-right font-semibold">Anual</th>
                      <th className="px-3 py-2 text-right font-semibold">Férias (1/3)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {careerProjection.map((year) => (
                      <tr key={year.year} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                        <td className="px-3 py-2 font-semibold">{year.year}</td>
                        <td className="px-3 py-2">
                          <span className="font-semibold">{year.level}-{year.letter}</span>
                        </td>
                        <td className="px-3 py-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            year.progressionType === "horizontal" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200" :
                            year.progressionType === "vertical" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200" :
                            "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          }`}>
                            {year.progressionType === "horizontal" ? "Letra" : year.progressionType === "vertical" ? "Nível" : "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-right">
                          R$ {year.monthlyGrossSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-3 py-2 text-right">
                          R$ {year.annualGrossSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-3 py-2 text-right">
                          R$ {year.vacationWithThirds.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
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
                            <span className="font-semibold">Nível {item.input.level}</span> - Letra{" "}
                            <span className="font-semibold">{item.input.letter}</span> •{" "}
                            <span className="font-semibold">{item.input.yearsOfService}</span> anos de serviço
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
      </Tabs>
    </div>
  );
}
