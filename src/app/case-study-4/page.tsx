import FlexibleComparisonTable, {
  type FlexiblePlan,
  type FlexibleRow,
} from '@/components/case-study/flexible-comparison-table';

const plans: FlexiblePlan[] = [
  { name: 'Big Payroll PEO Current Estimate' },
  { name: 'Big Payroll PEO Renewal Current Medical' },
  { name: 'Big Payroll PEO Alternative Medical' },
  { name: 'Alternative Options' },
];

const rows: FlexibleRow[] = [
  {
    label: 'EPLI Policy',
    values: ['N/A', 'N/A', 'N/A', 'N/A'],
  },
  {
    label: 'Medical',
    values: ['$118,308.00', '$136,141.68', '$103,164.72', '$77,952.12'],
  },
  {
    label: 'Workers Comp Estimate (0.03)',
    values: ['$786.00', '$786.00', '$786.00', '$786.00'],
  },
  {
    label: 'Total Insurance Cost',
    values: ['$119,094.00', '$136,927.68', '$103,950.72', '$78,738.12'],
    kind: 'subtotal',
  },
  {
    label: 'Service Fees',
    values: ['Current Estimate', 'Current Estimate', 'Current Estimate', 'Current Estimate'],
    kind: 'section',
  },
  {
    label: 'Administrative Service Fees',
    values: ['$12,576.00', '$12,576.00', '$12,576.00', '$7,476.00'],
  },
  {
    label: 'Payroll Service Fees',
    values: ['Included', 'Included', 'Included', 'Included'],
  },
  {
    label: 'Total Service Fee Cost',
    values: ['$12,576.00', '$12,576.00', '$12,576.00', '$7,476.00'],
    kind: 'subtotal',
  },
  {
    label: 'Services',
    values: ['Current Estimate', 'Current Estimate', 'Current Estimate', 'Current Estimate'],
    kind: 'section',
  },
  {
    label: 'One Time Implementation Fee',
    values: ['N/A', 'N/A', 'N/A', 'N/A'],
  },
  {
    label: 'Total Cost',
    values: ['$131,670.00', '$149,503.68', '$116,526.72', '$86,214.12'],
    kind: 'total',
  },
  {
    label: 'Difference',
    values: ['', '$17,833.68', '$15,143.28', '$45,455.88'],
    kind: 'outcome',
    tones: ['default', 'negative', 'positive', 'positive'],
  },
];

export default function CaseStudyFour() {
  return (
    <FlexibleComparisonTable
      plans={plans}
      services={[]}
      rows={rows}
      filename="insurance-comparison-case-study-4.png"
      columnLabel="Insurance"
    />
  );
}
