/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { CommonLabel } from './commonLabel';

/**
 * Same as [labels](./models/organizer-labels.json), but for labels that should not be visible for end users on publication channels and should instead only be used for filtering or other processing.

Labels must match the `^(?=.{2,255}$)(?=.*\S.*\S.*)[^;]*$` pattern.
 * @minItems 1
 */
export type OrganizerHiddenLabels = CommonLabel[];
