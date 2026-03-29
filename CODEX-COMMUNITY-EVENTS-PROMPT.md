# 3D3D COMMUNITY EVENTS & WORKSHOPS — CODEX MASTER PROMPT
## v2.0 — March 28, 2026

---

## EXECUTION MODEL

**This prompt is engineered for parallel agent fleet execution. ALL work streams launch simultaneously.** There are no sequential phases. Every section in this document is an independent work stream that an agent can pick up and execute in full without waiting on any other section to complete.

**Dependency graph (the ONLY sequencing that matters):**
```
PARALLEL LAUNCH — ALL AT ONCE:
├── STREAM A: Deep Research (all sub-streams parallel)
│   ├── A1: Venue database (NB)
│   ├── A2: Venue database (NS)
│   ├── A3: Venue database (PEI)
│   ├── A4: Venue database (NL)
│   ├── A5: Marina-specific database (all provinces)
│   ├── A6: Recycling & material suppliers
│   ├── A7: Comparable events research
│   ├── A8: Workshop pricing benchmarks
│   ├── A9: Insurance & waivers (all provinces)
│   ├── A10: Maker space inventory
│   ├── A11: Media contacts database
│   ├── A12: Existing festivals/events to piggyback
│   ├── A13: Robotics programs & competitions
│   ├── A14: Municipal community event programs
│   ├── A15: Marina seasonality research
│   ├── A16: 3D printing awareness/adoption data
│   ├── A17: Print shop pricing (flyers, stickers, cards)
│   ├── A18: Event platform evaluation (Zeffy, Eventbrite, etc.)
│   ├── A19: Food vendor regulations by province
│   ├── A20: Accessibility requirements by province
│   └── A21: Material cost research (glue, tape, tools for 50-person event)
│
├── STREAM B: Event & Workshop Design (all parallel)
│   ├── B1: Cardboard Build Battle — full event design
│   ├── B2: Event concept #2 — research and design
│   ├── B3: Event concept #3 — research and design
│   ├── B4: Event concept #4 — research and design
│   ├── B5: Event concept #5 (marine/waterfront specific) — research and design
│   ├── B6: Workshop A curriculum ("Intro to 3D Printing")
│   ├── B7: Workshop B curriculum ("Marine 3D Printing")
│   └── B8: Workshop C curriculum — research and design
│
├── STREAM C: Brand & Asset Creation (all parallel)
│   ├── C1: Logo system
│   ├── C2: Flyers (all types, print-ready)
│   ├── C3: Posters (all types, print-ready)
│   ├── C4: Banners (pull-up, table, digital)
│   ├── C5: Business cards
│   ├── C6: Sticker designs
│   ├── C7: Social media templates (all platforms)
│   ├── C8: Promo gear designs (shirts, hoodies, hats, totes, lanyards, badges)
│   ├── C9: 3D printable trophies (STL files)
│   ├── C10: Certificates (participant + winner)
│   ├── C11: Contest rules documents (all 5 events)
│   ├── C12: Judging scorecards (all 5 events)
│   ├── C13: Photo booth signage/props
│   └── C14: Waiver templates (all types, all provinces)
│
├── STREAM D: Email & Outreach Templates (all parallel)
│   ├── D1: Venue cold outreach email
│   ├── D2: Material supplier outreach email
│   ├── D3: Local business support email
│   ├── D4: Marina operator email
│   ├── D5: Press/media email
│   ├── D6: Post-event follow-up email
│   ├── D7: Town council / municipal recreation email
│   ├── D8: Registration confirmation email
│   ├── D9: Event reminder emails (1 week, 1 day)
│   ├── D10: Post-event thank you email
│   ├── D11: Workshop registration confirmation
│   ├── D12: Workshop prep/materials email
│   ├── D13: Monthly newsletter template
│   └── D14: Follow-up sequence (follow-up #1 at 3 days, #2 at 5 days)
│
├── STREAM E: Pitch Deck (all parallel)
│   ├── E1: General pitch deck
│   ├── E2: Marina operator version
│   ├── E3: Municipal/town council version
│   ├── E4: Educator/school version
│   └── E5: Local business version
│
├── STREAM F: Management Web Application (events.3d3d.ca)
│   ├── F1: Database schema & Supabase setup
│   ├── F2: Contact CRM (CRUD, search, filter, map, pipeline)
│   ├── F3: Email staging & sending system
│   ├── F4: Drag-and-drop package builder
│   ├── F5: Event calendar & scheduling
│   ├── F6: Asset library (browse, preview, download, drag-to-package)
│   ├── F7: Public registration system + Stripe payments
│   ├── F8: Financial tracking
│   ├── F9: Dashboard
│   ├── F10: Task management
│   ├── F11: QR check-in system
│   ├── F12: Mobile PWA optimization
│   └── F13: Map view (all contacts/events on Atlantic Canada map)
│
├── STREAM G: Scheduling & Logistics
│   ├── G1: Year 1 master calendar (April 2026 — March 2027)
│   ├── G2: Fredericton pilot event — exhaustive detail
│   ├── G3: Travel route optimization
│   ├── G4: Weekend format template
│   ├── G5: Weekday workshop schedule template
│   └── G6: 5-year growth plan
│
└── STREAM H: Strategic Documents
    ├── H1: Pricing strategy (backed by A8 research — CAN start with known data, refine when A8 completes)
    ├── H2: Outreach sequencing plan
    └── H3: Fredericton pilot — full operational plan
```

**Where real dependencies exist:**
- G1 (master calendar) is BETTER with A1-A5 venue data but CAN start with known towns and refine
- H1 (pricing) is BETTER with A8 benchmarks but CAN start with a framework and fill in cited numbers
- C11/C12 (rules/scorecards) need B1-B5 event designs — but agents working on B and C can coordinate or C agents can draft templates and finalize when B delivers
- F2-F13 (web app features) depend on F1 (database schema) — F1 ships first, then all others parallel
- D1-D14 (email templates) are BETTER with the pitch deck (E1-E5) ready to attach, but the emails themselves can be written independently

**Everything else is fully parallel. Launch it all. No waiting. No gatekeeping.**

---

## GLOBAL RULES

These rules apply to EVERY agent in the fleet, EVERY work stream, EVERY deliverable.

1. **Every fact, number, venue, price, email, phone number, and contact MUST be cited with a real, verifiable source as of March 2026.** NO assumptions. NO round numbers without sources. NO hallucinated contacts. If a fact cannot be verified, mark it **[UNVERIFIED — NEEDS MANUAL CONFIRMATION]** and move on.

2. **This is a cooperative, grassroots, anti-corporate operation.** We do not submit to corporate sponsorship programs. We do not bow to corporate rules. We do not apply for corporate grants. Revenue comes from: people paying for events, people paying for workshops, and community donations. Local businesses can chip in because they want to — a hardware store donating glue, a pizza shop feeding volunteers, a recycling yard setting aside cardboard. That is community. That is not corporate sponsorship.

3. **Prusa Research is the only external backing.** They recognized a year of daily commitment and are backing community involvement. The mandate: create events, get involved with community. That is it. Everything else is earned locally.

4. **Every city and every town in Atlantic Canada.** Not just the big four. Small coastal towns have money, community spirit, and people who care. Every village with a community hall, marina, library, or fire station is a potential venue.

5. **500+ outreach contacts minimum** across all databases combined.

6. **Light theme only** on any web application — no dark mode. This is an explicit, permanent instruction.

7. **Mobile-first** — Ken runs this from his phone in the field. Every web interface must work perfectly on a phone.

8. **No corporate bullshit in any copy, design, or communication.** Human voice. Direct. Honest. From Ken.

9. **Open source where possible.** The management platform, event templates, workshop curricula — share them so other cooperatives can replicate.

10. **Fredericton is the pilot city.** The Fredericton pilot event must be planned in exhaustive, executable detail.

---

## WHO WE ARE

**3D3D Atlantic Cooperative** — a single-founder specialty fabrication operation run by Ken out of Moncton, New Brunswick, Canada.

- Built from an RV running three printers off a $30/day generator in 35°C heat
- Ten years as a mechanic — engines, performance builds, drag cars
- Offshore sailing: Halifax → Antigua duo passage (cat-one storm, 70-knot sustained, 90-knot gusts — his first sail ever), transatlantics, Rolex Fastnet Race, two-day solo up the Saint John River
- Sailing the 2026 Newport Bermuda Race (120th running) with a Prusa CORE One L printing live onboard — proof of deployment, not marketing
- Prusa recognized a year of daily commitment and is sending their flagship machine
- Open-source, community-first, anti-corporate
- Contact: info@3d3d.ca | 506-953-2678 | ko-fi.com/3d3dca

**3D3D is NOT:**
- A print farm
- A corporate entity
- Looking for corporate sponsorship, grant applications, or brand partnerships with conditions
- Bowing to anyone, ever

**The community events initiative IS:**
- Showing people what 3D printing can actually do — hands on, in their town
- Getting into people's hearts
- Building grassroots community across ALL of Atlantic Canada — every city, every town, every coast
- Creating events that are fun, competitive, educational, and accessible to all ages
- Running workshops that teach real, applicable skills
- Proving that VC interest is booming in this space and there is a real future here

---

## THE MODEL

### Revenue
1. **Paid workshops** — people pay per seat (individuals or teams of 4)
2. **Paid community events** — ticketed entry for competitions and builds
3. **Donations** — Ko-fi, on-site, community support
4. **Local businesses chipping in** — not sponsorship, just neighbours helping neighbours

