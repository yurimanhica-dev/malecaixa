"use client";

import Lottie from "lottie-react";
import Image from "next/image";
import Link from "next/link";
import login from "../../../assets/lotties/login.json";

const LoginForm = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gray-50 overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <Lottie
          animationData={login}
          loop={true}
          className="w-full h-full object-cover"
        />
        {/* Optional: dark overlay for contrast */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg p-4 sm:p-6 lg:p-8">
        {/* Logo Container */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="bg-white p-1.5 sm:p-2 rounded-full shadow-xl">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-secondary">
              <Image
                src="/icon.png"
                alt="Logo da MALECaixa"
                width={24}
                height={24}
                className="object-contain p-0.5 sm:p-1"
                priority
              />
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm shadow-secondary/30 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-primary to-gradient p-4 sm:p-6">
            <h2 className="text-white text-lg sm:text-xl font-semibold text-center">
              Acesso ao Cliente
            </h2>
            <p className="text-white/90 text-center text-xs sm:text-sm mt-1">
              Controle o seu crédito em um clique
            </p>
          </div>

          {/* Form */}
          <div className="p-5 sm:p-6 md:p-8">
            <form className="space-y-4 sm:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                  placeholder="••••••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-xs sm:text-sm text-gray-700"
                  >
                    Lembrar-me
                  </label>
                </div>

                <div className="text-xs sm:text-sm">
                  <Link
                    href="/dashboard/signup"
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2.5 sm:py-3 px-4 rounded-lg text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-gradient to-primary hover:opacity-90 transition-all"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 text-center">
            <p className="text-xs text-gray-500">
              É nosso cliente e ainda não tem uma conta?
              <br />
              <Link
                href="/dashboard/signup"
                className="font-medium text-primary hover:text-primary/80"
              >
                Solicitar senha de acesso
              </Link>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 sm:mt-8 text-center  text-xs text-gray-500 tracking-wide">
          © {new Date().getFullYear()} MALEcaixa. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
