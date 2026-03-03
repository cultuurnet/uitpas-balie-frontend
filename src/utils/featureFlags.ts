const FeatureFlags = {
  NEXT_DISABLE_MOBILE_REDIRECT: 'disable_mobile_redirect',
} as const;

type FeatureFlagName = (typeof FeatureFlags)[keyof typeof FeatureFlags];

const COOKIE_PREFIX = 'ff_';

const createCookieName = (flag: FeatureFlagName): string =>
  `${COOKIE_PREFIX}${flag}`;

const getFeatureFlagCookieValue = (flag: FeatureFlagName): boolean | null => {
  if (typeof document === 'undefined') return null;
  const name = createCookieName(flag);
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  if (!match) return null;
  const value = decodeURIComponent(match[1]);
  if (value === 'true') return true;
  if (value === 'false') return false;
  return null;
};

const setFeatureFlagCookie = (flag: FeatureFlagName, value: boolean): void => {
  const name = createCookieName(flag);
  document.cookie = `${name}=${value}; path=/; SameSite=Lax`;
  window.dispatchEvent(new Event('featureflag:change'));
};

export type { FeatureFlagName };
export { FeatureFlags, getFeatureFlagCookieValue, setFeatureFlagCookie };
