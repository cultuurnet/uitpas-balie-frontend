"use server";

import { PublicRuntimeConfig } from "./types";

export async function getConfig(): Promise<{
  publicRuntimeConfig: PublicRuntimeConfig;
}> {
  const publicRuntimeConfig = JSON.parse(
    process.env.NEXT_PUBLIC_RUNTIME_CONFIG || ""
  );

  return {
    publicRuntimeConfig: {
      Routes: publicRuntimeConfig.Routes,
      legacyAppUrl: process.env.NEXT_PUBLIC_LEGACY_APP_URL ?? "",
      basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
      legacyApiPath: process.env.NEXT_PUBLIC_LEGACY_API_PATH ?? "",
      apiPaths: {
        NEXT_PUBLIC_API_PATH: process.env.NEXT_PUBLIC_API_PATH ?? "",
        NEXT_PUBLIC_ENTRY_API_PATH:
          process.env.NEXT_PUBLIC_ENTRY_API_PATH ?? "",
        NEXT_PUBLIC_SEARCH_API_PATH:
          process.env.NEXT_PUBLIC_SEARCH_API_PATH ?? "",
      },
      uitInVlaanderenUrl: process.env.NEXT_PUBLIC_UITINVLAANDEREN_URL ?? "",
      uitInDatabankUrl: process.env.NEXT_PUBLIC_UITDATABANK_URL ?? "",
      oauthPath: process.env.NEXT_PUBLIC_OAUTH_PATH ?? "",
      oauthUserInfoPath: process.env.NEXT_PUBLIC_OAUTH_USERINFO_PATH ?? "",
      legacyTokenEndpoint: process.env.NEXT_PUBLIC_LEGACY_TOKEN_ENDPOINT ?? "",
      legacyLogoutEndpoint:
        process.env.NEXT_PUBLIC_LEGACY_LOGOUT_ENDPOINT ?? "",
      blacklist: process.env.NEXT_PUBLIC_BLACKLIST ?? "",
    },
  };
}
