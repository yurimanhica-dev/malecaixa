"use client";

import { motion } from "framer-motion";
import { CheckCircle, Handshake, ShieldCheck, TrendingUp } from "lucide-react";
import { useInView } from "react-intersection-observer";

import type { Variants } from "framer-motion";

const ValuesSection = () => {
  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const values = [
    {
      icon: <Handshake className="w-6 h-6" />,
      title: "Parceria",
      description:
        "Acreditamos no crescimento conjunto com nossos clientes e comunidades.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Transparência",
      description:
        "Todas as condições são claras desde o primeiro contato, sem letras miúdas.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Sustentabilidade",
      description:
        "Práticas financeiras que garantem o crescimento contínuo de todos.",
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Simplicidade",
      description: "Processos descomplicados para quem precisa de agilidade.",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[var(--color-primary)] rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[var(--color-secondary)] rounded-full filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header with refined typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block uppercase tracking-wider text-white px-3 py-1 text-sm font-medium rounded-full bg-[var(--color-secondary)]"
            whileHover={{ scale: 1.05 }}
          >
            Nossos Valores
          </motion.span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Princípios que fundamentam nossa jornada
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 md:text-lg">
            Cada decisão que tomamos é guiada por esses pilares essenciais
          </p>
        </motion.div>

        {/* Values grid with enhanced animations */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              {/* Card with subtle gradient border */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)/20] to-[var(--color-secondary)/20] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative bg-white p-8 rounded-xl shadow-xs group-hover:shadow-sm transition-all duration-300 h-full flex flex-col">
                {/* Icon with animated background */}
                <motion.div
                  className={`w-12 h-12 rounded-full ${value.color} flex items-center justify-center mb-5`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  {value.icon}
                </motion.div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-snug">
                  {value.title}
                </h3>
                <p className="text-gray-600 flex-grow">{value.description}</p>

                {/* Animated underline */}
                <div className="mt-4 pt-4 border-t border-gray-100 group-hover:border-[var(--color-primary)] transition-colors duration-300">
                  <span className="inline-block w-8 h-0.5 bg-[var(--color-primary)] rounded-full"></span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-12 border-t border-gray-200 text-center"
        >
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
            Reconhecido por
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {["Forbes", "Exame", "Banco Central", "ABFintechs"].map(
              (item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {item}
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValuesSection;
