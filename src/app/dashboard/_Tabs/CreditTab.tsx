import { FC } from "react";

interface CreditInfo {
  availableLimit: number;
  usedLimit: number;
  score: number;
  lastUpdate: string;
}

interface Props {
  creditInfo: CreditInfo;
}

const CreditTab: FC<Props> = ({ creditInfo }) => {
  const usedPercentage =
    (creditInfo.usedLimit / creditInfo.availableLimit) * 100;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="font-semibold text-sm mb-4">Limite de Crédito</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Utilizado</span>
              <span>
                R${" "}
                {creditInfo.usedLimit.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-gradient h-2 rounded-full"
                style={{ width: `${usedPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>Disponível</span>
              <span>
                R${" "}
                {(
                  creditInfo.availableLimit - creditInfo.usedLimit
                ).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
          <div className="pt-4 border-t">
            <p className="text-xs text-gray-500">
              Limite total: R${" "}
              {creditInfo.availableLimit.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="font-semibold text-sm mb-4">Score de Crédito</h2>
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e6e6e6"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeDasharray={`${(creditInfo.score / 1000) * 100}, 100`}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#009FEB" />
                  <stop offset="100%" stopColor="#FED400" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <span className="text-xl font-bold">{creditInfo.score}</span>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-gray-500 mt-2">
          Atualizado em {creditInfo.lastUpdate}
        </p>
      </div>
    </div>
  );
};

export default CreditTab;
