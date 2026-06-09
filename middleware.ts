import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isIndexablePath } from "@/lib/lovell-canyon-site-pages";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  response.headers.set("x-domain", hostname);
  response.headers.set("x-pathname", pathname);

  if (!isIndexablePath(pathname)) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon|images|videos|robots|sitemap).*)"],
};
