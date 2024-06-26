/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */

/**
 * The domain of the term. Can be one of `eventtype`, `theme`, or `facility`.
 */
export type EventTermsItemDomain = typeof EventTermsItemDomain[keyof typeof EventTermsItemDomain];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const EventTermsItemDomain = {
  eventtype: 'eventtype',
  theme: 'theme',
  facility: 'facility',
} as const;
