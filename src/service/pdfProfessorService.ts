import * as FileSystem from 'expo-file-system/legacy';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

import type { ReportMode, ReportPeriod, ReportSummary } from '@/types/professor';

interface ExportReportOptions {
  summary: ReportSummary;
  mode: ReportMode;
  period: ReportPeriod;
  selectedStudent?: {
    name: string;
    participation: number;
    completed: number;
    pending: number;
    average: string;
  };
}

function buildReportHtml({ summary, mode, period, selectedStudent }: ExportReportOptions): string {
  const isClassMode = mode === 'class';
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <style>
        @page { size: A4; margin: 20mm; }
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1f2937; margin: 0; padding: 0; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #10b981; padding-bottom: 12px; margin-bottom: 20px; }
        .title { font-size: 22px; font-weight: bold; color: #065f46; margin: 0; }
        .subtitle { font-size: 12px; color: #6b7280; margin-top: 4px; }
        .badge { background-color: #ecfdf5; color: #047857; font-weight: bold; padding: 4px 10px; border-radius: 12px; font-size: 12px; }
        .metrics-grid { display: flex; gap: 12px; margin-bottom: 24px; }
        .metric-card { flex: 1; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; text-align: center; }
        .metric-value { font-size: 20px; font-weight: bold; color: #111827; margin-top: 4px; }
        .metric-label { font-size: 11px; color: #6b7280; text-transform: uppercase; font-weight: 600; }
        .section-title { font-size: 15px; font-weight: bold; color: #111827; margin-bottom: 10px; border-left: 4px solid #10b981; padding-left: 8px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 12px; }
        th { background-color: #f3f4f6; color: #374151; font-weight: bold; text-align: left; padding: 8px 12px; border-bottom: 1px solid #d1d5db; }
        td { padding: 8px 12px; border-bottom: 1px solid #e5e7eb; }
        tr:nth-child(even) { background-color: #f9fafb; }
        .footer { margin-top: 40px; font-size: 10px; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1 class="title">${isClassMode ? 'Relatório Geral da Turma' : `Relatório Individual: ${selectedStudent?.name}`}</h1>
          <p class="subtitle">Período de Análise: Últimos ${period} dias | Emitido em ${currentDate}</p>
        </div>
        <span class="badge">${isClassMode ? 'Visão da Turma' : 'Individual'}</span>
      </div>

      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-label">Participação</div>
          <div class="metric-value">${isClassMode ? summary.participation : `${selectedStudent?.participation}%`}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Concluídas</div>
          <div class="metric-value">${isClassMode ? summary.completedActivities : selectedStudent?.completed}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Pendentes</div>
          <div class="metric-value">${isClassMode ? summary.pendingActivities : selectedStudent?.pending}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Média Geral</div>
          <div class="metric-value">${isClassMode ? summary.average : selectedStudent?.average}</div>
        </div>
      </div>

      ${
        isClassMode
          ? `
            <div class="section-title">Participação por Turma</div>
            <table>
              <thead>
                <tr>
                  <th>Turma</th>
                  <th>Taxa de Engajamento</th>
                </tr>
              </thead>
              <tbody>
                ${summary.classParticipation
                  .map(
                    (item) => `
                  <tr>
                    <td><strong>${item.label}</strong></td>
                    <td>${item.value}%</td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>

            <div class="section-title">Alunos que Precisam de Atenção</div>
            <table>
              <thead>
                <tr>
                  <th>Aluno</th>
                  <th>Participação</th>
                  <th>Nível de Risco</th>
                </tr>
              </thead>
              <tbody>
                ${summary.attentionStudents
                  .map(
                    (student) => `
                  <tr>
                    <td>${student.name}</td>
                    <td>${student.participation}%</td>
                    <td><strong style="color: ${student.tone === 'danger' ? '#ef4444' : '#f59e0b'};">${student.tone === 'danger' ? 'Crítico' : 'Atenção'}</strong></td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          `
          : `
            <div class="section-title">Resumo do Aluno</div>
            <table>
              <thead>
                <tr>
                  <th>Métrica</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Nome Completo</td><td><strong>${selectedStudent?.name}</strong></td></tr>
                <tr><td>Média de Notas</td><td>${selectedStudent?.average} / 10,0</td></tr>
                <tr><td>Taxa de Entrega</td><td>${selectedStudent?.participation}%</td></tr>
                <tr><td>Missões Concluídas</td><td>${selectedStudent?.completed}</td></tr>
                <tr><td>Missões Pendentes</td><td>${selectedStudent?.pending}</td></tr>
              </tbody>
            </table>
          `
      }

      <div class="footer">
        Relatório gerado automaticamente pelo Sistema de Gestão Educacional.
      </div>
    </body>
    </html>
  `;
}

export async function generateAndSharePdfReport(options: ExportReportOptions) {
  console.log('=== [PDF DEBUG 1] Iniciando processo de geração ===');
  
  try {
    console.log('[PDF DEBUG 2] Gerando HTML...');
    const htmlContent = buildReportHtml(options);

    console.log('[PDF DEBUG 3] Chamando Print.printToFileAsync (base64: true)...');
    const printResult = await Print.printToFileAsync({
      html: htmlContent,
      base64: true,
    });

    console.log('[PDF DEBUG 4] Resultado da gravação do Print:', {
      uri: printResult.uri,
      hasBase64: !!printResult.base64,
      base64Length: printResult.base64 ? printResult.base64.length : 0,
    });

    if (!printResult.base64) {
      throw new Error('O Expo Print não retornou a string Base64 do PDF.');
    }

    const filename = `Relatorio_${options.mode}_${Date.now()}.pdf`;
    const targetUri = `${FileSystem.cacheDirectory}${filename}`;

    console.log('[PDF DEBUG 5] Escrevendo Base64 diretamente em:', targetUri);
    await FileSystem.writeAsStringAsync(targetUri, printResult.base64, {
      encoding: 'base64',
    });

    console.log('[PDF DEBUG 6] Verificando existência do arquivo criado...');
    const fileInfo = await FileSystem.getInfoAsync(targetUri);
    console.log('[PDF DEBUG 7] Info do arquivo final:', fileInfo);

    if (!fileInfo.exists) {
      throw new Error('Arquivo de PDF não foi encontrado no cache após a escrita.');
    }

    console.log('[PDF DEBUG 8] Verificando disponibilidade do ExpoSharing...');
    const isSharingAvailable = await Sharing.isAvailableAsync();
    console.log('[PDF DEBUG 9] Sharing disponível?', isSharingAvailable);

    if (isSharingAvailable) {
      console.log('[PDF DEBUG 10] Disparando Sharing.shareAsync com targetUri:', targetUri);
      await Sharing.shareAsync(targetUri, {
        UTI: '.pdf',
        mimeType: 'application/pdf',
        dialogTitle: 'Exportar Relatório PDF',
      });
      console.log('[PDF DEBUG 11] Compartilhamento concluído com sucesso.');
    } else {
      Alert.alert('Sucesso', 'PDF gerado com sucesso!');
    }
  } catch (error: any) {
    console.error('=== [PDF DEBUG ERRO CRÍTICO] ===');
    console.error('Mensagem de erro:', error?.message);
    console.error('Stack trace completo:', error);
    Alert.alert('Erro no PDF', `Falha: ${error?.message || 'Erro desconhecido'}`);
  }
}