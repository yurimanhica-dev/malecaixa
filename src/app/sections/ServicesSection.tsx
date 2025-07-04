"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ServiceCard from "../components/ServiceCard";

const ServicesSection = () => {
  const services = [
    {
      title: "Empréstimos Pessoais",
      description:
        "Nossos empréstimos pessoais oferecem condições flexíveis e taxas competitivas, adaptadas às suas necessidades individuais.",
      icon: (
        <div className="relative w-20 h-20">
          <Image
            src="/servicos/iconb1.png"
            alt="Microcrédito"
            className="object-contain"
            fill
            quality={100}
            sizes="(max-width: 768px) 50vw, 100vw"
          />
        </div>
      ),
      backgroundImage: "/servicos/personaLoans.jpg",
      number: "01",
    },
    {
      title: "Empréstimos Emergenciais",
      description:
        "Soluções rápidas e confiáveis, proporcionando acesso imediato a recursos quando você mais precisa.",
      icon: (
        <div className="relative w-20 h-20">
          <Image
            src="/servicos/iconb2.png"
            alt="Microcrédito"
            className="object-contain"
            fill
            quality={100}
            sizes="(max-width: 768px) 50vw, 100vw"
          />
        </div>
      ),
      backgroundImage: "/servicos/emergencyLoans.jpeg",
      number: "02",
    },
    {
      title: "Financiamento Empresarial",
      description:
        "Fortaleça seu negócio com nossas opções de financiamento flexíveis. Adaptadas às necessidades específicas do seu empreendimento.",
      icon: (
        <div className="relative w-20 h-20">
          <Image
            src="/servicos/iconb3.png"
            alt="Microcrédito"
            className="object-contain"
            fill
            quality={100}
            sizes="(max-width: 768px) 50vw, 100vw"
          />
        </div>
      ),
      backgroundImage: "/servicos/businessLoans.jpeg",
      number: "03",
    },
    {
      title: "Crédito Educacional",
      description:
        "Abra portas para a educação com nosso financiamento estudantil. Planeje cuidadosamente o futuro dos seus estudos.",
      icon: (
        <div className="relative w-20 h-20">
          <Image
            src="/servicos/iconb4.png"
            alt="Microcrédito"
            className="object-contain"
            fill
            quality={100}
            sizes="(max-width: 768px) 50vw, 100vw"
          />
        </div>
      ),
      backgroundImage: "/servicos/studentLoans.jpg",
      number: "04",
    },
    {
      title: "Financiamento Habitacional",
      description:
        "Garanta a casa dos seus sonhos com nossos financiamentos imobiliários. Aproveite condições flexíveis e taxas de juros reduzidas.",
      icon: (
        <div className="relative w-20 h-20">
          <Image
            src="/servicos/iconb5.png"
            alt="Microcrédito"
            className="object-contain"
            fill
            quality={100}
            sizes="(max-width: 768px) 50vw, 100vw"
          />
        </div>
      ),
      backgroundImage: "/servicos/houseLoans.jpg",
      number: "05",
    },
    {
      title: "Microcrédito",
      description:
        "Soluções financeiras acessíveis para pequenos empreendedores e negócios familiares. Cresça com taxas especiais.",
      icon: (
        <div className="relative w-20 h-20">
          <Image
            src="/servicos/iconb6.png"
            alt="Microcrédito"
            className="object-contain"
            fill
            quality={100}
            sizes="(max-width: 768px) 50vw, 100vw"
          />
        </div>
      ),
      backgroundImage: "/servicos/microLoans.jpg",
      number: "06",
    },
  ];

  return (
    <section id="servicos" className="bg-gray-50 py-16 min-w-fit">
      <div className="max-w-6xl mx-auto flex flex-col items-center c-space">
        <span className="inline-block text-primary mb-4 px-4 py-1 text-sm border border-gray-300 rounded-full font-medium uppercase tracking-wider">
          Nossos Serviços
        </span>
        <motion.p
          className="text-4xl lg:text-5xl font-semibold text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Soluções financeiras adaptadas às suas necessidades
        </motion.p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 lg:px-8 xl:px-14">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
