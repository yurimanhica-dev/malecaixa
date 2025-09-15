"use client";

import { motion } from "framer-motion";
import { MapPin, Smile, User } from "lucide-react";
import CountUp from "react-countup";
import { FaMoneyCheck } from "react-icons/fa";
import Testimonials from "../components/Testimonials";

const ImpactSection = () => {
  const stats = [
    {
      value: 2000,
      prefix: "+",
      label: "Clientes atendidos",
      icon: <User className="w-5 h-5" />,
      duration: 2.5,
    },
    {
      value: 5,
      prefix: "+",
      suffix: " milhões",
      label: "Em crédito concedido",
      icon: <FaMoneyCheck className="w-5 h-5" />,
      duration: 3,
    },
    {
      value: 98,
      suffix: "%",
      label: "Taxa de satisfação",
      icon: <Smile className="w-5 h-5" />,
      duration: 2,
    },
    {
      value: 500,
      prefix: "+",
      label: "Comunidades impactadas",
      icon: <MapPin className="w-5 h-5" />,
      duration: 2.5,
    },
  ];

  return (
    <section className="relative py-20 bg-white text-gray-800 overflow-hidden min-w-fit">
      {/* Decorative blobs */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[var(--color-primary)] rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-64 h-64 bg-[var(--color-secondary)] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto c-space relative">
        <div className="grid lg:grid-cols-3 gap-12 ">
          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <motion.span
              className="inline-block uppercase tracking-wider px-3 py-2 text-sm font-medium rounded-full
               bg-[var(--color-primary)] text-white shadow "
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Nosso Impacto
            </motion.span>

            <h2 className="text-3xl text-primary/80 md:text-4xl uppercase font-sans font-bold leading-tight">
              Transformando realidades em Moçambique
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl">
              Cada número representa histórias reais de sucesso e inclusão
              financeira sustentável nas comunidades que apoiamos.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.015 }}
                  className="bg-white p-4 shadow-sm hover:shadow-md hover:border-[var(--color-primary)] transition-all duration-300"
                >
                  <div className="flex items-center flex-col md:flex-row justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl  text-[var(--color-secondary)] text-lg">
                        {stat.icon}
                      </div>
                      <span className="text-sm text-gray-500 font-medium tracking-wide">
                        {stat.label}
                      </span>
                    </div>
                    <div className="text-xl font-extrabold text-[var(--color-primary)] leading-tight">
                      <CountUp
                        end={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        duration={stat.duration}
                        separator="."
                        decimal=","
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <div className="md:col-span-1 w-full flex justify-center items-center">
            <Testimonials />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
