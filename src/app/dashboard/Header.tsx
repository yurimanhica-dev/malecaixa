"use client";
import {
  Bell,
  ChevronDown,
  HelpCircle,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarVisible: boolean;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-md shadow-primary">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo and Hamburger */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="ml-3 flex-shrink-0">
              <div className="relative h-8 w-32">
                <Image
                  src="/logo.png"
                  alt="Logo MALEcaixa"
                  fill
                  className="object-cover object-left"
                  priority
                  sizes="(max-width: 640px) 128px, 150px"
                />
              </div>
            </div>
            {/* Mobile menu button */}
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
              aria-expanded="false"
              aria-label="Toggle sidebar"
            >
              <span className="sr-only">Abrir menu</span>
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Center Section - Search (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar transações, relatórios..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Right Section - Navigation and Profile */}
          <div className="flex items-center">
            {/* Mobile Search Button */}
            <button className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <span className="sr-only">Pesquisar</span>
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Notification Button */}
            <div className="relative ml-2">
              <button
                onClick={() => setHasUnreadNotifications(false)}
                className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary relative"
              >
                <span className="sr-only">Notificações</span>
                <Bell className="h-5 w-5" aria-hidden="true" />
                {hasUnreadNotifications && (
                  <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                )}
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative ml-4" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2"
                id="user-menu"
                aria-haspopup="true"
                aria-expanded={isProfileOpen}
              >
                <span className="sr-only">Abrir menu usuário</span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                  Y
                </div>
                <ChevronDown
                  className={`ml-1 h-4 w-4 text-gray-400 transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-primary ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50">
                  <div className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Carlos Silva
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      carlos@empresa.com
                    </p>
                  </div>
                  <div className="py-1">
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <User className="mr-3 h-4 w-4 text-gray-400" />
                      Meu Perfil
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <Settings className="mr-3 h-4 w-4 text-gray-400" />
                      Configurações
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <HelpCircle className="mr-3 h-4 w-4 text-gray-400" />
                      Ajuda
                    </a>
                  </div>
                  <div className="py-1">
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="mr-3 h-4 w-4 text-red-400" />
                      Sair
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
