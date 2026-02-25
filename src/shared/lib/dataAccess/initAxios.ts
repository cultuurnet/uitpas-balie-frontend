'use client';

import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { PublicRuntimeConfig } from '@/shared/feature-config/types';

export function initAxios({
  publicRuntimeConfig,
}: {
  publicRuntimeConfig: PublicRuntimeConfig;
}) {
  axios.interceptors.request.use(async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    const url = Object.keys(publicRuntimeConfig.apiPaths).reduce(
      (newUrl = '', apiPathKey) => {
        return newUrl.replace(
          apiPathKey,
          publicRuntimeConfig.apiPaths[apiPathKey],
        );
      },
      config.url,
    );

    return { ...config, url };
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        signOut({ callbackUrl: '/' });
      }
      throw error;
    },
  );
}
