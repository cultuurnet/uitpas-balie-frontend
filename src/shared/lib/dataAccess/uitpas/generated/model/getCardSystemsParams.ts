/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { StartParameter } from './startParameter';

export type GetCardSystemsParams = {
/**
 * Include only permanent (`true`) card systems or temporary (`false`) card systems.
 */
permanent?: boolean;
/**
 * Position to start returning results from. When set to `0` the results starting from the very first position will be returned. When set to for example `10` the results 0-9 will be skipped and the ones starting from position 10 will be returned. Can be used in combination with `limit` for pagination.
 */
start?: StartParameter;
/**
 * Maximum amount of results to return. Can be used in combination with `start` for pagination.
 */
limit?: number;
/**
 * Search card systems by city name. Can be included more than once to allow multiple values. Valid values can found in https://taxonomy.uitdatabank.be/api/city
 */
city?: string[];
/**
 * Search card systems by postal code. Can be included more than once to allow multiple values. Valid values can found in https://taxonomy.uitdatabank.be/api/city
 */
postalCode?: string[];
};
