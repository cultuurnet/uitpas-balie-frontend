/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { StartParameter } from './startParameter';
import type { LimitParameter } from './limitParameter';
import type { GetPassholdersSortName } from './getPassholdersSortName';

export type GetPassholdersParams = { inszNumber?: string; uitpasNumber?: string; chipNumber?: string; name?: string; firstName?: string; schoolId?: string; start?: StartParameter; limit?: LimitParameter; 'sort[name]'?: GetPassholdersSortName; organizerId?: string; dateOfBirthFrom?: string; dateOfBirthTo?: string };