import { signOut } from 'next-auth/react';

export const useLogout = () => {
  return async (callbackUrl = '/app') => {
    await signOut({ redirect: false });
    window.location.href = `/app/api/auth/logout?callbackUrl=${encodeURIComponent(callbackUrl)}`;
  };
};
