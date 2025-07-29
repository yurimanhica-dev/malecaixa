"use client";

import { ArrowRight, Loader2, Upload } from "lucide-react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

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
    phone: "(+258) ",
    subject: "",
    message: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formPayload = new FormData();

      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      // Append file if exists
      if (file) {
        formPayload.append("file", file);
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formPayload,
      });

      if (response.ok) {
        setSubmitStatus("success");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "(+258) ",
          subject: "",
          message: "",
        });
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section className="bg-gray-900 text-white text-start p-8 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold uppercase mb-6">
        Formulário de Contacto
      </h3>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
          Mensagem enviada com sucesso! Entraremos em contacto brevemente.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
          Ocorreu um erro. Por favor, tente novamente mais tarde.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Nome Completo*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Contacto
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(+258) 84 123 4567"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>

          {/* Subject Dropdown */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Assunto*
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary appearance-none"
            >
              <option value="">Selecione um assunto</option>
              <option value="Acompanhamento de Pedido">
                Acompanhamento de Pedido
              </option>
              <option value="Informações sobre Condições e Taxas">
                Informações sobre Condições e Pagamentos
              </option>
              <option value="Reclamação ou Problema">
                Reclamação ou Problema
              </option>
              <option value="Sugestão ou Feedback">Sugestão ou Feedback</option>
              <option value="Proposta de Parceria">Proposta de Parceria</option>
            </select>
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Mensagem*
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Escreva sua mensagem aqui..."
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          ></textarea>
        </div>

        {/* File Upload */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Anexar Documento
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-fit max-w-[300px] items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors overflow-hidden cursor-pointer"
            >
              <Upload className="w-5 h-5 shrink-0" />
              <span className="truncate whitespace-nowrap overflow-hidden text-ellipsis">
                {file ? file.name : "Selecionar Arquivo"}
              </span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            {file && (
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="text-sm text-red-400 hover:text-red-300 cursor-pointer"
              >
                Remover
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-gray-400">
            Formatos aceites: PDF, DOC, JPG, PNG (Tamanho máximo: 5MB)
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center w-fit justify-start gap-2 md:w-auto px-6 py-3 bg-primary hover:bg-[var(--color-hover)] text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Enviando...
              </>
            ) : (
              <>
                Enviar Mensagem
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
