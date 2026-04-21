"use client";

import { Clock, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { FaCoins } from "react-icons/fa";
import CambioCard from "../components/CambioCard"; // <- importa seu card de câmbio
import ContactForm from "../components/ContactForm";

const ContactSection = () => {
  const [activeTab, setActiveTab] = useState<"location" | "form" | "exchange">(
    "location",
  );

  const renderContent = () => {
    switch (activeTab) {
      case "location":
        return (
          <div className="grid md:grid-cols-2">
            {/* Contact Info */}
            <div className="p-8 text-start md:p-10">
              <h3 className="text-2xl uppercase font-bold mb-6">
                Encontre-nos
              </h3>

              <div className="space-y-4">
                <div>
                  <p>Rua Frei do Amaro, nr.56</p>
                  <p>Malhangalene, Maputo</p>
                  <p>Moçambique</p>
                </div>

                <div className="flex gap-2 mt-4">
                  <Clock className="w-5 h-5" />
                  <h4 className="font-medium">Horário de Atendimento</h4>
                </div>
                <div>
                  <p>Segunda - Sexta: 08:00 - 17:00</p>
                  <p>Sábado - Domingo: Fechado</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="relative h-96 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/10 to-transparent z-10 pointer-events-none" />
              <iframe
                title="Google Map of MALEholding"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4138.544492594585!2d32.58336991151697!3d-25.956186377135207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee69babee23d951%3A0x127b787279af37a6!2sMALE%20Seguros!5e1!3m2!1spt-PT!2smz!4v1750235176365!5m2!1spt-PT!2smz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        );

      case "form":
        return <ContactForm />;

      case "exchange":
        return <CambioCard />;

      default:
        return null;
    }
  };

  return (
    <section id="contact" className="py-8">
      <div className="max-w-7xl mx-auto c-space">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab("location")}
              className={`px-6 py-3 text-start rounded-md text-sm font-medium flex items-center gap-2 transition-all ${
                activeTab === "location"
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-gray-200 cursor-pointer"
              }`}
            >
              <MapPin className="w-5 h-5" />
              Localização
            </button>
            <button
              onClick={() => setActiveTab("form")}
              className={`px-6 py-3 text-start rounded-md text-sm font-medium flex items-center gap-2 transition-all ${
                activeTab === "form"
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-gray-200 cursor-pointer"
              }`}
            >
              <Mail className="w-5 h-5" />
              Mensagem
            </button>
            <button
              onClick={() => setActiveTab("exchange")}
              className={`px-6 py-3 text-start rounded-md text-sm font-medium flex items-center gap-2 transition-all ${
                activeTab === "exchange"
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-gray-200 cursor-pointer"
              }`}
            >
              <FaCoins className="w-5 h-5" /> Câmbio
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-900 shadow-lg overflow-hidden border text-gray-100 border-gray-200">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
