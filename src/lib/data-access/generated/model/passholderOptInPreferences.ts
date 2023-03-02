/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */

/**
 * Permissions that the passholder has given to be contacted.
 */
export type PassholderOptInPreferences = {
  /** Important information about the functionality of UiTPAS. */
  serviceMails: boolean;
  /** Notification when you reach an important UiTPAS milestone, for example a specific amount of points or an exclusive reward becomes available to you. */
  milestoneMails: boolean;
  /** Rewards, actions and events selected specifically for the passholder based on their UiTPAS history. */
  infoMails: boolean;
  /** Free (sporadic) SMS messages with rewards, actions and events selected specifically for the passholder based on their UiTPAS history. */
  sms: boolean;
  /** Sporadic post mail with information about UiTPAS. Will be sent to the passholder's postal address. */
  post: boolean;
};
