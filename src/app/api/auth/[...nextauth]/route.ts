import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

async function refreshAccessToken(refreshToken: string) {
  const response = await fetch(
    `${process.env.KEYCLOAK_ISSUER}/realms/uitid/protocol/openid-connect/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: process.env.KEYCLOAK_ID ?? '',
        client_secret: process.env.KEYCLOAK_SECRET ?? '',
        refresh_token: refreshToken,
      }),
    },
  );

  if (!response.ok) throw new Error('Failed to refresh token');
  return response.json() as Promise<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }>;
}

const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID ?? '',
      clientSecret: process.env.KEYCLOAK_SECRET ?? '',
      issuer: process.env.KEYCLOAK_ISSUER,
      authorization: {
        params: {
          referrer: 'uitpas',
          acr_values: 'optional',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expiresAt: account.expires_at,
        };
      }

      if (Date.now() < (token.expiresAt ?? 0) * 1000) {
        return token;
      }

      try {
        const refreshed = await refreshAccessToken(token.refreshToken ?? '');
        return {
          ...token,
          accessToken: refreshed.access_token,
          refreshToken: refreshed.refresh_token,
          expiresAt: Math.floor(Date.now() / 1000 + refreshed.expires_in),
          error: undefined,
        };
      } catch {
        return { ...token, error: 'RefreshAccessTokenError' };
      }
    },
    async session({ session, token }) {
      session.error = token.error;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
