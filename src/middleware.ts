import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const ADMIN_PREFIX = "/admin";
const ADMIN_API_PREFIX = "/api/admin";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect admin UI and admin API routes
  if (
    pathname.startsWith(ADMIN_PREFIX) ||
    pathname.startsWith(ADMIN_API_PREFIX)
  ) {
    // allow public auth routes, login page, and setup endpoint
    if (
      pathname.startsWith("/api/auth") ||
      pathname.startsWith("/api/auth/") ||
      pathname === "/admin/login" ||
      pathname === "/api/admin/setup"
    ) {
      return NextResponse.next();
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || (token as any).role !== "admin") {
      // If request expects an HTML page, redirect to admin login
      if (req.headers.get("accept")?.includes("text/html")) {
        const loginUrl = new URL("/admin/login", req.url);
        loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
      }

      // For API requests, return 401
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "content-type": "application/json" },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
