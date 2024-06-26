/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { EventCalendarPutDeprecated } from './eventCalendarPutDeprecated';
import type { EventMajorInfoPutBodyLocation } from './eventMajorInfoPutBodyLocation';

export type EventMajorInfoPutBody = {
  calendar: EventCalendarPutDeprecated;
  /** Reference to the location that the event is taking place at. */
  location: EventMajorInfoPutBodyLocation;
  /** A human-readable name in the main language of the event. */
  name: string;
  /** The `theme` term used to categorize the event. Terms are pre-defined and can be browsed in our [guide about taxonomy terms](../docs/taxonomy-api/terms.md). */
  theme?: string;
  /** The `eventtype` term used to categorize the event. Terms are pre-defined and can be browsed in our [guide about taxonomy terms](../docs/taxonomy-api/terms.md). */
  type: string;
};
