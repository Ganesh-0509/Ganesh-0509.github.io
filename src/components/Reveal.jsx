import { motion } from 'framer-motion'

// Fade + rise into view when scrolled to. Used across sections for a calm,
// consistent editorial reveal rhythm.
// `style` is passed through so callers can set layout custom properties on the
// wrapper (the bento grid sets --span here). Without it those props are
// silently dropped and every cell collapses to the same width.
export default function Reveal({ children, delay = 0, y = 16, className = '', as = 'div', style }) {
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </M>
  )
}
