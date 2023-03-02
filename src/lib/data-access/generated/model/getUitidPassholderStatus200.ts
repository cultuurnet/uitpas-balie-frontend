/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { GetUitidPassholderStatus200State } from "./getUitidPassholderStatus200State";

export type GetUitidPassholderStatus200 = {
  /** UiTPAS number of the validated passholder */
  readonly uitpasNumber: string;
  /** Optionally email address of the validated passholder */
  readonly email?: string;
  /** State of the passholder */
  readonly state: GetUitidPassholderStatus200State;
};
