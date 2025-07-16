import { formatDate, formatMZN } from "@/app/lib/utils";

import {
  AlertCircle,
  Banknote,
  Calendar,
  ChevronRight,
  Percent,
  TrendingUp,
} from "lucide-react";
import { FC } from "react";

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

interface AccountsListProps {
  accounts: Account[];
  stats: {
    paid: number;
    pending: number;
    overdue: number;
  };
  onViewAccount: (id: number) => void;
  statusConfig: {
    [key: string]: {
      color: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      icon: any;
      label: string;
    };
  };
}

const AccountsList: FC<AccountsListProps> = ({
  accounts,
  stats,
  onViewAccount,
  statusConfig,
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800">
      <div className="p-5 gap-2 border-b border-gray-200 dark:border-gray-800 flex flex-col justify-between items-start md:flex-row md:items-center">
        <div className="">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Banknote className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            Meus Créditos
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {accounts.length} crédito{accounts.length !== 1 ? "s" : ""}{" "}
            registado{accounts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge color="emerald" count={stats.paid} label="Quitado" />
          <StatusBadge color="amber" count={stats.pending} label="Andamento" />
          <StatusBadge color="rose" count={stats.overdue} label="em Mora" />
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {accounts.map((account) => {
          const status = statusConfig[account?.status ?? ""];
          const progress = Math.min(
            100,
            Math.round((account.paidAmount / account.approvedAmount) * 100)
          );

          return (
            <section
              key={account.id}
              role="button"
              tabIndex={0}
              onClick={() => onViewAccount(account.id)}
              className="p-5 hover:bg-gray-50 dark:hover:bg-gray-800/60 cursor-pointer transition-colors group"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start md:items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${status.color.replace(
                        "text",
                        "bg"
                      )} bg-opacity-10 dark:bg-opacity-20`}
                    >
                      <status.icon className="h-5 w-5 dark:text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                        {account.loanPurpose}
                      </h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                        <Detail
                          icon={Calendar}
                          text={formatDate(account.requestDate)}
                        />
                        <Detail
                          icon={Percent}
                          text={`${account.interestRate}% a.m.`}
                        />
                        <Detail
                          icon={TrendingUp}
                          text={formatMZN(account.approvedAmount)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:w-72">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Progresso
                    </span>
                    <span className="text-xs font-semibold dark:text-gray-200">
                      {progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        account.status === "paid"
                          ? "bg-emerald-500"
                          : account.status === "pending"
                          ? "bg-amber-500"
                          : "bg-rose-500"
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <Info
                      label="Pagamento"
                      value={`${formatMZN(account.monthlyPayment)}/mês`}
                    />
                    <Info
                      label="Saldo"
                      value={formatMZN(account.remainingBalance)}
                      right
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end md:pl-4">
                  <button className="text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {account.lateFee && account.lateFee > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                  <span className="text-xs font-medium text-rose-600 dark:text-rose-400 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1.5" />
                    Multa por atraso
                  </span>
                  <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                    +{formatMZN(account.lateFee)}
                  </span>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default AccountsList;

// Subcomponents
const StatusBadge = ({
  color,
  count,
  label,
}: {
  color: string;
  count: number;
  label: string;
}) => (
  <span
    className={`text-xs bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-colors`}
  >
    <span className={`w-2 h-2 rounded-full bg-${color}-500`} />
    <span className="text-gray-800 dark:text-gray-200">
      {count} {label}
    </span>
  </span>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Detail = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
    <Icon className="h-3 w-3 mr-1.5 opacity-70" />
    {text}
  </span>
);

const Info = ({
  label,
  value,
  right = false,
}: {
  label: string;
  value: string;
  right?: boolean;
}) => (
  <div className={right ? "text-right" : ""}>
    <p className="text-xs text-gray-600 dark:text-gray-400">{label}</p>
    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
      {value}
    </p>
  </div>
);
