import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  console.log("Middleware Executed");

  // Custom JWT login
  const token = request.cookies.get("token")?.value;

  // NextAuth Google login
  const nextAuthToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  // If either auth system is present
  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      return NextResponse.next();
    } catch {
      // continue checking NextAuth
    }
  }

  if (nextAuthToken) {
    return NextResponse.next();
  }

  return NextResponse.redirect(
    new URL("/login", request.url)
  );
}

export const config = {
  matcher: ["/dashboard/:path*"],
};