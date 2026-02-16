import { useConfig } from '@/shared/feature-config/context/useConfig';
import { usePathname } from 'next/navigation';

export const useIsBlacklisted = (): boolean => {
  const pathname = usePathname();

  const { publicRuntimeConfig } = useConfig();

  if (!publicRuntimeConfig?.blacklist) return false;

  const blacklistedPages = (
    publicRuntimeConfig?.blacklist.split(',') as string[]
  ).map((page) => `/${page.trim()}`);

  return blacklistedPages.includes(pathname);
};
