"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react"; // Adicionei o useEffect

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true); // Estado para controlar o auto-play
  const autoPlayInterval = 10000; // 10 segundos

  const testimonials = [
    {
      quote:
        "Com este crédito, pude expandir meu negócio e alcancar novos clientes.",
      author: "Maria Silva",
      role: "Micro-empreendedora",
      location: "Maputo",
      image: "/testimonials/Micro-empreendedora.jpg",
    },
    {
      quote:
        "O processo foi simples e rápido, consegui comprar mais stock para minha loja.",
      author: "Denilson Mondlane",
      role: "Pequeno comerciante",
      location: "Beira",
      image: "/testimonials/shop.jpg",
    },
    {
      quote:
        "Realizei o sonho de ter minha própria padaria com ajuda do crédito acessível.",
      author: "Antonio Muchanga",
      role: "Proprietário de padaria",
      location: "Nampula",
      image: "/testimonials/padaria.png",
    },
    {
      quote: "Com o crédito, consegui melhorar a minha produção na machamba.",
      author: "Manuel Cossa",
      role: "Camponês",
      location: "Chókwè",
      image: "/testimonials/campones.jpg",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  // Função para voltar ao depoimento anterior
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // Efeito para o auto-play
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoPlay) {
      interval = setInterval(() => {
        nextTestimonial();
      }, autoPlayInterval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay, currentTestimonial]); // Adicionei currentTestimonial às dependências

  // Pausa o auto-play quando o usuário interage
  const handleUserInteraction = (navigationFn: () => void) => {
    setAutoPlay(false);
    navigationFn();
    // Opcional: pode reiniciar o auto-play após algum tempo
    setTimeout(() => setAutoPlay(true), autoPlayInterval * 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-[var(--color-primary)] text-white min-w-[300px] rounded-2xl shadow-2xl h-full flex flex-col overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative h-56 md:h-64 w-full">
        <AnimatePresence>
          <motion.div
            key={`image-${currentTestimonial}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 "
          >
            <Image
              src={testimonials[currentTestimonial].image}
              alt={`Foto de ${testimonials[currentTestimonial].author}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 rounded-b-3xl bg-gradient-to-t from-[var(--color-primary)] to-transparent opacity-40" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-secondary">
          Depoimentos
        </h3>

        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentTestimonial}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col flex-grow"
          >
            <blockquote className="italic leading-relaxed mb-2 flex-grow">
              “{testimonials[currentTestimonial].quote}”
            </blockquote>

            <div className="mt-2">
              <p className="font-medium text-lg">
                {testimonials[currentTestimonial].author}
              </p>
              <p className="text-sm opacity-80">
                {testimonials[currentTestimonial].role},{" "}
                {testimonials[currentTestimonial].location}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/20">
          <button
            onClick={() => handleUserInteraction(prevTestimonial)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setAutoPlay(false);
                  setCurrentTestimonial(idx);
                }}
                className={`w-3 h-2 rounded-full transition-all ${
                  idx === currentTestimonial
                    ? "bg-[var(--color-secondary)] w-6"
                    : "bg-white/30"
                }`}
                aria-label={`Depoimento ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => handleUserInteraction(nextTestimonial)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonials;
