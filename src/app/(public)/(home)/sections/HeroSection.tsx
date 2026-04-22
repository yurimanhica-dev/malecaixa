"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { BarChart, Clock, Handshake, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  // Animation constants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  const features = [
    {
      icon: <Handshake className="w-5 h-5" />,
      text: "Atendimento personalizado",
    },
    {
      icon: <BarChart className="w-5 h-5" />,
      text: "Taxas competitivas",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Segurança garantida",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      text: "Liberação em 24h",
    },
  ];

  return (
    <section
      id="sobre"
      className="relative overflow-hidden bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-gradient)] z-10"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-20 w-64 h-64 bg-[var(--color-secondary)] rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 right-20 w-64 h-64 bg-[var(--color-secondary)] rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="max-w-screen-xl mx-auto c-space py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block uppercase tracking-wider text-gray-700 px-3 py-2 text-sm font-medium rounded-full bg-[var(--color-secondary)] mb-4">
              Desde 2012
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-4xl uppercase font-extrabold text-gray-50 leading-tight tracking-tight"
          >
            Transformando sonhos em realidade há 13 anos
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed"
          >
            Nossa jornada é construída sobre pilares de confiança, transparência
            e compromisso com o desenvolvimento sustentável de negócios e
            comunidades.
          </motion.p>

          {/* Features list */}
          <motion.div
            variants={containerVariants}
            className="mt-8 grid grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full  text-[var(--color-secondary)]">
                  {feature.icon}
                </span>
                <span className="text-white/90">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={containerVariants}
            className="mt-12 flex flex-wrap gap-4"
          >
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary)/90 text-gray-700 font-medium rounded-lg transition-all duration-300 shadow-lg"
            >
              <Link href="#simulacao">Simule o seu crédito</Link>
            </motion.button>
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium rounded-lg transition-all duration-300"
            >
              <Link href="#sobre">Conheça nossa história</Link>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
          className="relative h-80 md:h-96 overflow-hidden shadow-2xl"
        >
          <Image
            src="/MCAIXA.jpeg"
            alt="Equipe da Microcrédito em reunião"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)/70 to-transparent" />

          {/* Decorative badge */}
          <div className="absolute bottom-6 left-6 bg-[var(--color-secondary)] text-gray-700 px-4 pt-1.5 pb-1 rounded-full font-medium shadow-lg">
            +1500 Clientes
          </div>
        </motion.div>
      </div>

      {/* Scrolling indicator */}
      <motion.div
        animate={{ y: [0, 70, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute z-50  bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-8 h-8 border-r-2 border-b-2 border-secondary rotate-45" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
