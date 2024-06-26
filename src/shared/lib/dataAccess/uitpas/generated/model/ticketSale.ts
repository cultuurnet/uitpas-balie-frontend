/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { Passholder } from './passholder';
import type { Tariff } from './tariff';

/**
 * Model used both for registering new ticket sales and when searching for past ticket sales.

The `passholder` field is automatically included in responses if you have PASSHOLDERS_SEARCH permission. It is not required for ticket sale registrations.
 */
export interface TicketSale {
  /**
   * Id of the event that the ticket sale was for
   * @minLength 1
   */
  eventId: string;
  /** Unique id of a registered ticket sale. Not required for new ticket sale registrations */
  readonly id?: string;
  passholder?: Passholder;
  /** Regular price of the ticket before UiTPAS discounts */
  regularPrice: number;
  /** Optional descriptive label of the regular price. Used in financial reporting */
  regularPriceLabel?: string;
  tariff: Tariff;
  /**
   * Unique ID of the tariff that was paid for the ticket. (Deprecated, use `tariff.id` instead.)
   * @deprecated
   */
  tariffId?: string;
  /**
   * The passholder's UiTPAS number used to register this ticket sale. Note that the uitpasNumber of a passholder might change over time. This field will always contain the uitpasNumber used when registering the ticket sale. To identify the passholder, use the `passholder` field.
   * @minLength 1
   */
  uitpasNumber: string;
}
