"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { userRoleEnum } from "@/layout/utils/enum";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: userRoleEnum.USER | userRoleEnum.RECRUITER;
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else if (requiredRole && user.role !== requiredRole) {
        router.push("/");
      }
    }
  }, [user, isLoading, requiredRole, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
}
