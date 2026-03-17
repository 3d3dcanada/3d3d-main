import type {
  CatalogCategory,
  CatalogCategoryMeta,
  CatalogItem,
  CatalogMaterialPricing,
  CatalogPurchaseOption,
  Material,
} from './types';

const CDN = '';

const gallery = (slug: string, count: number) =>
  Array.from({ length: count }, (_, index) => `${CDN}/shop/products/${slug}/${String(index + 1).padStart(2, '0')}.webp`);

const withLead = (lead: string, images: string[]) => [lead, ...images.filter((image) => image !== lead)];

const memoriesCoastersGallery = gallery('memories-coasters', 8);
const brokenDrawerGallery = gallery('broken-drawer', 5);
const coinVortexGallery = gallery('coin-vortex', 6);
const cryptexGallery = gallery('cryptex', 4);
const memoryBookGallery = gallery('memory-book', 8);
const pillClickGallery = gallery('pill-click', 8);
const prrTagonGallery = gallery('prr-tagon', 6);
const secretNoteGallery = gallery('secret-note', 10);
const waveHolderGallery = gallery('wave-holder', 5);
const minecraftGallery = gallery('string-flex-minecraft', 11);
const easterGallery = gallery('string-flex-easter', 4);
const flameRevealGallery = gallery('flame-reveal', 11);
const minersBoxGallery = withLead(`${CDN}/shop/products/string-flex-minecraft/07.webp`, [
  `${CDN}/shop/products/string-flex-minecraft/08.webp`,
  `${CDN}/shop/products/string-flex-minecraft/06.webp`,
]);

const roundMoney = (value: number) => Number(value.toFixed(2));

const createOption = (
  id: string,
  label: string,
  pricing: CatalogMaterialPricing[],
  description?: string,
  isDefault = false,
): CatalogPurchaseOption => ({
  id,
  label,
  description,
  pricing,
  isDefault,
});

const plaAndPetgPricing = (plaPrice: number): CatalogMaterialPricing[] => [
  { material: 'PLA', price: roundMoney(plaPrice), isDefault: true },
  { material: 'PETG', price: roundMoney(plaPrice * 1.09) },
];

const petgOnlyPricing = (petgPrice: number): CatalogMaterialPricing[] => [
  { material: 'PETG', price: roundMoney(petgPrice), isDefault: true },
];

