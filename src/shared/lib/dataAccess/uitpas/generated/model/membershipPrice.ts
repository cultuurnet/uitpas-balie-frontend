/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */

/**
 * The MembershipPrice describes the price an UiTPAS membership in a specific cardsystem for a new or existing passholder.  
 */
export interface MembershipPrice {
  /** Description of the price that can be displayed to the end-user. */
  description: string;
  /** Label of the price that can be displayed to the end-user. */
  label: string;
  /** Price for the card system membership, in euro. */
  price: number;
}
