// middleware.ts
"use client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { cookies } = request;
  const path = request.nextUrl.pathname;
  const userIsAdmin = cookies.get("isAdmin")?.value;
  if (path.startsWith("/admin")) {
    console.log(userIsAdmin);
    if (userIsAdmin === "false") {
      console.log(userIsAdmin);
      return NextResponse.redirect(new URL("/user/home", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
