import AreaPage from '@/components/AreaPage';
import { ALL_PROPERTIES } from '@/lib/allPropertiesData';

export const metadata = {
  title: 'PG in Marathahalli Bangalore | GharPayy — Verified PGs near AECS',
  description: 'Best PGs in Marathahalli Bangalore. Near AECS Layout, Marathahalli Market & ORR. Co-ed PGs. Meals included. Starting ₹10K/mo. No brokerage.',
};

export default function MarathahhalliPage() {
  const properties = ALL_PROPERTIES.filter(p => p.area === 'Marathahalli');
  return (
    <AreaPage
      area="Marathahalli"
      title="Best PGs in Marathahalli"
      description={`${properties.length}+ verified PGs near AECS Layout, Marathahalli Market & Outer Ring Road. Starting ₹10K/mo.`}
      properties={properties}
      landmarks={['AECS Layout', 'Marathahalli Market', 'Outer Ring Road', 'Thubarahalli', 'Kundanhalli']}
      offices={['Infosys', 'Mindtree', 'Tech Mahindra', 'Bosch']}
    />
  );
}
