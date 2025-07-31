import { Loader } from "lucide-react";
import { FC, Suspense } from "react";
import DashboardSkeleton from "../../components/DashboardSkeleton";
import FinancialSummary from "./_component/_OverviewTab/_components/FinancialSummary";
import DashboardStats from "./_component/DashboardStats";
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

const AccountsTab: FC<Props> = ({ loading = false }) => {
  // Cálculo de estatísticas
  // const stats = {
  //   total: accounts.length,
  //   pending: accounts.filter((a) => a.status === "pending").length,
  //   paid: accounts.filter((a) => a.status === "paid").length,
  //   overdue: accounts.filter((a) => a.status === "overdue").length,
  //   totalApproved: accounts.reduce((sum, acc) => sum + acc.approvedAmount, 0),
  //   totalPaid: accounts.reduce((sum, acc) => sum + acc.paidAmount, 0),
  //   totalRemaining: accounts.reduce(
  //     (sum, acc) => sum + acc.remainingBalance,
  //     0
  //   ),
  //   totalLateFees: accounts.reduce((sum, acc) => sum + (acc.lateFee || 0), 0),
  // };

  // Status visual configuration

  // const statusConfig = {
  //   paid: {
  //     color: "bg-emerald-300 text-emerald-800",
  //     icon: CheckCircle,
  //     label: "Quitado",
  //   },
  //   pending: {
  //     color: "bg-amber-300 text-amber-800",
  //     icon: Clock,
  //     label: "Em Andamento",
  //   },
  //   overdue: {
  //     color: "bg-rose-300 text-rose-800",
  //     icon: AlertCircle,
  //     label: "Em Mora",
  //   },
  // };

  return (
    <div className="space-y-6 overflow-hidden lg:ml-8">
      <Suspense fallback={<DashboardSkeleton />}>
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
            <DashboardStats />

            {/* Financial Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FinancialSummary />
              {/* 
            // Progress Visualization 
            <CreditDistribution
              total={stats.total}
              paid={stats.paid}
              pending={stats.pending}
              overdue={stats.overdue}
            />
            */}

              {/*
          // Accounts List 
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
            )}
              */}
            </div>
          </>
        )}
      </Suspense>
    </div>
  );
};

export default AccountsTab;
