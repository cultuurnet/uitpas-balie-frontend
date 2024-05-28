/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */

/**
 * State of the passholder
 */
export type GetUitidPassholderStatus200State = typeof GetUitidPassholderStatus200State[keyof typeof GetUitidPassholderStatus200State];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetUitidPassholderStatus200State = {
  REGISTERED: 'REGISTERED',
  UNREGISTERED: 'UNREGISTERED',
} as const;
