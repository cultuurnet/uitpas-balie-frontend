/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */

/**
 * An organisation that partners with UiTPAS to provide discounts and/or rewards, and/or allows points to be collected at their events.
 */
export interface Organizer {
  /** Unique ID of an UiTPAS organizer. (Same as its ID in UiTdatabank) */
  id: string;
  /** Human-readable name of an UiTPAS organizer. */
  name?: string;
}
