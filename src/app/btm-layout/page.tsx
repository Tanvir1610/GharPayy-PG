import AreaPage from '@/components/AreaPage';
import { ALL_PROPERTIES } from '@/lib/allPropertiesData';

export const metadata = {
  title: 'PG in BTM Layout Bangalore | GharPayy — PGs near Silk Board',
  description: 'Best PGs in BTM Layout Bangalore. Near Silk Board Metro, BTM. Girls, Boys & Co-ed PGs. Meals included. Starting ₹10K/mo. No brokerage.',
};

export default function BTMPage() {
  const properties = ALL_PROPERTIES.filter(p => p.area === 'BTM Layout');
  return (
    <AreaPage
      area="BTM Layout"
      title="Best PGs in BTM Layout"
      description={`${properties.length}+ verified PGs near Silk Board Metro, BTM Layout. Fully furnished · Meals included · Starting ₹10K/mo.`}
      properties={properties}
      landmarks={['Silk Board Metro', 'BTM Layout', 'Madiwala Market', 'SG Palya']}
      offices={['Wipro', 'Accenture BTM', 'IBM', 'Infosys']}
    />
  );
}
