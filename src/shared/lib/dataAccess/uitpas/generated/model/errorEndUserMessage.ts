/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */

/**
 * A human-readable explanation of the problem, specifically for end-users, in one or more languages. Typically available for domain errors, but not for errors caused by a technical issue in the integration (for example invalid JSON syntax in a request body). An `nl` value is always provided, other languages may be provided depending on the API and its intended audience. When this property is included, it is strongly encouraged to show this to the end-user.
 */
export type ErrorEndUserMessage = {
  /** A human-readable explanation of the problem, specifically for end-users, localized in German. */
  de?: string;
  /** A human-readable explanation of the problem, specifically for end-users, localized in English. */
  en?: string;
  /** A human-readable explanation of the problem, specifically for end-users, localized in French. */
  fr?: string;
  /** A human-readable explanation of the problem, specifically for end-users, localized in Dutch. */
  nl: string;
};
