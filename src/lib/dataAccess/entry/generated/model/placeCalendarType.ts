/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */

/**
 * Determines how long the [place](./models/place) exists.

Possible values: `periodic`, `permanent`.

- **periodic**: For places that only exist for a specific period. **Must** have a [startDate](./models/place-startDate.json) and [endDate](./models/place-endDate.json). Can optionally have [openingHours](./models/place-openingHours.json).

- **permanent**: For places that exist permanently. Can optionally have [openingHours](./models/place-openingHours.json). [Here is a detailed guide](./entry-api/shared/calendar-info#calendartype) with more information.
 */
export type PlaceCalendarType = typeof PlaceCalendarType[keyof typeof PlaceCalendarType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PlaceCalendarType = {
  periodic: 'periodic',
  permanent: 'permanent',
} as const;
