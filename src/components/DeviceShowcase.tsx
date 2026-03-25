import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/* ─── Types ─────────────────────────────────────────────────────────── */

interface Message {
  sender: 'user' | 'reply';
  text: string;
  isLink?: boolean;
}

interface Scenario {
  id: string;
  messages: Message[];
  cta: string;
  link: string;
  entrance: { x: number; y: number; rotateY: number; scale: number; delay: number };
  rest: { rotateY: number; translateZ: number };
  zIndex: number;
}

/* ─── Scenario data ─────────────────────────────────────────────────── */

const SCENARIOS: Scenario[] = [
  {
    id: 'marine',
    messages: [
      { sender: 'user', text: 'I need a mast clip for my sailboat reproduced — the original cracked' },
      { sender: 'reply', text: 'Send me a few photos and measurements. We can reproduce it from those.' },
      { sender: 'reply', text: 'Quote incoming — check your inbox shortly.' },
    ],
    cta: 'Start a conversation →',
    link: '/contact',
    entrance: { x: -120, y: 0, rotateY: -25, scale: 1, delay: 0 },
    rest: { rotateY: -8, translateZ: 0 },
    zIndex: 2,
  },
  {
    id: 'print',
    messages: [
      { sender: 'user', text: "I want this printed — here's the link" },
      { sender: 'user', text: 'makerworld.com/model/...', isLink: true },
      { sender: 'reply', text: 'Got it. $23.75, ready in 2 days. Want me to go ahead?' },
    ],
    cta: 'Browse the shop →',
    link: '/shop',
    entrance: { x: 0, y: 80, rotateY: 0, scale: 0.9, delay: 0 },
    rest: { rotateY: 0, translateZ: 20 },
    zIndex: 3,
  },
  {
    id: 'custom',
    messages: [
      { sender: 'user', text: 'Can you help design a custom mounting bracket for my boat?' },
      { sender: 'reply', text: "Absolutely. Send us what you have — drawings, photos, rough dimensions. We'll model it and quote the full job." },
      { sender: 'user', text: "That's exactly what I needed. Sending photos now." },
    ],
    cta: 'Get a quote →',
    link: '/quote',
    entrance: { x: 120, y: 0, rotateY: 25, scale: 1, delay: 0 },
    rest: { rotateY: 8, translateZ: 0 },
    zIndex: 1,
  },
];

/* ─── TypingIndicator ───────────────────────────────────────────────── */

