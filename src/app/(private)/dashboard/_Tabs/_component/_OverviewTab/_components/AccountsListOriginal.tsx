/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import DashboardSkeleton from "@/app/(private)/components/DashboardSkeleton";
import { useAuth } from "@/app/contexts/AuthContext";
import { formatMZN } from "@/app/lib/utils";
import {
  AlertCircle,
  AlertTriangle,
  Banknote,
  CheckCircle,
  ChevronRight,
  Clock,
  Percent,
  TrendingUp,
} from "lucide-react";
import { Suspense } from "react";

const AccountsList = () => {
  const { user } = useAuth();

  if (!user?.detalhesConta) {
    return (
      <div className="p-4 text-red-500">
        <Suspense fallback={<DashboardSkeleton />}></Suspense>
      </div>
    );
  }

  // Status configuration with improved icons and colors
  const statusConfig = {
    paid: {
      icon: CheckCircle,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      label: "Quitado",
    },
    pending: {
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      label: "Andamento",
    },
    overdue: {
      icon: AlertTriangle,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
      label: "Em Mora",
    },
  };

  // Extract accounts from user details
  const accounts = user.contas || [];
  if (accounts.length === 0) {
    return (
      <div className="p-4 text-gray-500">
        <Suspense fallback={<DashboardSkeleton />}></Suspense>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800 transition-all hover:shadow-md">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
            <Banknote className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
              Meus Créditos
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {user.stats.total} crédito{user.stats.total !== 1 ? "s" : ""}{" "}
              registado
              {user.stats.total !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2">
          <StatusBadge
            count={user.stats.paid}
            variant="success"
            icon={CheckCircle}
          />
          <StatusBadge
            count={user.stats.pending}
            variant="warning"
            icon={Clock}
          />
          <StatusBadge
            count={user.stats.overdue}
            variant="danger"
            icon={AlertTriangle}
          />
        </div>
      </div>

      {/* Accounts List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {accounts.map((account) => {
          const status = statusConfig.pending;
          const progress = Math.min(
            100,
            Math.round(
              (user.detalhesConta.principalPago /
                user.detalhesConta.montanteAprovado) *
                100
            )
          );

          return (
            <article
              key={user.detalhesConta.id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/60 cursor-pointer transition-colors group"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Account Info */}
                <div className="flex-1 flex gap-4 min-w-0">
                  <div
                    className={`p-2.5 rounded-lg ${status.bgColor} ${status.color}`}
                  >
                    <status.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    {/* <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 truncate">
                      {user.detalhesConta.loanPurpose}
                    </h3> */}
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                      {/* <DetailItem
                        icon={Calendar}
                        text={formatDate(user.detalhesConta.requestDate)}
                      /> */}
                      <DetailItem
                        icon={Percent}
                        text={`${user.detalhesConta.jurosPagos}% a.m.`}
                      />
                      <DetailItem
                        icon={TrendingUp}
                        text={formatMZN(user.detalhesConta.montanteAprovado)}
                      />
                    </div>
                  </div>
                </div>

                {/* Progress and Financial Info */}
                <div className="md:w-72 flex flex-col justify-between">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        Progresso do pagamento
                      </span>
                      <span className="text-xs font-semibold dark:text-gray-200">
                        {progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${status.color.replace(
                          "text",
                          "bg"
                        )}`}
                        style={{ width: `${progress}%` }}
                        aria-label={`${progress}% pago`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FinancialInfo
                      label="Prestação mensal"
                      value={formatMZN(user.detalhesConta.mensalidade)}
                    />
                    <FinancialInfo
                      label="Saldo restante"
                      value={formatMZN(user.detalhesConta.saldoRestante)}
                      align="right"
                    />
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-end md:pl-2">
                  <button
                    className="p-1 text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Ver detalhes"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Late Fee Warning */}
              {user.detalhesConta.taxaMora &&
                user.detalhesConta.taxaMora > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <span className="text-xs font-medium text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4" />
                      Multa por atraso
                    </span>
                    <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                      +{formatMZN(user.detalhesConta.taxaMora)}
                    </span>
                  </div>
                )}
            </article>
          );
        })}
      </div>
    </div>
  );
};

// Improved StatusBadge component
const StatusBadge = ({
  count,
  variant,
  icon: Icon,
}: {
  count: number;
  variant: "success" | "warning" | "danger";
  icon: React.ComponentType<{ className?: string }>;
}) => {
  const variantClasses = {
    success: {
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      text: "text-emerald-800 dark:text-emerald-200",
      dot: "bg-emerald-500",
    },
    warning: {
      bg: "bg-amber-100 dark:bg-amber-900/30",
      text: "text-amber-800 dark:text-amber-200",
      dot: "bg-amber-500",
    },
    danger: {
      bg: "bg-rose-100 dark:bg-rose-900/30",
      text: "text-rose-800 dark:text-rose-200",
      dot: "bg-rose-500",
    },
  };

  const { bg, text, dot } = variantClasses[variant];

  return (
    <div
      className={`text-xs ${bg} ${text} px-3 py-1.5 rounded-full flex items-center gap-2`}
    >
      <span className={`w-2 h-2 rounded-full ${dot}`} />
      <Icon className="h-3.5 w-3.5" />
      <span>{count}</span>
    </div>
  );
};

// DetailItem component
const DetailItem = ({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}) => (
  <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
    <Icon className="h-3.5 w-3.5 mr-1.5 opacity-80" />
    {text}
  </span>
);

// FinancialInfo component
const FinancialInfo = ({
  label,
  value,
  align = "left",
}: {
  label: string;
  value: string;
  align?: "left" | "right";
}) => (
  <div className={align === "right" ? "text-right" : ""}>
    <p className="text-xs text-gray-600 dark:text-gray-400 mb-0.5">{label}</p>
    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
      {value}
    </p>
  </div>
);

export default AccountsList;
