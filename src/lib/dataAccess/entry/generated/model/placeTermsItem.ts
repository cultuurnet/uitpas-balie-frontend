/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { PlaceTermsItemDomain } from './placeTermsItemDomain';

/**
 * A taxonomy term used to categorize places.

All places require exactly one term of the `eventtype` domain, and can optionally contain other terms.

When reading places, all properties will be available. When creating or updating places only the `id` is required to be included.
 */
export type PlaceTermsItem = {
  /** The domain of the term. Can be one of `eventtype` or `facility`. */
  domain?: PlaceTermsItemDomain;
  /** Unique id of the term. For example `0.14.0.0.0`. */
  id: string;
  /** Human-readable label of the term. Currently only available in Dutch. For example `Concert`. */
  label?: string;
};
