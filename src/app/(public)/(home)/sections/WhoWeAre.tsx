"use client";

import { motion } from "framer-motion";
import {
  Clock,
  FileCheck,
  Headset,
  Percent,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import Simulacao from "../components/Simulacao";

const LoanSection = () => {
  const benefits = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Segurança de dados",
      description: "Proteção avançada com criptografia de ponta a ponta",
    },
    {
      icon: <Headset className="w-6 h-6" />,
      title: "Suporte dedicado",
      description: "Assistência personalizada em todas as etapas",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Monitoramento em tempo real",
      description: "Acompanhamento financeiro instantâneo",
    },
    {
      icon: <Percent className="w-6 h-6" />,
      title: "Taxas competitivas",
      description: "Condições financeiras acessíveis",
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Flexibilidade",
      description: "Planos adaptáveis às suas necessidades",
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Processo simplificado",
      description: "Aprovação rápida e sem burocracia",
    },
  ];

  return (
    <section id="simulacao" className="relative bg-white pb-24 ">
      {/* Background gradient elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-primary)] rounded-full filter blur-[100px]" />
        <div className="absolute top-0 left-0  w-64 h-64 bg-[var(--color-secondary)] rounded-full filter blur-[100px]" />
      </div>
      <div className="max-w-7xl mx-auto c-space relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
              className="inline-block uppercase tracking-wider text-gray-700 px-3 py-2 text-sm font-medium rounded-full bg-[var(--color-secondary)]"
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
              <h3 className="text-xl font-bold uppercase text-primary mb-6">
                Vantagens exclusivas
              </h3>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index + 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                  >
                    <div className="flex-shrink-0 p-2 text-[var(--color-secondary)] rounded-lg">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Loan Calculator */}
          <div className="relative">
            <div className="sticky top-24">
              <Simulacao />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanSection;
