/**
 * Generated by orval v6.19.1 🍺
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
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
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
  ForbiddenResponse,
  GetTariffsParams,
  GetTariffsStaticParams,
  GetTicketSalesParams,
  TariffsResponse,
  TicketSale,
  TicketSalesPaginatedResponse,
  UnauthorizedResponse
} from '.././model'

// https://stackoverflow.com/questions/49579094/typescript-conditional-types-filter-out-readonly-properties-pick-only-requir/49579497#49579497
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
T,
>() => T extends Y ? 1 : 2
? A
: B;

type WritableKeys<T> = {
[P in keyof T]-?: IfEquals<
  { [Q in P]: T[P] },
  { -readonly [Q in P]: T[P] },
  P
>;
}[keyof T];

type UnionToIntersection<U> =
  (U extends any ? (k: U)=>void : never) extends ((k: infer I)=>void) ? I : never;
type DistributeReadOnlyOverUnions<T> = T extends any ? NonReadonly<T> : never;

type Writable<T> = Pick<T, WritableKeys<T>>;
type NonReadonly<T> = [T] extends [UnionToIntersection<T>] ? {
  [P in keyof Writable<T>]: T[P] extends object
    ? NonReadonly<NonNullable<T[P]>>
    : T[P];
} : DistributeReadOnlyOverUnions<T>;




/**
 * Returns the possible UiTPAS discounted **tariffs for an event and a passholder**.

This UiTPAS tariffs are calculated based on:

- **The regular price** of the ticket.
This is the price your user would have to pay for the specific ticket without UiTPAS discount.
- **The UiTPAS number** of the passholder. UiTPAS discounts are personal so it's important to identify the passholder to retrieve a list of possible tariffs.
- **The event id** of the UiTdatabank event. UiTPAS discounts are limited to specific UiTdatabank events, so it's important to specify the event id to retrieve a list of possible tariffs.

> ##### Important
> The regular price of the ticket should generally be one of the price categories set on the event in UiTdatabank to make financial reporting clearer.

The caller of this request must have `TARIFFS_READ` permission for the organizer of the given event.
 * @summary Get tariffs
 */
