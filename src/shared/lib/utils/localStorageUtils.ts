export const storeData = <T>(key: string, data: T): void => {
  try {
    data === null
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.debug(`Could not set localStorage item (${key})`, e);
  }
};

export const readData = <T>(
  key: string,
  fallbackValue: T | null = null,
): T | null => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : fallbackValue;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.debug(`Could not parse localStorage item (${key})`, e);
    return fallbackValue;
  }
};
