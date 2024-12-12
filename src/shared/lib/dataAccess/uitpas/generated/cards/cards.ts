/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import {
  useQuery
} from '@tanstack/react-query'
import type {
  QueryFunction,
  QueryKey,
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
  Card,
  Error,
  ForbiddenResponse,
  GetCardsParams,
  UnauthorizedResponse
} from '.././model'



/**
 * Retrieve card status for a given `uitpasNumber` or `chipNumber`.

The caller of this request must have `CARDS_READ` permission.
 * @summary Retrieve card status
 */
export const getCards = (
    params?: GetCardsParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Card>> => {
    
    return axios.get(
      `NEXT_PUBLIC_API_PATH/cards`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetCardsQueryKey = (params?: GetCardsParams,) => {
    return [`NEXT_PUBLIC_API_PATH/cards`, ...(params ? [params]: [])] as const;
    }

    
export const getGetCardsQueryOptions = <TData = Awaited<ReturnType<typeof getCards>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(params?: GetCardsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getCards>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetCardsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getCards>>> = ({ signal }) => getCards(params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getCards>>, TError, TData> & { queryKey: QueryKey }
}

export type GetCardsQueryResult = NonNullable<Awaited<ReturnType<typeof getCards>>>
export type GetCardsQueryError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

/**
 * @summary Retrieve card status
 */
export const useGetCards = <TData = Awaited<ReturnType<typeof getCards>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(
 params?: GetCardsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getCards>>, TError, TData>>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetCardsQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}


