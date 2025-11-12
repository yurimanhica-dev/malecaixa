"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import LearnMoreButton from "../components/LearnMoreButton";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export default function MicrocreditHero() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const slides: Slide[] = [
    {
      id: 1,
      image: "/bgfam.jpg",
      title: "Soluções Financeiras para Sua Família",
      description:
        "Oferecemos crédito personalizado para realizar os projetos da sua família - desde a educação dos filhos, reforma da casa, até aquele sonho de viagem em família. Conte com condições que se adaptam à sua realidade financeira.",
      ctaText: "Proteja o Futuro da Sua Família",
      ctaLink: "/financiamento-familiar",
      // Opcional: adicionar ícone ou tag
    },
    {
      id: 2,
      image: "/77655.jpg",
      title: "Seu Plano, Nosso Apoio",
      description:
        "Oferecemos soluções de microcrédito com condições justas, prazos flexíveis e aprovação simplificada. Ideal para quem precisa impulsionar os seus planos com financiamento ágil, seguro e transparente.",
      ctaText: "Solicitar Agora",
      ctaLink: "/apply",
    },
    // {
    //   id: 3,
    //   image: "/bgagr.jpeg",
    //   title: "Apoiamos o Empreendedor Local",
    //   description:
    //     "Acreditamos no poder transformador do empreendedorismo local. Nosso objetivo é fomentar o desenvolvimento sustentável da sua comunidade, por meio de financiamento responsável e acompanhamento próximo.",
    //   ctaText: "Entenda como funciona.",
    //   ctaLink: "/about",
    // },
    {
      id: 4,
      image: "/2150445983.jpg",
      title: "Apoiando o Crescimento de Quem Faz a Diferença",
      description:
        "Acreditamos no potencial de cada trabalhador do sector privado. Por isso, oferecemos empréstimos acessíveis, com condições justas e prazos que acompanham seu ritmo de vida, para que você avance com confiança.",
      ctaText: "Entenda como funciona.",
      ctaLink: "/about",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    resetAutoPlay();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    resetAutoPlay();
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAutoPlaying) nextSlide();
    }, 20000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isAutoPlaying]);

  // Animação de fundo suave
  const fadeVariants: Variants = {
    enter: { opacity: 0 },
    center: {
      opacity: 1,
      transition: { duration: 1.5, ease: [0.33, 1, 0.68, 1] },
    },
    exit: {
      opacity: 0,
      transition: { duration: 1.3, ease: [0.33, 1, 0.68, 1] },
    },
  };

  // Animação de conteúdo elegante
  const contentVariants: Variants = {
    hidden: { x: -40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.3,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative h-[85vh] min-h-fit w-full overflow-hidden flex flex-col justify-between"
    >
      {/* Fundo com overlay gradiente */}
      <AnimatePresence>
        <motion.div
          key={`image-${slides[currentIndex].id}`}
          variants={fadeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full overflow-hidden -z-10"
        >
          <motion.img
            key={`bg-${slides[currentIndex].id}`}
            src={slides[currentIndex].image}
            alt="Imagem de fundo"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 15, ease: "easeInOut" }}
            className="parallax-bg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-transparent z-0" />
        </motion.div>
      </AnimatePresence>

      {/* Conteúdo centralizado (sem absolute) */}
      <div className="flex-1 flex items-center">
        <div className="max-w-7xl c-space mx-auto w-full">
          <AnimatePresence>
            <motion.div
              key={`content-${slides[currentIndex].id}`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={contentVariants}
              className="relative z-20"
            >
              <div className="grid grid-cols-1 gap-8 items-center">
                <div>
                  <h1 className="text-5xl md:text-5xl lg:text-6xl max-w-md lg:max-w-3xl uppercase font-bold font-sans text-white">
                    {slides[currentIndex].title}
                  </h1>
                </div>
                <hr className="border-t max-w-5xl border-gray-300" />
                <div>
                  <p className="text-base md:text-lg lg:text-xl text-gray-100 mb-4 max-w-xl">
                    {slides[currentIndex].description}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <LearnMoreButton />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controles (mantidos no final, sem absolute) */}
      <div className="pb-8 md:pb-12">
        <div className="max-w-7xl c-space mx-auto flex justify-between items-center">
          {/* Indicadores */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? "bg-secondary w-8"
                    : "bg-white/30 w-4"
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Botões */}
          <div className="flex space-x-3">
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
