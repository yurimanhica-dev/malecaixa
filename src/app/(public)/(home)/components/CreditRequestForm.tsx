"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import {
  calculateTotalPayback,
  CREDIT_TYPES,
  validateCreditRequest,
} from "../../../utils/creditCalculations";

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

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      creditTypeId: parseInt(value),
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Allow empty values but validate numbers
    if (value === "") {
      setFormData((prev) => ({
        ...prev,
        [name]: "",
      }));
    } else {
      const numValue = Math.max(0, parseInt(value));
      setFormData((prev) => ({
        ...prev,
        [name]: isNaN(numValue) ? "" : numValue,
      }));
    }
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
        body: JSON.stringify({
          ...formData,
          // Ensure numeric values are numbers, not strings
          amount: Number(formData.amount),
          months: Number(formData.months),
          salary: Number(formData.salary),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar solicitação");
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
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      {/* Overlay de fundo com z-index menor */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Decoração de fundo  */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-20 w-64 h-64 bg-[var(--color-primary)] rounded-full mix-blend-overlay filter blur-3xl" />
        <div className="absolute bottom-0 right-20 w-64 h-64 bg-[var(--color-secondary)] rounded-full mix-blend-overlay filter blur-3xl" />
      </div>

      {/* Modal principal com z-index mais alto */}
      <div className="relative z-[10000] w-full max-w-md bg-white rounded-lg shadow-xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Cabeçalho fixo */}
        <div className="flex items-center justify-center p-4 bg-primary text-white">
          <h3 className="text-xl font-bold uppercase">
            Solicitação de Crédito
          </h3>
        </div>

        {/* Conteúdo com scroll */}
        <div className="overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Crédito *
              </label>

              <Select
                value={formData.creditTypeId.toString()}
                onValueChange={handleSelectChange}
                required
              >
                <SelectTrigger className="w-full px-3 py-2 border border-gray-300  rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none">
                  <SelectValue placeholder="Selecione o tipo de crédito" />
                </SelectTrigger>
                <SelectContent>
                  {CREDIT_TYPES.map((credit) => (
                    <SelectItem key={credit.id} value={credit.id.toString()}>
                      {credit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                Montante Pretendido (MZN) *
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
                <span className="font-medium text-gray-700">
                  Total a Pagar:
                </span>
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

            <div className="flex flex-row-reverse gap-4 justify-between pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Sair
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>
  );
}
