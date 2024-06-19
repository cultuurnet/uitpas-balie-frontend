/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import {
  useInfiniteQuery,
  useMutation,
  useQuery
} from '@tanstack/react-query'
import type {
  InfiniteData,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import axios from 'axios'
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import type {
  Error,
  EventCardSystem,
  ForbiddenResponse,
  UnauthorizedResponse
} from '.././model'



/**
 * Update the `EventCardSystem` objects of the given event.

The `EventCardSystem` object specifies that the event is available in
this specific card system and optionally what manual distribution keys are enabled.

This update is used to toggle the `enabled` state for specific card systems or distribution keys.

To update the `enabled` state for card systems or distribution keys, you typically retrieve the possible `EventCardSystem` objects first using  `GET /events/{eventId}/card-systems`. You can then reuse the response from the `GET` request, 
altering the `enabled` state. Note that you can also omit the name properties. 
Only the required fields are used in this update request.

However, in case you know the card system(s) and distribution key(s) in advance, you might also make this `PUT` request without prior `GET` e.g. in case you need to disable all card systems for an event, you can simply put an empty array `[]` to indicate that (missing card systems in the array will be treated the same way as card systems with `enabled: "false"`).
Also note the implementation of this `PUT` endpoint is robust enough to allow updating card systems before the event is known in UiTPAS. (so even before the `GET` returns a valid HTTP 200 response).


<!-- theme: warning -->

> **This endpoint is only needed for exceptional cases.** In most cases card systems and distribution keys are set automatically on events, so you don't need to retrieve or change them.

The caller of this request must have `EVENTS_UPDATE` permission for the organizer of this event or the caller of this request must have "Aanbod bewerken" permission in the UiTdatabank for the given event.

 * @summary Update event card systems
 */
export const putEventsCardSystems = (
    eventId: string,
    eventCardSystem: EventCardSystem[], options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    
    return axios.put(
      `NEXT_PUBLIC_API_PATH/events/${eventId}/card-systems`,
      eventCardSystem,options
    );
  }



export const getPutEventsCardSystemsMutationOptions = <TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putEventsCardSystems>>, TError,{eventId: string;data: EventCardSystem[]}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof putEventsCardSystems>>, TError,{eventId: string;data: EventCardSystem[]}, TContext> => {
const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putEventsCardSystems>>, {eventId: string;data: EventCardSystem[]}> = (props) => {
          const {eventId,data} = props ?? {};

          return  putEventsCardSystems(eventId,data,axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutEventsCardSystemsMutationResult = NonNullable<Awaited<ReturnType<typeof putEventsCardSystems>>>
    export type PutEventsCardSystemsMutationBody = EventCardSystem[]
    export type PutEventsCardSystemsMutationError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

    /**
 * @summary Update event card systems
 */
export const usePutEventsCardSystems = <TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putEventsCardSystems>>, TError,{eventId: string;data: EventCardSystem[]}, TContext>, axios?: AxiosRequestConfig}
): UseMutationResult<
        Awaited<ReturnType<typeof putEventsCardSystems>>,
        TError,
        {eventId: string;data: EventCardSystem[]},
        TContext
      > => {

      const mutationOptions = getPutEventsCardSystemsMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Get all (enabled and disabled) `EventCardSystem` objects of the given event.

The `EventCardSystem` object specifies that the event is available in
this specific card system and optionally what manual distribution keys are enabled.

Every `EventCardSystem` or `ManualDistributionKey` has an `enabled` property that can be altered using `PUT /events/{eventId}/card-systems`.
 
<!-- theme: warning -->

> **This endpoint is only needed for exceptional cases.** In most cases card systems and distribution keys are set automatically on events, so you don't need to retrieve or change them.

The caller of this request must have `EVENTS_READ` permission for the organizer of this event.

 * @summary Get event card systems
 */
export const getEventsCardSystems = (
    eventId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<EventCardSystem[]>> => {
    
    return axios.get(
      `NEXT_PUBLIC_API_PATH/events/${eventId}/card-systems`,options
    );
  }


export const getGetEventsCardSystemsQueryKey = (eventId: string,) => {
    return [`NEXT_PUBLIC_API_PATH/events/${eventId}/card-systems`] as const;
    }

    
export const getGetEventsCardSystemsInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getEventsCardSystems>>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>>(eventId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getEventsCardSystems>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetEventsCardSystemsQueryKey(eventId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getEventsCardSystems>>> = ({ signal }) => getEventsCardSystems(eventId, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(eventId), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getEventsCardSystems>>, TError, TData> & { queryKey: QueryKey }
}

export type GetEventsCardSystemsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getEventsCardSystems>>>
export type GetEventsCardSystemsInfiniteQueryError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>

/**
 * @summary Get event card systems
 */
export const useGetEventsCardSystemsInfinite = <TData = InfiniteData<Awaited<ReturnType<typeof getEventsCardSystems>>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>>(
 eventId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getEventsCardSystems>>, TError, TData>>, axios?: AxiosRequestConfig}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetEventsCardSystemsInfiniteQueryOptions(eventId,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetEventsCardSystemsQueryOptions = <TData = Awaited<ReturnType<typeof getEventsCardSystems>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>>(eventId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getEventsCardSystems>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetEventsCardSystemsQueryKey(eventId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getEventsCardSystems>>> = ({ signal }) => getEventsCardSystems(eventId, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(eventId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getEventsCardSystems>>, TError, TData> & { queryKey: QueryKey }
}

export type GetEventsCardSystemsQueryResult = NonNullable<Awaited<ReturnType<typeof getEventsCardSystems>>>
export type GetEventsCardSystemsQueryError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>

/**
 * @summary Get event card systems
 */
export const useGetEventsCardSystems = <TData = Awaited<ReturnType<typeof getEventsCardSystems>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>>(
 eventId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getEventsCardSystems>>, TError, TData>>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetEventsCardSystemsQueryOptions(eventId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



