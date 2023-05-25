/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { Passholder } from './passholder';

/**
 * Paginated response object for passholders
 */
export interface PassholdersPaginatedResponse {
  /** Total amount of passholder results (can be more than the amount of results in the response). */
  totalItems?: number;
  /** List of passholder results for this specific (paginated) request. */
  member?: Passholder[];
}