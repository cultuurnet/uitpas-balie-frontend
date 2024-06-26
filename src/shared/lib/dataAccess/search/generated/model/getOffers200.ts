/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { GetOffers200Facet } from './getOffers200Facet';
import type { GetOffers200MemberItem } from './getOffers200MemberItem';

export type GetOffers200 = {
  /** Facet counts per possible filter & value. */
  facet?: GetOffers200Facet;
  /** The amount of results that is being returned per page. */
  itemsPerPage: number;
  /** Search results (paginated). Note that the complete search results details will only be returned if `?embed=true` is used. Otherwise only the `@id` and `@type` will be returned. */
  member: GetOffers200MemberItem[];
  /** Total amount of results for the given query parameters. */
  totalItems: number;
};
