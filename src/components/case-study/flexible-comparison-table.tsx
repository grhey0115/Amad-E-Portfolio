'use client';

import { useState } from 'react';
import { Download, FileDown } from 'lucide-react';
import './comparison-table.css';

export type FlexiblePlan = { name: string };
export type ComparisonValueTone = 'positive' | 'negative' | 'default';
export type FlexibleRow = {
  label: string;
  values: string[];
  kind?: 'cost' | 'section' | 'subtotal' | 'total' | 'incentive' | 'outcome' | 'percentage' | 'implementation';
  tones?: ComparisonValueTone[];
};

function isSavingsLabel(label: string) {
  return /saving|difference|percentage|reduction|incentive/i.test(label);
}

type FlexibleComparisonTableProps = {
  plans: FlexiblePlan[];
  services: { label: string; values: string[] }[];
  financialHeading?: { label: string; values: string[] };
  rows: FlexibleRow[];
  filename: string;
  columnLabel?: string;
  showServiceHeading?: boolean;
};

export default function FlexibleComparisonTable({
  plans,
  services,
  financialHeading,
  rows,
  filename,
  columnLabel = 'Coverage & cost',
  showServiceHeading = true,
}: FlexibleComparisonTableProps) {
  const [isExporting, setIsExporting] = useState(false);
  const displayValue = (value: string) => value || '—';

  async function downloadPng() {
    setIsExporting(true);
    try {
      await document.fonts.ready;
      const scale = 2;
      const width = 2000;
      const padding = 50;
      const labelWidth = 650;
      const planWidth = (width - padding * 2 - labelWidth) / plans.length;
      const canvasRows = [
        ...(services.length > 0
          ? [
              ...(showServiceHeading
                ? [{ kind: 'group', label: 'Service coverage', values: [] as string[], tones: [] as ComparisonValueTone[], height: 46 }]
                : []),
              ...services.map((service) => ({ kind: 'service', ...service, tones: [] as ComparisonValueTone[], height: 54 })),
            ]
          : []),
        ...(financialHeading
          ? [{ kind: 'roi', ...financialHeading, tones: [] as ComparisonValueTone[], height: 68 }]
          : []),
        ...rows.map((row) => ({ ...row, kind: row.kind ?? 'cost', tones: row.tones ?? [], height: row.kind === 'total' ? 68 : 58 })),
      ];
      const headerHeight = 150;
      const planHeaderHeight = 92;
      const height = headerHeight + planHeaderHeight + canvasRows.reduce((sum, row) => sum + row.height, 0) + padding;
      const canvas = document.createElement('canvas');
      canvas.width = width * scale;
      canvas.height = height * scale;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas is not available');
      context.scale(scale, scale);
      context.textBaseline = 'middle';
      context.fillStyle = '#f8f9fb';
      context.fillRect(0, 0, width, height);

      const wrap = (text: string, maxWidth: number) => {
        if (!text) return [''];
        const words = text.split(' ');
        const lines: string[] = [];
        let line = '';
        words.forEach((word) => {
          const test = line ? `${line} ${word}` : word;
          if (context.measureText(test).width > maxWidth && line) {
            lines.push(line);
            line = word;
          } else {
            line = test;
          }
        });
        lines.push(line);
        return lines;
      };

      const drawText = (
        text: string,
        x: number,
        y: number,
        cellWidth: number,
        cellHeight: number,
        options: { color?: string; size?: number; weight?: number; align?: CanvasTextAlign } = {},
      ) => {
        const { color = '#202744', size = 18, weight = 600, align = 'left' } = options;
        context.font = `${weight} ${size}px Montserrat, sans-serif`;
        context.fillStyle = color;
        context.textAlign = align;
        const inset = 18;
        const textX = align === 'left' ? x + inset : align === 'right' ? x + cellWidth - inset : x + cellWidth / 2;
        const lines = wrap(text, cellWidth - inset * 2);
        const lineHeight = size * 1.25;
        const startY = y + cellHeight / 2 - ((lines.length - 1) * lineHeight) / 2;
        lines.forEach((line, index) => context.fillText(line, textX, startY + index * lineHeight));
      };

      context.fillStyle = '#4fafa1';
      context.font = '700 14px Montserrat, sans-serif';
      context.textAlign = 'left';
      context.fillText('BENEFITS & COST REVIEW', padding, 45);
      context.fillStyle = '#202744';
      context.font = '700 42px Montserrat, sans-serif';
      context.fillText('PEO plan comparison', padding, 92);
      context.fillStyle = '#667085';
      context.font = '400 17px Montserrat, sans-serif';
      context.textAlign = 'right';
      context.fillText(`Service coverage and return on investment across ${plans.length} options.`, width - padding, 92);

      let y = headerHeight;
      context.fillStyle = '#4fafa1';
      context.fillRect(padding, y, labelWidth - 7, planHeaderHeight);
      drawText(columnLabel.toUpperCase(), padding, y, labelWidth - 7, planHeaderHeight, { color: '#173845', size: 16, weight: 700 });
      plans.forEach((plan, index) => {
        const x = padding + labelWidth + index * planWidth;
        context.fillStyle = '#58a7dc';
        context.fillRect(x, y, planWidth - 7, planHeaderHeight);
        drawText(plan.name, x, y, planWidth - 7, planHeaderHeight, { color: '#fff', size: 16, weight: 700, align: 'center' });
      });
      y += planHeaderHeight;

      canvasRows.forEach((row) => {
        if (row.kind === 'group') {
          context.fillStyle = '#dff2ef';
          context.fillRect(padding, y + 8, width - padding * 2 - 7, row.height - 8);
          drawText(row.label, padding, y + 8, width - padding * 2, row.height - 8, { color: '#285f84', size: 15, weight: 700 });
          y += row.height;
          return;
        }

        const isHeading = row.kind === 'roi' || row.kind === 'section';
        const isTotal = row.kind === 'total';
        const isSubtotal = row.kind === 'subtotal';
        const labelBackground = isHeading ? '#58a7dc' : isTotal ? '#dcebf6' : isSubtotal ? '#edf5f8' : '#eef1f5';
        const valueBackground = isHeading ? '#58a7dc' : isTotal ? '#e4f0f8' : isSubtotal ? '#f1f7f9' : '#fff';
        context.fillStyle = labelBackground;
        context.fillRect(padding, y, labelWidth - 7, row.height - 1);
        drawText(row.label, padding, y, labelWidth - 7, row.height, {
          color: isHeading ? '#fff' : isTotal || row.kind === 'outcome' ? '#285f84' : '#303955',
          size: isTotal ? 20 : 17,
          weight: isHeading || isTotal || isSubtotal || row.kind === 'outcome' ? 700 : 600,
        });

        row.values.forEach((value, index) => {
          const x = padding + labelWidth + index * planWidth;
          const tone = row.tones[index] ?? 'default';
          context.fillStyle = valueBackground;
          context.fillRect(x, y, planWidth - 7, row.height - 1);
          drawText(value, x, y, planWidth - 7, row.height, {
            color: isHeading ? '#fff' : tone === 'negative' ? '#c62e37' : tone === 'positive' ? '#287d70' : isTotal ? '#285f84' : '#202744',
            size: isTotal ? 20 : row.kind === 'outcome' || row.kind === 'incentive' ? 18 : 17,
            weight: 700,
            align: 'center',
          });
        });
        y += row.height;
      });

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((result) => result ? resolve(result) : reject(new Error('PNG export failed')), 'image/png');
      });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = filename;
      link.href = downloadUrl;
      link.click();
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Unable to export comparison PNG:', error);
      window.alert('The PNG could not be generated. Please try Save as PDF instead.');
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <main className="comparison-page">
      <div className="comparison-toolbar">
        <div><strong>PEO comparison</strong><span>Export-ready client view</span></div>
        <div className="toolbar-actions">
          <button type="button" onClick={() => window.print()}><FileDown aria-hidden="true" /> Save as PDF</button>
          <button type="button" onClick={downloadPng} disabled={isExporting}>
            <Download aria-hidden="true" /> {isExporting ? 'Preparing…' : 'Download PNG'}
          </button>
        </div>
      </div>

      <div className="comparison-scroll">
        <div className="comparison-sheet flexible-sheet">
          <header className="sheet-header">
            <div><p>Benefits & cost review</p><h1>PEO plan comparison</h1></div>
            <p>Service coverage and return on investment across {plans.length} options.</p>
          </header>
          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col">{columnLabel}</th>
                {plans.map((plan, index) => <th scope="col" key={`${plan.name}-${index}`}>{plan.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {services.length > 0 && (
                <>
                  {showServiceHeading && (
                    <tr className="group-row"><th scope="row" colSpan={plans.length + 1}>Service coverage</th></tr>
                  )}
                  {services.map((service) => (
                    <tr key={service.label}>
                      <th scope="row">{service.label}</th>
                      {service.values.map((value, index) => (
                        <td className={value === 'Included' ? 'included' : ''} key={`${service.label}-${index}`}>{displayValue(value)}</td>
                      ))}
                    </tr>
                  ))}
                </>
              )}
              {financialHeading && (
                <tr className="group-row roi-heading">
                  <th scope="row">{financialHeading.label}</th>
                  {financialHeading.values.map((value, index) => <td key={`${value}-${index}`}>{displayValue(value)}</td>)}
                </tr>
              )}
              {rows.map((row, rowIndex) => (
                <tr className={`flex-row ${row.kind ?? 'cost'}-row ${isSavingsLabel(row.label) ? 'savings-row' : ''}`} key={`${row.label}-${rowIndex}`}>
                  <th scope="row">{row.label}</th>
                  {row.values.map((value, index) => (
                    <td
                      className={[
                        value === 'Included' ? 'included' : '',
                        row.tones?.[index] && row.tones[index] !== 'default' ? row.tones[index] : '',
                      ].filter(Boolean).join(' ')}
                      key={`${row.label}-${index}`}
                    >
                      {displayValue(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
