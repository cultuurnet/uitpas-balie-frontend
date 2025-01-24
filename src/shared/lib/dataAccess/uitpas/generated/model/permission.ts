/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */

export type Permission = typeof Permission[keyof typeof Permission];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Permission = {
  TARIFFS_READ: 'TARIFFS_READ',
  TICKETSALES_SEARCH: 'TICKETSALES_SEARCH',
  TICKETSALES_REGISTER: 'TICKETSALES_REGISTER',
  EVENTS_UPDATE: 'EVENTS_UPDATE',
  EVENTS_READ: 'EVENTS_READ',
  CHECKINS_WRITE: 'CHECKINS_WRITE',
  ORGANIZERS_SEARCH: 'ORGANIZERS_SEARCH',
  ORGANIZERS_REPORTS: 'ORGANIZERS_REPORTS',
  PASSHOLDERS_PICTURE_READ: 'PASSHOLDERS_PICTURE_READ',
  PASSHOLDERS_SEARCH: 'PASSHOLDERS_SEARCH',
  PASSHOLDERS_SEARCH_ALL: 'PASSHOLDERS_SEARCH_ALL',
  PASSHOLDERS_SEARCH_BY_ID: 'PASSHOLDERS_SEARCH_BY_ID',
  GROUPPASSES_SEARCH: 'GROUPPASSES_SEARCH',
  PASSHOLDERS_WRITE: 'PASSHOLDERS_WRITE',
  PASSHOLDERS_UPDATE: 'PASSHOLDERS_UPDATE',
  PASSHOLDERS_DELETE: 'PASSHOLDERS_DELETE',
  MEMBERSHIP_PRICES_READ: 'MEMBERSHIP_PRICES_READ',
  PASSES_READ: 'PASSES_READ',
  PASSES_INSZNUMBERS_READ: 'PASSES_INSZNUMBERS_READ',
  PASSES_CHIPNUMBERS_READ: 'PASSES_CHIPNUMBERS_READ',
  REWARDS_WRITE: 'REWARDS_WRITE',
  REWARDS_READ: 'REWARDS_READ',
  REWARDS_REDEEM: 'REWARDS_REDEEM',
  REWARDS_PASSHOLDERS_READ: 'REWARDS_PASSHOLDERS_READ',
  PASSHOLDERS_SELF_REGISTRATION: 'PASSHOLDERS_SELF_REGISTRATION',
  PASSHOLDERS_SELF_CHECKIN: 'PASSHOLDERS_SELF_CHECKIN',
  PASSHOLDERS_SELF_READ: 'PASSHOLDERS_SELF_READ',
  PASSHOLDERS_REGISTER_UITID: 'PASSHOLDERS_REGISTER_UITID',
  PASSHOLDERS_TRANSACTION_HISTORY: 'PASSHOLDERS_TRANSACTION_HISTORY',
  PASSHOLDERS_FAMILY_MEMBERS: 'PASSHOLDERS_FAMILY_MEMBERS',
  ORDERS_READ: 'ORDERS_READ',
  ORDERS_CREATE: 'ORDERS_CREATE',
  PERMISSIONS_READ: 'PERMISSIONS_READ',
  PERMISSIONS_WRITE: 'PERMISSIONS_WRITE',
  CARDS_READ: 'CARDS_READ',
} as const;
