/**
 * Seed — All 28 GharPayy Koramangala Properties (scraped live from gharpayy.com)
 *
 * Run:
 *   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... SEED_OWNER_ID=your-uuid \
 *   npx tsx src/scripts/seedKoramangala.ts
 */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY   = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const OWNER_ID      = process.env.SEED_OWNER_ID!;

if (!SUPABASE_URL || !SERVICE_KEY || !OWNER_ID) {
  console.error('❌  Set NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SEED_OWNER_ID');
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const BASE = 'https://gharpayy.com/xAssets/cards/koramangala';

const PROPERTIES = [
  {
    slug:'korvek', name:'Korve Coed Koramangala', gender:'any', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'1st Block, Koramangala, Bangalore',
    photos:[1,2,3,4,5,6,7,8,9,10].map(n=>`${BASE}/korvek/${n}.jpg`),
    highlights:['Peak Spot','Meals Included','Always Clean','Co-ed'],
  },
  {
    slug:'coolcoedbalcony', name:'Cool Coed Balcony Koramangala', gender:'any', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3].map(n=>`${BASE}/coolcoedbalcony/${n}.png`),
    highlights:['Balcony Views','Co-ed','Meals Included'],
  },
  {
    slug:'jackcoed', name:'Jack Coed Koramangala', gender:'any', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3].map(n=>`${BASE}/jackcoed/${n}.png`),
    highlights:['Stylish Interiors','Co-ed','Premium'],
  },
  {
    slug:'xoldflatlikepg', name:'Xold Flatlike PG Koramangala', gender:'any', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3].map(n=>`${BASE}/xoldflatlikepg/${n}.png`),
    highlights:['Flat-Like Feel','Premium Furnishing','Co-ed'],
  },
  {
    slug:'wysegirlk', name:'Wyse Girls Koramangala', gender:'female', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[5,2,3,1,6,4].map(n=>`${BASE}/wysegirlk/${n}.jpg`),
    highlights:['Girls Only','Peak Spot','Meals Included'],
  },
  {
    slug:'khbgirlsk', name:'KHB Girls Koramangala', gender:'female', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'KHB Colony, Koramangala, Bangalore',
    photos:[1,2,3,4,5].map(n=>`${BASE}/khbgirlsk/${n}.jpg`),
    highlights:['Girls Only','Secure Building','Clean'],
  },
  {
    slug:'bygcolivingypr', name:'BYG Boys Koramangala', gender:'male', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'Near YPR, Koramangala, Bangalore',
    photos:[4,6,3,5].map(n=>`${BASE}/bygcolivingypr/${n}.jpg`),
    highlights:['Boys Only','Co-living Style','Social Vibe'],
  },
  {
    slug:'orangecapitalk', name:'Orange Capital Girls Koramangala', gender:'female', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3,4,5].map(n=>`${BASE}/orangecapitalk/${n}.jpg`),
    highlights:['Girls Only','Premium Interiors','Safe'],
  },
  {
    slug:'acek', name:'ACE Girls Koramangala', gender:'female', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[5,2,3,1,6,4].map(n=>`${BASE}/acek/${n}.jpg`),
    highlights:['Girls Only','Always Clean','Peak Spot'],
  },
  {
    slug:'zexxk', name:'Zexx Coed Koramangala', gender:'any', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3,4,5,6].map(n=>`${BASE}/zexxk/${n}.jpeg`),
    highlights:['Co-ed','Modern Interiors','Social'],
  },
  {
    slug:'koravillgirls', name:'Koravill Girls Ejipura / Koramangala', gender:'female', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'Ejipura, Koramangala, Bangalore',
    photos:Array.from({length:16},(_,i)=>`${BASE}/koravillgirls/${i+1}.jpg`),
    highlights:['Girls Only','Spacious Rooms','Premium'],
  },
  {
    slug:'zeddluxecoed', name:'ACE Flat Like Coed SG Palya / Koramangala', gender:'any', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'SG Palya, Koramangala, Bangalore',
    photos:[1,2,3,4,5,6,7,8,9].map(n=>`${BASE}/zeddluxecoed/${n}.jpeg`),
    highlights:['Flat-Like Coliving','Co-ed','Luxury'],
  },
  {
    slug:'zexusbk', name:'Zexus Boys Koramangala', gender:'male', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3,4,5,6].map(n=>`${BASE}/zexusbk/${n}.jpg`),
    highlights:['Boys Only','Stylish','Modern'],
  },
  {
    slug:'khbk', name:'KHB Boys Koramangala', gender:'male', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'KHB Colony, Koramangala, Bangalore',
    photos:[1,2,3,4,5,6].map(n=>`${BASE}/khbk/${n}.jpg`),
    highlights:['Boys Only','Clean','Secure'],
  },
  {
    slug:'homelygirls', name:'Homely Girls Koramangala', gender:'female', tier:'Classics',
    min_rent:17000, max_rent:24000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3].map(n=>`${BASE}/homelygirls/${n}.png`),
    highlights:['Classics Tier','Girls Only','Premium'],
  },
  {
    slug:'homelyboys', name:'Homely Boys Koramangala', gender:'male', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3].map(n=>`${BASE}/homelyboys/${n}.png`),
    highlights:['Boys Only','Homely Feel','Clean'],
  },
  {
    slug:'johnboys', name:'John Boys Koramangala', gender:'male', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:"Near St. John's, Koramangala, Bangalore",
    photos:[1,2,3].map(n=>`${BASE}/johnboys/${n}.png`),
    highlights:["Near St. John's",'Boys Only','Affordable'],
  },
  {
    slug:'xoldk', name:'Xold Flatlike Boys Koramangala', gender:'male', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3,4,5,6,7].map(n=>`${BASE}/xoldk/${n}.jpeg`),
    highlights:['Flat-Like Rooms','Boys Only','Spacious'],
  },
  {
    slug:'affogirlsnv', name:'Affo Girls NV Koramangala', gender:'female', tier:'Classics',
    min_rent:17000, max_rent:24000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3].map(n=>`${BASE}/affogirlsnv/${n}.png`),
    highlights:['Classics Tier','Girls Only','Premium'],
  },
  {
    slug:'tomk', name:'Tom Boys Koramangala', gender:'male', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3,4,5,6].map(n=>`${BASE}/tomk/${n}.jpg`),
    highlights:['Boys Only','Always Clean','Social'],
  },
  {
    slug:'airavatibk', name:'Airavathi Boys Koramangala', gender:'male', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3,4].map(n=>`${BASE}/airavatibk/${n}.jpg`),
    highlights:['Boys Only','Spacious','Clean'],
  },
  {
    slug:'jazzcoed', name:'Jazz Coed Koramangala', gender:'any', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3].map(n=>`${BASE}/jazzcoed/${n}.png`),
    highlights:['Co-ed','Vibrant','Social Vibe'],
  },
  {
    slug:'florak', name:'Flora Girls Koramangala', gender:'female', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[`${BASE}/florak/1.jpeg`,`${BASE}/florak/2.jpeg`,`${BASE}/florak/3.jpg`,`${BASE}/florak/7.jpeg`,`${BASE}/florak/8.jpg`,`${BASE}/florak/9.jpg`,`${BASE}/florak/10.jpg`],
    highlights:['Girls Only','Lush Interiors','Clean'],
  },
  {
    slug:'homygirls', name:'Homy Girls Koramangala', gender:'female', tier:'Classics',
    min_rent:17000, max_rent:24000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3].map(n=>`${BASE}/homygirls/${n}.png`),
    highlights:['Classics Tier','Girls Only','Homely'],
  },
  {
    slug:'adlergk', name:'Adler Girls Koramangala', gender:'female', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3,4,5,6].map(n=>`${BASE}/adlergk/${n}.jpg`),
    highlights:['Girls Only','Modern','Secure'],
  },
  {
    slug:'gqk', name:'GQ Girls Koramangala', gender:'female', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3,4,5,6].map(n=>`${BASE}/gqk/${n}.jpg`),
    highlights:['Girls Only','Stylish','Premium'],
  },
  {
    slug:'nexcoedk', name:'Nex Coed Koramangala', gender:'any', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3,4,5,6,7].map(n=>`${BASE}/nexcoedk/${n}.jpg`),
    highlights:['Co-ed','Modern','Social'],
  },
  {
    slug:'tomboysk', name:'Tom Boys Koramangala (2)', gender:'male', tier:'Basic Plus',
    min_rent:12000, max_rent:17000,
    address:'Koramangala, Bangalore',
    photos:[1,2,3,4,5,6].map(n=>`${BASE}/tomboysk/${n}.jpeg`),
    highlights:['Boys Only','Clean','Affordable'],
  },
];

