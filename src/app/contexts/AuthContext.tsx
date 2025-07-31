"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface DetalhesConta {
  id: number;
  montanteAprovado: number;
  saldoRestante: number;
  mensalidade: number;
  jurosPagos: number;
  principalPago: number;
  taxaMora: number;
}
interface stats {
  total: number;
  pending: number;
  paid: number;
  overdue: number;
}

interface User {
  email: string;
  role: string;
  name: string;
  status: string | null;
  detalhesConta: DetalhesConta;
  stats: stats;
}

const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User) => void;
  isLoading: boolean;
}>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    user: User | null;
    isLoading: boolean;
  }>({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    setState({
      user: savedUser ? JSON.parse(savedUser) : null,
      isLoading: false,
    });
  }, []);

  const setUser = (user: User) => {
    localStorage.setItem("auth_user", JSON.stringify(user));
    setState({ user, isLoading: false });
  };

  const value = useMemo(
    () => ({
      user: state.user,
      setUser,
      isLoading: state.isLoading,
    }),
    [state.user, state.isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
