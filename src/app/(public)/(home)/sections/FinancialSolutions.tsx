"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const FinancialSolutions = () => {
  const services = [
    {
      title: "Microcrédito",
      description: "Soluções acessíveis para pequenos empreendedores.",
      icon: "/servicos/iconb6.png",
      backgroundImage: "/servicos/microLoans.jpg",
      number: "01",
      color: "text-primary",
    },
    {
      title: "Empréstimos Pessoais",
      description: "Condições flexíveis e taxas competitivas.",
      icon: "/servicos/iconb1.png",
      backgroundImage: "/servicos/personaLoans.jpg",
      number: "02",
      color: "text-secondary",
    },
    {
      title: "Emergência Já",
      description:
        "Soluções rápidas e confiáveis para quando você mais precisa.",
      icon: "/servicos/iconb2.png",
      backgroundImage: "/servicos/emergencyLoans.jpeg",
      number: "03",
      color: "text-primary",
    },

    {
      title: "Crédito Imobiliário",
      description: "Condições flexíveis para a casa dos seus sonhos.",
      icon: "/servicos/iconb5.png",
      backgroundImage: "/servicos/houseLoans.jpg",
      number: "04",
      color: "text-secondary",
    },
    {
      title: "Crédito Educacional",
      description: "Financiamento estudantil para planejar seu futuro.",
      icon: "/servicos/iconb4.png",
      backgroundImage: "/servicos/studentLoans.jpg",
      number: "05",
      color: "text-primary",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === services.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
  };

  return (
    <section
      id="solucoes"
      className="py-12 md:py-20 bg-primary overflow-hidden min-w-fit"
    >
      <div className="container mx-auto c-space">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-3xl md:text-4xl uppercase font-extrabold text-gray-100 mb-3 md:mb-4 title-underline">
            Soluções Disponíveis
          </h2>
          <p className="text-base md:text-lg text-secondary max-w-3xl mx-auto">
            Descubra a solução perfeita para suas necessidades financeiras
          </p>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <div className="relative w-full">
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <div className="group flex-shrink-0 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 my-4">
                  <div className="relative h-80 w-full">
                    <Image
                      src={services[currentIndex].backgroundImage}
                      alt={services[currentIndex].title}
                      fill
                      className="object-cover"
                      quality={100}
                      sizes="100vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div
                      className={`absolute top-3 right-3 bg-white font-bold rounded-full w-8 h-8 flex items-center justify-center shadow ${services[currentIndex].color}`}
                    >
                      {services[currentIndex].number}
                    </div>
                  </div>

                  <div className="p-4 ">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative w-10 h-10">
                        <Image
                          src={services[currentIndex].icon}
                          alt={`Ícone ${services[currentIndex].title}`}
                          fill
                          className="object-contain"
                          sizes="40px"
                        />
                      </div>
                      <h3 className="text-lg text-nowrap font-semibold text-primary">
                        {services[currentIndex].title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {services[currentIndex].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4 gap-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Anterior"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div className="flex items-center">
                <span className="text-white text-sm">
                  {currentIndex + 1}/{services.length}
                </span>
              </div>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Próximo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block relative group overflow-hidden">
          <div className="flex max-w-screen-xl animate-slide group-hover:animate-none ">
            {[...services, ...services].map((service, index) => (
              <div
                key={index}
                className="group w-72 md:w-80 shrink-0 mx-3 rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2 my-8"
              >
                <div className="relative h-40">
                  <Image
                    src={service.backgroundImage}
                    alt={service.title}
                    fill
                    className="object-cover"
                    quality={85}
                    sizes="(max-width: 1024px) 33vw, 25vw"
                    priority={index < 6}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 right-3 bg-white text-gray-600 font-bold rounded-full w-8 h-8 flex items-center justify-center shadow">
                    {service.number}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-10 h-10">
                      <Image
                        src={service.icon}
                        alt={`Ícone ${service.title}`}
                        fill
                        className="object-contain"
                        sizes="40px"
                      />
                    </div>
                    <h3
                      className={`text-lg font-semibold uppercase ${service.color}`}
                    >
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialSolutions;
