import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: "/", isAuthenticated: "next" },
  { path: "/login", isAuthenticated: "redirect" },
  { path: "/signup", isAuthenticated: "redirect" },
] as const;

const redirect_when_not_authenticated = "/login";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get("token");

  if (!authToken && isPublicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !isPublicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = redirect_when_not_authenticated;
    return NextResponse.redirect(redirectUrl);
  }

  if (
    authToken &&
    isPublicRoute &&
    isPublicRoute.isAuthenticated === "redirect"
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !isPublicRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - manifest files
     * - robots.txt
     * - image files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|.*\\.(?:png|jpg|jpeg|gif|svg|webp)$).*)",
  ],
};
