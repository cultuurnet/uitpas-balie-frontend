/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { StartParameter } from './startParameter';
import type { LimitParameter } from './limitParameter';
import type { GetRewardsType } from './getRewardsType';
import type { GetRewardsFacetsItem } from './getRewardsFacetsItem';
import type { GetRewardsSortName } from './getRewardsSortName';
import type { GetRewardsSortCreationDate } from './getRewardsSortCreationDate';
import type { GetRewardsSortRedeemCount } from './getRewardsSortRedeemCount';
import type { GetRewardsSortFeatured } from './getRewardsSortFeatured';
import type { GetRewardsSortPoints } from './getRewardsSortPoints';
import type { GetRewardsCategoriesItem } from './getRewardsCategoriesItem';
import type { GetRewardsSubset } from './getRewardsSubset';
import type { GetRewardsStatus } from './getRewardsStatus';

export type GetRewardsParams = {
/**
 * Position to start returning results from. When set to `0` the results starting from the very first position will be returned. When set to for example `10` the results 0-9 will be skipped and the ones starting from position 10 will be returned. Can be used in combination with `limit` for pagination.
 */
start?: StartParameter;
/**
 * Maximum amount of results to return. Can be used in combination with `start` for pagination.
 */
limit?: LimitParameter;
/**
 * Include only rewards applicable for this organizer. Can be included more than once to allow multiple values.
 */
organizerId?: string[];
/**
 * Include only rewards applicable for organizers with this postal code. Can be included more than once to allow multiple values.
 */
organizerPostalCode?: string[];
/**
 * Include only rewards of this card system. Can be included more than once to allow multiple values.
 */
owningCardSystemId?: string[];
/**
 * Include only rewards applicable to passholders of this card system. Can be included more than once to allow multiple values.
 */
applicableCardSystemId?: string[];
/**
 * Include only rewards of this type. By default, this is set to `POINTS`. Use `ANY` to include rewards of any type.
 */
type?: GetRewardsType;
/**
 * Free text search in reward name, organizer or city.
 */
text?: string;
/**
 * Request facets of the given field in the response. Can be included more than once to allow multiple values.
 */
facets?: GetRewardsFacetsItem[];
/**
 * Sorts the rewards in a specific order. Possible values are: `name`, `creationdate`, `redeemCount`, `featured`, `points`. Multiple values can be combined in a comma separated string so the rewards are first sorted by the first field, then the second and so on. By default the sort uses ascending order. Descending order can be specified by including a `-` sign before the field that needs to be ordered descending. e.g. use `-redeemCount,points` to sort descending on redeemCount, and next ascending on `points`.
 */
sort?: string;
/**
 * Sorts the rewards by their name in ascending or descending order. This parameter is deprecated. Use the `sort` parameter for more advanced sorting options.
 * @deprecated
 */
'sort[name]'?: GetRewardsSortName;
/**
 * Sort on reward creation date. This parameter is deprecated. Use the `sort` parameter for more advanced sorting options.
 * @deprecated
 */
'sort[creationDate]'?: GetRewardsSortCreationDate;
/**
 * Sort on redeem count. This parameter is deprecated. Use the `sort` parameter for more advanced sorting options.
 * @deprecated
 */
'sort[redeemCount]'?: GetRewardsSortRedeemCount;
/**
 * Sort on featured. This parameter is deprecated. Use the `sort` parameter for more advanced sorting options.
 * @deprecated
 */
'sort[featured]'?: GetRewardsSortFeatured;
/**
 * Sort on reward points. This parameter is deprecated. Use the `sort` parameter for more advanced sorting options.
 * @deprecated
 */
'sort[points]'?: GetRewardsSortPoints;
/**
 * Include only rewards of this category. Can be included more than once to allow multiple values.
 */
categories?: GetRewardsCategoriesItem[];
/**
 * Include only rewards with this value (including) or more points.
 */
pointsFrom?: number;
/**
 * Include only rewards with this value (including) or less points.
 */
pointsTo?: number;
/**
 * Include only rewards of a specific subset. Defaults to `ENDUSERS`, which means all active rewards, that are currently published and in its redeem period and are part of a permanent cardsystem. Set this field to `ALL` to include all rewards.
 */
subset?: GetRewardsSubset;
/**
 * Include only rewards with the sport property true or false. If omitted, rewards with any sport value are included.
 */
sport?: boolean;
/**
 * Include only rewards with the forKids property true or false. If omitted, rewards with any forKids value are included.
 */
forKids?: boolean;
/**
 * Include only rewards with the featured property true or false. If omitted, rewards with any featured value are included.
 */
featured?: boolean;
/**
 * Include only rewards with the online property true or false. If omitted, rewards with any online value are included.
 */
online?: boolean;
/**
 * Include only rewards with the lastChance property true or false. If omitted, rewards with any lastChance value are included.
 */
lastChance?: boolean;
/**
 * Include only rewards with this status. Also set `subset=ALL` to include non-ACTIVE rewards.
 */
status?: GetRewardsStatus;
/**
 * Include only rewards that are redeemable by this passholder ID. This means the reward itself is within its redeem period, and all redeem constraints for the passholder are met. A client using this parameter needs `REWARDS_PASSHOLDERS_READ` permission.
 */
isRedeemableByPassholderId?: string;
/**
 * Include a list of suggested rewards based on the recent activity of this passholder ID. A client using this parameter needs `REWARDS_PASSHOLDERS_READ` permission.
 */
isInterestingForPassholderId?: string;
};
