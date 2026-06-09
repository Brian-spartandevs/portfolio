import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../i18n/LanguageContext';
import FloatingShapes from './FloatingShapes';
import heroImg from '../assets/images/developer-hero.jpeg';
import './Hero.css';

const heroShapes = [
  { type: 'cube', size: 70, x: '82%', y: '12%', speed: 0.8, opacity: 0.12 },
  { type: 'sphere', size: 90, x: '8%', y: '65%', speed: 0.5, opacity: 0.1 },
  { type: 'code', size: 60, x: '75%', y: '72%', speed: 0.6, opacity: 0.08 },
  { type: 'ring', size: 45, x: '15%', y: '20%', speed: 1.2, opacity: 0.1 },
  { type: 'cross', size: 35, x: '90%', y: '50%', speed: 0.4, opacity: 0.08 },
];

function Hero() {
  const heroRef = useRef(null);
  const scrollProgress = useScrollAnimation(heroRef);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('hero--visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Parallax values based on scroll
  const contentY = scrollProgress * -60;
  const imageY = scrollProgress * -30;
  const imageRotate = (scrollProgress - 0.3) * 8;

  return (
    <section className="hero" id="inicio" ref={heroRef}>
      <video
        className="hero__video-bg"
        autoPlay
        muted
        playsInline
        onEnded={(e) => e.target.pause()}
      >
        <source
          src="https://res.cloudinary.com/deamnxyxq/video/upload/q_auto/f_auto/v1778284121/3742-174173818_medium_nlbaej.mp4"
          type="video/mp4"
        />
      </video>
      <div className="hero__video-overlay"></div>
      <div className="hero__bg-elements">
        <div className="hero__bg-circle hero__bg-circle--1"></div>
        <div className="hero__bg-circle hero__bg-circle--2"></div>
        <div className="hero__bg-grid"></div>
      </div>

      <FloatingShapes shapes={heroShapes} scrollProgress={scrollProgress} />

      <div className="hero__container container">
        <div
          className="hero__content"
          style={{
            transform: `translateY(${contentY}px)`,
          }}
        >
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="hero__badge-dot"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {t.hero.badge}
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              className="hero__title-line hero__title-line--accent"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {t.hero.titleLine1}
            </motion.span>
            <motion.span
              className="hero__title-line"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {t.hero.titleLine2}
            </motion.span>
            <motion.span
              className="hero__title-line"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {t.hero.titleLine3}
            </motion.span>
          </motion.h1>

          <motion.p
            className="hero__description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <motion.a
              href="#contacto"
              className="hero__btn hero__btn--primary"
              id="hero-cta"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <span className="hero__btn-icon">✦</span>
              {t.hero.ctaPrimary}
            </motion.a>
            <motion.a
              href="#portafolio"
              className="hero__btn hero__btn--secondary"
              id="hero-portfolio"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              {t.hero.ctaSecondary}
              <span className="hero__btn-arrow">→</span>
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          className="hero__image-wrapper"
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.5, type: 'spring', stiffness: 100 }}
          style={{
            transform: `translateY(${imageY}px) rotateY(${imageRotate}deg)`,
          }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="hero__image-glow"></div>
          <motion.div
            className="hero__image-frame"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img 
              src={heroImg} 
              alt={t.hero.imgAlt} 
              className="hero__image"
              id="hero-photo"
            />
          </motion.div>
          <motion.div
            className="hero__image-decoration hero__image-decoration--top"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="hero__image-decoration hero__image-decoration--bottom"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      </div>

      <motion.div
        className="hero__trusted"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
      >
        <span className="hero__trusted-label">{t.trustedBy.label}</span>
        <div className="hero__trusted-divider"></div>
        <div className="hero__trusted-logos">
          {t.trustedBy.companies.map((company, i) => (
            <motion.div
              key={i}
              className="hero__trusted-company"
              whileHover={{ scale: 1.05, borderColor: 'rgba(230,57,70,0.5)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="hero__trusted-company-name">{company.name}</span>
              <span className="hero__trusted-company-desc">{company.desc}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="hero__scroll-indicator">
        <div className="hero__scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}

export default Hero;
