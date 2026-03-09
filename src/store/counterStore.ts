import { Organizer } from '@/shared/lib/dataAccess';
import { readCookie, storeCookie } from '@/shared/lib/utils/cookieUtils';
import { readData, storeData } from '@/shared/lib/utils/localStorageUtils';

type Counter = Organizer | null;

const localstorageSupport = typeof localStorage !== 'undefined';

const COUNTER_STORAGE_KEY = '@uitpas-balie/counter';
const PREV_COUNTER_STORAGE_KEY = '@uitpas-balie/counter-prev';

export const storeCounter = (counter: Counter) => {
  localstorageSupport
    ? storeData(COUNTER_STORAGE_KEY, counter)
    : storeCookie(COUNTER_STORAGE_KEY, counter);
};

export const storePrevCounter = (counter: Counter) => {
  localstorageSupport
    ? storeData(PREV_COUNTER_STORAGE_KEY, counter)
    : storeCookie(PREV_COUNTER_STORAGE_KEY, counter);
};

export const readCounter = (): Counter => {
  return localstorageSupport
    ? readData(COUNTER_STORAGE_KEY)
    : readCookie(COUNTER_STORAGE_KEY);
};

export const readPrevCounter = (): Counter => {
  return localstorageSupport
    ? readData(PREV_COUNTER_STORAGE_KEY)
    : readCookie(PREV_COUNTER_STORAGE_KEY);
};

export type { Counter };
