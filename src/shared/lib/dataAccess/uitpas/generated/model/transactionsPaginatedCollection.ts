/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { Transaction } from './transaction';

/**
 * Paginated response object for transactions
 */
export interface TransactionsPaginatedCollection {
  /** List of card system results for this specific (paginated) request. */
  member?: Transaction[];
  /** Total number of card system results (can be more than the amount of results in the response). */
  totalItems?: number;
}
