export const clientRoutes = {
  login: () => `/mobile/login`,
  counters: () => `/mobile/counters`,
  activities: (counterId: string) => `/mobile/counters/${counterId}/activities`,
  identification: (counterId: string, activityId: string) =>
    `/mobile/counters/${counterId}/activities/${activityId}/identification`,
  scan: (counterId: string, activityId: string, firstCardEntry = true) =>
    `/mobile/counters/${counterId}/activities/${activityId}/identification/scan?${
      firstCardEntry ? '&firstCardEntry=true' : ''
    }`,
  saving: (
    counterId: string,
    activityId: string,
    code: string,
    cardType: 'insz' | 'uitpas' = 'uitpas',
    firstCardEntry = true,
  ) =>
    `/mobile/counters/${counterId}/activities/${activityId}/saving?${cardType}=${code}${
      firstCardEntry ? '&firstCardEntry=true' : ''
    }`,
};
