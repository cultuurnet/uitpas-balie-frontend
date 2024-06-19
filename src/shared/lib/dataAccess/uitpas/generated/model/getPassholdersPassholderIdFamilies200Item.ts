/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */

export type GetPassholdersPassholderIdFamilies200Item = {
  /** The email address of the main family member */
  readonly email?: string;
  /** The firstname of the main family member */
  readonly firstName: string;
  /** The creationdate of the current passholder in this family */
  readonly memberSince: string;
  /** The name of the main family member */
  readonly name: string;
  /** The passholder ID of the main family member */
  readonly passholderId: string;
};
