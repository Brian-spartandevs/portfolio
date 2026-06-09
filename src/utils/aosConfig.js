// Configuración recomendada para AOS (Animate On Scroll)
// Importa esto en tu main.jsx o App.jsx

import AOS from 'aos';
import 'aos/dist/aos.css';

export const initializeAOS = () => {
  AOS.init({
    // Duración de la animación (ms)
    duration: 1000,

    // Disparar animación solo una vez
    once: true,

    // Tipo de easing
    easing: 'ease-out-cubic',

    // Offset para disparar animación antes de que entre en viewport
    offset: 120,

    // Delay entre animaciones
    delay: 0,

    // Desabilitar animaciones en dispositivos móviles
    disable: false,
  });

  // Observar cambios en el DOM (útil para contenido dinámico)
  return AOS;
};

export const refreshAOS = () => {
  AOS.refresh();
};

// Animaciones disponibles con AOS:
export const AOS_ANIMATIONS = {
  // Fade
  FADE: 'fade',
  FADE_UP: 'fade-up',
  FADE_DOWN: 'fade-down',
  FADE_LEFT: 'fade-left',
  FADE_RIGHT: 'fade-right',
  FADE_UP_LEFT: 'fade-up-left',
  FADE_UP_RIGHT: 'fade-up-right',
  FADE_DOWN_LEFT: 'fade-down-left',
  FADE_DOWN_RIGHT: 'fade-down-right',

  // Flip
  FLIP_LEFT: 'flip-left',
  FLIP_RIGHT: 'flip-right',
  FLIP_UP: 'flip-up',
  FLIP_DOWN: 'flip-down',

  // Slide
  SLIDE_UP: 'slide-up',
  SLIDE_DOWN: 'slide-down',
  SLIDE_LEFT: 'slide-left',
  SLIDE_RIGHT: 'slide-right',

  // Zoom
  ZOOM_IN: 'zoom-in',
  ZOOM_IN_UP: 'zoom-in-up',
  ZOOM_IN_DOWN: 'zoom-in-down',
  ZOOM_IN_LEFT: 'zoom-in-left',
  ZOOM_IN_RIGHT: 'zoom-in-right',
  ZOOM_OUT: 'zoom-out',
  ZOOM_OUT_UP: 'zoom-out-up',
  ZOOM_OUT_DOWN: 'zoom-out-down',
  ZOOM_OUT_LEFT: 'zoom-out-left',
  ZOOM_OUT_RIGHT: 'zoom-out-right',

  // Bounce
  BOUNCE_IN: 'bounce-in',
  BOUNCE_IN_UP: 'bounce-in-up',
  BOUNCE_IN_DOWN: 'bounce-in-down',
  BOUNCE_IN_LEFT: 'bounce-in-left',
  BOUNCE_IN_RIGHT: 'bounce-in-right',
};

// Hook para usar AOS en componentes
export const useAOS = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);
};

// Componente helper para AOS
export const AOSElement = ({ animation = 'fade-up', delay = 0, children, ...props }) => {
  return (
    <div
      data-aos={animation}
      data-aos-delay={delay}
      data-aos-duration="1000"
      data-aos-offset="100"
      {...props}
    >
      {children}
    </div>
  );
};
