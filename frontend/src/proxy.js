import { NextResponse } from "next/server";

export async function proxy(req) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;

  console.log("token", accessToken, "req", req);

  const publicPaths = ["/", "/signin", "/signup"];
  const privatePaths = ["/dashboard"];

  if (!accessToken && privatePaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (accessToken && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/signup", "/dashboard", "/dashboard/:path*"],
};