export const getTariffs = (
    params: GetTariffsParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<TariffsResponse>> => {
    
    return axios.get(
      `NEXT_PUBLIC_API_PATH/tariffs`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetTariffsQueryKey = (params: GetTariffsParams,) => {
    
    return [`NEXT_PUBLIC_API_PATH/tariffs`, ...(params ? [params]: [])] as const;
    }

    
export const getGetTariffsInfiniteQueryOptions = <TData = Awaited<ReturnType<typeof getTariffs>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(params: GetTariffsParams, options?: { query?:UseInfiniteQueryOptions<Awaited<ReturnType<typeof getTariffs>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetTariffsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTariffs>>> = ({ signal }) => getTariffs(params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getTariffs>>, TError, TData> & { queryKey: QueryKey }
}

export type GetTariffsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getTariffs>>>
export type GetTariffsInfiniteQueryError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

/**
 * @summary Get tariffs
 */
export const useGetTariffsInfinite = <TData = Awaited<ReturnType<typeof getTariffs>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(
 params: GetTariffsParams, options?: { query?:UseInfiniteQueryOptions<Awaited<ReturnType<typeof getTariffs>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetTariffsInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

export const getGetTariffsQueryOptions = <TData = Awaited<ReturnType<typeof getTariffs>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(params: GetTariffsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getTariffs>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetTariffsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTariffs>>> = ({ signal }) => getTariffs(params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getTariffs>>, TError, TData> & { queryKey: QueryKey }
}

export type GetTariffsQueryResult = NonNullable<Awaited<ReturnType<typeof getTariffs>>>
export type GetTariffsQueryError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

/**
 * @summary Get tariffs
 */
export const useGetTariffs = <TData = Awaited<ReturnType<typeof getTariffs>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(
 params: GetTariffsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getTariffs>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetTariffsQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * Returns the **static** UiTPAS discounted **tariffs for an event**.
    
<!-- theme: warning -->
    
> ##### Important
> UiTPAS tariffs are different for each indiviual passholder, but this endpoint does NOT take the passholder into consideration. Use this endpoint only in specific cases, e.g. when listing the UiTPAS tariff before the passholder is known. The actual passholder tariffs might be different than this response. Use [GET /tariffs](/reference/uitpas.json/paths/~1tariffs/get) to retrieve indidivual tariffs for a passholder.
  

This UiTPAS tariffs are calculated based on:

- **The regular price** of the ticket.
This is the price your user would have to pay for the specific ticket without UiTPAS discount.
- **The event id** of the UiTdatabank event. UiTPAS discounts are limited to specific UiTdatabank events, so it's important to specify the event id to retrieve a list of possible tariffs.

Because the passholder is unknown, UiTPAS will return the tariffs for a passholder with social tariff, who lives in the same region as the event organizer.

The caller of this request must have `TARIFFS_READ` permission for the organizer of the given event.
 * @summary Get static tariffs without passholder
 */
export const getTariffsStatic = (
    params: GetTariffsStaticParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<TariffsResponse>> => {
    
    return axios.get(
      `NEXT_PUBLIC_API_PATH/tariffs/static`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetTariffsStaticQueryKey = (params: GetTariffsStaticParams,) => {
    
    return [`NEXT_PUBLIC_API_PATH/tariffs/static`, ...(params ? [params]: [])] as const;
    }

    
export const getGetTariffsStaticInfiniteQueryOptions = <TData = Awaited<ReturnType<typeof getTariffsStatic>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(params: GetTariffsStaticParams, options?: { query?:UseInfiniteQueryOptions<Awaited<ReturnType<typeof getTariffsStatic>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetTariffsStaticQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTariffsStatic>>> = ({ signal }) => getTariffsStatic(params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getTariffsStatic>>, TError, TData> & { queryKey: QueryKey }
}

export type GetTariffsStaticInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getTariffsStatic>>>
export type GetTariffsStaticInfiniteQueryError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

/**
 * @summary Get static tariffs without passholder
 */
export const useGetTariffsStaticInfinite = <TData = Awaited<ReturnType<typeof getTariffsStatic>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(
 params: GetTariffsStaticParams, options?: { query?:UseInfiniteQueryOptions<Awaited<ReturnType<typeof getTariffsStatic>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetTariffsStaticInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

export const getGetTariffsStaticQueryOptions = <TData = Awaited<ReturnType<typeof getTariffsStatic>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(params: GetTariffsStaticParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getTariffsStatic>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetTariffsStaticQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTariffsStatic>>> = ({ signal }) => getTariffsStatic(params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getTariffsStatic>>, TError, TData> & { queryKey: QueryKey }
}

export type GetTariffsStaticQueryResult = NonNullable<Awaited<ReturnType<typeof getTariffsStatic>>>
export type GetTariffsStaticQueryError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

/**
 * @summary Get static tariffs without passholder
 */
export const useGetTariffsStatic = <TData = Awaited<ReturnType<typeof getTariffsStatic>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(
 params: GetTariffsStaticParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getTariffsStatic>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetTariffsStaticQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * Registers one or more new ticket sales **with a discounted UiTPAS tariff**, so the UiTPAS organiser can get reimbursed for the discount.

Before you can register a discounted ticket sale, you will need to request the possible discounted tariffs from the `GET /tariffs` endpoint and let your end user pick one of the available tariffs. Afterward, you can register a ticket sale using this endpoint. 

You will need:

- The `uitpasNumber` of the passholder buying the ticket.
- The `eventId` of the UiTdatabank event.
- The chosen `tariff` from the `GET /tariffs` request. (only the `id` is required)
- The `regularPrice` the passholder would normally have to pay for this ticket

Optionally you can include:
- a `regularPriceLabel` describing the regular price if you have multiple price 
categories, which can be useful in the financial reporting overview.

If you want to register more than one ticket sale for the same passholder, for the same event, at the same tariff, use multiple `TicketSale` objects in this request. Do note this is only possible if `remaining` was higher than one in the `GET /tariffs` request.

The `passholder` field of `TicketSale` is ignored in the request body. It is included in the response if applicable (passholder can be empty in some cases, e.g. for group passes), but only if the caller of this request has `PASSHOLDERS_SEARCH` permission.

<!-- theme: warning -->

> ##### Error handling
> **If one of the ticket sales is invalid** (for example the chosen tariff is incorrect or expired), **none of the ticket sales will be registered**. You will instead get an error response with more details about the problem, and can then retry the registration without the incorrect ticket sales or ask the end user to change the tickets and/or tariffs that they want.

The caller of this request must have `TICKETSALE_REGISTER`  permission for the organizer of the given event.

 * @summary Register ticket sale(s)
 */
export const postTicketSales = (
    ticketSale: NonReadonly<TicketSale[]>, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<TicketSale[]>> => {
    
    return axios.post(
      `NEXT_PUBLIC_API_PATH/ticket-sales`,
      ticketSale,options
    );
  }



export const getPostTicketSalesMutationOptions = <TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postTicketSales>>, TError,{data: NonReadonly<TicketSale[]>}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof postTicketSales>>, TError,{data: NonReadonly<TicketSale[]>}, TContext> => {
 const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postTicketSales>>, {data: NonReadonly<TicketSale[]>}> = (props) => {
          const {data} = props ?? {};

          return  postTicketSales(data,axiosOptions)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type PostTicketSalesMutationResult = NonNullable<Awaited<ReturnType<typeof postTicketSales>>>
    export type PostTicketSalesMutationBody = NonReadonly<TicketSale[]>
    export type PostTicketSalesMutationError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

    /**
 * @summary Register ticket sale(s)
 */
export const usePostTicketSales = <TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postTicketSales>>, TError,{data: NonReadonly<TicketSale[]>}, TContext>, axios?: AxiosRequestConfig}
) => {

      const mutationOptions = getPostTicketSalesMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Retrieve ticket sales based on search parameters.

The caller of this request must have `TICKETSALES_SEARCH` permission for the organizer of the given event.

The `passholder` is included in the response if applicable (passholder can be empty in some cases, e.g. for group passes), and only if the caller of this request has PASSHOLDERS_SEARCH permission.
 * @summary Retrieve existing ticket sales
 */
export const getTicketSales = (
    params: GetTicketSalesParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<TicketSalesPaginatedResponse>> => {
    
    return axios.get(
      `NEXT_PUBLIC_API_PATH/ticket-sales`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetTicketSalesQueryKey = (params: GetTicketSalesParams,) => {
    
    return [`NEXT_PUBLIC_API_PATH/ticket-sales`, ...(params ? [params]: [])] as const;
    }

    
export const getGetTicketSalesInfiniteQueryOptions = <TData = Awaited<ReturnType<typeof getTicketSales>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse>>(params: GetTicketSalesParams, options?: { query?:UseInfiniteQueryOptions<Awaited<ReturnType<typeof getTicketSales>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetTicketSalesQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTicketSales>>> = ({ signal }) => getTicketSales(params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getTicketSales>>, TError, TData> & { queryKey: QueryKey }
}

export type GetTicketSalesInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getTicketSales>>>
export type GetTicketSalesInfiniteQueryError = AxiosError<UnauthorizedResponse | ForbiddenResponse>

/**
 * @summary Retrieve existing ticket sales
 */
export const useGetTicketSalesInfinite = <TData = Awaited<ReturnType<typeof getTicketSales>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse>>(
 params: GetTicketSalesParams, options?: { query?:UseInfiniteQueryOptions<Awaited<ReturnType<typeof getTicketSales>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetTicketSalesInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

export const getGetTicketSalesQueryOptions = <TData = Awaited<ReturnType<typeof getTicketSales>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse>>(params: GetTicketSalesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getTicketSales>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetTicketSalesQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTicketSales>>> = ({ signal }) => getTicketSales(params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getTicketSales>>, TError, TData> & { queryKey: QueryKey }
}

export type GetTicketSalesQueryResult = NonNullable<Awaited<ReturnType<typeof getTicketSales>>>
export type GetTicketSalesQueryError = AxiosError<UnauthorizedResponse | ForbiddenResponse>

/**
 * @summary Retrieve existing ticket sales
 */
export const useGetTicketSales = <TData = Awaited<ReturnType<typeof getTicketSales>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse>>(
 params: GetTicketSalesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getTicketSales>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetTicketSalesQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * Cancels a single ticket sale registration by its id. (Returned in the response of the ticket sale registration request.)

The caller of this request must have `TICKETSALES_REGISTER` permission for the organizer of the event of the ticketsale.
 * @summary Cancel a ticket sale registration
 */
export const deleteTicketSales = (
    ticketSaleId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    
    return axios.delete(
      `NEXT_PUBLIC_API_PATH/ticket-sales/${ticketSaleId}`,options
    );
  }



export const getDeleteTicketSalesMutationOptions = <TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteTicketSales>>, TError,{ticketSaleId: string}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof deleteTicketSales>>, TError,{ticketSaleId: string}, TContext> => {
 const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteTicketSales>>, {ticketSaleId: string}> = (props) => {
          const {ticketSaleId} = props ?? {};

          return  deleteTicketSales(ticketSaleId,axiosOptions)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type DeleteTicketSalesMutationResult = NonNullable<Awaited<ReturnType<typeof deleteTicketSales>>>
    
    export type DeleteTicketSalesMutationError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>

    /**
 * @summary Cancel a ticket sale registration
 */
export const useDeleteTicketSales = <TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteTicketSales>>, TError,{ticketSaleId: string}, TContext>, axios?: AxiosRequestConfig}
) => {

      const mutationOptions = getDeleteTicketSalesMutationOptions(options);

      return useMutation(mutationOptions);
    }
    