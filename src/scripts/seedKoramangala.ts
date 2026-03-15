/**
 * Seed — All GharPayy Koramangala Properties into Supabase
 * Scraped from https://gharpayy.com/koramangala.html
 *
 * Setup:
 *  1. Create a Supabase project at https://supabase.com
 *  2. Run supabase/schema.sql in Supabase SQL Editor
 *  3. Create an owner account via /signup (role: owner)
 *  4. Set env vars and run: npx tsx src/scripts/seedKoramangala.ts
 *
 * Required env vars:
 *  NEXT_PUBLIC_SUPABASE_URL=...
 *  SUPABASE_SERVICE_ROLE_KEY=...
 *  SEED_OWNER_ID=<UUID of the owner user you created>
 */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const OWNER_ID     = process.env.SEED_OWNER_ID!;

if (!SUPABASE_URL || !SERVICE_KEY || !OWNER_ID) {
  console.error('❌ Missing env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SEED_OWNER_ID');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const PROPERTIES = [
  { slug: 'korvek',         name: 'Korve Coed Koramangala',                   gender: 'any',    tier: 'Basic Plus', price_range: '₹12K–17K', min_rent: 12000, max_rent: 17000, photos: [1,2,3,4,5,6,7,8,9,10].map(n=>`https://gharpayy.com/xAssets/cards/koramangala/korvek/${n}.jpg`),            address: '1st Block, Koramangala, Bangalore',          hl: ['Peak Spot','Meals Included','Always Clean'] },
  { slug: 'coolcoedbalcony',name: 'Cool Coed Balcony Koramangala',            gender: 'any',    tier: 'Basic Plus', price_range: '₹12K–17K', min_rent: 12000, max_rent: 17000, photos: [1,2,3].map(n=>`https://gharpayy.com/xAssets/cards/koramangala/coolcoedbalcony/${n}.png`),                  address: 'Koramangala, Bangalore',                    hl: ['Balcony Views','Co-ed','Meals Included'] },
  { slug: 'jackcoed',       name: 'Jack Coed Koramangala',                    gender: 'any',    tier: 'Basic Plus', price_range: '₹12K–17K', min_rent: 12000, max_rent: 17000, photos: [1,2,3].map(n=>`https://gharpayy.com/xAssets/cards/koramangala/jackcoed/${n}.png`),                         address: 'Koramangala, Bangalore',                    hl: ['Stylish Interiors','Co-ed'] },
  { slug: 'xoldflatlikepg', name: 'Xold Flatlike PG Koramangala',             gender: 'any',    tier: 'Basic Plus', price_range: '₹12K–17K', min_rent: 12000, max_rent: 17000, photos: [1,2,3].map(n=>`https://gharpayy.com/xAssets/cards/koramangala/xoldflatlikepg/${n}.png`),                  address: 'Koramangala, Bangalore',                    hl: ['Flat-Like Feel','Premium Furnishing'] },
  { slug: 'wysegirlk',      name: 'Wyse Girls Koramangala',                   gender: 'female', tier: 'Basic Plus', price_range: '₹12K–17K', min_rent: 12000, max_rent: 17000, photos: [5,2,3,1,6,4].map(n=>`https://gharpayy.com/xAssets/cards/koramangala/wysegirlk/${n}.jpg`),                  address: 'Koramangala, Bangalore',                    hl: ['Girls Only','Peak Spot','Meals Included'] },
  { slug: 'khbgirlsk',      name: 'KHB Girls Koramangala',                    gender: 'female', tier: 'Basic Plus', price_range: '₹12K–17K', min_rent: 12000, max_rent: 17000, photos: [1,2,3,4,5].map(n=>`https://gharpayy.com/xAssets/cards/koramangala/khbgirlsk/${n}.jpg`),                    address: 'KHB Colony, Koramangala, Bangalore',        hl: ['Girls Only','Secure Building'] },
  { slug: 'bygcolivingypr', name: 'BYG Boys Koramangala',                     gender: 'male',   tier: 'Basic Plus', price_range: '₹12K–17K', min_rent: 12000, max_rent: 17000, photos: [4,6,3,5].map(n=>`https://gharpayy.com/xAssets/cards/koramangala/bygcolivingypr/${n}.jpg`),                  address: 'Near YPR, Koramangala, Bangalore',          hl: ['Boys Only','Co-living Style'] },
  { slug: 'orangecapitalk', name: 'Orange Capital Girls Koramangala',         gender: 'female', tier: 'Basic Plus', price_range: '₹12K–17K', min_rent: 12000, max_rent: 17000, photos: [1,2,3,4,5].map(n=>`https://gharpayy.com/xAssets/cards/koramangala/orangecapitalk/${n}.jpg`),                address: 'Koramangala, Bangalore',                    hl: ['Girls Only','Premium Interiors'] },
  { slug: 'acek',           name: 'ACE Girls Koramangala',                    gender: 'female', tier: 'Basic Plus', price_range: '₹12K–17K', min_rent: 12000, max_rent: 17000, photos: [5,2,3,1,6,4].map(n=>`https://gharpayy.com/xAssets/cards/koramangala/acek/${n}.jpg`),                        address: 'Koramangala, Bangalore',                    hl: ['Girls Only','Always Clean'] },
  { slug: 'zexxk',          name: 'Zexx Coed Koramangala',                    gender: 'any',    tier: 'Basic Plus', price_range: '₹12K–17K', min_rent: 12000, max_rent: 17000, photos: [1,2,3,4,5,6].map(n=>`https://gharpayy.com/xAssets/cards/koramangala/zexxk/${n}.jpeg`),                      address: 'Koramangala, Bangalore',                    hl: ['Co-ed','Modern Interiors'] },
  { slug: 'koravillgirls',  name: 'Koravill Girls Ejipura / Koramangala',     gender: 'female', tier: 'Basic Plus', price_range: '₹12K–17K', min_rent: 12000, max_rent: 17000, photos: Array.from({length:16},(_,i)=>`https://gharpayy.com/xAssets/cards/koramangala/koravillgirls/${i+1}.jpg`),    address: 'Ejipura, Koramangala, Bangalore',           hl: ['Girls Only','Spacious Rooms'] },
  { slug: 'zeddluxecoed',   name: 'ACE Flat Like Coed SG Palya / Koramangala',gender: 'any',    tier: 'Basic Plus', price_range: '₹12K–17K', min_rent: 12000, max_rent: 17000, photos: [1,2,3,4,5,6,7,8,9].map(n=>`https://gharpayy.com/xAssets/cards/koramangala/zeddluxecoed/${n}.jpeg`),          address: 'SG Palya, Koramangala, Bangalore',          hl: ['Flat-Like Coliving','Co-ed'] },
  { slug: 'zexusbk',        name: 'Zexus Boys Koramangala',                   gender: 'male',   tier: 'Basic Plus', price_range: '₹12K–17K', min_rent: 12000, max_rent: 17000, photos: [1,2,3,4,5,6].map(n=>`https://gharpayy.com/xAssets/cards/koramangala/zexusbk/${n}.jpg`),                      address: 'Koramangala, Bangalore',                    hl: ['Boys Only','Stylish'] },
  { slug: 'khbk',           name: 'KHB Boys Koramangala',                     gender: 'male',   tier: 'Basic Plus', price_range: '₹12K–17K', min_rent: 12000, max_rent: 17000, photos: [1,2,3,4,5,6].map(n=>`https://gharpayy.com/xAssets/cards/koramangala/khbk/${n}.jpg`),                          address: 'KHB Colony, Koramangala, Bangalore',        hl: ['Boys Only','Clean'] },
  { slug: 'homelygirls',    name: 'Homely Girls Koramangala',                 gender: 'female', tier: 'Classics',   price_range: '₹17K–24K', min_rent: 17000, max_rent: 24000, photos: [1,2,3].map(n=>`https://gharpayy.com/xAssets/cards/koramangala/homelygirls/${n}.png`),                         address: 'Koramangala, Bangalore',                    hl: ['Classics Tier','Girls Only','Premium'] },
  { slug: 'homelyboys',     name: 'Homely Boys Koramangala',                  gender: 'male',   tier: 'Basic Plus', price_range: '₹12K–17K', min_rent: 12000, max_rent: 17000, photos: [1,2,3].map(n=>`https://gharpayy.com/xAssets/cards/koramangala/homelyboys/${n}.png`),                          address: 'Koramangala, Bangalore',                    hl: ['Boys Only','Homely Feel'] },
  { slug: 'johnboys',       name: 'John Boys Koramangala',                    gender: 'male',   tier: 'Basic Plus', price_range: '₹12K–17K', min_rent: 12000, max_rent: 17000, photos: [1,2,3].map(n=>`https://gharpayy.com/xAssets/cards/koramangala/johnboys/${n}.png`),                            address: "Near St. John's, Koramangala, Bangalore",   hl: ["Near St. John's",'Boys Only'] },
  { slug: 'xoldk',          name: 'Xold Flatlike Boys Koramangala',           gender: 'male',   tier: 'Basic Plus', price_range: '₹12K–17K', min_rent: 12000, max_rent: 17000, photos: [1,2,3,4,5,6,7].map(n=>`https://gharpayy.com/xAssets/cards/koramangala/xoldk/${n}.jpeg`),                     address: 'Koramangala, Bangalore',                    hl: ['Flat-Like Rooms','Boys Only'] },
  { slug: 'affogirlsnv',    name: 'Affo Girls NV Koramangala',                gender: 'female', tier: 'Classics',   price_range: '₹17K–24K', min_rent: 17000, max_rent: 24000, photos: [1,2,3].map(n=>`https://gharpayy.com/xAssets/cards/koramangala/affogirlsnv/${n}.png`),                         address: 'Koramangala, Bangalore',                    hl: ['Classics Tier','Girls Only','Premium'] },
  { slug: 'tomk',           name: 'Tom Boys Koramangala',                     gender: 'male',   tier: 'Basic Plus', price_range: '₹12K–17K', min_rent: 12000, max_rent: 17000, photos: [1,2,3,4,5,6].map(n=>`https://gharpayy.com/xAssets/cards/koramangala/tomk/${n}.jpg`),                          address: 'Koramangala, Bangalore',                    hl: ['Boys Only','Always Clean'] },
];

const COMMON = ['High-Speed WiFi','AC Rooms','Meals Included','Daily Housekeeping','CCTV Security','24×7 Security','Power Backup','Washing Machine','Attached Bathroom','Wardrobe','Geyser','Water Purifier'];

async function seed() {
  console.log('🔗 Connecting to Supabase...');

  // Remove old Koramangala properties
  await supabase.from('properties').delete().eq('city', 'Bangalore').eq('area', 'Koramangala');
  console.log('🗑  Cleared old Koramangala properties');

  let created = 0;
  for (const p of PROPERTIES) {
    const { data: prop, error } = await supabase.from('properties').insert({
      name: p.name, slug: p.slug, address: p.address, city: 'Bangalore', area: 'Koramangala',
      description: `${p.name} — premium ${p.gender === 'any' ? 'co-ed' : p.gender === 'female' ? 'girls-only' : 'boys-only'} PG in Koramangala, Bangalore. Close to Christ University, Forum Mall, Flipkart & Swiggy. ${p.tier} tier starting ${p.price_range}/mo. Fully furnished, meals included, WiFi, AC & 24×7 security.`,
      gender_preference: p.gender,
      amenities: [...COMMON, ...(p.tier === 'Classics' ? ['Co-working Space','Gym Access'] : [])],
      rules: 'No smoking inside\nGuests until 10 PM\nMin stay: 1 month',
      photos: p.photos,
      owner_id: OWNER_ID,
      is_verified: true,
      average_rating: parseFloat((4.3 + Math.random() * 0.6).toFixed(1)),
      total_reviews: Math.floor(15 + Math.random() * 55),
      highlights: [...p.hl, 'Save ₹1K Pre-booking', 'Verified by GharPayy'],
      nearby_places: ['Christ University — 5 min','Forum Mall — 3 min','Flipkart HQ — 8 min','Swiggy — 6 min'],
      tier: p.tier, price_range: p.price_range, min_rent: p.min_rent, max_rent: p.max_rent,
    }).select('id').single();

    if (error || !prop) { console.error(`❌ ${p.name}:`, error?.message); continue; }

    // Insert rooms
    await supabase.from('rooms').insert([
      { property_id: prop.id, room_type: 'double', total_beds: 2, rent: p.min_rent, amenities: COMMON.slice(0, 6) },
      { property_id: prop.id, room_type: 'single', total_beds: 1, rent: p.max_rent, amenities: COMMON },
    ]);

    console.log(`  ✅ ${++created}. ${p.name} (${p.photos.length} photos)`);
  }

  console.log(`\n🎉 Seeded ${created} properties!`);
  console.log('   View at: http://localhost:3000/koramangala');
}

seed().catch(e => { console.error(e); process.exit(1); });
