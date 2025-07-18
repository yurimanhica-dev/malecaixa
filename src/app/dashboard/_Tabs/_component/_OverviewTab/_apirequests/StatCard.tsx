// components/DashboardStats.tsx
import { CreditCard, Frown, Loader, Smile } from "lucide-react";
import { FC, useEffect, useState } from "react";
import StatCard from "./StatCard";

interface CreditStats {
  total: number;
  pending: number;
  paid: number;
  overdue: number;
}

const DashboardStats: FC = () => {
  const [stats, setStats] = useState<CreditStats>({
    total: 0,
    pending: 0,
    paid: 0,
    overdue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Substitua pela sua chamada API real
        const response = await fetch("/api/credit-stats");
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "Failed to load stats");

        setStats(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="text-center py-8">Loading stats...</div>;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        {
          title: "Créditos Ativos",
          value: stats.total,
          icon: CreditCard,
          trend: stats.total > 0 ? "positive" : "neutral",
          color:
            "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800",
        },
        {
          title: "Em Andamento",
          value: stats.pending,
          icon: Loader,
          trend: "neutral",
          color:
            "bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800",
        },
        {
          title: "Liquidados",
          value: stats.paid,
          icon: Smile,
          trend: "positive",
          color:
            "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800",
        },
        {
          title: "Em Mora",
          value: stats.overdue,
          icon: Frown,
          trend: stats.overdue > 0 ? "negative" : "neutral",
          color:
            "bg-rose-100 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800",
        },
      ].map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
