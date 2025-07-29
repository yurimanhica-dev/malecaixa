"use client";

import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { FaHandshake } from "react-icons/fa";
import {
  calculateEncargos,
  calculateMonthlyPayment,
  calculateTotalPayback,
  CREDIT_TYPES,
  validateCreditRequest,
} from "../../../utils/creditCalculations";
import CreditRequestForm from "./CreditRequestForm";

interface LoanData {
  creditTypeId: number;
  amount: number;
  months: number;
}

const Simulacao = () => {
  const [loanData, setLoanData] = useState<LoanData>({
    creditTypeId: CREDIT_TYPES[0].id,
    amount: CREDIT_TYPES[0].minAmount,
    months: CREDIT_TYPES[0].minMonths,
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);

  const currentCreditType = CREDIT_TYPES.find(
    (credit) => credit.id === loanData.creditTypeId
  )!;
  const monthlyPayment = calculateMonthlyPayment(
    loanData.amount,
    loanData.months,
    loanData.creditTypeId
  );
  const totalPayback = calculateTotalPayback(
    loanData.amount,
    loanData.months,
    loanData.creditTypeId
  );

  const totalEncargos = calculateEncargos(
    loanData.amount,
    loanData.months,
    loanData.creditTypeId
  );

  const interestRate = currentCreditType.interestRates[loanData.months] || 0;

  useEffect(() => {
    // Validar sempre que os dados mudarem
    const error = validateCreditRequest(
      loanData.amount,
      loanData.months,
      loanData.creditTypeId
    );
    setValidationError(error);
  }, [loanData]);

  const handleSliderChange =
    (field: keyof LoanData) => (_: Event, value: number | number[]) => {
      if (typeof value === "number") {
        setLoanData((prev) => ({ ...prev, [field]: value }));
      }
    };

  const handleCreditTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCreditTypeId = parseInt(e.target.value);
    const newCreditType = CREDIT_TYPES.find(
      (credit) => credit.id === newCreditTypeId
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
        <h3 className="text-2xl text-center font-bold text-white">
          Simulação de Crédito
        </h3>
      </div>

      <div className="p-10 space-y-6">
        {/* Tipo de Crédito */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Crédito
          </label>
          <div className="relative w-full">
            <select
              value={loanData.creditTypeId}
              onChange={handleCreditTypeChange}
              className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all appearance-none"
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
              <p className="text-gray-600">Taxa de Juros</p>
              <p className="font-semibold font-sans text-primary">
                {(interestRate * 100).toFixed(0)}% anual
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
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Total a Pagar</span>
              <span className="font-bold text-lg font-sans text-[#009FEB]">
                {totalPayback.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}{" "}
                MZN
              </span>
            </div>
          </div>
        </div>

        {/* Botão para solicitar crédito */}
        <div>
          <button
            onClick={() => setShowRequestForm(true)}
            disabled={!!validationError}
            className={`w-full ${
              validationError
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#009FEB] to-[#0066CC]"
            } text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98]`}
          >
            <span>Aderir ao Crédito</span>
            <FaHandshake className="text-[#FED400]" />
          </button>
          {validationError && (
            <p className="mt-2 text-sm text-red-600">{validationError}</p>
          )}
        </div>
      </div>

      {/* Modal de solicitação de crédito */}
      {showRequestForm && (
        <CreditRequestForm
          onClose={() => setShowRequestForm(false)}
          initialData={{
            creditTypeId: loanData.creditTypeId,
            amount: loanData.amount,
            months: loanData.months,
          }}
        />
      )}
    </section>
  );
};

export default Simulacao;
