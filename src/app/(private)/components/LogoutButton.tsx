import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/authentication/logout", {
      method: "POST",
    });
    router.push("/"); // ou para a página de login, se quiser
    router.refresh(); // limpa estado do app
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full border border-gray-200 dark:border-gray-700 text-left px-4 py-2 rounded-lg text-sm flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
    >
      <LogOut className="h-5 w-5 text-red-500 dark:text-red-400" />
      <span>Sair</span>
    </button>
  );
}
