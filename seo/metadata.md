# 3D3D Metadata System

Use this as the source of truth for page titles, descriptions, headings, social metadata, and schema.

## Global Metadata Rules
- Title target: 50-60 characters where possible
- Description target: 145-160 characters
- Default Twitter card: `summary_large_image`
- Default OG image direction: workshop part close-up, marine hardware detail, or founder-at-work imagery
- Every service page should include Service + FAQ schema

## 1. Homepage
**URL slug**  
`/`

**Meta title**  
Custom 3D Printed Replacement Parts Worldwide | 3D3D

**Meta description**  
3D3D reverse-engineers and fabricates custom 3D printed parts for marine, automotive, and hard-to-source repair jobs worldwide.

**H1**  
Broken part. Discontinued part. Hard environment. 3D3D builds the replacement.

**H2/H3 structure**
- H2: Custom 3D printing for marine, automotive, and field repair
- H2: Reverse engineering for broken and discontinued plastic parts
- H2: Materials matched to heat, UV, impact, and chemical exposure
- H2: How the quote process works
- H2: Recent projects, case studies, and updates
- H3: Marine and offshore work
- H3: Automotive restoration and motorsport
- H3: On-site deployment

**Open Graph title**  
Custom 3D Printed Replacement Parts | 3D3D

**Open Graph description**  
Functional custom parts for boats, cars, and hard-to-source repair jobs. Founder-operated, remote-first, and shipped worldwide.

**Twitter metadata**
- Card: `summary_large_image`
- Title: `Custom 3D Printed Replacement Parts | 3D3D`
- Description: `Reverse-engineered and custom-built parts for marine, automotive, and hard-use environments.`

**Schema**
```json
{
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "Organization"],
  "name": "3D3D",
  "url": "https://3d3d.ca/",
  "description": "Custom 3D printed replacement parts for marine, automotive, and hard-to-source repair jobs.",
  "serviceType": [
    "Custom 3D printing",
    "Reverse engineering",
    "Marine fabrication",
    "Automotive part reproduction"
  ],
  "areaServed": ["Worldwide", "Caribbean", "Coastal United States", "Europe"],
  "telephone": "+1-506-953-2678",
  "email": "3d3dcanada@gmail.com"
}
```

## 2. Quote Page
**URL slug**  
`/quote`

**Meta title**  
Request a Custom 3D Printing Quote | 3D3D

**Meta description**  
Upload files, photos, or a part description to get a custom 3D printing quote for marine, automotive, repair, and replacement-part projects.

**H1**  
Request a custom 3D printing quote without guessing the settings first.

**H2/H3 structure**
- H2: Send the file, the sample, or the problem
- H2: What to include for a faster quote
- H2: Materials and environment review
- H2: Common quote questions
- H3: File types accepted
- H3: Reverse engineering requests

**Open Graph title**  
Request a Custom 3D Printing Quote

**Open Graph description**  
Start with the real details: file, photo, broken part, quantity, deadline, and environment. 3D3D will review the job and recommend the right path.

**Twitter metadata**
- Card: `summary_large_image`
- Title: `Request a Custom 3D Printing Quote`
- Description: `Upload files or describe the part. 3D3D handles the technical review after intake.`

**Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Request a Custom 3D Printing Quote",
  "url": "https://3d3d.ca/quote",
  "mainEntity": {
    "@type": "Service",
    "name": "Custom 3D Printing Quote Review",
    "provider": {
      "@type": "Organization",
      "name": "3D3D"
    }
  }
}
```

## 3. Marine Service Page
**URL slug**  
`/marine-3d-printing`

**Meta title**  
Marine 3D Printing for Yacht and Boat Parts Worldwide | 3D3D

**Meta description**  
Custom 3D printed yacht and boat parts, deck hardware, and offshore replacements built for UV, saltwater, vibration, and worldwide marine use.

**H1**  
Marine 3D printing for boat parts, deck hardware, and offshore repairs.

**H2/H3 structure**
- H2: Boat parts that fail in the real world
- H2: Materials for saltwater, UV, and heat
- H2: Reverse engineering from a broken sample
- H2: Marine use cases 3D3D handles
- H2: FAQ
- H3: Deck fittings and brackets
- H3: Electronics mounts and housings
- H3: TPU seals and dampers

**Open Graph title**  
Marine 3D Printing for Boat Parts | 3D3D

**Open Graph description**  
Boat replacement parts and offshore fabrication built around marine failure modes, not generic print-shop assumptions.

**Twitter metadata**
- Card: `summary_large_image`
- Title: `Marine 3D Printing for Boat Parts`
- Description: `Saltwater-safe custom parts, reverse engineering, and offshore-minded fabrication.`

**Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Marine 3D Printing",
  "url": "https://3d3d.ca/marine-3d-printing",
  "provider": {
    "@type": "Organization",
    "name": "3D3D"
  },
  "areaServed": ["Worldwide", "Caribbean", "Coastal United States", "Europe"],
  "serviceType": "Custom marine 3D printed parts and reverse engineering"
}
```

## 4. Automotive Service Page
**URL slug**  
`/automotive-3d-printing`

**Meta title**  
Automotive 3D Printing for Restoration and Motorsports | 3D3D

**Meta description**  
3D3D reproduces discontinued plastic car parts, restoration pieces, brackets, and selected underhood components for automotive and motorsport use.

**H1**  
Automotive 3D printing for restoration, replacement parts, and motorsport fabrication.

**H2/H3 structure**
- H2: Rebuild the part the dealer stopped carrying
- H2: Interior, trim, and non-safety-critical replacements
- H2: Heat, vibration, and material selection
- H2: How reverse engineering works for vehicle parts
- H2: FAQ
- H3: Classic car restoration
- H3: Motorsports and drag-car support
- H3: Underhood material guidance

**Open Graph title**  
Automotive 3D Printing for Restoration | 3D3D

**Open Graph description**  
Replacement plastics, restoration parts, and fitment-focused fabrication for classic cars, motorsports, and hard-to-source automotive jobs.

**Twitter metadata**
- Card: `summary_large_image`
- Title: `Automotive 3D Printing for Restoration`
- Description: `Discontinued car parts, restoration components, and motorsport support built with mechanic-level context.`

**Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Automotive 3D Printing",
  "url": "https://3d3d.ca/automotive-3d-printing",
  "provider": {
    "@type": "Organization",
    "name": "3D3D"
  },
  "serviceType": "Automotive part reproduction and custom fabrication"
}
```

## 5. Reverse Engineering Page
**URL slug**  
`/reverse-engineering`

**Meta title**  
Reverse Engineering for Broken and Discontinued Parts | 3D3D

**Meta description**  
3D3D measures, models, and rebuilds broken, obsolete, or discontinued plastic parts from samples, photos, and rough dimensions.

**H1**  
Reverse engineering for broken, obsolete, and discontinued plastic parts.

**H2/H3 structure**
- H2: What to send if the part is broken or incomplete
- H2: Measure, model, test-fit, and refine
- H2: Best-fit use cases for reverse engineering
- H2: Materials matched to the original job
- H2: FAQ
- H3: Broken samples
- H3: Photo-only requests
- H3: Repeated low-volume replacement runs

**Open Graph title**  
Reverse Engineering for Discontinued Parts | 3D3D

**Open Graph description**  
When the original part is gone, 3D3D can rebuild the geometry, recommend the material, and produce a functional replacement.

**Twitter metadata**
- Card: `summary_large_image`
- Title: `Reverse Engineering for Discontinued Parts`
- Description: `Send the broken part, a partial sample, or photos. 3D3D rebuilds replacements for real use.`

**Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Reverse Engineering Service",
  "url": "https://3d3d.ca/reverse-engineering",
  "provider": {
    "@type": "Organization",
    "name": "3D3D"
  },
  "serviceOutput": "CAD model and printed replacement part"
}
```

## 6. Field Deployment Page
**URL slug**  
`/field-deployment`

