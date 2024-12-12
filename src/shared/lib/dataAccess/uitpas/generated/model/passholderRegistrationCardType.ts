/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */

/**
 * Only used and mandatory in passholder registration.
 */
export type PassholderRegistrationCardType = typeof PassholderRegistrationCardType[keyof typeof PassholderRegistrationCardType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PassholderRegistrationCardType = {
  DIGITAL: 'DIGITAL',
  NFC_CARD: 'NFC_CARD',
} as const;