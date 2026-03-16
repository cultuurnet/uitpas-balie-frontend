import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const SERVICE_URLS: Record<string, string> = {
  uitpas: process.env.NEXT_PUBLIC_API_PATH ?? '',
  search: process.env.NEXT_PUBLIC_SEARCH_API_PATH ?? '',
  entry: process.env.NEXT_PUBLIC_ENTRY_API_PATH ?? '',
  userinfo: process.env.NEXT_PUBLIC_OAUTH_USERINFO_PATH ?? '',
};

async function refreshAccessToken(refreshToken: string) {
  const response = await fetch(
    `${process.env.KEYCLOAK_ISSUER}/realms/uitid/protocol/openid-connect/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: process.env.KEYCLOAK_ID ?? '',
        client_secret: process.env.KEYCLOAK_SECRET ?? '',
        refresh_token: refreshToken,
      }),
    },
  );

  if (!response.ok) throw new Error('Failed to refresh token');
  return response.json() as Promise<{ access_token: string }>;
}

async function fetchUpstream(
  targetUrl: string,
  request: NextRequest,
  accessToken: string,
) {
  const headers = new Headers({ Authorization: `Bearer ${accessToken}` });
  const contentType = request.headers.get('content-type');
  if (contentType) headers.set('content-type', contentType);

  return fetch(targetUrl, {
    method: request.method,
    headers,
    body:
      request.method !== 'GET' && request.method !== 'HEAD'
        ? request.body
        : null,
    // @ts-expect-error — duplex required for streaming request bodies in Node 18+
    duplex: 'half',
  });
}

async function handler(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const [service] = path;
  const targetBase = SERVICE_URLS[service];

  if (!targetBase) {
    return NextResponse.json({ error: 'Unknown service' }, { status: 404 });
  }

  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const upstreamPath = request.nextUrl.pathname.replace(
    `/api/proxy/${service}`,
    '',
  );
  const targetUrl = `${targetBase}${upstreamPath}${request.nextUrl.search}`;

  let response = await fetchUpstream(
    targetUrl,
    request,
    token.accessToken as string,
  );

  if (response.status === 401) {
    try {
      const refreshed = await refreshAccessToken(token.refreshToken as string);
      response = await fetchUpstream(
        targetUrl,
        request,
        refreshed.access_token,
      );
    } catch {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }
  }

  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete('content-encoding');
  responseHeaders.delete('content-length');

  return new NextResponse(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
}

export {
  handler as DELETE,
  handler as GET,
  handler as PATCH,
  handler as POST,
  handler as PUT,
};
