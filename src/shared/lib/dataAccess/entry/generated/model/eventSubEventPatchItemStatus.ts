/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { EventSubEventPatchItemStatusReason } from './eventSubEventPatchItemStatusReason';
import type { EventSubEventPatchItemStatusType } from './eventSubEventPatchItemStatusType';

/**
 * Indicates if the subEvent is still happening as scheduled or not.
 */
export type EventSubEventPatchItemStatus = {
  /** The reason of the status on the event, as a localized human-readable text. */
  reason?: EventSubEventPatchItemStatusReason;
  /** Required if `status` is included.
One of three possible status types.

- `Available`: The subEvent is happening as scheduled
- `TemporarilyUnavailable`: The subEvent will be postponed
- `Unavailable`: The subEvent is permanently cancelled */
  type: EventSubEventPatchItemStatusType;
};
