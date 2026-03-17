import AreaPage from '@/components/AreaPage';
import { ALL_PROPERTIES } from '@/lib/allPropertiesData';

export const metadata = {
  title: 'PG in Bellandur Bangalore | GharPayy — Verified PGs near Ecoworld',
  description: 'Best PGs in Bellandur Bangalore. Near Ecoworld, Flipkart, ETV. Co-ed, Girls & Boys PGs. Meals included. Starting ₹9K/mo. No brokerage.',
};

export default function BellandurPage() {
  const properties = ALL_PROPERTIES.filter(p => p.area === 'Bellandur');
  return (
    <AreaPage
      area="Bellandur"
      title="Best PGs in Bellandur"
      description={`${properties.length}+ verified PGs near Ecoworld, Flipkart & Embassy Tech Village. Fully furnished · Meals included · Starting ₹9K/mo.`}
      properties={properties}
      landmarks={['Ecoworld', 'Flipkart HQ', 'ETV', 'Embassy Tech Village', 'Kadubeesanahalli']}
      offices={['Flipkart', 'SAP', 'Cisco', 'Honeywell']}
    />
  );
}
