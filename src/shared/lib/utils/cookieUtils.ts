import { getCookie, setCookie, deleteCookie } from 'cookies-next';

export const readCookie = <T>(
  cookie: string,
  fallbackValue: T | null = null,
): T | null => {
  try {
    const storedData = getCookie(cookie);
    return typeof storedData === 'string'
      ? (JSON.parse(storedData) as T)
      : fallbackValue;
  } catch (e) {
    console.debug(`Could not parse cookie (${cookie})`, e);
    return fallbackValue;
  }
};

export const storeCookie = <T>(cookie: string, data: T): void => {
  try {
    if (data === null) {
      deleteCookie(cookie);
      return;
    }
    setCookie(cookie, JSON.stringify(data));
  } catch (e) {
    console.debug(`Could not set cookie (${cookie})`, e);
  }
};
