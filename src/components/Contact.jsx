import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import FloatingShapes from "./FloatingShapes";
import "./Contact.css";

const sectionShapes = [
  { type: "cube", size: 45, x: "92%", y: "12%", speed: 0.6, opacity: 0.06 },
  { type: "sphere", size: 55, x: "5%", y: "85%", speed: 0.4, opacity: 0.05 },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const sectionRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.classList.add("contact--visible");
        });
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const response = await fetch("https://formspree.io/f/mykonwgb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", project: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setSubmitError(true);
        setTimeout(() => setSubmitError(false), 5000);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: 0.3 },
    },
  };

  const c = t.contact;

  return (
    <section className="contact" id="contacto" ref={sectionRef}>
      <FloatingShapes shapes={sectionShapes} scrollProgress={0} />
      <div className="container">
        <motion.div
          className="contact__wrapper"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="contact__info" variants={itemVariants}>
            <motion.span
              className="contact__label"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {c.label}
            </motion.span>

            <motion.h2
              className="contact__title"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {c.titlePre}
              <span className="text-accent">{c.titleAccent}</span>
              {c.titlePost}
            </motion.h2>

            <motion.p
              className="contact__description"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {c.description}
            </motion.p>

            <motion.div
              className="contact__details"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className="contact__detail"
                variants={itemVariants}
                whileHover={{ x: 10 }}
              >
                <motion.div
                  className="contact__detail-icon"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  📧
                </motion.div>
                <div>
                  <span className="contact__detail-label">{c.emailLabel}</span>
                  <span className="contact__detail-value">
                    XDatta&Solutions@gmail.com
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="contact__detail"
                variants={itemVariants}
                whileHover={{ x: 10 }}
              >
                <motion.div
                  className="contact__detail-icon"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                >
                  📱
                </motion.div>
                <div>
                  <span className="contact__detail-label">
                    {c.whatsappLabel}
                  </span>
                  <span className="contact__detail-value">+39 379 179 5762</span>
                </div>
              </motion.div>

              <motion.div
                className="contact__detail"
                variants={itemVariants}
                whileHover={{ x: 10 }}
              >
                <motion.div
                  className="contact__detail-icon"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                >
                  📍
                </motion.div>
                <div>
                  <span className="contact__detail-label">
                    {c.locationLabel}
                  </span>
                  <span className="contact__detail-value">
                    {c.locationValue}
                  </span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="contact__social"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.a
                href="#"
                className="contact__social-link"
                aria-label="LinkedIn"
                id="social-linkedin"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                className="contact__social-link"
                aria-label="GitHub"
                id="social-github"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                className="contact__social-link"
                aria-label="Instagram"
                id="social-instagram"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="contact__form-container"
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.form
              className="contact__form"
              onSubmit={handleSubmit}
              id="contact-form"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="contact__form-group"
                variants={itemVariants}
              >
                <label htmlFor="contact-name">{c.formName}</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder={c.formNamePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              <motion.div className="contact__form-group" variants={itemVariants}>
                <label htmlFor="contact-email">{c.formEmail}</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder={c.formEmailPlaceholder}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              <motion.div className="contact__form-group" variants={itemVariants}>
                <label htmlFor="contact-phone">{c.formPhone}</label>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  placeholder={c.formPhonePlaceholder}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              <motion.div className="contact__form-group" variants={itemVariants}>
                <label htmlFor="contact-project">{c.formProject}</label>
                <select
                id="contact-project"
                name="project"
                value={formData.project}
                onChange={handleChange}
                required
              >
                <option value="">{c.formProjectPlaceholder}</option>
                <option value="landing">{c.formProjectOptions.landing}</option>
                <option value="corporativa">
                  {c.formProjectOptions.corporativa}
                </option>
                <option value="ecommerce">
                  {c.formProjectOptions.ecommerce}
                </option>
                <option value="webapp">{c.formProjectOptions.webapp}</option>
                <option value="otro">{c.formProjectOptions.otro}</option>
              </select>
              </motion.div>
              <motion.div className="contact__form-group" variants={itemVariants}>
                <label htmlFor="contact-message">{c.formMessage}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder={c.formMessagePlaceholder}
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </motion.div>
            <motion.button
              type="submit"
              className={`contact__submit ${submitted ? "contact__submit--success" : ""} ${submitError ? "contact__submit--error" : ""}`}
              id="contact-submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={isSubmitting ? { opacity: 0.7, cursor: "not-allowed" } : {}}
            >
              {isSubmitting
                ? "Enviando..."
                : submitted
                  ? c.formSuccess
                  : submitError
                    ? "Error al enviar"
                    : c.formSubmit}
            </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
