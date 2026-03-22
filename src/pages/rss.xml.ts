import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

const posts = [
  {
    slug: 'best-3d-printers-march-2026',
    title: 'The 10 Best 3D Printers to Buy in March 2026: Ranked, Priced in CAD, and Set Up for You',
    description: 'From the Snapmaker U1 to the Ender 3 V3 SE, the top 10 3D printers of March 2026 with Canadian prices, honest assessments, and professional setup service.',
    date: new Date('2026-03-23'),
    category: '3D Printers',
  },
  {
    slug: 'buy-local-not-amazon-etsy-temu',
    title: 'Stop Buying 3D Prints from Amazon, Etsy, and Temu. Here Is Why Local Manufacturing Matters.',
    description: 'When you buy a 3D print from Amazon or Temu, your money leaves Canada permanently. This is what local manufacturing costs, what you actually get, and why buying local is an economic infrastructure decision.',
    date: new Date('2026-03-22'),
    category: 'Manufacturing',
  },
  {
    slug: 'why-cooperative-3d-printing',
    title: 'Why Distributed 3D Printing Is the Future of Local Manufacturing',
    description: 'Network-based manufacturing powered by local makers is reshaping how communities produce custom parts and products.',
    date: new Date('2026-03-19'),
    category: 'Community',
  },
  {
    slug: 'global-impact',
    title: 'How 3D Printing Helps People Who Have Nothing',
    description: 'Disaster relief, remote communities, open-source designs. The humanitarian side of additive manufacturing.',
    date: new Date('2026-03-18'),
    category: 'Community',
  },
  {
    slug: 'advances-2026',
    title: 'The 3D Printing Breakthroughs of Early 2026',
    description: "New printers, new materials, industry shifts. What's actually changed and what matters.",
    date: new Date('2026-03-15'),
    category: '3D Printing',
  },
  {
    slug: 'atlantic-canada-maker-network',
    title: 'Building a Maker Network Across Atlantic Canada',
    description: 'From Moncton to Halifax, St. John\'s to Charlottetown, connecting makers across four provinces.',
    date: new Date('2026-03-14'),
    category: 'Community',
  },
  {
    slug: 'campaign-update-march',
    title: 'Newport Bermuda Campaign Update. March 2026',
    description: 'Boat prep, printer integration, gear testing. Where the campaign stands heading into spring.',
    date: new Date('2026-03-12'),
    category: 'Campaign',
  },
  {
    slug: 'material-guide-pla-petg-tpu',
    title: 'Material Guide: PLA vs PETG vs TPU. Choosing the Right Filament',
    description: 'Each material has trade-offs. PLA for precision, PETG for durability, TPU for flex. When to use each.',
    date: new Date('2026-03-10'),
    category: 'Materials',
  },
  {
    slug: 'automotive-restoration',
    title: '3D Printing for Classic Car Restoration',
    description: "Bringing back parts that don't exist anymore. Knobs, brackets, trim pieces, functional components.",
    date: new Date('2026-03-08'),
    category: 'Automotive',
  },
  {
    slug: 'marine-case-study',
    title: 'Case Study: Custom Winch Components for Offshore Sailing',
    description: 'The problem, the material selection, the design process, the result. A real marine fabrication job.',
    date: new Date('2026-03-05'),
    category: 'Case Study',
  },
  {
    slug: 'bambu-vs-prusa',
    title: "Bambu Lab vs Prusa: The Conversation Nobody's Having Honestly",
    description: 'Speed vs openness. Proprietary vs repairable. An honest comparison from someone who\'s used both.',
    date: new Date('2026-03-01'),
    category: 'Equipment',
  },
  {
    slug: 'solo-saint-john',
    title: 'Two Days Solo on the Saint John River',
    description: 'Solo sailing up the Saint John River. What it was like, what it proved, what it taught.',
    date: new Date('2026-02-15'),
    category: 'Sailing',
  },
  {
    slug: 'csm-profile',
    title: 'Christopher Stanmore-Major: The Captain Behind the Campaign',
    description: 'Who CSM is, the sailing partnership, and why he\'s the reason 3D3D ever touched a boat.',
    date: new Date('2026-02-05'),
    category: 'People',
  },
  {
    slug: 'carbon-fibre-compounds',
    title: "Carbon Fibre Filaments: What They Actually Do (And Don't)",
    description: 'PETG-CF, PA-CF, PPA-CF, expectations vs. reality. When CF compounds are worth it and when they\'re not.',
    date: new Date('2026-01-20'),
    category: 'Materials',
  },
  {
    slug: 'shipping-printers',
    title: 'How to Ship a 3D Printer Without Destroying It',
    description: 'Practical guide on packaging, crating, and shipping printers for relocation or deployment.',
    date: new Date('2026-01-05'),
    category: 'Guides',
  },
].sort((a, b) => b.date.getTime() - a.date.getTime());

export async function GET(context: APIContext) {
  return rss({
    title: '3D3D Blog — Fabrication, Sailing, Materials & Manufacturing',
    description: 'Updates on 3D printing, materials, the Newport Bermuda campaign, sailing stories, and fabrication for marine and route-based work.',
    site: context.site!.toString(),
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.date,
      description: post.description,
      link: `/blog/${post.slug}`,
      categories: [post.category],
    })),
    customData: `<language>en-ca</language><managingEditor>info@3d3d.ca (Ken)</managingEditor><webMaster>info@3d3d.ca (Ken)</webMaster>`,
  });
}
