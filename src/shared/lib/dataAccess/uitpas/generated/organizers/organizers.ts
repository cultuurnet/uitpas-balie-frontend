/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import { useQuery } from "@tanstack/react-query";
import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import axios from "axios";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import type {
  Error,
  ForbiddenResponse,
  GetOrganizersParams,
  OrganizersPaginatedResponse,
  UnauthorizedResponse,
} from "../model";

/**
 * Retrieve organizers based on search parameters.

The caller of this request must have `ORGANIZERS_SEARCH` permission for the given organizer.
 * @summary Get organizers
 */
export const getOrganizers = (
  params?: GetOrganizersParams,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<OrganizersPaginatedResponse>> => {
  return axios.get(`NEXT_PUBLIC_API_PATH/organizers`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getGetOrganizersQueryKey = (params?: GetOrganizersParams) => {
  return [
    `NEXT_PUBLIC_API_PATH/organizers`,
    ...(params ? [params] : []),
  ] as const;
};

export const getGetOrganizersQueryOptions = <
  TData = Awaited<ReturnType<typeof getOrganizers>>,
  TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>
>(
  params?: GetOrganizersParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getOrganizers>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetOrganizersQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getOrganizers>>> = ({
    signal,
  }) => getOrganizers(params, { signal, ...axiosOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getOrganizers>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetOrganizersQueryResult = NonNullable<
  Awaited<ReturnType<typeof getOrganizers>>
>;
export type GetOrganizersQueryError = AxiosError<
  Error | UnauthorizedResponse | ForbiddenResponse
>;

/**
 * @summary Get organizers
 */
export const useGetOrganizers = <
  TData = Awaited<ReturnType<typeof getOrganizers>>,
  TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>
>(
  params?: GetOrganizersParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getOrganizers>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetOrganizersQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};
