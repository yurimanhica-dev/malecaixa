import { FC } from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
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
      ? "bg-emerald-500"
      : trend === "negative"
      ? "bg-rose-500"
      : "bg-amber-500";

  return (
    <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${trendColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default StatCard;