export const CATALOG: CatalogItem[] = [
  {
    id: 'memories-coasters',
    name: 'Memories Coasters',
    description:
      '3D printed Polaroid-style coaster set paired with a camera-inspired dispenser that presents each coaster like an instant photo. Designed to turn a practical tabletop essential into a nostalgic display piece for coffee tables, office desks, and gift bundles. Made for retro home decor, conversation-starting hosting setups, and everyday surface protection with a playful vintage look.',
    seoTitle: 'Memories Coasters Polaroid-Style 3D Printed Coaster Set',
    seoDescription:
      'Retro Polaroid-style 3D printed coaster set with a camera-inspired holder, designed for coffee tables, desks, gifts, and nostalgic home decor.',
    seoKeywords: [
      'polaroid coaster set',
      '3d printed coasters canada',
      'retro coaster gift',
      'camera coaster holder',
      'coffee table coaster set',
    ],
    category: 'home-decor',
    grams: 170.76,
    hours: 14,
    material: 'PLA',
    colors: ['Mixed'],
    basePrice: 74.99,
    purchaseOptions: [
      createOption('set', 'Set', plaAndPetgPricing(74.99), undefined, true),
    ],
    images: memoriesCoastersGallery,
    tags: ['coasters', 'polaroid', 'retro decor', 'tabletop', 'gift', '3d printed coasters'],
    makerNote: 'Sold as the full coaster-and-dispenser set shown in the gallery.',
  },
  {
    id: 'broken-drawer-mini-cabinet',
    name: 'Broken Drawer Mini Cabinet',
    description:
      '3D printed mini cabinet with one clean drawer and one fractured front panel for a surreal broken-furniture look. Designed as a functional decor piece for rings, pins, paper clips, and other small desk or shelf essentials. Made for display-first organization in home offices, bookshelves, nightstands, and gift-ready decor collections.',
    seoTitle: 'Broken Drawer Mini Cabinet 3D Printed Desk Organizer',
    seoDescription:
      'Surreal 3D printed mini cabinet with working drawer storage, designed for desk organization, shelf decor, rings, pins, and small accessories.',
    seoKeywords: [
      'broken drawer mini cabinet',
      '3d printed desk organizer',
      'mini drawer decor',
      'surreal shelf decor',
      'small catchall storage',
    ],
    category: 'home-decor',
    grams: 67.99,
    hours: 7,
    material: 'PLA',
    colors: ['Mixed'],
    basePrice: 23.89,
    purchaseOptions: [
      createOption('standard', 'Standard', plaAndPetgPricing(23.89), undefined, true),
    ],
    images: brokenDrawerGallery,
    tags: ['desk organizer', 'mini cabinet', 'drawer decor', 'shelf decor', 'catchall', 'surreal decor'],
    makerNote: 'Sized as the compact display-and-storage piece shown in the gallery.',
  },
  {
    id: 'coin-vortex-catchall-bowl',
    name: 'Coin Vortex Catchall Bowl',
    description:
      '3D printed catchall bowl designed for coins, keys, rings, and other small everyday carry items. Built with the sculptural vortex form shown in the gallery and offered with two plate choices to match your preferred look. Made for entry tables, desktops, and nightstands that need practical storage without losing a display-ready finish.',
    seoTitle: 'Coin Vortex Catchall Bowl 3D Printed Key Holder',
    seoDescription:
      '3D printed catchall bowl for coins, keys, and rings with two plate choices, designed for entryway storage, desks, and modern home organization.',
    seoKeywords: [
      'coin vortex bowl',
      '3d printed key holder',
      'catchall bowl canada',
      'entryway coin tray',
      'key tray with plate options',
    ],
    category: 'home-decor',
    grams: 70.76,
    hours: 5.5,
    material: 'PLA',
    colors: ['Mixed'],
    basePrice: 24.68,
    purchaseOptions: [
      createOption('standard', 'Standard', plaAndPetgPricing(24.68), undefined, true),
    ],
    images: coinVortexGallery,
    tags: ['catchall bowl', 'key holder', 'coin tray', 'entryway organizer', 'desk tray', 'two plate choices'],
    makerNote: 'Choose one of the two plate options shown in the gallery before printing.',
  },
  {
    id: 'cryptex-puzzle-container',
    name: 'Cryptex Puzzle Container',
    description:
      '3D printed four-number cryptex-style container made for notes, cash gifts, clues, and small keepsakes. Designed to add a puzzle element to gift-giving, desk decor, and themed display setups without relying on standard packaging. Built for escape-room fans, tabletop gifting, and anyone who wants a more memorable reveal moment.',
    seoTitle: 'Cryptex Puzzle Container 3D Printed Gift Box',
    seoDescription:
      'Four-number 3D printed cryptex-style puzzle container designed for gift notes, cash, clues, keepsakes, and desk display.',
    seoKeywords: [
      '3d printed cryptex',
      'puzzle gift box',
      'cryptex container canada',
      'escape room prop box',
      'secret note gift holder',
    ],
    category: 'crafts-gifts',
    grams: 49.93,
    hours: 10.5,
    material: 'PLA',
    colors: ['Mixed'],
    basePrice: 24.32,
    purchaseOptions: [
      createOption('single-colour', 'Single Colour', plaAndPetgPricing(24.32), undefined, true),
      createOption('multi-colour', 'Multi Colour', plaAndPetgPricing(28.32)),
    ],
    images: cryptexGallery,
    tags: ['cryptex', 'puzzle container', 'gift box', 'desk puzzle', 'keepsake holder', 'escape room gift'],
    makerNote: 'Printed as the four-number cryptex format shown in the gallery.',
  },
  {
    id: 'memory-book-photo-album',
    name: 'Memory Book Photo Album',
    description:
      '3D printed flip-style photo album designed to hold up to 12 standard 15 x 10 cm photos in a compact display format. Built for anniversary keepsakes, family memories, pet photos, and year-in-review gifting with a more sculptural look than a standard album. Made to sit on shelves, desks, or side tables as both a personal display piece and a thoughtful custom gift.',
    seoTitle: 'Memory Book Photo Album 3D Printed Picture Display',
    seoDescription:
      '3D printed photo album for up to 12 standard 15 x 10 cm photos, designed for keepsakes, anniversary gifts, family memories, and shelf display.',
    seoKeywords: [
      '3d printed photo album',
      'memory book photo display',
      'custom keepsake album',
      'anniversary photo gift',
      'picture display book canada',
    ],
    category: 'crafts-gifts',
    grams: 84.65,
    hours: 10.5,
    material: 'PLA',
    colors: ['Mixed'],
    basePrice: 27.38,
    purchaseOptions: [
      createOption('standard', 'Standard', plaAndPetgPricing(27.38), undefined, true),
    ],
    images: memoryBookGallery,
    tags: ['photo album', 'memory book', 'keepsake gift', 'picture display', 'anniversary gift', 'family photos'],
    makerNote: 'Year plates and custom cover text can be updated before production.',
  },
  {
    id: 'pill-click-daily-pill-dispenser',
    name: 'Pill Click Daily Pill Dispenser',
    description:
      '3D printed daily pill dispenser with individual weekday buttons and a clean modular layout for weekly organization. Designed to keep medication or supplement routines visible, separated, and easier to manage on a wall, fridge, or dedicated home station. Built as a more intentional alternative to a basic pill box for homes, offices, and caregiving setups.',
    seoTitle: 'Pill Click Daily Pill Dispenser Wall or Fridge Organizer',
    seoDescription:
      '3D printed daily pill dispenser with weekday buttons, designed for wall or fridge mounting and cleaner weekly medication organization.',
    seoKeywords: [
      'daily pill dispenser',
      '3d printed pill organizer',
      'weekly medication organizer',
      'fridge pill dispenser',
      'wall mount supplement organizer',
    ],
    category: 'tools-repair',
    grams: 54.13,
    hours: 7.5,
    material: 'PETG',
    colors: ['Mixed'],
    basePrice: 6.89,
    purchaseOptions: [
      createOption('set', 'Set', petgOnlyPricing(39.99), undefined, true),
      createOption('individual-module', 'Individual Module', petgOnlyPricing(6.89)),
    ],
    images: pillClickGallery,
    tags: ['pill dispenser', 'pill organizer', 'daily routine', 'fridge mount', 'wall mount', 'medication organizer'],
    makerNote: 'PETG only. Weekday labels, blank buttons, and mounting styles can be configured before production.',
  },
  {
    id: 'prr-tagon-pet-bed',
    name: 'PRR-TAGON Pet Bed',
    description:
      '3D printed geometric pet bed built from interlocking pentagon panels for a bold architectural look. Designed as a modern hideaway for cats and small dogs while still working as a sculptural home decor statement. Made for living rooms, window corners, reading nooks, and styled spaces that need a pet accessory with stronger visual presence.',
    seoTitle: 'PRR-TAGON Geometric 3D Printed Dog and Cat Bed',
    seoDescription:
      'Geometric 3D printed pet bed for cats and small dogs, designed as a modern hideaway and statement home accessory.',
    seoKeywords: [
      'geometric pet bed',
      '3d printed cat bed',
      '3d printed dog bed',
      'modern pet furniture',
      'designer pet hideaway',
    ],
    category: 'home-decor',
    grams: 234.96,
    hours: 26,
    material: 'PLA',
    colors: ['Mixed'],
    basePrice: 149.99,
    purchaseOptions: [
      createOption('standard', 'Standard', plaAndPetgPricing(149.99), undefined, true),
    ],
    images: prrTagonGallery,
    tags: ['pet bed', 'cat bed', 'small dog bed', 'geometric decor', 'pet furniture', 'modern home accessory'],
    makerNote: 'Sold as the geometric pet bed format shown in the gallery.',
  },
  {
    id: 'secret-note-sticky-note-holder',
    name: 'Secret Note Sticky Note Holder',
    description:
      '3D printed sticky note holder sized for standard 76 x 76 mm note pads with internal storage for stencil inserts. Designed to keep sticky notes, quick sketches, order notes, and pen-ready planning tools in one compact desk piece. Built for front desks, reception counters, cafe cash wraps, studios, and small-business workstations that need cleaner note-taking and tabletop organization.',
    seoTitle: 'Secret Note Sticky Note Holder for Desk and Counter Organization',
    seoDescription:
      '3D printed sticky note holder with built-in stencil storage, designed for desks, reception counters, studios, and small-business tabletop organization.',
    seoKeywords: [
      'sticky note holder',
      '3d printed desk organizer',
      'note pad holder with storage',
      'office sticky note dispenser',
      'small business desk organizer',
    ],
    category: 'small-business-hospitality',
    grams: 59.65,
    hours: 6.5,
    material: 'PLA',
    colors: ['Mixed'],
    basePrice: 34.67,
    purchaseOptions: [
      createOption('bundle', 'Bundle', plaAndPetgPricing(34.67), undefined, true),
    ],
    images: secretNoteGallery,
    tags: ['sticky note holder', 'desk organizer', 'stencils', 'office accessory', 'small business desk organizer', 'counter organization'],
    makerNote: 'Bundle includes the holder, attachments, pen, sticky pad, and six stencil inserts.',
  },
  {
    id: 'wave-tissue-napkin-holder',
    name: 'Wave Tissue & Napkin Holder',
    description:
      '3D printed tissue and napkin holder with a soft wave silhouette and a clean low-profile presentation. Designed to make table essentials feel more intentional in cafes, restaurants, reception spaces, guest areas, and coffee stations. Built for hospitality tabletops, small-business counters, and modern interiors that want functional tabletop storage without bulky hardware-store styling.',
    seoTitle: 'Wave Tissue and Napkin Holder for Cafes, Restaurants, and Tables',
    seoDescription:
      '3D printed tissue and napkin holder with a wave silhouette, designed for restaurant tables, cafe counters, hospitality spaces, guest areas, and modern tabletop styling.',
    seoKeywords: [
      'wave tissue holder',
      '3d printed napkin holder',
      'napkin holders for restaurants',
      'restaurant table accessories',
      'hospitality tabletop accessories',
      'napkin holder for cafes',
    ],
    category: 'small-business-hospitality',
    grams: 55.49,
    hours: 7.5,
    material: 'PLA',
    colors: ['Black', 'White'],
    basePrice: 26.72,
    purchaseOptions: [
      createOption('standard', 'Standard', plaAndPetgPricing(26.72), undefined, true),
    ],
    images: waveHolderGallery,
    tags: ['tissue holder', 'napkin holder', 'restaurant table accessory', 'hospitality tabletop accessory', 'coffee station decor', 'small business tabletop organizer'],
    makerNote: 'Printed in the curved wave format shown in the gallery.',
  },
  {
    id: 'flame-reveal-photo-holder',
    name: 'Flame Reveal Surprise Photo Holder',
    description:
      '3D printed photo holder with a flame-shaped silhouette, integrated match striker edge, mini vase slot, and small tray area for pins or tiny keepsakes. Designed as a compact gifting piece for favourite photos, memory displays, and styled tabletop moments. Built for side tables, desks, shelves, and gift bundles that need a more expressive display object.',
    seoTitle: 'Flame Reveal Surprise Photo Holder 3D Printed Gift Display',
    seoDescription:
      '3D printed flame-shaped photo holder with striker edge, mini vase slot, and tray detail, designed for gifts, memories, and tabletop decor.',
    seoKeywords: [
      'flame reveal photo holder',
      '3d printed picture holder',
      'photo gift display',
      'tabletop memory display',
      'decorative photo stand canada',
    ],
    category: 'crafts-gifts',
    grams: 66.6,
    hours: 6.5,
    material: 'PLA',
    colors: ['Pink', 'Red'],
    basePrice: 27.76,
    purchaseOptions: [
      createOption('standard', 'Standard', plaAndPetgPricing(27.76), undefined, true),
    ],
    images: flameRevealGallery,
    tags: ['photo holder', 'gift display', 'tabletop decor', 'memory display', 'mini vase', 'decorative stand'],
    makerNote: 'Fits the 15 x 10 photo format shown in the gallery.',
  },
  {
    id: 'string-flex-builder-keychain',
    name: 'String-Flex Builder Keychain',
    description:
      'Articulated block-style keychain with movable limbs and a compact square-profile design. Designed as a lightweight collectible for keys, backpacks, zipper pulls, and gamer gift bundles with a block-game-inspired look. Made for everyday carry setups that want a playful character accessory without adding bulk.',
    seoTitle: 'String-Flex Builder Articulated Block-Style Keychain',
    seoDescription:
      'Articulated block-style 3D printed keychain designed for keys, backpacks, gamer gifts, and collectible everyday carry accessories.',
    seoKeywords: [
      'builder keychain',
      'articulated block keychain',
      '3d printed keychain canada',
      'gamer keychain gift',
      'voxel style keychain',
    ],
    category: 'toys-collectibles',
    grams: 17.99,
    hours: 4,
    material: 'PLA',
    colors: ['Mixed'],
    basePrice: 13.29,
    purchaseOptions: [
      createOption('single-keychain', 'Single Keychain', plaAndPetgPricing(13.29), undefined, true),
    ],
    images: withLead(`${CDN}/shop/products/string-flex-minecraft/01.webp`, minecraftGallery),
    tags: ['keychain', 'keychains', 'articulated figure', 'collectible', 'block style', 'gamer gift'],
  },
  {
    id: 'string-flex-blonde-adventurer-keychain',
    name: 'String-Flex Blonde Adventurer Keychain',
    description:
      'Articulated block-style keychain with a bright square-profile finish and poseable limbs. Designed for keys, bags, backpacks, and collectible gamer gift bundles with a playful adventure-inspired look. Built as a lightweight accessory for everyday carry, shelf styling, and themed seasonal add-ons.',
    seoTitle: 'String-Flex Blonde Adventurer Articulated Keychain',
    seoDescription:
      'Articulated block-style keychain with poseable limbs, designed for keys, bags, gamer gifts, and collectible everyday carry accessories.',
    seoKeywords: [
      'blonde adventurer keychain',
      'articulated keychain figure',
      '3d printed gamer keychain',
      'block style keychain',
      'collectible bag charm',
    ],
    category: 'toys-collectibles',
    grams: 17.99,
    hours: 4,
    material: 'PLA',
    colors: ['Mixed'],
    basePrice: 13.29,
    purchaseOptions: [
      createOption('single-keychain', 'Single Keychain', plaAndPetgPricing(13.29), undefined, true),
    ],
    images: withLead(`${CDN}/shop/products/string-flex-minecraft/03.webp`, minecraftGallery),
    tags: ['keychain', 'keychains', 'articulated figure', 'collectible', 'block style', 'bag charm'],
  },
  {
    id: 'string-flex-enderman-keychain',
    name: 'String-Flex Slender-Dude Keychain',
    description:
      'Tall articulated block-style keychain with a long-limbed silhouette and a dark finish that stands out in a display or on the go. Designed as an Enderman-inspired collectible for keys, backpacks, desk setups, and themed gamer gift bundles. Made for fans of voxel-style accessories who want a lightweight articulated character with a distinctive profile.',
    seoTitle: 'String-Flex Slender-Dude Enderman-Inspired Keychain',
    seoDescription:
      'Enderman-inspired articulated block-style keychain designed for keys, backpacks, desk displays, and gamer gift bundles.',
    seoKeywords: [
      'slender-dude keychain',
      'enderman inspired keychain',
      'articulated gamer keychain',
      'block style collectible',
      'voxel accessory canada',
    ],
    category: 'toys-collectibles',
    grams: 17.99,
    hours: 4,
    material: 'PLA',
    colors: ['Mixed'],
    basePrice: 13.29,
    purchaseOptions: [
      createOption('single-keychain', 'Single Keychain', plaAndPetgPricing(13.29), undefined, true),
    ],
    images: withLead(`${CDN}/shop/products/string-flex-minecraft/04.webp`, minecraftGallery),
    tags: ['keychain', 'keychains', 'slender-dude', 'enderman inspired', 'articulated figure', 'collectible'],
  },
  {
    id: 'string-flex-skeleton-keychain',
    name: 'String-Flex Skeleton Keychain',
    description:
      'Articulated skeleton-style keychain built with the same block-inspired silhouette and movable limb format shown in the gallery. Designed for keys, bags, backpacks, and gamer gift bundles that need a compact collectible accent. Made as a lightweight everyday carry accessory with a playful character look and simple display value.',
    seoTitle: 'String-Flex Skeleton Articulated Block-Style Keychain',
    seoDescription:
      'Articulated skeleton-style block keychain designed for keys, backpacks, collectible displays, and gamer gift bundles.',
    seoKeywords: [
      'skeleton keychain',
      'articulated block keychain',
      '3d printed skeleton keychain',
      'collectible gamer accessory',
      'bag charm keychain',
    ],
    category: 'toys-collectibles',
    grams: 17.99,
    hours: 4,
    material: 'PLA',
    colors: ['Mixed'],
    basePrice: 13.29,
    purchaseOptions: [
      createOption('single-keychain', 'Single Keychain', plaAndPetgPricing(13.29), undefined, true),
    ],
    images: withLead(`${CDN}/shop/products/string-flex-minecraft/02.webp`, minecraftGallery),
    tags: ['keychain', 'keychains', 'skeleton', 'articulated figure', 'collectible', 'block style'],
  },
  {
    id: 'string-flex-creeper-keychain',
    name: 'String-Flex Exploding Cactus Guy Keychain',
    description:
      'Block-style articulated keychain with a square head, compact body, and playful cube-based character styling. Designed as a Creeper-inspired collectible for keys, bags, display shelves, and gamer gift sets without turning the product into a branded replica. Made for fans of voxel-inspired accessories who want a recognizable articulated add-on for everyday carry.',
    seoTitle: 'String-Flex Exploding Cactus Guy Creeper-Inspired Keychain',
    seoDescription:
      'Creeper-inspired articulated block-style keychain designed for keys, backpacks, gamer gifts, and collectible voxel-style accessories.',
    seoKeywords: [
      'exploding cactus guy keychain',
      'creeper inspired keychain',
      'articulated gamer keychain',
      'block style collectible',
      'voxel inspired keychain',
    ],
    category: 'toys-collectibles',
    grams: 17.99,
    hours: 4,
    material: 'PLA',
    colors: ['Mixed'],
    basePrice: 13.29,
    purchaseOptions: [
      createOption('single-keychain', 'Single Keychain', plaAndPetgPricing(13.29), undefined, true),
    ],
    images: withLead(`${CDN}/shop/products/string-flex-minecraft-variants/creeper.webp`, minecraftGallery),
    tags: ['keychain', 'keychains', 'exploding cactus guy', 'creeper inspired', 'articulated figure', 'gamer gift'],
  },
  {
    id: 'minecraft-tool-keychain-set',
    name: "Miner's Handy Toolset",
    description:
      'Five-piece keychain set featuring a sword, pickaxe, axe, shovel, and hoe in the Minecraft-style tool format shown in the gallery. Designed for gamer gift bundles, backpack charms, desk accessories, and collectible add-ons that work better as a themed set than as separate pieces. Made as a compact multi-piece offering for voxel-inspired everyday carry and display use.',
    seoTitle: "Miner's Handy Toolset Minecraft-Style Tool Keychain Set",
    seoDescription:
      'Five-piece Minecraft-style tool keychain set with sword, pickaxe, axe, shovel, and hoe forms designed for gifts, bags, and collectible use.',
    seoKeywords: [
      'miners handy toolset',
      'minecraft style tool keychain',
      'tool keychain set',
      'gamer gift keychain set',
      'voxel tool accessory',
    ],
    category: 'toys-collectibles',
    grams: 40.21,
    hours: 4.5,
    material: 'PLA',
    colors: ['Mixed'],
    basePrice: 4,
    purchaseOptions: [
      createOption('5-piece-set', '5-Piece Set', plaAndPetgPricing(19.98), undefined, true),
      createOption('single-tool', 'Single Tool', plaAndPetgPricing(4)),
    ],
    images: withLead(`${CDN}/shop/products/string-flex-minecraft/06.webp`, minecraftGallery),
    tags: ['keychain set', 'keychains', 'minecraft style tools', 'gamer gift', 'collectible set', 'voxel accessory'],
    makerNote: "This listing does not include the box. Pair it with the standalone Miner's Box listing if you want the storage shown in the gallery.",
  },
  {
    id: 'miners-box',
    name: "Miner's Box",
    description:
      "Standalone voxel-style storage box sized to pair with Miner's Handy Toolset and the matching articulated keychains shown in the gallery. Designed as a compact display-and-storage add-on for desks, bags, shelves, and gift bundles that want the same game-inspired presentation without bundling the full tool set.",
    seoTitle: "Miner's Box Standalone Voxel-Style Storage Box",
    seoDescription:
      "Standalone voxel-style storage box designed to pair with Miner's Handy Toolset and matching gamer keychains for desk display, gifts, and storage.",
    seoKeywords: [
      'miners box',
      'voxel storage box',
      'toolset display box',
      'gamer gift storage box',
      'minecraft style display box',
    ],
    category: 'toys-collectibles',
    grams: 24.88,
    hours: 2.5,
    material: 'PLA',
    colors: ['Mixed'],
    basePrice: 8,
    purchaseOptions: [
      createOption('standalone-box', 'Standalone Box', plaAndPetgPricing(8), undefined, true),
    ],
    images: minersBoxGallery,
    tags: ['storage box', 'display box', 'voxel accessory', 'gamer gift', 'keychain storage', 'toolset companion'],
    makerNote: "Designed to pair with Miner's Handy Toolset. Tool set sold separately.",
  },
  {
    id: 'string-flex-rabbit-keychain',
    name: 'String-Flex Rabbit Keychain',
    description:
      'Articulated Easter rabbit keychain with carrot detail and a soft seasonal colour palette. Designed for baskets, zipper pulls, spring gift bundles, and lightweight everyday carry with a cheerful holiday look. Made as a seasonal keychain accessory that also works as a small collectible bag charm or party favour.',
    seoTitle: 'String-Flex Rabbit Easter Keychain',
    seoDescription:
      'Articulated Easter rabbit keychain designed for baskets, bags, spring gifts, party favours, and seasonal everyday carry.',
    seoKeywords: [
      'easter rabbit keychain',
      'spring keychain gift',
      'articulated bunny keychain',
      'basket filler keychain',
      'seasonal keychain canada',
    ],
    category: 'seasonal-holiday',
    grams: 16.6,
    hours: 3.5,
    material: 'PLA',
    colors: ['Mixed'],
    basePrice: 13.29,
    purchaseOptions: [
      createOption('single-keychain', 'Single Keychain', plaAndPetgPricing(13.29), undefined, true),
    ],
    images: withLead(`${CDN}/shop/products/string-flex-easter/04.webp`, easterGallery),
    tags: ['rabbit', 'easter', 'keychain', 'keychains', 'spring gift', 'basket filler'],
  },
  {
    id: 'string-flex-egg-keychain',
    name: 'String-Flex Egg Keychain',
    description:
      'Egg-shaped Easter keychain with articulated feet and a clean pastel-ready profile. Designed for baskets, bags, spring gifting, and seasonal table favours with a compact collectible look. Built as a small holiday keychain that works well on backpacks, zipper pulls, and Easter bundle add-ons.',
    seoTitle: 'String-Flex Egg Easter Keychain',
    seoDescription:
      'Egg-shaped Easter keychain designed for baskets, spring gifts, bags, zipper pulls, and seasonal collectible accessories.',
    seoKeywords: [
      'easter egg keychain',
      'spring keychain accessory',
      'basket filler gift',
      'seasonal keychain canada',
      'articulated egg keychain',
    ],
    category: 'seasonal-holiday',
    grams: 16.6,
    hours: 3.5,
    material: 'PLA',
    colors: ['Mixed'],
    basePrice: 13.29,
    purchaseOptions: [
      createOption('single-keychain', 'Single Keychain', plaAndPetgPricing(13.29), undefined, true),
    ],
    images: withLead(`${CDN}/shop/products/string-flex-easter-variants/egg.webp`, easterGallery),
    tags: ['egg', 'easter', 'keychain', 'keychains', 'spring gift', 'seasonal accessory'],
  },
  {
    id: 'string-flex-chick-keychain',
    name: 'String-Flex Chick Keychain',
    description:
      'Rounded chick keychain with a small flower detail and a compact articulated build. Designed for Easter baskets, spring gift bundles, party favours, and playful everyday carry accents. Made as a seasonal collectible keychain that adds a bright holiday note to bags, keys, and themed display sets.',
    seoTitle: 'String-Flex Chick Easter Keychain',
    seoDescription:
      'Rounded chick Easter keychain designed for baskets, spring gifts, party favours, bags, and seasonal collectible use.',
    seoKeywords: [
      'easter chick keychain',
      'spring gift keychain',
      'seasonal bag charm',
      'party favour keychain',
      'articulated chick accessory',
    ],
    category: 'seasonal-holiday',
    grams: 16.6,
    hours: 3.5,
    material: 'PLA',
    colors: ['Mixed'],
    basePrice: 13.29,
    purchaseOptions: [
      createOption('single-keychain', 'Single Keychain', plaAndPetgPricing(13.29), undefined, true),
    ],
    images: withLead(`${CDN}/shop/products/string-flex-easter-variants/chick.webp`, easterGallery),
    tags: ['chick', 'easter', 'keychain', 'keychains', 'spring gift', 'party favour'],
  },
  {
    id: 'string-flex-pink-bunny-keychain',
    name: 'String-Flex Pink Bunny Keychain',
    description:
      'Pink Easter bunny keychain with a carrot detail and articulated limbs for a playful seasonal finish. Designed for baskets, spring gifting, party favours, and bag charms that need a softer colour pop. Built as a lightweight holiday keychain that also works as a small collectible accessory for seasonal bundles.',
    seoTitle: 'String-Flex Pink Bunny Easter Keychain',
    seoDescription:
      'Pink bunny Easter keychain designed for baskets, spring gifts, party favours, bags, and seasonal collectible bundles.',
    seoKeywords: [
      'pink bunny keychain',
      'easter bunny bag charm',
      'spring basket filler',
      'seasonal keychain gift',
      'articulated bunny accessory',
    ],
    category: 'seasonal-holiday',
    grams: 16.6,
    hours: 3.5,
    material: 'PLA',
    colors: ['Mixed'],
    basePrice: 13.29,
    purchaseOptions: [
      createOption('single-keychain', 'Single Keychain', plaAndPetgPricing(13.29), undefined, true),
    ],
    images: withLead(`${CDN}/shop/products/string-flex-easter-variants/pink-bunny.webp`, easterGallery),
    tags: ['bunny', 'easter', 'keychain', 'keychains', 'spring gift', 'bag charm'],
  },
];

