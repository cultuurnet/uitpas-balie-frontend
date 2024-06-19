/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { EventCardSystemManualDistributionKeysItem } from './eventCardSystemManualDistributionKeysItem';

/**
 * CardSystem in an event context, optionally including manual distributionKeys.

This model is only used in the GET and PUT `/events/{eventId}/card-systems` to configure the card systems and distribution keys for an event.

<!-- theme: warning -->

> **This model and corresponding endpoints are only needed for exceptional cases.** In most cases card systems and distribution keys are set automatically on events, so you don't need to retrieve or change them.

 */
export interface EventCardSystem {
  /** State of this card system for the event. */
  enabled: boolean;
  /** ID of the card system */
  id: number;
  /** List of distribution keys, used to determine the price of discounted UiTPAS tariffs, which can be enabled or disabled manually for the event. */
  manualDistributionKeys?: EventCardSystemManualDistributionKeysItem[];
  /** Name of the card system */
  name?: string;
}
