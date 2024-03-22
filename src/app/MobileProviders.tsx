"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { AuthProvider } from "@/lib/auth";
import { UserProvider } from "@/lib/user";
import { CounterProvider } from "@/feature-counter/context/CounterProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { mobile } from "@/lib/ui";
import { ThemeProvider, CssBaseline } from "@mui/material";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export function MobileProviders({ children }: PropsWithChildren) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={mobile.theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <UserProvider>
              <CounterProvider>{children}</CounterProvider>
            </UserProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