### Format
- **Weekend model:** One city/town per weekend — workshop + community event
- **Weekday workshops:** Smaller focused sessions at marinas, community centres, maker spaces throughout the week between weekend events
- **Limited spaces:** Focused, intimate, high-quality. Tight groups who actually learn and participate.

### Pricing
The fleet MUST research and establish a defensible base price range backed by cited comparable data from Atlantic Canada as of March 2026. This includes:
- Per-person workshop pricing
- Individual event entry
- Team of 4 event entry
- Family pricing
- Spectator pricing (if applicable)
- Venue rental cost benchmarks by region

---

## STREAM A: DEEP RESEARCH

All A-streams launch simultaneously. Each produces a structured database (CSV-importable) and a summary report with citations.

### A1 — Venue Database: New Brunswick

Research and compile EVERY potential venue across ALL of New Brunswick. Not just cities — every town, every village, every coastal community with usable space.

**Venue types to find:**
- Community centres / recreation centres
- Libraries (most have meeting rooms / event spaces)
- Marinas and yacht clubs
- Marine clubs and boating associations
- Legion halls
- Fire halls (many rent for community events)
- Church halls
- School gymnasiums (after hours rental)
- Municipal parks with covered pavilions
- Co-working spaces
- Maker spaces / fab labs
- College/university event spaces (NBCC, UNB, etc.)
- Museums and heritage centres
- Farmers markets with event space
- Arena lobbies and multi-purpose rooms
- Cultural centres
- Indigenous community centres
- Acadian cultural centres
- Curling clubs (off-season = huge open floor space)
- Sailing clubs
- Community wharves with adjacent buildings

**For EACH venue, capture:**
| Field | Required |
|-------|----------|
| Name | YES |
| Full address | YES |
| Town/city | YES |
| Province | YES (NB for this stream) |
| Phone number | YES — find it |
| Email | YES if available |
| Website | YES if available |
| Capacity | Estimated or confirmed |
| Rental cost (day/half-day) | If findable — CITE SOURCE |
| Type | YES (marina, community centre, library, etc.) |
| Has hosted community events before | If findable |
| Contact person name | If findable |
| Accessibility notes | Wheelchair, parking, kitchen, outdoor space |
| Source URL | YES — where you found this info |

**NB towns to cover (not limited to — find MORE):**
Fredericton, Moncton, Saint John, Miramichi, Bathurst, Campbellton, Edmundston, Woodstock, Sussex, Sackville, Shediac, Bouctouche, Richibucto, St. Andrews, St. George, Grand Manan, Deer Island, Campobello Island, Blacks Harbour, Alma, Caraquet, Shippagan, Tracadie, Neguac, Dalhousie, Jacquet River, Petit-Rocher, Nigadoo, Beresford, Dieppe, Riverview, Oromocto, Gagetown, Jemseg, Grand Bay-Westfield, Quispamsis, Rothesay, Hampton, Sussex Corner, Norton, Petitcodiac, Salisbury, Hillsborough, Hopewell Cape, Harvey, McAdam, St. Stephen, Grand Falls, Perth-Andover, Plaster Rock, Nackawic, Stanley, Doaktown, Blackville, Boisetown, Chipman, Minto, Grand Lake area, Rexton, Rogersville, Eel River Crossing, Bas-Caraquet, Paquetville, Lamèque, Grande-Anse, Bertrand, Saint-Quentin, Kedgwick, Tide Head, Atholville, Charlo, Eel River Dundee, Pont-Landry, Saint-Léonard, Drummond, New Denmark, Bristol, Florenceville-Bristol, Centreville, Hartland, Jacksonville, Upper Woodstock, Canterbury, Benton, Meductic, Prince William, Maugerville, Sheffield, Lakeville Corner, Cambridge-Narrows, Coles Island, Havelock, Elgin, Riverside-Albert, Fundy National Park area, St. Martins, Musquash, Lorneville, Welsford, Hampstead, Wickham, Belleisle Creek, Springfield, Apohaqui, Penobsquis

### A2 — Venue Database: Nova Scotia

Same schema as A1. ALL of Nova Scotia.

**NS towns to cover (not limited to — find MORE):**
Halifax, Dartmouth, Sydney, Glace Bay, New Glasgow, Truro, Amherst, Yarmouth, Shelburne, Lunenburg, Mahone Bay, Chester, Bridgewater, Liverpool, Digby, Annapolis Royal, Wolfville, Kentville, Windsor, Antigonish, Pictou, Tatamagouche, Pugwash, Parrsboro, Springhill, Oxford, Baddeck, Ingonish, Chéticamp, Inverness, Port Hawkesbury, Canso, Guysborough, Sherbrooke, Sheet Harbour, Musquodoboit Harbour, Hubbards, Peggy's Cove area, Sambro, Eastern Passage, Lawrencetown, Porters Lake, Tantallon, Bedford, Lower Sackville, Fall River, Elmsdale, Enfield, Stellarton, Westville, Arisaig, Mulgrave, St. Peter's, Louisbourg, North Sydney, Englishtown, Whycocomagh, Margaree, Pleasant Bay, Meat Cove, Neil's Harbour, Bay St. Lawrence, Dingwall, Iona, Little Narrows, Nyanza, Boularderie, Big Bras d'Or, New Waterford, Dominion, Reserve Mines, Donkin, Gabarus, Main-à-Dieu, Port Morien, Birch Grove, Westmount, Coxheath, Eskasoni, Christmas Island, Grand Narrows, Port Hastings, Judique, Creignish, Mabou, Whycocomagh, Orangedale, Marble Mountain, West Bay, Dundee, River Denys, Scotsburn, River John, Malagash, Wallace, Wentworth, Folly Lake, Great Village, Economy, Five Islands, Advocate Harbour, Apple River, Joggins, Minudie, Nappan, Maccan, Southampton, Tidnish, Port Howe, Murray Corner, Linden, Collingwood Corner, Debert, Brookfield, Stewiacke, Shubenacadie, Milford, Mount Uniacke, Hantsport, Avonport, Grand-Pré, Canning, Blomidon, Scots Bay, Port Williams, New Minas, Coldbrook, Berwick, Middleton, Lawrencetown (Annapolis), Bridgetown, Clementsport, Bear River, Smiths Cove, Sandy Cove, Freeport, Westport, Tiverton, Meteghan, Church Point, Weymouth, Barrington, Clark's Harbour, Cape Sable Island, Lockeport, Jordan Falls, Port Joli, Port Mouton, Hunts Point, Summerville, Port Medway, Mill Village, Western Head, Beach Meadows, Petite Rivière, Riverport, Rose Bay, Blue Rocks, First South, Second Peninsula, Bayport, Indian Point, Martin's River, Mill Cove, East River, Northwest Cove, Blandford, East Dover, West Dover, Prospect, Terence Bay, Ketch Harbour, Herring Cove, Purcell's Cove, Ferguson's Cove, Jeddore, Tangier, Spry Bay, Taylor Head, Liscomb, Ecum Secum, Marie Joseph, Country Harbour, Isaac's Harbour, Goldboro, Tor Bay, Larry's River, Charlos Cove, Port Felix, Queensport, Half Island Cove, Hazel Hill, Little Dover, Fox Island

### A3 — Venue Database: Prince Edward Island

Same schema as A1. ALL of PEI.

**PEI towns to cover (not limited to — find MORE):**
Charlottetown, Summerside, Souris, Montague, Georgetown, Stratford, Cornwall, Kensington, O'Leary, Tignish, Alberton, Borden-Carleton, Murray Harbour, Murray River, Victoria, North Rustico, Cavendish, Brackley Beach, St. Peters, Cardigan, Morell, Mount Stewart, Hunter River, Crapaud, Miscouche, Wellington, Tyne Valley, Lennox Island, Abram-Village, Cape Egmont, Miminegash, Skinners Pond, North Cape, Nail Pond, Jacques Cartier, Palmer Road, Bloomfield, Coleman, Elmsdale (PEI), Port Hill, Grand River, Northam, Richmond, Darnley, Malpeque, New London, Park Corner, French River, New Glasgow (PEI), Wheatley River, Oyster Bed Bridge, Rusticoville, South Rustico, North Wiltshire, Clyde River, Meadow Bank, Bonshaw, DeSable, Tryon, Borden, Augustine Cove, Bedeque, Freetown, Central Bedeque, Emerald, Graham's Road, New Annan, Long River, Stanley Bridge, New Glasgow (PEI), Belfast, Point Prim, Flat River, Wood Islands, Pinette, Vernon Bridge, Orwell, Cherry Valley, Uigg, Kinross, Bridgetown (PEI), Dundas, Poole, Lower Montague, Brudenell, Lorne Valley, Launching, Annandale, Rollo Bay, Fortune Bridge, Dingwells Mills, Bothwell, Murray Road, Little Harbour, Panmure Island, Sturgeon, Gaspereau, Naufrage, North Lake, Elmira, East Point, Basin Head, Red Point, Little Pond, New Harmony, Bear River (PEI), Harmony, Howe Bay, Priest Pond

### A4 — Venue Database: Newfoundland and Labrador

Same schema as A1. ALL of Newfoundland and Labrador.

