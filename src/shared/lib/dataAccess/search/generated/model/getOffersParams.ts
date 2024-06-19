/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { TextParameter } from './textParameter';
import type { QParameter } from './qParameter';
import type { PostalCodeParameter } from './postalCodeParameter';
import type { AddressCountryParameter } from './addressCountryParameter';
import type { MaxAgeParameter } from './maxAgeParameter';
import type { MinAgeParameter } from './minAgeParameter';
import type { AllAgesParameter } from './allAgesParameter';
import type { AudienceTypeParameter } from './audienceTypeParameter';
import type { AvailableFromParameter } from './availableFromParameter';
import type { AvailableToParameter } from './availableToParameter';
import type { AttendanceModeParameter } from './attendanceModeParameter';
import type { BookingAvailabilityParameter } from './bookingAvailabilityParameter';
import type { CalendarTypeParameter } from './calendarTypeParameter';
import type { CreatedFromParameter } from './createdFromParameter';
import type { CreatedToParameter } from './createdToParameter';
import type { ModifiedFromParameter } from './modifiedFromParameter';
import type { ModifiedToParameter } from './modifiedToParameter';
import type { ContributorsParameter } from './contributorsParameter';
import type { CreatorParameter } from './creatorParameter';
import type { DateFromParameter } from './dateFromParameter';
import type { DateToParameter } from './dateToParameter';
import type { LocalTimeFromParameter } from './localTimeFromParameter';
import type { LocalTimeToParameter } from './localTimeToParameter';
import type { EmbedParameter } from './embedParameter';
import type { EmbedCalendarSummariesParameter } from './embedCalendarSummariesParameter';
import type { EmbedUitpasPricesParameter } from './embedUitpasPricesParameter';
import type { FacetsParameter } from './facetsParameter';
import type { GroupByParameter } from './groupByParameter';
import type { RegionsParameter } from './regionsParameter';
import type { CoordinatesParameter } from './coordinatesParameter';
import type { DistanceParameter } from './distanceParameter';
import type { BoundsParameter } from './boundsParameter';
import type { IdParameter } from './idParameter';
import type { IsDuplicateParameter } from './isDuplicateParameter';
import type { LocationIdParameter } from './locationIdParameter';
import type { OrganizerIdParameter } from './organizerIdParameter';
import type { LabelsParameter } from './labelsParameter';
import type { LocationLabelsParameter } from './locationLabelsParameter';
import type { OrganizerLabelsParameter } from './organizerLabelsParameter';
import type { MainLanguageParameter } from './mainLanguageParameter';
import type { LanguagesParameter } from './languagesParameter';
import type { CompletedLanguagesParameter } from './completedLanguagesParameter';
import type { HasMediaObjectsParameter } from './hasMediaObjectsParameter';
import type { PriceParameter } from './priceParameter';
import type { MinPriceParameter } from './minPriceParameter';
import type { MaxPriceParameter } from './maxPriceParameter';
import type { SortScoreParameter } from './sortScoreParameter';
import type { SortAvailableToParameter } from './sortAvailableToParameter';
import type { SortCreatedParameter } from './sortCreatedParameter';
import type { SortModifiedParameter } from './sortModifiedParameter';
import type { SortDistanceParameter } from './sortDistanceParameter';
import type { StatusParameter } from './statusParameter';
import type { TermIdsParameter } from './termIdsParameter';
import type { UitpasParameter } from './uitpasParameter';
import type { HasVideosParameter } from './hasVideosParameter';
import type { WorkflowStatusOfferParameter } from './workflowStatusOfferParameter';

