import { Organizer } from '@/shared/lib/dataAccess';
import { readCookie, storeCookie } from '@/shared/lib/utils/cookieUtils';

type Counter = Organizer | null;

const COUNTER_STORAGE_KEY = '@uitpas-balie/counter';
const PREV_COUNTER_STORAGE_KEY = '@uitpas-balie/counter-prev';

export const storeCounter = (counter: Counter) => {
  storeCookie(COUNTER_STORAGE_KEY, counter);
};

export const storePrevCounter = (counter: Counter) => {
  storeCookie(PREV_COUNTER_STORAGE_KEY, counter);
};

export const readCounter = (): Counter => {
  return readCookie(COUNTER_STORAGE_KEY);
};

export const readPrevCounter = (): Counter => {
  return readCookie(PREV_COUNTER_STORAGE_KEY);
};

export type { Counter };
