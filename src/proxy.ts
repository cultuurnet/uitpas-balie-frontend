import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { COUNTER_STORAGE_KEY } from '@/utils/counterKeys';

const COUNTERS_PATH = '/counters';
const APP_PATH = '/';
const MOBILE_COUNTERS_PATH = '/mobile/counters';
const MOBILE_APP_PATH = '/mobile';

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;
  const isOnLoginPage = pathname === '/login';
  const isOnMobileLoginPage = pathname === '/mobile/login';

  if (!token) {
    if (isOnLoginPage || isOnMobileLoginPage) return NextResponse.next();
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const counterCookie = request.cookies.get(COUNTER_STORAGE_KEY);
  const hasCounter = Boolean(counterCookie?.value);
  const isOnCountersPage = pathname === COUNTERS_PATH;

  if (isOnLoginPage) {
    return NextResponse.redirect(
      new URL(hasCounter ? APP_PATH : COUNTERS_PATH, request.url),
    );
  }

  if (isOnMobileLoginPage) {
    return NextResponse.redirect(
      new URL(hasCounter ? MOBILE_APP_PATH : MOBILE_COUNTERS_PATH, request.url),
    );
  }

  if (!hasCounter && isOnCountersPage) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}/permissions`,
        { headers: { Authorization: `Bearer ${token.accessToken}` } },
      );

      if (response.ok) {
        const data = await response.json();
        const counters = Array.isArray(data) ? data : [];

        if (counters.length === 1) {
          const nextResponse = NextResponse.redirect(
            new URL(APP_PATH, request.url),
          );
          nextResponse.cookies.set(
            COUNTER_STORAGE_KEY,
            JSON.stringify(counters[0].organizer),
          );
          return nextResponse;
        }
      }
    } catch {
      // network error — fall through
    }
  }

  if (!hasCounter && !isOnCountersPage) {
    return NextResponse.redirect(new URL(COUNTERS_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|mobile|.*\\..*).*)',
    '/mobile/login',
  ],
};
