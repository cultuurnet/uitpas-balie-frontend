/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */

export type UserGet200 = {
  /** The email address of the user. */
  email: string;
  /**
   * Deprecated, use `uuid` instead.
   * @deprecated
   */
  id?: string;
  /**
   * Deprecated, use `username` instead.
   * @deprecated
   */
  nick?: string;
  /** The username of the user. */
  username: string;
  /** UUID of the user. */
  uuid: string;
};