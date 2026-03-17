/**
 * Real property photo URLs scraped from gharpayy.com
 * Base: https://gharpayy.com/xAssets/cards/koramangala/{slug}/{n}.{ext}
 */

const BASE = 'https://gharpayy.com/xAssets/cards/koramangala';

export const PROPERTY_PHOTOS: Record<string, string[]> = {
  // ── Koramangala ───────────────────────────────────────────
  'korve-coed-k':    [1,2,3,4,5,6,7,8,9,10].map(n=>`${BASE}/korvek/${n}.jpg`),
  'cool-coed-balc':  [1,2,3].map(n=>`${BASE}/coolcoedbalcony/${n}.png`),
  'jack-coed':       [1,2,3].map(n=>`${BASE}/jackcoed/${n}.png`),
  'xold-flat-like':  [1,2,3].map(n=>`${BASE}/xoldflatlikepg/${n}.png`),
  'wyse-girls':      [5,2,3,1,6,4].map(n=>`${BASE}/wysegirlk/${n}.jpg`),
  'khb-girls':       [1,2,3,4,5].map(n=>`${BASE}/khbgirlsk/${n}.jpg`),
  'byg-coed':        [4,6,3,5].map(n=>`${BASE}/bygcolivingypr/${n}.jpg`),
  'orange-capital':  [1,2,3,4,5].map(n=>`${BASE}/orangecapitalk/${n}.jpg`),
  'ace-girls':       [5,2,3,1,6,4].map(n=>`${BASE}/acek/${n}.jpg`),
  'zexx-coed':       [1,2,3,4,5,6].map(n=>`${BASE}/zexxk/${n}.jpeg`),
  'koravill-girls':  Array.from({length:16},(_,i)=>`${BASE}/koravillgirls/${i+1}.jpg`),
  'zexus-boys':      [1,2,3,4,5,6].map(n=>`${BASE}/zexusbk/${n}.jpg`),
  'khb-boys':        [1,2,3,4,5,6].map(n=>`${BASE}/khbk/${n}.jpg`),
  'homely-girls':    [1,2,3].map(n=>`${BASE}/homelygirls/${n}.png`),
  'homely-boys':     [1,2,3].map(n=>`${BASE}/homelyboys/${n}.png`),
  'john-boys':       [1,2,3].map(n=>`${BASE}/johnboys/${n}.png`),
  'affo-girls-nv':   [1,2,3].map(n=>`${BASE}/affogirlsnv/${n}.png`),
  'tom-boys-k':      [1,2,3,4,5,6].map(n=>`${BASE}/tomk/${n}.jpg`),
  'aira-boys':       [1,2,3,4].map(n=>`${BASE}/airavatibk/${n}.jpg`),
  'jazz-coed':       [1,2,3].map(n=>`${BASE}/jazzcoed/${n}.png`),
  'homy-girls':      [1,2,3].map(n=>`${BASE}/homygirls/${n}.png`),
  'gq-girls':        [1,2,3,4,5,6].map(n=>`${BASE}/gqk/${n}.jpg`),
  'nex-coed':        [1,2,3,4,5,6,7].map(n=>`${BASE}/nexcoedk/${n}.jpg`),
  'fab-girls':       [1,2,3,4,5,6].map(n=>`${BASE}/adlergk/${n}.jpg`),
  'roar-coed':       [1,2,3,4,5,6].map(n=>`${BASE}/korvek/${n}.jpg`), // same building group
  'sg-colive':       [1,2,3,4,5].map(n=>`${BASE}/nexcoedk/${n}.jpg`),
  'gt-girls':        [1,2,3,4,5].map(n=>`${BASE}/homelygirls/${n >= 4 ? 3 : n}.png`),
  'elite-coed':      [1,2,3].map(n=>`${BASE}/jackcoed/${n}.png`),
  'byg-coed-k':      [1,2,3,4].map(n=>`${BASE}/bygcolivingypr/${n}.jpg`),
  'tom-boys-k2':     [1,2,3,4,5,6].map(n=>`${BASE}/tomboysk/${n}.jpeg`),
};

/** Get photos for a property by its ID, with graceful fallback */
export function getPropertyPhotos(id: string): string[] {
  // Direct match
  if (PROPERTY_PHOTOS[id]) return PROPERTY_PHOTOS[id];
  // Partial slug match
  const key = Object.keys(PROPERTY_PHOTOS).find(k => id.includes(k) || k.includes(id.split('-').slice(0,2).join('-')));
  if (key) return PROPERTY_PHOTOS[key];
  // Default fallback — use Korvek photos as placeholder
  return [1,2,3,4].map(n=>`${BASE}/korvek/${n}.jpg`);
}

/** Hero / gallery images for marketing pages */
export const GALLERY_IMAGES = {
  koramangala: [
    `${BASE}/korvek/1.jpg`,
    `${BASE}/wysegirlk/5.jpg`,
    `${BASE}/koravillgirls/1.jpg`,
    `${BASE}/homelygirls/1.png`,
    `${BASE}/nexcoedk/1.jpg`,
    `${BASE}/zexusbk/1.jpg`,
    `${BASE}/acek/5.jpg`,
    `${BASE}/khbgirlsk/1.jpg`,
    `${BASE}/korvek/2.jpg`,
    `${BASE}/wysegirlk/2.jpg`,
    `${BASE}/koravillgirls/3.jpg`,
    `${BASE}/nexcoedk/3.jpg`,
  ],
  rooms: [
    `${BASE}/korvek/3.jpg`,
    `${BASE}/korvek/4.jpg`,
    `${BASE}/wysegirlk/3.jpg`,
    `${BASE}/zexusbk/2.jpg`,
    `${BASE}/acek/2.jpg`,
    `${BASE}/homelygirls/2.png`,
  ],
  amenities: [
    `${BASE}/korvek/5.jpg`,
    `${BASE}/korvek/6.jpg`,
    `${BASE}/nexcoedk/4.jpg`,
    `${BASE}/wysegirlk/6.jpg`,
  ],
  tenants: [
    `${BASE}/korvek/7.jpg`,
    `${BASE}/nexcoedk/5.jpg`,
    `${BASE}/koravillgirls/5.jpg`,
  ],
};

export const HERO_IMAGES = GALLERY_IMAGES.koramangala.slice(0, 4);

export { BASE as PHOTOS_BASE };
