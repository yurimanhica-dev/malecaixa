"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";

const OurStory = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item: Variants = {
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
  return (
    <section id="sobre" className="py-20 md:py-30 bg-white min-w-fit">
      <div className="max-w-7xl mx-auto c-space">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-96 overflow-hidden shadow-lg">
            <Image
              // src="/need.jpeg"
              src="/30575.jpg"
              alt="coleção de fotos de pessoas que fizeram empréstimos"
              fill
              className="object-cover object-top"
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={container}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <motion.div variants={item}>
              <span className="inline-block uppercase tracking-wider text-gray-700 px-3 py-2 text-sm font-medium rounded-full bg-[var(--color-secondary)] ">
                Nossa História
              </span>
            </motion.div>
            <motion.div
              variants={item}
              className="mt-2 md:mt-2 p-2 md:p-3 bg-primary shadow-md shadow-primary/20 backdrop-blur-sm"
            >
              <blockquote className="text-gray-100 text-lg leading-relaxed border-l-4 border-secondary pl-4 md:pl-6">
                &ldquo;Financiando o futuro de quem precisa{""}
                <span className="text-secondary text-2xl">.</span>&rdquo;
              </blockquote>
            </motion.div>

            <motion.p
              variants={item}
              className="text-md text-gray-600 leading-relaxed"
            >
              Desde 2012, nascemos com um propósito claro: ampliar o acesso ao
              crédito de forma justa e inclusiva. Em um cenário onde muitos
              pequenos empreendedores eram ignorados pelos grandes bancos,
              estendemos a mão a quem mais precisava. Ao longo dos anos,
              transformamos milhares de histórias por meio do microcrédito
              responsável, promovendo autonomia, dignidade e crescimento
              sustentável nas comunidades que atendemos.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
