import AreaPage from '@/components/AreaPage';
import { ALL_PROPERTIES } from '@/lib/allPropertiesData';

export const metadata = {
  title: 'PG in Whitefield Bangalore | GharPayy — Verified PGs near ITPL',
  description: 'Best PGs in Whitefield Bangalore. Near ITPL, Hopefarm Metro, Brookfield. Co-ed & Girls PGs. Meals included. Starting ₹9K/mo. No brokerage.',
};

export default function WhitefieldPage() {
  const properties = ALL_PROPERTIES.filter(p => p.area === 'Whitefield');
  return (
    <AreaPage
      area="Whitefield"
      title="Best PGs in Whitefield"
      description={`${properties.length}+ verified PGs near ITPL, Hopefarm Metro & Brookfield. Fully furnished · Meals included · Starting ₹9K/mo.`}
      properties={properties}
      landmarks={['ITPL', 'Hopefarm Metro', 'Brookfield', 'AECS Layout', 'Whitefield Metro']}
      offices={['IBM', 'Wipro', 'Capgemini', 'KPMG', 'Accenture']}
    />
  );
}
