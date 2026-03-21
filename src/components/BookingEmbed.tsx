import { useEffect, useRef, useState } from 'react';

interface Props {
  calLink?: string;
}

/**
 * Cal.com embed wrapper.
 * Loads the Cal.com embed script and renders an inline calendar.
 * Falls back to a direct link if the script fails to load.
 */
export default function BookingEmbed({ calLink = '3d3d/discovery' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setFailed(true), 8000);

    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;

    script.onload = () => {
      clearTimeout(timeout);
      if ((window as any).Cal) {
        (window as any).Cal('init');
        (window as any).Cal('inline', {
          elementOrSelector: containerRef.current,
          calLink,
          config: {
            theme: 'light',
            styles: { branding: { brandColor: '#40C4C4' } },
          },
        });
      } else {
        setFailed(true);
      }
    };

    script.onerror = () => {
      clearTimeout(timeout);
      setFailed(true);
    };

    document.head.appendChild(script);

    return () => {
      clearTimeout(timeout);
      script.remove();
    };
  }, [calLink]);

  if (failed) {
    return (
      <div
        style={{
          padding: '2rem',
          textAlign: 'center',
          background: '#F6F7FA',
          border: '2px solid #1A1A1A',
          borderRadius: '1rem',
          fontFamily: "'Instrument Sans', sans-serif",
        }}
      >
        <p style={{ marginBottom: '1rem', color: '#1A1A1A', fontSize: '1rem' }}>
          Calendar loading failed. Book directly:
        </p>
        <a
          href={`https://cal.com/${calLink}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: '#40C4C4',
            color: '#0F1112',
            borderRadius: '8px',
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 700,
            fontSize: '0.82rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            textDecoration: 'none',
            marginBottom: '0.75rem',
          }}
        >
          Open Booking Page
        </a>
        <p style={{ marginTop: '0.75rem', color: '#666', fontSize: '0.85rem' }}>
          Or WhatsApp Ken at{' '}
          <a href="https://wa.me/15069532678" style={{ color: '#40C4C4' }}>
            +1-506-953-2678
          </a>
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        minHeight: '500px',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    />
  );
}
