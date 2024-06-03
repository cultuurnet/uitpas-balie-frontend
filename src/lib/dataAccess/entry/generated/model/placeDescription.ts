/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { CommonDescriptionLocalized } from './commonDescriptionLocalized';

/**
 * A human-readable, internationalized description of the [place](./models/place.json).

Requires at least one value, for the language specified in the [mainLanguage](./models/place-mainLanguage.json) property.
 */
export interface PlaceDescription {
  /** A human-readable description in the `de` (German) language. */
  de?: CommonDescriptionLocalized;
  /** A human-readable description in the `en` (English) language. */
  en?: CommonDescriptionLocalized;
  /** A human-readable description in the `fr` (French) language. */
  fr?: CommonDescriptionLocalized;
  /** A human-readable description in the `nl` (Dutch) language. */
  nl?: CommonDescriptionLocalized;
}