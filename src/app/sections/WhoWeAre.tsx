"use client";

import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { FaFileAlt, FaSpinner } from "react-icons/fa";

interface LoanData {
  name: string;
  amount: number;
  months: number;
  interestRate: number;
}

export default function LoanSection() {
  const [loanData, setLoanData] = useState<LoanData>({
    name: "Empréstimo MALEcaixa",
    amount: 60000,
    months: 12,
    interestRate: 0.25,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState("");

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "", // "success" ou "error"
  });

  const { name, amount, months, interestRate } = loanData;
  const monthlyPayment = ((amount * (1 + interestRate)) / months).toFixed(0);
  const totalPayback = (amount * (1 + interestRate)).toFixed(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoanData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleSliderChange =
    (field: keyof LoanData) => (_: Event, value: number | number[]) => {
      if (typeof value === "number") {
        setLoanData((prev) => ({ ...prev, [field]: value }));
      }
    };

  const gerarRelatorio = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/relatorio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loanData),
      });

      if (!response.ok) throw new Error("Erro ao gerar o relatório.");

      if (response.headers.get("content-type")?.includes("application/pdf")) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `MaleCaixa_Simulacao_${name.replace(/\s+/g, "_")}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        window.alert("Relatório gerado com sucesso!");
      }
    } catch (error) {
      window.alert("Erro ao gerar o plano. Tente novamente.");
      console.error(error);
    } finally {
      setIsLoading(false);
      setLoanData({
        name: "Empréstimo MALEcaixa",
        amount: 5000,
        months: 1,
        interestRate: 0.25,
      });
    }
  };

  return (
    <section className="bg-gray-50 py-10 pb-30 c-space min-w-fit">
      <div className="container mx-auto flex flex-col lg:flex-row justify-center gap-6 lg:gap-12">
        {/* Informações */}
        <div>
          <div className="flex flex-col lg:items-start items-center">
            <span className="inline-block text-primary mb-4 px-4 py-1 text-sm border border-gray-300 rounded-full font-medium uppercase tracking-wider">
              QUEM SOMOS
            </span>
          </div>
          <h2 className="text-4xl text-center lg:text-start font-bold lg:max-w-xl text-gray-800 mb-6 leading-tight">
            Somos uma empresa pertecente a MALE{""}
            <span className="text-holding">group</span>, oferecemos empréstimos{" "}
            <span className="text-primary">Personalizados</span>,{""}{" "}
            <span className="text-secondary">Flexíveis</span> e{" "}
            <span className="text-primary">Rápidos</span>.
          </h2>
          <p className="text-lg text-gray-800 mb-8 text-center lg:text-start max-w-2xl">
            Obtenha o financiamento ideal com taxas acessíveis, aprovação rápida
            e planos personalizados. Connosco o crescimento do seu negócio está
            ao seu alcance.
          </p>
          <h3 className="text-xl font-semibold text-center lg:text-start text-gray-800 mb-4">
            Por que escolher a MALECaixa?
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:grid-cols-1 text-sm text-gray-800 mb-10">
            <li>✓ Dados seguros e protegidos;</li>
            <li>✓ Apoio em cada etapa;</li>
            <li>✓ Consulta da sua situação financeira em tempo real;</li>
            <li>✓ Taxas competitivas e acessíveis;</li>
            <li>✓ Planos flexíveis e adaptáveis;</li>
            <li className="md:text-nowrap">
              ✓ Processo de aprovação simplificado;
            </li>
          </ul>
        </div>

        {/* Simulador */}
        <div className="lg:max-w-lg min-w-sm mx-auto w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {/* Cabeçalho com gradiente */}
          <div className="bg-gradient-to-r from-secondary to-secondary/80 p-6">
            <h3 className="text-xl text-center font-semibold text-white">
              Simule o seu crédito
            </h3>
          </div>

          <div className="p-10 space-y-6">
            {/* Nome com validação */}
            <div>
              {alert.show && (
                <div
                  className={`p-3 mb-4 rounded-lg text-sm ${
                    alert.type === "success"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {alert.message}
                </div>
              )}
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nome do Cliente
                </label>
                {nameError && (
                  <span className="text-xs text-red-500">{nameError}</span>
                )}
              </div>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={handleInputChange}
                onBlur={() => {
                  if (!name.trim()) setNameError("Por favor, insira o nome");
                  else setNameError("");
                }}
                className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all ${
                  nameError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Digite o nome completo"
              />
            </div>

            {/* Valor do Empréstimo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor do Empréstimo:{" "}
                <span className="font-semibold text-primary">
                  {amount.toLocaleString()} MZN
                </span>
              </label>
              <Slider
                value={amount}
                onChange={handleSliderChange("amount")}
                min={5000}
                max={100000}
                step={500}
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
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>10.000 MZN</span>
                <span>100.000 MZN</span>
              </div>
            </div>

            {/* Prazo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prazo:{" "}
                <span className="font-semibold text-primary">
                  {months} {months === 1 ? "Mês" : "Meses"}
                </span>
              </label>
              <Slider
                value={months}
                onChange={handleSliderChange("months")}
                min={1}
                max={12}
                marks={[
                  { value: 1, label: "1" },
                  { value: 6, label: "6" },
                  { value: 12, label: "12" },
                ]}
                step={1}
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
                  <p className="text-gray-600">Valor do Empréstimo</p>
                  <p className="font-semibold text-primary">
                    {amount.toLocaleString()} MZN
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Prazo</p>
                  <p className="font-semibold text-primary">
                    {months} {months === 1 ? "Mês" : "Meses"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Taxa de Juros</p>
                  <p className="font-semibold text-primary">
                    {interestRate}% anual
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Pagamento Mensal</p>
                  <p className="font-semibold text-primary">
                    {parseInt(monthlyPayment).toLocaleString()} MZN
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">
                    Total a Pagar
                  </span>
                  <span className="font-bold text-lg text-[#009FEB]">
                    {parseInt(totalPayback).toLocaleString()} MZN
                  </span>
                </div>
              </div>
            </div>

            {/* Botão com feedback */}
            <div className="space-y-2">
              <button
                onClick={gerarRelatorio}
                disabled={isLoading}
                className={`w-full ${
                  isLoading
                    ? "bg-primary/80 cursor-wait"
                    : "bg-gradient-to-r from-[#009FEB] to-[#0066CC]"
                } text-white py-3 rounded-lg font-semibold flex items-center cursor-pointer justify-center space-x-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98]`}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Gerando...</span>
                  </>
                ) : (
                  <>
                    <span>Gerar Plano de Amortização</span>
                    <FaFileAlt className="text-[#FED400]" />
                  </>
                )}
              </button>

              {/* Mensagem de alerta */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
