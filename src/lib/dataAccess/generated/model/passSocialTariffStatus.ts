/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */

/**
 * Status of the social tariff:
- `ACTIVE`: the passholder is entitled to social tariff
- `EXPIRED`: the passholder is NOT entitled to social tariff anymore
- `NONE`: the passholder is NOT entitled to social tariff
 */
export type PassSocialTariffStatus = typeof PassSocialTariffStatus[keyof typeof PassSocialTariffStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PassSocialTariffStatus = {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  NONE: 'NONE',
} as const;
