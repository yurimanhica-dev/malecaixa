"use client";

import Lottie from "lottie-react";
import Image from "next/image";
import Link from "next/link";
import login from "../../../assets/lotties/login.json";

const SignupForm = () => {
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

        {/* Signup Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm shadow-secondary/30 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-primary to-gradient p-4 sm:p-6">
            <h2 className="text-white text-lg sm:text-xl font-semibold text-center">
              Solicitar Acesso
            </h2>
            <p className="text-white/90 text-center text-xs sm:text-sm mt-1">
              Informe seu e-mail para gerar a sua senha
            </p>
          </div>

          {/* Form */}
          <div className="p-5 sm:p-6 md:p-8">
            <form className="space-y-6">
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
                <p className="mt-1 text-xs text-gray-500">
                  Enviaremos as instruções de acesso para este e-mail
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2.5 sm:py-3 px-4 rounded-lg text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-gradient to-primary hover:opacity-90 transition-all"
                >
                  Solicitar Acesso
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 text-center">
            <p className="text-xs text-gray-500">
              Já possui uma conta?{" "}
              <Link
                href="/dashboard/login"
                className="font-medium text-primary hover:text-primary/80"
              >
                Faça login aqui
              </Link>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 sm:mt-8 text-center text-xs text-gray-500 tracking-wide">
          © {new Date().getFullYear()} MALEcaixa. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
