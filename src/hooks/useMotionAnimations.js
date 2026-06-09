import { motion } from 'framer-motion';

// Animaciones predefinidas para reutilizar
export const animations = {
  // Fade in
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 }
  },

  // Slide desde la izquierda
  slideInLeft: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },

  // Slide desde la derecha
  slideInRight: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },

  // Slide desde arriba
  slideInUp: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },

  // Slide desde abajo
  slideInDown: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },

  // Zoom in
  zoomIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },

  // Rotación
  rotate: {
    initial: { rotate: -10, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Variantes para contenedores (animación escalonada)
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Variantes para items dentro de contenedores
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Hook para animaciones al hacer hover
export const useHoverAnimation = () => {
  return {
    whileHover: { scale: 1.05, transition: { duration: 0.3 } },
    whileTap: { scale: 0.95 }
  };
};

// Hook para animaciones de tap
export const useTapAnimation = () => {
  return {
    whileTap: { scale: 0.95, rotate: 5 },
    transition: { type: 'spring', stiffness: 400, damping: 10 }
  };
};