**Meta title**  
On-Site 3D Printing and Field Fabrication | 3D3D

**Meta description**  
Bring 3D3D on site for marine support, events, printer setup, demos, and time-sensitive fabrication jobs where shipping is too slow.

**H1**  
On-site 3D printing and field fabrication when the problem cannot wait.

**H2/H3 structure**
- H2: When field deployment makes sense
- H2: What 3D3D brings on site
- H2: Marine, event, and setup support
- H2: Booking workflow
- H2: FAQ
- H3: Event activations
- H3: Marina and boat support
- H3: Printer setup and training

**Open Graph title**  
On-Site 3D Printing and Field Fabrication

**Open Graph description**  
For jobs that need a fabricator on location, 3D3D can deploy printers, tools, and hands-on support to the work site.

**Twitter metadata**
- Card: `summary_large_image`
- Title: `On-Site 3D Printing and Field Fabrication`
- Description: `Marine support, events, printer setup, and urgent jobs handled where the problem actually is.`

**Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "On-Site 3D Printing and Field Fabrication",
  "url": "https://3d3d.ca/field-deployment",
  "provider": {
    "@type": "Organization",
    "name": "3D3D"
  }
}
```

## 7. Materials Page
**URL slug**  
`/materials`

**Meta title**  
Engineering 3D Printing Materials for Real-World Use | 3D3D

**Meta description**  
See the 3D3D material stack for marine, automotive, chemical, outdoor, and high-heat applications, from ASA and PETG-CF to PA11 CF and PEI.

**H1**  
Engineering 3D printing materials selected by failure mode, not by hype.

**H2/H3 structure**
- H2: Outdoor and marine materials
- H2: Structural and carbon-fiber compounds
- H2: Flexible, specialty, and high-temperature options
- H2: Which materials fit which environments
- H2: FAQ
- H3: ASA and PP for marine use
- H3: PA11 CF for heat and chemicals
- H3: TPU for seals and dampening

**Open Graph title**  
Engineering 3D Printing Materials | 3D3D

**Open Graph description**  
Compare the materials 3D3D uses for UV, heat, saltwater, chemicals, structural load, and flexible applications.

**Twitter metadata**
- Card: `summary_large_image`
- Title: `Engineering 3D Printing Materials`
- Description: `From ASA to PEI, see which materials fit marine, automotive, and industrial jobs.`

**Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "3D Printing Materials",
  "url": "https://3d3d.ca/materials",
  "about": "Engineering and functional 3D printing materials"
}
```

## 8. Prusa Consulting Page
**URL slug**  
`/prusa-consulting`

**Meta title**  
Prusa Setup, Consulting, and Buyer Guidance | 3D3D

**Meta description**  
Talk to 3D3D before you buy or configure a Prusa printer. Setup help, workflow guidance, and practical advice from real long-term use.

**H1**  
Prusa setup, consulting, and buyer guidance from someone who actually runs the machines.

**H2/H3 structure**
- H2: Who this service is for
- H2: Buying guidance by workflow and use case
- H2: Setup, tuning, and deployment help
- H2: Why 3D3D recommends Prusa when it fits
- H2: FAQ

**Open Graph title**  
Prusa Setup and Consulting | 3D3D

**Open Graph description**  
Get real-world advice on buying, setting up, and running Prusa printers before you spend the money or lose the time.

**Twitter metadata**
- Card: `summary_large_image`
- Title: `Prusa Setup and Consulting`
- Description: `Buyer guidance, setup support, and practical workflow advice for the Prusa ecosystem.`

**Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Prusa Consulting",
  "url": "https://3d3d.ca/prusa-consulting",
  "provider": {
    "@type": "Organization",
    "name": "3D3D"
  }
}
```

## 9. Shop Page
**URL slug**  
`/shop`

**Meta title**  
3D Printed Products, Organizers, Gifts, and Decor | 3D3D Shop

**Meta description**  
Browse tested 3D printed products from 3D3D, including organizers, gifts, decor, and small-business tabletop accessories.

**H1**  
3D printed products built to sell cleanly and ship cleanly.

**H2/H3 structure**
- H2: Featured categories
- H2: Functional home, gift, and tabletop products
- H2: Need a custom version?
- H2: FAQ

**Open Graph title**  
3D Printed Products and Gifts | 3D3D Shop

**Open Graph description**  
Tested products, organizers, and tabletop pieces from the 3D3D catalog, with custom-version requests available.

**Twitter metadata**
- Card: `summary_large_image`
- Title: `3D Printed Products and Gifts | 3D3D`
- Description: `Shop tested 3D printed products and request custom variants when standard items are close but not exact.`

**Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "3D3D Shop",
  "url": "https://3d3d.ca/shop",
  "mainEntity": {
    "@type": "ItemList",
    "name": "3D3D Product Catalog"
  }
}
```

## 10. Blog Hub
**URL slug**  
`/blog`

**Meta title**  
3D Printing, Materials, and Repair Insights | 3D3D Blog

**Meta description**  
Read 3D3D articles on marine fabrication, automotive restoration, engineering materials, Prusa workflows, and founder-built field projects.

**H1**  
3D printing, materials, repair work, and the jobs that teach the hard lessons.

**H2/H3 structure**
- H2: Marine and offshore fabrication
- H2: Automotive restoration and motorsport
- H2: Materials and process guidance
- H2: Printer expertise and field deployment
- H2: Case studies and campaign updates

**Open Graph title**  
3D Printing, Materials, and Repair Insights | 3D3D

**Open Graph description**  
Actionable articles on marine 3D printing, discontinued parts, materials, restoration work, and printer decision-making.

**Twitter metadata**
- Card: `summary_large_image`
- Title: `3D Printing, Materials, and Repair Insights`
- Description: `Marine, automotive, materials, and founder-built fabrication content from 3D3D.`

**Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "3D3D Blog",
  "url": "https://3d3d.ca/blog",
  "publisher": {
    "@type": "Organization",
    "name": "3D3D"
  }
}
```

## 11. Contact Page
**URL slug**  
`/contact`

**Meta title**  
Contact 3D3D for Custom Fabrication and Quotes

**Meta description**  
Contact 3D3D about custom fabrication, replacement parts, marine jobs, printer setup, or field deployment worldwide.

**H1**  
Talk to 3D3D about the part, project, or problem.

**H2/H3 structure**
- H2: Direct contact
- H2: What to send for the best first reply
- H2: Service types
- H2: FAQ

**Open Graph title**  
Contact 3D3D for Custom Fabrication

**Open Graph description**  
Get in touch about reverse engineering, marine parts, automotive restoration, field deployment, or printer setup support.

**Twitter metadata**
- Card: `summary_large_image`
- Title: `Contact 3D3D for Custom Fabrication`
- Description: `Send the part details, the project notes, or the rough problem description and start the conversation.`

**Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact 3D3D",
  "url": "https://3d3d.ca/contact"
}
```

## 12. Events Page
**URL slug**  
`/events`

**Meta title**  
Events, Deployments, and Live Projects | 3D3D

**Meta description**  
Follow 3D3D events, marine deployments, race-related projects, and on-location fabrication work across offshore and international routes.

**H1**  
Events, deployments, and live projects where 3D3D builds in public.

**H2/H3 structure**
- H2: Upcoming deployments
- H2: Marine and race projects
- H2: Book 3D3D for an event

**Open Graph title**  
Events, Deployments, and Live Projects | 3D3D

**Open Graph description**  
See upcoming 3D3D events and book on-site printing, marine support, or fabrication-driven activations.

**Twitter metadata**
- Card: `summary_large_image`
- Title: `Events, Deployments, and Live Projects`
- Description: `On-location printing, race support, and fabrication events from 3D3D.`

**Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "EventSeries",
  "name": "3D3D Events and Deployments",
  "url": "https://3d3d.ca/events",
  "organizer": {
    "@type": "Organization",
    "name": "3D3D"
  }
}
```
