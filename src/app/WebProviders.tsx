'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

import ThemeRegistry from '@/app/ThemeRegistry';
import { Layout } from '@/layouts';
import { CounterProvider } from '@/shared/feature-counter/context/CounterProvider';
import { UserProvider } from '@/shared/lib/user';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      gcTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export function WebProviders({ children }: PropsWithChildren) {
  return (
    <ThemeRegistry options={{ key: 'joy' }}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <UserProvider>
            <CounterProvider counterPath={'/counters'}>
              <Layout>{children}</Layout>
            </CounterProvider>
          </UserProvider>
        </SessionProvider>
      </QueryClientProvider>
    </ThemeRegistry>
  );
}
