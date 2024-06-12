/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { Image } from './image';

/**
 * A list of media objects related to the [place](./models/place.json), in reality always images but called mediaObject for backward compatibility. The main image of the place will always be set to the first image in this list when creating/updating a place with multiple images.
 */
export type PlaceMediaObject = Image[];