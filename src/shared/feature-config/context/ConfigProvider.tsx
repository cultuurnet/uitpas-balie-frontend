'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { ConfigContext } from './ConfigContext';
import { PublicRuntimeConfig } from '../types';
import { getConfig } from '../getConfig';
import { initFetch } from '@/shared/lib/dataAccess/initFetch';
import { initUrlUtils } from '@/shared/lib/utils';

type ConfigProviderProps = {};

export function ConfigProvider({
  children,
}: PropsWithChildren<ConfigProviderProps>) {
  const [config, setConfig] = useState<{
    publicRuntimeConfig: PublicRuntimeConfig;
  } | null>(null);

  useEffect(() => {
    getConfig().then((config) => {
      setConfig(config);
      initFetch(config);
      initUrlUtils(config);
    });
  }, []);

  if (!config) return null;

  return (
    <ConfigContext.Provider value={{ config }}>
      {children}
    </ConfigContext.Provider>
  );
}
