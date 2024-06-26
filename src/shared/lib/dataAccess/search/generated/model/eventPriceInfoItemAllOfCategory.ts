/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */

/**
 * Indicates whether this is the base price or a custom tariff.
`base` for the base price, and `tariff` for custom/extra tariffs.  Tariffs with category `uitpas` are automatically added by UiTdatabank and read-only. They will be updated whenever other tariffs change.
 */
export type EventPriceInfoItemAllOfCategory = typeof EventPriceInfoItemAllOfCategory[keyof typeof EventPriceInfoItemAllOfCategory];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const EventPriceInfoItemAllOfCategory = {
  base: 'base',
  tariff: 'tariff',
  uitpas: 'uitpas',
} as const;
