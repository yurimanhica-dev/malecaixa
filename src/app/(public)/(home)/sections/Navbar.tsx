"use client";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { JSX, useEffect, useState } from "react";
import { HiBarsArrowDown } from "react-icons/hi2";
import MemberAccess from "../components/MemberAccess";

interface NavItem {
  name: string;
  href: string;
}

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("#home");

  const navItems: NavItem[] = [
    { name: "Home", href: "#home" },
    { name: "Sobre", href: "#sobre" },
    { name: "Simulação", href: "#simulacao" },
    { name: "Soluções", href: "#solucoes" },
    { name: "Contactos", href: "#contactos" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Verificar a seção inicial

    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mobileMenuVariants: Variants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const itemVariants: Variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { y: { stiffness: 1000, velocity: -100 } },
    },
    closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
  };

  const toggleMenu = (): void => setIsOpen(!isOpen);

  return (
    <nav className="bg-white min-w-fit w-full shadow-md shadow-primary/70 sticky top-0 z-40 py-2 backdrop-blur-md transition-all  duration-300 ease-in-out">
      <div className="mx-auto max-w-screen-xl c-space">
        <div className="flex justify-between h-14">
          {/* Logo e menu desktop */}
          <motion.div className="relative w-[160px] h-[48px] min-w-fit">
            <Link href="#home" className="flex items-center w-full h-full">
              <Image
                src="/logos.png"
                alt="MALEcaixa Logo"
                fill
                priority
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </Link>
          </motion.div>

          <div className="flex mt-3 items-end gap-3 space-x-4 md:space-x-6 lg:space-x-8 flex-col">
            <div className="hidden md:flex md:items-center md:space-x-5 lg:space-x-10">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={`px-1 uppercase py-2 rounded-md text-sm font-medium text-gray-800 hover:text-hover transition ${
                      activeSection === item.href ? "text-primary" : ""
                    }`}
                    onClick={() => setActiveSection(item.href)}
                  >
                    {item.name}
                    {activeSection === item.href && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        layoutId="activeSection"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="hidden md:flex md:items-center md:space-x-8">
              <motion.div whileTap={{ scale: 1 }}>
                <MemberAccess />
              </motion.div>
            </div>
            {/* Botões desktop */}
          </div>
          {/* Botão Mobile */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-1 rounded-md text-gray-700 hover:text-primary hover:bg-gray-200 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              <HiBarsArrowDown
                className="w-7 h-7 font-extralight"
                aria-hidden="true"
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden "
          >
            <motion.div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <motion.div
                  key={`mobile-${item.name}`}
                  variants={itemVariants}
                  className="block px-3 py-2 text-base font-medium hover:bg-primary/20"
                >
                  <Link
                    href={item.href}
                    onClick={() => {
                      toggleMenu();
                      setActiveSection(item.href);
                    }}
                    className={`block w-full ${
                      activeSection === item.href
                        ? "text-primary border-l-4  border-primary pl-2"
                        : "text-gray-700"
                    }`}
                  >
                    {item.name}
                    <hr className="border-t my-1 max-w-5xl border-gray-300 " />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                whileHover={{ scale: 1.01 }}
                variants={itemVariants}
                className="pt-4 space-y-2"
              >
                <MemberAccess />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
