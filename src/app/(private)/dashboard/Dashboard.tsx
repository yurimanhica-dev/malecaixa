"use client";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import DashboardSkeleton from "../components/DashboardSkeleton";
import AccountsTab from "./_Tabs/AccountsTab";
import CreditTab from "./_Tabs/CreditTab";
import OverviewTab from "./_Tabs/OverviewTab";
import ProfileTab from "./_Tabs/ProfileTab";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const userData = {
    name: "Carlos Silva",
    email: "carlos@empresa.com",
    cpf: "123.456.789-00",
    membershipDate: "15/03/2020",
    phone: "+258 84 123 4567",
    address: "Av. 25 de Setembro, 1234 - Maputo",
    lastAccess: "Hoje às 14:30",
  };

  const accounts = [
    {
      id: 1,
      accountNumber: "MCB-2023-00145",
      loanPurpose: "Expansão do negócio de materiais de construção",
      requestDate: "2023-05-15",
      approvedAmount: 2500000,
      paidAmount: 2500000,
      remainingBalance: 0,
      interestRate: 20,
      monthlyPayment: 187500,
      principalPaid: 950000,
      interestPaid: 300000,
      dueDate: "2025-05-15",
      paymentFrequency: "mensal",
      status: "paid",
      accountManager: "Carla dos Santos",
    },
    {
      id: 2,
      accountNumber: "MCB-2024-00378",
      loanPurpose: "Compra de equipamentos agrícolas",
      requestDate: "2024-01-10",
      approvedAmount: 3500000, // 3.500.000 MT
      paidAmount: 1500000, // 2.100.000 MT
      remainingBalance: 1400000, // 1.400.000 MT
      interestRate: 35,
      monthlyPayment: 262500, // 262.500 MT
      principalPaid: 1500000, // 1.500.000 MT
      interestPaid: 600000, // 600.000 MT
      dueDate: "2026-01-10",
      paymentFrequency: "trimestral",
      status: "overdue",
      lateFee: 52500, // 52.500 MT
      accountManager: "João Macuácua",
    },
    {
      id: 3,
      accountNumber: "MCB-2024-00378",
      loanPurpose: "Reabilitação de casa de familia",
      requestDate: "2024-01-10",
      approvedAmount: 3500000, // 3.500.000 MT
      paidAmount: 2100000, // 2.100.000 MT
      remainingBalance: 1400000, // 1.400.000 MT
      interestRate: 25,
      monthlyPayment: 258500, // 262.500 MT
      principalPaid: 1500000, // 1.500.000 MT
      interestPaid: 600000, // 600.000 MT
      dueDate: "2026-01-10",
      paymentFrequency: "semestral",
      status: "pending",
      accountManager: "João Macuácua",
    },
  ];

  const creditInfo = {
    availableLimit: 12500.0,
    usedLimit: 4870.25,
    score: 780,
    lastUpdate: "01/08/2023",
  };

  const handleAccountClick = (id: number) =>
    router.push(`/dashboard/accounts/${id}`);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-800">
      <Suspense fallback={<DashboardSkeleton />}>
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarVisible={sidebarOpen}
        />

        <div className="flex flex-1 relative">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
          />

          <main
            className={`flex-1 p-6 transition-all duration-300 ${
              sidebarOpen ? "ml-64" : "ml-0"
            }`}
          >
            {activeTab === "overview" && (
              <OverviewTab
                accounts={accounts}
                onViewAccount={handleAccountClick}
              />
            )}
            {activeTab === "accounts" && (
              <AccountsTab
                accounts={accounts}
                onViewAccount={handleAccountClick}
              />
            )}
            {activeTab === "credit" && <CreditTab creditInfo={creditInfo} />}
            {activeTab === "profile" && <ProfileTab user={userData} />}
          </main>
        </div>
      </Suspense>
    </div>
  );
};

export default Dashboard;
