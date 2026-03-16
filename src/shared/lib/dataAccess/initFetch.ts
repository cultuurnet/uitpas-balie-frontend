'use client';

import { signOut } from 'next-auth/react';

let initialized = false;

const PROXY_PATHS: Record<string, string> = {
  NEXT_PUBLIC_API_PATH: '/api/proxy/uitpas',
  NEXT_PUBLIC_ENTRY_API_PATH: '/api/proxy/entry',
  NEXT_PUBLIC_SEARCH_API_PATH: '/api/proxy/search',
};

export function initFetch() {
  if (initialized) return;
  initialized = true;

  const replaceUrl = (url: string) =>
    Object.keys(PROXY_PATHS).reduce(
      (newUrl, key) => newUrl.replace(key, PROXY_PATHS[key]),
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

    const resolvedUrl = replaceUrl(url);

    if (resolvedUrl === url) {
      return nativeFetch(input, init);
    }

    const response = await nativeFetch(resolvedUrl, init);
    if (response.status === 401) {
      signOut({ callbackUrl: '/' });
    }
    return response;
  };
}
