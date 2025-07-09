import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "MALEcaixa - Soluções Financeiras Inteligentes",
  description:
    "Especializada em gestão de empréstimos e créditos, oferecemos soluções financeiras seguras e acessíveis para particulares e empresas em Moçambique.",
  keywords: [
    "empréstimos",
    "crédito",
    "financiamento",
    "Moçambique",
    "soluções financeiras",
  ],
  authors: [{ name: "MALE Holding", url: "https://www.maleholding.co.mz" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "MALEcaixa - Crédito e Financiamento em Moçambique",
    description:
      "Soluções de crédito inteligentes para impulsionar pessoas e negócios em Moçambique. Processos rápidos e seguros.",
    url: "https://malecaixa.vercel.app",
    siteName: "MALEcaixa",
    locale: "pt_MZ",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "MALEcaixa - Sua Parceira Financeira em Moçambique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MALEcaixa - Soluções de Crédito",
    description:
      "Gestão profissional de empréstimos e créditos com segurança, rapidez e responsabilidade.",
    images: ["/icon.png"],
    creator: "@malesoftware",
  },
  metadataBase: new URL("https://malecaixa.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.className} bg-gray-100 antialiased min-w-[350px] 
        [&::-webkit-scrollbar]:w-4 [&::-webkit-scrollbar]:h-2 
        [&::-webkit-scrollbar-thumb]:bg-primary 
        [&::-webkit-scrollbar-track]:bg-zinc-100`}
      >
        {children}
      </body>
    </html>
  );
}
