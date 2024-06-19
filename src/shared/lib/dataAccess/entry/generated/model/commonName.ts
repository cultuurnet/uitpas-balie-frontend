/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { CommonNameLocalized } from './commonNameLocalized';

/**
 * Name of a tariff inside priceInfo. Required if category is set to `tariff`. For the `base` category UiTdatabank will set a default. Requires at least one value, for the language specified in the `mainLanguage` property. Names must be unique (per language) when using multiple tarrifs.
 */
export interface CommonName {
  /** A human-readable name in the `de` (German) language. */
  de?: CommonNameLocalized;
  /** A human-readable name in the `en` (English) language. */
  en?: CommonNameLocalized;
  /** A human-readable name in the `fr` (French) language. */
  fr?: CommonNameLocalized;
  /** A human-readable name in the `nl` (Dutch) language. */
  nl?: CommonNameLocalized;
}
