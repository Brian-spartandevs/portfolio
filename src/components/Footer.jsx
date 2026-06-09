import { useLanguage } from '../i18n/LanguageContext';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#inicio" className="footer__logo">
              XDatta&<span className="footer__logo-accent">Solutions</span>
            </a>
            <p className="footer__tagline">
              {f.tagline}
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__links-column">
              <h4>{f.navTitle}</h4>
              <a href="#inicio">{f.inicio}</a>
              <a href="#servicios">{f.servicios}</a>
              <a href="#habilidades">{f.habilidades}</a>
              <a href="#portafolio">{f.portafolio}</a>
            </div>
            <div className="footer__links-column">
              <h4>{f.servicesTitle}</h4>
              <a href="#servicios">{f.webDesign}</a>
              <a href="#servicios">{f.onlineStores}</a>
              <a href="#servicios">{f.landingPages}</a>
              <a href="#servicios">{f.webApps}</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {currentYear} XDatta&Soluttions. {f.copyright}</p>
          <p className="footer__made">Hecho con dedicación y mucho café ☕</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
