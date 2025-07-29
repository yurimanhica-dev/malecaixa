"use client";
import {
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  Wallet,
  X,
} from "lucide-react";
import { Dispatch, SetStateAction, useRef } from "react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  user: { name: string; email: string };
  onToggle: () => void;
}

const Sidebar = ({ activeTab, setActiveTab, user, onToggle }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const tabs = [
    { key: "overview", label: "Visão Geral", icon: LayoutDashboard },
    { key: "accounts", label: "Minhas Contas", icon: Wallet },
    { key: "credit", label: "Meu Crédito", icon: CreditCard },
    { key: "profile", label: "Meu Perfil", icon: User },
  ];

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       sidebarRef.current &&
  //       !sidebarRef.current.contains(event.target as Node)
  //     ) {
  //       onToggle();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [onToggle]);

  //   const handleEscape = (event: KeyboardEvent) => {
  //     if (event.key === "Escape" && visible) {
  //       onToggle();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   document.addEventListener("keydown", handleEscape);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //     document.removeEventListener("keydown", handleEscape);
  //   };
  // }, [visible, onToggle]);
  const handleTabClick = (tabKey: string) => {
    setActiveTab(tabKey);
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {/* {visible && ( */}
      {/* <div className="fixed inset-0 bg-black/50 lg:hidden z-20 backdrop-blur-sm transition-opacity duration-300" /> */}
      {/* )} */}

      {/* visible ? "translate-x-0" : "-translate-x-full lg:translate-x-0" */}
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`min-h-screen lg:fixed inset-y-0 left-0 w-72 bg-white dark:bg-gray-900 shadow-xl z-20 transition-all duration-300 ease-in-out transform`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full p-5 border-r border-gray-100 dark:border-gray-800">
          {/* Mobile Header */}
          <div className="flex items-center justify-between lg:hidden mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium text-sm dark:text-gray-200">
                  {user.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                  {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              aria-label="Fechar menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Desktop User Info */}
          <div className="hidden lg:flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-medium text-sm dark:text-gray-200">
                {user.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1">
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

          {/* Bottom Section */}
          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => handleTabClick("settings")}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm flex items-center gap-3 transition-colors ${
                    activeTab === "settings"
                      ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-200 font-medium"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-50 dark:hover:text-gray-100"
                  }`}
                >
                  <Settings
                    className={`h-5 w-5 ${
                      activeTab === "settings"
                        ? "text-primary-600 dark:text-primary-200"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                  <span>Configurações</span>
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 rounded-lg text-sm flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors">
                  <LogOut className="h-5 w-5 text-red-500 dark:text-red-400" />
                  <span>Sair</span>
                </button>
              </li>
            </ul>
          </div>
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
      {/* )} */}
    </>
  );
};

export default Sidebar;
