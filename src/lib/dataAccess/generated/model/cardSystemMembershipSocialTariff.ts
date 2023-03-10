/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */

/**
 * If the passholder has right to a social tariff, this object contains details like the end date.
 */
export type CardSystemMembershipSocialTariff = {
  /** Exact moment that the passholder's right to a social tariff expires. */
  endDate: string;
  /** When the end date of the right to a social tariff has passed, the passholder may still be in a grace period that they can buy tickets at a social tariff until their right to a social tariff has been renewed. */
  inGracePeriod?: boolean;
  /** If true, the passholder's right to a social tariff has completely expired (the end date has passed and the passholder is no longer in a grace period). */
  expired?: boolean;
};
