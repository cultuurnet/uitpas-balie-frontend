import { useSession } from 'next-auth/react';

export const useIsLoggedIn = () => {
  const { status } = useSession();

  return status === 'authenticated';
};
