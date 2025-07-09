import {
  AlertCircle,
  Banknote,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Percent,
  PieChart,
  Repeat,
  TrendingUp,
  User,
} from "lucide-react";
import { FC } from "react";
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
}

const AccountsTab: FC<Props> = ({ accounts, onViewAccount }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("pt-MZ", options);
  };

  const getStatusDetails = (status: string) => {
    switch (status) {
      case "paid":
        return {
          color: "bg-green-100 text-green-800",
          icon: CheckCircle,
          label: "Quitada",
        };
      case "pending":
        return {
          color: "bg-yellow-100 text-yellow-800",
          icon: Clock,
          label: "Em Andamento",
        };
      case "overdue":
        return {
          color: "bg-red-100 text-red-800",
          icon: AlertCircle,
          label: "Em Mora",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: FileText,
          label: "Indefinido",
        };
    }
  };

  return (
    <div className="space-y-6">
      <TabsHeader
        title="Minhas Contas"
        description="📊 Visão detalhada de todas as suas contas"
        breadcrumb={["MALEcaixa", "Dashboard", "Minhas Contas"]}
      />

      <div className="space-y-4">
        {accounts.map((account) => {
          const statusInfo = getStatusDetails(account?.status ?? "");
          const StatusIcon = statusInfo.icon;

          return (
            <div
              key={account.id}
              className="bg-white shadow-md overflow-hidden"
            >
              {/* Cabeçalho da Conta */}
              <div className="p-4 border-b">
                <div className="flex flex-col md:flex-row md:justify-between gap-3">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <h2 className="font-semibold text-lg flex items-center gap-2">
                      <Banknote className="h-5 w-5 text-secondary" />
                      Conta #{account.accountNumber}
                    </h2>
                    <span
                      className={`text-xs w-fit px-2 py-1 rounded-full flex items-center ${statusInfo.color}`}
                    >
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusInfo.label}
                    </span>
                  </div>

                  <button
                    onClick={() => onViewAccount(account.id)}
                    className="md:self-center text-red-500 flex items-center gap-1 text-sm font-medium hover:underline"
                  >
                    Solicitar detalhes de conta
                    <FileText className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Corpo da Conta - Grid de Informações */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
                {/* Coluna 1: Dados Básicos */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Finalidade
                    </h3>
                    <p className="mt-1 text-sm">{account.loanPurpose}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Datas Importantes
                    </h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <p className="text-xs text-gray-500">Contratação</p>
                        <p className="text-sm">
                          {formatDate(account.requestDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Vencimento</p>
                        <p className="text-sm">{formatDate(account.dueDate)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Coluna 3: Resumo Financeiro */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <Repeat className="h-4 w-4 text-primary" />
                      Periodicidade
                    </h3>
                    <p className="mt-1 text-sm capitalize">
                      {account.paymentFrequency}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      Valores do Crédito
                    </h3>
                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 mt-2">
                      <div>
                        <p className="text-xs text-gray-500">Desembolsado</p>
                        <p className="text-sm font-medium text-wrap">
                          {formatCurrency(account.approvedAmount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Prestação</p>
                        <p className="text-sm font-medium">
                          {formatCurrency(account.monthlyPayment)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <Percent className="h-4 w-4 text-red-500" />
                      Composição da Dívida
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-xs text-gray-500">Juros Pagos</p>
                        <p className="text-sm">
                          {formatCurrency(account.interestPaid)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Capital Pago</p>
                        <p className="text-sm">
                          {formatCurrency(account.principalPaid)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {account.lateFee && account.lateFee > 0 && (
                    <div className="bg-red-50 p-2 rounded">
                      <h3 className="text-sm font-medium text-red-600 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Mora Pendente
                      </h3>
                      <p className="text-sm mt-1">
                        {formatCurrency(account.lateFee)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Coluna 3: Resumo Financeiro */}
                <div className=" space-y-4 ">
                  <div className="bg-gray-50 p-3 rounded ">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <PieChart className="h-4 w-4 text-secondary" />
                      Resumo Financeiro
                    </h3>
                    <div className="space-y-2 mt-2 ">
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-600">Total Pago</p>
                        <p className="text-sm font-medium text-green-500">
                          {formatCurrency(account.paidAmount)}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-600">Saldo em Dívida</p>
                        <p className="text-sm font-medium text-red-600">
                          {formatCurrency(account.remainingBalance)}
                        </p>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <p className="text-sm text-gray-600">Taxa de Juro</p>
                        <p className="text-sm font-medium">
                          {account.interestRate}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded">
                    <h3 className="text-sm font-medium text-primary flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Gerente da Conta
                    </h3>
                    <p className="text-sm mt-2">{account.accountManager}</p>
                    <button className="mt-2 text-primary text-xs hover:underline">
                      Contactar gerente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccountsTab;