**NL towns to cover (not limited to — find MORE):**
St. John's, Mount Pearl, Corner Brook, Gander, Grand Falls-Windsor, Stephenville, Carbonear, Harbour Grace, Bay Roberts, Conception Bay South, Paradise, Placentia, Marystown, Burin, Grand Bank, Fortune, Clarenville, Bonavista, Trinity, Twillingate, Lewisporte, Botwood, Deer Lake, Pasadena, Channel-Port aux Basques, Burgeo, Harbour Breton, St. Anthony, L'Anse au Clair, Happy Valley-Goose Bay, Labrador City, Wabush, Nain, Makkovik, Hopedale, Postville, Rigolet, Cartwright, Mary's Harbour, Port Hope Simpson, Charlottetown (NL), St. Lewis, Red Bay, Forteau, L'Anse-au-Loup, Pinware, West St. Modeste, Capstan Island, Lodge Bay, Norman Bay, Black Tickle, Mud Lake, North West River, Sheshatshiu, Natuashish, Churchill Falls, Blanc-Sablon area, St. Barbe, Plum Point, Roddickton, Englee, Conche, Main Brook, Quirpon, L'Anse aux Meadows, Raleigh, Cook's Harbour, St. Julien's, Croque, Fleur de Lys, La Scie, Baie Verte, Springdale, King's Point, Pilley's Island, Little Bay Islands, Long Island (NL), Triton, Brighton, Summerford, Comfort Cove-Newstead, Campbellton (NL), Musgrave Harbour, Fogo, Fogo Island (Tilting, Joe Batt's Arm, Seldom), Change Islands, Wesleyville, Greenspond, Badger's Quay-Valleyfield, Pool's Island, Newtown, Lumsden, Deadman's Bay, Cape Freels, Musgravetown, Lethbridge, Jamestown, Portland, Winter Brook, Sweet Bay, Charleston, Harcourt, Shoal Harbour, Milton, George's Brook, Old Perlican, Heart's Content, Heart's Delight, Whitbourne, Dildo, South Dildo, Blaketown, Markland, Chapel Arm, Long Harbour, Argentia, Dunville, Fox Harbour, Ship Harbour, Southeast Placentia, Jerseyside, Freshwater (Placentia Bay), Point Verde, Lamaline, Allan's Island, Lord's Cove, Point May, Lawn, St. Lawrence, Little St. Lawrence, Terrenceville, English Harbour East, Grand Le Pierre, Bay L'Argent, Pool's Cove, Belleoram, St. Jacques, Coombs Cove, Boxey, Milltown, Head of Bay d'Espoir, St. Alban's, Morrisville, Hermitage, Sandyville, Seal Cove, Pass Island, Gaultois, McCallum, François, Grey River, Ramea, Isle aux Morts, Rose Blanche, Burnt Islands, Codroy, Cape Ray, South Branch, Tompkins, Upper Ferry, St. George's, Flat Bay, Mattis Point, Stephenville Crossing, Kippens, Port au Port, Lourdes, Mainland, Cape St. George, De Grau, Piccadilly, Boswarlos, Abraham's Cove, West Bay (NL), Aguathuna, Fox Island River, Port au Choix, River of Ponds, Hawke's Bay, Parson's Pond, Cow Head, Sally's Cove, Rocky Harbour, Norris Point, Woody Point, Trout River, Wiltondale, Cormack, Reidville, Howley, Buchans, Millertown, Beachside, Bishop's Falls, Norris Arm, Botwood, Northern Arm, Point Leamington, Peterview, Gambo, Hare Bay, Dover, Terra Nova, Eastport, Salvage, Happy Adventure, Sandy Cove (NL), Burnside, St. Brendan's, Traytown, Glovertown, Dark Cove, Cannings Cove, Bloomfield (NL), Charlottetown (Bonavista Bay), King's Cove, Keels, Plate Cove, Open Hall, Tickle Cove, Princeton, Southern Bay, Sweet Bay, Catalina, Port Union, Elliston, Little Catalina, Melrose, English Harbour, Champney's, Trinity East, Hickman's Harbour, Sunnyside, Come By Chance, Arnold's Cove, North Harbour, Swift Current, Garden Cove, Monkstown, Colinet, Mount Carmel, St. Catherine's, St. Bride's, Patrick's Cove, Angel's Cove, Branch, Point Lance, Cuslett, Gooseberry Cove, Trepassey, Portugal Cove South, Biscay Bay, Renews, Fermeuse, Aquaforte, Calvert, Ferryland, Caplin Bay, La Manche, Cape Broyle, Witless Bay, Mobile, Tors Cove, Petty Harbour, Maddox Cove, Goulds, Kilbride, Shea Heights, Southlands, Waterford Valley, Bowring Park area, Kenmount Terrace, Airport Heights, Churchill Park, Quidi Vidi, Signal Hill area, The Battery, Outer Cove, Middle Cove, Logy Bay, Torbay, Flatrock, Pouch Cove, Shoe Cove, Bauline, Portugal Cove-St. Philip's, St. Thomas, Manuels, Long Pond, Kelligrews, Upper Gullies, Seal Cove (CBS), Topsail, Chamberlains, Holyrood, Woodford's, Avondale, Harbour Main, Colliers, Conception Harbour, Kitchuses, Brigus, Cupids, Makinsons, Clarke's Beach, North River, South River, Spaniard's Bay, Tilton, Upper Island Cove, Bishop's Cove, Bryant's Cove, Riverhead (Harbour Grace), Carbonear, Victoria (NL), Perry's Cove, Freshwater (Carbonear), Salmon Cove, Brownsdale, Heart's Delight-Islington, Cavendish (NL), Whiteway, Green's Harbour, Whitbourne, Blaketown, New Harbour, Winterton, Hant's Harbour, New Perlican, Turk's Cove, Sibley's Cove, Lead Cove, Caplin Cove, Old Perlican, Grates Cove, Bay de Verde, Red Head Cove, Lower Island Cove, Job's Cove, Northern Bay, Ochre Pit Cove, Western Bay, Bradley's Cove, Adam's Cove, Blackhead, Broad Cove, Burnt Point, Kingston

### A5 — Marina-Specific Database (All Provinces)

Marinas are a KEY venue type. Separate, focused research on EVERY marina and yacht club across Atlantic Canada.

**For each marina, capture (in addition to standard venue fields):**
- Number of berths/slips
- Whether they have a clubhouse, meeting room, or covered event area
- Whether they host social events, AGMs, or community events
- Haul-out area that could serve as workshop space in shoulder season
- Winter storage facilities (heated buildings = winter workshop space)
- Peak season months (when boaters are around)
- Off-season availability for events
- Marina association memberships (if any)
- Any local boating/sailing community or racing program
- Type: yacht club | municipal marina | private marina | commercial wharf | sailing school | community wharf

**Also research:**
- Provincial marina associations that could facilitate introductions across multiple marinas
- Atlantic Canada boating/sailing community networks
- Sailing schools and programs
- Any existing maritime heritage or marine education programs at marinas

### A6 — Recycling & Material Suppliers (All Provinces)

Research companies and organizations that can supply materials — especially cardboard, foam, packaging materials, wood scraps — donated, at cost, or discounted for community use.

**Search for:**
- **Fero International** (or Fero Waste & Recycling) — actual contact info, what they do, service areas, blem/surplus material availability
- Recycling depots in every province — find the actual ones, with addresses and phone numbers
- Corrugated cardboard manufacturers and distributors in Atlantic Canada
- Packaging companies with seconds/blem inventory
- Waste management companies that sort recyclables
- Construction companies with clean cardboard waste
- Local managers at stores that discard cardboard daily (approach the LOCAL person, not corporate — Costco, Walmart, Home Hardware, Kent Building Supplies in each town)
- Appliance stores (massive cardboard from fridges, stoves, washers)
- Moving companies (used/surplus boxes)
- Print shops (paper/cardboard offcuts)
- Furniture stores (massive cardboard packaging)
- Lumber yards (wood scraps, cardboard packaging)

**For each, capture:** Name, location, full address, phone, email, website, what they can supply, whether they've done community donations/surplus sales before, source URL.

### A7 — Comparable Events Research

Find REAL events that have actually happened — with names, dates, organizers, attendance, pricing, format. Not hypothetical. Documented.

**Search for:**
- Cardboard boat regattas in Canada (these are established — find every one)
- Cardboard building competitions globally (cardboard city, cardboard derby, cardboard car races)
- Mario Kart themed cardboard vehicle builds or push races
- Maker community events tied to 3D printing or fabrication
- 3D printing workshops run at community level (not corporate training sessions)
- Robotics community events and competitions (FIRST Robotics, VEX, AND grassroots ones)
- Hands-on STEM community events in Atlantic Canada specifically
- Events that combined workshops + competitions on the same weekend
- Community build days (Habitat model but for maker projects)
- Repair cafés and fix-it events in Atlantic Canada
- Any events Prusa Research or Prusa community members have organized
- Cardboard Challenge / Caine's Arcade model events
- Rube Goldberg machine competitions
- Bridge building / trebuchet / catapult competitions at community level
- Cosplay/costume build events using fabrication tools

**For each event found, capture:**
| Field | Required |
|-------|----------|
| Event name | YES |
| Organizer | YES |
| Location (city, venue) | YES |
| Date(s) | YES |
| Attendance | If findable |
| Ticket price | If any |
| Format description | YES |
| Materials used | YES |
| Sponsors/supporters | If any — how were they structured? |
| What made it work | YES — lessons |
| What didn't work | If documented |
| Source URL | YES |

