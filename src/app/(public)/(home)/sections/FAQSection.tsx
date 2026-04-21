"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Como posso solicitar um microcrédito?",
      answer:
        "Nosso processo é simples: preencha o formulário online, envie os documentos necessários e aguarde nossa análise. A aprovação pode levar até 48 horas úteis.",
    },
    {
      question: "Quais são os requisitos para obter um crédito?",
      answer:
        "Você precisa ter mais de 18 anos, comprovante de renda, documento de identificação válido e residência fixa em Moçambique há pelo menos 6 meses.",
    },
    {
      question: "Quais taxas e juros são aplicados?",
      answer:
        "As nossas taxas variam entre 10% e 60% ao mês, conforme o prazo do empréstimo. Não aplicamos quaisquer taxas adicionais além das apresentadas no processo da simulação.",
    },
    {
      question: "Qual o prazo máximo para pagamento?",
      answer:
        "Oferecemos prazos flexíveis de até 6 meses, dependendo das condições de pagamento fornecidas no momento da solicitação.",
    },
    {
      question: "E se eu tiver dificuldades no pagamento?",
      answer:
        "Entre em contato imediatamente com nossa equipe. Oferecemos planos de renegociação personalizados para ajudar em situações difíceis.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="contactos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto c-space">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#f5a623] text-white mb-4">
            <HelpCircle className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium uppercase  tracking-wider">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl text-primary uppercase font-extrabold  mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nossos serviços
            de microcrédito.
          </p>
        </motion.div>
        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left px-6 py-5  rounded-t-lg shadow-xs hover:shadow-sm transition-all duration-300 flex justify-between items-center ${
                  activeIndex === index
                    ? "shadow-md bg-[#f5a623] text-white"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-content-${index}`}
              >
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 " />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    id={`faq-content-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 -mt-8 bg-white/80 border-t border-gray-100 rounded-b-lg">
                      <p className="text-gray-700 pt-8 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
