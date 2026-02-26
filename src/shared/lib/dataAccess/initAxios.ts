'use client';

import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { PublicRuntimeConfig } from '@/shared/feature-config/types';

let initialized = false;

export function initAxios({
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

  // Axios: add auth token + replace URL
  axios.interceptors.request.use(async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return {
      ...config,
      url: config.url ? replaceUrl(config.url) : config.url,
    };
  });

  // Fetch (Orval v8): replace URL + add auth token.
  // Only intercepts requests to our own API paths — getSession() internally
  // calls fetch('/api/auth/session') which must pass through unchanged to
  // avoid infinite recursion.
  const nativeFetch = globalThis.fetch;
  globalThis.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
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

    return getSession().then((session: Awaited<ReturnType<typeof getSession>>) => {
      const mergedHeaders: Record<string, string> = {
        ...(init?.headers as Record<string, string>),
      };
      if (session?.accessToken) {
        mergedHeaders.Authorization = `Bearer ${session.accessToken}`;
      }
      return nativeFetch(resolvedUrl, { ...init, headers: mergedHeaders });
    });
  };
}

export const removeHeader = (headerKey: string) => {
  delete axios.defaults.headers[headerKey];
};

export const setHeaders = (headers: Record<string, string>) => {
  axios.defaults.headers = {
    ...axios.defaults.headers,
    ...headers,
  };
};

export const addInterceptor = (callback: (status: number) => void) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        signOut({ callbackUrl: '/' });
      }
      throw error;
    },
  );
};