### A8 — Workshop Pricing Benchmarks

Find REAL pricing from REAL workshops across Atlantic Canada and comparable Canadian regions. Cite every single number.

**Search for:**
- Maker/fab workshop pricing (per person, per session) in Atlantic Canada
- 3D printing intro workshops anywhere in Canada — what they charge
- Woodworking community workshops in NB, NS, PEI, NL
- Electronics/Arduino/Raspberry Pi workshops
- Craft workshops (pottery, welding, leather, etc.)
- What Brilliant Labs charges (NB/NS — real org, find real pricing)
- Community maker space session fees across Atlantic Canada
- NBCC, NSCC, Holland College, CNA continuing education workshop pricing
- Eventbrite listings for paid workshops in Atlantic Canada (March 2026)
- Robotics camps/workshops pricing
- Kids STEM workshop pricing
- What community colleges charge for single-day professional development

**Deliver:** A pricing comparison table with source URLs for every number.

### A9 — Event Insurance & Waivers (All Provinces)

**For each province (NB, NS, PEI, NL):**
- Event liability insurance costs for small community events (50-100 people) — real broker quotes or cited ranges
- Insurance brokers who serve community events — names, phone numbers, emails
- Standard waiver requirements for physical/contact activities
- Provincial regulations for public events
- What existing community events in the province use for insurance
- Municipal insurance coverage — some municipalities extend coverage to community events held on municipal property (research this)
- Template sources for Canadian event waivers
- Specific requirements for events involving minors
- Photo/video release requirements

### A10 — Maker Space Inventory (All Provinces)

**Find every maker space, fab lab, hackerspace, and community workshop in Atlantic Canada:**
- Name, location, contact info
- What equipment they have (3D printers, laser cutters, CNC, etc.)
- Membership model and pricing
- Whether they host community events or workshops
- Whether they'd be open to partnership or hosting 3D3D events
- Hours of operation
- Source URL

### A11 — Media Contacts Database (All Provinces)

