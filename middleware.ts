import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Only these paths should be indexed on lovellcanyon.com. */
const INDEXABLE_PATHS = new Set(["/", "/contact"]);

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  // Canonical host: redirect www → apex
  if (hostname.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.host = hostname.replace(/^www\./, "");
    return NextResponse.redirect(url, 301);
  }

  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  response.headers.set("x-domain", hostname);
  response.headers.set("x-pathname", pathname);
  if (!INDEXABLE_PATHS.has(pathname)) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon|images|videos|robots|sitemap).*)"],
};
