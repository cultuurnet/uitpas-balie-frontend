/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { CommonStringUri } from './commonStringUri';

/**
 * Contact info of the [place](./models/place.json), containing one or more phone numbers, email addresses, and/or website URLs. [Here is a detailed guide](./entry-api/shared/booking-and-contact-info#contactpoint) with more information.
 */
export interface PlaceContactPoint {
  /**
   * List of email addresses for contact purposes (can be empty)
   * @minItems 0
   */
  email?: string[];
  /**
   * List of phone numbers for contact purposes (can be empty)
   * @minItems 0
   */
  phone?: string[];
  /**
   * List of URLs for contact purposes (can be empty)
   * @minItems 0
   */
  url?: CommonStringUri[];
}
