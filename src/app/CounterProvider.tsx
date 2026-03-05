'use client';

import { useSession } from 'next-auth/react';
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import {
  Counter,
  readCounter,
  readPrevCounter,
  storeCounter,
  storePrevCounter,
} from '@/utils/counterStore';

export const CounterContext = createContext<{
  activeCounter: Counter;
  lastCounterUsed: Counter;
  setActiveCounter: Dispatch<SetStateAction<Counter>>;
  setLastCounterUsed: Dispatch<SetStateAction<Counter>>;
}>({
  activeCounter: null,
  lastCounterUsed: null,
  setActiveCounter: () => {},
  setLastCounterUsed: () => {},
});

export const CounterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeCounter, setActiveCounter] = useState<Counter>(readCounter);
  const [lastCounterUsed, setLastCounterUsed] =
    useState<Counter>(readPrevCounter);
  const { status } = useSession();

  const effectiveCounter = status === 'unauthenticated' ? null : activeCounter;

  useEffect(() => storeCounter(effectiveCounter), [effectiveCounter]);
  useEffect(() => storePrevCounter(lastCounterUsed), [lastCounterUsed]);

  return (
    <CounterContext.Provider
      value={{
        activeCounter: effectiveCounter,
        setActiveCounter,
        lastCounterUsed,
        setLastCounterUsed,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};
