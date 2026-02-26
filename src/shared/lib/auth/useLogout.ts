import { signOut } from 'next-auth/react';

export const useLogout = () => {
  return signOut;
};
