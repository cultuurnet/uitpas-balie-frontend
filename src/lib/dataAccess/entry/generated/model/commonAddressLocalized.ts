/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */

/**
 * The address the place is located at, in the main language of the place.
 */
export interface CommonAddressLocalized {
  /** Country code in the ISO-3166 format. For example `BE`. */
  addressCountry: string;
  /** Municipality of the address in the relevant locale, for example `Brussel` for `nl` or `Bruxelles` for `fr`. */
  addressLocality: string;
  /** Postal code of the municipality, for example `1000`. Formatted as a string because some international postal codes use letters. */
  postalCode: string;
  /** Street address in the relevant locale, for example `Wetstraat 1` for `nl` or `Rue de la Loi 1` for `fr`. */
  streetAddress: string;
}
