'use client';

import { signOut } from 'next-auth/react';

export const fetcher = async (
  url: string,
  options?: RequestInit,
): Promise<Response> => {
  const response = await fetch(url, options);

  if (response.status === 401) {
    signOut({ callbackUrl: '/' });
  }

  return response;
};
