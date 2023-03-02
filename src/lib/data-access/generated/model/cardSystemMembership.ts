/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { CardSystem } from "./cardSystem";
import type { CardSystemMembershipStatus } from "./cardSystemMembershipStatus";
import type { CardSystemMembershipSocialTariff } from "./cardSystemMembershipSocialTariff";

/**
 * Membership info of an individual passholder in a specific card system.
 */
export interface CardSystemMembership {
  cardSystem: CardSystem;
  /** The UiTPAS number of the card that is linked to this card system membership. It is possible to have a CardSystemMembership without a card. However, a passholder always has at least one CardSystemMembership with a card. */
  uitpasNumber?: string;
  /** Whether the membership is active or blocked. */
  readonly status?: CardSystemMembershipStatus;
  /** If the passholder has right to a social tariff, this object contains details like the end date. */
  socialTariff?: CardSystemMembershipSocialTariff;
}
