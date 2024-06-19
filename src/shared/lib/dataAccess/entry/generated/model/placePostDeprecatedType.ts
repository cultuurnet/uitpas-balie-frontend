/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */

/**
 * The term (type) used to categorize the place. Terms are pre-defined and can be found using our [guide about taxonomy terms](../docs/taxonomy-api/terms.md).
 */
export type PlacePostDeprecatedType = {
  /** Unique id of the term (type). */
  id: string;
};
