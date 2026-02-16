import { useMemo } from 'react';
import uaParser from 'ua-parser-js';

export const useUserAgentInfo = () =>
  useMemo(() => {
    if (typeof window !== 'undefined') {
      return uaParser(navigator.userAgent);
    }
    return { browser: { name: undefined }, os: { name: undefined } };
  }, []);
