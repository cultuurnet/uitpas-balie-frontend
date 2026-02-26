'use client';

import axios from 'axios';
import { PublicRuntimeConfig } from '@/shared/feature-config/types';

const fetchDefaultHeaders: Record<string, string> = {};

export function initAxios({
  publicRuntimeConfig,
}: {
  publicRuntimeConfig: PublicRuntimeConfig;
}) {
  const replaceUrl = (url: string) =>
    Object.keys(publicRuntimeConfig.apiPaths).reduce(
      (newUrl, key) => newUrl.replace(key, publicRuntimeConfig.apiPaths[key]),
      url,
    );

  // Replace generated endpoints with runtime api endpoints (axios)
  axios.interceptors.request.use((config) => ({
    ...config,
    url: config.url ? replaceUrl(config.url) : config.url,
  }));

  // Replace generated endpoints with runtime api endpoints (fetch - Orval v8)
  const nativeFetch = globalThis.fetch;
  globalThis.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === 'string'
        ? input
        : input instanceof URL
        ? input.href
        : input.url;

    const resolvedUrl = replaceUrl(url);
    const mergedInit: RequestInit = {
      ...init,
      headers: { ...fetchDefaultHeaders, ...(init?.headers as Record<string, string>) },
    };

    if (typeof input === 'string') {
      return nativeFetch(resolvedUrl, mergedInit);
    } else if (input instanceof URL) {
      return nativeFetch(new URL(resolvedUrl), mergedInit);
    } else {
      return nativeFetch(new Request(resolvedUrl, input), mergedInit);
    }
  };
}

export const removeHeader = (headerKey: string) => {
  delete axios.defaults.headers[headerKey];
  delete fetchDefaultHeaders[headerKey];
};

export const setHeaders = (headers: Record<string, string>) => {
  axios.defaults.headers = {
    ...axios.defaults.headers,
    ...headers,
  };
  Object.assign(fetchDefaultHeaders, headers);
};

export const addInterceptor = (callback: (status: number) => void) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      callback(error.response.status);
      throw error;
    },
  );
};
