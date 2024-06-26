/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { PassSocialTariffStatus } from './passSocialTariffStatus';

/**
 * Information about the possible social tariff of the passholder. This object is always present, however a passholder is only entitled to social tariff if the `status` property has value `ACTIVE`.
 */
export type PassSocialTariff = {
  /** Exact expiration date of the passholder's entitlement to a social tariff. This property must not be used to determine the social tariff status, because `status` can be `ACTIVE` while the `endDate` is in the past during a 'grace period'. This property is not available when status is `NONE`. */
  readonly endDate?: string;
  /** Status of the social tariff:
- `ACTIVE`: the passholder is entitled to social tariff
- `EXPIRED`: the passholder is NOT entitled to social tariff anymore
- `NONE`: the passholder is NOT entitled to social tariff */
  status: PassSocialTariffStatus;
};
