"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function MicrocreditLoading() {
  // Animação da barra de progresso

  // const progressAnimation: Variants = {
  //   initial: { width: 0 },
  //   animate: {
  //     width: "100%",
  //     transition: {
  //       duration: 2,
  //       repeat: Infinity,
  //       repeatType: "reverse",
  //       ease: "easeInOut",
  //     },
  //   },
  // };

  // Animação do logo
  const logoAnimation: Variants = {
    initial: { y: -20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Animação dos elementos de texto
  const textAnimation: Variants = {
    initial: { y: 10, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.2 * i,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Container principal */}
      <motion.div
        initial="initial"
        animate="animate"
        className="w-full max-w-md text-center"
      >
        {/* Logo animado */}
        <motion.div
          variants={logoAnimation}
          className="mb-8 flex justify-center"
        >
          <div className="relative h-40 w-40">
            {/* Anel externo animado */}
            {/* <motion.div
              animate={{
                rotate: 360,
                transition: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              className="absolute -inset-2 border-2 border-primary border-opacity-30 rounded-full"
              style={{ borderTopColor: "transparent" }}
            /> */}

            {/* Logo principal */}
            <Image
              src="/logos.png"
              alt="Microcrédito"
              fill
              className="relative h-full w-full z-10 animate-pulse"
            />

            {/* Ponto de destaque */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-secondary shadow-glow"
              style={{ boxShadow: "0 0 10px #fed400" }}
            />
          </div>
        </motion.div>

        {/* Textos animados sequencialmente */}
        {/* <motion.h2
          variants={textAnimation}
          custom={1}
          className="text-2xl font-bold text-white mb-2"
        >
          Carregando Soluções Financeiras
        </motion.h2> */}

        <motion.p
          variants={textAnimation}
          custom={2}
          className="text-gray-800 mb-8"
        >
          Preparando a melhor experiência.....
        </motion.p>

        {/* Barra de progresso premium */}
        {/* <motion.div
          initial="initial"
          animate="animate"
          className="h-2 bg-white rounded-full overflow-hidden mb-2"
        >
          <motion.div
            variants={progressAnimation}
            className="h-full bg-gradient-to-r from-primary to-secondary"
            style={{
              boxShadow: "0 0 10px rgba(0, 159, 235, 0.5)",
            }}
          />
        </motion.div> */}

        {/* Status técnico */}
        {/* <motion.div
          variants={textAnimation}
          custom={3}
          className="flex justify-between text-xs text-gray-400"
        >
          <span className="flex items-center">
            <svg
              className="w-3 h-3 mr-1 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Conexão segura
          </span>
          <span>Carregando recursos...</span>
        </motion.div> */}
      </motion.div>

      {/* Efeito de partículas premium */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
            }}
            animate={{
              opacity: [0, 0.3, 0],
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              transition: {
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 16 + 2}px`,
              height: `${Math.random() * 16 + 2}px`,
              backgroundColor: i % 2 === 0 ? "#009feb" : "#fed400",
            }}
          />
        ))}
      </div>
    </div>
  );
}
