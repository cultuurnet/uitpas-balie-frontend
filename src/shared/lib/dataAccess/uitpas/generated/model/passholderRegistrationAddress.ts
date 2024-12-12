/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */

/**
 * Address that the passholder to register lives at. Always present in responses. Passholders living outside of Belgium (usually near the border) will only have a `postalCode` and `city` in their address.
 */
export type PassholderRegistrationAddress = {
  /**
   * Postal box number. This field is deprecated and will be empty. The box number is part of the `street` property.
   * @deprecated
   */
  box?: string;
  /** Human-readable name of the municipality. */
  city: string;
  /** ISO 3166-1 alpha-2 country code. */
  country?: string;
  /**
   * House number. This field is deprecated and will be empty. The house number is part of the `street` property.
   * @deprecated
   */
  number?: string;
  /** Postal code of the municipality. */
  postalCode: string;
  /** Street name, number and optional box number of the address. */
  street?: string;
};