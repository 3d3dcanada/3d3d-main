export interface Opcode {
  emoji: string;
  name: string;
  description: string;
  category: 'data' | 'arithmetic' | 'control' | 'io' | 'memory' | 'system';
}

export interface AuthorityLevel {
  level: string;
  code: string;
  color: string;
  emoji: string;
  name: string;
  description: string;
}

export interface Kernel {
  id: string;
  name: string;
  version: string;
  emoji: string;
  tagline: string;
  description: string;
  status: 'shipped' | 'development' | 'planned';
  accent: string;
  features: string[];
  audience: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const KERNELS: Kernel[] = [
  {
    id: 'edu',
    name: 'OpenKernel EDU',
    version: 'v1.0.0',
    emoji: '📚',
    tagline: 'Learn how computers work. No English. No barriers. Just emojis.',
    description: 'The most accessible computer science education platform in history. A 6-year-old in rural India, a 60-year-old switching careers, and a university CS student can all understand how operating systems work — in emoji.',
    status: 'shipped',
    accent: '#F59E0B',
    features: [
      '23-opcode emoji assembly language (EmojiASM)',
      'Visual CPU pipeline and process scheduler',
      'Memory management simulator with page faults',
      'Guided walkthroughs with glowing tile system',
      '3 live OS simulations (single-core, multi-core, hexacore)',
      '6 languages: English, Espanol, Francais, 中文, العربية, हिन्दी',
      'WCAG 2.1 AAA accessible',
      'Runs in any browser — zero install',
    ],
    audience: ['K-12 STEM education', 'University CS courses', 'Non-English speakers', 'Adult learners', 'Special education'],
    liveUrl: 'https://openkernel-edu.pages.dev/',
    githubUrl: 'https://github.com/OpenKernel-edu/emoji-kernel-edu',
  },
  {
    id: 'secure',
    name: 'OpenKernel SECURE',
    version: 'v2.0.0',
    emoji: '🔐',
    tagline: 'Security you can see. Governance you can trust.',
    description: 'Enterprise-grade security with visual transparency. Every permission, every escalation, every audit trail visible as emoji operations. Make security understandable to non-technical stakeholders.',
    status: 'development',
    accent: '#EF4444',
    features: [
      'Visual authority levels A0-A5 with emoji badges',
      'Real-time audit event stream',
      'HMAC-SHA256 signatures as visual badges',
      'Approval gates with multi-party sign-off',
      'Threat detection dashboard',
      'Unicode Variation Selector defense (X-Ray inspector)',
      'Byzantine consensus visualization',
      'FIPS 140-2 compliant crypto',
    ],
    audience: ['Enterprise IT security', 'Compliance auditors', 'DevSecOps engineers', 'Regulated industries', 'Government agencies'],
  },
  {
    id: 'agent',
    name: 'OpenKernel AGENT',
    version: 'v3.0.0',
    emoji: '🤖',
    tagline: 'Watch your AI think. Control what it does.',
    description: 'Turn black-box AI agents into transparent, observable systems. Every API call, every context switch, every decision visible as emoji processes. Make AI safety tangible.',
    status: 'development',
    accent: '#8B5CF6',
    features: [
      'Agent process visualization (real-time PID tree)',
      'Memory/context window visualizer',
      'Network inspector for all API calls',
      'Skill execution sandbox with circuit breakers',
      'Agent health dashboard (uptime, errors, token budget)',
      'Tool call transparency — see before execution',
      'ORA integration for governed agent execution',
      'OpenTelemetry observability',
    ],
    audience: ['AI safety researchers', 'Agent developers', 'Enterprise AI deployments', 'Research institutions', 'Regulatory compliance'],
  },
  {
    id: 'mischief',
    name: 'OpenKernel MISCHIEF',
    version: 'v4.2.0',
    emoji: '🎭',
    tagline: 'The kernel that hides in plain sight.',
    description: 'Explore the bleeding edge of emoji computation. Steganographic communication, hidden state machines, digital watermarking. Dual-use research for security defense and provenance tracking.',
    status: 'planned',
    accent: '#EC4899',
    features: [
      'Unicode steganography engine (~2KB per emoji)',
      'Dual-mode execution (standard + stealth)',
      '3D3D watermarking system for model provenance',
      'Anti-tampering detection via hidden signatures',
      'Unicode X-Ray inspector tool',
      'Variation Selector defense suite',
      'Digital provenance chain visualization',
      'Ethical use agreement required',
    ],
    audience: ['Security researchers', 'Digital forensics', 'Cryptography researchers', '3D3D provenance system', 'Ethical hackers'],
  },
  {
    id: 'mfg',
    name: 'OpenKernel MFG',
    version: 'v5.0.0',
    emoji: '🏭',
    tagline: 'Run your factory in emoji. Seriously.',
    description: 'Bridge emoji computation with real-world hardware. Control 3D printers, CNC machines, robotics, and IoT devices using emoji-native protocols. Make industrial automation accessible to makers.',
    status: 'planned',
    accent: '#10B981',
    features: [
      'Device driver ecosystem (printer, CNC, robot, sensor, relay)',
      'G-code pipeline: STL → validate → slice → print → monitor → ship',
      'Job queue visualization with real-time status',
      'Cooperative revenue tracker (75% maker / 25% platform)',
      'Network topology for distributed print farms',
      'Safety checks before every hardware operation',
      'MQTT + Serial + GPIO + Network protocols',
      'Raspberry Pi and edge device deployment',
    ],
    audience: ['3D3D cooperative members', 'Maker spaces', 'Manufacturing ops', 'IoT developers', 'Educational robotics'],
  },
];

export const EMOJIASM_OPCODES: Opcode[] = [
  { emoji: '📥', name: 'LOAD', description: 'Load value into register', category: 'data' },
  { emoji: '💾', name: 'STORE', description: 'Store register to memory', category: 'data' },
  { emoji: '📋', name: 'COPY', description: 'Copy register to register', category: 'data' },
  { emoji: '➕', name: 'ADD', description: 'Add to R0', category: 'arithmetic' },
  { emoji: '➖', name: 'SUB', description: 'Subtract from R0', category: 'arithmetic' },
  { emoji: '✖️', name: 'MUL', description: 'Multiply R0', category: 'arithmetic' },
  { emoji: '➗', name: 'DIV', description: 'Divide R0', category: 'arithmetic' },
  { emoji: '🔄', name: 'LOOP', description: 'Loop N times', category: 'control' },
  { emoji: '❓', name: 'IF', description: 'Conditional branch', category: 'control' },
  { emoji: '⬆️', name: 'JMP', description: 'Jump to address', category: 'control' },
  { emoji: '📞', name: 'CALL', description: 'Call subroutine', category: 'control' },
  { emoji: '↩️', name: 'RET', description: 'Return from subroutine', category: 'control' },
  { emoji: '🖨️', name: 'PRINT', description: 'Print register value', category: 'io' },
  { emoji: '⌨️', name: 'INPUT', description: 'Read user input', category: 'io' },
  { emoji: '📡', name: 'SEND', description: 'Send data to network', category: 'io' },
  { emoji: '📨', name: 'RECV', description: 'Receive from network', category: 'io' },
  { emoji: '🔒', name: 'LOCK', description: 'Acquire mutex lock', category: 'memory' },
  { emoji: '🔓', name: 'UNLOCK', description: 'Release mutex lock', category: 'memory' },
  { emoji: '📄', name: 'ALLOC', description: 'Allocate memory page', category: 'memory' },
  { emoji: '🗑️', name: 'FREE', description: 'Free memory page', category: 'memory' },
  { emoji: '⏸️', name: 'SLEEP', description: 'Sleep N milliseconds', category: 'system' },
  { emoji: '🚨', name: 'INT', description: 'Raise interrupt', category: 'system' },
  { emoji: '⏹️', name: 'HALT', description: 'Stop execution', category: 'system' },
];

export const AUTHORITY_LEVELS: AuthorityLevel[] = [
  { level: 'A0', code: 'READ_ONLY', color: '#22C55E', emoji: '🟢', name: 'Read Only', description: 'Public information access. No side effects.' },
  { level: 'A1', code: 'SAFE_COMPUTE', color: '#3B82F6', emoji: '🔵', name: 'Safe Compute', description: 'Sandboxed computation. Math, parsing, formatting.' },
  { level: 'A2', code: 'INFO_RETRIEVAL', color: '#EAB308', emoji: '🟡', name: 'Info Retrieval', description: 'Network read access. Web search, API queries.' },
  { level: 'A3', code: 'FILE_READ', color: '#F97316', emoji: '🟠', name: 'File Read', description: 'Local filesystem read. Configuration, logs, data.' },
  { level: 'A4', code: 'FILE_WRITE', color: '#EF4444', emoji: '🔴', name: 'File Write', description: 'Filesystem write. Requires approval for sensitive paths.' },
  { level: 'A5', code: 'SYSTEM_EXEC', color: '#1F2937', emoji: '⚫', name: 'System Exec', description: 'Full system execution. Requires MFA and multi-party approval.' },
];

export const OPCODE_CATEGORIES = [
  { id: 'data', label: 'Data', color: '#3B82F6' },
  { id: 'arithmetic', label: 'Arithmetic', color: '#F59E0B' },
  { id: 'control', label: 'Control Flow', color: '#8B5CF6' },
  { id: 'io', label: 'Input/Output', color: '#10B981' },
  { id: 'memory', label: 'Memory', color: '#EF4444' },
  { id: 'system', label: 'System', color: '#EC4899' },
];
