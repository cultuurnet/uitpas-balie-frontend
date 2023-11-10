/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { CommonStringUri } from './commonStringUri';
import type { PlaceBookingInfoUrlLabel } from './placeBookingInfoUrlLabel';

/**
 * Booking info of the [place](./models/place.json), containing one or more phone numbers, email addresses, and/or website URLs. [Here is a detailed guide](./entry-api/shared/booking-and-contact-info#contactpoint) with more information.
 */
export interface PlaceBookingInfo {
  /** The date & time when the booking period ends */
  availabilityEnds?: string;
  /** The date & time when the booking period starts */
  availabilityStarts?: string;
  /** Email address for booking purposes. */
  email?: string;
  /** Phone number for booking purposes. */
  phone?: string;
  /** URL to a website for booking purposes. */
  url?: CommonStringUri;
  /** Call-to-action text to show for the link to the booking url. See [our suggested values](./entry-api/shared/booking-and-contact-info#urllabel). */
  urlLabel?: PlaceBookingInfoUrlLabel;
}
