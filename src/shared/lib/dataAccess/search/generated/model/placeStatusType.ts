/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
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
