import "flag-icons/css/flag-icons.min.css";
import { useEffect, useState } from "react";

const CambioCard = () => {
  const [exchangeRates, setExchangeRates] = useState<
    { currency: string; buy: number; sell: number; flag: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://open.er-api.com/v6/latest/MZN");
        const data = await response.json();

        if (data.result === "success") {
          setExchangeRates([
            {
              currency: "USD",
              buy: Number(((1 / data.rates.USD) * 0.98).toFixed(2)),
              sell: Number(((1 / data.rates.USD) * 1.02).toFixed(2)),
              flag: "us",
            },
            {
              currency: "EUR",
              buy: Number(((1 / data.rates.EUR) * 0.98).toFixed(2)),
              sell: Number(((1 / data.rates.EUR) * 1.02).toFixed(2)),
              flag: "eu",
            },
            {
              currency: "ZAR",
              buy: Number(((1 / data.rates.ZAR) * 0.98).toFixed(2)),
              sell: Number(((1 / data.rates.ZAR) * 1.02).toFixed(2)),
              flag: "za",
            },
            {
              currency: "GBP",
              buy: Number(((1 / data.rates.GBP) * 0.98).toFixed(2)),
              sell: Number(((1 / data.rates.GBP) * 1.02).toFixed(2)),
              flag: "gb",
            },
            {
              currency: "BRL",
              buy: Number(((1 / data.rates.BRL) * 0.98).toFixed(2)),
              sell: Number(((1 / data.rates.BRL) * 1.02).toFixed(2)),
              flag: "br",
            },
          ]);
        } else {
          console.error("API returned error:", data);
        }
      } catch (error) {
        console.error("Error fetching rates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  return (
    <div className="bg-gradient-to-b from-primary/20 to-primary/10 p-4 rounded-lg border border-primary/30">
      <h3 className="text-lg font-semibold mb-3 text-center text-primary">
        Câmbio do Dia
      </h3>

      {loading ? (
        <div className="flex justify-center items-center py-6">
          <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></span>
          <span className="ml-3 text-gray-300 text-sm">Carregando...</span>
        </div>
      ) : (
        <div className="space-y-3">
          {exchangeRates.map((rate) => (
            <div
              key={rate.currency}
              className="flex justify-between items-center text-sm"
            >
              <div className="flex items-center gap-2">
                <span className={`fi fi-${rate.flag} rounded-sm`} />
                <span className="text-white font-medium">{rate.currency}</span>
              </div>

              <div className="gap-4 grid grid-cols-2 text-start">
                <span className="text-green-400 min-w-[120px]">
                  Compra: {rate.buy.toFixed(2)} MT
                </span>
                <span className="text-red-400 min-w-[120px]">
                  Venda: {rate.sell.toFixed(2)} MT
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && (
        <p className="text-xs text-gray-400 mt-3 text-center">
          Atualizado: {new Date().toLocaleDateString("pt-MZ")}
        </p>
      )}
    </div>
  );
};

export default CambioCard;
