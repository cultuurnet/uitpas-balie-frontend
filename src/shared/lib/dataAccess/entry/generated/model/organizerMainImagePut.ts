/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { CommonStringUuid } from './commonStringUuid';

export interface OrganizerMainImagePut {
  /** The id of the image to set as main image on the organizer. */
  imageId: CommonStringUuid;
}