import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

/* ─── Types ─────────────────────────────────────────────────────────── */

interface Message {
  sender: 'user' | 'reply';
  text: string;
  isLink?: boolean;
  image?: string;
}

interface MessageFragment {
  platform: 'whatsapp' | 'instagram' | 'facebook' | 'website';
  messages: Message[];
}

interface Scenario {
  id: string;
  messagePool: MessageFragment[];
  cta: string;
  link: string;
  entrance: { x: number; y: number; rotateY: number; scale: number };
  rest: { rotateY: number; translateZ: number };
  idle: { y: number[]; rotateY: number[]; duration: number; delay: number };
  zIndex: number;
}

type DisplayItem =
  | { type: 'message'; msg: Message; key: number; animate: boolean }
  | { type: 'separator'; platform: string; key: number };

/* ─── Platform labels ──────────────────────────────────────────────── */

const PLATFORM_LABELS: Record<string, string> = {
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
  facebook: 'Messenger',
  website: '3d3d.ca',
};

/* ─── Message pools — multi-platform conversations per phone ───────── */

const MESSAGE_POOLS: Record<string, MessageFragment[]> = {
  marine: [
    {
      platform: 'whatsapp',
      messages: [
        { sender: 'user', text: 'The winch cup holder cracked on our last passage' },
        { sender: 'user', text: '', image: '/media/workshop/winch-cup-holder.jpg' },
        { sender: 'reply', text: 'We make those. ASA for UV, fits Barient and Lewmar.' },
        { sender: 'reply', text: 'Same one in our shop \u2014 $28, ships tomorrow.' },
        { sender: 'user', text: 'Perfect. Can you do two? One for each winch.' },
        { sender: 'reply', text: 'Done. $52 for the pair. They survive offshore.' },
      ],
    },
    {
      platform: 'instagram',
      messages: [
        { sender: 'user', text: 'Saw your page \u2014 do you make custom brackets?' },
        { sender: 'reply', text: 'All the time. What do you need?' },
        { sender: 'user', text: 'Rod holder bracket for a Catalina 30' },
        { sender: 'reply', text: 'PETG or ASA depending on location.' },
        { sender: 'user', text: 'Cockpit, so it\u2019ll get sun' },
        { sender: 'reply', text: 'ASA then. $35, ready in 3 days.' },
      ],
    },
    {
      platform: 'facebook',
      messages: [
        { sender: 'user', text: 'Will you be at the Fredericton Boat Show?' },
        { sender: 'reply', text: 'We will! Booth 14, by the entrance.' },
        { sender: 'user', text: 'I need replacement cleats for my Grampian' },
        { sender: 'reply', text: 'Bring one and we\u2019ll scan it on the spot.' },
        { sender: 'user', text: 'Seriously? That fast?' },
        { sender: 'reply', text: 'That\u2019s how we work. See you there.' },
      ],
    },
    {
      platform: 'website',
      messages: [
        { sender: 'reply', text: 'New quote request received' },
        { sender: 'user', text: 'Need a nav light mount for a 1972 Alberg' },
        { sender: 'reply', text: 'Classic boat. We\u2019ve done Alberg parts before.' },
        { sender: 'user', text: 'The original mount is discontinued' },
        { sender: 'reply', text: 'That\u2019s our specialty. Send dimensions and we\u2019ll model it.' },
        { sender: 'user', text: 'Amazing. I\u2019ll send photos tonight.' },
      ],
    },
  ],
  print: [
    {
      platform: 'whatsapp',
      messages: [
        { sender: 'user', text: 'Do you have those floating keychains?' },
        { sender: 'reply', text: 'Yep \u2014 they actually float. Great for the boat.' },
        { sender: 'reply', text: '', image: '/media/workshop/floating-keychains.jpg' },
        { sender: 'reply', text: '$12.50 each, or 3 for $30. Any colour.' },
        { sender: 'user', text: 'Three in teal please' },
        { sender: 'reply', text: 'Done. Ships tomorrow.' },
      ],
    },
    {
      platform: 'instagram',
      messages: [
        { sender: 'user', text: 'Is that galaxy vase still available?' },
        { sender: 'reply', text: 'It is! One of our most popular prints.' },
        { sender: 'user', text: 'What size is it?' },
        { sender: 'reply', text: '8 inches tall. Silk PLA, so it really shimmers.' },
        { sender: 'user', text: 'I\u2019ll take one. Can you do it in blue?' },
        { sender: 'reply', text: 'Absolutely. $24, ready in 2 days.' },
      ],
    },
    {
      platform: 'website',
      messages: [
        { sender: 'reply', text: 'Order #3D-0847 confirmed' },
        { sender: 'reply', text: '2x Floating Keychains (Teal)' },
        { sender: 'reply', text: '1x Minecraft Creeper Keychain' },
        { sender: 'reply', text: 'Total: $37.50 \u2014 printing now' },
        { sender: 'user', text: 'Can I add a rabbit keychain to that?' },
        { sender: 'reply', text: 'Added. New total: $47.50. Still ships tomorrow.' },
      ],
    },
    {
      platform: 'facebook',
      messages: [
        { sender: 'user', text: 'My kids love those Minecraft keychains' },
        { sender: 'reply', text: 'We have the full set \u2014 Creeper, Enderman, Skeleton' },
        { sender: 'user', text: 'Do you do birthday party favours?' },
        { sender: 'reply', text: 'All the time. Bulk pricing at 10+' },
        { sender: 'user', text: 'How much for 15 assorted?' },
        { sender: 'reply', text: '$8 each at that quantity. $120 total.' },
      ],
    },
  ],
  custom: [
    {
      platform: 'facebook',
      messages: [
        { sender: 'user', text: 'I need a custom TV mount for my RV' },
        { sender: 'reply', text: 'We do those. Send a photo of the mounting area.' },
        { sender: 'user', text: '', image: '/media/workshop/custom-tv-mount.jpg' },
        { sender: 'reply', text: 'Nice. PETG-CF will handle the vibration.' },
        { sender: 'user', text: 'What does something like that run?' },
        { sender: 'reply', text: '$65, designed to your specs. 4-day turnaround.' },
      ],
    },
    {
      platform: 'whatsapp',
      messages: [
        { sender: 'user', text: 'We need custom enclosures for monitoring equipment' },
        { sender: 'reply', text: 'Industrial enclosures \u2014 we do those regularly.' },
        { sender: 'user', text: 'It\u2019s for the Conservation Council, outdoor use' },
        { sender: 'reply', text: 'ASA with UV coating. IP65 rated design.' },
        { sender: 'user', text: 'How many can you produce?' },
        { sender: 'reply', text: 'Capacity for 50+ units. Let\u2019s schedule a call.' },
      ],
    },
    {
      platform: 'instagram',
      messages: [
        { sender: 'user', text: 'Can you 3D scan a part for me?' },
        { sender: 'reply', text: 'That\u2019s literally what we do. What is it?' },
        { sender: 'user', text: 'Vintage car door handle, no longer manufactured' },
        { sender: 'reply', text: 'We\u2019ll scan it, model it, and print in nylon.' },
        { sender: 'user', text: 'Will it be strong enough for daily use?' },
        { sender: 'reply', text: 'Nylon PA12 \u2014 stronger than the original. $45.' },
      ],
    },
    {
      platform: 'website',
      messages: [
        { sender: 'reply', text: 'New service request via 3d3d.ca' },
        { sender: 'user', text: 'Need a replacement knob for a 1960s amplifier' },
        { sender: 'reply', text: 'Vintage audio \u2014 fun project. Got measurements?' },
        { sender: 'user', text: 'D-shaft, 6mm. The original is bakelite' },
        { sender: 'reply', text: 'We\u2019ll match the look in black resin. $22.' },
        { sender: 'user', text: 'Perfect. Where do I send the reference photo?' },
      ],
    },
  ],
};

