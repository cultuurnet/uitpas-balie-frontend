/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { EventSubEventPatchItemBookingAvailabilityType } from './eventSubEventPatchItemBookingAvailabilityType';

/**
 * Indicates if the subEvent still has tickets or places available for booking.
 */
export type EventSubEventPatchItemBookingAvailability = {
  /** Required if `bookingAvailability` is included.
One of two possible status types.

- `Available`: The subEvent still has tickets or places available.
- `Unavailable`: The subEvent has no more tickets or places available. */
  type: EventSubEventPatchItemBookingAvailabilityType;
};
