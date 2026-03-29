import { useState, useRef, useEffect, type FormEvent } from 'react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SYSTEM_PROMPT = `You are the 3D3D assistant. You help visitors learn about Ken's offshore fabrication and 3D printing services.

Key facts:
- Ken is an offshore specialist with 20,000+ nautical miles, 10 years as a professional mechanic
- 3D3D does marine hardware replacement, automotive restoration, on-site deployment, and remote fabrication
- Materials: ASA (UV-stable, 93C, above-deck), PETG-CF (structural), PA11 CF (192C, engine bay), PP Glass Fiber (zero moisture, through-hull), TPU 95A (seals/gaskets), PEI 1010 (207C, metal replacement)
- PLA is NOT acceptable for marine or functional parts
- Ken travels worldwide with equipment for on-site work
- Newport-Bermuda Race 2026 aboard CSM the Mariner
- Contact: 3d3dcanada@gmail.com, WhatsApp +1-506-953-2678
- Website: 3d3d.ca

Keep answers short and direct. If the visitor needs a quote or has a specific project, direct them to /contact or suggest they WhatsApp Ken at +1-506-953-2678. If you don't know something, say so and suggest they contact Ken directly.`;

const HF_MODEL = 'mistralai/Mistral-7B-Instruct-v0.3';

async function queryHuggingFace(messages: Message[]): Promise<string> {
  const token = (import.meta as any).env?.PUBLIC_HF_TOKEN || '';

  // Try the chat completions endpoint first (OpenAI-compatible)
  try {
    const res = await fetch(
      `https://api-inference.huggingface.co/models/${HF_MODEL}/v1/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
          max_tokens: 300,
          temperature: 0.7,
        }),
      }
    );

    if (res.ok) {
      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content || '';
      if (reply) return reply.trim();
    }
  } catch {
    // Fall through to legacy endpoint
  }

  // Fallback: legacy text generation endpoint
  const prompt = messages
    .map((m) => {
      if (m.role === 'system') return `<s>[INST] ${m.content} [/INST]</s>`;
      if (m.role === 'user') return `[INST] ${m.content} [/INST]`;
      return m.content;
    })
    .join('\n');

  try {
    const res = await fetch(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { max_new_tokens: 300, temperature: 0.7 },
        }),
      }
    );

    if (!res.ok) throw new Error(`HF API ${res.status}`);

    const data = await res.json();
    const text = Array.isArray(data)
      ? data[0]?.generated_text || ''
      : data?.generated_text || '';

    const parts = text.split('[/INST]');
    return (parts[parts.length - 1] || '').trim().replace(/<\/s>$/g, '').trim();
  } catch {
    return '';
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('chat-dismissed') === '1';
    }
    return false;
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    const fullMessages: Message[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...updated,
    ];

    const reply = await queryHuggingFace(fullMessages);

    if (reply) {
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I'm having trouble connecting right now. You can reach Ken directly:\n\nWhatsApp: +1-506-953-2678\nEmail: 3d3dcanada@gmail.com\n\nOr visit the contact page at /contact",
        },
      ]);
    }
    setLoading(false);
  };

  const dismiss = () => {
    setDismissed(true);
    setOpen(false);
    sessionStorage.setItem('chat-dismissed', '1');
  };

  if (dismissed) return null;

  return (
    <>
      {/* Floating trigger button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="chat-trigger"
          aria-label="Open chat assistant"
          style={{
            position: 'fixed',
            bottom: 'calc(70px + env(safe-area-inset-bottom, 0px))',
            right: '16px',
            zIndex: 950,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: '#40C4C4',
            color: '#0F1112',
            border: '2px solid #111214',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(64, 196, 196, 0.3)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 'calc(70px + env(safe-area-inset-bottom, 0px))',
            right: '16px',
            zIndex: 960,
            width: '340px',
            maxWidth: 'calc(100vw - 32px)',
            height: '460px',
            maxHeight: 'calc(100vh - 120px)',
            borderRadius: '16px',
            background: '#F6F7FA',
            border: '2px solid #111214',
            boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: "'Instrument Sans', system-ui, sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              background: '#111214',
              color: '#F6F7FA',
              flexShrink: 0,
            }}
          >
            <div>
              <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '0.9rem' }}>3D3D</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(246,247,250,0.78)', fontFamily: "'Archivo', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
                Ask me anything
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={dismiss}
                style={{ background: 'none', border: 'none', color: 'rgba(246,247,250,0.78)', cursor: 'pointer', fontSize: '0.7rem', fontFamily: "'Archivo', sans-serif" }}
                aria-label="Dismiss chat"
              >
                HIDE
              </button>
              <button
                onClick={() => setOpen(false)}
                style={{ background: 'none', border: 'none', color: '#F6F7FA', cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1 }}
                aria-label="Minimize chat"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {messages.length === 0 && (
              <div style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.6, padding: '8px 0' }}>
                Ask about materials, turnaround times, shipping, or how the process works. If you need a quote or have a specific project, I'll connect you with Ken.
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '8px 12px',
                  borderRadius: msg.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                  background: msg.role === 'user' ? '#40C4C4' : '#FFFFFF',
                  color: msg.role === 'user' ? '#0F1112' : '#1A1A1A',
                  fontSize: '0.85rem',
                  lineHeight: 1.55,
                  border: msg.role === 'user' ? 'none' : '1px solid rgba(26,26,26,0.08)',
                  whiteSpace: 'pre-wrap' as const,
                }}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: 'flex-start', padding: '8px 12px', fontSize: '0.85rem', color: '#666' }}>
                Thinking...
              </div>
            )}
          </div>

          {/* Talk to Ken bar */}
          <a
            href="https://wa.me/15069532678"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px',
              background: '#25D366',
              color: '#FFFFFF',
              fontSize: '0.72rem',
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            Prefer to talk to Ken directly? WhatsApp
          </a>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              gap: '8px',
              padding: '10px 12px',
              borderTop: '1px solid rgba(26,26,26,0.08)',
              background: '#FFFFFF',
              flexShrink: 0,
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about materials, process..."
              disabled={loading}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid rgba(26,26,26,0.12)',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontFamily: "'Instrument Sans', sans-serif",
                background: '#F6F7FA',
                color: '#1A1A1A',
                outline: 'none',
                minHeight: '36px',
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                padding: '0 14px',
                background: input.trim() ? '#40C4C4' : 'rgba(64,196,196,0.3)',
                color: '#0F1112',
                border: 'none',
                borderRadius: '8px',
                cursor: input.trim() ? 'pointer' : 'default',
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                minHeight: '36px',
              }}
            >
              SEND
            </button>
          </form>
        </div>
      )}
    </>
  );
}
