export type ComparisonMark = 'yes' | 'no' | 'partial';

export interface TrustStat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note: string;
  tone: 'alert' | 'solution';
}

export interface CodeExample {
  id: string;
  label: string;
  eyebrow: string;
  summary: string;
  request: string;
  response: string;
  proofPoints: string[];
}

export interface ProtocolArticleIndex {
  article: number;
  title: string;
  chapter: string;
}

export interface ComparisonRow {
  name: string;
  note: string;
  localFirst: ComparisonMark;
  constitutionalGovernance: ComparisonMark;
  evidenceProvenance: ComparisonMark;
  mcpNative: ComparisonMark;
  openSource: ComparisonMark;
  pricing: string;
}

export interface PricingMatrixRow {
  feature: string;
  core: ComparisonMark;
  pro: ComparisonMark;
  compute: ComparisonMark;
  enterprise: ComparisonMark;
}

export const ORA_REPO_URL = 'https://github.com/3d3dcanada/ora';

export const ORA_HERO_TERMINAL_LINES = [
  '$ ora serve',
  'Loading Odin Protocol v0.3.0 - 27 articles, 8 chapters',
  'Constitution loaded. Immutable principles enforced.',
  'MCP tools registered: 8 active',
  'Evidence store: ~/.ora/artifacts',
  'Memory: durable, provenance-tracked',
  'HTTP ready on 127.0.0.1:8001',
  'ORA is sovereign. ORA is watching.',
];

export const ORA_TRUST_STATS: TrustStat[] = [
  {
    value: 1000,
    suffix: '+',
    label: 'AI agents launched into production during the 2025-2026 rush.',
    note: 'Plenty of copilots. Very few systems that can show their work.',
    tone: 'alert',
  },
  {
    value: 0,
    label: 'mainstream agent stacks that default to evidence bundles first.',
    note: 'Most systems still answer first and justify later, if ever.',
    tone: 'alert',
  },
  {
    value: 87,
    suffix: '%',
    label: 'of enterprise AI teams cite hallucination risk as a top deployment concern.',
    note: 'Governance, provenance, and auditability now decide whether pilots survive.',
    tone: 'alert',
  },
  {
    value: 100,
    suffix: '%',
    label: 'of ORA answer paths can be routed through evidence and operator controls.',
    note: 'If the proof trail is missing, the runtime can refuse the answer.',
    tone: 'solution',
  },
];

export const ORA_TOOL_REQUESTS: Record<string, string> = {
  verified_answer: `{
  "method": "tools/call",
  "params": {
    "name": "verified_answer",
    "arguments": {
      "question": "What is the tensile strength of PETG?"
    }
  }
}`,
  grounded_summarize: `{
  "method": "tools/call",
  "params": {
    "name": "grounded_summarize",
    "arguments": {
      "source_ids": ["briefing-19", "supplier-sheet-02"]
    }
  }
}`,
  memory_search: `{
  "method": "tools/call",
  "params": {
    "name": "memory_search",
    "arguments": {
      "query": "What did we decide about marina node pricing?"
    }
  }
}`,
  safe_browser_task: `{
  "method": "tools/call",
  "params": {
    "name": "safe_browser_task",
    "arguments": {
      "goal": "Compare three PETG listings",
      "allowed_domains": ["prusa3d.com", "matterhackers.com"]
    }
  }
}`,
  approval_queue: `{
  "method": "tools/call",
  "params": {
    "name": "approval_queue",
    "arguments": {
      "action": "publish_quote",
      "reason": "Price change exceeds operator threshold"
    }
  }
}`,
  evidence_bundle: `{
  "method": "tools/call",
  "params": {
    "name": "evidence_bundle",
    "arguments": {
      "bundle_id": "mission-214/result-7"
    }
  }
}`,
  create_mission: `{
  "method": "tools/call",
  "params": {
    "name": "create_mission",
    "arguments": {
      "title": "PETG supplier audit",
      "success_criteria": ["source provenance", "price delta", "shipping"]
    }
  }
}`,
  list_missions: `{
  "method": "tools/call",
  "params": {
    "name": "list_missions",
    "arguments": {
      "state": "active"
    }
  }
}`,
};

