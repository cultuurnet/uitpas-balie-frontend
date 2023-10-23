/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { CommonStringUuidReadOnly } from './commonStringUuidReadOnly';
import type { CommonStringUriVideo } from './commonStringUriVideo';
import type { CommonStringUriReadOnly } from './commonStringUriReadOnly';
import type { CommonLanguage } from './commonLanguage';
import type { CommonCopyrightHolder } from './commonCopyrightHolder';

/**
 * A video object that is linked to an event or a place.
 */
export type EventVideosItem = {
  /** The unique id of the video, generated by UiTdatabank. */
  id?: CommonStringUuidReadOnly;
  url: CommonStringUriVideo;
  /** The url that can be used to embed the video inside an iFrame. */
  embedUrl?: CommonStringUriReadOnly;
  /** The language of the video.
Can be one of `nl`, `fr`, `de`, or `en`. */
  language: CommonLanguage;
  /** The copyright holder of the video source. */
  copyrightHolder?: CommonCopyrightHolder;
};
