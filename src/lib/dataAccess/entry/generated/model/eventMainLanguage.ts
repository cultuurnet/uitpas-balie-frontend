/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */

/**
 * The main language that the [event](./models/event.json) is described in. All localized properties like [name](./models/event-name.json) and [description](./models/event-description.json) will be required to have at least a value for this language.

Can be one of `nl`, `fr`, `de`, or `en`.
 */
export type EventMainLanguage = typeof EventMainLanguage[keyof typeof EventMainLanguage];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const EventMainLanguage = {
  nl: 'nl',
  fr: 'fr',
  de: 'de',
  en: 'en',
} as const;
