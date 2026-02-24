const { i18n } = require('./next-i18next.config');
const getPathsFromFolderStructure = require('./src/getPathsFromFolderStructure');

const paths = getPathsFromFolderStructure('./src/app');

process.env.NEXT_PUBLIC_RUNTIME_CONFIG = JSON.stringify({
  Routes: paths.map((path) => `/${path}`),
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
  experimental: {
    serverActions: {
      allowedOrigins: [
        'balie-acc.uitpas.be',
        'balie-test.uitpas.be',
        'balie.uitpas.be',
        'balie-next-acc.uitpas.be',
        'balie-next-test.uitpas.be',
        'balie-next.uitpas.be',
      ],
    },
  },
  transpilePackages: ['@tanstack/query-core', '@tanstack/react-query'],
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
