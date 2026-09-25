'use client';

import { useState } from 'react';
import { Download, FileDown } from 'lucide-react';
import './case-study.css';

type Plan = {
  name: string;
  roiName: string;
  costs: string[];
  total: string;
  outcomes: string[];
  implementation: string;
};

const services = [
  'Payroll Processing',
  'Human Resources Consulting (Offer/Termination Letters, etc.)',
  'Employee Handbook/Legal Documents',
  'EPLI Policy',
  'PTO/Leave Tracking',
  'HRIS Platform',
];

const costLabels = [
  'Annual Medical Premiums -Base Plan',
  'Annual Medical Premiums - Miidle H SA',
  'Annual Medical Premiums - Hi Plan',
  'Esatimated SUTA',
  'Workers Comp',
  'Annual Administrative Service Fees (84 employees)',
];

const outcomeLabels = [
  'Difference off Current',
  'Difference off Renewal',
  'Maximum Workers Comp Safety Incentive',
  'Difference off Current',
  'Difference off Renewal',
];

const plans: Plan[] = [
  {
    name: 'Big Payroll PEO Expiring',
    roiName: 'ADP Expiring',
    costs: ['$127,104.00', '$118,320.00', '$92,652.00', '$41,040.00', '$291,953.00', ''],
    total: '$671,069.00',
    outcomes: ['', '', '', '', ''],
    implementation: '',
  },
  {
    name: 'Big Payroll PEO Renewal',
    roiName: 'ADP Expiring',
    costs: ['$158,461.44', '$147,530.88', '$116,966.40', '$41,040.00', '$291,953.42', ''],
    total: '$755,952.14',
    outcomes: ['($84,883.14)', '', '', '', ''],
    implementation: '',
  },
  {
    name: 'Trinet',
    roiName: 'Trinet',
    costs: ['$135,799.68', '$125,079.60', '$107,110.44', '$41,040.00', '$232,779.26', '$100,080.00'],
    total: '$741,888.98',
    outcomes: ['($70,819.98)', '$14,063.16', '$69,833.78', '($986.20)', '$83,896.94'],
    implementation: '$4,200.00',
  },
  {
    name: 'Co Advantage EPO 4',
    roiName: 'Coadvantage',
    costs: ['$116,386.56', '$99,020.88', '$89,277.72', '$35,910.00', '$199,783.48', '$90,720.00'],
    total: '$631,098.64',
    outcomes: ['$39,970.36', '$124,853.50', '$49,945.87', '$89,916.23', '$174,799.37'],
    implementation: 'Waived',
  },
  {
    name: 'Co Advantage EPO 3',
    roiName: 'Coadvantage',
    costs: ['$128,741.76', '$99,020.88', '$89,277.72', '$35,910.00', '$199,783.48', '$90,720.00'],
    total: '$643,453.84',
    outcomes: ['', '$112,498.30', '$49,945.87', '$77,561.03', '$162,444.17'],
    implementation: 'Waived',
  },
];

function valueTone(value: string) {
  if (value.startsWith('(')) return 'negative';
  if (value && !value.startsWith('$4,200')) return 'positive';
  return '';
}

function isSavingsLabel(label: string) {
  return /saving|difference|percentage|reduction|incentive/i.test(label);
}