export const SHOP_CATEGORIES = [
  {
    id: 'home-decor',
    label: 'Home & Decor',
    description: 'Display-ready organizers, decor-forward tabletop pieces, and refined everyday home accessories.',
  },
  {
    id: 'tools-repair',
    label: 'Tools & Repair',
    description: 'Functional prints built to solve everyday utility, maintenance, and routine organization needs.',
  },
  {
    id: 'diy-makers',
    label: 'DIY & Makers',
    description: 'Workshop-friendly prints, build helpers, and maker-oriented accessories for hands-on projects.',
  },
  {
    id: 'crafts-gifts',
    label: 'Crafts & Gifts',
    description: 'Keepsakes, photo pieces, and giftable prints designed for custom moments and thoughtful presentation.',
  },
  {
    id: 'automotive',
    label: 'Automotive',
    description: 'Practical 3D printed accessories prepared for future vehicle organization and cabin utility products.',
  },
  {
    id: 'marine',
    label: 'Marine',
    description: 'Durable marine-oriented accessories prepared for docks, boats, and coastal utility use cases.',
  },
  {
    id: 'masks-costume',
    label: 'Masks & Costume',
    description: 'Wearable props, cosplay-ready accessories, and costume-focused prints prepared for themed drops.',
  },
  {
    id: 'toys-collectibles',
    label: 'Toys & Collectibles',
    description: 'Articulated keychains, gamer-friendly prints, and collectible display pieces with repeatable shelf appeal.',
  },
  {
    id: 'seasonal-holiday',
    label: 'Seasonal & Holiday',
    description: 'Holiday-specific accessories and seasonal add-ons for gifting, events, and limited-run merchandising.',
  },
  {
    id: 'small-business-hospitality',
    label: 'Small Business & Hospitality',
    description: 'Tabletop accessories and counter organizers for cafes, restaurants, guest spaces, and small-business service areas.',
  },
] as const satisfies readonly CatalogCategoryMeta[];

