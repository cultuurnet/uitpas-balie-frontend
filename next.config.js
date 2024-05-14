const { i18n } = require("./next-i18next.config");
const getPathsFromFolderStructure = require("./src/getPathsFromFolderStructure");

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/app";

const paths = getPathsFromFolderStructure("./src/app");

process.env.NEXT_PUBLIC_RUNTIME_CONFIG = JSON.stringify({
  Routes: paths.map((path) => `/${path}`),
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  basePath,
};

module.exports = nextConfig;
