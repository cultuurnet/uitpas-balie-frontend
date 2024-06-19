/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { OrganizerId } from './organizerId';

/**
 * A reference to an [organizer](./models/organizer.json) linked to the place. When writing a place it should only contain an `@id` property. When reading a place it will contain all the properties from the [organizer](./models/organizer.json).
 */
export interface PlaceOrganizer {
  '@id': OrganizerId;
}
