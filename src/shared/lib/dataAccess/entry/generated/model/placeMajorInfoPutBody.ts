/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { CommonAddressLocalized } from './commonAddressLocalized';
import type { PlaceCalendarPut } from './placeCalendarPut';

export type PlaceMajorInfoPutBody = {
  /** The address the place is located at, in the main language of the place. */
  address: CommonAddressLocalized;
  calendar: PlaceCalendarPut;
  /** A human-readable name in the main language of the place. */
  name: string;
  /** The `theme` term used to categorize the place. Terms are pre-defined and can be found using our [guide about taxonomy terms](../docs/taxonomy-api/terms.md). */
  theme?: string;
  /** The `eventtype` term used to categorize the place. Terms are pre-defined and can be found using our [guide about taxonomy terms](../docs/taxonomy-api/terms.md). */
  type: string;
};
