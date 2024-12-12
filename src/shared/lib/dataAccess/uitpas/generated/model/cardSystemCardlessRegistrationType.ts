/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */

/**
 * Indicates the types of online cardless registrations this cardsystem supports.
 */
export type CardSystemCardlessRegistrationType = typeof CardSystemCardlessRegistrationType[keyof typeof CardSystemCardlessRegistrationType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CardSystemCardlessRegistrationType = {
  ALL: 'ALL',
  REGULAR: 'REGULAR',
  SOCIALTARIFF: 'SOCIALTARIFF',
  NONE: 'NONE',
} as const;