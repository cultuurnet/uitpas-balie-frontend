/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */

/**
 * Indicates if the [event](./models/event.json) is happening online, offline, or both (mixed).
 */
export type EventAttendanceMode = typeof EventAttendanceMode[keyof typeof EventAttendanceMode];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const EventAttendanceMode = {
  online: 'online',
  offline: 'offline',
  mixed: 'mixed',
} as const;
