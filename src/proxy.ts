import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { ORGANIZER_STORAGE_KEY } from '@/app/const/storageKeys';

const ORGANIZERS_PATH = '/organizers';
const APP_PATH = '/';
const MOBILE_ORGANIZERS_PATH = '/mobile/organizers';
const MOBILE_APP_PATH = '/mobile';

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;
  const isOnLoginPage = pathname === '/login';
  const isOnMobileLoginPage = pathname === '/mobile/login';

  if (!token) {
    if (isOnLoginPage || isOnMobileLoginPage) return NextResponse.next();
    const loginPath = pathname.startsWith('/mobile')
      ? '/mobile/login'
      : '/login';
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  const organizerCookie = request.cookies.get(ORGANIZER_STORAGE_KEY);
  const hasOrganizer = Boolean(organizerCookie?.value);
  const isOnOrganizersPage = pathname === ORGANIZERS_PATH;
  const isOnMobileOrganizersPage = pathname === MOBILE_ORGANIZERS_PATH;

  if (isOnLoginPage) {
    return NextResponse.redirect(
      new URL(hasOrganizer ? APP_PATH : ORGANIZERS_PATH, request.url),
    );
  }

  if (isOnMobileLoginPage) {
    return NextResponse.redirect(
      new URL(
        hasOrganizer ? MOBILE_APP_PATH : MOBILE_ORGANIZERS_PATH,
        request.url,
      ),
    );
  }

  if (!hasOrganizer && isOnOrganizersPage) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}/permissions`,
        { headers: { Authorization: `Bearer ${token.accessToken}` } },
      );

      if (response.ok) {
        const data = await response.json();
        const organizers = Array.isArray(data) ? data : [];

        if (organizers.length === 1) {
          const nextResponse = NextResponse.redirect(
            new URL(APP_PATH, request.url),
          );
          nextResponse.cookies.set(
            ORGANIZER_STORAGE_KEY,
            JSON.stringify(organizers[0].organizer),
          );
          return nextResponse;
        }
      }
    } catch {
      // network error — fall through
    }
  }

  if (!hasOrganizer && !isOnOrganizersPage && !isOnMobileOrganizersPage) {
    const organizersPath = pathname.startsWith('/mobile')
      ? MOBILE_ORGANIZERS_PATH
      : ORGANIZERS_PATH;
    return NextResponse.redirect(new URL(organizersPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|mobile|.*\\..*).*)',
    '/mobile/login',
    '/mobile/organizers',
  ],
};
