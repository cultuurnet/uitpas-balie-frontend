/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */

/**
 * List of contributors on a [place](./models/place.json). Only included if you request the place with an authenticated user who has the "Aanbod bewerken" permission on the place. [Here is a detailed guide](./entry-api/shared/contributors) with more information.
 */
export type PlaceContributors = string[];
