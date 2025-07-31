"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";

export default function AppWrapper({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && children}
    </>
  );
}
