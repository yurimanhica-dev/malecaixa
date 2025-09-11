"use client";

import Lottie from "lottie-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import login from "../../../assets/lotties/login.json";

const SignupForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/authentication/consultaEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao solicitar acesso");
      }

      console.log(data.success);
      // Verifica a estrutura da resposta da API
      if (data.success) {
        // Autenticação bem-sucedida
        setError({
          message: "Instruções de acesso enviadas para seu e-mail!",
          type: "success",
        });
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        // Usa a mensagem de erro da API
        const errorMessage =
          data.data?.detalhe?.msgErro ||
          data.error ||
          "Ocorreu um erro ao processar sua solicitação";
        setError({
          message: errorMessage,
          type: "error",
        });
      }
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Erro desconhecido",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-blur overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <Lottie
          animationData={login}
          loop={true}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10  w-full max-w-md sm:max-w-lg p-4 sm:p-6 lg:p-8">
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
        <div className="bg-white/50  backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-sm shadow-secondary/30 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-primary  to-gradient  backdrop-blur-sm p-4 sm:p-6">
            <h2 className="text-white text-lg sm:text-xl font-semibold text-center">
              Solicitar Acesso
            </h2>
            <p className="text-white/90 text-center text-xs sm:text-sm mt-1">
              Informe seu e-mail para gerar a sua senha
            </p>
          </div>

          {/* Form */}
          <div className="p-5 sm:p-6 md:p-8">
            {/* Mensagem de status/erro */}
            {error && (
              <div
                className={`mb-4 p-3 rounded-lg text-sm ${
                  error.type === "error"
                    ? "bg-red-50 text-red-700"
                    : "bg-green-50 text-green-700"
                }`}
              >
                {error.type === "success" && email ? (
                  <>
                    <strong>Sucesso!</strong> Enviamos instruções para <br />
                    <span className="font-semibold text-primary">{email}</span>
                  </>
                ) : (
                  error.message
                )}
                {error.type === "error" && (
                  <>
                    <strong>Erro:</strong> {error.message}
                  </>
                )}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                  placeholder="seu@email.com"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enviaremos as instruções de acesso para este e-mail
                </p>
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
                      Processando...
                    </span>
                  ) : (
                    "Solicitar Acesso"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className=" px-4 sm:px-6 py-3 sm:py-4 text-center">
            <p className="text-xs text-gray-500">
              Já possui uma conta?{" "}
              <Link
                href="/login"
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