/* ─── Scenario data ────────────────────────────────────────────────── */

const SCENARIOS: Scenario[] = [
  {
    id: 'marine',
    messagePool: MESSAGE_POOLS.marine,
    cta: 'Contact Us',
    link: '/contact',
    entrance: { x: -140, y: 30, rotateY: -25, scale: 0.85 },
    rest: { rotateY: -10, translateZ: -10 },
    idle: { y: [0, -5, 0], rotateY: [-10, -8, -10], duration: 5, delay: 0 },
    zIndex: 2,
  },
  {
    id: 'print',
    messagePool: MESSAGE_POOLS.print,
    cta: 'Shop Now',
    link: '/shop',
    entrance: { x: 0, y: 80, rotateY: 0, scale: 0.8 },
    rest: { rotateY: 0, translateZ: 30 },
    idle: { y: [0, -7, 0], rotateY: [0, 1.5, 0], duration: 6, delay: 0.5 },
    zIndex: 3,
  },
  {
    id: 'custom',
    messagePool: MESSAGE_POOLS.custom,
    cta: 'Get a Quote',
    link: '/contact',
    entrance: { x: 140, y: 30, rotateY: 25, scale: 0.85 },
    rest: { rotateY: 10, translateZ: -10 },
    idle: { y: [0, -4, 0], rotateY: [10, 12, 10], duration: 5.5, delay: 1 },
    zIndex: 1,
  },
];

