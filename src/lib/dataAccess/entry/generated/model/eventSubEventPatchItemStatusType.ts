/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */

/**
 * Required if `status` is included.
One of three possible status types.

- `Available`: The subEvent is happening as scheduled
- `TemporarilyUnavailable`: The subEvent will be postponed
- `Unavailable`: The subEvent is permanently cancelled
 */
export type EventSubEventPatchItemStatusType = typeof EventSubEventPatchItemStatusType[keyof typeof EventSubEventPatchItemStatusType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const EventSubEventPatchItemStatusType = {
  Available: 'Available',
  TemporarilyUnavailable: 'TemporarilyUnavailable',
  Unavailable: 'Unavailable',
} as const;