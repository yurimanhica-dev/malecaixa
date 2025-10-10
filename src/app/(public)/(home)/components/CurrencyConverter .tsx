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
import { useEffect, useState } from "react";

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

  // 🔹 Permite apenas números e ponto
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9.]*$/.test(value)) {
      setAmount(value);
    }
  };

  // 🔹 Converte string para número
  const parseValue = (val: string): number => parseFloat(val) || 0;

  // 🔹 Calcula automaticamente
  const calculateConversion = () => {
    if (!amount) {
      setConvertedAmount(null);
      return;
    }

    const numericAmount = parseValue(amount);
    if (numericAmount <= 0 || isNaN(numericAmount)) {
      setConvertedAmount(null);
      return;
    }

    // MZN -> MZN
    if (fromCurrency === "MZN" && toCurrency === "MZN") {
      setConvertedAmount(numericAmount);
      return;
    }

    // MZN -> outra moeda
    if (fromCurrency === "MZN") {
      const rate = exchangeRates.find((r) => r.currency === toCurrency);
      if (rate) setConvertedAmount(numericAmount / rate.sell);
      return;
    }

    // Outra moeda -> MZN
    if (toCurrency === "MZN") {
      const rate = exchangeRates.find((r) => r.currency === fromCurrency);
      if (rate) setConvertedAmount(numericAmount * rate.buy);
      return;
    }

    // Outra moeda -> outra moeda
    const fromRate = exchangeRates.find((r) => r.currency === fromCurrency);
    const toRate = exchangeRates.find((r) => r.currency === toCurrency);

    if (fromRate && toRate) {
      const inMzn = numericAmount * fromRate.buy;
      const result = inMzn / toRate.sell;
      setConvertedAmount(result);
    }
  };

  // 🔹 Recalcula automaticamente quando amount, fromCurrency ou toCurrency mudam
  useEffect(() => {
    calculateConversion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, fromCurrency, toCurrency]);

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

      <form className="space-y-4">
        {/* Valor */}
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Digite o valor a converter"
          className="w-full p-2 rounded text-center bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-secondary font-medium"
        />

        {/* Seleção de moedas */}
        <div className="grid grid-cols-2 gap-4">
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
