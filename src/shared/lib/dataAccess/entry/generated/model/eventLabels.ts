/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { CommonLabel } from './commonLabel';

/**
 * One or more labels that categorize the [event](./models/event.json). Compared to [terms](./models/event-terms.json), labels do not have a defined set of possible values or a hierarchy.

Labels are allowed to be visible for end users on publication channels.

See [hiddenLabels](./models/event-hiddenLabels.json) for labels that should not be visible on publication channels.
 * @minItems 1
 */
export type EventLabels = CommonLabel[];
