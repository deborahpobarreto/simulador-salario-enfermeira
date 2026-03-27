/**
 * Gerador de PDF com relatório de simulação salarial
 * Usando html2pdf.js
 */

import type { SalaryCalculatorInput } from "@/hooks/useSalaryCalculator";
import type { SalaryCalculatorOutput } from "@/hooks/useSalaryCalculator";
import type { TaxDetails } from "./taxCalculator";

/**
 * Interface com dados completos para o relatório
 */
export interface ReportData {
  input: SalaryCalculatorInput;
  salary: SalaryCalculatorOutput;
  taxes: TaxDetails;
  generatedAt: Date;
}

/**
 * Gera HTML para o relatório
 */
export function generateReportHTML(data: ReportData): string {
  const { input, salary, taxes } = data;
  const date = new Date(data.generatedAt).toLocaleDateString("pt-BR");
  const time = new Date(data.generatedAt).toLocaleTimeString("pt-BR");

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Relatório de Simulação Salarial</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          line-height: 1.6;
          background: #f5f5f5;
        }
        
        .container {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          padding: 40px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .header {
          border-bottom: 3px solid #0066cc;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        
        .header h1 {
          color: #0066cc;
          font-size: 28px;
          margin-bottom: 5px;
        }
        
        .header p {
          color: #666;
          font-size: 12px;
        }
        
        .section {
          margin-bottom: 30px;
        }
        
        .section-title {
          background: #f0f0f0;
          color: #0066cc;
          padding: 12px 15px;
          font-weight: bold;
          font-size: 14px;
          border-left: 4px solid #0066cc;
          margin-bottom: 15px;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .info-item {
          padding: 15px;
          background: #f9f9f9;
          border-radius: 5px;
          border-left: 3px solid #0066cc;
        }
        
        .info-label {
          color: #666;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        
        .info-value {
          color: #0066cc;
          font-size: 18px;
          font-weight: bold;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        
        th {
          background: #0066cc;
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: bold;
          font-size: 12px;
        }
        
        td {
          padding: 10px 12px;
          border-bottom: 1px solid #eee;
        }
        
        tr:nth-child(even) {
          background: #f9f9f9;
        }
        
        .value-right {
          text-align: right;
          font-weight: bold;
        }
        
        .highlight {
          background: #fff3cd;
          padding: 15px;
          border-radius: 5px;
          border-left: 4px solid #ffc107;
          margin-bottom: 20px;
        }
        
        .highlight-green {
          background: #d4edda;
          border-left-color: #28a745;
        }
        
        .highlight-red {
          background: #f8d7da;
          border-left-color: #dc3545;
        }
        
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          font-size: 11px;
          color: #999;
          text-align: center;
        }
        
        .break {
          page-break-after: always;
        }
        
        @media print {
          body {
            background: white;
          }
          .container {
            box-shadow: none;
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📊 Relatório de Simulação Salarial</h1>
          <p>Simulador de Salário - Carreira de Enfermagem</p>
          <p>Gerado em ${date} às ${time}</p>
        </div>
        
        <!-- Seção 1: Identificação -->
        <div class="section">
          <div class="section-title">1. IDENTIFICAÇÃO DO CARGO</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Nível</div>
              <div class="info-value">${input.level}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Referência (Letra)</div>
              <div class="info-value">${input.letter}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Tempo de Serviço Anterior</div>
              <div class="info-value">${input.yearsOfPreviousService} anos</div>
            </div>
            <div class="info-item">
              <div class="info-label">Tempo na Posição Atual</div>
              <div class="info-value">${input.yearsOfService} anos</div>
            </div>
          </div>
        </div>
        
        <!-- Seção 2: Componentes do Salário -->
        <div class="section">
          <div class="section-title">2. COMPONENTES DO SALÁRIO BRUTO</div>
          <table>
            <thead>
              <tr>
                <th>Componente</th>
                <th class="value-right">Valor (R$)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vencimento Básico</td>
                <td class="value-right">${salary.basicSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
              </tr>
              <tr>
                <td>Gratificação de Desempenho (${(salary.details.performanceBonusPercentage * 100).toFixed(0)}%)</td>
                <td class="value-right">${salary.performanceBonus.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
              </tr>
              ${salary.postGraduationBonus > 0 ? `
              <tr>
                <td>Adicional de Pós-Graduação (${(salary.details.postGraduationPercentage * 100).toFixed(0)}%)</td>
                <td class="value-right">${salary.postGraduationBonus.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
              </tr>
              ` : ''}
              ${salary.triennialBonus > 0 ? `
              <tr>
                <td>Adicional Trienal (${(salary.details.triennialPercentage * 100).toFixed(0)}% - ${salary.details.triennialYears} triênios)</td>
                <td class="value-right">${salary.triennialBonus.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
              </tr>
              ` : ''}
              ${salary.nighttimeAdditional > 0 ? `
              <tr>
                <td>Adicional Noturno (${input.nighttimeHours}h)</td>
                <td class="value-right">${salary.nighttimeAdditional.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
              </tr>
              ` : ''}
              ${salary.plantaoTotal > 0 ? `
              <tr>
                <td>Hora-Plantão (${input.plantaoHours}h)</td>
                <td class="value-right">${salary.plantaoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
              </tr>
              ` : ''}
              ${salary.sobreavisoTotal > 0 ? `
              <tr>
                <td>Sobreaviso (${input.sobreaviso.hours}h - ${input.sobreaviso.convoked ? '100%' : '50%'})</td>
                <td class="value-right">${salary.sobreavisoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
              </tr>
              ` : ''}
              ${salary.foodAllowance > 0 ? `
              <tr>
                <td>Auxílio Alimentação</td>
                <td class="value-right">${salary.foodAllowance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
              </tr>
              ` : ''}
              ${salary.salaryFamily > 0 ? `
              <tr>
                <td>Salário-Família (${input.dependents} dependente${input.dependents > 1 ? 's' : ''})</td>
                <td class="value-right">${salary.salaryFamily.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
              </tr>
              ` : ''}
              <tr style="background: #e8f4f8; font-weight: bold;">
                <td>SALÁRIO BRUTO MENSAL</td>
                <td class="value-right">R$ ${salary.monthlyGrossSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Seção 3: Descontos -->
        <div class="section">
          <div class="section-title">3. DESCONTOS E SALÁRIO LÍQUIDO</div>
          <table>
            <thead>
              <tr>
                <th>Desconto</th>
                <th class="value-right">Valor (R$)</th>
                <th class="value-right">% do Bruto</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>INSS (11%)</td>
                <td class="value-right">R$ ${taxes.inss.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                <td class="value-right">${((taxes.inss / taxes.grossSalary) * 100).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>IRRF</td>
                <td class="value-right">R$ ${taxes.irrf.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                <td class="value-right">${((taxes.irrf / taxes.grossSalary) * 100).toFixed(2)}%</td>
              </tr>
              <tr style="background: #f8d7da; font-weight: bold;">
                <td>TOTAL DE DESCONTOS</td>
                <td class="value-right">R$ ${taxes.totalDeductions.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                <td class="value-right">${taxes.effectiveTaxRate.toFixed(2)}%</td>
              </tr>
              <tr style="background: #d4edda; font-weight: bold; font-size: 16px;">
                <td>SALÁRIO LÍQUIDO</td>
                <td class="value-right">R$ ${taxes.netSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                <td class="value-right">${((taxes.netSalary / taxes.grossSalary) * 100).toFixed(2)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Seção 4: Resumo Anual -->
        <div class="section">
          <div class="section-title">4. RESUMO ANUAL</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Salário Bruto Anual</div>
              <div class="info-value">R$ ${salary.annualGrossSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Descontos Anuais</div>
              <div class="info-value">R$ ${(taxes.totalDeductions * 12).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Salário Líquido Anual</div>
              <div class="info-value">R$ ${(taxes.netSalary * 12).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Férias com 1/3</div>
              <div class="info-value">R$ ${salary.vacationWithThirds.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
            </div>
          </div>
        </div>
        
        <!-- Rodapé -->
        <div class="footer">
          <p>Relatório gerado automaticamente pelo Simulador de Salário - Carreira de Enfermagem</p>
          <p>Baseado na Lei Complementar 323/2006 e Lei 19.313/2025</p>
          <p>Alíquotas de impostos referentes a 2025</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Baixa o relatório em PDF
 * Usa html2pdf para converter HTML para PDF
 */
export async function downloadReportPDF(data: ReportData): Promise<void> {
  try {
    // Dinâmico import para evitar problemas de bundling
    const html2pdf = (await import("html2pdf.js")).default;

    const html = generateReportHTML(data);
    const element = document.createElement("div");
    element.innerHTML = html;

    const options: Record<string, unknown> = {
      margin: 10,
      filename: `simulacao-salario-${new Date().toISOString().split("T")[0]}.pdf`,
      image: { type: "png", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
    };

    await html2pdf().set(options).from(element).save();
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    throw new Error("Falha ao gerar PDF. Verifique o console para mais detalhes.");
  }
}
