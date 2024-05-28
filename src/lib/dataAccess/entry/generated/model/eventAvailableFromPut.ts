/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { CommonStringDatetime } from './commonStringDatetime';

export interface EventAvailableFromPut {
  /** The first date & time that the [event](./models/event.json) is allowed to be visible on publication channels.

Formatted as an ISO-8601 datetime. For example `2021-05-17T22:00:00+00:00`. */
  availableFrom: CommonStringDatetime;
}
