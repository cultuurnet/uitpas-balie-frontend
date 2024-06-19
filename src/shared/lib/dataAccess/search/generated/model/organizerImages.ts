/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { Image } from './image';

/**
 * Describes an array of images that are linked to an [organizer](./models/organizer.json). The main image of the organizer will always be set to the first image in this list when creating/updating an organizer with multiple images.
 * @minItems 1
 */
export type OrganizerImages = Image[];
