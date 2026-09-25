import ComparisonTable, { type ComparisonPlan } from '@/components/case-study/comparison-table';

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
  'Annual Medical Premiums - Middle H SA',
  'Annual Medical Premiums - Hi Plan',
  'Esatimated SUTA',
  'Workers Comp',
  'Annual Administrative Service Fees (42 employees)',
];

const outcomeLabels = [
  'Difference off Current',
  'Maximum Workers Comp Safety Incentive',
  'Difference off Current',
  'Percentage Difference',
];

const plans: ComparisonPlan[] = [
  {
    name: 'Big Payroll PEO',
    roiName: 'Big Payroll PEO Expiring',
    costs: ['$92,632.80', '$250,749.48', '$39,574.92', '$41,040.00', '$164,421.00', ''],
    total: '$588,418.20',
    outcomes: ['', '', '', ''],
    implementation: '',
  },
  {
    name: 'Alternative A',
    roiName: 'Alternative B',
    costs: ['$93,480.00', '$209,724.00', '$33,564.00', '$41,040.00', '$105,256.00', '$50,400.00'],
    total: '$533,464.00',
    outcomes: ['$54,954.20', '$26,314.05', '$81,268.25', '13.81%'],
    implementation: 'Waived',
  },
  {
    name: 'Alternative A Option 2',
    roiName: 'Alternative A',
    costs: ['$84,360.00', '$209,724.00', '$33,564.00', '$41,040.00', '$105,256.00', '$50,400.00'],
    total: '$524,344.00',
    outcomes: ['$64,074.20', '$49,945.87', '$114,020.07', '19.38%'],
    implementation: 'Waived',
  },
];

export default function CaseStudyTwo() {
  return (
    <ComparisonTable
      plans={plans}
      services={services}
      costLabels={costLabels}
      outcomeLabels={outcomeLabels}
      filename="peo-benefits-comparison-case-study-2.png"
    />
  );
}