const DIVIDERS = [
  { color: 'teal', afterPhone: 'marine' },
  { color: 'magenta', afterPhone: 'print' },
];

const MAX_VISIBLE = 30;
const TRIM_TO = 22;

/* ─── TypingIndicator ───────────────────────────────────────────────── */

function TypingIndicator({ isUser }: { isUser: boolean }) {
  return (
    <div className={`typing-indicator${isUser ? ' typing-indicator--user' : ''}`}>
      {!isUser && <span className="chat-msg-avatar">3D</span>}
      <div className="typing-dots">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

/* ─── PlatformSeparator ────────────────────────────────────────────── */

function PlatformSeparator({ platform }: { platform: string }) {
  return (
    <div className="chat-platform-sep">
      <span className="chat-platform-sep__line" />
      <span className="chat-platform-sep__label">via {PLATFORM_LABELS[platform] || platform}</span>
      <span className="chat-platform-sep__line" />
    </div>
  );
}

/* ─── ChatBubble — word-by-word reveal + image support ──────────────── */

function ChatBubble({ msg, onDone, shouldAnimate }: {
  msg: Message;
  onDone: () => void;
  shouldAnimate: boolean;
}) {
  const [visibleWords, setVisibleWords] = useState(0);
  const words = msg.text ? msg.text.split(' ') : [];
  const doneRef = useRef(false);

  useEffect(() => {
    if (msg.image && !msg.text) {
      if (!doneRef.current) { doneRef.current = true; onDone(); }
      return;
    }

    if (!shouldAnimate) {
      setVisibleWords(words.length);
      if (!doneRef.current) { doneRef.current = true; onDone(); }
      return;
    }
    setVisibleWords(0);
    doneRef.current = false;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleWords(i);
      if (i >= words.length) {
        clearInterval(interval);
        if (!doneRef.current) { doneRef.current = true; onDone(); }
      }
    }, 50);
    return () => clearInterval(interval);
  }, [msg.text, msg.image, shouldAnimate]);

  const displayText = words.slice(0, visibleWords).join(' ');

  if (msg.sender === 'user') {
    return (
      <div className="chat-msg chat-msg--user visible">
        {msg.image && <img src={msg.image} alt="" className="chat-msg-image" loading="lazy" />}
        {msg.isLink ? (
          <span className="chat-msg-link">{displayText}</span>
        ) : displayText}
      </div>
    );
  }

  return (
    <div className="chat-msg chat-msg--reply visible">
      <span className="chat-msg-avatar">3D</span>
      <span className="chat-msg-text">
        {msg.image && <img src={msg.image} alt="" className="chat-msg-image" loading="lazy" />}
        {displayText}
      </span>
    </div>
  );
}

/* ─── ChatTimeline — continuous feed, never loops back ────────────── */

