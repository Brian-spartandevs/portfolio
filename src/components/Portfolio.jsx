import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import FloatingShapes from './FloatingShapes';
import './Portfolio.css';

const projectLinks = [
  '#',
  'https://tortas-angela.vercel.app/',
  '#',
  'https://noticias-psi-umber.vercel.app/',
];

const projectImages = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=350&fit=crop&q=80',
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=350&fit=crop&q=80',
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=350&fit=crop&q=80',
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=350&fit=crop&q=80',
];

const sectionShapes = [
  { type: 'cross', size: 45, x: '90%', y: '10%', speed: 0.5, opacity: 0.06 },
  { type: 'code', size: 50, x: '4%', y: '80%', speed: 0.7, opacity: 0.06 },
  { type: 'ring', size: 35, x: '92%', y: '75%', speed: 1.0, opacity: 0.05 },
];

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function Portfolio() {
  const { t } = useLanguage();
  const wrapperRef = useRef(null);
  const positionRef = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    let animFrame;
    const speed = 0.7;

    const step = () => {
      if (!isDragging.current) {
        const half = wrapper.scrollWidth / 2;
        positionRef.current += speed;
        if (positionRef.current >= half) positionRef.current -= half;
        wrapper.scrollLeft = positionRef.current;
      }
      animFrame = requestAnimationFrame(step);
    };

    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startScrollLeft.current = wrapperRef.current.scrollLeft;
    wrapperRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const wrapper = wrapperRef.current;
    const diff = startX.current - e.clientX;
    const half = wrapper.scrollWidth / 2;
    let newPos = startScrollLeft.current + diff;
    if (newPos >= half) newPos -= half;
    if (newPos < 0) newPos += half;
    positionRef.current = newPos;
    wrapper.scrollLeft = newPos;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    if (wrapperRef.current) wrapperRef.current.style.cursor = 'grab';
  };

  const items = t.portfolio.items.map((project, index) => ({
    ...project,
    link: projectLinks[index],
    image: projectImages[index],
    index,
  }));

  const duplicated = [...items, ...items];

  return (
    <section className="portfolio" id="portafolio">
      <FloatingShapes shapes={sectionShapes} scrollProgress={0} />
      <div className="container">
        <motion.span
          className="portfolio__label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t.portfolio.label}
        </motion.span>

        <motion.h2
          className="section-title"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {t.portfolio.titlePre}
          <span className="text-accent">{t.portfolio.titleAccent}</span>
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t.portfolio.subtitle}
        </motion.p>
      </div>

      <div
        ref={wrapperRef}
        className="portfolio__slider-wrapper"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <div className="portfolio__track">
          {duplicated.map((project, i) => (
            <motion.article
              key={i}
              className="portfolio__card"
              whileHover={{
                y: -12,
                boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(230,57,70,0.15)',
                borderColor: 'rgba(230,57,70,0.4)',
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.97 }}
              style={{ cursor: project.link !== '#' ? 'pointer' : 'default' }}
              onClick={() => project.link !== '#' ? window.open(project.link, '_blank') : null}
            >
              <div className="portfolio__card-preview">
                <img
                  src={project.image}
                  alt={project.title}
                  className="portfolio__card-image"
                />
                <span className="portfolio__card-category">{project.category}</span>
              </div>
              <div className="portfolio__card-info">
                <h3 className="portfolio__card-title">{project.title}</h3>
                <p className="portfolio__card-description">{project.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="portfolio__slider-fade portfolio__slider-fade--left"></div>
        <div className="portfolio__slider-fade portfolio__slider-fade--right"></div>
      </div>
    </section>
  );
}

export default Portfolio;
