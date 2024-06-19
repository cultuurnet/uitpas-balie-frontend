/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { EventSubEventItem } from './eventSubEventItem';

/**
 * A list of occurrences of the [event](./models/event.json) when using the `single` or `multiple` [calendarType](./models/event-calendarType.json).
 * @minItems 1
 */
export type EventSubEvent = EventSubEventItem[];
