import { NextResponse } from "next/server";

export function middleware(request) {
  const isSessionCookie = request.cookies.has("__session");

  if (!isSessionCookie) {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  if (isSessionCookie) {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
