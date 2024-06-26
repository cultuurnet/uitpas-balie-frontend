/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { PlaceOpeningHoursItemDayOfWeekItem } from './placeOpeningHoursItemDayOfWeekItem';

export type PlaceOpeningHoursItem = {
  /**
   * Closing time on the related weekdays.
   * @pattern ^\d?\d:\d\d$
   */
  closes: string;
  /**
   * One or more weekdays that the open/closing times are applicable for.
   * @minItems 1
   */
  dayOfWeek: PlaceOpeningHoursItemDayOfWeekItem[];
  /**
   * Opening time on the related weekDays.
   * @pattern ^\d?\d:\d\d$
   */
  opens: string;
};
