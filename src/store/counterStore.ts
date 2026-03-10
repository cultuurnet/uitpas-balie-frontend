import { Organizer } from '@/shared/lib/dataAccess';
import { readCookie, storeCookie } from '@/shared/lib/utils/cookieUtils';
import {
  COUNTER_STORAGE_KEY,
  PREV_COUNTER_STORAGE_KEY,
} from '@/utils/counterKeys';

interface CardSystem {
  id: number;
  name: string;
}

type Counter = (Organizer & { cardSystems?: CardSystem[] }) | null;

const storeCounter = (counter: Counter) => {
  storeCookie(COUNTER_STORAGE_KEY, counter);
};

const storePrevCounter = (counter: Counter) => {
  storeCookie(PREV_COUNTER_STORAGE_KEY, counter);
};

const readCounter = (): Counter => {
  return readCookie(COUNTER_STORAGE_KEY);
};

const readPrevCounter = (): Counter => {
  return readCookie(PREV_COUNTER_STORAGE_KEY);
};

export type { CardSystem, Counter };
export { readCounter, readPrevCounter, storeCounter, storePrevCounter };
