/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { Reward } from "./reward";
import type { RedeemedRewardRedeemInfo } from "./redeemedRewardRedeemInfo";

export interface RedeemedReward {
  /** ID of the redeemed reward. */
  id: string;
  reward: Reward;
  /** Date of the redeem action. */
  redeemDate: string;
  /** Information about the redeem action. */
  redeemInfo?: RedeemedRewardRedeemInfo;
  /** Redeem code to show to the user who redeemed this reward. (Only applicable to certain rewards that are configured in the UiTPAS Card System admin) */
  redeemCode?: string;
}