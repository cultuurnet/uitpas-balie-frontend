/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { EventCalendarPut } from './eventCalendarPut';
import type { EventLocation } from './eventLocation';
import type { EventMainLanguage } from './eventMainLanguage';
import type { EventName } from './eventName';
import type { EventPostDeprecatedType } from './eventPostDeprecatedType';

export interface EventPostDeprecated {
  /** Calendar info for the event. */
  calendar: EventCalendarPut;
  location: EventLocation;
  mainLanguage: EventMainLanguage;
  name: EventName;
  /** The term (type) used to categorize the event. Terms are pre-defined and can be found using our [guide about taxonomy terms](../docs/taxonomy-api/terms.md). */
  type: EventPostDeprecatedType;
}
