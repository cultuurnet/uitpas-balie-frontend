/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */

/**
 * The last date & time that the [place](./models/place.json) is allowed to be visible on publication channels.

Added automatically by UiTdatabank based on either the [startDate](./models/place-startDate) or [endDate](./models/place-endDate.json) depending on the [event type](./models/place-terms.json).

Formatted as an ISO-8601 datetime. For example `2021-05-17T22:00:00+00:00`.
 */
export type PlaceAvailableTo = string;
