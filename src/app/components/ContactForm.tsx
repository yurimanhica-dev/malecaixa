"use client";

import { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section>
      {/* Contact Form */}
      <div className="bg-gray-900 flex flex-col gap-8 text-white p-8 shadow-md">
        {/* <h3 className="text-xl text-start font-semibold mb-2 uppercase">
            Mande nos uma Messagem
          </h3> */}

        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded">
            Thank you! Your message has been sent successfully.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
            There was an error sending your message. Please try again later.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 text-start md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium  mb-1">
                Nome*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium  mb-1"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium  mb-1"
              >
                Contacto
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium  mb-1"
              >
                Assunto*
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border bg-gray-900 border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary appearance-none"
              >
                <option value="">Seleciona um assunto</option>
                <option value="Solicitação de Informação">
                  🔁 Solicitação de Informações
                </option>
                <option value="Suporte">🛠️ Ajuda ou Suporte Técnico</option>
                <option value="Sugestão">💡 Sugestão ou Feedback</option>
                <option value="Proposta de Parceria">
                  💼 Proposta de Parceria
                </option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium  mb-1"
              >
                Messagem*
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              ></textarea>
            </div>
          </div>

          <div className="mt-6 text-start">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-fit bg-primary hover:bg-primary/80 text-white font-medium py-3 px-6 rounded-2xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
