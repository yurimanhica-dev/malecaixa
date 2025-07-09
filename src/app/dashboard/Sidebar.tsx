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
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  visible: boolean;
  user: { name: string; email: string };
  onToggle: () => void;
}

const Sidebar = ({
  activeTab,
  setActiveTab,
  visible,
  user,
  onToggle,
}: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const tabs = [
    { key: "overview", label: "Visão Geral", icon: LayoutDashboard },
    { key: "accounts", label: "Minhas Contas", icon: Wallet },
    { key: "credit", label: "Meu Crédito", icon: CreditCard },
    { key: "profile", label: "Meu Perfil", icon: User },
  ];

  // Fechar sidebar ao clicar fora ou pressionar ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        visible
      ) {
        onToggle();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && visible) {
        onToggle();
      }
    };

    const handleLogout = () => {
      // Implement logout logic here
      console.log("User logged out");
      onToggle();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [visible, onToggle]);

  const handleTabClick = (tabKey: string) => {
    setActiveTab(tabKey);
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {visible && (
        <div className="fixed inset-0 bg-black/50 lg:hidden z-30 backdrop-blur-sm transition-opacity duration-300" />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed lg:relative inset-y-0 left-0 w-72 bg-white shadow-xl z-40 transition-all duration-300 ease-in-out transform ${
          visible ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full p-5 border-r border-gray-100">
          {/* Mobile Header */}
          <div className="flex items-center justify-between lg:hidden mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center text-white font-semibold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium text-sm">{user.name}</h3>
                <p className="text-xs text-gray-500 truncate max-w-[120px]">
                  {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Fechar menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Desktop User Info */}
          <div className="hidden lg:block mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center text-white font-semibold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium text-sm">{user.name}</h3>
                <p className="text-xs text-gray-500 truncate max-w-[120px]">
                  {user.email}
                </p>
              </div>
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
                          ? "bg-primary/30 text-primary font-medium shadow-xs"
                          : "hover:bg-primary/50 text-gray-700 hover:text-primary"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          isActive ? "text-primary-600" : "text-secondary "
                        }`}
                      />
                      <span>{tab.label}</span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary/60" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Section */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => handleTabClick("settings")}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm flex items-center gap-3 transition-colors ${
                    activeTab === "settings"
                      ? "bg-primary-50 text-primary-600 font-medium"
                      : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                  }`}
                >
                  <Settings
                    className={`h-5 w-5 ${
                      activeTab === "settings"
                        ? "text-primary-600"
                        : "text-gray-500"
                    }`}
                  />
                  <span>Configurações</span>
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm flex items-center gap-3 hover:bg-gray-50 text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut className="h-5 w-5 text-red-500" />
                  <span>Sair</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button (only visible when sidebar is hidden) */}
      {!visible && (
        <button
          onClick={onToggle}
          className="fixed lg:hidden bottom-6 right-6 z-30 p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors"
          aria-label="Abrir menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default Sidebar;