**For every city and town in Atlantic Canada, find:**
- Local newspapers (name, phone, email, editor's name)
- Radio stations (name, phone, community events contact)
- Community TV stations
- Popular local Facebook groups/pages (name, URL, admin if findable)
- Community event listing websites
- Local bloggers or influencers who cover community events
- Tourism board contacts (they promote events)

**This becomes the media outreach database for promoting events.**

### A12 — Existing Festivals & Events to Piggyback

**Find every recurring festival, fair, market, and community event in Atlantic Canada where 3D3D could have a booth, demo, or workshop:**
- Canada Day celebrations (every town has one)
- Seafood festivals (lobster, oyster, mussel, etc.)
- Cultural festivals (Acadian, Mi'kmaq, Celtic, etc.)
- Agricultural fairs and exhibitions
- Farmers markets (weekly — which ones have vendor/demo space?)
- Regattas and sailing events
- Music festivals with vendor areas
- Christmas craft markets
- Community winter carnivals
- Heritage days and homecoming events
- Ribfests, food truck festivals
- Tall ships events
- Provincial exhibitions

**For each:** Name, location, dates, organizer contact, whether they accept vendors/demos, booth cost if applicable, source URL.

### A13 — Robotics Programs & Competitions

**Find every robotics program, club, and competition in Atlantic Canada:**
- FIRST Robotics teams (FRC, FTC, FLL) — team numbers, locations, mentor contacts
- VEX Robotics teams
- School robotics clubs
- Community robotics programs
- University robotics clubs (UNB, Dal, MUN, UPEI, etc.)
- Coding clubs that intersect with physical computing
- Arduino/Raspberry Pi community groups

**These are crossover audiences and potential collaboration partners.**

### A14 — Municipal Community Event Support Programs

**For each municipality/town in Atlantic Canada, research:**
- Does the municipality have a community events program or recreation department?
- Do they provide event space at reduced cost or free for community events?
- Do they have community development grants for grassroots events?
- ACOA (Atlantic Canada Opportunities Agency) — any relevant programs for community/cooperative initiatives (NOT corporate grants — community development programs)
- Provincial community development programs in NB, NS, PEI, NL
- Arts council funding for community events with creative components

**Capture:** Program name, contact, eligibility, amounts, application process, source URL.

### A15 — Marina Seasonality

**Research the actual operating seasons for marinas across Atlantic Canada:**
- When do marinas open/launch boats? (varies by province and location)
- Peak boating months
- When do marinas haul out / close?
- Which marinas operate year-round?
- Best months to approach marina operators (before season starts? during quiet periods?)
- Best months for marina workshops (when boaters are around and available)

### A16 — 3D Printing Awareness & Adoption

**Find any data on 3D printing awareness and adoption in Atlantic Canada or Canada broadly as of 2025-2026:**
- Survey data
- Market reports
- News articles about 3D printing adoption in the region
- School programs that include 3D printing
- Libraries that have 3D printers available (many do — find them)
- Any existing 3D printing community groups in Atlantic Canada

### A17 — Print Shop Pricing

**Find real pricing for printing marketing materials in Atlantic Canada:**
- Flyers (8.5x11 color, quantities of 100, 250, 500, 1000)
- Posters (11x17 color, same quantities)
- Business cards (standard, quantities of 250, 500)
- Stickers (die-cut, 3 inch, quantities of 100, 250, 500)
- Pull-up banners (33x80)
- Table runners (6ft)

**Compare:** Local print shops in Fredericton, Moncton, Halifax vs. online services (Vistaprint, etc.). Real quoted prices with source.

### A18 — Event Platform Evaluation

**Research and evaluate event registration/ticketing platforms as of March 2026:**
- Zeffy (Canadian, reportedly free for nonprofits — verify this, find pricing for cooperatives)
- Eventbrite (pricing, fees)
- Luma / Lu.ma
- Partiful
- Ticket Tailor
- Humanitix (social enterprise model)
- Any Atlantic Canada-specific platforms

**For each:** Pricing/fees, features, ease of use, payment processing, mobile experience, suitability for a grassroots cooperative.

**Also evaluate:** Whether building custom registration (Stream F7) is better than using an existing platform. Honest assessment.

### A19 — Food Vendor Regulations by Province

**If 3D3D events want to have food (food trucks, volunteers cooking, potluck):**
- What are the regulations in NB, NS, PEI, NL?
- What permits are needed?
- What's the difference between having a food truck (their permit) vs. serving food ourselves?
- What about potluck-style events — any regulations?

### A20 — Accessibility Requirements by Province

**For each province:**
- Physical accessibility requirements for public events
- Language requirements (NB is officially bilingual English/French — what does this mean for events?)
- AODA-equivalent legislation in Atlantic provinces
- Accommodations required by law
- Best practices for accessible community events

### A21 — Material Costs for Events

**Research the actual cost of consumable materials for a 50-person cardboard build event:**
- How much hot glue (sticks + guns) does a 50-person event need? What does that cost?
- Packing tape (rolls needed, cost)
- Box cutters / safety knives (quantity, cost)
- Cutting mats
- Rulers / measuring tapes
- Markers / paint
- Zip ties
- String / twine
- Safety glasses
- First aid kit
- Cardboard (quantity needed per team — estimated square footage)

**Find documented cases** from real cardboard build events that list their material costs. Cite them.

---

## STREAM B: EVENT & WORKSHOP DESIGN

All B-streams can launch immediately. B2-B5 agents should research what's been done elsewhere (can overlap with A7 but go deeper into specific concepts) and then design original 3D3D events.

### B1 — Cardboard Build Battle (Full Event Design)

**Concept:** Build your own Mario Kart car (or themed vehicle) out of cardboard. Push battle / race against others.

**Deliver a complete event document including:**
- Event name, tagline, description (marketing copy ready)
- Detailed format: registration → team formation → build phase → competition phase → awards
- Rules (what's allowed, what's not, time limits, dimensions)
- Team structure: teams of 4 and individual entries
- Judging criteria and categories: speed, creativity, durability, crowd favourite, best use of 3D printed parts
- 3D printing integration: custom wheels, axles, decorations, structural connectors, trophies — printed by 3D3D in advance and available as "upgrade parts" teams can earn or select
- Materials list with quantities for 50 people (12 teams of 4 + 2 individuals)
- Materials list with quantities for 100 people
- Setup requirements (tables, space, power, tarps/drop cloths)
- Setup timeline (day before, morning of)
- Teardown timeline
- Staff/volunteer requirements (how many, what roles)
- Safety considerations (box cutter safety, physical push battle rules, protective gear?)
- Waiver requirements
- Pricing: individual entry, team of 4 entry, family pricing, spectator
- Duration: total event time, each phase duration
- What participants take home (their creation, stickers, certificates)
- Social media moments (what's shareable, photo ops, hashtags)
- Rain plan (if outdoor) / space requirements (if indoor)
- Scalability: how to run this for 20 people vs. 50 vs. 100

### B2 — Community Event Concept #2

**Agent: Research what has worked at other maker/community events, then design an original 3D3D event concept that is DIFFERENT from cardboard builds.**

Consider: robotics challenges, bridge/structure building competitions, wearable tech builds, Rube Goldberg machines, catapult/trebuchet launches, marble runs, wind-powered vehicle races, solar-powered device challenges.

**Must involve 3D printing as a visible, integral part.**

Deliver the same complete event document as B1.

### B3 — Community Event Concept #3

**Agent: Design another original concept.** Consider: repair café format (people bring broken items, 3D3D prints replacement parts live), community art installation with 3D printed + recycled materials, scavenger hunt with 3D printed clues/tools/prizes, escape room with 3D printed puzzle components.

Deliver the same complete event document as B1.

### B4 — Community Event Concept #4

**Agent: Design another original concept.** Consider: cosplay/costume building with 3D printed armor and accessories, custom toy/game design and print workshop-competition hybrid, drone building/racing with 3D printed parts, musical instrument building with 3D printed components.

Deliver the same complete event document as B1.

### B5 — Community Event Concept #5 (Marine/Waterfront Specific)

**Agent: Design an event specifically for marina and waterfront venues.** This must tie into the marine environment and 3D3D's sailing/marine expertise.

Consider: cardboard boat regatta (build and race cardboard boats), marine hardware repair challenge, knot-tying + 3D printed marine tool workshop, boat model building competition, marine problem-solving challenge (given a real boat problem, design and print a solution).

Deliver the same complete event document as B1, plus specific marina/waterfront logistics.

### B6 — Workshop A: "Intro to 3D Printing — From Idea to Object"

**Design a complete 2-3 hour workshop curriculum:**
- Hour-by-hour agenda
- Opening: what is 3D printing, who is 3D3D, real-world applications (marine, automotive, field deployment — NOT just trinkets)
- Hands-on: participants design a simple functional object using beginner-friendly CAD (TinkerCAD or similar — research best option as of March 2026)
- Live print: start printing participant designs on Prusa printers
- Materials overview: PLA, PETG, ASA, PETG-CF, PPS, PPA — what each does, where it's used
- Closing: how to get started at home, 3D3D services, community involvement
- Equipment needed (printers, laptops, filament, tools)
- Setup requirements (tables, power outlets, internet if needed)
- Minimum and maximum participants (target: 12-16)
- What participants take home (their printed object, materials guide, 3D3D sticker pack)
- Follow-up: how to stay connected (email list, social, future events)
- Pricing recommendation (cite benchmarks from A8)

### B7 — Workshop B: "Marine 3D Printing — Solve Your Boat Problems"

**Design a complete marina-specific workshop:**
- Specifically for boaters and marina communities
- Participants bring a broken fitting, worn part, or specific boat problem
- Live measuring/documenting the problem
- CAD design of a replacement or solution
- Print in marine-grade material (ASA, PETG-CF)
- Covers: UV stability, saltwater resistance, material selection for marine environments
- Ken's credibility: Halifax → Antigua, transatlantics, Fastnet, Newport Bermuda
- Equipment needed
- Max 8-12 participants (more hands-on, more technical)
- Premium pricing justified by marine-specific expertise
- Full curriculum hour by hour

### B8 — Workshop C (Research and Design)

**Agent: Research what workshop format would fill a gap that A and B don't cover, then design it.**

Consider: kids/youth STEM workshop, educator training (teach teachers to teach 3D printing), automotive restoration workshop, home repair/DIY workshop, small business prototyping workshop, art and sculpture workshop.

Deliver same completeness as B6/B7.

---

## STREAM C: BRAND & ASSET CREATION

All C-streams launch simultaneously. Assets must be consistent with 3D3D brand: `#40C4C4` teal, `#E84A8A` magenta, Outfit display font, DM Sans body, JetBrains Mono data. Light theme. Thick borders. Not corporate. Human.

### C1 — Logo System

Create a complete logo system for 3D3D Community Events:

- **3D3D Community Events** — primary lockup (horizontal, stacked, icon-only)
- **3D3D Workshops** — workshop sub-brand lockup
- **3D3D [Event Name]** — template lockup for each specific event (e.g., "3D3D Cardboard Build Battle")
- Badge/stamp versions for small use (stickers, name tags, watermarks)
- Animated version for digital (CSS/SVG, simple and clean)
- All formats: SVG, PNG (transparent + white bg), PDF
- Color versions: full color, single color (teal), black, white (for dark backgrounds)

### C2 — Flyers (Print-Ready PDFs)

- **General 3D3D Community Events flyer** — what we do, how to get involved, upcoming schedule
- **Per-event flyer template** — fillable fields: event name, date, venue, price, registration link, QR code
- **Workshop flyer template** — fillable fields: workshop name, date, venue, price, what you'll learn
- **"Host Us" flyer** — for venue operators: what we bring, what we need, what's in it for your community
- All at 8.5x11 AND A4 sizes, CMYK, print-ready with bleed and trim marks

### C3 — Posters (Print-Ready PDFs)

- General awareness poster
- Per-event poster template
- Workshop poster template
- All at 11x17 AND A3 sizes, CMYK, print-ready

### C4 — Banners

- Pull-up banner design (33x80 inches) — for display at events and workshops
- Table banner / runner design (6ft table)
- Digital banner variations: Facebook cover, LinkedIn cover, Twitter/X header, YouTube banner, email header

### C5 — Business Cards

- 3D3D Community Events card
- Front: logo, Ken's name, title (Founder / Community Events), phone, email
- Back: QR code to events.3d3d.ca, upcoming event teaser, social handles
- Standard size (3.5x2), print-ready CMYK

### C6 — Sticker Designs

- 3D3D logo die-cut sticker (3 inch)
- "I Built This" participant sticker
- "3D3D Community" round sticker (2.5 inch)
- Event-specific stickers (one per event concept from B1-B5)
- "Powered by Prusa" sticker (subtle, respectful — not a corporate logo slap)
- Laptop sticker pack layout (5-pack)
- All as print-ready vector files with die-cut lines

### C7 — Social Media Templates

**For each platform (Instagram, Facebook, LinkedIn, Twitter/X), create templates for:**
- Event announcement (single image + carousel)
- Workshop announcement
- Countdown series (7 days, 3 days, 1 day, tomorrow, today)
- Event recap / highlights (post-event with photo placeholders)
- Participant testimonial (quote + photo placeholder)
- "Coming to [Town Name]" announcement
- Story/reel templates (vertical 9:16)
- "Save the Date" template
- "Spots Left" urgency template
- "Sold Out" celebration template
- Behind-the-scenes / setup template
- Volunteer call template

All sized correctly per platform. Editable (Figma, Canva, or SVG with clear text replacement zones).

### C8 — Promo Gear Designs

- **T-shirt:** Front — 3D3D Community Events badge. Back — "Built in Atlantic Canada" or event schedule. Vector, print-ready for screen printing.
- **Hoodie:** Same concept, adapted for hoodie layout.
- **Hat/cap:** Embroidery-ready vector (simple, clean, small logo).
- **Tote bag:** Large logo, event tagline.
- **Lanyard:** Event staff/volunteer identification. Includes 3D3D branding.
- **Name badge template:** Participant name, team name, event name. Printable on standard badge stock or insertable badge holder.

### C9 — 3D Printable Trophies (STL Files)

Design and deliver print-ready STL files for:
- First Place trophy
- Second Place trophy
- Third Place trophy
- Creativity Award trophy
- Crowd Favourite trophy
- Best Use of 3D Printing trophy
- Most Durable Build trophy
- Per-event specialty trophies (one unique design per event concept)
- Participant medallion / token (small, printable in bulk)

All optimized for FDM printing on Prusa printers, no supports needed where possible, designed to print well in PLA or PETG.

### C10 — Certificates

- Participant certificate template (fillable: name, event, date, location)
- Winner certificate template (fillable: name, event, category, place, date, location)
- Workshop completion certificate template
- All as editable PDF or SVG with clear text replacement zones
- Print-ready on standard letter paper

### C11 — Contest Rules Documents

One complete rules document per event (B1-B5). Each includes:
- Event overview
- Eligibility (age, team size)
- Registration process
- Materials allowed / not allowed
- Build phase rules (time, tools, help)
- Competition/judging rules
- Judging criteria (weighted)
- Prize categories
- Safety rules
- Code of conduct
- Dispute resolution
- Printable, formatted for handout

### C12 — Judging Scorecards

One scorecard per event (B1-B5):
- Team/individual name field
- Each judging criterion with weight and 1-10 scale
- Notes field
- Total score calculation
- Judge name and signature line
- Printable on standard paper, one team per page

### C13 — Photo Booth Signage & Props

- "3D3D Community Events" photo backdrop design (printable on large format or assembled from tiled prints)
- Handheld props: speech bubbles ("I 3D Printed This!", "Build Battle Champion", event hashtag)
- 3D printable props (goggles, helmets, tools — fun, not functional)
- Frame overlay for social media sharing

### C14 — Waiver Templates

- General event participation waiver (NB law compliant — research required from A9)
- Minor participation waiver (parent/guardian signature)
- Photo/video release waiver
- Combined waiver (participation + photo release on one form)
- Adapted versions for NS, PEI, NL if provincial requirements differ (per A9 research)
- Digital waiver format (for integration into events.3d3d.ca registration — Stream F7)
- All legally reviewed language (flag for actual legal review before use — agent provides best-effort template with **[LEGAL REVIEW REQUIRED]** markers)

---

## STREAM D: EMAIL & OUTREACH TEMPLATES

All D-streams launch simultaneously. Every email must sound like Ken — human, direct, no bullshit, no corporate speak. First person. Short paragraphs. Clear ask.

### D1 — Venue Cold Outreach

**3 subject line variations (A/B testable):**
- Can we bring a 3D printing workshop to [Venue Name]?
- Community event idea for [Town Name] — 5 minutes of your time?
- [Town Name] community event — looking for the right space

**Body structure:**
- Who I am (one sentence — not a bio, not a pitch)
- What 3D3D does (two sentences max)
- What the event looks like (brief, vivid, specific)
- What we need from you (space, tables, power — be specific)
- What your community gets (foot traffic, media coverage, engagement, no cost to you OR fair rental paid)
- Clear ask: 10-minute call or in-person visit
- Sign-off: Ken, 3D3D Atlantic Cooperative, phone, email

**Merge fields:** [Venue Name], [Town Name], [Contact Person First Name], [Event Type], [Proposed Date Range]

### D2 — Material Supplier Outreach

Short. Not asking for money. Asking if they have surplus/blem cardboard or packaging materials they'd set aside for a community build event. We pick up. Community event photos and social mention if they want it. That's the deal.

### D3 — Local Business Support

Not a sponsorship ask. A neighbour asking for help. Specific ask: glue, tape, snacks, use of a truck for an afternoon, whatever the specific need is. In exchange: mention at the event, social media tag, community goodwill. Grassroots.

### D4 — Marina Operator

Specific to marinas. Mentions 3D3D's marine expertise, the offshore sailing credentials, the Newport Bermuda deployment, marine-grade materials. Proposes a marine 3D printing workshop at their facility. What their members get: hands-on experience solving real boat problems with printing.

### D5 — Press/Media

For local newspapers, radio, community Facebook pages, town websites. Event announcement format: who, what, when, where, why it matters to [Town Name]. One compelling quote from Ken. Photo attached or linked. Short enough to be published as-is by a small-town paper.

### D6 — Post-Event Follow-Up

Thank you to venue, participants, supporters. 2-3 photos. Stats (X participants, X objects printed, X teams competed). Ask for a testimonial. Mention next event. Invite them to be part of it again.

### D7 — Town Council / Municipal Recreation

For approaching municipal recreation departments about hosting events in town-owned facilities. Frame: community engagement, STEM education, tourism draw, local economic benefit, zero or minimal cost to municipality, proven event format.

### D8 — Registration Confirmation

Sent automatically when someone registers. Confirms: event name, date, time, venue address, what to bring, what to expect, waiver reminder, contact for questions.

### D9 — Event Reminders

- **1 week before:** Excitement builder. Logistics reminder. What to bring. Share with friends.
- **1 day before:** Final reminder. Address, parking, start time. Weather contingency if applicable.

### D10 — Post-Event Thank You

To all participants. Photos from the event. Winners announced. Link to full photo gallery. How to stay connected. Next event teaser. Ko-fi link for supporters.

### D11 — Workshop Registration Confirmation

Confirms: workshop name, date, time, venue, what's provided, what to bring, skill level expected, waiver.

### D12 — Workshop Prep/Materials Email

Sent 3 days before workshop. What to bring. What we provide. Any pre-workshop prep (install software, bring a broken part, etc.). Directions and parking.

### D13 — Monthly Newsletter Template

Community update format. Upcoming events. Recap of recent events (photos, stats). Spotlight a community member or venue partner. 3D3D news. Ko-fi and social links.

### D14 — Follow-Up Sequences

**Venue outreach sequence:**
1. Initial email (D1) — Day 0
2. Follow-up #1 — Day 3 (shorter, reference first email, add one new detail or photo)
3. Follow-up #2 — Day 8 (shortest, last touch, leave the door open)
4. If response → schedule call/visit → send pitch deck → confirm booking
5. Post-booking → logistics requirements email → event confirmation
6. Post-event → D6 follow-up → ask to rebook

**Material supplier sequence:**
1. Initial (D2) — Day 0
2. Follow-up — Day 5 (even shorter, confirm we'd pick up, zero hassle)

---

## STREAM E: PITCH DECKS

All E-streams launch simultaneously. NOT corporate pitch decks. Human, visual, heartfelt presentations that say: "Here's who we are, here's what happens at our events, here's what we need from you, here's what your community gets."

Each deck: 12-15 slides max. Heavy on photos (from 3D3D workshop/RV/sailing archives + mock-ups of event setups). Minimal text. Ken's voice.

### E1 — General Pitch Deck

For anyone. Covers: who is 3D3D, what are community events, what does an event look like, photos/examples, what we need, what you get, how to get involved. PDF + web-presentable version.

### E2 — Marina Operator Version

Tailored for marina owners/managers. Emphasizes: marine expertise, Newport Bermuda, marine-grade materials, boat problem-solving, what marina members get, how it brings community to your marina in shoulder season or peak season.

### E3 — Municipal / Town Council Version

Tailored for recreation departments and town councils. Emphasizes: community engagement metrics, STEM education value, tourism and foot traffic, zero or minimal cost, proven format, media coverage.

### E4 — Educator / School Version

Tailored for school administrators and teachers. Emphasizes: STEM learning, hands-on education, curriculum alignment, student engagement, robotics crossover, career exposure.

### E5 — Local Business Version

Tailored for local shop owners, hardware stores, restaurants. Emphasizes: what specific help we need (not money — materials, food, use of equipment), what they get (community presence, social media, foot traffic to their business on event day, goodwill).

---

## STREAM F: MANAGEMENT WEB APPLICATION (events.3d3d.ca)

A **task-specific CRM and event management web application** purpose-built for 3D3D Community Events. This is the operational brain.

**Tech stack:**
- Astro 6 with React islands (consistent with 3D3D ecosystem)
- Tailwind CSS v4
- Supabase for database, auth, realtime, storage
- Stripe for payments (already in 3D3D stack)
- Resend for transactional email (already in 3D3D stack)
- Cloudflare Pages deployment
- Mobile-first responsive design
- PWA (installable, offline-capable for viewing cached data)
- Light theme only — NO dark mode

**F1 must complete before F2-F13 launch. F2-F13 are all parallel after F1.**

### F1 — Database Schema & Supabase Setup

Design and deploy the complete database schema:

```
contacts
├── id (uuid)
├── person_name
├── organization_name
├── type (venue | supplier | supporter | media | municipal | marina | school | other)
├── sub_type (community_centre | library | yacht_club | legion | fire_hall | school | marina | curling_club | museum | maker_space | church_hall | arena | park | co_working | cultural_centre | wharf | other)
├── address_full
├── city_town
├── province (NB | NS | PEI | NL)
├── postal_code
├── latitude
├── longitude
├── phone
├── email
├── website
├── capacity (int, nullable)
├── rental_cost_notes (text)
├── contact_person
├── status (not_contacted | outreach_sent | follow_up_1 | follow_up_2 | responded | call_scheduled | visit_scheduled | confirmed | declined | rebook_later)
├── priority (high | medium | low)
├── last_contact_date
├── next_action_date
├── notes (text)
├── tags (text[])
├── source_url
├── created_at
└── updated_at

events
├── id (uuid)
├── name
├── event_type (cardboard_build | event_2 | event_3 | event_4 | marine_event | workshop_a | workshop_b | workshop_c | custom)
├── venue_contact_id (fk → contacts)
├── date_start
├── date_end
├── time_start
├── time_end
├── status (planning | confirmed | promoted | registration_open | sold_out | completed | cancelled)
├── max_participants (int)
├── current_participants (int)
├── price_individual (decimal)
├── price_team (decimal)
├── price_family (decimal)
├── price_spectator (decimal)
├── materials_checklist (jsonb)
├── equipment_checklist (jsonb)
├── staff_volunteers_needed (int)
├── budget_estimated (jsonb — costs breakdown)
├── budget_actual (jsonb — filled post-event)
├── revenue_tickets (decimal)
├── revenue_donations (decimal)
├── revenue_total (decimal)
├── attendance_actual (int)
├── notes (text)
├── public_description (text — for registration page)
├── photos (text[] — storage URLs)
├── created_at
└── updated_at

registrations
├── id (uuid)
├── event_id (fk → events)
├── participant_name
├── email
├── phone
├── team_name (nullable)
├── team_size (int, default 1)
├── pricing_tier (individual | team | family | spectator)
├── amount_paid (decimal)
├── payment_status (pending | paid | refunded)
├── stripe_payment_id
├── waiver_signed (boolean)
├── waiver_signed_at (timestamp)
├── dietary_restrictions (text, nullable)
├── accessibility_needs (text, nullable)
├── checked_in (boolean)
├── checked_in_at (timestamp)
├── qr_code (text — unique check-in code)
├── created_at
└── updated_at

email_sends
├── id (uuid)
├── contact_id (fk → contacts)
├── template_name
├── subject
├── body_html
├── body_text
├── attachments (text[])
├── status (draft | queued | sent | failed | opened | clicked)
├── sent_at
├── opened_at
├── clicked_at
├── resend_message_id
├── created_at
└── updated_at

tasks
├── id (uuid)
├── title
├── description
├── linked_event_id (fk → events, nullable)
├── linked_contact_id (fk → contacts, nullable)
├── due_date
├── status (todo | in_progress | done)
├── priority (high | medium | low)
├── created_at
└── updated_at

assets
├── id (uuid)
├── name
├── category (logo | flyer | poster | banner | sticker | email_template | pitch_deck | waiver | promo_gear | trophy_stl | certificate | social_media | photo | rules | scorecard)
├── file_url (Supabase Storage URL)
├── file_type (pdf | svg | png | stl | html | jpg)
├── tags (text[])
├── description
├── version (int)
├── created_at
└── updated_at

outreach_packages
├── id (uuid)
├── name (e.g., "Marina Outreach Package")
├── description
├── asset_ids (uuid[] — references assets)
├── email_template_id (uuid — references assets where category = email_template)
├── created_at
└── updated_at

financial_records
├── id (uuid)
├── event_id (fk → events, nullable)
├── type (income | expense)
├── category (ticket_sales | workshop_fees | donations | venue_rental | materials | travel | food | printing | marketing | insurance | other)
├── amount (decimal)
├── description
├── date
├── receipt_url (nullable — Supabase Storage)
├── created_at
└── updated_at
```

Row Level Security policies, indexes on commonly queried fields (status, province, type, date fields), and Supabase Storage buckets for assets and photos.

### F2 — Contact CRM

**The core feature.** Full CRUD for contacts with:
- List view with search (full-text across all fields), filter (by type, sub_type, province, city, status, priority, tags), and sort
- Detail view for each contact with full edit capability
- Pipeline/kanban view: cards moving through status stages (not_contacted → outreach_sent → responded → confirmed)
- Bulk actions: select multiple → change status, send email, add tag, export
- Import from CSV (for bulk loading research data from Stream A)
- Export to CSV
- Quick-add form (mobile optimized — met someone, add them in 30 seconds)
- Tag management (create, rename, delete tags)
- Contact activity timeline (emails sent, status changes, notes added — all timestamped)

### F3 — Email Staging & Sending

- Template library: all email templates from Stream D stored as HTML with merge field placeholders
- Template editor: modify templates, preview with sample data
- Compose flow: select contacts → choose template → preview with merge fields populated per contact → edit individual emails → approve → queue → send via Resend
- Batch operations: select 10/25/50/100 contacts → generate personalized emails for each → review → send
- Sent history per contact (visible in contact detail view)
- Basic analytics: sent, opened, clicked (via Resend webhooks)
- Auto-update contact status when email sent (not_contacted → outreach_sent)
- Schedule sends (send at a specific date/time)

### F4 — Drag-and-Drop Package Builder

- Visual interface to assemble outreach packages
- Left panel: asset library (filtered by category — flyers, pitch decks, waivers, etc.)
- Right panel: drop zone for assembling a package
- Drag assets from library into package
- Select an email template as the cover letter
- Save package as a reusable template (e.g., "Marina Outreach Package" = D4 email + E2 pitch deck + C2 marine workshop flyer)
- One-click: apply package to selected contacts → generates personalized emails with attachments → staging for review

### F5 — Event Calendar & Scheduling

- Monthly, weekly, daily calendar views
- Color-coded by event type (workshop = teal, community event = magenta, travel = gray, outreach/tasks = yellow)
- Create/edit events with all fields from schema
- Clone event to new date/venue with one click
- Recurring event support (every Saturday in July, etc.)
- Each calendar entry links to full event detail page
- Event detail page shows: all info, linked venue contact, registrations list, financial summary, tasks, photos
- iCal export / Google Calendar sync

### F6 — Asset Library

- Browse all assets organized by category
- Grid view with thumbnails/previews
- Search and filter by category, tags, file type
- Click to preview (PDF viewer, image viewer, STL 3D preview if possible)
- Download individual files
- Download as ZIP (select multiple)
- Upload new assets (drag-and-drop, mobile camera upload for photos)
- Version history per asset
- Drag assets into outreach packages (connects to F4)
- Storage via Supabase Storage with CDN delivery

### F7 — Public Registration System

**Public-facing pages (no auth required for attendees):**
- Per-event registration page (shareable link: events.3d3d.ca/register/[event-slug])
- Event details: name, date, time, venue with map, description, what to expect, what to bring, pricing
- Registration form: name, email, phone, team name (if applicable), number of participants, pricing tier selection, dietary restrictions, accessibility needs, waiver acceptance (checkbox with full waiver text expandable), digital signature
- Stripe checkout for payment
- Confirmation page with QR code for check-in
- Auto-send confirmation email (D8)
- Auto-send reminders (D9) at 1 week and 1 day
- Waitlist when max capacity reached
- Capacity indicator ("8 of 50 spots remaining")
- Mobile-optimized (most registrations will be from phones via social media links)

### F8 — Financial Tracking

- Per-event financial view: revenue (tickets, workshops, donations) vs. costs (venue, materials, travel, food, printing, insurance)
- Add income/expense line items linked to events
- Running totals across all events
- Monthly and quarterly summary views
- Simple charts: revenue over time, cost breakdown by category, net per event
- Export to CSV for accounting
- Receipt upload and attachment to expense records

### F9 — Dashboard

**The home screen. At a glance, on a phone:**
- Next 3 upcoming events (with status badges: confirmed, registration open, X spots left)
- Outreach pipeline mini-view (counts per stage)
- This week's tasks (due today highlighted, overdue flagged red)
- Revenue this month (total, by event)
- Total contacts in database
- Quick action buttons: "Add Contact", "Create Event", "New Outreach Package", "Add Task"
- Small map of Atlantic Canada with colored pins (confirmed events = teal, pending = yellow, completed = gray)

### F10 — Task Management

- Task list with filter (by status, priority, linked event, linked contact, due date)
- Create task: title, description, due date, priority, link to event and/or contact
- Auto-generated tasks from event planning (when an event is created, generate standard prep tasks: confirm venue, order materials, send promo, etc.)
- Checklist view optimized for mobile (tap to complete)
- Overdue task alerts
- Today view: just today's tasks, sorted by priority

### F11 — QR Check-In System

- Each registration generates a unique QR code
- Check-in page (events.3d3d.ca/checkin/[event-slug]) — staff opens on phone
- Scan QR code with phone camera → marks attendee as checked in
- Manual search fallback (search by name/email if QR doesn't work)
- Real-time count: "32 of 48 registered attendees checked in"
- Prints participant name badge (if connected to printer) or displays on screen for handwritten badge

### F12 — Mobile PWA Optimization

- Service worker for offline access to cached contacts, events, and tasks
- Installable as PWA (Add to Home Screen prompt)
- Bottom navigation bar on mobile: Dashboard | Contacts | Events | Assets | Tasks
- Touch-optimized: large tap targets, swipe actions (swipe contact card to change status)
- Camera integration: upload photos directly from phone camera to event or asset library
- Push notifications (optional) for task reminders and new registrations

### F13 — Map View

- Full Atlantic Canada map (Mapbox or Leaflet — research best free/affordable option as of March 2026)
- Plot all contacts as pins, color-coded by type and status
- Plot all events as pins, color-coded by status
- Click pin → contact or event summary popup → link to full detail
- Filter map by: province, type, status, date range
- Cluster pins at zoom-out levels
- Draw travel routes between scheduled events

---

## STREAM G: SCHEDULING & LOGISTICS

### G1 — Year 1 Master Calendar (April 2026 — March 2027)

Build a complete proposed event schedule. For each entry:
- City/town
- Proposed venue (from Stream A databases — use best candidates, mark as tentative)
- Event type (from Stream B)
- Workshop type (from Stream B) if combined weekend
- Proposed date(s)
- Expected attendance (conservative estimate)
- Pricing (from Stream H1)
- Key logistics notes
- Travel from previous event location

**Structure:**
- April/May 2026: Fredericton pilot (exhaustive detail in G2)
- June 2026: Expand to Moncton, Saint John, one NB coastal town
- July-August 2026: Summer coastal tour — hit as many waterfront towns as possible, piggyback on festivals (from A12)
- September-October 2026: University towns, back-to-school STEM push
- November-December 2026: Indoor season — libraries, community centres, holiday craft markets
- January-March 2027: Winter workshops, planning for Year 2

### G2 — Fredericton Pilot Event (Exhaustive Detail)

The FIRST event. Every single detail planned:
- Exact venue (top 3 candidates from A1, ranked with pros/cons)
- Exact date (propose 2-3 options)
- Event type (recommend which event from B1-B5 is best for a pilot)
- Workshop (which workshop, if combining)
- Minute-by-minute run of show
- Materials list with quantities, sources, and costs (all cited)
- Equipment list (what printers, what tools, what supplies)
- Staff/volunteer plan (how many, what roles, where to find volunteers in Fredericton)
- Marketing plan (which media contacts from A11, what social media push, what flyers/posters and where to post them)
- Registration setup (which platform or custom from F7)
- Budget (every line item, cited costs)
- Contingency plans (rain, low turnout, too much turnout, equipment failure)
- Post-event plan (follow-up emails, photos, social media, debrief)
- Success metrics (what does "this worked" look like?)

### G3 — Travel Route Optimization

Map efficient multi-stop routes through Atlantic Canada for Year 1:
- Fredericton ↔ Saint John (1 hour)
- Moncton ↔ Shediac ↔ Bouctouche (30 min each)
- Moncton ↔ Fredericton (2.5 hours)
- Halifax → South Shore loop (Mahone Bay, Lunenburg, Bridgewater, Shelburne)
- Halifax → Annapolis Valley loop (Windsor, Wolfville, Kentville, Annapolis Royal, Digby)
- Cape Breton circuit (Sydney, Baddeck, Chéticamp, Ingonish)
- North Shore NB (Miramichi, Bathurst, Caraquet, Campbellton)
- PEI circuit (Charlottetown hub, Summerside, North Shore, Eastern PEI)
- Newfoundland: St. John's area, then Avalon, then further

Include: drive times between stops (real, cited from Google Maps), accommodation considerations, vehicle requirements (what vehicle carries all the equipment?).

### G4 — Weekend Format Template

Standard operating procedure for a 3D3D event weekend:

```
FRIDAY
- Travel to city/town (depart time based on distance)
- Venue setup (what time, what tasks, checklist)
- Local media push (drop flyers, social media geo-targeted posts, contact local Facebook group admins)
- Equipment test (printers running, materials staged, power confirmed)

SATURDAY — WORKSHOP DAY
- 08:00 — Arrive, final setup
- 09:00-12:00 — Workshop A or B (12-16 participants)
- 12:00-13:00 — Lunch break, reset
- 13:00-16:00 — Workshop repeat OR Workshop C (different audience)
- 17:00-19:00 — Community mixer / open house (free, builds buzz for Sunday)
- 19:00 — Teardown workshop setup, prep competition setup

SUNDAY — COMMUNITY EVENT DAY
- 08:00 — Setup competition area
- 09:00 — Doors open, registration, team formation
- 09:30-12:00 — Build phase
- 12:00-12:30 — Break, judging walk
- 12:30-14:00 — Competition / races / battles
- 14:00-14:30 — Awards ceremony, group photo
- 14:30-16:00 — Teardown, pack, debrief
- 16:00 — Depart or overnight for Monday workshops

MONDAY-THURSDAY (if staying in region)
- Weekday workshops at marinas, libraries, maker spaces
- Outreach meetings with upcoming venue contacts
- Social media content creation from weekend footage
```

### G5 — Weekday Workshop Schedule Template

For scheduling smaller workshops between weekend events:
- Time slots (morning 9-12, afternoon 1-4, evening 6-9)
- Venue requirements per workshop type
- Minimum participant threshold (don't run for 2 people — what's the minimum?)
- Booking lead time needed
- Cancellation policy

### G6 — 5-Year Growth Plan

**Year 1 (April 2026 — March 2027):**
- Pilot: Fredericton
- Expand across NB and NS
- 20 weekend events, 50+ workshops
- Build database to 500+ contacts
- 30+ recurring venue relationships
- Document everything for replication

**Year 2 (April 2027 — March 2028):**
- Full Atlantic Canada (add PEI and NL fully)
- 40+ events, 100+ workshops
- Volunteer/ambassador program (locals who help run events in their town)
- Explore permanent maker space in one city
- 2 new event types based on Year 1 data
- School board partnerships for STEM

**Year 3 (April 2028 — March 2029):**
- 60+ events, 200+ workshops
- Multiple simultaneous events (trained ambassadors)
- Expand to Maine, USA (cross-border)
- "3D3D Community Kits" — pre-packaged event kits for community-run events
- Revenue goal: fully self-sustaining

**Year 4 (April 2029 — March 2030):**
- 100+ communities across Atlantic Canada + Maine
- "3D3D Community Printer" program — printers in libraries and community centres (Old Girl model scaled)
- Franchise/license model for community kits
- Ambassador training program
- Corporate team-building as a PAID SERVICE (not sponsorship — companies pay us)

**Year 5 (April 2030 — March 2031):**
- 3D3D Community Events is a recognized Atlantic Canadian institution
- Network of community printers across region
- Annual flagship: "3D3D Atlantic Build Battle Championship"
- Model is replicable — other cooperatives license the format
- National expansion exploration
- Documentary or long-form content about the journey

---

## STREAM H: STRATEGIC DOCUMENTS

### H1 — Pricing Strategy

Using data from A8 (workshop benchmarks), A21 (material costs), and A1-A4 (venue costs), establish:
- Workshop per-person pricing (tiered: intro, specialized, premium marine)
- Event entry pricing (individual, team of 4, family, spectator)
- Regional adjustments if needed (does pricing vary between Halifax metro and rural Cape Breton?)
- Early bird vs. regular pricing
- Discount structures (students, seniors, returning participants)
- Break-even analysis per event type (how many attendees needed to cover costs?)
- Revenue projections per event at various attendance levels

**Every number backed by cited comparable data.**

### H2 — Outreach Sequencing Plan

In what order do we contact 500+ venues?
- Fredericton first (pilot city — all venues)
- Then: venues with confirmed community event history (lower friction)
- Then: marinas (unique value prop)
- Then: libraries (usually free or very cheap)
- Then: by geographic cluster (efficient travel)
- Then: remaining venues by priority

Define the weekly outreach cadence: how many new outreach emails per week is sustainable for one person?

### H3 — Fredericton Pilot Operational Plan

The complete, executable plan for the first event. This is the document Ken walks into Fredericton with. It covers:
- Everything from G2 (venue, date, format, budget, marketing, logistics)
- Plus: the week-of checklist (day by day, what to do)
- Plus: day-of emergency contacts (venue manager cell, nearest hospital, hardware store for last-minute supplies)
- Plus: post-event action items (within 24 hours, within 1 week)
- Plus: what to measure and how to decide if the pilot was successful

---

## DELIVERABLES CHECKLIST

When ALL streams complete, the following must exist:

### Research & Data
- [ ] NB venue database (CSV-importable, cited)
- [ ] NS venue database (CSV-importable, cited)
- [ ] PEI venue database (CSV-importable, cited)
- [ ] NL venue database (CSV-importable, cited)
- [ ] Marina-specific database across all provinces (CSV-importable, cited)
- [ ] Material supplier database: 50+ contacts (cited)
- [ ] Comparable events report: 20+ real documented events (cited)
- [ ] Workshop pricing report: 10+ real benchmarks (cited)
- [ ] Insurance research with real broker contacts (per province)
- [ ] Maker space inventory: every maker space in Atlantic Canada
- [ ] Media contacts database: outlets for every city/town
- [ ] Existing festivals/events database: piggyback opportunities
- [ ] Robotics programs inventory
- [ ] Municipal community event programs summary
- [ ] Marina seasonality report
- [ ] 3D printing adoption data
- [ ] Print shop pricing comparison
- [ ] Event platform evaluation
- [ ] Food vendor regulation summary (per province)
- [ ] Accessibility requirements summary (per province)
- [ ] Material cost breakdown for 50-person and 100-person events

### Event & Workshop Designs
- [ ] 5 complete community event designs (B1-B5) with rules, materials, pricing, logistics
- [ ] 3 complete workshop curricula (B6-B8) with hour-by-hour outlines
- [ ] Each with full materials lists, pricing, setup/teardown plans

### Brand & Marketing Assets
- [ ] Logo system (C1) — all formats, all versions
- [ ] Flyers — 4 types, print-ready (C2)
- [ ] Posters — 3 types, print-ready (C3)
- [ ] Banners — pull-up, table, digital (C4)
- [ ] Business cards — print-ready (C5)
- [ ] Stickers — 6+ designs, die-cut ready (C6)
- [ ] Social media templates — all platforms, all use cases (C7)
- [ ] Promo gear designs — shirts, hoodies, hats, totes, lanyards, badges (C8)
- [ ] 3D printable trophies — STL files, all categories (C9)
- [ ] Certificates — participant + winner templates (C10)
- [ ] Contest rules — 5 documents (C11)
- [ ] Judging scorecards — 5 scorecards (C12)
- [ ] Photo booth signage/props (C13)
- [ ] Waiver templates — all types, all provinces (C14)

### Email & Outreach
- [ ] 14 email templates (D1-D14) — ready to send with merge fields
- [ ] Follow-up sequences defined
- [ ] All stored as HTML in the management app

### Pitch Decks
- [ ] 5 pitch deck versions (E1-E5) — PDF + web-presentable

### Web Application (events.3d3d.ca)
- [ ] Supabase schema deployed (F1)
- [ ] Contact CRM with CRUD, search, filter, map, pipeline, import/export (F2)
- [ ] Email staging and sending with templates, merge fields, batch ops (F3)
- [ ] Drag-and-drop package builder (F4)
- [ ] Event calendar with CRUD, clone, recurring, color-coded (F5)
- [ ] Asset library with browse, preview, download, drag-to-package (F6)
- [ ] Public registration system with Stripe payments, QR codes, waitlist (F7)
- [ ] Financial tracking per event and overall (F8)
- [ ] Dashboard with metrics, map, quick actions (F9)
- [ ] Task management linked to events and contacts (F10)
- [ ] QR check-in system (F11)
- [ ] Mobile PWA with offline, bottom nav, camera upload (F12)
- [ ] Map view with all contacts and events (F13)

### Strategic Documents
- [ ] Pricing strategy with cited benchmarks (H1)
- [ ] Outreach sequencing plan (H2)
- [ ] Fredericton pilot operational plan — exhaustively detailed (H3)
- [ ] Year 1 master calendar (G1)
- [ ] Travel route optimization (G3)
- [ ] Weekend format SOP (G4)
- [ ] Weekday workshop schedule template (G5)
- [ ] 5-year growth plan (G6)

---

## FINAL NOTE

This is not a side project. This is not a nice-to-have. This is the core of what 3D3D was backed to do — create events, get involved with community, show people what 3D printing can do, and build something real across Atlantic Canada.

Every agent in this fleet treats this with the seriousness it demands. No filler. No placeholders. No "TBD." No assumptions. Dig deep. Cite everything. Build it right.

— Ken, 3D3D Atlantic Cooperative
March 28, 2026
