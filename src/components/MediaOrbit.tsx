import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import SplashBackground from './SplashBackground';
import SplashNavPill from './SplashNavPill';
import SplashCenterLogo from './SplashCenterLogo';
import { MEDIA_SECTIONS } from '../data/mediaSections';

export default function MediaOrbit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSection = MEDIA_SECTIONS[activeIndex];

  // Force dark mode context for the Splash UI
  useEffect(() => {
    document.body.setAttribute('data-splash-theme', 'dark');
    return () => document.body.removeAttribute('data-splash-theme');
  }, []);

  return (
    <div className="w-full h-[100dvh] overflow-hidden relative">
      <SplashBackground theme="dark" />

      {/* Background grain texture layer */}
      <div
        className="absolute inset-0 z-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url(/noise.png)' }}
      />

      <SplashCenterLogo reducedMotion={false} theme="dark" hoveredSection={null} />

      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center pt-16 pb-32">
        <div className="w-full max-w-2xl px-4 md:px-8 pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection.id}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="bg-[#111214]/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_32px_64px_rgba(0,0,0,0.5)] relative overflow-hidden group"
            >
              {/* Left accent strip */}
              <div
                className="absolute top-0 left-0 w-1.5 h-full transition-colors duration-700"
                style={{ backgroundColor: `var(--color-${activeSection.accent}-primary)` }}
              />

              {/* Subtle wash overlay tied to accent */}
              <div
                className="absolute inset-0 opacity-10 mix-blend-screen transition-colors duration-700 pointer-events-none"
                style={{ backgroundColor: `var(--color-${activeSection.accent}-primary)` }}
              />

              <div className="relative z-10">
                <h3
                  className="text-[11px] tracking-[0.2em] uppercase font-mono mb-3 transition-colors duration-700"
                  style={{ color: `var(--color-${activeSection.accent}-primary)` }}
                >
                  {activeSection.kicker}
                </h3>

                <h2 className="text-4xl md:text-5xl font-display text-white mb-8 tracking-tight">
                  {activeSection.title}
                </h2>

                <div className="text-gray-300 font-body text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                  {activeSection.content}
                </div>

                {/* Fake Button CTA based on section */}
                {activeSection.id === 'role' && (
                  <a href="mailto:wess@3d3d.ca" className="inline-block mt-8 px-6 py-3 rounded-full bg-white text-black font-tech font-bold text-sm tracking-wide hover:scale-105 transition-transform">
                    APPLY FOR THE ROLE
                  </a>
                )}
                {activeSection.id === 'pool' && (
                  <a href="https://ko-fi.com/3d3dcanada" target="_blank" rel="noreferrer" className="inline-block mt-8 px-6 py-3 rounded-full bg-[#E84A8A] text-white font-tech font-bold text-sm tracking-wide hover:scale-105 transition-transform">
                    CONTRIBUTE TO POOL
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-auto">
        <SplashNavPill
          sections={MEDIA_SECTIONS.map(s => ({
            ...s,
            id: s.id as any,
            description: '',
            subtitle: '',
            longDescription: '',
            highlights: [],
            naturalColors: ['#666666'],
            tags: [],
            ctaLabel: '',
            href: '',
            ariaLabel: s.title,
            modelPath: '',
            modelScale: 1,
            modelRotation: [0, 0, 0] as [number, number, number],
            modelOffset: [0, 0, 0] as [number, number, number]
          }))}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
      </div>
    </div>
  );
}
