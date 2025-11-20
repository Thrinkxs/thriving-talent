import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "./lib/types/user-types/user-types";

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const baseURL = req.nextUrl;

  // Get cookie + role
  const isAuthenticated = req.cookies.has("access-token");
  console.log("User is authenticated", isAuthenticated)
  const userRole = req.cookies.get("role")?.value;

  const isEmployerDashboard = path.startsWith("/dashboard/employer");
  const isInternDashboard = path.startsWith("/dashboard/intern");

  // ===============================
  // 1. PROTECT EMPLOYER DASHBOARD
  // ===============================
  if (isEmployerDashboard && !isAuthenticated) {
    return NextResponse.redirect(new URL("/employer/signin", baseURL));
  }

  // ===========================
  // 2. PROTECT USER DASHBOARD
  // ===========================
  if (isInternDashboard && !isAuthenticated) {
    return NextResponse.redirect(new URL("/intern/signin", baseURL));
  }

  // ===================================================
  // 3. IF AUTHENTICATED, ENFORCE ROLE-BASED DASHBOARDS
  // ===================================================
  if (isAuthenticated) {
    if (userRole === UserRole.EMPLOYER && !isEmployerDashboard) {
      return NextResponse.redirect(
        new URL("/dashboard/employer/home", baseURL)
      );
    }

    if (userRole === UserRole.INTERN && !isInternDashboard) {
      return NextResponse.redirect(new URL("/dashboard/intern/home", baseURL));
    }
  }

  return NextResponse.next();
}

// Middleware should run on all pages except assets, images, etc.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
