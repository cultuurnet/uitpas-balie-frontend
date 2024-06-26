/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { StatusParameterItem } from './statusParameterItem';

/**
 * Returns only results with exactly the same status type as the given enum value. `Available` means an event is happening as planned, and a place can be visited during its normal opening hours. `TemporarilyUnavailable` means an event has been postponed to a later date (yet to be determined), and a place is temporarily closed (for example due to renovations). `Unavailable` means an event is cancelled, or a place is permanently closed. If combined with `dateFrom` and/or `dateTo`, only results that have the given status in that time period will be returned. Accepts multiple comma-separated values to return results that have one of the given status types.
 */
export type StatusParameter = StatusParameterItem[];
