export interface McpTool {
  id: string;
  name: string;
  description: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period?: string;
  features: string[];
  cta: { label: string; href: string };
  isPrimary?: boolean;
}

export interface ProductFamily {
  name: string;
  tagline: string;
  status: 'live' | 'coming-soon';
  accent: string;
  href?: string;
}

export interface ConstitutionExcerpt {
  article: number;
  title: string;
  summary: string;
}

export const ORA_MCP_TOOLS: McpTool[] = [
  { id: 'verified_answer', name: 'Verified Answer', description: 'Every answer backed by an evidence bundle. No hallucination — if it cannot prove it, it says so.' },
  { id: 'grounded_summarize', name: 'Grounded Summarize', description: 'Summaries with full source provenance. Every claim traced back to its origin.' },
  { id: 'memory_search', name: 'Memory Search', description: 'Durable memory with confidence scoring, freshness tracking, and supersession. ORA remembers — accurately.' },
  { id: 'safe_browser_task', name: 'Safe Browser Task', description: 'Governed web actions with domain scoping and approval policies. ORA browses — under your rules.' },
  { id: 'approval_queue', name: 'Approval Queue', description: 'Human-in-the-loop for sensitive operations. Nothing irreversible happens without your sign-off.' },
  { id: 'evidence_bundle', name: 'Evidence Bundle', description: 'Persist and retrieve proof chains. Every reasoning step documented, auditable, and durable.' },
  { id: 'create_mission', name: 'Create Mission', description: 'Define repeatable research jobs with structured objectives, constraints, and success criteria.' },
  { id: 'list_missions', name: 'List Missions', description: 'Track active and completed missions. Full audit trail of what was asked, what was found, and what was decided.' },
];

export const ORA_TECH_STACK = [
  { label: 'Core', value: 'Rust (Axum)' },
  { label: 'Protocol', value: 'HTTP · WebSocket · stdio MCP · HTTP MCP' },
  { label: 'Storage', value: 'SQLite control plane + filesystem artifacts' },
  { label: 'LLM', value: 'Provider-agnostic via LiteLLM (Claude, DeepSeek, Ollama, local)' },
  { label: 'Memory', value: 'Durable with provenance, confidence, freshness, supersession' },
  { label: 'Security', value: 'Crypto · Gates · Sandbox · Vault' },
  { label: 'Constitution', value: 'Odin Protocol v0.3 — 27 articles, 8 chapters (YAML)' },
  { label: 'License', value: 'Open Source' },
];

export const ORA_CONSTITUTION: ConstitutionExcerpt[] = [
  { article: 3, title: 'Data remains owned by the source', summary: 'No operation may transfer data ownership. All access is scoped, permissioned, and purpose-bound. Audit logs exist for every data access operation.' },
  { article: 4, title: 'Every brain remains owned by its maker', summary: 'Brain configurations, context, embeddings, and decision rules are attributable and exportable. Ownership cannot be silently transferred to the platform.' },
  { article: 5, title: 'Not sellable in a way that breaks sovereignty', summary: 'No acquisition or restructuring may reduce participant rights. Export flows remain functional regardless of commercial changes.' },
  { article: 6, title: 'The protocol stands above providers', summary: 'No structural dependency on a single LLM provider. Auth is self-hosted. Model routing is provider-agnostic.' },
];

export const ORA_PRICING: PricingTier[] = [
  {
    name: 'ORA Core',
    price: 'Free',
    period: 'forever',
    features: [
      'Full Rust runtime',
      'All 8 MCP tools',
      'Odin Protocol constitution',
      'SQLite control plane',
      'Evidence bundles & memory',
      'Self-hosted, bring your own keys',
    ],
    cta: { label: 'Get Started', href: 'https://github.com/3d3dcanada' },
  },
  {
    name: 'ORA Pro',
    price: '$19',
    period: '/month',
    features: [
      'Everything in Core',
      'Managed cloud instance',
      'Cloud-synced encrypted memory',
      'Dashboard & analytics',
      'Priority model routing',
      'Email support',
    ],
    cta: { label: 'Join Waitlist', href: '/contact?subject=ora-pro' },
    isPrimary: true,
  },
  {
    name: 'ORA Compute',
    price: 'Usage',
    period: '-based',
    features: [
      'GPU instances with ORA pre-installed',
      'Local models, no external API calls',
      'Fully sovereign — your hardware',
      'Spot & reserved instances',
      'Canadian data residency option',
      'Scale on demand',
    ],
    cta: { label: 'Contact Us', href: '/contact?subject=ora-compute' },
  },
  {
    name: 'ORA Enterprise',
    price: 'Custom',
    features: [
      'On-premise deployment',
      'Custom Odin Protocol articles',
      'SAML/SSO integration',
      'Compliance reporting & audit',
      'Dedicated support SLA',
      'Multi-agent orchestration',
    ],
    cta: { label: 'Talk to Us', href: '/contact?subject=ora-enterprise' },
  },
];

export const ORA_PRODUCT_FAMILY: ProductFamily[] = [
  { name: 'ORA Core', tagline: 'The governed AI runtime. 8 MCP tools. Evidence required.', status: 'live', accent: '#4F46E5', href: '/ora' },
  { name: 'PulZ Governance Kernel', tagline: '47KB TypeScript decision engine. Evidence, confidence, approval, audit chain. Zero dependencies.', status: 'live', accent: '#E84A8A', href: '/governance-kernel' },
  { name: 'ORA Browser', tagline: 'Governed web agent with domain scoping and Polis-style governance.', status: 'coming-soon', accent: '#7C3AED' },
  { name: 'OpenKernel', tagline: '5 emoji-native computational kernels. Education → Security → Agents → Steganography → Manufacturing.', status: 'live', accent: '#F59E0B', href: '/openkernel' },
];
