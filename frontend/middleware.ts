import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "./lib/types/user-types/user-types";

// 1. Specify protected and public routes
const protectedRoutes = [
  /* recruiter */
  "/dashboard/recruiter/home",
  "/dashboard/recruiter/jobs",
  "/dashboard/recruiter/post-job",
  "/dashboard/recruiter/settings",

  /** user or interns */
  "/dashboard/user/home",
  "/dashboard/user/applications",
  "/dashboard/user/jobs",
  "/dashboard/user/settings",
];

const publicRoutes = [
  "user/signin",
  "user/signup",
  "recruiter/signin",
  "recruiter/signup",
  "/",
];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const baseURL = req.nextUrl;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3 get Access token from cookie
  const cookie = req.cookies.has("access-token");
  const cookieUserRole = req.cookies.get("role");

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/signin", baseURL));
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (cookieUserRole?.value === UserRole.RECRUITER) {
    if (!path.startsWith("/dashboard/recruiter")) {
      return NextResponse.redirect(
        new URL("/dashboard/recruiter/home", baseURL)
      );
    }
  } else if (cookieUserRole?.value === UserRole.INTERN) {
    if (!path.startsWith("/dashboard/user")) {
      return NextResponse.redirect(new URL("/dashboard/user/home", baseURL));
    }
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
