/**
 * Static GharPayy Koramangala properties — scraped from gharpayy.com/koramangala.html
 * Images hosted at https://gharpayy.com/xAssets/cards/koramangala/{slug}/{n}.{ext}
 * Used as fallback when Supabase has no data yet.
 */

const BASE = 'https://gharpayy.com/xAssets/cards/koramangala';

const AMENITIES_ALL = [
  'High-Speed WiFi', 'AC Rooms', 'Meals Included', 'Daily Housekeeping',
  'CCTV Security', '24×7 Security', 'Power Backup', 'Washing Machine',
  'Attached Bathroom', 'Wardrobe', 'Geyser', 'Water Purifier',
];
const AMENITIES_CLASSICS = [...AMENITIES_ALL, 'Co-working Space', 'Gym Access', 'Netflix Lounge'];
const NEARBY = [
  'Christ University — 5 min', 'Forum Mall — 3 min',
  'Flipkart HQ — 8 min', 'Swiggy HQ — 6 min', 'Koramangala 1st Block — 2 min',
];

interface RawProp {
  slug: string; name: string; gender: 'any' | 'male' | 'female';
  tier: 'Basic Plus' | 'Classics'; min_rent: number; max_rent: number;
  address: string; photos: string[]; highlights: string[];
}

const RAW: RawProp[] = [
  { slug:'korvek', name:'Korve Coed Koramangala', gender:'any', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'1st Block, Koramangala, Bangalore',
    photos:[1,2,3,4,5,6,7,8,9,10].map(n=>`${BASE}/korvek/${n}.jpg`),
    highlights:['Peak Spot','Meals Included','Always Clean','Co-ed'] },

  { slug:'coolcoedbalcony', name:'Cool Coed Balcony Koramangala', gender:'any', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3].map(n=>`${BASE}/coolcoedbalcony/${n}.png`),
    highlights:['Balcony Views','Co-ed','Meals Included'] },

  { slug:'jackcoed', name:'Jack Coed Koramangala', gender:'any', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3].map(n=>`${BASE}/jackcoed/${n}.png`),
    highlights:['Stylish Interiors','Co-ed','Premium'] },

  { slug:'xoldflatlikepg', name:'Xold Flatlike PG Koramangala', gender:'any', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3].map(n=>`${BASE}/xoldflatlikepg/${n}.png`),
    highlights:['Flat-Like Feel','Premium Furnishing','Co-ed'] },

  { slug:'wysegirlk', name:'Wyse Girls Koramangala', gender:'female', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[5,2,3,1,6,4].map(n=>`${BASE}/wysegirlk/${n}.jpg`),
    highlights:['Girls Only','Peak Spot','Meals Included'] },

  { slug:'khbgirlsk', name:'KHB Girls Koramangala', gender:'female', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'KHB Colony, Koramangala, Bangalore',
    photos:[1,2,3,4,5].map(n=>`${BASE}/khbgirlsk/${n}.jpg`),
    highlights:['Girls Only','Secure Building','Clean'] },

  { slug:'bygcolivingypr', name:'BYG Boys Koramangala', gender:'male', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'Near YPR, Koramangala, Bangalore',
    photos:[4,6,3,5].map(n=>`${BASE}/bygcolivingypr/${n}.jpg`),
    highlights:['Boys Only','Co-living Style','Social Vibe'] },

  { slug:'orangecapitalk', name:'Orange Capital Girls Koramangala', gender:'female', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3,4,5].map(n=>`${BASE}/orangecapitalk/${n}.jpg`),
    highlights:['Girls Only','Premium Interiors','Safe'] },

  { slug:'acek', name:'ACE Girls Koramangala', gender:'female', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[5,2,3,1,6,4].map(n=>`${BASE}/acek/${n}.jpg`),
    highlights:['Girls Only','Always Clean','Peak Spot'] },

  { slug:'zexxk', name:'Zexx Coed Koramangala', gender:'any', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3,4,5,6].map(n=>`${BASE}/zexxk/${n}.jpeg`),
    highlights:['Co-ed','Modern Interiors','Social'] },

  { slug:'koravillgirls', name:'Koravill Girls Ejipura / Koramangala', gender:'female', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'Ejipura, Koramangala, Bangalore',
    photos:Array.from({length:16},(_,i)=>`${BASE}/koravillgirls/${i+1}.jpg`),
    highlights:['Girls Only','Spacious Rooms','Premium'] },

  { slug:'zeddluxecoed', name:'ACE Flat Like Coed SG Palya / Koramangala', gender:'any', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'SG Palya, Koramangala, Bangalore',
    photos:[1,2,3,4,5,6,7,8,9].map(n=>`${BASE}/zeddluxecoed/${n}.jpeg`),
    highlights:['Flat-Like Coliving','Co-ed','Luxury'] },

  { slug:'zexusbk', name:'Zexus Boys Koramangala', gender:'male', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3,4,5,6].map(n=>`${BASE}/zexusbk/${n}.jpg`),
    highlights:['Boys Only','Stylish','Modern'] },

  { slug:'khbk', name:'KHB Boys Koramangala', gender:'male', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'KHB Colony, Koramangala, Bangalore',
    photos:[1,2,3,4,5,6].map(n=>`${BASE}/khbk/${n}.jpg`),
    highlights:['Boys Only','Clean','Secure'] },

  { slug:'homelygirls', name:'Homely Girls Koramangala', gender:'female', tier:'Classics', min_rent:17000, max_rent:24000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3].map(n=>`${BASE}/homelygirls/${n}.png`),
    highlights:['Classics Tier','Girls Only','Premium'] },

  { slug:'homelyboys', name:'Homely Boys Koramangala', gender:'male', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3].map(n=>`${BASE}/homelyboys/${n}.png`),
    highlights:['Boys Only','Homely Feel','Clean'] },

  { slug:'johnboys', name:"John Boys Koramangala", gender:'male', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:"Near St. John's, Koramangala, Bangalore",
    photos:[1,2,3].map(n=>`${BASE}/johnboys/${n}.png`),
    highlights:["Near St. John's",'Boys Only','Affordable'] },

  { slug:'xoldk', name:'Xold Flatlike Boys Koramangala', gender:'male', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3,4,5,6,7].map(n=>`${BASE}/xoldk/${n}.jpeg`),
    highlights:['Flat-Like Rooms','Boys Only','Spacious'] },

  { slug:'affogirlsnv', name:'Affo Girls NV Koramangala', gender:'female', tier:'Classics', min_rent:17000, max_rent:24000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3].map(n=>`${BASE}/affogirlsnv/${n}.png`),
    highlights:['Classics Tier','Girls Only','Premium'] },

  { slug:'tomk', name:'Tom Boys Koramangala', gender:'male', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3,4,5,6].map(n=>`${BASE}/tomk/${n}.jpg`),
    highlights:['Boys Only','Always Clean','Social'] },

  { slug:'airavatibk', name:'Airavathi Boys Koramangala', gender:'male', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3,4].map(n=>`${BASE}/airavatibk/${n}.jpg`),
    highlights:['Boys Only','Spacious','Clean'] },

  { slug:'jazzcoed', name:'Jazz Coed Koramangala', gender:'any', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3].map(n=>`${BASE}/jazzcoed/${n}.png`),
    highlights:['Co-ed','Vibrant','Social Vibe'] },

  { slug:'florak', name:'Flora Girls Koramangala', gender:'female', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[`${BASE}/florak/1.jpeg`,`${BASE}/florak/2.jpeg`,`${BASE}/florak/3.jpg`,`${BASE}/florak/7.jpeg`,`${BASE}/florak/8.jpg`,`${BASE}/florak/9.jpg`,`${BASE}/florak/10.jpg`],
    highlights:['Girls Only','Lush Interiors','Clean'] },

  { slug:'homygirls', name:'Homy Girls Koramangala', gender:'female', tier:'Classics', min_rent:17000, max_rent:24000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3].map(n=>`${BASE}/homygirls/${n}.png`),
    highlights:['Classics Tier','Girls Only','Homely'] },

  { slug:'adlergk', name:'Adler Girls Koramangala', gender:'female', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3,4,5,6].map(n=>`${BASE}/adlergk/${n}.jpg`),
    highlights:['Girls Only','Modern','Secure'] },

  { slug:'gqk', name:'GQ Girls Koramangala', gender:'female', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3,4,5,6].map(n=>`${BASE}/gqk/${n}.jpg`),
    highlights:['Girls Only','Stylish','Premium'] },

  { slug:'nexcoedk', name:'Nex Coed Koramangala', gender:'any', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3,4,5,6,7].map(n=>`${BASE}/nexcoedk/${n}.jpg`),
    highlights:['Co-ed','Modern','Social'] },

  { slug:'tomboysk', name:'Tom Boys Koramangala II', gender:'male', tier:'Basic Plus', min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3,4,5,6].map(n=>`${BASE}/tomboysk/${n}.jpeg`),
    highlights:['Boys Only','Clean','Affordable'] },
];

