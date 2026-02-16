import { readCookie, storeCookie } from '@/shared/lib/utils/cookieUtils';
import { readData, storeData } from '@/shared/lib/utils/localStorageUtils';
import { Counter } from '@/shared/feature-counter/context/CounterContext';

const localstorageSupport = typeof localStorage !== 'undefined';

const PREV_COUNTER_STORAGE_KEY = '@uitpas-balie/counter-prev';

export const storePrevCounter = (counter: Counter) => {
  localstorageSupport
    ? storeData(PREV_COUNTER_STORAGE_KEY, counter)
    : storeCookie(PREV_COUNTER_STORAGE_KEY, counter);
};

export const readPrevCounter = (): Counter => {
  return localstorageSupport
    ? readData(PREV_COUNTER_STORAGE_KEY)
    : readCookie(PREV_COUNTER_STORAGE_KEY);
};
