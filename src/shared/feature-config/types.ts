export type PublicRuntimeConfig = {
  legacyAppUrl: string;
  basePath: string;
  legacyApiPath: string;
  apiPaths: Record<string, string>;
  Routes: string[];
  uitInVlaanderenUrl: string;
  uitInDatabankUrl: string;
  oauthPath: string;
  oauthUserInfoPath: string;
  legacyTokenEndpoint: string;
  legacyLogoutEndpoint: string;
  blacklist: string;
  devAuthToken: string;
  gaTag: string;
};
