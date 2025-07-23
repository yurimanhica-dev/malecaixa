import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { FaFileAlt, FaSpinner } from "react-icons/fa";

interface LoanData {
  name: string;
  amount: number;
  months: number;
  interestRate: number;
}

const Simulacao = () => {
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
      if (response.ok) {
        setLoanData({
          name: "Empréstimo MALEcaixa",
          amount: 5000,
          months: 1,
          interestRate: 0.25,
        });
      }
      if (response.headers.get("content-type")?.includes("application/pdf")) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        window.open(url, "_blank");
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
    }
  };

  return (
    <div className="md:max-w-3xl mb-10 rounded-2xl h-fit min-w-sm mx-auto w-full bg-white shadow-lg overflow-hidden">
      {/* Cabeçalho com gradiente */}
      <div className="bg-primary p-6">
        <h3 className="text-2xl text-center font-bold text-white">
          Simulação de Crédito
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
            <span className="font-semibold font-sans text-primary">
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
          <div className="flex font-sans justify-between text-xs text-gray-500 mt-1">
            <span>10.000 MZN</span>
            <span>100.000 MZN</span>
          </div>
        </div>

        {/* Prazo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prazo:{" "}
            <span className="font-semibold font-sans text-primary">
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
              <p className="font-semibold font-sans text-primary">
                {amount.toLocaleString()} MZN
              </p>
            </div>
            <div>
              <p className="text-gray-600">Prazo</p>
              <p className="font-semibold font-sans text-primary">
                {months} {months === 1 ? "Mês" : "Meses"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Taxa de Juros</p>
              <p className="font-semibold font-sans text-primary">
                {interestRate}% anual
              </p>
            </div>
            <div>
              <p className="text-gray-600">Pagamento Mensal</p>
              <p className="font-semibold font-sans text-primary">
                {parseInt(monthlyPayment).toLocaleString()} MZN
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Total a Pagar</span>
              <span className="font-bold text-lg font-sans text-[#009FEB]">
                {parseInt(totalPayback).toLocaleString()} MZN
              </span>
            </div>
          </div>
        </div>

        {/* Botão com feedback */}
        <div>
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
  );
};

export default Simulacao;