export const SHOP_CATEGORY_LABELS: Record<CatalogCategory, string> = Object.fromEntries(
  SHOP_CATEGORIES.map((category) => [category.id, category.label]),
) as Record<CatalogCategory, string>;

export const getCatalogCategory = (categoryId: CatalogCategory) =>
  SHOP_CATEGORIES.find((category) => category.id === categoryId);

const fallbackPurchaseOption = (item: CatalogItem): CatalogPurchaseOption =>
  createOption(
    'standard',
    'Standard',
    [{ material: item.material, price: item.basePrice, isDefault: true }],
    undefined,
    true,
  );

export const getCatalogItemById = (id: string) => CATALOG.find((item) => item.id === id);

export const getCatalogItemUrl = (itemOrId: CatalogItem | string) =>
  `/shop/${typeof itemOrId === 'string' ? itemOrId : itemOrId.id}`;

export const getCatalogItemPurchaseOptions = (item: CatalogItem): CatalogPurchaseOption[] =>
  item.purchaseOptions?.length ? item.purchaseOptions : [fallbackPurchaseOption(item)];

export const getCatalogPurchaseOption = (item: CatalogItem, optionId?: string): CatalogPurchaseOption => {
  const options = getCatalogItemPurchaseOptions(item);
  if (optionId) {
    const selected = options.find((option) => option.id === optionId);
    if (selected) return selected;
  }

  return options.find((option) => option.isDefault) ?? options[0];
};

