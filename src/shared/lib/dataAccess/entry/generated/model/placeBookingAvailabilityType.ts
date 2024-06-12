/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
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