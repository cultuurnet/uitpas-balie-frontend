/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { OfferCalendarSummaryDetailHtml } from './offerCalendarSummaryDetailHtml';
import type { OfferCalendarSummaryDetailText } from './offerCalendarSummaryDetailText';

/**
 * Contains all Dutch calendar summaries
 */
export interface OfferCalendarSummaryDetail {
  /** HTML represenation of the date of the event / place */
  html?: OfferCalendarSummaryDetailHtml;
  /** Textual represenation of the date of the event / place */
  text?: OfferCalendarSummaryDetailText;
}
