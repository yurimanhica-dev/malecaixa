"use client";
import {
  AlertCircle,
  Calendar,
  ChevronRight,
  Download,
  Edit,
  FileText,
  Key,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { FC } from "react";
import TabsHeader from "./_component/TabsHeader";

interface UserData {
  name: string;
  email: string;
  cpf: string;
  membershipDate: string;
  phone?: string;
  address?: string;
  lastAccess?: string;
  lastAccessIp?: string;
  accountStatus?: "active" | "pending" | "restricted";
}

interface Props {
  user: UserData;
}

const ProfileTab: FC<Props> = ({ user }) => {
  // Formatar data de cadastro
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("pt-MZ", options);
  };

  // Formatar CPF para exibição
  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  // Status da conta
  const accountStatus = {
    active: { color: "bg-emerald-100 text-emerald-800", label: "Ativa" },
    pending: { color: "bg-amber-100 text-amber-800", label: "Pendente" },
    restricted: { color: "bg-rose-100 text-rose-800", label: "Restrita" },
  }[user.accountStatus || "active"];

  return (
    <div className="space-y-6">
      <TabsHeader
        title="Meu Perfil"
        description="Gerencie suas informações pessoais e preferências de conta"
        breadcrumb={["MALEcaixa", "Área Pessoal", "Perfil"]}
      />

      <div className="bg-white rounded-xl shadow-xs overflow-hidden border border-gray-100">
        {/* Cabeçalho do Perfil */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-xl shadow-xs border border-gray-200">
                <User className="h-8 w-8 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${accountStatus.color}`}
                  >
                    {accountStatus.label}
                  </span>
                  <span className="text-xs text-gray-500">
                    Membro desde {formatDate(user.membershipDate)}
                  </span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark">
              <Edit className="h-4 w-4" />
              Editar perfil
            </button>
          </div>
        </div>

        {/* Corpo do Perfil */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Coluna 1: Informações Pessoais */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Informações Pessoais
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className=" text-xs font-medium text-gray-500 mb-2 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    E-mail
                  </label>
                  <p className="text-sm font-medium">{user.email}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-xs font-medium text-gray-500 mb-2 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    Telefone
                  </label>
                  <p className="text-sm font-medium">
                    {user.phone || "Não informado"}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-xs font-medium text-gray-500 mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-gray-400" />
                    CPF
                  </label>
                  <p className="text-sm font-mono font-medium">
                    {formatCPF(user.cpf)}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-xs font-medium text-gray-500 mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    Endereço
                  </label>
                  <p className="text-sm font-medium">
                    {user.address || "Não informado"}
                  </p>
                </div>
              </div>
            </div>

            {/* Seção de Segurança */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Segurança
              </h3>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <Key className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Senha de acesso
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Última alteração há 3 meses
                    </p>
                    <button className="mt-3 text-sm font-medium text-primary hover:text-primary-dark flex items-center gap-2">
                      Alterar senha
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 2: Atividade */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Atividade Recente
              </h3>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Último acesso</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {user.lastAccess || "Não disponível"}
                    </p>
                    {user.lastAccessIp && (
                      <p className="text-xs text-gray-500 mt-1">
                        IP: {user.lastAccessIp}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Notificações</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      2 alertas não lidos
                    </p>
                    <button className="mt-3 text-sm font-medium text-primary hover:text-primary-dark flex items-center gap-2">
                      Ver todas
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                Ações Rápidas
              </h3>

              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium">Exportar dados</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium">
                  Relatório de transações
                </span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium">
                  Preferências de notificação
                </span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
