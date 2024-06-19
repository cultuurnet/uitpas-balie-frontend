/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { Tariff } from './tariff';
import type { TariffAvailibilityAllOf } from './tariffAvailibilityAllOf';

/**
 * The `TariffAvailibility` includes all information about the `Tariff`, which describes the discounted price a passholder has to pay for a given ticket, and the `remaining` number of tickets this passholder can buy for this event at this Tariff.
 */
export type TariffAvailibility = Tariff & TariffAvailibilityAllOf;
