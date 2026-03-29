/**
 * Service area definitions for city landing pages.
 *
 * Each entry produces a unique /3d-printing-[slug]/ page.
 * Content is genuinely different per city — tied to real industries,
 * geography, and use cases. NOT doorway pages.
 */

export interface ServiceArea {
  slug: string;
  city: string;
  province: string;
  provinceShort: string;
  country: string;
  /** Shipping estimate from Fredericton NB */
  shippingEstimate: string;
  /** What makes this city relevant to 3D printing services */
  regionContext: string;
  /** Industries in this city that need 3D printing */
  industries: { name: string; useCase: string }[];
  /** Unique paragraph about why 3D3D serves this area */
  whyWeServe: string;
  /** FAQ specific to this city */
  faqs: { question: string; answer: string }[];
  /** Nearby cities to cross-link */
  nearby: string[];
  /** Lat/lng for schema */
  geo: { lat: number; lng: number };
}

export const SERVICE_AREAS: ServiceArea[] = [
  // ── ATLANTIC CANADA (home turf) ─────────────────────────
  {
    slug: 'fredericton',
    city: 'Fredericton',
    province: 'New Brunswick',
    provinceShort: 'NB',
    country: 'Canada',
    shippingEstimate: 'Same-day local pickup or next-day delivery',
    regionContext: 'Home base. 3D3D operates out of Fredericton — this is where the printers run, the parts ship from, and where you can walk in for a consultation. The Saint John River corridor has a growing maker and tech community, and UNB\'s engineering faculty creates steady demand for prototyping.',
    industries: [
      { name: 'University & Research', useCase: 'Prototyping for UNB and STU engineering, biology, and forestry research labs.' },
      { name: 'Government & Defence', useCase: 'Custom fixtures, tool holders, and equipment mounts for CFB Gagetown and provincial operations.' },
      { name: 'Forestry & Agriculture', useCase: 'Replacement parts for equipment that\'s out of production. Brackets, guards, housings.' },
      { name: 'Marine & River', useCase: 'Hardware for the Saint John River boating community. Cleats, fairleads, custom mounts.' },
    ],
    whyWeServe: 'This is home. Local pickup, same-day turnaround on urgent jobs, and face-to-face project consultations. No shipping delays, no guesswork.',
    faqs: [
      { question: 'Can I pick up my order in Fredericton?', answer: 'Yes. Local pickup is available by appointment. Most orders are ready within 24-48 hours.' },
      { question: 'Do you offer on-site consultations?', answer: 'Yes. For complex projects, we can meet in person to review parts, take measurements, and discuss material options.' },
    ],
    nearby: ['moncton', 'saint-john', 'halifax'],
    geo: { lat: 45.9636, lng: -66.6431 },
  },
  {
    slug: 'moncton',
    city: 'Moncton',
    province: 'New Brunswick',
    provinceShort: 'NB',
    country: 'Canada',
    shippingEstimate: 'Next-day delivery via ground',
    regionContext: 'Moncton sits at the crossroads of the Maritimes — the logistics hub of Atlantic Canada. The city\'s aerospace sector (including the NB Aerospace Cluster), its growing tech corridor, and proximity to the Northumberland Strait fishing fleet all create demand for custom parts that simply don\'t exist in catalogues.',
    industries: [
      { name: 'Aerospace & Aviation', useCase: 'Jigs, fixtures, and non-structural prototype components for MRO operations and component design.' },
      { name: 'Transportation & Logistics', useCase: 'Custom brackets, cable management, dashboard mounts for fleet vehicles.' },
      { name: 'Fishing & Aquaculture', useCase: 'Salt-resistant hardware in ASA and PETG-CF for boats operating in the Northumberland Strait.' },
      { name: 'Tech & Startups', useCase: 'Rapid prototyping for hardware startups in the Moncton-Dieppe tech corridor.' },
    ],
    whyWeServe: 'Two hours from our shop. Ground shipping arrives next day. Moncton\'s aerospace and logistics industries need parts that don\'t exist off the shelf — that\'s exactly what we do.',
    faqs: [
      { question: 'How fast can I get a part in Moncton?', answer: 'Next-day ground delivery from Fredericton. Rush orders can be courier\'d same-day.' },
      { question: 'Do you work with aerospace companies?', answer: 'Yes. We print jigs, fixtures, and prototype components in engineering-grade materials including PC Blend, PETG-CF, and Nylon CF.' },
    ],
    nearby: ['fredericton', 'saint-john', 'halifax', 'charlottetown'],
    geo: { lat: 46.0878, lng: -64.7782 },
  },
  {
    slug: 'saint-john',
    city: 'Saint John',
    province: 'New Brunswick',
    provinceShort: 'NB',
    country: 'Canada',
    shippingEstimate: 'Next-day delivery via ground',
    regionContext: 'Canada\'s oldest incorporated city and a deep-water port. Saint John\'s shipbuilding heritage, Irving\'s industrial operations, and the Bay of Fundy\'s extreme marine environment create unique fabrication demands — parts that survive salt, tide, and industrial abuse.',
    industries: [
      { name: 'Shipbuilding & Marine', useCase: 'Through-hull fittings, custom cleats, equipment mounts for vessels operating in Bay of Fundy conditions.' },
      { name: 'Oil & Gas / Industrial', useCase: 'Tool holders, valve handles, protective covers, and custom brackets for refinery and plant maintenance.' },
      { name: 'Heritage & Restoration', useCase: 'Reproduction hardware for heritage buildings, vintage marine equipment, and museum displays.' },
    ],
    whyWeServe: 'The Bay of Fundy is one of the most demanding marine environments on Earth. Parts that survive here survive anywhere. We know this water.',
    faqs: [
      { question: 'What materials work for Bay of Fundy conditions?', answer: 'ASA for UV and salt exposure above deck. PP Glass Fiber for submerged or constant-water applications. Both tested in Atlantic conditions.' },
    ],
    nearby: ['fredericton', 'moncton', 'halifax'],
    geo: { lat: 45.2733, lng: -66.0633 },
  },
  {
    slug: 'halifax',
    city: 'Halifax',
    province: 'Nova Scotia',
    provinceShort: 'NS',
    country: 'Canada',
    shippingEstimate: '1-2 business days via ground',
    regionContext: 'Halifax is the military and maritime capital of Atlantic Canada. The Royal Canadian Navy, the Halifax Shipyard (Irving), the ocean technology cluster, and Dalhousie University\'s engineering programs all drive demand for custom fabrication that moves faster than traditional supply chains.',
    industries: [
      { name: 'Naval & Defence', useCase: 'Custom fixtures, mounting hardware, and prototype components for shipboard systems and maintenance.' },
      { name: 'Ocean Technology', useCase: 'Housings, brackets, and functional prototypes for subsea equipment, sensors, and ROV components.' },
      { name: 'University & Medical', useCase: 'Research prototyping for Dalhousie engineering, NSCAD design programs, and IWK Health Centre.' },
      { name: 'Offshore Sailing', useCase: 'Race-grade hardware for Halifax\'s competitive sailing community. Tested on transatlantic passages.' },
    ],
    whyWeServe: 'Halifax is where Atlantic Canada meets the open ocean. We\'ve sailed out of this harbour, we know the fleet, and we ship here in two days flat.',
    faqs: [
      { question: 'Do you serve the Halifax Shipyard?', answer: 'We serve anyone who needs custom parts. If you\'re working on vessels or marine systems and need parts faster than traditional procurement, we can help.' },
      { question: 'Can you print ocean-rated components?', answer: 'Yes. ASA, PP Glass Fiber, and Nylon CF are all rated for marine environments. We\'ve tested parts on offshore sailing passages.' },
    ],
    nearby: ['moncton', 'saint-john', 'charlottetown', 'st-johns'],
    geo: { lat: 44.6488, lng: -63.5752 },
  },
  {
    slug: 'charlottetown',
    city: 'Charlottetown',
    province: 'Prince Edward Island',
    provinceShort: 'PE',
    country: 'Canada',
    shippingEstimate: '1-2 business days via ground',
    regionContext: 'PEI\'s capital is small but its fishing, agriculture, and tourism industries drive real demand for custom parts. When a lobster boat needs a replacement part mid-season and the manufacturer is six weeks out, that\'s where we come in.',
    industries: [
      { name: 'Fishing & Lobster', useCase: 'Replacement hardware for fishing vessels. Gauge holders, bait tray components, nav light mounts.' },
      { name: 'Agriculture & Food Processing', useCase: 'Custom parts for potato processing equipment, greenhouse fixtures, and farm machinery.' },
      { name: 'Tourism & Heritage', useCase: 'Reproduction hardware, display mounts, and signage components for PEI\'s tourism infrastructure.' },
    ],
    whyWeServe: 'Island supply chains are slow by nature. We ship to PEI in two days and print parts that would take weeks to source from a mainland supplier.',
    faqs: [
      { question: 'How do you ship to PEI?', answer: 'Standard ground shipping from Fredericton. Parts arrive in 1-2 business days. Express courier available for rush jobs.' },
    ],
    nearby: ['moncton', 'halifax'],
    geo: { lat: 46.2382, lng: -63.1311 },
  },
  {
    slug: 'st-johns',
    city: "St. John's",
    province: 'Newfoundland and Labrador',
    provinceShort: 'NL',
    country: 'Canada',
    shippingEstimate: '2-3 business days',
    regionContext: 'The oldest city in North America, perched on the edge of the Atlantic. St. John\'s offshore oil industry, Memorial University\'s engineering research, and one of the most active fishing fleets in Canada all need parts that don\'t exist in any catalogue.',
    industries: [
      { name: 'Offshore Oil & Gas', useCase: 'Custom brackets, tool holders, protective covers, and prototype components for platform and vessel maintenance.' },
      { name: 'Commercial Fishing', useCase: 'Replacement hardware for fishing vessels operating in North Atlantic conditions. Parts built to survive.' },
      { name: 'University & Research', useCase: 'Prototyping for Memorial University engineering, ocean sciences, and cold-ocean research programs.' },
    ],
    whyWeServe: 'Newfoundland is the hardest environment in Canada. If a part works here, it works everywhere. We ship in 2-3 days — faster than any mainland supply chain.',
    faqs: [
      { question: 'Can parts survive Newfoundland winters?', answer: 'Yes. Nylon CF handles -40C. TPU maintains impact resistance to -50C. We select materials for the actual conditions your part will face.' },
    ],
    nearby: ['halifax'],
    geo: { lat: 47.5615, lng: -52.7126 },
  },

  // ── MAJOR CANADIAN CITIES ───────────────────────────────
  {
    slug: 'toronto',
    city: 'Toronto',
    province: 'Ontario',
    provinceShort: 'ON',
    country: 'Canada',
    shippingEstimate: '2-3 business days',
    regionContext: 'Canada\'s largest city and its manufacturing heartland. Toronto\'s product design studios, film production houses, architecture firms, and automotive aftermarket industry all need rapid fabrication — and most local 3D printing services are backed up or overpriced.',
    industries: [
      { name: 'Product Design & Startups', useCase: 'Functional prototypes, fit-check models, and pre-production samples for hardware startups and design agencies.' },
      { name: 'Film & Television', useCase: 'Props, set pieces, costume components, and specialty hardware for Toronto\'s film and TV production industry.' },
      { name: 'Architecture & Construction', useCase: 'Scale models, custom fixtures, and prototype building components.' },
      { name: 'Automotive Aftermarket', useCase: 'Discontinued parts, custom brackets, and interior components for classic and modified vehicles.' },
    ],
    whyWeServe: 'Toronto has 3D printing services — but most are print farms running PLA on consumer machines. We print in engineering compounds on professional Prusa hardware with operator expertise behind every job.',
    faqs: [
      { question: 'Why use 3D3D instead of a Toronto-based service?', answer: 'We print in 12+ engineering materials including ASA, Nylon CF, PC, and PEI. Most Toronto services offer PLA and basic PETG. Our parts are field-tested in marine and motorsport conditions.' },
      { question: 'How fast is shipping to Toronto?', answer: '2-3 business days standard. Express overnight available.' },
    ],
    nearby: ['ottawa', 'montreal'],
    geo: { lat: 43.6532, lng: -79.3832 },
  },
  {
    slug: 'montreal',
    city: 'Montreal',
    province: 'Quebec',
    provinceShort: 'QC',
    country: 'Canada',
    shippingEstimate: '1-2 business days',
    regionContext: 'Montreal\'s aerospace industry (Bombardier, Pratt & Whitney, Bell Helicopter), its world-class engineering schools (McGill, ETS, Polytechnique), and a thriving maker community make it one of the most technically demanding markets in Canada.',
    industries: [
      { name: 'Aerospace', useCase: 'Prototype fixtures, jigs, and non-structural test components for MRO and component manufacturers.' },
      { name: 'Motorsport', useCase: 'Custom parts for the Formula 1 Canadian Grand Prix community, karting teams, and performance automotive.' },
      { name: 'Engineering Research', useCase: 'Rapid prototyping for McGill, ETS, and Polytechnique research labs.' },
      { name: 'Creative Industries', useCase: 'Custom fabrication for Cirque du Soleil-style production, art installations, and design studios.' },
    ],
    whyWeServe: 'Montreal is closer to Fredericton than most people realize — 1-2 day shipping. The city\'s aerospace and engineering sectors need materials beyond PLA, and we deliver.',
    faqs: [
      { question: 'Do you serve Montreal in French?', answer: 'We communicate in English. All technical documentation, order confirmations, and shipping info are in English. We serve the job, not the language barrier.' },
    ],
    nearby: ['ottawa', 'toronto'],
    geo: { lat: 45.5017, lng: -73.5673 },
  },
  {
    slug: 'ottawa',
    city: 'Ottawa',
    province: 'Ontario',
    provinceShort: 'ON',
    country: 'Canada',
    shippingEstimate: '1-2 business days',
    regionContext: 'The capital. Ottawa\'s defence procurement ecosystem, the National Research Council, Carleton and uOttawa engineering programs, and the Kanata tech corridor all generate demand for rapid prototyping and custom fabrication.',
    industries: [
      { name: 'Defence & Government', useCase: 'Custom fixtures, equipment mounts, and prototype components for DND procurement and CAF maintenance.' },
      { name: 'Technology', useCase: 'Hardware prototyping for Kanata-based tech companies. Enclosures, mounts, sensor housings.' },
      { name: 'Research & Academia', useCase: 'Prototyping for NRC, Carleton, and uOttawa engineering and science research.' },
    ],
    whyWeServe: 'Ottawa is an overnight ship from Fredericton. Government and defence procurement timelines are long — we cut through that with 24-48 hour turnaround.',
    faqs: [
      { question: 'Can you work with government purchase orders?', answer: 'Yes. We accept POs and provide invoices with GST/HST registration numbers.' },
    ],
    nearby: ['montreal', 'toronto'],
    geo: { lat: 45.4215, lng: -75.6972 },
  },
  {
    slug: 'vancouver',
    city: 'Vancouver',
    province: 'British Columbia',
    provinceShort: 'BC',
    country: 'Canada',
    shippingEstimate: '3-5 business days',
    regionContext: 'Vancouver\'s marine industry, film production sector, and tech startup ecosystem are among the most active in Canada. The city\'s sailing community — from False Creek to the Georgia Strait — is exactly the kind of client we built this business for.',
    industries: [
      { name: 'Marine & Sailing', useCase: 'Custom hardware for Pacific coast sailing. Cleats, fairleads, winch components, nav instrument mounts.' },
      { name: 'Film & VFX', useCase: 'Props, miniatures, costume elements, and set hardware for Vancouver\'s massive film production industry.' },
      { name: 'Tech & Hardware Startups', useCase: 'Functional prototypes and short-run production in engineering materials.' },
    ],
    whyWeServe: 'Coast to coast. We\'ve sailed the Atlantic — Vancouver\'s Pacific sailing community faces the same fabrication problems with the same dead supply chains. We ship in 3-5 days.',
    faqs: [
      { question: 'Is shipping to Vancouver expensive?', answer: 'Standard ground shipping is included in quotes over $150. Express air is available for rush jobs.' },
    ],
    nearby: ['calgary'],
    geo: { lat: 49.2827, lng: -123.1207 },
  },
  {
    slug: 'calgary',
    city: 'Calgary',
    province: 'Alberta',
    provinceShort: 'AB',
    country: 'Canada',
    shippingEstimate: '3-4 business days',
    regionContext: 'Calgary\'s oil and gas industry, its rodeo and western heritage culture, and a growing tech sector create unique fabrication needs. When equipment needs a custom part and the manufacturer is overseas, turnaround time is everything.',
    industries: [
      { name: 'Oil & Gas', useCase: 'Custom tool holders, protective covers, valve handles, and maintenance fixtures for field operations.' },
      { name: 'Agriculture & Ranching', useCase: 'Replacement parts for farm equipment, custom mounts, and irrigation system components.' },
      { name: 'Automotive & Motorsport', useCase: 'Custom brackets, interior components, and restoration parts for Calgary\'s car culture.' },
    ],
    whyWeServe: 'Alberta\'s oil patch breaks things that don\'t exist in catalogues anymore. We print replacement parts in materials that handle the cold, the chemicals, and the abuse.',
    faqs: [
      { question: 'Can parts handle Alberta winters?', answer: 'Yes. Nylon CF and PC Blend maintain structural integrity in extreme cold. TPU stays flexible to -50C.' },
    ],
    nearby: ['vancouver', 'toronto'],
    geo: { lat: 51.0447, lng: -114.0719 },
  },

  // ── INTERNATIONAL ───────────────────────────────────────
  {
    slug: 'united-states',
    city: 'United States',
    province: '',
    provinceShort: '',
    country: 'United States',
    shippingEstimate: '3-7 business days (USPS/UPS)',
    regionContext: 'We ship to all 50 states. American sailors, car restorers, and engineers face the same dead supply chains as Canadians — discontinued parts, overseas manufacturers with 8-week lead times, and local print shops that only run PLA. We solve that.',
    industries: [
      { name: 'Marine & Sailing', useCase: 'Custom hardware for East Coast, Gulf Coast, and Pacific sailing communities. Race-grade, offshore-tested.' },
      { name: 'Automotive Restoration', useCase: 'Parts for American muscle cars, classics, and vintage vehicles. The parts nobody makes anymore.' },
      { name: 'Small Business & Makers', useCase: 'Short-run production, prototyping, and custom fabrication for American small businesses and maker operations.' },
    ],
    whyWeServe: 'We\'ve sailed American waters, raced out of American harbours, and shipped to every coast. Cross-border shipping is routine — parts clear customs and arrive in 3-7 days.',
    faqs: [
      { question: 'Are there customs fees shipping to the US?', answer: 'Most 3D printed parts fall under de minimis thresholds. We mark shipments accurately. Duties are rare for the types of parts we produce.' },
      { question: 'What currency do you charge in?', answer: 'Quotes are in CAD. We accept USD via PayPal or credit card at the current exchange rate.' },
    ],
    nearby: ['toronto', 'montreal', 'vancouver'],
    geo: { lat: 39.8283, lng: -98.5795 },
  },
];
