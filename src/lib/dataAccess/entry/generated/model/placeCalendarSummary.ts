/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { OfferCalendarSummaryDetail } from './offerCalendarSummaryDetail';

/**
 * Only visible when adding the extra `embedCalendarSummaries` property to the search query. This contains one or more formatted human-readable summaries of the date/time info of the result.
 */
export interface PlaceCalendarSummary {
  /** Contains all German calendar summaries */
  readonly de?: OfferCalendarSummaryDetail;
  /** Contains all English calendar summaries */
  readonly en?: OfferCalendarSummaryDetail;
  /** Contains all French calendar summaries */
  readonly fr?: OfferCalendarSummaryDetail;
  /** Contains all Dutch calendar summaries */
  readonly nl?: OfferCalendarSummaryDetail;
}