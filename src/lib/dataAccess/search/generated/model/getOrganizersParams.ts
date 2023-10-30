/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { QParameter } from './qParameter';
import type { NameParameter } from './nameParameter';
import type { WebsiteParameter } from './websiteParameter';
import type { IdParameter } from './idParameter';
import type { DomainParameter } from './domainParameter';
import type { PostalCodeParameter } from './postalCodeParameter';
import type { AddressCountryParameter } from './addressCountryParameter';
import type { CreatorParameter } from './creatorParameter';
import type { ContributorsParameter } from './contributorsParameter';
import type { FacetsParameter } from './facetsParameter';
import type { RegionsParameter } from './regionsParameter';
import type { CoordinatesParameter } from './coordinatesParameter';
import type { EmbedParameter } from './embedParameter';
import type { DistanceParameter } from './distanceParameter';
import type { BoundsParameter } from './boundsParameter';
import type { LabelsParameter } from './labelsParameter';
import type { HasImagesParameter } from './hasImagesParameter';
import type { WorkflowStatusOrganizerParameter } from './workflowStatusOrganizerParameter';
import type { SortScoreParameter } from './sortScoreParameter';
import type { SortCreatedParameter } from './sortCreatedParameter';
import type { SortModifiedParameter } from './sortModifiedParameter';

export type GetOrganizersParams = {
/**
 * An advanced query in Lucene syntax, allowing you to construct complex AND/OR filters on specific fields.
 */
q?: QParameter;
/**
 * Returns only results whose name autocompletes on the given name. For example searching for `pub` will return matches with `publiq` in the name.
 */
name?: NameParameter;
/**
 * Returns only results that have the given URL as their website. URLs in the query parameter and on the search results are normalized to reduce false negatives.
 */
website?: WebsiteParameter;
/**
 * Returns only results that have the exact same id. An id can be extracted from an event, place, or organizer URI by taking all the characters after the last `/`. For example for the URI `https://io.uitdatabank.be/event/75573a64-ddc8-4fd0-8b07-d258939dd74f` the id is `75573a64-ddc8-4fd0-8b07-d258939dd74f`. Note that while it will be a UUID in most cases, it is not guaranteed to always be one!
 */
id?: IdParameter;
/**
 * Returns only results that have a website on the given domain. Domains in the query parameter and on the search results are normalized to reduce false negatives.
 */
domain?: DomainParameter;
/**
 * Returns only results that have the exact same postal code in their address. Typically 4 digits for Belgian addresses but can also be a different format for international addresses.
 */
postalCode?: PostalCodeParameter;
/**
 * Returns only results that have the exact same country code in their address. Formatted as an [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. The default value can be disabled by setting the value to `*` or by using the `disableDefaultFilters` query parameter.
 */
addressCountry?: AddressCountryParameter;
/**
 * Returns only results that have a creator with the given user identifier. Due to historic reasons and evolutions in the id management systems, a user identifier can be one of: a UUID (for creators that had an UiTiD v1), an Auth0 user id (for new UiTiD v2 creators), or in some very old cases even an email address or nickname. (No new events or places are created with an email address or nickname as creator.) Can also be a client id suffixed with `@clients` in the case of results created with a client access token instead of a user access token.
 */
creator?: CreatorParameter;
/**
 * Returns results for which a particular user / email address is a contributor
 */
contributors?: ContributorsParameter;
/**
 * Adds an extra `facet` property in the response with possible values for a given filter, and a prediction of the total results if applied. May be repeated to include facet counts for multiple filters. See the operation's description above for more info on how to repeat parameters. See (the guide about facets)[../docs/search-api/advanced/facets.md] for more information.
 */
'facets[]'?: FacetsParameter;
/**
 * Returns only results that are geographically located in the given region. Regions may be fetched programmatically from [https://search.uitdatabank.be/autocomplete.json](https://search.uitdatabank.be/autocomplete.json).
 */
'regions[]'?: RegionsParameter;
/**
 * A pair of latitude and longitude coordinates to find results that are located within a distance of the given geographical point. Must be used in combination with the `distance` parameter.
 */
coordinates?: CoordinatesParameter;
/**
 * Returns the results with the actual JSON bodies of the individual items
 */
embed?: EmbedParameter;
/**
 * Returns only results that are geographically located within the given distance from the `coordinates` parameter.
 */
distance?: DistanceParameter;
/**
 * Returns only results that are located in a specific geographical area defined by a pair of south-west coordinates and north-east coordinates. The two pairs of coordinates are separated by a pipe character (`|`).
 */
bounds?: BoundsParameter;
/**
 * Returns only results that have the given label(s) in either their `labels` or `hiddenLabels` properties. May be repeated to only return results that have all the given labels. See the operation's description above for more info on how to repeat parameters.
 */
'labels[]'?: LabelsParameter;
/**
 * Returns only results that have one or more items inside their `images` property if set to `true`. Returns only results without `images` property if set to `false`.
 */
hasImages?: HasImagesParameter;
/**
 * Returns only results with exactly the same workflow status as the given enum value. Accepts multiple comma-separated values to return results that have one of the given workflow statuses. Defaults to only return results that have the workflow status `ACTIVE`. The default value can be reset by setting the parameter to `*`. See (the guide about default filters)[../docs/search-api/common-filters/default-filters.md] for more information.
 */
workflowStatus?: WorkflowStatusOrganizerParameter;
/**
 * Sorts the results by their score (relevance), either with the lowest score first (`asc`) or the highest score first (`desc`). See (the guide about sorting)[../docs/search-api/sorting.md] for more information.
 */
'sort[score]'?: SortScoreParameter;
/**
 * Sorts the results by their `created` date-time, either with the oldest results first (`asc`) or the newest results first (`desc`). See (the guide about sorting)[../docs/search-api/sorting.md] for more information.
 */
'sort[created]'?: SortCreatedParameter;
/**
 * Sorts the results by their `modified` date-time, either with the least recently modified results first (`asc`) or the most recently modified results first (`desc`). See (the guide about sorting)[../docs/search-api/sorting.md] for more information.
 */
'sort[modified]'?: SortModifiedParameter;
};
