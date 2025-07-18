import {
  AlertTriangle,
  DollarSign,
  PieChart,
  TrendingUp,
  Zap,
} from "lucide-react";
import { FC } from "react";

interface FinancialSummaryProps {
  totalApproved: number;
  totalPaid: number;
  totalRemaining: number;
  totalLateFees: number;
  formatMZN: (value: number) => string;
}

const FinancialSummary: FC<FinancialSummaryProps> = ({
  totalApproved,
  totalPaid,
  totalRemaining,
  totalLateFees,
  formatMZN,
}) => {
  const items = [
    {
      label: "Total Aprovado",
      value: totalApproved,
      icon: TrendingUp,
      color: "text-purple-500",
    },
    {
      label: "Total Pago",
      value: totalPaid,
      icon: DollarSign,
      color: "text-emerald-500",
    },
    {
      label: "Saldo Pendente",
      value: totalRemaining,
      icon: AlertTriangle,
      color: "text-amber-500",
    },
  ] as const;

  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-xs border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-700 dark:text-gray-300">
          Resumo Financeiro
        </h3>
        <PieChart className="h-5 w-5 text-secondary dark:text-secondary-400" />
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex md:flex-col items-start lg:items-center lg:flex-row justify-between"
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${item.color.replace(
                  "text",
                  "bg"
                )} bg-opacity-10 dark:bg-opacity-20`}
              >
                <item.icon className="h-4 w-4 dark:text-gray-300" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {item.label}
              </span>
            </div>
            <span className="text-sm font-semibold mt-1 dark:text-gray-200">
              {formatMZN(item.value)}
            </span>
          </div>
        ))}

        {totalLateFees > 0 && (
          <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-700 flex md:flex-col items-start lg:items-center lg:flex-row justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-rose-100 dark:bg-rose-900 dark:bg-opacity-30 p-2 rounded-lg text-rose-500 dark:text-rose-400">
                <Zap className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Multas Pendentes
              </span>
            </div>
            <span className="text-sm font-semibold text-rose-500 dark:text-rose-400 mt-1">
              +{formatMZN(totalLateFees)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialSummary;
