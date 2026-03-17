import AreaPage from '@/components/AreaPage';
import { ALL_PROPERTIES } from '@/lib/allPropertiesData';

export const metadata = {
  title: 'PG in Electronic City Bangalore | GharPayy — PGs near Infosys',
  description: 'Best PGs in Electronic City Bangalore. Near Infosys, Tech Park, Semicon Park. Co-ed PGs. Meals included. Starting ₹8K/mo. No brokerage.',
};

export default function ElectronicCityPage() {
  const properties = ALL_PROPERTIES.filter(p => p.area === 'Electronic City');
  return (
    <AreaPage
      area="Electronic City"
      title="Best PGs in Electronic City"
      description={`${properties.length}+ verified PGs near Infosys, Tech Park & Semicon Park. Budget-friendly · Meals included · Starting ₹8K/mo.`}
      properties={properties}
      landmarks={['Infosys Campus', 'Semicon Park', 'Tech 37', 'Electronic City Phase 1 & 2', 'Shanthipura']}
      offices={['Infosys', 'Wipro', 'TCS', 'HCL', 'Siemens']}
    />
  );
}