function ChatTimeline({ phoneId, entered, shouldAnimate }: {
  phoneId: string;
  entered: boolean;
  shouldAnimate: boolean;
}) {
  const pool = MESSAGE_POOLS[phoneId];
  const chatRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Mutable tracking refs
  const fragmentIdx = useRef(0);
  const msgInFragment = useRef(0);
  const keyCounter = useRef(0);
  const latestKey = useRef(-1);
  const startedRef = useRef(false);
  const advanceRef = useRef<() => void>();

  const [items, setItems] = useState<DisplayItem[]>([]);
  const [typing, setTyping] = useState<boolean | null>(null);

  // Auto-scroll to bottom when new content appears
  useEffect(() => {
    const el = chatRef.current;
    if (!el || items.length === 0) return;
    requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: shouldAnimate ? 'smooth' : 'auto' });
    });
  }, [items, typing, shouldAnimate]);

  // Define the advance function (stored in ref to avoid stale closures)
  useEffect(() => {
    advanceRef.current = () => {
      const fi = fragmentIdx.current % pool.length;
      const mi = msgInFragment.current;
      const fragment = pool[fi];

      // Start of a new fragment — insert platform separator
      if (mi === 0) {
        const sepKey = keyCounter.current++;
        setItems(prev => {
          const next: DisplayItem[] = [
            ...prev,
            { type: 'separator', platform: fragment.platform, key: sepKey },
          ];
          return next.length > MAX_VISIBLE ? next.slice(-TRIM_TO) : next;
        });
        // Small pause after separator, then start first message
        timeoutRef.current = setTimeout(() => {
          msgInFragment.current = 0;
          advanceRef.current?.();
        }, 600);
        // Mark that we've passed the separator stage
        msgInFragment.current = -1;
        return;
      }

      // We just inserted separator, now actually start at message 0
      if (mi === -1) {
        msgInFragment.current = 0;
      }

      const actualMi = msgInFragment.current;
      if (actualMi >= fragment.messages.length) {
        // Fragment complete — pause then advance to next
        fragmentIdx.current++;
        msgInFragment.current = 0;
        timeoutRef.current = setTimeout(() => advanceRef.current?.(), 2000);
        return;
      }

      const msg = fragment.messages[actualMi];
      const isUser = msg.sender === 'user';
      const isImage = !!msg.image && !msg.text;

      // Show typing indicator
      setTyping(isUser);
      const typingDuration = isImage ? 400 : isUser ? 600 : 1000;

      timeoutRef.current = setTimeout(() => {
        setTyping(null);
        const key = keyCounter.current++;
        latestKey.current = key;
        setItems(prev => {
          const next: DisplayItem[] = [
            ...prev,
            { type: 'message', msg, key, animate: shouldAnimate },
          ];
          return next.length > MAX_VISIBLE ? next.slice(-TRIM_TO) : next;
        });
        msgInFragment.current = actualMi + 1;
        // ChatBubble onDone triggers the next advance via handleBubbleDone
      }, typingDuration);
    };
  }, [pool, shouldAnimate]);

  // Start the continuous feed when phone enters
  useEffect(() => {
    if (!entered || startedRef.current) return;
    startedRef.current = true;

    if (!shouldAnimate) {
      // Reduced motion: show first fragment immediately
      const first = pool[0];
      const initialItems: DisplayItem[] = [
        { type: 'separator', platform: first.platform, key: 0 },
        ...first.messages.map((msg, i) => ({
          type: 'message' as const,
          msg,
          key: i + 1,
          animate: false,
        })),
      ];
      setItems(initialItems);
      keyCounter.current = initialItems.length;
      latestKey.current = initialItems.length - 1;
      fragmentIdx.current = 1;
      msgInFragment.current = 0;
      // Start continuous feed after a pause
      timeoutRef.current = setTimeout(() => advanceRef.current?.(), 4000);
      return;
    }

    // Animated: start after entrance animation settles
    timeoutRef.current = setTimeout(() => advanceRef.current?.(), 800);
  }, [entered, shouldAnimate, pool]);

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  // When a bubble finishes word reveal, advance to next message
  const handleBubbleDone = useCallback((bubbleKey: number) => {
    if (bubbleKey === latestKey.current) {
      timeoutRef.current = setTimeout(() => advanceRef.current?.(), 400);
    }
  }, []);

  return (
    <div className="screen-chat" ref={chatRef}>
      {items.map(item => {
        if (item.type === 'separator') {
          return <PlatformSeparator key={`sep-${item.key}`} platform={item.platform} />;
        }
        return (
          <ChatBubble
            key={item.key}
            msg={item.msg}
            shouldAnimate={item.animate}
            onDone={() => handleBubbleDone(item.key)}
          />
        );
      })}
      {typing !== null && shouldAnimate && (
        <TypingIndicator isUser={typing} />
      )}
    </div>
  );
}

