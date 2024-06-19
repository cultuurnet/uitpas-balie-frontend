/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */

export type EventPost201 = {
  /**
   * ID of the last internal command that was dispatched for this operation. Will be removed in the future.
   * @deprecated
   */
  commandId?: string;
  /**
   * Deprecated, use `id` instead.
   * @deprecated
   */
  eventId: string;
  /** UUID of the created event to use in subsequent requests or to store as a reference in your application. */
  id: string;
  /** URL of the created event to use in subsequent requests or to store as a reference in your application. */
  url: string;
};
