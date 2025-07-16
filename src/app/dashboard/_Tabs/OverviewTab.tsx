import { formatMZN } from "@/app/lib/utils";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  CreditCard,
  Frown,
  Loader,
  Smile,
} from "lucide-react";
import { FC } from "react";
import AccountsList from "./_component/_OverviewTab/AccountsList";
import CreditDistribution from "./_component/_OverviewTab/CreditDistribution";
import FinancialSummary from "./_component/_OverviewTab/FinancialSummary";
import StatCard from "./_component/_OverviewTab/StatCard";
import TabsHeader from "./_component/TabsHeader";

interface Account {
  id: number;
  accountNumber: string;
  loanPurpose: string;
  requestDate: string;
  approvedAmount: number;
  paidAmount: number;
  remainingBalance: number;
  interestRate: number;
  monthlyPayment: number;
  principalPaid: number;
  interestPaid: number;
  dueDate: string;
  paymentFrequency: string;
  status?: string;
  lateFee?: number;
  accountManager: string;
}

interface Props {
  accounts: Account[];
  onViewAccount: (id: number) => void;
  loading?: boolean;
}

const AccountsTab: FC<Props> = ({
  accounts,
  onViewAccount,
  loading = false,
}) => {
  // Cálculo de estatísticas
  const stats = {
    total: accounts.length,
    pending: accounts.filter((a) => a.status === "pending").length,
    paid: accounts.filter((a) => a.status === "paid").length,
    overdue: accounts.filter((a) => a.status === "overdue").length,
    totalApproved: accounts.reduce((sum, acc) => sum + acc.approvedAmount, 0),
    totalPaid: accounts.reduce((sum, acc) => sum + acc.paidAmount, 0),
    totalRemaining: accounts.reduce(
      (sum, acc) => sum + acc.remainingBalance,
      0
    ),
    totalLateFees: accounts.reduce((sum, acc) => sum + (acc.lateFee || 0), 0),
  };

  // Status visual configuration
  const statusConfig = {
    paid: {
      color: "bg-emerald-300 text-emerald-800",
      icon: CheckCircle,
      label: "Quitado",
    },
    pending: {
      color: "bg-amber-300 text-amber-800",
      icon: Clock,
      label: "Em Andamento",
    },
    overdue: {
      color: "bg-rose-300 text-rose-800",
      icon: AlertCircle,
      label: "Em Mora",
    },
  };

  return (
    <div className="space-y-6 overflow-hidden ml-8">
      <TabsHeader
        title="Visão Geral"
        description="📊 Monitorize e administre a sua carteira de créditos de forma eficiente"
        breadcrumb={["MALEcaixa", "Visão Geral"]}
      />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-primary h-8 w-8" />
        </div>
      ) : (
        <>
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {(
              [
                {
                  title: "Créditos Ativos",
                  value: stats.total,
                  icon: CreditCard,
                  trend: stats.total > 0 ? "positive" : "neutral",
                  color:
                    "bg-blue-100 dark:bg-blue-500 text-blue-600 dark:text-blue-300",
                  iconColor: "text-blue-500 dark:text-blue-400", // Nova prop
                },
                {
                  title: "Em Andamento",
                  value: stats.pending,
                  icon: Loader,
                  trend: "neutral",
                  color:
                    "bg-amber-100 dark:bg-amber-500 text-amber-600 dark:text-amber-300",
                  iconColor: "text-amber-500 dark:text-amber-400",
                },
                {
                  title: "Liquidados",
                  value: stats.paid,
                  icon: Smile,
                  trend: "positive",
                  color:
                    "bg-emerald-100 dark:bg-emerald-500 text-emerald-600 dark:text-emerald-300",
                  iconColor: "text-emerald-500 dark:text-emerald-400",
                },
                {
                  title: "Em Mora",
                  value: stats.overdue,
                  icon: Frown,
                  trend: stats.overdue > 0 ? "negative" : "neutral",
                  color:
                    "bg-rose-100 dark:bg-rose-500 text-rose-600 dark:text-rose-300",
                  iconColor: "text-rose-500 dark:text-rose-400",
                },
              ] as const
            ).map((stat, index) => (
              <StatCard key={index} {...stat} totalBase={stats.total} />
            ))}
          </div>

          {/* Financial Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FinancialSummary
              totalApproved={stats.totalApproved}
              totalPaid={stats.totalPaid}
              totalRemaining={stats.totalRemaining}
              totalLateFees={stats.totalLateFees}
              formatMZN={formatMZN}
            />

            {/* Progress Visualization */}
            <CreditDistribution
              total={stats.total}
              paid={stats.paid}
              pending={stats.pending}
              overdue={stats.overdue}
            />
          </div>

          {/* Accounts List */}
          <AccountsList
            accounts={accounts}
            stats={{
              paid: stats.paid,
              pending: stats.pending,
              overdue: stats.overdue,
            }}
            onViewAccount={onViewAccount}
            statusConfig={statusConfig}
          />
        </>
      )}
    </div>
  );
};

export default AccountsTab;