export const getCatalogMaterialPricing = (
  item: CatalogItem,
  optionId?: string,
): CatalogMaterialPricing[] => getCatalogPurchaseOption(item, optionId).pricing;

export const getCatalogPriceForSelection = (
  item: CatalogItem,
  optionId?: string,
  material?: Material,
): CatalogMaterialPricing => {
  const pricing = getCatalogMaterialPricing(item, optionId);

  if (material) {
    const selected = pricing.find((entry) => entry.material === material);
    if (selected) return selected;
  }

  return pricing.find((entry) => entry.isDefault) ?? pricing[0];
};

export const getCatalogDefaultSelection = (item: CatalogItem) => {
  const option = getCatalogPurchaseOption(item);
  const pricing = getCatalogPriceForSelection(item, option.id);

  return { option, pricing };
};

export const getCatalogItemPriceRange = (item: CatalogItem) => {
  const prices = getCatalogItemPurchaseOptions(item).flatMap((option) => option.pricing.map((entry) => entry.price));
  const lowPrice = Math.min(...prices);
  const highPrice = Math.max(...prices);

  return {
    lowPrice: roundMoney(lowPrice),
    highPrice: roundMoney(highPrice),
  };
};

export const getCatalogItemStartingPrice = (item: CatalogItem) => getCatalogItemPriceRange(item).lowPrice;

export const getCatalogItemHasPriceRange = (item: CatalogItem) => {
  const { lowPrice, highPrice } = getCatalogItemPriceRange(item);
  return lowPrice !== highPrice;
};

export const getCatalogItemMaterials = (item: CatalogItem): Material[] =>
  Array.from(
    new Set(
      getCatalogItemPurchaseOptions(item).flatMap((option) => option.pricing.map((entry) => entry.material)),
    ),
  );

export const getCatalogItemMaterialSummary = (item: CatalogItem) => {
  const materials = getCatalogItemMaterials(item);

  return materials.length === 1 ? `${materials[0]} only` : materials.join(' / ');
};

export const SOURCE_LABELS: Record<string, { label: string; color: string }> = {
  printables: { label: 'Printables', color: '#FA6831' },
  thingiverse: { label: 'Thingiverse', color: '#248BFB' },
  makerworld: { label: 'MakerWorld', color: '#1AB4B4' },
  '3d3d': { label: '3D3D Original', color: '#00C4CC' },
  custom: { label: 'Community', color: '#A855F7' },
};
