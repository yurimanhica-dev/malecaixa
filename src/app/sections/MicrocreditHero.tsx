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
      image: "/bg2.jpg",
      title: "Financiamento Acessível para Seu Negócio",
      description:
        "Oferecemos soluções de microcrédito com condições justas, prazos flexíveis e aprovação simplificada. Ideal para quem precisa impulsionar o seu negócio com agilidade, segurança e transparência.",
      ctaText: "Solicitar Agora",
      ctaLink: "/apply",
    },
    {
      id: 2,
      image: "/bgfam.jpg",
      title: "Soluções Financeiras para Sua Família",
      description:
        "Oferecemos crédito personalizado para realizar os projetos da sua família - desde a educação dos filhos, reforma da casa, até aquele sonho de viagem em família. Conte com condições que se adaptam à sua realidade financeira.",
      ctaText: "Proteja o Futuro da Sua Família",
      ctaLink: "/financiamento-familiar",
      // Opcional: adicionar ícone ou tag
    },
    {
      id: 3,
      image: "/bgagr.jpeg",
      title: "Apoio ao Empreendedor Local",
      description:
        "Acreditamos no poder transformador do empreendedorismo local. Nosso objetivo é fomentar o desenvolvimento sustentável da sua comunidade, por meio de financiamento responsável e acompanhamento próximo.",
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
      transition: { duration: 1.2, ease: [0.33, 1, 0.68, 1] },
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
      className="min-w-fit relative h-[90vh] w-full overflow-hidden c-space  bg-gray-900"
    >
      {/* Fundo com overlay gradiente profissional */}
      <AnimatePresence>
        <motion.div
          key={`image-${slides[currentIndex].id}`}
          variants={fadeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          <motion.div
            initial={{ scale: 1, y: 0 }}
            animate={{ scale: 1.05, y: -10 }}
            transition={{ duration: 10, ease: "easeInOut" }}
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${slides[currentIndex].image})`,
              backgroundPosition: "start center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Conteúdo com hierarquia visual clara */}
      <div className="absolute inset-0 pt-18 z-10 flex items-center">
        <div className="container c-space">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${slides[currentIndex].id}`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={contentVariants}
              className="relative z-20"
            >
              {/* Título com peso visual adequado */}
              <div className="flex flex-col gap-8">
                <h1 className="text-4xl  md:text-6xl lg:text-7xl sm:max-w-md lg:max-w-3xl uppercase font-bold font-sans text-white ">
                  {slides[currentIndex].title}
                </h1>

                <hr className="border-t my-1 max-w-5xl border-gray-300 " />

                <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-xl">
                  {slides[currentIndex].description}
                </p>
              </div>
              <LearnMoreButton />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controles de navegação discretos mas acessíveis */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center">
          {/* Indicadores com feedback visual claro */}
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

          {/* Botões de navegação com microinterações */}
          <div className="flex space-x-3">
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300"
              aria-label="Próximo slide"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
