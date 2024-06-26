/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { ReportPeriod } from './reportPeriod';
import type { ReportStatus } from './reportStatus';

/**
 * The status of a report export.
 */
export interface Report {
  /** Date that the report export was initially requested. */
  creationDate: string;
  /** Unique ID of the report export. Can be used to retrieve the status of the export. */
  id: number;
  /** Included if `status` is `FAILED`. Describes why it was not possible to export the report. */
  message?: string;
  period?: ReportPeriod;
  /** Whether the report has started (but not ready yet), is available for download, or failed to be created. */
  status: ReportStatus;
}
