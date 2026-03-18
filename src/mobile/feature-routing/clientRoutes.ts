export const clientRoutes = {
  login: () => `/mobile/login`,
  organizers: () => `/mobile/organizers`,
  activities: (organizerId: string) =>
    `/mobile/organizers/${organizerId}/activities`,
  identification: (organizerId: string, activityId: string) =>
    `/mobile/organizers/${organizerId}/activities/${activityId}/identification`,
  scan: (organizerId: string, activityId: string, firstCardEntry = true) =>
    `/mobile/organizerId/${organizerId}/activities/${activityId}/identification/scan?${
      firstCardEntry ? '&firstCardEntry=true' : ''
    }`,
  saving: (
    organizerId: string,
    activityId: string,
    code: string,
    cardType: 'insz' | 'uitpas' = 'uitpas',
    firstCardEntry = true,
  ) =>
    `/mobile/organizers/${organizerId}/activities/${activityId}/saving?${cardType}=${code}${
      firstCardEntry ? '&firstCardEntry=true' : ''
    }`,
};
