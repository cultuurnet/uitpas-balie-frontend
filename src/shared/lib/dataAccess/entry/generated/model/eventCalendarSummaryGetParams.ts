/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { EventCalendarSummaryGetStyle } from './eventCalendarSummaryGetStyle';
import type { EventCalendarSummaryGetSize } from './eventCalendarSummaryGetSize';
import type { EventCalendarSummaryGetLanguage } from './eventCalendarSummaryGetLanguage';
import type { EventCalendarSummaryGetLangCode } from './eventCalendarSummaryGetLangCode';
import type { EventCalendarSummaryGetFormat } from './eventCalendarSummaryGetFormat';

export type EventCalendarSummaryGetParams = {
/**
 * Deprecated alternative to the `accept` header. Supported for backward compatibility.
 * @deprecated
 */
style?: EventCalendarSummaryGetStyle;
/**
 * Defines the size of the summary. Larger summaries contain more detail for events with multiple dates/hours but will also take up more space when shown in a UI. We recommend to use the format `md` for the search results (and `lg` for events with calendarType single), and to always use `lg` for the detailpage. In some cases (e.g. mobile apps) calendar summary `xs` can be useful.
 */
size?: EventCalendarSummaryGetSize;
/**
 * Defines the language that the summary will be written in. Also influences the date/time format used.
 */
language?: EventCalendarSummaryGetLanguage;
/**
 * Will hide past dates in summaries of events with multiple dates. By default, past dates are not excluded from the calendar summary.
 */
hidePast?: boolean;
/**
 * The timezone to format date/times in.
 */
timezone?: string;
/**
 * Deprecated alternative to the `language` query parameter. Supported for backward compatibility.
 * @deprecated
 */
langCode?: EventCalendarSummaryGetLangCode;
/**
 * Deprecated alternative to the `size` query parameter. Supported for backward compatibility.
 * @deprecated
 */
format?: EventCalendarSummaryGetFormat;
};
