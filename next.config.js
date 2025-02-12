const { i18n } = require("./next-i18next.config");
const getPathsFromFolderStructure = require("./src/getPathsFromFolderStructure");

const basePath = "/app";

const paths = getPathsFromFolderStructure("./src/app");

process.env.NEXT_PUBLIC_RUNTIME_CONFIG = JSON.stringify({
  Routes: paths.map((path) => `/${path}`),
  basePath,
});

if (process.env.NEXT_PUBLIC_DEV_AUTH_TOKEN) {
  const token = parseJwt(process.env.NEXT_PUBLIC_DEV_AUTH_TOKEN);
  console.warn(
    `\n\t‼️ Warning: Using local auth token from env variables! Expires ${new Date(
      token.exp * 1000
    )}\n`
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  basePath,
  experimental: {
    serverActions: {
      allowedOrigins: [
        "balie-acc.uitpas.be",
        "balie-test.uitpas.be",
        "balie.uitpas.be",
        "balie-next-acc.uitpas.be",
        "balie-next-test.uitpas.be",
        "balie-next.uitpas.be",
      ],
    },
  },
  transpilePackages: ["@tanstack/query-core", "@tanstack/react-query"],
};

module.exports = nextConfig;

function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}
