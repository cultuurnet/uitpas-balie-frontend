/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */

/**
 * Indicates whether the event or place is accessible to `everyone`, `members` only, or `education` only.
 */
export type EventAudienceAudienceType = typeof EventAudienceAudienceType[keyof typeof EventAudienceAudienceType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const EventAudienceAudienceType = {
  everyone: 'everyone',
  members: 'members',
  education: 'education',
} as const;