/* ─── PhoneDevice — single 6-layer iPhone frame ─────────────────────── */

function PhoneDevice({ scenario, entered, shouldAnimate }: {
  scenario: Scenario;
  entered: boolean;
  shouldAnimate: boolean;
}) {
  return (
    <div className="device-phone-root">
      <div className={`device-bevel${scenario.id === 'print' ? ' device-bevel--center' : ''}`}>
        <div className="device-body">
          <div className="device-screen">
            <div className="dynamic-island" aria-hidden="true" />

            <div className="screen-header">
              <div className="screen-header-avatar">3D</div>
              <div className="screen-header-info">
                <span className="screen-header-name">3D3D</span>
                <span className="screen-header-status">
                  <span className="screen-online-dot" />
                  Online
                </span>
              </div>
            </div>

            <ChatTimeline
              phoneId={scenario.id}
              entered={entered}
              shouldAnimate={shouldAnimate}
            />

            <div className="screen-input" aria-hidden="true">
              <span className="screen-input-text">Type a message...</span>
              <span className="screen-input-send">&rarr;</span>
            </div>
          </div>
          <div className="device-inset" aria-hidden="true" />
          <div className="device-shine" aria-hidden="true" />
        </div>
      </div>

      <a
        href={scenario.link}
        className={`device-cta${entered ? ' visible' : ''} device-cta--${scenario.id}`}
      >
        <span className="device-cta__text">{scenario.cta}</span>
        <span className="device-cta__arrow">&rarr;</span>
      </a>
    </div>
  );
}

/* ─── Accent Divider between phones ─────────────────────────────────── */

