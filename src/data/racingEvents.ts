export interface RacingEvent {
  slug: string;
  name: string;
  location: string;
  month: string;
  description: string;
  hardwareNeeds: string[];
}

export const RACING_EVENTS: RacingEvent[] = [
  {
    slug: 'rolex-fastnet',
    name: 'Rolex Fastnet Race',
    location: 'Cowes to Cherbourg',
    month: 'July',
    description: 'One of the most demanding offshore races in the world. Equipment failure in the Celtic Sea requires immediate, structurally sound replacements before the next leg.',
    hardwareNeeds: ['Custom sheaves', 'Cleat bases in CF-Nylon', 'Winch housing replacements', 'Nav-screen ASA sun covers']
  },
  {
    slug: 'newport-bermuda',
    name: 'Newport Bermuda Race',
    location: 'Newport, RI to Bermuda',
    month: 'June',
    description: 'The Thrash to the Onion Patch. Gulf Stream conditions destroy weak gear. We provide on-demand fabrication for teams outfitting in Newport or needing emergency spars upon arrival in Bermuda.',
    hardwareNeeds: ['Spinnaker pole ends', 'Mast bracket prototyping', 'Custom Delrin-equivalent TPU dampeners']
  },
  {
    slug: 'caribbean-600',
    name: 'RORC Caribbean 600',
    location: 'Antigua',
    month: 'February',
    description: 'High-speed tactical racing through eleven Caribbean islands. Supply chains in the Caribbean are notoriously slow, but 3D3D nodes bypass shipping delays by fabricating race-critical hardware directly in the region.',
    hardwareNeeds: ['Fairlead mockups', 'Batten receptacle repairs', 'High-heat engine mounts']
  },
  {
    slug: 'sydney-hobart',
    name: 'Rolex Sydney Hobart',
    location: 'Sydney to Hobart, TAS',
    month: 'December',
    description: 'The Bass Strait is legendary for breaking boats. When bespoke hardware fails, waiting 6 weeks for a manufacturer replacement is not an option. 3D3D provides aggressive turnaround on structural polymer replacements.',
    hardwareNeeds: ['Rudder bearing sleeves', 'Custom tiller extensions', 'Emergency block assemblies']
  },
  {
    slug: 'vendee-globe',
    name: 'Vendée Globe',
    location: 'Les Sables d\'Olonne (Global)',
    month: 'November',
    description: 'The pinnacle of solo ocean racing. IMOCA 60s run on custom, undocumented, highly experimental hardware. 3D3D provides pre-departure design and printing of ultra-light, ultra-strong components in CF-Nylon and PC.',
    hardwareNeeds: ['Foil sensor housings', 'Autopilot brackets', 'Cockpit organizers in ASA']
  }
];
