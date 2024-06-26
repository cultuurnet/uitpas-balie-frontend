/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { CommonStringUuid } from './commonStringUuid';

/**
 * Describes the request body to set an image as the main image of a [place](./models/place.json).
 */
export interface PlaceMainImagePut {
  /** The id of the image to set as main image on the place. */
  mediaObjectId: CommonStringUuid;
}
