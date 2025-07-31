// components/DashboardStats.tsx
"use client";

import DashboardSkeleton from "@/app/(private)/components/DashboardSkeleton";
import { useAuth } from "@/app/contexts/AuthContext";
import { CreditCard, Frown, Loader, Smile } from "lucide-react";
import { Suspense } from "react";
import StatCard from "./_OverviewTab/_components/StatCard";

const DashboardStats = () => {
  const { user } = useAuth();

  if (!user?.stats) {
    return (
      <div className="p-4 text-red-500">
        <Suspense fallback={<DashboardSkeleton />}></Suspense>
      </div>
    );
  }

  const stats = user.stats;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {(
        [
          {
            title: "Créditos Ativos",
            value: stats.total,
            icon: CreditCard,
            trend: stats.total > 0 ? "positive" : "neutral",
            color: "bg-blue-500",
            iconColor: "text-blue-400",
          },
          {
            title: "Em Andamento",
            value: stats.pending,
            icon: Loader,
            trend: "neutral",
            color: "bg-amber-500",
            iconColor: "text-amber-400",
          },
          {
            title: "Liquidados",
            value: stats.paid,
            icon: Smile,
            trend: "positive",
            color: "bg-emerald-500",
            iconColor: "text-emerald-400",
          },
          {
            title: "Em Mora",
            value: stats.overdue,
            icon: Frown,
            trend: stats.overdue > 0 ? "negative" : "neutral",
            color: "bg-rose-500",
            iconColor: "text-rose-400",
          },
        ] as const
      ).map((stat, index) => (
        <StatCard
          key={index}
          {...stat}
          totalBase={stats.total || 1}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
