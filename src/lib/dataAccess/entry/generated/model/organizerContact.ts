/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { OrganizerContactItem } from './organizerContactItem';

/**
 * Contact info of the [organizer](./models/organizer.json) in a legacy format, containing one or more phone numbers, email addresses and/or website URLs.

A type is used to categories the kind of contact information. The type can be either: url, email or phone.
 */
export type OrganizerContact = OrganizerContactItem[];
