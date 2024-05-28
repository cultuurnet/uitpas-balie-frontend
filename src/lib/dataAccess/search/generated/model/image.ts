/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { CommonStringUri } from './commonStringUri';
import type { CommonStringUriReadOnly } from './commonStringUriReadOnly';
import type { CommonCopyrightHolder } from './commonCopyrightHolder';
import type { CommonStringUuid } from './commonStringUuid';
import type { CommonLanguage } from './commonLanguage';

export interface Image {
  /** The unique URI of the image resource, as included in the response of the image upload request. Not required if `id` is given. */
  '@id': CommonStringUri;
  /** URL of the image file. */
  contentUrl?: CommonStringUriReadOnly;
  /** Name of the copyright holder of the image. If omitted, the copyright holder that was given when the image was uploaded will be used. */
  copyrightHolder?: CommonCopyrightHolder;
  /** Description of the image object, in the language used in the `language` property of the image object. If omitted, the description that was given when the image was uploaded will be used. */
  description?: string;
  /** The unique UUID (generated by UiTdatabank) of the image. Can be used instead of `@id`. */
  id?: CommonStringUuid;
  /** Locale of text used in the image and its description. If omitted, the language that was given when the image was uploaded will be used. */
  inLanguage?: CommonLanguage;
  /** URL to a thumbnail image. */
  thumbnailUrl?: CommonStringUriReadOnly;
}
