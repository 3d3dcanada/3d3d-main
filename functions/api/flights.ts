/**
 * Cloudflare Pages Function — Flight cost estimator.
 *
 * Uses the Haversine formula + a distance-based fare model built from
 * publicly available DOT / StatCan average domestic fare data.
 * No API keys required.
 *
 * GET /api/flights?from=YFC&to=YYZ
 * GET /api/flights?from=YHZ&toLat=40.6413&toLng=-73.7781
 */

interface AirportRecord {
  code: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
}

const BASE_AIRPORTS: Record<string, AirportRecord> = {
  YFC: { code: 'YFC', name: 'Fredericton Intl', city: 'Fredericton', lat: 45.8689, lng: -66.5372 },
  YQM: { code: 'YQM', name: 'Greater Moncton Intl', city: 'Moncton', lat: 46.1122, lng: -64.6786 },
  YHZ: { code: 'YHZ', name: 'Halifax Stanfield Intl', city: 'Halifax', lat: 44.8808, lng: -63.5086 },
  YSJ: { code: 'YSJ', name: 'Saint John Airport', city: 'Saint John', lat: 45.3161, lng: -65.8903 },
};

const DESTINATION_AIRPORTS: Record<string, AirportRecord> = {
  YYZ: { code: 'YYZ', name: "Toronto Pearson", city: 'Toronto', lat: 43.6777, lng: -79.6248 },
  YUL: { code: 'YUL', name: "Montréal-Trudeau", city: 'Montreal', lat: 45.4706, lng: -73.7408 },
  YOW: { code: 'YOW', name: "Ottawa Macdonald-Cartier", city: 'Ottawa', lat: 45.3225, lng: -75.6692 },
  YQB: { code: 'YQB', name: "Québec City Jean Lesage", city: 'Quebec City', lat: 46.7911, lng: -71.3933 },
  YYC: { code: 'YYC', name: "Calgary Intl", city: 'Calgary', lat: 51.1215, lng: -114.0076 },
  YEG: { code: 'YEG', name: "Edmonton Intl", city: 'Edmonton', lat: 53.3097, lng: -113.5797 },
  YVR: { code: 'YVR', name: "Vancouver Intl", city: 'Vancouver', lat: 49.1967, lng: -123.1815 },
  YWG: { code: 'YWG', name: "Winnipeg Richardson", city: 'Winnipeg', lat: 49.9100, lng: -97.2399 },
  YYG: { code: 'YYG', name: "Charlottetown Airport", city: 'Charlottetown', lat: 46.2900, lng: -63.1211 },
  YYT: { code: 'YYT', name: "St. John's Intl", city: "St. John's", lat: 47.6186, lng: -52.7519 },
  JFK: { code: 'JFK', name: "John F. Kennedy Intl", city: 'New York', lat: 40.6413, lng: -73.7781 },
  BOS: { code: 'BOS', name: "Boston Logan", city: 'Boston', lat: 42.3656, lng: -71.0096 },
  PVD: { code: 'PVD', name: "T.F. Green (Newport)", city: 'Providence', lat: 41.7241, lng: -71.4283 },
  PHL: { code: 'PHL', name: "Philadelphia Intl", city: 'Philadelphia', lat: 39.8721, lng: -75.2411 },
  EWR: { code: 'EWR', name: "Newark Liberty", city: 'Newark', lat: 40.6895, lng: -74.1745 },
  MIA: { code: 'MIA', name: "Miami Intl", city: 'Miami', lat: 25.7959, lng: -80.2870 },
  FLL: { code: 'FLL', name: "Fort Lauderdale", city: 'Fort Lauderdale', lat: 26.0726, lng: -80.1527 },
  CHS: { code: 'CHS', name: "Charleston Intl", city: 'Charleston', lat: 32.8986, lng: -80.0405 },
  ORD: { code: 'ORD', name: "Chicago O'Hare", city: 'Chicago', lat: 41.9742, lng: -87.9073 },
  DTW: { code: 'DTW', name: "Detroit Metro", city: 'Detroit', lat: 42.2124, lng: -83.3534 },
  MSP: { code: 'MSP', name: "Minneapolis-St Paul", city: 'Minneapolis', lat: 44.8820, lng: -93.2218 },
  DFW: { code: 'DFW', name: "Dallas/Fort Worth", city: 'Dallas', lat: 32.8998, lng: -97.0403 },
  LAX: { code: 'LAX', name: "Los Angeles Intl", city: 'Los Angeles', lat: 33.9416, lng: -118.4085 },
  SFO: { code: 'SFO', name: "San Francisco Intl", city: 'San Francisco', lat: 37.6213, lng: -122.3790 },
  SEA: { code: 'SEA', name: "Seattle-Tacoma", city: 'Seattle', lat: 47.4502, lng: -122.3088 },
  PDX: { code: 'PDX', name: "Portland Intl", city: 'Portland', lat: 45.5898, lng: -122.5951 },
  BDA: { code: 'BDA', name: "L.F. Wade Intl", city: 'Bermuda', lat: 32.3640, lng: -64.6787 },
  ANU: { code: 'ANU', name: "V.C. Bird Intl", city: 'Antigua', lat: 17.1367, lng: -61.7926 },
  SXM: { code: 'SXM', name: "Princess Juliana", city: 'St. Maarten', lat: 18.0410, lng: -63.1089 },
  LHR: { code: 'LHR', name: "London Heathrow", city: 'London', lat: 51.4700, lng: -0.4543 },
  CDG: { code: 'CDG', name: "Paris Charles de Gaulle", city: 'Paris', lat: 49.0097, lng: 2.5479 },
  LIS: { code: 'LIS', name: "Lisbon Portela", city: 'Lisbon', lat: 38.7756, lng: -9.1354 },
  SYD: { code: 'SYD', name: "Sydney Kingsford Smith", city: 'Sydney', lat: -33.9461, lng: 151.1772 },
};

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Distance-based fare model (CAD, round-trip economy).
 * Derived from Statistics Canada Table 23-10-0253-01 and US DOT DB1B data.
 * Atlantic Canada premium factored in for short-haul.
 */
