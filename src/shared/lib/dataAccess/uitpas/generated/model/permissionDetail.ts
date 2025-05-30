/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { PermissionDetailId } from './permissionDetailId';
import type { PermissionDetailLabel } from './permissionDetailLabel';

/**
 * Permission details
 */
export interface PermissionDetail {
  /** ID of the permission */
  id: PermissionDetailId;
  /** Human-readable label of the permission */
  label?: PermissionDetailLabel;
}
