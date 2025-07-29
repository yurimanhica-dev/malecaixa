"use client";
import { Bell, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface HeaderProps {
  onToggleSidebar: () => void;

  sidebarVisible: boolean;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  // const dropdownRef = useRef<HTMLDivElement>(null);

  // // Fechar dropdown ao clicar fora
  // // useEffect(() => {
  // //   const handleClickOutside = (event: MouseEvent) => {
  // //     if (
  // //       dropdownRef.current &&
  // //       !dropdownRef.current.contains(event.target as Node)
  // //     ) {
  // //       onToggleSidebar();
  // //     }
  // //   };

  // //   document.addEventListener("mousedown", handleClickOutside);
  // //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // // }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo and Hamburger */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="ml-3 flex-shrink-0">
              <div className="relative h-8 w-32">
                <Image
                  src="/logowhite.png"
                  alt="Logo MALEcaixa"
                  fill
                  className="object-cover object-left dark:invert-0 dark:brightness-600 dark:contrast-700"
                  priority
                  sizes="(max-width: 640px) 128px, 150px"
                />
              </div>
            </div>
            {/* Mobile menu button */}
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              aria-expanded="false"
              aria-label="Toggle sidebar"
            >
              <span className="sr-only">Abrir menu</span>
              {/* <Menu className="h-5 w-5" aria-hidden="true" /> */}
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
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent text-sm transition-all dark:text-gray-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
          <div className="flex items-center">
            {/* Mobile Search Button */}
            <button className="md:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400">
              <span className="sr-only">Pesquisar</span>
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Notification Button */}
            <div className="relative ml-2">
              <button
                onClick={() => setHasUnreadNotifications(false)}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 relative"
              >
                <span className="sr-only">Notificações</span>
                <Bell className="h-5 w-5" aria-hidden="true" />
                {hasUnreadNotifications && (
                  <span className="absolute top-0 text-xs right-0.5 block h-2.5 w-2.5 rounded-full text-red-500 dark:text-red-400 ring-2 ring-white dark:ring-gray-900">
                    3
                  </span>
                )}
              </button>
            </div>
            {/* Profile Button */}
            <button
              className="ml-2 p-2 rounded-full h-full w-full text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 relative"
              // ref={dropdownRef}
            >
              <span className="sr-only">Perfil</span>
              <Image
                src="/testimonials/padaria.png"
                alt="Perfil"
                sizes="(max-width: 768px) 50vw, 100vw"
                fill
                className="rounded-full h-full w-full object-cover"
              />
            </button>

            {/* Profile Dropdown */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
