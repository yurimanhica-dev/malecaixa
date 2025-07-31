"use client";
import { CreditCard, LayoutDashboard, Menu, User, Wallet } from "lucide-react";
import { Dispatch, SetStateAction, useRef } from "react";
import { LogoutButton } from "../components/LogoutButton";

interface SidebarProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  onToggle: () => void;
  isOpen: boolean;
}

const Sidebar = ({
  activeTab,
  setActiveTab,
  onToggle,
  isOpen,
}: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { key: "overview", label: "Visão Geral", icon: LayoutDashboard },
    { key: "accounts", label: "Minhas Contas", icon: Wallet },
    { key: "credit", label: "Meu Crédito", icon: CreditCard },
    { key: "profile", label: "Meu Perfil", icon: User },
  ];

  const handleTabClick = (tabKey: string) => {
    setActiveTab(tabKey);
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={`fixed h-full top-16 left-0 w-72 bg-gray-900 dark:bg-gray-900 shadow-xl z-20 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full  pointer-events-none"
        }`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full p-5 border-r border-gray-100 dark:border-gray-800">
          {/* Main Navigation */}
          <nav className="flex-1 inset-x-0 bottom-0">
            <ul className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <li key={tab.key}>
                    <button
                      onClick={() => handleTabClick(tab.key)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm flex items-center gap-3 transition-all ${
                        isActive
                          ? "bg-primary/50 dark:bg-primary/30 text-white dark:text-gray-100 font-medium shadow-xs"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-50 dark:hover:text-gray-100"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          isActive
                            ? "text-primary dark:text-primary"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      />
                      <span>{tab.label}</span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-200 dark:bg-primary-100" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
          <LogoutButton />
          {/* Bottom Section */}
          <div className="fixed bottom-1 pt-4 w-56 border-t border-gray-100 dark:border-gray-800"></div>
        </div>
      </aside>

      {/* Mobile Menu Button (only visible when sidebar is hidden) */}
      {/* {!visible && ( */}
      <button
        onClick={onToggle}
        className="fixed lg:hidden bottom-6 right-6 z-50 p-3 bg-primary/60 hover:bg-primary/70 text-white rounded-full shadow-lg transition-colors"
        aria-label="Abrir menu"
      >
        <Menu className="h-6 w-6" />
      </button>
    </>
  );
};

export default Sidebar;
