"use client";

import axios from "axios";
import { PublicRuntimeConfig } from "@/shared/feature-config/types";

export function initAxios({
  publicRuntimeConfig,
}: {
  publicRuntimeConfig: PublicRuntimeConfig;
}) {
  // Replace generated endpoints with runtime api endpoints
  axios.interceptors.request.use((config) => {
    const url = Object.keys(publicRuntimeConfig.apiPaths).reduce(
      (newUrl = "", apiPathKey) => {
        return newUrl.replace(
          apiPathKey,
          publicRuntimeConfig.apiPaths[apiPathKey]
        );
      },
      config.url
    );

    return {
      ...config,
      url,
    };
  });
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
      callback(error.response.status);
      throw error;
    }
  );
};
