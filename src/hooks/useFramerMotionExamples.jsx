import { motion } from 'framer-motion';

// Ejemplo de cómo mejorar el Hero con Framer Motion
// Reemplaza las importaciones y animaciones del Hero.jsx actual

import {
  animations,
  containerVariants,
  itemVariants,
  useHoverAnimation
} from '../hooks/useMotionAnimations';

// Ejemplo de uso en el componente Hero:
/*
import { motion } from 'framer-motion';

<motion.div
  initial={animations.slideInUp.initial}
  animate={animations.slideInUp.animate}
  transition={animations.slideInUp.transition}
>
  <h1 className="hero__title">
    <span>{t.hero.titleLine1}</span>
  </h1>
</motion.div>

// Para botones con hover effect:
<motion.a
  href="#contacto"
  className="hero__btn hero__btn--primary"
  {...useHoverAnimation()}
>
  {t.hero.ctaPrimary}
</motion.a>
*/

// ===== EJEMPLOS DE ANIMACIONES COMÚNES =====

// 1. COMPONENTE CON STAGGER (animación escalonada)
export const StaggerContainer = ({ children }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// 2. CARDS CON ANIMACIÓN AL SCROLL
export const AnimatedCard = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
    >
      {children}
    </motion.div>
  );
};

// 3. BOTONES CON ANIMACIONES
export const AnimatedButton = ({ children, href, primary = true }) => {
  return (
    <motion.a
      href={href}
      className={`hero__btn ${primary ? 'hero__btn--primary' : 'hero__btn--secondary'}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.a>
  );
};

// 4. TEXTO CON ANIMACIÓN DE ESCRITURA
export const AnimatedText = ({ text }) => {
  const letters = text.split('');

  return (
    <motion.div>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// 5. IMÁGENES CON ANIMACIÓN DE ZOOM
export const AnimatedImage = ({ src, alt, delay = 0 }) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
    />
  );
};

// 6. CONTENEDOR CON ANIMACIÓN SUAVE
export const FadeInContainer = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// 7. LISTA CON ITEMS ANIMADOS
export const AnimatedList = ({ items, renderItem }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.3 }}
    >
      {items.map((item, index) => (
        <motion.div key={index} variants={itemVariants}>
          {renderItem(item)}
        </motion.div>
      ))}
    </motion.div>
  );
};

// 8. BADGE CON ANIMACIÓN PULSE
export const AnimatedBadge = ({ text }) => {
  return (
    <motion.div
      className="hero__badge"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1 }}
    >
      <motion.span
        className="hero__badge-dot"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {text}
    </motion.div>
  );
};
