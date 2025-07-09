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
import TabsHeader from "./_component/TabsHeader";
import AccountsList from "./_component/_OverviewTab/AccountsList";
import CreditDistribution from "./_component/_OverviewTab/CreditDistribution";
import FinancialSummary from "./_component/_OverviewTab/FinancialSummary";
import StatCard from "./_component/_OverviewTab/StatCard";

interface Account {
  id: number;
  loanPurpose: string;
  requestDate: string;
  approvedAmount: number;
  paidAmount: number;
  remainingBalance: number;
  interestRate: number;
  monthlyPayment: number;
  dueDate: string;
  status: string;
  lateFee?: number;
  progress?: number;
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
      color: "bg-emerald-100 text-emerald-800",
      icon: CheckCircle,
      label: "Quitado",
    },
    pending: {
      color: "bg-amber-100 text-amber-800",
      icon: Clock,
      label: "Em Andamento",
    },
    overdue: {
      color: "bg-rose-100 text-rose-800",
      icon: AlertCircle,
      label: "Em Mora",
    },
  };

  return (
    <div className="space-y-6">
      <TabsHeader
        title="Gestão de Créditos"
        description="Monitorize e administre a sua carteira de créditos de forma eficiente"
        breadcrumb={["MALEcaixa", "Créditos"]}
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
                  color: "bg-blue-50 text-blue-600",
                },
                {
                  title: "Em Andamento",
                  value: stats.pending,
                  icon: Loader,
                  trend: "neutral",
                  color: "bg-amber-50 text-amber-600",
                },
                {
                  title: "Liquidados",
                  value: stats.paid,
                  icon: Smile,
                  trend: "positive",
                  color: "bg-emerald-50 text-emerald-600",
                },
                {
                  title: "Em Mora",
                  value: stats.overdue,
                  icon: Frown,
                  trend: stats.overdue > 0 ? "negative" : "neutral",
                  color: "bg-rose-50 text-rose-600",
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
