"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  allowedRoles?: string[];
  children: React.ReactNode;
}

export function AuthGuard({ allowedRoles, children }: Props) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jeevandhaara-token");
    if (!token) {
      router.replace("/(auth)/login");
      return;
    }

    // Very simple check: decode payload to read role (no crypto)
    try {
      const [, payload] = token.split(".");
      const decoded = JSON.parse(atob(payload));
      const role = decoded.role as string | undefined;

      if (!allowedRoles || !role || allowedRoles.includes(role)) {
        setAuthorized(true);
      } else {
        router.replace("/(public)");
      }
    } catch {
      router.replace("/(auth)/login");
    } finally {
      setChecking(false);
    }
  }, [router, allowedRoles]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-[#333333]/70">
        Checking access…
      </div>
    );
  }

  if (!authorized) return null;
  return <>{children}</>;
}