export type GetOffersParams = {
/**
 * Free text search terms. Returns results that match all or some of the given terms. May contain `AND` and `OR` operators, and brackets for grouping. Can not filter on specific fields (contrary to the `q` parameter). Typically used to search on user-provided keywords.
 */
text?: TextParameter;
/**
 * An advanced query in Lucene syntax, allowing you to construct complex AND/OR filters on specific fields.
 */
q?: QParameter;
/**
 * Returns only results that have the exact same postal code in their address. Typically 4 digits for Belgian addresses but can also be a different format for international addresses.
 */
postalCode?: PostalCodeParameter;
/**
 * Returns only results that have the exact same country code in their address. Formatted as an [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. The default value can be disabled by setting the value to `*` or by using the `disableDefaultFilters` query parameter.
 */
addressCountry?: AddressCountryParameter;
/**
 * Returns only results that are targeted to participants/visitors of at most the given age (in years). The given age will be included in results.
 */
maxAge?: MaxAgeParameter;
/**
 * Returns only results that are targeted to participants/visitors of at least the given age (in years). The given age will be included in results.
 */
minAge?: MinAgeParameter;
/**
 * Returns only results that are suitable for participants/visitors of all ages if set to `true`, or only returns results that are suitable for a specific age group if set to `false`.
 */
allAges?: AllAgesParameter;
/**
 * Returns only results with the given enum value as their targeted audience. Results with audienceType `everyone` are targeted to any participant/visitor. Results with audienceType `members` are only targeted towards members of the organizer of the event. Results with audienceType `education` are targeted towards [CultuurKuur](https://www.cultuurkuur.be/).
 */
audienceType?: AudienceTypeParameter;
/**
 * Returns only results that should (still) be visible on online calendars after the given date-time. Defaults to the current date-time of the request. The default value can be disabled by setting the value to `*` or by using the `disableDefaultFilters` query parameter. See (the guide about default filters)[../docs/search-api/common-filters/default-filters.md] for more information.
 */
availableFrom?: AvailableFromParameter;
/**
 * Returns only results that should be visible on online calendars up until the given date-time. Defaults to the current date-time of the request. The default value can be disabled by setting the value to `*` or by using the `disableDefaultFilters` query parameter. See (the guide about default filters)[../docs/search-api/common-filters/default-filters.md] for more information.
 */
availableTo?: AvailableToParameter;
/**
 * Returns only results with the given enum value as their attendance mode. Results with attendanceMode `online` are only happening online (e.g. via a video stream). Results with attendanceMode `offline` are only happening on a physical location. Results with attendanceMode `mixed` can be attended both online or offline. Note that when filtering on `mixed`, _only_ results that are both happening online and offline will be included. Accepts multiple comma-separated values to return results that have one of the given attendance modes.
 */
attendanceMode?: AttendanceModeParameter;
/**
 * Returns only results with the given enum value as their bookingAvailability type. Results with bookingAvailability `Available` still have tickets/reservations available. Results with bookingAvailability `Unavailable` are sold out / fully booked.
 */
bookingAvailability?: BookingAvailabilityParameter;
/**
 * Returns only results with the given enum value as their calendarType. Accepts multiple comma-separated values to return results that have one of the given calendar types. [Here is a detailed guide](./entry-api/shared/calendar-info#calendartype) with more information.
 */
calendarType?: CalendarTypeParameter;
/**
 * Returns only results that were created at or after the given date-time.
 */
createdFrom?: CreatedFromParameter;
/**
 * Returns only results that were created at or before the given date-time.
 */
createdTo?: CreatedToParameter;
/**
 * Returns only results that were last modified at or after the given date-time. If the result has never been modified, the `created` date-time will be used as `modified` instead.
 */
modifiedFrom?: ModifiedFromParameter;
/**
 * Returns only results that were last modified at or before the given date-time. If the result has never been modified, the `created` date-time will be used as `modified` instead.
 */
modifiedTo?: ModifiedToParameter;
/**
 * Returns results for which a particular user / email address is a contributor
 */
contributors?: ContributorsParameter;
/**
 * Returns only results that have a creator with the given user identifier. Due to historic reasons and evolutions in the id management systems, a user identifier can be one of: a UUID (for creators that had an UiTiD v1), an Auth0 user id (for new UiTiD v2 creators), or in some very old cases even an email address or nickname. (No new events or places are created with an email address or nickname as creator.) Can also be a client id suffixed with `@clients` in the case of results created with a client access token instead of a user access token.
 */
creator?: CreatorParameter;
/**
 * Returns only events that are happening at some point after the given date-time, and places that are open at some point after the given date-time. Permanent events or places are always returned by this parameter.
 */
dateFrom?: DateFromParameter;
/**
 * Returns only events that are happening at some point before the given date-time, and places that are open at some point before the given date-time. Permanent events or places are always returned by this parameter.
 */
dateTo?: DateToParameter;
/**
 * Returns only events that are happening at some point after the given time, and places that are open at some point after the given time. Dates and timezones are not taken into account by this parameter. Permanent events or places are always returned by this parameter.
 */
localTimeFrom?: LocalTimeFromParameter;
/**
 * Returns only events that are happening at some point before the given time, and places that are open at some point before the given time. Dates and timezones are not taken into account by this parameter. Permanent events or places are always returned by this parameter.
 */
localTimeTo?: LocalTimeToParameter;
/**
 * Returns the results with the actual JSON bodies of the individual items
 */
embed?: EmbedParameter;
/**
 * Adds an extra `calendarSummary` property to the results that contains one or more formatted human-readable summaries of the date/time info of the result. May be repeated to include multiple summaries per result. See the operation's description above for more info on how to repeat parameters.
 */
'embedCalendarSummaries[]'?: EmbedCalendarSummariesParameter;
/**
 * Returns the results with the UiTPAS prices included (if applicable)
 */
embedUitpasPrices?: EmbedUitpasPricesParameter;
/**
 * Adds an extra `facet` property in the response with possible values for a given filter, and a prediction of the total results if applied. May be repeated to include facet counts for multiple filters. See the operation's description above for more info on how to repeat parameters. See (the guide about facets)[../docs/search-api/advanced/facets.md] for more information.
 */
'facets[]'?: FacetsParameter;
/**
 * Groups the results by their production. Grouping by productions ensures that for every production, only 1 event is returned in the search results
 */
groupBy?: GroupByParameter;
/**
 * Returns only results that are geographically located in the given region. Regions may be fetched programmatically from [https://search.uitdatabank.be/autocomplete.json](https://search.uitdatabank.be/autocomplete.json).
 */
'regions[]'?: RegionsParameter;
/**
 * A pair of latitude and longitude coordinates to find results that are located within a distance of the given geographical point. Must be used in combination with the `distance` parameter.
 */
coordinates?: CoordinatesParameter;
/**
 * Returns only results that are geographically located within the given distance from the `coordinates` parameter.
 */
distance?: DistanceParameter;
/**
 * Returns only results that are located in a specific geographical area defined by a pair of south-west coordinates and north-east coordinates. The two pairs of coordinates are separated by a pipe character (`|`).
 */
bounds?: BoundsParameter;
/**
 * Returns only results that have the exact same id. An id can be extracted from an event, place, or organizer URI by taking all the characters after the last `/`. For example for the URI `https://io.uitdatabank.be/event/75573a64-ddc8-4fd0-8b07-d258939dd74f` the id is `75573a64-ddc8-4fd0-8b07-d258939dd74f`. Note that while it will be a UUID in most cases, it is not guaranteed to always be one!
 */
id?: IdParameter;
/**
 * Returns only results that include or excludes duplicate places
 */
isDuplicate?: IsDuplicateParameter;
/**
 * Returns only results that are related to the given location id (= place id). A place's id can be extracted from its URI by taking all the characters after the last `/`. For example for the URI `https://io.uitdatabank.be/place/75573a64-ddc8-4fd0-8b07-d258939dd74f` the id is `75573a64-ddc8-4fd0-8b07-d258939dd74f`. Note that while it will be a UUID in most cases, it is not guaranteed to always be one!
 */
locationId?: LocationIdParameter;
/**
 * Returns only results that are related to the given organizer id. An organizer's id can be extracted from its URI by taking all the characters after the last `/`. For example for the URI `https://io.uitdatabank.be/organizer/75573a64-ddc8-4fd0-8b07-d258939dd74f` the id is `75573a64-ddc8-4fd0-8b07-d258939dd74f`. Note that while it will be a UUID in most cases, it is not guaranteed to always be one!
 */
organizerId?: OrganizerIdParameter;
/**
 * Returns only results that have the given label(s) in either their `labels` or `hiddenLabels` properties. May be repeated to only return results that have all the given labels. See the operation's description above for more info on how to repeat parameters.
 */
'labels[]'?: LabelsParameter;
/**
 * Returns only results that have the given label(s) in their location's `labels` or `hiddenLabels` properties. May be repeated to only return results with a location that has all the given labels. See the operation's description above for more info on how to repeat parameters.
 */
'locationLabels[]'?: LocationLabelsParameter;
/**
 * Returns only results that have the given label(s) in their organizer's `labels` or `hiddenLabels` properties. May be repeated to only return results with an organizer that has all the given labels. See the operation's description above for more info on how to repeat parameters.
 */
'organizerLabels[]'?: OrganizerLabelsParameter;
/**
 * Returns only results that have the given language code as their main (= original) language.
 */
mainLanguage?: MainLanguageParameter;
/**
 * Returns only results that have a localised value in the given language for one or more translatable fields like `name`. May be repeated to only return results that have localised values for all the given languages. See the operation's description above for more info on how to repeat parameters.
 */
'languages[]'?: LanguagesParameter;
/**
 * Returns only results that have a localised value in the given language for every translatable field. May be repeated to only return results that have localised values for all the given languages. See the operation's description above for more info on how to repeat parameters.
 */
'completedLanguages[]'?: CompletedLanguagesParameter;
/**
 * Returns only results that have one or more items inside their `mediaObject` property if set to `true`. Returns only results without `mediaObject` property if set to `false`.
 */
hasMediaObjects?: HasMediaObjectsParameter;
/**
 * Returns only results with exactly the same price for the base tariff (in EUR).
 */
price?: PriceParameter;
/**
 * Returns only results with a price for the base tariff that is equal to or higher than the given price (in EUR).
 */
minPrice?: MinPriceParameter;
/**
 * Returns only results with a price for the base tariff that is equal to or lower than the given price (in EUR).
 */
maxPrice?: MaxPriceParameter;
/**
 * Sorts the results by their score (relevance), either with the lowest score first (`asc`) or the highest score first (`desc`). See (the guide about sorting)[../docs/search-api/sorting.md] for more information.
 */
'sort[score]'?: SortScoreParameter;
/**
 * Sorts the results by their `availableTo` date-time, either with the oldest date-time first (`asc`) or the highest date-time first (`desc`). Most commonly used to show events and/or places that will end or become unavailable soon. See (the guide about sorting)[../docs/search-api/sorting.md] for more information.
 */
'sort[availableTo]'?: SortAvailableToParameter;
/**
 * Sorts the results by their `created` date-time, either with the oldest results first (`asc`) or the newest results first (`desc`). See (the guide about sorting)[../docs/search-api/sorting.md] for more information.
 */
'sort[created]'?: SortCreatedParameter;
/**
 * Sorts the results by their `modified` date-time, either with the least recently modified results first (`asc`) or the most recently modified results first (`desc`). See (the guide about sorting)[../docs/search-api/sorting.md] for more information.
 */
'sort[modified]'?: SortModifiedParameter;
/**
 * Sorts the results by their distance from the `coordinates` parameter. Can only be used if `coordinates` and `distance` are also set. You may use multiple sort parameters. See (the guide about sorting)[../docs/search-api/sorting.md] for more information.
 */
'sort[distance]'?: SortDistanceParameter;
/**
 * Returns only results with exactly the same status type as the given enum value. `Available` means an event is happening as planned, and a place can be visited during its normal opening hours. `TemporarilyUnavailable` means an event has been postponed to a later date (yet to be determined), and a place is temporarily closed (for example due to renovations). `Unavailable` means an event is cancelled, or a place is permanently closed. If combined with `dateFrom` and/or `dateTo`, only results that have the given status in that time period will be returned. Accepts multiple comma-separated values to return results that have one of the given status types.
 */
status?: StatusParameter;
/**
 * Returns only results that have the given term id(s) in either their `terms` property items. May be repeated to only return results that have all the given term ids. See the operation's description above for more info on how to repeat parameters.
 */
'termIds[]'?: TermIdsParameter;
/**
 * Returns only results that are related to UiTPAS if set to `true`. Returns only results that are not related to UiTPAS if set to `false`.
 */
uitpas?: UitpasParameter;
/**
 * Returns only results that have one or more items in their `videos` property if set to `true`. Returns only results that have no `videos` property if set to `false`.
 */
hasVideos?: HasVideosParameter;
/**
 * Returns only results with exactly the same workflow status as the given enum value. Accepts multiple comma-separated values to return results that have one of the given workflow statuses. Defaults to only return results that either have the workflow status `READY_FOR_VALIDATION` or `APPROVED`. The default value can be reset by setting the parameter to `*`. See (the guide about default filters)[../docs/search-api/common-filters/default-filters.md] for more information.
 */
workflowStatus?: WorkflowStatusOfferParameter;
};
