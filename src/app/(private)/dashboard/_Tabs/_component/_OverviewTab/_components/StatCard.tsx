import { FC } from "react";
import { IconType } from "react-icons";
interface StatCardProps {
  title: string;
  value: number;
  icon: IconType;
  trend: "positive" | "negative" | "neutral";
  color: string;
  totalBase: number;
}

const StatCard: FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color,
  totalBase,
}) => {
  const percentage = (value / Math.max(1, totalBase)) * 100;
  const trendColor =
    trend === "positive"
      ? "bg-emerald-800 dark:bg-emerald-800"
      : trend === "negative"
      ? "bg-rose-800 dark:bg-rose-500"
      : "bg-amber-800 dark:bg-amber-500";

  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-xs border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
            {title}
          </p>
          <h3 className="text-2xl font-bold mt-1 dark:text-white">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color} `}>
          <Icon className={`h-5 w-5 text-white`} />
        </div>
      </div>
      <div className="mt-3 h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${trendColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default StatCard;
