import FlexibleComparisonTable, {
  type FlexiblePlan,
  type FlexibleRow,
} from '@/components/case-study/flexible-comparison-table';

const plans: FlexiblePlan[] = [
  { name: 'Original Program' },
  { name: 'PEO Option' },
];

const services = [
  { label: 'Payroll Processing', values: ['TBD', 'Included'] },
  { label: 'Human Resources Consulting (Offer/Termination Letters, etc.)', values: ['Not Included', 'Included'] },
  { label: 'Employee Handbook/Legal Documents', values: ['Not Included', 'Included'] },
  { label: 'EPLI Policy', values: ['Not Included', 'TBD'] },
  { label: 'PTO/Leave Tracking', values: ['Not Included', 'Included'] },
  { label: 'HRIS Platform', values: ['Not Included', 'Included'] },
];

const rows: FlexibleRow[] = [
  {
    label: 'Annual Medical Premiums - HealthFirst',
    values: ['$365,508.00', '$268,558.08'],
  },
  {
    label: 'Annual Medical Premiums - Oxford',
    values: ['$167,815.44', '$109,139.52'],
  },
  {
    label: 'Annual Medical Premiums - Aetna',
    values: ['$200,414.16', '$121,453.20'],
  },
  {
    label: 'Annual Administrative Service Fees',
    values: ['', '$89,640.00'],
  },
  {
    label: 'Total',
    values: ['$733,737.60', '$588,790.80'],
    kind: 'total',
  },
  {
    label: 'All-In Company Savings',
    values: ['', '$144,946.80'],
    kind: 'outcome',
    tones: ['default', 'positive'],
  },
];

export default function CaseStudyFive() {
  return (
    <FlexibleComparisonTable
      plans={plans}
      services={services}
      financialHeading={{
        label: 'Costs',
        values: plans.map((plan) => plan.name),
      }}
      rows={rows}
      filename="elevator-company-comparison-case-study-5.png"
      columnLabel="Service Detail"
      showServiceHeading={false}
    />
  );
}
