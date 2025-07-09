import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { JSX, useEffect, useRef, useState } from "react";

interface DropdownItem {
  label: string;
  href: string;
  description: string;
}

export default function MemberAccess(): JSX.Element {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropdownItems: {
    existingAccount: {
      title: string;
      items: DropdownItem[];
    };
    newAccount: {
      title: string;
      items: DropdownItem[];
    };
  } = {
    existingAccount: {
      title: "Existing account",
      items: [
        {
          label: "Member Login",
          href: "/dashboard/login",
          description: "Access your existing member account",
        },
      ],
    },
    newAccount: {
      title: "New to MALEcaixa",
      items: [
        {
          label: "Sign Up",
          href: "/dashboard/signup",
          description: "Create a new account",
        },
      ],
    },
  };

  const toggleDropdown = (): void => {
    setShowDropdown((prev) => !prev);
  };

  const closeDropdown = (): void => {
    setShowDropdown(false);
  };

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Botão principal */}
      <motion.button
        onClick={toggleDropdown}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center font-semibold gap-2 w-fit px-4 py-2 text-primary bg-secondary rounded-md hover:bg-secondary/90 transition-colors duration-200 focus:outline-none"
        aria-expanded={showDropdown}
        aria-haspopup="true"
        aria-label="Member access dropdown"
      >
        Login <span className="text-white">or</span> Sign In
        <motion.span
          animate={{ rotate: showDropdown ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {showDropdown ? (
            <ChevronUp className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          )}
        </motion.span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
            }}
            className="absolute left-0 mt-2 w-fit origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black/10 z-50 divide-y divide-gray-100 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="member-access-button"
          >
            <div className="py-2">
              <div className="px-4 py-2 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                {dropdownItems.existingAccount.title}
              </div>
              {dropdownItems.existingAccount.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 hover:bg-gray-50 transition-colors duration-150 group"
                  role="menuitem"
                  onClick={closeDropdown}
                >
                  <span className="block text-sm text-gray-700 group-hover:text-primary">
                    {item.label}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {item.description}
                  </span>
                </Link>
              ))}
            </div>

            <div className="py-2">
              <div className="px-4 py-2 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                {dropdownItems.newAccount.title}
              </div>
              {dropdownItems.newAccount.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 hover:bg-gray-50 transition-colors duration-150 group"
                  role="menuitem"
                  onClick={closeDropdown}
                >
                  <span className="block text-sm text-gray-700 group-hover:text-primary">
                    {item.label}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {item.description}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
