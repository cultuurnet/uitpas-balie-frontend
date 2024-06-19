/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { CommonAddressLocalized } from './commonAddressLocalized';

/**
 * The address the [organizer](./models/organizer.json) is located at. Localized because some parts like the municipality or street address can be different in Dutch, French, German and/or English.

Requires at least one locale, specifically the one defined in the [mainLanguage](./models/organizer-mainLanguage.json) of the organizer.

**Only add a localized version if it's an official variant!**
 */
export interface OrganizerAddress {
  /** An address in the `de` (German) language. */
  de?: CommonAddressLocalized;
  /** An address in the `en` (English) language. */
  en?: CommonAddressLocalized;
  /** An address in the `fr` (French) language. */
  fr?: CommonAddressLocalized;
  /** An address in the `nl` (Dutch) language. */
  nl?: CommonAddressLocalized;
}
