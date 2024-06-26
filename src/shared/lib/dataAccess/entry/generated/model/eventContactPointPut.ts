/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */

export interface EventContactPointPut {
  /**
   * List of email addresses for contact purposes (can be empty)
   * @minItems 0
   */
  email: string[];
  /**
   * List of phone numbers for contact purposes (can be empty)
   * @minItems 0
   */
  phone: string[];
  /**
   * List of URLs for contact purposes (can be empty)
   * @minItems 0
   */
  url: string[];
}