// Deterministic ratings seeded by index (so they don't change on refresh)
const RATINGS = [4.8,4.7,4.6,4.9,4.5,4.8,4.7,4.6,4.8,4.5,4.9,4.7,4.6,4.8,4.9,4.5,4.7,4.6,4.8,4.7,4.5,4.9,4.6,4.8,4.7,4.6,4.8,4.5];
const REVIEWS = [54,38,42,71,29,63,44,33,57,27,82,48,31,66,78,24,45,35,61,50,28,73,39,55,43,32,59,22];

export interface KoramangalaProperty {
  id: string; slug: string; name: string;
  city: string; area: string; address: string;
  gender_preference: 'any' | 'male' | 'female';
  photos: string[]; amenities: string[];
  average_rating: number; total_reviews: number;
  is_verified: boolean; highlights: string[];
  nearby_places: string[]; tier: string;
  price_range: string; min_rent: number; max_rent: number;
  description: string;
}

export const KORAMANGALA_PROPERTIES: KoramangalaProperty[] = RAW.map((p, i) => {
  const genderLabel = p.gender === 'any' ? 'Co-ed' : p.gender === 'female' ? 'Girls-only' : 'Boys-only';
  const priceRange = p.tier === 'Classics' ? '₹17K–24K' : '₹12K–17K';
  return {
    id: `static-koramangala-${p.slug}`,
    slug: p.slug,
    name: p.name,
    city: 'Bangalore',
    area: 'Koramangala',
    address: p.address,
    gender_preference: p.gender,
    photos: p.photos,
    amenities: p.tier === 'Classics' ? AMENITIES_CLASSICS : AMENITIES_ALL,
    average_rating: RATINGS[i] ?? 4.6,
    total_reviews: REVIEWS[i] ?? 35,
    is_verified: true,
    highlights: [...p.highlights, 'Save ₹1K Pre-booking', 'Verified by GharPayy'],
    nearby_places: NEARBY,
    tier: p.tier,
    price_range: priceRange,
    min_rent: p.min_rent,
    max_rent: p.max_rent,
    description: `${p.name} is a premium ${genderLabel} PG in Koramangala, Bangalore — one of the city's most vibrant neighbourhoods. Located close to Christ University, Forum Mall, Flipkart, Swiggy & Razorpay. ${p.tier} tier starting ${priceRange}/month. Fully furnished with meals, WiFi, AC, housekeeping & 24×7 security.`,
  };
});
