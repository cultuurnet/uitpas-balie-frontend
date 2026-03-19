'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

import { OrganizerProvider } from '@/app/OrganizerProvider';
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
    <QueryClientProvider client={queryClient}>
      <SessionProvider basePath="/app/api/auth">
        <UserProvider>
          <OrganizerProvider>{children}</OrganizerProvider>
        </UserProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
