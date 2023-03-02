/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */

/**
 * Severity level of the message
 */
export type PassMessagesItemLevel =
  (typeof PassMessagesItemLevel)[keyof typeof PassMessagesItemLevel];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PassMessagesItemLevel = {
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
} as const;
