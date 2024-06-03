/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */

/**
 * One of three possible status types.

- `Available`: Happening or open as scheduled
- `TemporarilyUnavailable`: Postponed or temporarily closed
- `Unavailable`: Cancelled or permanently closed
 */
export type PlaceStatusType = typeof PlaceStatusType[keyof typeof PlaceStatusType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PlaceStatusType = {
  Available: 'Available',
  TemporarilyUnavailable: 'TemporarilyUnavailable',
  Unavailable: 'Unavailable',
} as const;