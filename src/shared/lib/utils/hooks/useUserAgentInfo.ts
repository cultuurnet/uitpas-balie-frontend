import { useMemo } from 'react';
import { UAParser } from 'ua-parser-js';

export const useUserAgentInfo = () =>
  useMemo(() => {
    if (typeof window !== 'undefined') {
      return UAParser(navigator.userAgent);
    }
    return { browser: { name: undefined }, os: { name: undefined } };
  }, []);
