/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */

/**
 * Geographic coordinates corresponding to the [address](./models/place-address.json) the place is located at. Calculated automatically by UiTdatabank.
 */
export interface PlaceGeo {
  /** A geographic coordinate that specifies the north–south position of a point on the Earth's surface from the equator to one of the poles. */
  readonly latitude: number;
  /** A geographic coordinate that specifies the east–west position of a point on the Earth's surface from Greenwich, England. */
  readonly longitude: number;
}
