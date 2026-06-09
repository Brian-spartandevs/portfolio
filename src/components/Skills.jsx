import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useLanguage } from "../i18n/LanguageContext";
import FloatingShapes from "./FloatingShapes";
import "./Skills.css";

const skillCategories = [
  {
    titleKey: "Frontend",
    icon: "◆",
    skills: [
      { name: "JavaScript", icon: "JS" },
      { name: "React", icon: "⚛" },
      { name: "Next.js", icon: "N" },
      { name: "React Router", icon: "⇆" },
      { name: "CSS", icon: "✦" },
      { name: "Tailwind CSS", icon: "🌊" },
      { name: "MUI", icon: "M" },
      { name: "HTML5", icon: "◇" },
      { name: "Axios", icon: "↗" },
      { name: "Fetch API", icon: "⇄" },
      { name: "TanStack Query", icon: "⟳" },
      { name: "Responsive Design", icon: "📱" },
      { name: "Vite", icon: "⚡" },
    ],
  },
  {
    titleKey: "Backend",
    icon: "▲",
    skills: [
      { name: "Node.js", icon: "⬢" },
      { name: "Express.js", icon: "Ex" },
      { name: "RESTful APIs", icon: "⟷" },
      { name: "Prisma", icon: "△" },
      { name: "MongoDB", icon: "🍃" },
      { name: "SQLite", icon: "🗄" },
      { name: "JWT Auth", icon: "🔐" },
      { name: "CORS", icon: "🛡" },
      { name: "Middleware", icon: "⚙" },
      { name: "Bcrypt", icon: "🔒" },
      { name: "Dotenv", icon: "📄" },
      { name: "Nodemon", icon: "♻" },
    ],
  },
  {
    titleKey: "tools",
    icon: "⬟",
    skills: [
      { name: "Git", icon: "⎇" },
      { name: "GitHub", icon: "⊙" },
      { name: "VS Code", icon: "⌨" },
      { name: "Postman", icon: "📬" },
      { name: "Bruno", icon: "Br" },
      { name: "Vercel", icon: "▲" },
      { name: "Netlify", icon: "◈" },
      { name: "Railway", icon: "🚂" },
      { name: "Render", icon: "🔷" },
      { name: "npm", icon: "📦" },
      { name: "Figma", icon: "✎" },
      { name: "SEO", icon: "🔍" },
    ],
  },
];

const sectionShapes = [
  { type: "sphere", size: 55, x: "88%", y: "20%", speed: 0.5, opacity: 0.07 },
  { type: "cube", size: 40, x: "5%", y: "30%", speed: 0.7, opacity: 0.06 },
];

function Skills() {
  const sectionRef = useRef(null);
  const categoryRefs = useRef([]);
  const scrollProgress = useScrollAnimation(sectionRef);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("skills__category--visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    categoryRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const getCategoryTitle = (titleKey) => {
    if (titleKey === "tools") return t.skills.categories.tools;
    return titleKey;
  };

  return (
    <section className="skills" id="habilidades" ref={sectionRef}>
      <FloatingShapes shapes={sectionShapes} scrollProgress={scrollProgress} />

      {/* Background aura blobs */}
      <div className="skills__aura skills__aura--1"></div>
      <div className="skills__aura skills__aura--2"></div>
      <div className="skills__aura skills__aura--3"></div>

      <div className="container">
        <motion.span
          className="skills__label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t.skills.label}
        </motion.span>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {t.skills.titlePre}
          <span className="text-accent">{t.skills.titleAccent}</span>
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t.skills.subtitle}
        </motion.p>

        <motion.div
          className="skills__categories"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skillCategories.map((category, catIndex) => (
            <motion.div
              className="skills__category"
              key={category.titleKey}
              ref={(el) => (categoryRefs.current[catIndex] = el)}
              variants={categoryVariants}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Category header */}
              <motion.div
                className="skills__category-header"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <motion.span
                  className="skills__category-icon"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  {category.icon}
                </motion.span>
                <h3 className="skills__category-title">
                  {getCategoryTitle(category.titleKey)}
                </h3>
                <span className="skills__category-count">
                  {category.skills.length}
                </span>
              </motion.div>

              {/* Skills grid */}
              <motion.div
                className="skills__chips"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    className="skills__chip"
                    key={skill.name}
                    variants={chipVariants}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className="skills__chip-icon">{skill.icon}</span>
                    <span className="skills__chip-name">{skill.name}</span>
                    <div className="skills__chip-glow"></div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
