import { signOut } from 'next-auth/react';

export const useLogout = () => {
  return async (callbackUrl = '/') => {
    await signOut({ redirect: false });
    window.location.href = `/api/auth/logout?callbackUrl=${encodeURIComponent(callbackUrl)}`;
  };
};
