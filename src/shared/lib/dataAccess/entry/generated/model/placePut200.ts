/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */

export type PlacePut200 = {
  /**
   * ID of the last internal command that was dispatched for this operation. Will be removed in the future.
   * @deprecated
   */
  commandId?: string;
  /** The id of the updated place. */
  id: string;
  /**
   * The id of the updated place (deprecated and replaced with `id`).
   * @deprecated
   */
  placeId: string;
  /** The url of the JSON-LD representation of the updated place. */
  url: string;
};
