import { Account } from "@/app/dashboard/_Tabs/OverviewTab";
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
    <div className="bg-white rounded-xl shadow-xs overflow-hidden border border-gray-100">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <Banknote className="h-5 w-5 text-primary" />
            Meus Créditos
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {accounts.length} crédito{accounts.length !== 1 ? "s" : ""}{" "}
            registado{accounts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge color="emerald" count={stats.paid} label="Quitado" />
          <StatusBadge color="amber" count={stats.pending} label="Andamento" />
          <StatusBadge color="red" count={stats.overdue} label="em Mora" />
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {accounts.map((account) => {
          const status = statusConfig[account.status];
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
              className="p-5 hover:bg-gray-50 cursor-pointer transition-colors group"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start md:items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${status.color.replace(
                        "text",
                        "bg"
                      )} bg-opacity-10`}
                    >
                      <status.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 group-hover:text-primary">
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
                    <span className="text-xs font-medium text-gray-500">
                      Progresso
                    </span>
                    <span className="text-xs font-semibold">{progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
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
                  <button className="text-gray-400 group-hover:text-primary">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {account.lateFee && account.lateFee > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-rose-500 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Multa por atraso
                  </span>
                  <span className="text-xs font-semibold">
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

// Subcomponentes auxiliares
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
    className={`text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1`}
  >
    <span className={`w-2 h-2 rounded-full bg-${color}-500`} />
    {count} {label}
  </span>
);

const Detail = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <span className="text-xs text-gray-500 flex items-center">
    <Icon className="h-3 w-3 mr-1" />
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
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
);
