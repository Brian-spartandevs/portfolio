# 🎬 Guía de Animaciones - Framer Motion, AOS y GSAP

## Librerías Instaladas

### 1. **Framer Motion** ⭐ (Recomendada para React)
- Perfecta para animaciones complejas en React
- Excelente control de transiciones
- Soporte para gestos (hover, tap, drag)

**Archivos útiles:**
- `src/hooks/useMotionAnimations.js` - Animaciones predefinidas
- `src/hooks/useFramerMotionExamples.jsx` - Componentes listos para usar

### 2. **AOS** (Animate On Scroll)
- Animaciones simples al hacer scroll
- Ideal para efectos de parallax y fade-in
- Fácil de implementar

### 3. **GSAP**
- Animaciones avanzadas con timeline
- Perfecto para animaciones complejas y secuenciales

---

## 📚 Cómo Usar - Ejemplos

### Opción A: Usar Framer Motion (Recomendado)

#### 1. Importar en tu componente:
```jsx
import { motion } from 'framer-motion';
import { animations, useHoverAnimation } from '../hooks/useMotionAnimations';
```

#### 2. Ejemplos en componentes:

**Hero Component - Título con animación:**
```jsx
<motion.h1
  initial={animations.slideInUp.initial}
  animate={animations.slideInUp.animate}
  transition={animations.slideInUp.transition}
  className="hero__title"
>
  Web Development Solutions
</motion.h1>
```

**Botones con hover:**
```jsx
<motion.a
  href="#contacto"
  className="hero__btn hero__btn--primary"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Contactar
</motion.a>
```

**Cards de portfolio con animación al scroll:**
```jsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  viewport={{ once: true, amount: 0.3 }}
>
  {/* Card content */}
</motion.div>
```

**Contenedor con animación escalonada (stagger):**
```jsx
<motion.div
  initial="hidden"
  whileInView="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }}
  viewport={{ once: true, amount: 0.3 }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

---

### Opción B: Usar AOS (Animate On Scroll)

#### 1. Importar en App.jsx o main.jsx:
```jsx
import AOS from 'aos';
import 'aos/dist/aos.css';

useEffect(() => {
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-out-cubic',
  });
}, []);
```

#### 2. Usar en HTML:
```jsx
<div data-aos="fade-up">
  Contenido que se anima al scroll
</div>

<div data-aos="fade-left" data-aos-delay="100">
  Contenido con delay
</div>

<div data-aos="zoom-in">
  Zoom in effect
</div>
```

**Animaciones disponibles:**
- `fade-up`, `fade-down`, `fade-left`, `fade-right`
- `fade-up-left`, `fade-up-right`
- `flip-left`, `flip-right`
- `slide-up`, `slide-down`, `slide-left`, `slide-right`
- `zoom-in`, `zoom-in-up`, `zoom-in-left`, etc.
- `bounce-in`, `bounce-up`, `bounce-left`, etc.

---

### Opción C: Usar GSAP (Para animaciones complejas)

#### 1. Importar:
```jsx
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

#### 2. Ejemplo de timeline:
```jsx
useEffect(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero__title',
      start: 'top center',
      markers: true
    }
  });

  tl.from('.hero__title', { opacity: 0, y: 50, duration: 1 })
    .from('.hero__description', { opacity: 0, y: 30, duration: 0.8 }, '<0.3');
}, []);
```

---

## 🎨 Propiedades Comunes de Framer Motion

```jsx
<motion.div
  // Estado inicial
  initial={{ opacity: 0, x: -100 }}
  
  // Estado cuando es visible
  animate={{ opacity: 1, x: 0 }}
  
  // Cuando el usuario hace hover
  whileHover={{ scale: 1.1 }}
  
  // Cuando hace click
  whileTap={{ scale: 0.95 }}
  
  // Transición
  transition={{ 
    duration: 0.5,
    delay: 0.2,
    type: 'spring', // spring, tween, inertia
    stiffness: 300,
    damping: 30
  }}
  
  // Activar cuando entra en viewport
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
/>
```

---

## 🚀 Recomendaciones por Sección

### Hero
- Usar Framer Motion para título y descripción (slideIn, fadeIn)
- Botones con whileHover y whileTap
- Usar parallax effect con scrollProgress

### Portfolio
- AOS con `data-aos="fade-up"` para cards
- Stagger animation para items
- Hover effect con scale

### Skills
- AOS con `data-aos="slide-left"` para items
- Progresbar animada con GSAP Timeline

### Contact
- Inputs con focus animation
- Botones con loading state animation
- Success message con spring animation

---

## 📝 Tips Importantes

1. **Performance**: Usa `viewport={{ once: true }}` para que las animaciones solo se ejecuten una vez
2. **Accesibilidad**: Respeta `prefers-reduced-motion` media query
3. **Mobile**: Reduce duración en dispositivos móviles
4. **Test**: Prueba animaciones en Mobile Preview (extensión instalada)

---

¡Ahora puedes elegir la mejor opción para cada componente! 🎬
