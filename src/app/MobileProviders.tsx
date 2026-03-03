'use client';

import { CssBaseline,ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

import { CounterProvider } from '@/mobile/feature-counter';
import { clientRoutes } from '@/mobile/feature-routing';
import { theme } from '@/mobile/lib/ui';
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

export function MobileProviders({ children }: PropsWithChildren) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <UserProvider>
              <CounterProvider counterPath={clientRoutes.counters()}>
                {children}
              </CounterProvider>
            </UserProvider>
          </SessionProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
