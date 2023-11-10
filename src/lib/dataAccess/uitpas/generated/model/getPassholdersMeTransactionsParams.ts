/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { StartParameter } from './startParameter';
import type { LimitParameter } from './limitParameter';
import type { GetPassholdersMeTransactionsSortCreationDate } from './getPassholdersMeTransactionsSortCreationDate';

export type GetPassholdersMeTransactionsParams = {
/**
 * Position to start returning results from. When set to `0` the results starting from the very first position will be returned. When set to for example `10` the results 0-9 will be skipped and the ones starting from position 10 will be returned. Can be used in combination with `limit` for pagination.
 */
start?: StartParameter;
/**
 * Maximum amount of results to return. Can be used in combination with `start` for pagination.
 */
limit?: LimitParameter;
/**
 * Sorts the transactions by creationDate in ascending or descending order.
 */
'sort[creationDate]'?: GetPassholdersMeTransactionsSortCreationDate;
};