function PhoneDivider({ color, visible }: { color: string; visible: boolean }) {
  if (!visible) return <div className="phone-divider-spacer" />;
  return (
    <motion.div
      className={`phone-divider phone-divider--${color}`}
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 0.8, scaleY: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

/* ─── DeviceShowcase — main export with scroll parallax ─────────────── */

export default function DeviceShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const [enteredPhones, setEnteredPhones] = useState<string[]>([]);
  const [allEntered, setAllEntered] = useState(false);
  const rafRef = useRef<number>();
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Scroll-reactive parallax (Phase 1D)
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end start'],
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const mult = isMobile ? 0.5 : 1;

  // Different parallax Y per phone position
  const parallaxLeftY = useTransform(scrollYProgress, [0, 1], [0, -30 * mult]);
  const parallaxCenterY = useTransform(scrollYProgress, [0, 1], [0, -50 * mult]);
  const parallaxRightY = useTransform(scrollYProgress, [0, 1], [0, -20 * mult]);
  const parallaxRotateX = useTransform(scrollYProgress, [0, 1], [0, 5 * mult]);
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const parallaxY = [parallaxLeftY, parallaxCenterY, parallaxRightY];

  // Phone entrance via CustomEvent
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.phone) {
        setEnteredPhones(prev =>
          prev.includes(detail.phone) ? prev : [...prev, detail.phone]
        );
      }
    };
    window.addEventListener('phone-enter', handler);
    return () => window.removeEventListener('phone-enter', handler);
  }, []);

  useEffect(() => {
    if (enteredPhones.length >= SCENARIOS.length) setAllEntered(true);
  }, [enteredPhones]);

  // Reduced motion or fallback entrance
  useEffect(() => {
    if (shouldReduceMotion) {
      setEnteredPhones(SCENARIOS.map(s => s.id));
      return;
    }
    const fallback = setTimeout(() => {
      setEnteredPhones(prev =>
        prev.length < SCENARIOS.length ? SCENARIOS.map(s => s.id) : prev
      );
    }, 5000);
    return () => clearTimeout(fallback);
  }, [shouldReduceMotion]);

  // Mouse tracking for 3D tilt
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || shouldReduceMotion) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMove = (e: MouseEvent) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const rect = scene.getBoundingClientRect();
        const rx = Math.max(-10, Math.min(10, (e.clientX - rect.left - rect.width / 2) / 25));
        const ry = Math.max(-6, Math.min(6, -(e.clientY - rect.top - rect.height / 2) / 25));
        scene.style.setProperty('--rx', String(rx));
        scene.style.setProperty('--ry', String(ry));
        scene.querySelectorAll('.device-wrapper').forEach(w => w.removeAttribute('data-idle'));
        if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
        rafRef.current = undefined;
      });
    };

    const handleLeave = () => {
      scene.querySelectorAll('.device-wrapper').forEach(w => w.setAttribute('data-idle', ''));
      scene.style.setProperty('--rx', '0');
      scene.style.setProperty('--ry', '0');
    };

    scene.addEventListener('mousemove', handleMove);
    scene.addEventListener('mouseleave', handleLeave);
    return () => {
      scene.removeEventListener('mousemove', handleMove);
      scene.removeEventListener('mouseleave', handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldReduceMotion]);

  const shouldAnimate = !shouldReduceMotion;

  // Build render list: phone, divider, phone, divider, phone
  const renderItems: JSX.Element[] = [];

  SCENARIOS.forEach((scenario, i) => {
    const entered = enteredPhones.includes(scenario.id);

    // Scroll parallax wrapper (outer) + entrance/idle animation (inner)
    const phoneEl = shouldReduceMotion ? (
      <div
        key={scenario.id}
        className="device-wrapper"
        style={{ zIndex: scenario.zIndex }}
      >
        <PhoneDevice scenario={scenario} entered={true} shouldAnimate={false} />
      </div>
    ) : (
      <motion.div
        key={scenario.id}
        className="device-parallax-wrap"
        style={{
          y: parallaxY[i],
          rotateX: parallaxRotateX,
          scale: parallaxScale,
          zIndex: scenario.zIndex,
        }}
      >
        <motion.div
          className="device-wrapper"
          initial={{
            opacity: 0,
            x: scenario.entrance.x,
            y: scenario.entrance.y,
            rotateY: scenario.entrance.rotateY,
            scale: scenario.entrance.scale,
          }}
          animate={entered ? {
            opacity: 1,
            x: 0,
            y: allEntered ? scenario.idle.y : 0,
            rotateY: allEntered ? scenario.idle.rotateY : scenario.rest.rotateY,
            scale: 1,
            translateZ: scenario.rest.translateZ,
          } : undefined}
          transition={allEntered ? {
            y: { repeat: Infinity, duration: scenario.idle.duration, ease: 'easeInOut', delay: scenario.idle.delay },
            rotateY: { repeat: Infinity, duration: scenario.idle.duration, ease: 'easeInOut', delay: scenario.idle.delay },
            default: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          } : {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{
            scale: 1.04,
            translateZ: 40,
            transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <PhoneDevice scenario={scenario} entered={entered} shouldAnimate={shouldAnimate} />
        </motion.div>
      </motion.div>
    );

    renderItems.push(phoneEl);

    // Divider after this phone (if not the last)
    const divider = DIVIDERS.find(d => d.afterPhone === scenario.id);
    if (divider) {
      const nextScenario = SCENARIOS[i + 1];
      const nextEntered = nextScenario ? enteredPhones.includes(nextScenario.id) : false;
      renderItems.push(
        <PhoneDivider
          key={`divider-${divider.color}`}
          color={divider.color}
          visible={entered && nextEntered}
        />
      );
    }
  });

  return (
    <div ref={sceneRef} className="device-scene">
      {renderItems}
    </div>
  );
}
