"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
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

      <div className="max-w-7xl mx-auto c-space relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl uppercase font-extrabold leading-tight mb-6">
            Pronto para dar o próximo passo?
          </h2>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10">
            Visite nossa sede ou entre em contato para uma assistência
            personalizada. Nossa equipe está sempre pronta para ajudar.
          </p>

          <ContactSection />

          {/* Contact quick links */}
          <div className="border-t border-gray-800 pt-12">
            <h3 className="text-sm uppercase font-semibold tracking-wider text-gray-400 mb-4">
              Fale conosco diretamente
            </h3>
            <div className="flex items-center justify-center gap-4">
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  href="tel:+258841234567"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  (+258) 84 123 4567
                </Link>
                |
                <Link
                  href="tel:+258214149911"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  (+258) 21 414 9911
                </Link>
              </div>
            </div>
          </div>

          {/* Divider with "ou" */}
          <div className="flex items-center justify-center gap-4 my-10">
            <span className="h-px w-[40%] bg-gray-700"></span>
            <span className="text-gray-400 text-sm font-medium uppercase">
              ou
            </span>
            <span className="h-px w-[40%] bg-gray-700"></span>
          </div>

          {/* Social media links */}
          <div className="">
            <h3 className="text-sm uppercase font-semibold tracking-wider text-gray-400 mb-6">
              Siga-nos
            </h3>
            <div className="flex items-center justify-center gap-6">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
