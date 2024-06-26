/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { PassMessagesItem } from './passMessagesItem';
import type { PassSocialTariff } from './passSocialTariff';

/**
 * The `Pass` entity includes basic information about the UiTPAS and its related `Passholder`.  
 */
export interface Pass {
  /** First name of the passholder. */
  readonly firstName: string;
  /** Message that, if present, must be displayed to the user */
  readonly messages?: readonly PassMessagesItem[];
  /** ID of the passholder associated with this pass */
  readonly passholderId: string;
  /** Number of points of the passholder of this pass */
  readonly points: number;
  /** Postal code of the passholder of this pass */
  readonly postalCode: string;
  /** Information about the possible social tariff of the passholder. This object is always present, however a passholder is only entitled to social tariff if the `status` property has value `ACTIVE`. */
  readonly socialTariff: PassSocialTariff;
  /** UiTPAS number of this pass */
  readonly uitpasNumber: string;
}
