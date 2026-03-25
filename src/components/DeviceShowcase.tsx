import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/* ─── Types ─────────────────────────────────────────────────────────── */

interface Message {
  sender: 'user' | 'reply';
  text: string;
  isLink?: boolean;
  image?: string;
}

interface Scenario {
  id: string;
  messages: Message[];
  cta: string;
  link: string;
  entrance: { x: number; y: number; rotateY: number; scale: number };
  rest: { rotateY: number; translateZ: number };
  idle: { y: number[]; rotateY: number[]; duration: number; delay: number };
  zIndex: number;
}

/* ─── Scenario data — longer, story-driven conversations ────────────── */

const SCENARIOS: Scenario[] = [
  {
    id: 'marine',
    messages: [
      { sender: 'user', text: 'The winch cup holder cracked on our last passage' },
      { sender: 'user', text: '', image: '/media/workshop/winch-cup-holder.jpg' },
      { sender: 'reply', text: 'We make those. ASA for UV, fits Barient and Lewmar.' },
      { sender: 'reply', text: 'Same one in our shop — $28, ships tomorrow.' },
      { sender: 'user', text: 'Perfect. Can you do two? One for each winch.' },
      { sender: 'reply', text: 'Done. $52 for the pair. They survive offshore.' },
    ],
    cta: 'Contact Us',
    link: '/contact',
    entrance: { x: -140, y: 30, rotateY: -25, scale: 0.85 },
    rest: { rotateY: -10, translateZ: -10 },
    idle: { y: [0, -5, 0], rotateY: [-10, -8, -10], duration: 5, delay: 0 },
    zIndex: 2,
  },
  {
    id: 'print',
    messages: [
      { sender: 'user', text: 'Do you have those floating keychains?' },
      { sender: 'reply', text: 'Yep — they actually float. Great for the boat.' },
      { sender: 'reply', text: '', image: '/media/workshop/floating-keychains.jpg' },
      { sender: 'reply', text: '$12.50 each, or 3 for $30. Any colour.' },
      { sender: 'user', text: 'Three in teal. Can I add the galaxy vase too?' },
      { sender: 'reply', text: 'Absolutely. $53.75 total, ships tomorrow.' },
    ],
    cta: 'Shop Now',
    link: '/shop',
    entrance: { x: 0, y: 80, rotateY: 0, scale: 0.8 },
    rest: { rotateY: 0, translateZ: 30 },
    idle: { y: [0, -7, 0], rotateY: [0, 1.5, 0], duration: 6, delay: 0.5 },
    zIndex: 3,
  },
  {
    id: 'custom',
    messages: [
      { sender: 'user', text: 'I need a custom TV mount for my RV' },
      { sender: 'reply', text: 'We do those. Send a photo of the mounting area.' },
      { sender: 'user', text: '', image: '/media/workshop/custom-tv-mount.jpg' },
      { sender: 'reply', text: 'Nice. PETG-CF will handle the vibration.' },
      { sender: 'user', text: 'What does something like that run?' },
      { sender: 'reply', text: '$65, designed to your specs. 4-day turnaround.' },
    ],
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
    // Image-only messages — just show immediately
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

/* ─── ChatTimeline — orchestrates typing + reveal, auto-scrolls ─────── */

function ChatTimeline({ messages, entered, shouldAnimate }: {
  messages: Message[];
  entered: boolean;
  shouldAnimate: boolean;
}) {
  const [phase, setPhase] = useState<string>('idle');
  const [shownMessages, setShownMessages] = useState<number[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const cycleRef = useRef(0);
  const chatRef = useRef<HTMLDivElement>(null);

  const reset = useCallback(() => {
    setPhase('idle');
    setShownMessages([]);
  }, []);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    const el = chatRef.current;
    if (!el || shownMessages.length === 0) return;
    requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: shouldAnimate ? 'smooth' : 'auto' });
    });
  }, [shownMessages, shouldAnimate]);

  useEffect(() => {
    if (!entered) return;
    if (!shouldAnimate) {
      setShownMessages(messages.map((_, i) => i));
      setPhase('done');
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setPhase('typing-0');
    }, 800);

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [entered, shouldAnimate]);

  useEffect(() => {
    if (!shouldAnimate) return;
    if (phase === 'idle' || phase === 'done') return;

    const match = phase.match(/^(typing|showing)-(\d+)$/);
    if (!match) return;
    const [, action, idxStr] = match;
    const idx = parseInt(idxStr, 10);

    if (action === 'typing') {
      const isImage = !!messages[idx].image && !messages[idx].text;
      const isUser = messages[idx].sender === 'user';
      const typingDuration = isImage ? 400 : isUser ? 600 : 1000;
      timeoutRef.current = setTimeout(() => {
        setShownMessages(prev => [...prev, idx]);
        setPhase(`showing-${idx}`);
      }, typingDuration);
    }

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [phase, shouldAnimate, messages]);

  const handleBubbleDone = useCallback((idx: number) => {
    if (idx < messages.length - 1) {
      timeoutRef.current = setTimeout(() => {
        setPhase(`typing-${idx + 1}`);
      }, 400);
    } else {
      // All messages shown — pause, scroll to top, restart
      timeoutRef.current = setTimeout(() => {
        const el = chatRef.current;
        if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          cycleRef.current++;
          reset();
          setTimeout(() => setPhase('typing-0'), 600);
        }, 1000);
      }, 5000);
    }
  }, [messages.length, reset]);

  const typingMatch = phase.match(/^typing-(\d+)$/);
  const typingIdx = typingMatch ? parseInt(typingMatch[1], 10) : -1;
  const typingIsUser = typingIdx >= 0 ? messages[typingIdx].sender === 'user' : false;

  return (
    <div className="screen-chat" ref={chatRef}>
      {shownMessages.map(idx => (
        <ChatBubble
          key={`${cycleRef.current}-${idx}`}
          msg={messages[idx]}
          shouldAnimate={shouldAnimate}
          onDone={() => handleBubbleDone(idx)}
        />
      ))}
      {typingIdx >= 0 && shouldAnimate && (
        <TypingIndicator isUser={typingIsUser} />
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
              messages={scenario.messages}
              entered={entered}
              shouldAnimate={shouldAnimate}
            />

            <div className="screen-input" aria-hidden="true">
              <span className="screen-input-text">Type a message...</span>
              <span className="screen-input-send">→</span>
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
        <span className="device-cta__arrow">→</span>
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

/* ─── DeviceShowcase — main export ──────────────────────────────────── */

export default function DeviceShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const [enteredPhones, setEnteredPhones] = useState<string[]>([]);
  const [allEntered, setAllEntered] = useState(false);
  const rafRef = useRef<number>();
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

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

  // Mouse tracking
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

    // Phone
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
        style={{ zIndex: scenario.zIndex }}
      >
        <PhoneDevice scenario={scenario} entered={entered} shouldAnimate={shouldAnimate} />
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