export const ORA_CODE_EXAMPLES: CodeExample[] = [
  {
    id: 'verified-answer',
    label: 'Verified Answer',
    eyebrow: 'Evidence-first response',
    summary: 'Ask a question, receive an answer, and keep the bundle of proof that got ORA there.',
    request: `{
  "method": "tools/call",
  "params": {
    "name": "verified_answer",
    "arguments": {
      "question": "Which ORA pricing tier keeps the runtime self-hosted?"
    }
  }
}`,
    response: `{
  "answer": "ORA Core keeps the runtime self-hosted and free forever.",
  "confidence": 0.98,
  "evidence_bundle": {
    "sources": [
      {
        "type": "pricing",
        "title": "ORA Core",
        "claim": "Full Rust runtime, self-hosted, bring your own keys"
      }
    ],
    "artifact_path": "~/.ora/artifacts/mission-214/result-7.json"
  }
}`,
    proofPoints: ['Confidence score returned', 'Artifact path persisted', 'Claim linked to source data'],
  },
  {
    id: 'memory-search',
    label: 'Memory Search',
    eyebrow: 'Durable memory',
    summary: 'Query prior decisions with freshness, provenance, and supersession metadata intact.',
    request: `{
  "method": "tools/call",
  "params": {
    "name": "memory_search",
    "arguments": {
      "query": "What shipping policy did the Saint John node approve?",
      "limit": 2
    }
  }
}`,
    response: `{
  "results": [
    {
      "memory_id": "policy-88",
      "summary": "Ship enclosures assembled, electronics isolated, no loose hardware.",
      "confidence": 0.93,
      "freshness": "2026-03-21T18:43:02Z",
      "superseded_by": null
    }
  ]
}`,
    proofPoints: ['Freshness timestamp included', 'Confidence attached to recall', 'Supersession handled explicitly'],
  },
  {
    id: 'browser-task',
    label: 'Browser Task',
    eyebrow: 'Governed automation',
    summary: 'Run a browser task inside policy rails and escalate when the action crosses an approval boundary.',
    request: `{
  "method": "tools/call",
  "params": {
    "name": "safe_browser_task",
    "arguments": {
      "goal": "Collect three PETG listings and prepare a recommendation",
      "allowed_domains": ["prusa3d.com", "matterhackers.com", "fillamentum.com"],
      "require_approval_for": ["checkout", "account_changes"]
    }
  }
}`,
    response: `{
  "status": "approval_required",
  "pending_action": "checkout",
  "summary": "Comparison ready. Purchase blocked until operator approval.",
  "audit_ref": "approval-queue/mission-311"
}`,
    proofPoints: ['Domain scope enforced', 'Sensitive action paused', 'Audit reference created'],
  },
];

export const ORA_PROTOCOL_ARTICLE_INDEX: ProtocolArticleIndex[] = [
  { article: 3, title: 'Data remains owned by the source', chapter: 'Hard-coded principles' },
  { article: 4, title: 'Every brain remains owned by its maker or owner', chapter: 'Hard-coded principles' },
  { article: 5, title: 'Odin is not sellable in a way that breaks sovereignty', chapter: 'Hard-coded principles' },
  { article: 6, title: 'The protocol stands above providers', chapter: 'Hard-coded principles' },
  { article: 7, title: 'Portability is a fundamental right', chapter: 'Hard-coded principles' },
  { article: 8, title: 'Protocol capture is prohibited', chapter: 'Hard-coded principles' },
  { article: 9, title: 'Quality over volume', chapter: 'Hard-coded principles' },
  { article: 10, title: 'Standard protocol fee', chapter: 'Economic rules' },
  { article: 11, title: 'Value creation as the economic foundation', chapter: 'Economic rules' },
  { article: 12, title: 'No race to the bottom', chapter: 'Economic rules' },
  { article: 13, title: 'Nodes must be unique', chapter: 'Nodes, services, and reputation' },
  { article: 14, title: 'Proof of unique value', chapter: 'Nodes, services, and reputation' },
  { article: 15, title: 'Review score based on proven value creation', chapter: 'Nodes, services, and reputation' },
  { article: 16, title: 'Transparency of claims', chapter: 'Nodes, services, and reputation' },
  { article: 17, title: 'No absolute central power', chapter: 'Governance and power' },
  { article: 18, title: 'Explainability of governance', chapter: 'Governance and power' },
  { article: 19, title: 'Hard-coded versus adaptive rules', chapter: 'Governance and power' },
  { article: 20, title: 'Conditions for change', chapter: 'Governance and power' },
  { article: 21, title: 'Rights', chapter: 'Rights and duties of participants' },
  { article: 22, title: 'Duties', chapter: 'Rights and duties of participants' },
  { article: 23, title: 'Abuse', chapter: 'Abuse and enforcement' },
  { article: 24, title: 'Sanctions', chapter: 'Abuse and enforcement' },
  { article: 25, title: 'Proportionality', chapter: 'Abuse and enforcement' },
  { article: 26, title: 'The protocol takes precedence', chapter: 'Final provision' },
  { article: 27, title: 'Mission', chapter: 'Final provision' },
];

