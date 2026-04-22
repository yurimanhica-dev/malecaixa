"use client";

import {
  calculateEncargos,
  calculateMonthlyPayment,
  calculateTotalPayback,
  CREDIT_TYPES,
  validateCreditRequest,
} from "@/app/utils/Creditoja";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { FaHandshake } from "react-icons/fa";
import CreditRequestForm from "./CreditRequestForm";

interface LoanData {
  creditTypeId: number;
  amount: number;
  months: number;
  monthlyIncome?: number;
  proofDocument?: File[] | null;
}

const Simulacao = () => {
  const [loanData, setLoanData] = useState<LoanData>({
    creditTypeId: CREDIT_TYPES[0].id,
    amount: CREDIT_TYPES[0].minAmount,
    months: CREDIT_TYPES[0].minMonths,
    monthlyIncome: 0,
    proofDocument: [],
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);

  const currentCreditType = CREDIT_TYPES.find(
    (credit) => credit.id === loanData.creditTypeId,
  )!;
  const monthlyPayment = calculateMonthlyPayment(
    loanData.amount,
    loanData.months,
    loanData.creditTypeId,
  );
  const totalPayback = calculateTotalPayback(
    loanData.amount,
    loanData.months,
    loanData.creditTypeId,
  );

  const totalEncargos = calculateEncargos(loanData.amount);

  const interestRate = currentCreditType.interestRates[loanData.months] || 0;

  useEffect(() => {
    const error = validateCreditRequest(
      loanData.amount,
      loanData.months,
      loanData.creditTypeId,
      loanData.monthlyIncome || 0,
    );

    if (loanData.monthlyIncome) {
      const limite = loanData.monthlyIncome * 0.3;
      if (monthlyPayment > limite) {
        setValidationError(
          "A parcela mensal + encargos não pode ultrapassar 30% do rendimento.",
        );
        return;
      }
    }

    setValidationError(error);
  }, [loanData, monthlyPayment, totalEncargos]);

  const handleSliderChange =
    (field: keyof LoanData) => (_: Event, value: number | number[]) => {
      if (typeof value === "number") {
        setLoanData((prev) => ({ ...prev, [field]: value }));
      }
    };

  const handleCreditTypeChange = (value: string) => {
    const newCreditTypeId = parseInt(value);
    const newCreditType = CREDIT_TYPES.find(
      (credit) => credit.id === newCreditTypeId,
    )!;

    setLoanData({
      creditTypeId: newCreditTypeId,
      amount: newCreditType.minAmount,
      months: newCreditType.minMonths,
    });
  };

  const getMonthMarks = () => {
    return Object.keys(currentCreditType.interestRates).map((month) => ({
      value: parseInt(month),
      label: month.toString(),
    }));
  };

  return (
    <section
      id="simulacao"
      className="md:max-w-3xl mb-10 rounded-2xl h-fit min-w-sm mx-auto w-full bg-white shadow-lg overflow-hidden"
    >
      <div className="bg-primary p-6">
        <h3 className="text-2xl text-center font-bold uppercase text-white">
          Simulação de Crédito
        </h3>
      </div>

      <div className="p-10 space-y-6">
        {/* Tipo de Crédito */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Crédito
          </label>
          <Select
            value={loanData.creditTypeId.toString()}
            onValueChange={handleCreditTypeChange}
            required
          >
            <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none">
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
          <label
            htmlFor="monthlyIncome"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Rendimento Mensal (MZN) *
          </label>
          <input
            type="text"
            name="monthlyIncome"
            value={loanData.monthlyIncome || ""}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setLoanData({
                ...loanData,
                monthlyIncome: value ? Number(value) : 0,
              });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
            placeholder="Ex: 25000"
            required
          />
        </div>

        {/* Comprovativo de Colaborador Privado */}
        <div>
          <label
            htmlFor="proofDocument"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Comprovativo de Colaborador Privado *
          </label>
          <input
            type="file"
            id="proofDocument"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setLoanData({
                ...loanData,
                proofDocument: files,
              });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Aceita: PDF, JPG, PNG, DOC, DOCX (máx. 5MB)
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Seleciona vários documentos simultaneamente caso queira enviar mais
            de um comprovativo.
          </p>
        </div>

        {/* Valor do Empréstimo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Valor do Empréstimo:{" "}
            <span className="font-semibold font-sans text-primary">
              {loanData.amount.toLocaleString()} MZN
            </span>
            <span className="text-xs text-gray-500 ml-2">
              (Mín: {currentCreditType.minAmount.toLocaleString()} MZN, Máx:{" "}
              {currentCreditType.maxAmount.toLocaleString()} MZN)
            </span>
          </label>
          <Slider
            value={loanData.amount}
            onChange={handleSliderChange("amount")}
            min={currentCreditType.minAmount}
            max={currentCreditType.maxAmount}
            step={1000}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => `${v.toLocaleString()} MZN`}
            sx={{
              color: "#009FEB",
              "& .MuiSlider-thumb": {
                backgroundColor: "#FED400",
                "&:hover": {
                  boxShadow: "0 0 0 8px rgba(254, 212, 0, 0.16)",
                },
              },
              "& .MuiSlider-valueLabel": {
                backgroundColor: "#009FEB",
                color: "white",
                borderRadius: "4px",
              },
            }}
          />
        </div>

        {/* Prazo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prazo:{" "}
            <span className="font-semibold font-sans text-primary">
              {loanData.months} {loanData.months === 1 ? "Mês" : "Meses"}
            </span>
            <span className="text-xs text-gray-500 ml-2">
              (Mín: {currentCreditType.minMonths}, Máx:{" "}
              {currentCreditType.maxMonths})
            </span>
          </label>
          <Slider
            value={loanData.months}
            onChange={handleSliderChange("months")}
            min={currentCreditType.minMonths}
            max={currentCreditType.maxMonths}
            marks={getMonthMarks()}
            step={null}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => `${v} ${v === 1 ? "Mês" : "Meses"}`}
            sx={{
              color: "#009FEB",
              "& .MuiSlider-thumb": {
                backgroundColor: "#FED400",
              },
              "& .MuiSlider-markLabel": {
                fontSize: "0.75rem",
                color: "#6B7280",
              },
              "& .MuiSlider-valueLabel": {
                backgroundColor: "#009FEB",
                color: "white",
                borderRadius: "4px",
              },
            }}
          />
        </div>

        {/* Resumo */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Tipo de Crédito</p>
              <p className="font-semibold font-sans text-primary">
                {currentCreditType.name}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Valor do Empréstimo</p>
              <p className="font-semibold font-sans text-primary">
                {loanData.amount.toLocaleString()} MZN
              </p>
            </div>
            <div>
              <p className="text-gray-600">Prazo</p>
              <p className="font-semibold font-sans text-primary">
                {loanData.months} {loanData.months === 1 ? "Mês" : "Meses"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Taxa de Juros (10% por Mês)</p>
              <p className="font-semibold font-sans text-primary">
                {(interestRate * 100).toFixed(0)}%
              </p>
            </div>
            <div>
              <p className="text-gray-600">Pagamento Mensal</p>
              <p className="font-semibold font-sans text-primary">
                {monthlyPayment.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}{" "}
                MZN
              </p>
            </div>
            <div>
              <p className="text-gray-600">Encargos</p>
              <p className="font-semibold font-sans text-primary">
                {totalEncargos.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}{" "}
                MZN
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Total a Pagar</span>
              <span className="font-bold text-lg font-sans text-[#009FEB]">
                {totalPayback.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}{" "}
                MZN
              </span>
            </div>
            <div
              className={`mt-2 text-xs ${
                !loanData.monthlyIncome ||
                (loanData.monthlyIncome &&
                  monthlyPayment / loanData.monthlyIncome > 0.3)
                  ? "text-red-600"
                  : "text-green-500"
              }`}
            >
              {loanData.monthlyIncome && loanData.monthlyIncome > 0
                ? "A parcela representa " +
                  ((monthlyPayment / loanData.monthlyIncome) * 100).toFixed(2) +
                  "% do seu rendimento mensal."
                : "Selecione o seu Rendimento Mensal (MZN)"}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Parcela máxima permitida: 30% do seu rendimento mensal
            </p>
          </div>
        </div>

        {/* Botão para solicitar crédito */}
        <button
          onClick={() => setShowRequestForm(true)}
          disabled={
            !!validationError ||
            !loanData.monthlyIncome ||
            !loanData.proofDocument ||
            loanData.proofDocument.length === 0
          }
          className={`w-full ${
            !!validationError ||
            (loanData.monthlyIncome &&
              monthlyPayment / loanData.monthlyIncome > 0.3) ||
            !loanData.proofDocument ||
            loanData.proofDocument.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#009FEB] to-[#0066CC]"
          } text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98]`}
        >
          <span>Aderir ao Crédito</span>
          <FaHandshake className="text-[#FED400]" />
        </button>
      </div>

      {/* Modal de solicitação de crédito */}
      {showRequestForm && (
        <CreditRequestForm
          onClose={() => setShowRequestForm(false)}
          initialData={{
            creditTypeId: loanData.creditTypeId,
            amount: loanData.amount,
            months: loanData.months,
            monthlyPayment,
            totalPayback,
            totalEncargos,
            interestRate,
            monthlyIncome: loanData.monthlyIncome,
            proofDocument: loanData.proofDocument,
          }}
        />
      )}
    </section>
  );
};

export default Simulacao;
