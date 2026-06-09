// Ejemplo de cómo mejorar el componente Skills con Framer Motion
// Este es un componente de referencia - puedes adaptarlo a tu Skills.jsx

import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const SkillsAnimated = () => {
  const { t } = useLanguage();

  // Variantes para el contenedor
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

  // Variantes para cada item
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Variantes para las barras de progreso
  const barVariants = {
    hidden: { scaleX: 0 },
    visible: (custom) => ({
      scaleX: 1,
      transition: {
        duration: 1,
        delay: custom * 0.1,
        ease: 'easeOut',
      },
    }),
  };

  const skills = [
    { name: 'React', level: 95 },
    { name: 'JavaScript', level: 90 },
    { name: 'CSS/Tailwind', level: 92 },
    { name: 'Node.js', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'UI/UX Design', level: 88 },
  ];

  return (
    <section className="skills" id="skills">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="skills__header"
        >
          <h2 className="skills__title">{t.skills.title}</h2>
          <p className="skills__description">{t.skills.description}</p>
        </motion.div>

        <motion.div
          className="skills__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-item"
              variants={itemVariants}
            >
              <div className="skill-item__header">
                <h3 className="skill-item__name">{skill.name}</h3>
                <motion.span
                  className="skill-item__level"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {skill.level}%
                </motion.span>
              </div>

              <div className="skill-item__bar">
                <motion.div
                  className="skill-item__bar-fill"
                  variants={barVariants}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  style={{
                    width: `${skill.level}%`,
                    originX: 0,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsAnimated;
