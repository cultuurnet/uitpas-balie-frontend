import { useContext } from 'react';

import { CounterContext } from '@/app/CounterProvider';

export const useCounter = () => {
  const {
    activeCounter,
    lastCounterUsed,
    setActiveCounter,
    setLastCounterUsed,
  } = useContext(CounterContext);
  return {
    activeCounter,
    lastCounterUsed,
    setActiveCounter,
    setLastCounterUsed,
  };
};
