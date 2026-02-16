'use client';

import { useContext } from 'react';
import { PublicRuntimeConfig } from '../types';
import { ConfigContext } from './ConfigContext';

export const useConfig = (): {
  publicRuntimeConfig: PublicRuntimeConfig | null;
} => {
  const { config } = useContext(ConfigContext);

  return {
    publicRuntimeConfig: config?.publicRuntimeConfig || null,
  };
};
