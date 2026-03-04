'use client';

import { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';

import {
  readCounter,
  readPrevCounter,
  storeCounter,
  storePrevCounter,
} from '@/shared/feature-counter/context/counterStore';

import { Counter, CounterContext } from './CounterContext';
import { RedirectWhenNoCounter } from './RedirectWhenNoCounter';

export const CounterProvider: FC<
  {
    counterPath: string;
    whiteListedPages?: string | string[];
  } & PropsWithChildren
> = ({ counterPath, children, whiteListedPages }) => {
  const [activeCounter, setActiveCounter] = useState<Counter>(readCounter);
  const [lastCounterUsed, setLastCounterUsed] =
    useState<Counter>(readPrevCounter);

  useEffect(() => storeCounter(activeCounter), [activeCounter]);
  useEffect(() => storePrevCounter(lastCounterUsed), [lastCounterUsed]);
  const clearCounter = useCallback(() => setActiveCounter(null), []);

  return (
    <CounterContext.Provider
      value={{
        activeCounter,
        setActiveCounter,
        lastCounterUsed,
        setLastCounterUsed,
      }}
    >
      <RedirectWhenNoCounter
        counterPath={counterPath}
        counter={activeCounter}
        clearCounter={clearCounter}
        whiteListedPages={whiteListedPages}
      >
        {children}
      </RedirectWhenNoCounter>
    </CounterContext.Provider>
  );
};
