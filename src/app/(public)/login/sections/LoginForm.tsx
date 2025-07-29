"use client";

import Lottie from "lottie-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import login from "../../../assets/lotties/login.json";

async function hashSHA256(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (loading) return;
    try {
      // 1. Hash da senha
      const hashedPassword = await hashSHA256(password);

      // 2. Chamada à API
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: hashedPassword,
          rememberMe,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao fazer login");
      }

      // 3. Redireciona se autenticação for bem-sucedida
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gray-50 overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <Lottie
          animationData={login}
          loop
          className="w-full h-full object-cover"
        />
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
                alt="Logo"
                width={24}
                height={24}
                className="object-contain p-0.5 sm:p-1"
                priority
              />
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-sm shadow-secondary/30 overflow-hidden">
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
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
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
                <div className="relative items-center">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none pr-10"
                    placeholder="***************"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
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
                    href="/signup"
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2.5 sm:py-3 px-4 rounded-lg text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-gradient to-primary hover:opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Autenticando...
                    </span>
                  ) : (
                    "Entrar"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 text-center">
            <p className="text-xs text-gray-500">
              É nosso cliente e ainda não tem uma conta?
              <br />
              <Link
                href="/signup"
                className="font-medium text-primary hover:text-primary/80"
              >
                Solicitar senha de acesso
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
}
