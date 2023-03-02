/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey,
} from "@tanstack/react-query";
import type {
  TariffsResponse,
  Error,
  UnauthorizedResponse,
  ForbiddenResponse,
  GetTariffsParams,
  TicketSale,
  TicketSalesPaginatedResponse,
  GetTicketSalesParams,
} from ".././model";

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
  params: GetTariffsParams,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<TariffsResponse>> => {
  return axios.get(`/tariffs`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getGetTariffsQueryKey = (params: GetTariffsParams) => [
  `/tariffs`,
  ...(params ? [params] : []),
];

export type GetTariffsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getTariffs>>
>;
export type GetTariffsQueryError = AxiosError<
  Error | UnauthorizedResponse | ForbiddenResponse
>;

export const useGetTariffs = <
  TData = Awaited<ReturnType<typeof getTariffs>>,
  TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>
>(
  params: GetTariffsParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTariffs>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetTariffsQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getTariffs>>> = ({
    signal,
  }) => getTariffs(params, { signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof getTariffs>>, TError, TData>(
    { queryKey, queryFn, ...queryOptions }
  ) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

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

The `passholder` field of `TicketSale` is ignored in the request body. It is included in the response if applicable (passholder can be empty in some cases, e.g. for group passes), but only if the caller of this request has `PASSHOLDER_SEARCH` permission.

<!-- theme: warning -->

> ##### Error handling
> **If one of the ticket sales is invalid** (for example the chosen tariff is incorrect or expired), **none of the ticket sales will be registered**. You will instead get an error response with more details about the problem, and can then retry the registration without the incorrect ticket sales or ask the end user to change the tickets and/or tariffs that they want.

The caller of this request must have `TICKETSALE_REGISTER`  permission for the organizer of the given event.

 * @summary Register ticket sale(s)
 */
export const postTicketSales = (
  ticketSale: TicketSale[],
  options?: AxiosRequestConfig
): Promise<AxiosResponse<TicketSale[]>> => {
  return axios.post(`/ticket-sales`, ticketSale, options);
};

export type PostTicketSalesMutationResult = NonNullable<
  Awaited<ReturnType<typeof postTicketSales>>
>;
export type PostTicketSalesMutationBody = TicketSale[];
export type PostTicketSalesMutationError = AxiosError<
  Error | UnauthorizedResponse | ForbiddenResponse
>;

export const usePostTicketSales = <
  TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTicketSales>>,
    TError,
    { data: TicketSale[] },
    TContext
  >;
  axios?: AxiosRequestConfig;
}) => {
  const { mutation: mutationOptions, axios: axiosOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postTicketSales>>,
    { data: TicketSale[] }
  > = (props) => {
    const { data } = props ?? {};

    return postTicketSales(data, axiosOptions);
  };

  return useMutation<
    Awaited<ReturnType<typeof postTicketSales>>,
    TError,
    { data: TicketSale[] },
    TContext
  >(mutationFn, mutationOptions);
};
/**
 * Retrieve ticket sales based on search parameters.

The caller of this request must have `TICKETSALE_SEARCH` permission for the organizer of the given event.

The `passholder` is included in the response if applicable (passholder can be empty in some cases, e.g. for group passes), and only if the caller of this request has PASSHOLDER_SEARCH permission.
 * @summary Retrieve existing ticket sales
 */
export const getTicketSales = (
  params: GetTicketSalesParams,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<TicketSalesPaginatedResponse>> => {
  return axios.get(`/ticket-sales`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getGetTicketSalesQueryKey = (params: GetTicketSalesParams) => [
  `/ticket-sales`,
  ...(params ? [params] : []),
];

export type GetTicketSalesQueryResult = NonNullable<
  Awaited<ReturnType<typeof getTicketSales>>
>;
export type GetTicketSalesQueryError = AxiosError<
  UnauthorizedResponse | ForbiddenResponse
>;

export const useGetTicketSales = <
  TData = Awaited<ReturnType<typeof getTicketSales>>,
  TError = AxiosError<UnauthorizedResponse | ForbiddenResponse>
>(
  params: GetTicketSalesParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTicketSales>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetTicketSalesQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getTicketSales>>> = ({
    signal,
  }) => getTicketSales(params, { signal, ...axiosOptions });

  const query = useQuery<
    Awaited<ReturnType<typeof getTicketSales>>,
    TError,
    TData
  >({ queryKey, queryFn, ...queryOptions }) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryKey;

  return query;
};

/**
 * Cancels a single ticket sale registration by its id. (Returned in the response of the ticket sale registration request.)

The caller of this request must have `TICKETSALE_REGISTER` permission for the organizer of the event of the ticketsale.
 * @summary Cancel a ticket sale registration
 */
export const deleteTicketSales = (
  ticketSaleId: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<void>> => {
  return axios.delete(`/ticket-sales/${ticketSaleId}`, options);
};

export type DeleteTicketSalesMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteTicketSales>>
>;

export type DeleteTicketSalesMutationError = AxiosError<
  UnauthorizedResponse | ForbiddenResponse | Error
>;

export const useDeleteTicketSales = <
  TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTicketSales>>,
    TError,
    { ticketSaleId: string },
    TContext
  >;
  axios?: AxiosRequestConfig;
}) => {
  const { mutation: mutationOptions, axios: axiosOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteTicketSales>>,
    { ticketSaleId: string }
  > = (props) => {
    const { ticketSaleId } = props ?? {};

    return deleteTicketSales(ticketSaleId, axiosOptions);
  };

  return useMutation<
    Awaited<ReturnType<typeof deleteTicketSales>>,
    TError,
    { ticketSaleId: string },
    TContext
  >(mutationFn, mutationOptions);
};
