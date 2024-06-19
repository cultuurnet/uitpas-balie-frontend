/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { CommonDescriptionLocalized } from './commonDescriptionLocalized';

/**
 * A human-readable, internationalized description of the [organizer](./models/organizer.json).

Requires at least one value, for the language specified in the [mainLanguage](./models/organizer-mainLanguage.json) property.
 */
export interface OrganizerDescription {
  /** A human-readable description in the `de` (German) language. */
  de?: CommonDescriptionLocalized;
  /** A human-readable description in the `en` (English) language. */
  en?: CommonDescriptionLocalized;
  /** A human-readable description in the `fr` (French) language. */
  fr?: CommonDescriptionLocalized;
  /** A human-readable description in the `nl` (Dutch) language. */
  nl?: CommonDescriptionLocalized;
}
