import FlexibleComparisonTable, {
  type ComparisonValueTone,
  type FlexiblePlan,
  type FlexibleRow,
} from '@/components/case-study/flexible-comparison-table';

const plans: FlexiblePlan[] = [
  { name: 'Big Payroll PEO' },
  { name: 'Big Payroll PEO' },
  { name: 'Negotiated Big Payroll' },
  { name: 'Option 1 Alternative PEO' },
  { name: 'Option 2 Alternative PEO' },
  { name: 'Option 3 Alternative PEO' },
];

const included = plans.map(() => 'Included');

const services = [
  { label: 'Payroll Processing', values: included },
  { label: 'Human Resources Consulting (Offer/Termination Letters, etc.)', values: included },
  { label: 'Employee Handbook/Legal Documents', values: included },
  { label: 'EPLI Policy', values: ['Included', 'Included', 'Included', 'Included', '$3,112', '$5,400'] },
  { label: 'PTO/Leave Tracking', values: included },
  { label: 'HRIS Platform', values: included },
];

const defaultTones: ComparisonValueTone[] = plans.map(() => 'default');

const rows: FlexibleRow[] = [
  {
    label: 'Annual Administrative Service Fees (Current Est.)',
    values: ['$505,430.78', '$505,430.78', '$505,430.78', '$64,980.00', '$249,931.14', '$77,952.00'],
  },
  {
    label: "Workers' Compensation",
    values: ['', '', '', '$345,965.00', '', '$325,464.85'],
  },
  {
    label: 'SUI',
    values: ['$42,702.12', '$42,702.12', '$42,702.12', '$23,548.00', '$30,715.08', '$21,530.00'],
  },
  {
    label: 'Annual Medical Premiums - Plan 1 HDHP',
    values: ['$31,356.96', '$34,919.76', '$34,919.76', '$30,324.00', '$34,919.76', '$27,007.44'],
  },
  {
    label: "Worker's Compensation Costs",
    values: ['$0.00', '$0.00', '$0.00', '$0.00', '$0.00', '$0.00'],
  },
  {
    label: 'Annual Medical Premiums - Plan 2 PPO',
    values: ['$43,723.32', '$46,509.12', '$46,509.12', '$36,876.00', '$43,102.08', '$41,873.88'],
  },
  {
    label: 'Annual Medical Premiums - Plan 3 EPO Freedom',
    values: ['$91,571.16', '$99,687.36', '$99,687.36', '$80,832.00', '$89,117.28', '$87,891.72'],
  },
  {
    label: 'Annual Medical Premiums - Plan 4 EPO Liberty',
    values: ['$62,284.92', '$67,329.12', '$67,329.12', '$59,496.00', '$65,994.84', '$65,096.28'],
  },
  {
    label: 'Medical Sub Total',
    values: ['$228,936.36', '$248,445.36', '$248,445.36', '$207,528.00', '$233,133.96', '$221,869.32'],
    kind: 'subtotal',
  },
  {
    label: 'Big Payroll reduction',
    values: ['', '', '$160,000.00', '', '', ''],
    kind: 'incentive',
    tones: ['default', 'default', 'positive', 'default', 'default', 'default'],
  },
  {
    label: 'One time set up fee',
    values: ['', '', '', '$5,700.00', '$7,500.00', ''],
  },
  {
    label: 'Total',
    values: ['$777,069.26', '$796,578.26', '$636,578.26', '$647,721.00', '$524,392.18', '$652,216.17'],
    kind: 'total',
  },
  {
    label: 'WC Safety Incentive',
    values: ['', '', '', '$86,491.00', '', ''],
    kind: 'incentive',
    tones: ['default', 'default', 'default', 'positive', 'default', 'default'],
  },
  {
    label: 'Total',
    values: ['$777,069.26', '$796,578.26', '$636,578.26', '$561,230.00', '$524,392.18', '$652,216.17'],
    kind: 'total',
  },
  {
    label: 'Difference Off Current',
    values: ['', '$19,509.00', '($140,491.00)', '($215,839.26)', '($252,677.18)', '($124,853.09)'],
    kind: 'outcome',
    tones: ['default', 'negative', 'positive', 'positive', 'positive', 'positive'],
  },
  {
    label: 'Percentage Difference',
    values: ['', '2.51%', '-18.07%', '-27.78%', '-32.52%', '-16.07%'],
    kind: 'percentage',
    tones: defaultTones,
  },
];

export default function CaseStudyThree() {
  return (
    <FlexibleComparisonTable
      plans={plans}
      services={services}
      financialHeading={{
        label: 'Admin/Workers Com/Sui & Medical',
        values: plans.map((plan) => plan.name),
      }}
      rows={rows}
      filename="peo-benefits-comparison-case-study-3.png"
      columnLabel="PEO Service Detail"
    />
  );
}
