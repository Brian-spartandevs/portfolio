import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      id="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <div className="navbar__container container">
        <a href="#inicio" className="navbar__logo" onClick={(e) => handleNavClick(e, 'inicio')}>
          XDatta&<span className="navbar__logo-accent">Solutions</span>
        </a>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t.nav.menuLabel}
          id="menu-toggle"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar__menu ${menuOpen ? 'navbar__menu--open' : ''}`}>
          <li><a href="#inicio" onClick={(e) => handleNavClick(e, 'inicio')}>{t.nav.inicio}</a></li>
          <li><a href="#servicios" onClick={(e) => handleNavClick(e, 'servicios')}>{t.nav.servicios}</a></li>
          <li><a href="#habilidades" onClick={(e) => handleNavClick(e, 'habilidades')}>{t.nav.habilidades}</a></li>
          <li><a href="#portafolio" onClick={(e) => handleNavClick(e, 'portafolio')}>{t.nav.portafolio}</a></li>
          <li><a href="#contacto" onClick={(e) => handleNavClick(e, 'contacto')}>{t.nav.contacto}</a></li>
        </ul>

        <div className="navbar__actions">
          <button
            className="navbar__lang-toggle"
            onClick={toggleLanguage}
            aria-label="Cambiar idioma"
            id="lang-toggle"
          >
            <span className={`navbar__lang-option ${lang === 'es' ? 'navbar__lang-option--active' : ''}`}>ES</span>
            <span className="navbar__lang-divider">/</span>
            <span className={`navbar__lang-option ${lang === 'it' ? 'navbar__lang-option--active' : ''}`}>IT</span>
          </button>

          <a
            href="#contacto"
            className="navbar__cta"
            onClick={(e) => handleNavClick(e, 'contacto')}
            id="navbar-cta"
          >
            <span className="navbar__cta-icon">🚀</span>
            {t.nav.cta}
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
