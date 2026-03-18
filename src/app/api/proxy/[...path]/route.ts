import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';

import { authOptions } from '../../auth/[...nextauth]/route';

const SERVICE_URLS: Record<string, string> = {
  uitpas: process.env.NEXT_PUBLIC_API_PATH ?? '',
  search: process.env.NEXT_PUBLIC_SEARCH_API_PATH ?? '',
  entry: process.env.NEXT_PUBLIC_ENTRY_API_PATH ?? '',
  userinfo: process.env.NEXT_PUBLIC_OAUTH_USERINFO_PATH ?? '',
};

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

  await getServerSession(authOptions);

  const token = await getToken({ req: request });
  const isExpired = !token?.expiresAt || Date.now() > token.expiresAt * 1000;
  if (!token?.accessToken || isExpired) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const upstreamPath = request.nextUrl.pathname.replace(
    `/api/proxy/${service}`,
    '',
  );
  const targetUrl = `${targetBase}${upstreamPath}${request.nextUrl.search}`;

  const headers = new Headers({ Authorization: `Bearer ${token.accessToken}` });
  const contentType = request.headers.get('content-type');
  if (contentType) headers.set('content-type', contentType);

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body:
      request.method !== 'GET' && request.method !== 'HEAD'
        ? request.body
        : null,
    // @ts-expect-error — duplex required for streaming request bodies in Node 18+
    duplex: 'half',
  });

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
