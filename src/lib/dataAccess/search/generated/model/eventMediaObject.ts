/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { Image } from './image';

/**
 * A list of media objects related to the [event](./models/event.json), in reality always images but called mediaObject for backward compatibility. The main image of the event will always be set to the first image in this list when creating/updating an event with multiple images.
 */
export type EventMediaObject = Image[];
