import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../i18n/LanguageContext';
import FloatingShapes from './FloatingShapes';
import webDesignImg from '../assets/images/service-web-design.png';
import planningImg from '../assets/images/service-planning.png';
import ecommerceImg from '../assets/images/service-ecommerce.png';
import './Services.css';

const serviceImages = [webDesignImg, planningImg, ecommerceImg];
const serviceAccents = ['left', 'both', 'right'];

const sectionShapes = [
  { type: 'pyramid', size: 50, x: '92%', y: '15%', speed: 0.6, opacity: 0.08 },
  { type: 'ring', size: 60, x: '3%', y: '75%', speed: 0.9, opacity: 0.07 },
];

function Services() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const scrollProgress = useScrollAnimation(sectionRef);
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('services__card--visible');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="services" id="servicios" ref={sectionRef}>
      <FloatingShapes shapes={sectionShapes} scrollProgress={scrollProgress} />
      <div className="container">
        <motion.div
          className="services__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
        >
          <span className="services__label">{t.services.label}</span>
          <h2 className="section-title">{t.services.titlePre}<span className="text-accent">{t.services.titleAccent}</span></h2>
          <p className="section-subtitle">
            {t.services.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="services__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          {t.services.items.map((service, index) => (
            <motion.article 
              className={`services__card services__card--${serviceAccents[index]}`} 
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,0,0,0.4), 0 0 30px rgba(230,57,70,0.1)' }}
              id={`service-card-${index}`}
            >
              <div className="services__card-image">
                <img src={serviceImages[index]} alt={service.title} loading="lazy" />
                <div className="services__card-overlay"></div>
              </div>
              <div className="services__card-content">
                <h3 className="services__card-title">{service.title}</h3>
                <p className="services__card-description">{service.description}</p>
              </div>
              <div className="services__card-accent-line"></div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
