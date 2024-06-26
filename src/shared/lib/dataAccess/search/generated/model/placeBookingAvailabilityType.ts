/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */

/**
 * One of two possible types.

- `Available`:Tickets or reservations available
- `Unavailable`: No more tickets or reservations available.
 */
export type PlaceBookingAvailabilityType = typeof PlaceBookingAvailabilityType[keyof typeof PlaceBookingAvailabilityType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PlaceBookingAvailabilityType = {
  Available: 'Available',
  Unavailable: 'Unavailable',
} as const;
