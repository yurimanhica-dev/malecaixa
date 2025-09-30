"use client";

import { formatNumber } from "@/app/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface CurrencyConverterProps {
  exchangeRates: {
    currency: string;
    buy: number;
    sell: number;
    flag: string;
  }[];
}

const CurrencyConverter = ({ exchangeRates }: CurrencyConverterProps) => {
  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("MZN");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  // Função para formatar o valor enquanto digita
  const formatInputValue = (value: string): string => {
    // Remove tudo que não é número ou ponto decimal
    const numericValue = value.replace(/[^\d.]/g, "");

    // Se estiver vazio, retorna vazio
    if (!numericValue) return "";

    // Divide em parte inteira e decimal
    const parts = numericValue.split(".");
    let integerPart = parts[0];
    let decimalPart = parts[1] || "";

    // Limita a parte decimal a 2 dígitos
    if (decimalPart.length > 2) {
      decimalPart = decimalPart.substring(0, 2);
    }

    // Formata a parte inteira com separadores de milhar
    if (integerPart) {
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Retorna o valor formatado
    return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
  };

  // Função para converter o valor formatado de volta para número
  const parseFormattedValue = (formattedValue: string): number => {
    return parseFloat(formattedValue.replace(/,/g, ""));
  };

  const calculateConversion = () => {
    if (!amount) {
      setConvertedAmount(null);
      return;
    }

    const numericAmount = parseFormattedValue(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setConvertedAmount(null);
      return;
    }

    if (fromCurrency === "MZN" && toCurrency === "MZN") {
      setConvertedAmount(numericAmount);
      return;
    }

    if (fromCurrency === "MZN") {
      const rate = exchangeRates.find((rate) => rate.currency === toCurrency);
      if (rate) {
        const result = numericAmount / rate.sell;
        setConvertedAmount(result);
      }
    } else if (toCurrency === "MZN") {
      const rate = exchangeRates.find((rate) => rate.currency === fromCurrency);
      if (rate) {
        const result = numericAmount * rate.buy;
        setConvertedAmount(result);
      }
    } else {
      const fromRate = exchangeRates.find(
        (rate) => rate.currency === fromCurrency
      );
      const toRate = exchangeRates.find((rate) => rate.currency === toCurrency);

      if (fromRate && toRate) {
        const inMzn = numericAmount * fromRate.buy;
        const result = inMzn / toRate.sell;
        setConvertedAmount(result);
      }
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Permite apenas números, ponto e vírgula (para formatação)
    if (value === "" || /^[\d,.]*$/.test(value)) {
      // Formata o valor enquanto digita
      const formattedValue = formatInputValue(value);
      setAmount(formattedValue);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateConversion();
  };

  const resetConverter = () => {
    setAmount("");
    setConvertedAmount(null);
  };

  const getFlagClass = (currency: string) => {
    if (currency === "MZN") return "fi fi-mz";
    const rate = exchangeRates.find((rate) => rate.currency === currency);
    return rate ? `fi fi-${rate.flag}` : "";
  };

  return (
    <div className="bg-gradient-to-b from-secondary/20 to-secondary/10 p-4 rounded-lg border border-secondary/30 mt-4">
      <h3 className="text-lg font-semibold mb-3 text-center text-primary">
        Conversor de Moedas
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Valor */}
        <div>
          {/* <label className="block text-sm text-gray-300 mb-2">
            Digite o valor a converter:
          </label> */}
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder=" Digite o valor a converter:"
            className="w-full p-2 rounded text-center bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-secondary font-medium"
          />
        </div>

        {/* Moedas */}
        <div className="grid grid-cols-2 gap-4">
          {/* FROM */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">De:</label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="w-full bg-white/10 border border-gray-600 text-white">
                <SelectValue placeholder="Selecione a moeda" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white">
                <SelectGroup>
                  <SelectItem value="MZN">
                    <span className="flex items-center gap-2">
                      <span className="fi fi-mz rounded-sm" />
                      MZN
                    </span>
                  </SelectItem>
                  {exchangeRates.map((rate) => (
                    <SelectItem key={rate.currency} value={rate.currency}>
                      <span className="flex items-center gap-2">
                        <span className={`fi fi-${rate.flag} rounded-sm`} />
                        {rate.currency}
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* TO */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Para:</label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="w-full bg-white/10 border border-gray-600 text-white">
                <SelectValue placeholder="Selecione a moeda" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white">
                <SelectGroup>
                  <SelectItem value="MZN">
                    <span className="flex items-center gap-2">
                      <span className="fi fi-mz rounded-sm" />
                      MZN
                    </span>
                  </SelectItem>
                  {exchangeRates.map((rate) => (
                    <SelectItem key={rate.currency} value={rate.currency}>
                      <span className="flex items-center gap-2">
                        <span className={`fi fi-${rate.flag} rounded-sm`} />
                        {rate.currency}
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!amount}
            className={`flex-1 py-2 px-4 rounded transition-colors
              ${
                !amount
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-primary hover:bg-primary/80 text-white cursor-pointer"
              }`}
          >
            Calcular
          </button>

          <button
            type="button"
            onClick={resetConverter}
            className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded transition-colors"
          >
            Limpar
          </button>
        </div>
      </form>

      {/* Resultado */}
      {convertedAmount !== null && (
        <div className="mt-4 p-3 bg-white/5 rounded border border-white/10">
          <div className="text-center">
            <p className="text-gray-300 text-sm">
              {amount} {fromCurrency} =
            </p>
            <p className="text-2xl font-bold text-secondary mt-1">
              {formatNumber(convertedAmount)} {toCurrency}
            </p>
            <div className="flex justify-center items-center gap-2 mt-2">
              <span className={`${getFlagClass(fromCurrency)} rounded-sm`} />
              <span className="text-gray-400">→</span>
              <span className={`${getFlagClass(toCurrency)} rounded-sm`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
