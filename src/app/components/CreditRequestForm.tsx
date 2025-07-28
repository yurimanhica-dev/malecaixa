"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import {
  calculateTotalPayback,
  CREDIT_TYPES,
  validateCreditRequest,
} from "../utils/creditCalculations";

interface CreditRequestFormProps {
  onClose: () => void;
  initialData: {
    creditTypeId: number;
    amount: number;
    months: number;
  };
}

export default function CreditRequestForm({
  onClose,
  initialData,
}: CreditRequestFormProps) {
  const [formData, setFormData] = useState({
    creditTypeId: initialData.creditTypeId,
    institution: "",
    fullName: "",
    phone: "(+258) ",
    email: "",
    salary: "",
    amount: initialData.amount,
    months: initialData.months,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");

  const currentCreditType = CREDIT_TYPES.find(
    (credit) => credit.id === formData.creditTypeId
  )!;
  const totalPayback = calculateTotalPayback(
    formData.amount,
    formData.months,
    formData.creditTypeId
  );

  useEffect(() => {
    const error = validateCreditRequest(
      formData.amount,
      formData.months,
      formData.creditTypeId
    );
    setValidationError(error ?? "");
  }, [formData.amount, formData.months, formData.creditTypeId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "creditTypeId" ? parseInt(value) : value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Math.max(0, parseInt(value)),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (validationError) {
        throw new Error(validationError);
      }

      // Validação básica dos campos obrigatórios
      if (
        !formData.fullName ||
        !formData.phone ||
        !formData.email ||
        !formData.salary
      ) {
        throw new Error("Por favor, preencha todos os campos obrigatórios");
      }

      const response = await fetch("/api/credit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        toast.success("Erro ao enviar solicitação", {
          position: "bottom-center",
          duration: 4000,
        });
        return;
      }

      toast.success("Solicitação enviada com sucesso!", {
        position: "bottom-center",
        duration: 4000,
      });
      setTimeout(onClose, 2000);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ocorreu um erro", {
        position: "bottom-center",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 ">
      {/* Decoração de fundo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-20 w-64 h-64 bg-[var(--color-primary)] rounded-full mix-blend-overlay filter blur-3xl" />
        <div className="absolute bottom-0 right-20 w-64 h-64 bg-[var(--color-secondary)] rounded-full mix-blend-overlay filter blur-3xl" />
      </div>

      <div className="bg-white rounded-lg shadow-xl [&::-webkit-scrollbar]:hidden h-[90vh] overflow-y-scroll w-full max-w-md relative z-10">
        <div className="sticky top-0 w-full max-w-md bg-primary p-4 rounded-t-lg">
          <h3 className="text-xl font-bold text-white text-center">
            Solicitação de Crédito
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Crédito *
            </label>
            <div className="relative w-full">
              <select
                name="creditTypeId"
                value={formData.creditTypeId}
                onChange={handleChange}
                className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all appearance-none"
                required
              >
                {CREDIT_TYPES.map((credit) => (
                  <option
                    className="border-none outline-none"
                    key={credit.id}
                    value={credit.id}
                  >
                    {credit.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contacto Telefónico *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Líquido Mensal (MZN) *
            </label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleNumberChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Montante Pretendido (MZN) *{""}
              <span className="text-xs text-gray-500 ml-2">
                (Mín: {currentCreditType.minAmount.toLocaleString()} MZN, Máx:{" "}
                {currentCreditType.maxAmount.toLocaleString()} MZN)
              </span>
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleNumberChange}
              min={currentCreditType.minAmount}
              max={currentCreditType.maxAmount}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prazo de Pagamento (meses) *
              <span className="text-xs text-gray-500 ml-2">
                (Mín: {currentCreditType.minMonths}, Máx:{" "}
                {currentCreditType.maxMonths})
              </span>
            </label>
            <input
              type="number"
              name="months"
              value={formData.months}
              onChange={handleNumberChange}
              min={currentCreditType.minMonths}
              max={currentCreditType.maxMonths}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              required
            />
          </div>

          <div className="bg-gray-50 p-3 rounded border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Total a Pagar:</span>
              <span className="font-bold text-lg text-primary">
                {totalPayback.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}{" "}
                MZN
              </span>
            </div>
            {validationError && (
              <p className="mt-1 text-xs text-red-600">{validationError}</p>
            )}
          </div>

          <div className="flex flex-row-reverse gap-8 justify-between space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Voltar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors flex items-center space-x-2"
              disabled={isSubmitting || !!validationError}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <span>Enviar Solicitação</span>
                  <FaPaperPlane />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
