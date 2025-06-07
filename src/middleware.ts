import { NextResponse, NextRequest } from "next/server";

const locales = ["en", "vi", "jp"];
const defaultLocale = locales[0];
const LOCALE_COOKIE = "NEXT_LOCALE";

function getLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  const preferredLanguages = acceptLanguage
    .split(",")
    .map((lang: string) => lang.split(";")[0].trim());

  for (const lang of preferredLanguages) {
    if (locales.includes(lang)) return lang;
    const baseLang = lang.split("-")[0];
    if (locales.includes(baseLang)) return baseLang;
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  const response = NextResponse.redirect(request.nextUrl);

  if (!request.cookies.has(LOCALE_COOKIE)) {
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*|not-found).*)", "/"],
};
