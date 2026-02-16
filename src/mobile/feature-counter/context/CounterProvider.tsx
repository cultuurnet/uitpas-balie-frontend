'use client';

import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Counter, CounterContext } from './CounterContext';
import { readPrevCounter, storePrevCounter } from './counterStore';

export const CounterProvider: FC<
  {
    counterPath: string;
  } & PropsWithChildren
> = ({ children }) => {
  const [lastCounterUsed, setLastCounterUsed] =
    useState<Counter>(readPrevCounter);

  useEffect(() => storePrevCounter(lastCounterUsed), [lastCounterUsed]);

  return (
    <CounterContext.Provider
      value={{
        lastCounterUsed,
        setLastCounterUsed,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};
