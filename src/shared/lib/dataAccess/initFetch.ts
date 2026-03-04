'use client';

import { getSession, signOut } from 'next-auth/react';
import { PublicRuntimeConfig } from '@/shared/feature-config/types';

let initialized = false;

export function initFetch({
  publicRuntimeConfig,
}: {
  publicRuntimeConfig: PublicRuntimeConfig;
}) {
  if (initialized) return;
  initialized = true;

  const replaceUrl = (url: string) =>
    Object.keys(publicRuntimeConfig.apiPaths).reduce(
      (newUrl, key) => newUrl.replace(key, publicRuntimeConfig.apiPaths[key]),
      url,
    );

  const nativeFetch = globalThis.fetch;
  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === 'string'
        ? input
        : input instanceof URL
          ? input.href
          : input.url;

    console.log({ url });

    const resolvedUrl = replaceUrl(url);

    if (resolvedUrl === url) {
      return nativeFetch(input, init);
    }

    const headers: Record<string, string> = {
      ...(init?.headers as Record<string, string>),
    };

    const session = await getSession();
    if (session?.accessToken) {
      headers.Authorization = `Bearer ${session.accessToken}`;
    }

    const response = await nativeFetch(resolvedUrl, { ...init, headers });
    if (response.status === 401) {
      signOut({ callbackUrl: '/' });
    }
    return response;
  };
}
