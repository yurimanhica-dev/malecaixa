"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Link from "next/link";
import login from "../../../assets/lotties/login.json";

const Solucoes = () => {
  return (
    <section
      id="solucoes"
      className="relative py-20 overflow-hidden bg-[#f5a623]"
    >
      <div className="relative container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 text-white"
        >
          <span className="inline-block mb-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-black/15 bg-black/10">
            Nossa Solução Financeira
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl border border-black/10 bg-black/10 backdrop-blur-sm p-6">
              <p className="text-lg font-semibold tracking-widest uppercase text-white mb-4">
                Crédito Já
              </p>
              <div className="space-y-4 text-white">
                <p className="leading-relaxed">
                  A solução de crédito que ajuda colaboradores do sector privado
                  a obter financiamento de forma rápida e segura. Sem
                  burocracia, com aprovação simples e condições feitas à sua
                  medida.
                </p>
                <p className="font-semibold text-white">
                  Condições para Aderir
                </p>
                <ul className="mb-4 space-y-2">
                  <li className="">✔ Ser colaborador do sector privado</li>
                  <li className="">✔ Ter renda fixa</li>
                  <li className="">✔ Ter conta bancária</li>
                  <li className="">✔ Idade acima de 18 anos</li>
                  <li className="">✔ Residir em Moçambique</li>
                </ul>
                <p className="mb-6 text-white leading-relaxed">
                  Descubra quanto pode receber em segundos, sem compromisso e
                  sem custos.
                </p>
              </div>
              <Link
                href="/#simulacao"
                className="inline-flex items-center gap-2 bg-[#0b1120] text-white text-sm font-bold px-6 py-3 rounded-lg hover:bg-[#1b2849] active:scale-[0.97] transition-all duration-200"
              >
                Simular Agora
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>

          <div className="flex justify-center items-center">
            <Lottie
              animationData={login}
              loop
              className="w-full max-w-md lg:max-w-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solucoes;
