"use client";

import Image from "next/image";
import Link from "next/link";

const CreditoTipo = () => {
  return (
    <section
      id=""
      className="py-20 bg-gradient-to-br from-gray-900 to-primary overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black text-secondary mb-4">
            Crédito JÁ
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Uma solução rápida, simples e acessível para trabalhadores do{" "}
            <span className="font-semibold text-secondary">Sector Privado</span>{" "}
            que precisam de liquidez imediata.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Imagem */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[6/7] relative">
                <Image
                  src="/2149034565.jpg"
                  alt="Crédito Já"
                  fill
                  className="object-cover"
                  quality={100}
                  priority
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" /> */}
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">
              O que é o Crédito Já?
            </h3>

            <p className="text-gray-300 leading-relaxed">
              O <span className="text-white font-semibold">Crédito Já</span> é
              um financiamento rápido destinado a funcionários do sector
              privado. Projetado para ajudar em situações urgentes, permite que
              receba o valor na sua conta com total segurança e sem burocracias
              desnecessárias.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-secondary">100%</div>
                <p className="text-gray-300 text-sm mt-1">Digital</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-secondary">24h</div>
                <p className="text-gray-300 text-sm mt-1">Resposta</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-secondary">21+</div>
                <p className="text-gray-300 text-sm mt-1">Idade mínima</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-secondary">0%</div>
                <p className="text-gray-300 text-sm mt-1">Avanço</p>
              </div>
            </div>
            <div>
              <Link
                href="/#simulacao"
                className="block w-full text-center bg-secondary text-white text-lg py-4 rounded-full font-bold hover:bg-secondary/90 transition-all"
              >
                Simular o Crédito
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreditoTipo;
