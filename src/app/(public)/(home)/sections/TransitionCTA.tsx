"use client";

import { motion } from "framer-motion";
import ContactSection from "./ContactSection";

export default function TransitionCTA() {
  return (
    <section
      id="contactos"
      className="relative bg-gray-900 text-white py-20 pb-10 overflow-hidden min-w-fit"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--color-primary)] rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--color-secondary)] rounded-full filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
            Pronto para dar o próximo passo?
          </h2>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10">
            Visite nossa sede ou entre em contato para uma assistência
            personalizada. Nossa equipe está sempre pronta para ajudar.
          </p>

          <ContactSection />
          {/* </div>
          <div className="flex flex-wrap justify-center gap-4 mb-16"> */}

          {/* Contact quick links */}
          <div className="border-t  border-gray-800 pt-12">
            <h3 className="text-sm uppercase font-semibold tracking-wider text-gray-400 mb-4">
              Fale conosco diretamente
            </h3>
            <div className="flex items-center justify-center gap-4">
              {/* <FaPhoneAlt className="w-5 h-5" /> */}
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="tel:+258841234567"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  (+258) 84 123 4567
                </a>
                |
                <a
                  href="tel:+258214149911"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  (+258) 21 414 9911
                </a>
              </div>
            </div>
            {/* <h2 className=" tracking-wider text-gray-400 mt-4">
              © {new Date().getFullYear()} MALECaixa. Todos direitos reservados.
            </h2> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
