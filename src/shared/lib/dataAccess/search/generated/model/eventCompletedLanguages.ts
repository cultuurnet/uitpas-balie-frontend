/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { EventCompletedLanguagesItem } from './eventCompletedLanguagesItem';

/**
 * List of languages that _every_ localizable property on the [event](./models/event.json) is available in.

Added automatically by UiTdatabank based on the languages present in localized properties.

See also [languages](./models/event-languages.json).
 * @minItems 1
 */
export type EventCompletedLanguages = readonly EventCompletedLanguagesItem[];
