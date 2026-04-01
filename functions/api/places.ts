/**
 * Cloudflare Pages Function — Address autocomplete via Nominatim (OpenStreetMap).
 * No API key. Nominatim: max 1 req/sec, identify via User-Agent.
 *
 * GET /api/places?q=123+Main+St+Toronto
 */

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    house_number?: string;
    road?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    province?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
}

export const onRequestGet: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('q');

  if (!query || query.length < 3) {
    return Response.json({ results: [] });
  }

  const nominatimUrl = new URL('https://nominatim.openstreetmap.org/search');
  nominatimUrl.searchParams.set('q', query);
  nominatimUrl.searchParams.set('format', 'jsonv2');
  nominatimUrl.searchParams.set('addressdetails', '1');
  nominatimUrl.searchParams.set('limit', '5');
  nominatimUrl.searchParams.set('countrycodes', 'ca,us');

  const res = await fetch(nominatimUrl.toString(), {
    headers: {
      'User-Agent': '3D3D-Platform/1.0 (https://3d3d.ca; info@3d3d.ca)',
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    return Response.json({ results: [], error: 'Geocoder unavailable' }, { status: 502 });
  }

  const raw: NominatimResult[] = await res.json();

  const results = raw.map((r) => ({
    id: r.place_id,
    display: r.display_name,
    lat: parseFloat(r.lat),
    lng: parseFloat(r.lon),
    street: [r.address?.house_number, r.address?.road].filter(Boolean).join(' '),
    city: r.address?.city || r.address?.town || r.address?.village || '',
    province: r.address?.state || r.address?.province || '',
    postcode: r.address?.postcode || '',
    country: r.address?.country || '',
    countryCode: r.address?.country_code || '',
  }));

  return Response.json({ results });
};