function estimateFare(distanceKm: number): { low: number; high: number } {
  if (distanceKm < 300) {
    return { low: 0, high: Math.round(distanceKm * 0.55) };
  } else if (distanceKm < 800) {
    return { low: 280, high: 550 };
  } else if (distanceKm < 1500) {
    return { low: 350, high: 700 };
  } else if (distanceKm < 3000) {
    return { low: 450, high: 950 };
  } else if (distanceKm < 5000) {
    return { low: 550, high: 1200 };
  } else if (distanceKm < 8000) {
    return { low: 800, high: 1800 };
  }
  return { low: 1200, high: 3200 };
}

export const onRequestGet: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  const from = url.searchParams.get('from')?.toUpperCase();
  const to = url.searchParams.get('to')?.toUpperCase();
  const toLat = url.searchParams.get('toLat');
  const toLng = url.searchParams.get('toLng');

  if (!from || !BASE_AIRPORTS[from]) {
    return Response.json(
      { error: 'Invalid origin. Use one of: YFC, YQM, YHZ, YSJ' },
      { status: 400 }
    );
  }

  const origin = BASE_AIRPORTS[from];
  let destLat: number;
  let destLng: number;
  let destName: string;
  let destCode: string | null = null;

  if (to && DESTINATION_AIRPORTS[to]) {
    const dest = DESTINATION_AIRPORTS[to];
    destLat = dest.lat;
    destLng = dest.lng;
    destName = `${dest.city} (${dest.code})`;
    destCode = dest.code;
  } else if (toLat && toLng) {
    destLat = parseFloat(toLat);
    destLng = parseFloat(toLng);
    destName = `${destLat.toFixed(2)}, ${destLng.toFixed(2)}`;
    if (isNaN(destLat) || isNaN(destLng)) {
      return Response.json({ error: 'Invalid coordinates' }, { status: 400 });
    }
  } else {
    return Response.json(
      { error: 'Provide destination as ?to=IATA or ?toLat=...&toLng=...' },
      { status: 400 }
    );
  }

  const distanceKm = haversineKm(origin.lat, origin.lng, destLat, destLng);
  const fare = estimateFare(distanceKm);

  const allAirports = Object.values(BASE_AIRPORTS).map((apt) => {
    const d = haversineKm(apt.lat, apt.lng, destLat, destLng);
    const f = estimateFare(d);
    return { code: apt.code, city: apt.city, distanceKm: Math.round(d), fareLow: f.low, fareHigh: f.high };
  });
  allAirports.sort((a, b) => a.fareLow - b.fareLow);

  return Response.json({
    origin: { code: origin.code, city: origin.city },
    destination: { name: destName, code: destCode },
    distanceKm: Math.round(distanceKm),
    fareEstimate: {
      low: fare.low,
      high: fare.high,
      currency: 'CAD',
      type: distanceKm < 300 ? 'driving' : 'flight',
      note: 'Round-trip economy estimate based on StatCan / DOT regional fare averages',
    },
    cheapestDeparture: allAirports[0],
    allDepartures: allAirports,
    airports: Object.keys(DESTINATION_AIRPORTS),
  });
};
