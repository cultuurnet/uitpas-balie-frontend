'use client';

import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Organizer } from '@/shared/lib/dataAccess';
import {
  readCounter,
  readPrevCounter,
  storeCounter,
  storePrevCounter,
} from '@/utils/counterStore';

import { RedirectWhenNoCounter } from './counters/RedirectWhenNoCounter';

export type Counter = Organizer | null;

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