export default function CaseStudyComparison() {
  const [isExporting, setIsExporting] = useState(false);
  const displayValue = (value: string) => value || '—';

  async function downloadPng() {
    setIsExporting(true);

    try {
      await document.fonts.ready;

      const scale = 2;
      const width = 1800;
      const padding = 50;
      const labelWidth = 560;
      const planWidth = (width - padding * 2 - labelWidth) / plans.length;
      const rows = [
        { kind: 'group', label: 'Service coverage', values: [] as string[], height: 46 },
        ...services.map((label) => ({ kind: 'service', label, values: plans.map(() => 'Included'), height: 54 })),
        { kind: 'roi', label: 'Return on Investment', values: plans.map((plan) => plan.roiName), height: 60 },
        ...costLabels.map((label, index) => ({ kind: 'cost', label, values: plans.map((plan) => plan.costs[index]), height: 56 })),
        { kind: 'total', label: 'Total', values: plans.map((plan) => plan.total), height: 68 },
        ...outcomeLabels.map((label, index) => ({ kind: 'outcome', label, values: plans.map((plan) => plan.outcomes[index]), height: 60 })),
        { kind: 'implementation', label: 'One-Time Implementation Fee', values: plans.map((plan) => plan.implementation), height: 60 },
      ];
      const headerHeight = 150;
      const planHeaderHeight = 84;
      const height = headerHeight + planHeaderHeight + rows.reduce((sum, row) => sum + row.height, 0) + padding;
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
      context.fillText('Service coverage and return on investment across five options.', width - padding, 92);

      let y = headerHeight;
      context.fillStyle = '#4fafa1';
      context.fillRect(padding, y, labelWidth - 7, planHeaderHeight);
      drawText('COVERAGE & COST', padding, y, labelWidth - 7, planHeaderHeight, { color: '#173845', size: 16, weight: 700 });
      plans.forEach((plan, index) => {
        const x = padding + labelWidth + index * planWidth;
        context.fillStyle = '#58a7dc';
        context.fillRect(x, y, planWidth - 7, planHeaderHeight);
        drawText(plan.name, x, y, planWidth - 7, planHeaderHeight, { color: '#ffffff', size: 17, weight: 700, align: 'center' });
      });
      y += planHeaderHeight;

      rows.forEach((row) => {
        if (row.kind === 'group') {
          context.fillStyle = '#dff2ef';
          context.fillRect(padding, y + 8, width - padding * 2 - 7, row.height - 8);
          drawText(row.label, padding, y + 8, width - padding * 2, row.height - 8, { color: '#285f84', size: 15, weight: 700 });
          y += row.height;
          return;
        }

        const isRoi = row.kind === 'roi';
        const isTotal = row.kind === 'total';
        const labelBackground = isRoi ? '#58a7dc' : isTotal ? '#dcebf6' : '#eef1f5';
        const valueBackground = isRoi ? '#58a7dc' : isTotal ? '#e4f0f8' : '#ffffff';
        context.fillStyle = labelBackground;
        context.fillRect(padding, y, labelWidth - 7, row.height - 1);
        drawText(row.label, padding, y, labelWidth - 7, row.height, {
          color: isRoi ? '#ffffff' : isTotal || row.kind === 'outcome' ? '#285f84' : '#303955',
          size: isTotal ? 20 : 17,
          weight: isRoi || isTotal || row.kind === 'outcome' ? 700 : 600,
        });

        row.values.forEach((value, index) => {
          const x = padding + labelWidth + index * planWidth;
          context.fillStyle = valueBackground;
          context.fillRect(x, y, planWidth - 7, row.height - 1);
          const negative = value.startsWith('(');
          drawText(value, x, y, planWidth - 7, row.height, {
            color: isRoi ? '#ffffff' : negative ? '#c62e37' : row.kind === 'outcome' ? '#287d70' : isTotal ? '#285f84' : '#202744',
            size: isTotal ? 20 : row.kind === 'outcome' ? 18 : 17,
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
      link.download = 'peo-benefits-comparison.png';
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
        <div>
          <strong>PEO comparison</strong>
          <span>Export-ready client view</span>
        </div>
        <div className="toolbar-actions">
          <button type="button" onClick={() => window.print()}>
            <FileDown aria-hidden="true" /> Save as PDF
          </button>
          <button type="button" onClick={downloadPng} disabled={isExporting}>
            <Download aria-hidden="true" /> {isExporting ? 'Preparing…' : 'Download PNG'}
          </button>
        </div>
      </div>

      <div className="comparison-scroll">
        <div className="comparison-sheet">
          <header className="sheet-header">
            <div>
              <p>Benefits & cost review</p>
              <h1>PEO plan comparison</h1>
            </div>
            <p>Service coverage and return on investment across five options.</p>
          </header>

          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col">Coverage & cost</th>
                {plans.map((plan) => <th scope="col" key={plan.name}>{plan.name}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr className="group-row">
                <th scope="row" colSpan={6}>Service coverage</th>
              </tr>
              {services.map((service) => (
                <tr key={service}>
                  <th scope="row">{service}</th>
                  {plans.map((plan) => <td className="included" key={plan.name}>Included</td>)}
                </tr>
              ))}
              <tr className="group-row roi-heading">
                <th scope="row">Return on Investment</th>
                {plans.map((plan) => <td key={plan.name}>{plan.roiName}</td>)}
              </tr>
              {costLabels.map((label, index) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                {plans.map((plan) => <td key={plan.name}>{displayValue(plan.costs[index])}</td>)}
                </tr>
              ))}
              <tr className="total-row">
                <th scope="row">Total</th>
                {plans.map((plan) => <td key={plan.name}>{displayValue(plan.total)}</td>)}
              </tr>
              {outcomeLabels.map((label, index) => (
                <tr className={`outcome-row ${isSavingsLabel(label) ? 'savings-row' : ''}`} key={`${label}-${index}`}>
                  <th scope="row">{label}</th>
                  {plans.map((plan) => (
                    <td className={valueTone(plan.outcomes[index])} key={plan.name}>
                      {displayValue(plan.outcomes[index])}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="implementation-row">
                <th scope="row">One-Time Implementation Fee</th>
                {plans.map((plan) => <td key={plan.name}>{displayValue(plan.implementation)}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
