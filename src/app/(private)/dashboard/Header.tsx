"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import {
  Bell,
  ChevronDown,
  HelpCircle,
  Search,
  Settings,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LogoutButton } from "../components/LogoutButton";

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarVisible: boolean;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const { user, isLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return <div>Carregando ......</div>;
  }
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo and Hamburger */}
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="ml-3 flex-shrink-0">
              <div className="relative h-8 w-32 transition-opacity hover:opacity-90">
                <Image
                  src="/logowhite.png"
                  alt="Logo MALEcaixa"
                  fill
                  className="object-cover object-left"
                  priority
                  sizes="(max-width: 640px) 128px, 150px"
                />
              </div>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={onToggleSidebar}
              className="ml-4 p-2 hidden md:block rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 ease-in-out"
              aria-expanded="false"
              aria-label="Toggle sidebar"
            >
              <span className="sr-only">Abrir menu</span>
              <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Center Section - Search (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search
                  className="h-4 w-4 text-gray-400 dark:text-gray-500"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar transações, relatórios..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent text-sm transition-all duration-200 ease-in-out dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  <svg
                    className="h-4 w-4 text-gray-400 dark:text-gray-500"
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
          <div className="flex items-center space-x-2">
            {/* Mobile Search Button */}
            <button className="md:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors duration-200">
              <span className="sr-only">Pesquisar</span>
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Notification Button */}
            <div className="relative">
              <button
                onClick={() => setHasUnreadNotifications(false)}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 relative transition-colors duration-200"
              >
                <span className="sr-only">Notificações</span>
                <Bell className="h-5 w-5" aria-hidden="true" />
                {hasUnreadNotifications && (
                  <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 dark:bg-red-400 ring-2 ring-white dark:ring-gray-950 animate-pulse"></span>
                )}
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-1 p-1 pr-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors duration-200"
              >
                <div className="relative h-8 w-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Image
                    src="/testimonials/padaria.png"
                    alt="Perfil"
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                    isProfileDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-lg shadow-xl ring-1 ring-gray-200 dark:ring-gray-800 focus:outline-none z-50 overflow-hidden transition-all duration-200 ease-out origin-top-right transform opacity-100 scale-100">
                  {/* Profile Section */}
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.name || "Usuário Desconhecido"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email || "Email Desconhecido"}
                    </p>
                  </div>

                  {/* Navigation Links */}
                  <div className="py-1">
                    <Link
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
                    >
                      <User className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                      Perfil
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
                    >
                      <Settings className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                      Configurações
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
                    >
                      <HelpCircle className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                      Ajuda & Suporte
                    </Link>
                  </div>

                  {/* Logout Section */}
                  <div className="border-t p-2 border-gray-100 dark:border-gray-800">
                    <LogoutButton />
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
