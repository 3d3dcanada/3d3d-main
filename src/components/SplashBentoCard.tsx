import { AnimatePresence, motion } from 'motion/react';

import type { SplashSection } from '../data/splashSections';

type SplashCardAlign = 'left' | 'right' | 'bottom';

interface SplashBentoCardProps {
  section: SplashSection;
  align: SplashCardAlign;
  compact: boolean;
}

const containerVariants = {
  initial: { opacity: 0, y: 18, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.98 },
};

const staggerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

export default function SplashBentoCard({
  section,
  align,
  compact,
}: SplashBentoCardProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.aside
        key={section.id}
        className={`glass-dark splash-card splash-card--${align} splash-card--${section.accent}${
          compact ? ' splash-card--compact' : ''
        }`}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={containerVariants}
        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
        role="region"
        aria-live="polite"
        aria-atomic="true"
        aria-labelledby={`splash-card-title-${section.id}`}
      >
        <motion.div className="splash-card__inner" variants={staggerVariants}>
          <motion.p className="splash-card__eyebrow" variants={itemVariants}>
            {section.kicker}
          </motion.p>

          <motion.h2
            className="splash-card__title"
            id={`splash-card-title-${section.id}`}
            variants={itemVariants}
          >
            {section.title}
          </motion.h2>

          <motion.p className="splash-card__copy" variants={itemVariants}>
            {section.description}
          </motion.p>

          <motion.div className="splash-card__tags" variants={itemVariants}>
            {section.tags.map((tag) => (
              <span key={tag} className="splash-card__tag">
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.a
            href={section.href}
            className="splash-card__cta"
            data-analytics-event="splash_cta_click"
            data-analytics-source={section.id}
            variants={itemVariants}
          >
            <span>{section.ctaLabel}</span>
            <span aria-hidden="true">→</span>
          </motion.a>
        </motion.div>
      </motion.aside>
    </AnimatePresence>
  );
}
