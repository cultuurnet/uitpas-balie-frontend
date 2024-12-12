/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */

/**
 * Address of the grouppass. Always present in responses.
 */
export type GrouppassAddress = {
  /** Human-readable name of the municipality. */
  city: string;
  /** ISO 3166-1 alpha-2 country code. */
  country?: string;
  /** Postal code of the municipality. */
  postalCode: string;
  /** Full street name, number and box of the grouppass */
  street?: string;
};