function TypingIndicator({ isUser }: { isUser: boolean }) {
  return (
    <div className={`typing-indicator${isUser ? ' typing-indicator--user' : ''}`}>
      {!isUser && (
        <span className="chat-msg-avatar">3D</span>
      )}
      <div className="typing-dots">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

/* ─── ChatBubble — word-by-word reveal ──────────────────────────────── */

function ChatBubble({ msg, onDone, shouldAnimate }: {
  msg: Message;
  onDone: () => void;
  shouldAnimate: boolean;
}) {
  const [visibleWords, setVisibleWords] = useState(0);
  const words = msg.text.split(' ');
  const doneRef = useRef(false);

  useEffect(() => {
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
  }, [msg.text, shouldAnimate]);

  const displayText = words.slice(0, visibleWords).join(' ');

  if (msg.sender === 'user') {
    return (
      <div className="chat-msg chat-msg--user visible">
        {msg.isLink ? (
          <span className="chat-msg-link">{displayText}</span>
        ) : displayText}
      </div>
    );
  }

  return (
    <div className="chat-msg chat-msg--reply visible">
      <span className="chat-msg-avatar">3D</span>
      <span className="chat-msg-text">{displayText}</span>
    </div>
  );
}

/* ─── ChatTimeline — orchestrates typing + reveal per phone ─────────── */

function ChatTimeline({ messages, entered, shouldAnimate }: {
  messages: Message[];
  entered: boolean;
  shouldAnimate: boolean;
}) {
  // States: 'idle' | 'typing-N' | 'showing-N' | 'done'
  const [phase, setPhase] = useState<string>('idle');
  const [shownMessages, setShownMessages] = useState<number[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const cycleRef = useRef(0);

  const reset = useCallback(() => {
    setPhase('idle');
    setShownMessages([]);
  }, []);

  // Start timeline after entrance
  useEffect(() => {
    if (!entered) return;
    if (!shouldAnimate) {
      // Reduced motion: show all immediately
      setShownMessages(messages.map((_, i) => i));
      setPhase('done');
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setPhase('typing-0');
    }, 800);

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [entered, shouldAnimate]);

  // State machine
  useEffect(() => {
    if (!shouldAnimate) return;
    if (phase === 'idle' || phase === 'done') return;

    const match = phase.match(/^(typing|showing)-(\d+)$/);
    if (!match) return;
    const [, action, idxStr] = match;
    const idx = parseInt(idxStr, 10);

    if (action === 'typing') {
      const isUser = messages[idx].sender === 'user';
      const typingDuration = isUser ? 600 : 1000;
      timeoutRef.current = setTimeout(() => {
        setShownMessages(prev => [...prev, idx]);
        setPhase(`showing-${idx}`);
      }, typingDuration);
    }

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [phase, shouldAnimate, messages]);

  // When a bubble finishes revealing, move to next
  const handleBubbleDone = useCallback((idx: number) => {
    if (idx < messages.length - 1) {
      timeoutRef.current = setTimeout(() => {
        setPhase(`typing-${idx + 1}`);
      }, 400);
    } else {
      // All messages shown — pause then restart
      timeoutRef.current = setTimeout(() => {
        cycleRef.current++;
        reset();
        // Restart after reset
        setTimeout(() => setPhase('typing-0'), 200);
      }, 4000);
    }
  }, [messages.length, reset]);

  // Determine current typing state
  const typingMatch = phase.match(/^typing-(\d+)$/);
  const typingIdx = typingMatch ? parseInt(typingMatch[1], 10) : -1;
  const typingIsUser = typingIdx >= 0 ? messages[typingIdx].sender === 'user' : false;

  return (
    <div className="screen-chat">
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
    <div style={{ position: 'relative' }}>
      <div className="device-bevel">
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
        className={`device-cta${entered ? ' visible' : ''}`}
      >
        {scenario.cta}
      </a>
    </div>
  );
}

/* ─── DeviceShowcase — main export ──────────────────────────────────── */

export default function DeviceShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const [enteredPhones, setEnteredPhones] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>();
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // IntersectionObserver — trigger when showcase scrolls into view
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Listen for phone-enter custom events from the stripe choreography
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

  // If reduced motion or no choreography events after 5s, show all phones
  useEffect(() => {
    if (shouldReduceMotion) {
      setEnteredPhones(SCENARIOS.map(s => s.id));
      return;
    }

    // Fallback: if choreography script doesn't fire, show phones after 5s
    const fallback = setTimeout(() => {
      setEnteredPhones(prev => {
        if (prev.length < SCENARIOS.length) {
          return SCENARIOS.map(s => s.id);
        }
        return prev;
      });
    }, 5000);

    return () => clearTimeout(fallback);
  }, [shouldReduceMotion]);

  // Mouse tracking — set CSS custom properties for 3D tilt
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || shouldReduceMotion) return;

    // Only enable on non-coarse pointers
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMove = (e: MouseEvent) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const rect = scene.getBoundingClientRect();
        const rx = (e.clientX - rect.left - rect.width / 2) / 20;
        const ry = -(e.clientY - rect.top - rect.height / 2) / 20;

        // Clamp values
        const clampedRx = Math.max(-12, Math.min(12, rx));
        const clampedRy = Math.max(-8, Math.min(8, ry));

        scene.style.setProperty('--rx', String(clampedRx));
        scene.style.setProperty('--ry', String(clampedRy));

        // Remove idle for snappy tracking
        scene.querySelectorAll('.device-wrapper').forEach(w => w.removeAttribute('data-idle'));

        // Clear previous idle timeout
        if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);

        rafRef.current = undefined;
      });
    };

    const handleLeave = () => {
      // Smooth return to neutral
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

  return (
    <div
      ref={sceneRef}
      className="device-scene"
      style={{ display: 'flex', alignItems: 'flex-start', gap: '0px', position: 'relative' }}
    >
      {SCENARIOS.map((scenario) => {
        const entered = enteredPhones.includes(scenario.id);

        if (shouldReduceMotion) {
          return (
            <div
              key={scenario.id}
              className="device-wrapper"
              style={{
                zIndex: scenario.zIndex,
                marginInline: scenario.id === 'print' ? '0' : '-10px',
              }}
            >
              <PhoneDevice
                scenario={scenario}
                entered={true}
                shouldAnimate={false}
              />
            </div>
          );
        }

        return (
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
              y: 0,
              rotateY: scenario.rest.rotateY,
              scale: 1,
              translateZ: scenario.rest.translateZ,
            } : undefined}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              zIndex: scenario.zIndex,
              marginInline: scenario.id === 'print' ? '0' : '-10px',
            }}
          >
            <PhoneDevice
              scenario={scenario}
              entered={entered}
              shouldAnimate={shouldAnimate}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
