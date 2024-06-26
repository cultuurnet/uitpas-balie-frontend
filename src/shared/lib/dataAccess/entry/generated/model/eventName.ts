/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { CommonNameLocalized } from './commonNameLocalized';

/**
 * The human-readable, localized name of the [event](./models/event.json).

Requires at least one value, for the language specified in the [mainLanguage](./models/event-mainLanguage.json) property.
 * @minLength 1
 * @maxLength 90
 */
export interface EventName {
  /** A human-readable name in the `de` (German) language. */
  de?: CommonNameLocalized;
  /** A human-readable name in the `en` (English) language. */
  en?: CommonNameLocalized;
  /** A human-readable name in the `fr` (French) language. */
  fr?: CommonNameLocalized;
  /** A human-readable name in the `nl` (Dutch) language. */
  nl?: CommonNameLocalized;
}
