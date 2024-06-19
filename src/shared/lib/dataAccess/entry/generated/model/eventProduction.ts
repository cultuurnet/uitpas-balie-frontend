/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { CommonStringUuid } from './commonStringUuid';
import type { EventId } from './eventId';

/**
 * The production that the [event](./models/event.json) belongs to.

A production is a group of events that share the same subject but are taking place in different locations and/or are organized by different organizers.

For example a theatre show that is scheduled to be performed at different locations, or a movie that will be screened at different cinema's.
 */
export interface EventProduction {
  /** The unique id of the production, formatted as UUID. For example `10ce7cb1-7bc9-4ce4-a256-460f56c49965`. */
  readonly id: CommonStringUuid;
  /** A list of globally unique URIs of other events that are part of this production. See also [@id](./event-@id.json). Automatically added by UiTdatabank. */
  readonly otherEvents: EventId[];
  /**
   * The human-readable name of the production. Not localized but in the original language of the events. Automatically added by UiTdatabank.
   * @minLength 1
   */
  readonly title: string;
}
