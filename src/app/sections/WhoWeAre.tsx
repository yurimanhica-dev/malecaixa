"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Simulacao from "../components/Simulacao";

const LoanSection = () => {
  const benefits = [
    "Dados seguros e protegidos",
    "Apoio em cada etapa",
    "Consulta da sua situação financeira em tempo real",
    "Taxas competitivas e acessíveis",
    "Planos flexíveis e adaptáveis",
    "Processo de aprovação simplificado",
  ];

  return (
    <section className="relative bg-white lg:py-15  overflow-hidden min-w-fit">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--color-primary)] rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--color-secondary)] rounded-full filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block uppercase tracking-wider text-gray-700 px-3 pt-1.5 pb-1 text-sm font-medium rounded-full bg-[var(--color-secondary)]"
            >
              QUEM SOMOS
            </motion.span>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl leading-relaxed"
            >
              Uma microcrédito que surgiu com a missão de manter o capital em
              circulação para pessoas e empresas, fortalecendo a economia e
              promovendo estabilidade. Apoiamos o crescimento com crédito
              acessível, seguro e responsável.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Por que escolher os nossos serviços?
              </h3>

              <ul className="grid grid-cols-1 gap-4 w-full">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 text-gray-700 "
                  >
                    <motion.div className="flex items-center gap-2 p-2 bg-primary shadow-md shadow-primary/20 backdrop-blur-sm w-full">
                      <CheckCircle className="w-4 h-4 mt-0.5 text-[var(--color-secondary)] " />
                      <blockquote className="text-gray-100 text-sm leading-relaxed border-l-4 border-secondary pl-4 md:pl-6">
                        &ldquo;{benefit}&rdquo;
                      </blockquote>
                    </motion.div>
                    {/* <span>{benefit}</span> */}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Loan Calculator - Placeholder for your simulator */}
          <Simulacao />
        </div>
      </div>
    </section>
  );
};

export default LoanSection;
