import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "./lib/types/user-types/user-types";

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const baseURL = req.nextUrl;

  // Get cookie + role
  const isAuthenticated = req.cookies.has("access-token");
  const userRole = req.cookies.get("role")?.value;

  const isRecruiterDashboard = path.startsWith("/dashboard/recruiter");
  const isUserDashboard = path.startsWith("/dashboard/user");

  // ===============================
  // 1. PROTECT RECRUITER DASHBOARD
  // ===============================
  if (isRecruiterDashboard && !isAuthenticated) {
    return NextResponse.redirect(new URL("/recruiter/signin", baseURL));
  }

  // ===========================
  // 2. PROTECT USER DASHBOARD
  // ===========================
  if (isUserDashboard && !isAuthenticated) {
    return NextResponse.redirect(new URL("/user/signin", baseURL));
  }

  // ===================================================
  // 3. IF AUTHENTICATED, ENFORCE ROLE-BASED DASHBOARDS
  // ===================================================
  if (isAuthenticated) {
    if (userRole === UserRole.RECRUITER && !isRecruiterDashboard) {
      return NextResponse.redirect(
        new URL("/dashboard/recruiter/home", baseURL)
      );
    }

    if (userRole === UserRole.INTERN && !isUserDashboard) {
      return NextResponse.redirect(new URL("/dashboard/user/home", baseURL));
    }
  }

  return NextResponse.next();
}

// Middleware should run on all pages except assets, images, etc.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
