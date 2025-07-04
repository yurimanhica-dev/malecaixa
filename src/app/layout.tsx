import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "MALEcaixa",
  icons: "/icon.png",
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
