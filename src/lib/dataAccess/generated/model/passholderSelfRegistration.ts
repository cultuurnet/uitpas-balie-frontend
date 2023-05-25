/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { CardSystem } from './cardSystem';
import type { Organizer } from './organizer';

export interface PassholderSelfRegistration {
  /** Last name of the new passholder. */
  name: string;
  /** First name of the new passholder. */
  firstName: string;
  /** Date that the new passholder was born. */
  dateOfBirth: string;
  /** Email address of the new passholder. Must be unique. */
  email?: string;
  /** Postal code of the Belgian municipality that the new passholder lives in. */
  postalCode: string;
  /** Human-readable name of the Belgian municipality that the new passholder lives in. */
  city: string;
  cardSystem: CardSystem;
  registrationOrganizer: Organizer;
}