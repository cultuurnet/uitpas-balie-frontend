import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const keycloakLogoutUrl = new URL(
    `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`,
  );
  keycloakLogoutUrl.searchParams.set(
    'post_logout_redirect_uri',
    `${process.env.NEXTAUTH_URL}${callbackUrl}`,
  );

  keycloakLogoutUrl.searchParams.set(
    'client_id',
    process.env.KEYCLOAK_ID ?? '',
  );

  return NextResponse.redirect(keycloakLogoutUrl);
}