export const ORA_COMPETITOR_MATRIX: ComparisonRow[] = [
  {
    name: 'ORA',
    note: 'Runtime, governance layer, and evidence plane in one stack.',
    localFirst: 'yes',
    constitutionalGovernance: 'yes',
    evidenceProvenance: 'yes',
    mcpNative: 'yes',
    openSource: 'yes',
    pricing: 'Free core + paid hosted layers',
  },
  {
    name: 'Ollama',
    note: 'Excellent local model runtime, minimal governance surface.',
    localFirst: 'yes',
    constitutionalGovernance: 'no',
    evidenceProvenance: 'no',
    mcpNative: 'partial',
    openSource: 'yes',
    pricing: 'Free local runtime, cloud optional',
  },
  {
    name: 'LangChain',
    note: 'Composable orchestration framework with broad ecosystem reach.',
    localFirst: 'partial',
    constitutionalGovernance: 'no',
    evidenceProvenance: 'partial',
    mcpNative: 'yes',
    openSource: 'yes',
    pricing: 'OSS + LangSmith paid plans',
  },
  {
    name: 'Guardrails AI',
    note: 'Validation and controls around outputs, not a sovereign runtime.',
    localFirst: 'partial',
    constitutionalGovernance: 'partial',
    evidenceProvenance: 'partial',
    mcpNative: 'no',
    openSource: 'yes',
    pricing: 'OSS + enterprise platform',
  },
  {
    name: 'Cursor',
    note: 'Excellent coding UX with MCP support, but not an evidence-first runtime.',
    localFirst: 'partial',
    constitutionalGovernance: 'no',
    evidenceProvenance: 'no',
    mcpNative: 'yes',
    openSource: 'no',
    pricing: 'Paid editor subscription',
  },
];

export const ORA_PRICING_VIEWS: Record<
  'selfHosted' | 'hosted',
  {
    label: string;
    headline: string;
    description: string;
    rows: PricingMatrixRow[];
  }
> = {
  selfHosted: {
    label: 'Self-hosted',
    headline: 'Own the runtime. Bring your models, keys, and hardware.',
    description: 'For teams that want the constitutional engine inside their own perimeter first.',
    rows: [
      { feature: 'Rust runtime ownership', core: 'yes', pro: 'partial', compute: 'partial', enterprise: 'yes' },
      { feature: 'All 8 MCP tools', core: 'yes', pro: 'yes', compute: 'yes', enterprise: 'yes' },
      { feature: 'Bring your own provider keys', core: 'yes', pro: 'partial', compute: 'partial', enterprise: 'yes' },
      { feature: 'Local memory and artifacts', core: 'yes', pro: 'partial', compute: 'partial', enterprise: 'yes' },
      { feature: 'On-prem governance controls', core: 'partial', pro: 'no', compute: 'partial', enterprise: 'yes' },
      { feature: 'Dedicated SLA and deployment support', core: 'no', pro: 'no', compute: 'no', enterprise: 'yes' },
    ],
  },
  hosted: {
    label: 'Hosted',
    headline: 'Let us host the rails while you keep the constitution intact.',
    description: 'For teams that want fast onboarding, managed routing, and a path to enterprise controls.',
    rows: [
      { feature: 'Managed cloud instance', core: 'no', pro: 'yes', compute: 'yes', enterprise: 'yes' },
      { feature: 'Cloud-synced encrypted memory', core: 'no', pro: 'yes', compute: 'partial', enterprise: 'yes' },
      { feature: 'GPU-backed execution options', core: 'no', pro: 'partial', compute: 'yes', enterprise: 'yes' },
      { feature: 'Priority model routing', core: 'no', pro: 'yes', compute: 'partial', enterprise: 'yes' },
      { feature: 'Compliance and audit reporting', core: 'no', pro: 'no', compute: 'partial', enterprise: 'yes' },
      { feature: 'Custom Odin Protocol overlays', core: 'no', pro: 'no', compute: 'no', enterprise: 'yes' },
    ],
  },
};
