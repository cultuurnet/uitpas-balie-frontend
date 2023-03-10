/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */

/**
 * Transaction
 */
export interface Transaction {
  /** Title of the transaction */
  readonly title: string;
  /** Location of the transaction */
  readonly location: string;
  /** Creationdate of the transaction */
  readonly creationDate: string;
  /** Points of the transaction. Extra points (e.g. at check-in) are positive numbers. Used points (e.g. redeeming a reward) are negative numbers. */
  readonly points: number;
}
