/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { GetPassholdersPassholderIdMembershipPricesCardSystemIdCardType } from './getPassholdersPassholderIdMembershipPricesCardSystemIdCardType';

export type GetPassholdersPassholderIdMembershipPricesCardSystemIdParams = {
/**
 * whether or not the user is entitled to a social tariff
 */
socialTariff?: boolean;
/**
 * optional voucher that might reduce the membership price
 */
voucher?: string;
/**
 * type of the card
 */
cardType: GetPassholdersPassholderIdMembershipPricesCardSystemIdCardType;
};
