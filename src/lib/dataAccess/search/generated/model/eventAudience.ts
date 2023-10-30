/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { EventAudienceAudienceType } from './eventAudienceAudienceType';

/**
 * Indicates the intended audience of the [event](./models/event.json).
 */
export interface EventAudience {
  /** Indicates whether the event or place is accessible to `everyone`, `members` only, or `education` only. */
  audienceType: EventAudienceAudienceType;
}
