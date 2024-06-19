/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */

/**
 * List of contributors on an [organizer](./models/organizer.json). Only included if you request the organizer with an authenticated user who has the "Aanbod bewerken" permission on the organizer.  [Here is a detailed guide](./entry-api/shared/contributors) with more information.
 * @minItems 0
 */
export type OrganizerContributors = readonly string[];
