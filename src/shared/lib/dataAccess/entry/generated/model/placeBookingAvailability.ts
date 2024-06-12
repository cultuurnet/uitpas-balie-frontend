/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { PlaceBookingAvailabilityType } from './placeBookingAvailabilityType';

/**
 * Indicates whether the place still has tickets or reservations available. Currently only contains a `type` which can only be `Available` for places (as opposed to events that can also have `Unavailable` when sold out), as a place can never be completely sold out forever. Can later be expanded with more detailed info.
 */
export interface PlaceBookingAvailability {
  /** One of two possible types.

- `Available`:Tickets or reservations available
- `Unavailable`: No more tickets or reservations available. */
  type: PlaceBookingAvailabilityType;
}