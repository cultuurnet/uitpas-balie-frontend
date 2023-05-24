/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import axios from 'axios'
import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'
import {
  useQuery
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunction,
  UseQueryResult,
  QueryKey
} from '@tanstack/react-query'
import type {
  OrganizerPermissions,
  UnauthorizedResponse,
  ForbiddenResponse
} from '.././model'


/**
 * Lists the organizers that the current user or client (depending on the token) has access to. The possible permissions on each organizer can also differ (will be added later).
 * @summary Get permissions
 */
export const getPermissions = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<OrganizerPermissions[]>> => {
    return axios.get(
      `/permissions`,options
    );
  }


export const getGetPermissionsQueryKey = () => [`/permissions`];

    
export type GetPermissionsQueryResult = NonNullable<Awaited<ReturnType<typeof getPermissions>>>
export type GetPermissionsQueryError = AxiosError<UnauthorizedResponse | ForbiddenResponse>

export const useGetPermissions = <TData = Awaited<ReturnType<typeof getPermissions>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getPermissions>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetPermissionsQueryKey();

  


  const queryFn: QueryFunction<Awaited<ReturnType<typeof getPermissions>>> = ({ signal }) => getPermissions({ signal, ...axiosOptions });


  

  const query = useQuery<Awaited<ReturnType<typeof getPermissions>>, TError, TData>({ queryKey, queryFn, ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

