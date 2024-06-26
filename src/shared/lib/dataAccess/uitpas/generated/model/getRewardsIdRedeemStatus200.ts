/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { GetRewardsIdRedeemStatus200Reason } from './getRewardsIdRedeemStatus200Reason';

export type GetRewardsIdRedeemStatus200 = {
  /** User readable message of the reason (only if redeemable if false) */
  readonly message?: string;
  /** If redeemable is false, this field contains the reason why:
- `INVALID_CARD`: the given `uitpasNumber` is not valid.
- `PASSHOLDER_VOLUME`: maximum number of times this reward can be redeemed per passholder has been reached.
- `PASSHOLDER_POINTS`: passholder does not have enough points to redeem this reward.
- `REWARD_PERIOD`: the current date is outside the redeemPeriod of this reward
- `REWARD_VOLUME`: maximum number of times this reward can be redeemed (in general) has been reached.
- `PASSHOLDER_APPLICABLE_CARDSYSTEMS`: the passholder is not a member of one of the applicable card systems of this reward.
- `PASSHOLDER_NO_ACTIVE_CARDSYSTEMS`: the passholder is not active or has no active card system memberships
 */
  reason?: GetRewardsIdRedeemStatus200Reason;
  /** Whether this reward can be redeemed by the given passholder. */
  readonly redeemable: boolean;
};
