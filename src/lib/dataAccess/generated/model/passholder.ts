/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { CardSystemMembership } from "./cardSystemMembership";
import type { PassholderGender } from "./passholderGender";
import type { Organizer } from "./organizer";
import type { PassholderUitidStatus } from "./passholderUitidStatus";
import type { PassholderAddress } from "./passholderAddress";
import type { PassholderOptInPreferences } from "./passholderOptInPreferences";

/**
 * Person who holds an UiTPAS, the end-user of an UiTPAS. 

A `Passholder` can be identified by its `id`. However, there are cases where the passholder identifies using one of its UiTPAS numbers. That number is CardSystem specific, so it can be found under `cardSystemMemberships`. Every passholder should have at least one cardsystem membership.
 */
export interface Passholder {
  /** This field is always available in responses. */
  readonly id?: string;
  /** Last name of the passholder. */
  name: string;
  /** First name of the passholder. */
  firstName: string;
  /** Unique national (Belgian) INSZ number of an individual passholder to look up. */
  inszNumber?: string;
  /** This field is always available in responses. */
  readonly cardSystemMemberships?: CardSystemMembership[];
  /** Contact email address of the passholder. Not present for every passholder. Multiple passholders can have the same email address. */
  email?: string;
  /** This field is always available in responses. */
  readonly creationDate?: string;
  /** Date that the passholder was born. */
  dateOfBirth: string;
  /** Gender of the passholder. */
  gender?: PassholderGender;
  registrationOrganizer: Organizer;
  /** Amount of points the passholder has currently saved (and not used). This field is always available in responses. */
  readonly points?: number;
  /** Whether or not the passholder has a an UiTiD registered. This field is always available in responses. */
  readonly uitidStatus?: PassholderUitidStatus;
  /** Address that the passholder lives at. Always present in responses. Passholders living outside of Belgium (usually near the border) will only have a `postalCode` and `city` in their address. */
  address: PassholderAddress;
  /**
   * Postal code of the municipality that the passholder lives in. Deprecated in favor of `address.postalCode`
   * @deprecated
   */
  readonly postalCode?: string;
  /**
   * Name of the municipality that the passholder lives in. Deprecated in favor of `address.city`.
   * @deprecated
   */
  readonly city?: string;
  /** Phone number that the passholder has registered, for example for SMS alerts. */
  phoneNumber?: string;
  /** Permissions that the passholder has given to be contacted. */
  optInPreferences?: PassholderOptInPreferences;
  /** Human-readable name of the passholder's nationality. */
  nationality?: string;
  /** Only used in passholder registration. Set to true for under-aged passholder that have parental consent. */
  parentalConsent?: boolean;
  /** Only used in passholder registration. Set to true for passholders that received legal terms on paper. */
  legalTermsPaper?: boolean;
  /** Only used in passholder registration. Set to true for passholders that received legal terms digitally. */
  legalTermsDigital?: boolean;
  /** Only used in passholder registration. Set to the id of the card system of which the passholder has to become a member. */
  registrationCardSystemId?: number;
}
