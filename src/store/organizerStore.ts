import {
  ORGANIZER_STORAGE_KEY,
  PREV_ORGANIZER_STORAGE_KEY,
} from '@/app/const/storageKeys';
import { Organizer } from '@/shared/lib/dataAccess';
import { readCookie, storeCookie } from '@/shared/lib/utils/cookieUtils';

const storeOrganizer = (organizer: Organizer | null) => {
  storeCookie(ORGANIZER_STORAGE_KEY, organizer);
};

const storePrevOrganizer = (organizer: Organizer | null) => {
  storeCookie(PREV_ORGANIZER_STORAGE_KEY, organizer);
};

const readOrganizer = () => {
  return readCookie<Organizer>(ORGANIZER_STORAGE_KEY);
};

const readPrevOrganizer = () => {
  return readCookie<Organizer>(PREV_ORGANIZER_STORAGE_KEY);
};

export { readOrganizer, readPrevOrganizer, storeOrganizer, storePrevOrganizer };