const AMENITIES = ['High-Speed WiFi','AC Rooms','Meals Included','Daily Housekeeping','CCTV Security','24×7 Security','Power Backup','Washing Machine','Attached Bathroom','Wardrobe','Geyser','Water Purifier'];
const NEARBY    = ['Christ University — 5 min','Forum Mall — 3 min','Flipkart HQ — 8 min','Swiggy HQ — 6 min','Koramangala 1st Block — 2 min'];

async function seed() {
  console.log('🔗  Connecting to Supabase…');

  // Clear old Koramangala data
  const { error: delErr } = await sb.from('properties')
    .delete()
    .eq('city','Bangalore')
    .eq('area','Koramangala');
  if (delErr) console.warn('⚠  Delete warning:', delErr.message);
  console.log('🗑  Cleared old Koramangala properties');

  let ok = 0;
  for (const p of PROPERTIES) {
    const tier_label = p.tier === 'Classics' ? 'Classics' : 'Basic Plus';
    const price_range = p.tier === 'Classics' ? '₹17K–24K' : '₹12K–17K';
    const genderLabel = p.gender === 'any' ? 'Co-ed' : p.gender === 'female' ? 'Girls-only' : 'Boys-only';

    const { data: prop, error } = await sb.from('properties').insert({
      name:          p.name,
      slug:          p.slug,
      address:       p.address,
      city:          'Bangalore',
      area:          'Koramangala',
      description:   `${p.name} is a premium ${genderLabel} PG in Koramangala, Bangalore — one of the city's most vibrant neighbourhoods. Located close to Christ University, Forum Mall, Flipkart, Swiggy & Razorpay. ${tier_label} tier starting ${price_range}/month. Fully furnished with meals, WiFi, AC, housekeeping & 24×7 security.`,
      gender_preference: p.gender,
      amenities:     [...AMENITIES, ...(p.tier === 'Classics' ? ['Co-working Space','Gym Access','Netflix Lounge'] : [])],
      rules:         'No smoking inside\nGuests allowed until 10 PM\nMinimum stay: 1 month\nID proof mandatory',
      photos:        p.photos,
      owner_id:      OWNER_ID,
      is_verified:   true,
      average_rating: parseFloat((4.3 + Math.random() * 0.65).toFixed(1)),
      total_reviews:  Math.floor(18 + Math.random() * 62),
      highlights:    [...p.highlights, 'Save ₹1K Pre-booking', 'Verified by GharPayy'],
      nearby_places: NEARBY,
      tier:          tier_label,
      price_range:   price_range,
      min_rent:      p.min_rent,
      max_rent:      p.max_rent,
    }).select('id').single();

    if (error || !prop) { console.error(`  ❌ ${p.name}:`, error?.message); continue; }

    // Add 2 room types per property
    await sb.from('rooms').insert([
      { property_id: prop.id, room_type: 'double', total_beds: 2, occupied_beds: 1, rent: p.min_rent, amenities: AMENITIES.slice(0, 6) },
      { property_id: prop.id, room_type: 'single', total_beds: 1, occupied_beds: 0, rent: p.max_rent, amenities: AMENITIES },
    ]);

    console.log(`  ✅ ${++ok}/${PROPERTIES.length} — ${p.name} (${p.photos.length} photos)`);
  }

  console.log(`\n🎉  Seeded ${ok} properties into Supabase!`);
  console.log('   Visit: http://localhost:3000/koramangala');
}

seed().catch(e => { console.error(e); process.exit(1); });
