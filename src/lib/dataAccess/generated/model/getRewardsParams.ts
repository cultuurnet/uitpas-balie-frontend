/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { StartParameter } from "./startParameter";
import type { LimitParameter } from "./limitParameter";
import type { GetRewardsType } from "./getRewardsType";
import type { GetRewardsFacetsItem } from "./getRewardsFacetsItem";
import type { GetRewardsSortName } from "./getRewardsSortName";
import type { GetRewardsSortCreationDate } from "./getRewardsSortCreationDate";
import type { GetRewardsSortRedeemCount } from "./getRewardsSortRedeemCount";
import type { GetRewardsSortPoints } from "./getRewardsSortPoints";
import type { GetRewardsCategoriesItem } from "./getRewardsCategoriesItem";
import type { GetRewardsSubset } from "./getRewardsSubset";
import type { GetRewardsStatus } from "./getRewardsStatus";

export type GetRewardsParams = {
  start?: StartParameter;
  limit?: LimitParameter;
  organizerId?: string;
  owningCardSystemId?: string;
  type?: GetRewardsType;
  text?: string;
  facets?: GetRewardsFacetsItem[];
  "sort[name]"?: GetRewardsSortName;
  "sort[creationDate]"?: GetRewardsSortCreationDate;
  "sort[redeemCount]"?: GetRewardsSortRedeemCount;
  "sort[points]"?: GetRewardsSortPoints;
  categories?: GetRewardsCategoriesItem[];
  pointsFrom?: number;
  pointsTo?: number;
  subset?: GetRewardsSubset;
  sport?: boolean;
  forKids?: boolean;
  online?: boolean;
  lastChance?: boolean;
  status?: GetRewardsStatus;
};
