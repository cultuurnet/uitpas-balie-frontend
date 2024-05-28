/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { PlaceCompletedLanguagesItem } from './placeCompletedLanguagesItem';

/**
 * List of languages that _every_ localizable property on the [place](./models/place.json) is available in.

Added automatically by UiTdatabank based on the languages present in localized properties.

See also [languages](./models/place-languages.json).
 */
export type PlaceCompletedLanguages = PlaceCompletedLanguagesItem[];
