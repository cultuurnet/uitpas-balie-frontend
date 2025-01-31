/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { CheckinStatusEndUserMessage } from './checkinStatusEndUserMessage';

export interface CheckinStatus {
  /** Indicates whether a checkin is currently possible. */
  allowed?: boolean;
  /** Optional property that, if provided, contains information for the end-user about why the checkin is currently not allowed. */
  endUserMessage?: CheckinStatusEndUserMessage;
}
