import AreaPage from '@/components/AreaPage';
import { ALL_PROPERTIES } from '@/lib/allPropertiesData';

export const metadata = {
  title: 'PG in HSR Layout Bangalore | GharPayy — Premium PGs near Metro',
  description: 'Best PGs in HSR Layout Bangalore. Near HSR Metro, Bommanahalli. Premium Co-ed PGs. Meals included. Starting ₹10K/mo. No brokerage.',
};

export default function HSRPage() {
  const properties = ALL_PROPERTIES.filter(p => p.area === 'HSR Layout' || p.area === 'JP Nagar');
  return (
    <AreaPage
      area="HSR Layout"
      title="Best PGs in HSR Layout & JP Nagar"
      description={`${properties.length}+ verified PGs near HSR Metro, Bommanahalli & Vega City Mall. Premium coliving · Starting ₹10K/mo.`}
      properties={properties}
      landmarks={['HSR Layout Metro', 'Bommanahalli Metro', 'Silk Board', 'Vega City Mall', 'Kudulu Gate']}
      offices={['Amazon', 'Goldman Sachs', 'Myntra', 'Swiggy HQ']}
    />
  );
}
