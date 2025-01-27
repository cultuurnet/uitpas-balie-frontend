/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import {
  useMutation,
  useQuery
} from '@tanstack/react-query'
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
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
  ForbiddenResponse,
  GetPassholdersMembershipPricesCardSystemIdParams,
  GetPassholdersParams,
  GetPassholdersPassholderIdMembershipPricesCardSystemIdParams,
  GetPassholdersPassholderIdTransactionsParams,
  MembershipPrice,
  Pass,
  Passholder,
  PassholderPicture,
  PassholdersPaginatedResponse,
  PassholdersStatusInszNumbersInsznumber200,
  PostPassholdersPassholderIdCheckin201,
  PostPassholdersPassholderIdCheckinBody,
  TransactionsPaginatedCollection,
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
 * Retrieve passholders based on search parameters.

Note: by default passholders in the response are alphabetically sorted by name.

The caller of this request must have `PASSHOLDERS_SEARCH` or `PASSHOLDERS_SEARCH_BY_ID` or `PASSHOLDERS_SEARCH_ALL` permission. 

In case of `PASSHOLDERS_SEARCH` permission, passholder results are filtered based on the allowed card systems of the caller, unless searched by one of the ID fields:
* `uitpasNumber`
* `chipNumber`
* `inszNumber`
* `uitidId`

In case of `PASSHOLDERS_SEARCH_BY_ID` permission, the caller can only make use of those ID fields.
 * @summary Search passholders
 */
export const getPassholders = (
    params?: GetPassholdersParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<PassholdersPaginatedResponse>> => {
    
    return axios.get(
      `NEXT_PUBLIC_API_PATH/passholders`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetPassholdersQueryKey = (params?: GetPassholdersParams,) => {
    return [`NEXT_PUBLIC_API_PATH/passholders`, ...(params ? [params]: [])] as const;
    }

    
export const getGetPassholdersQueryOptions = <TData = Awaited<ReturnType<typeof getPassholders>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(params?: GetPassholdersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPassholders>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetPassholdersQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getPassholders>>> = ({ signal }) => getPassholders(params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getPassholders>>, TError, TData> & { queryKey: QueryKey }
}

export type GetPassholdersQueryResult = NonNullable<Awaited<ReturnType<typeof getPassholders>>>
export type GetPassholdersQueryError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

/**
 * @summary Search passholders
 */
export const useGetPassholders = <TData = Awaited<ReturnType<typeof getPassholders>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(
 params?: GetPassholdersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPassholders>>, TError, TData>>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetPassholdersQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * Register a passholder

<!-- theme: warning -->

> IMPORTANT
>
> Make sure to set `registrationCardType` to either `DIGITAL` or `NFC_CARD`. In case of `NFC_CARD` the field `registrationUitpasNumber` is required and has to be a card in status `LOCAL_STOCK`.

The caller of this request must have `PASSHOLDERS_WRITE` permission for the `registrationOrganizer`.
 * @summary Register a new passholder
 */
export const postPassholders = (
    passholder: NonReadonly<Passholder>, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Passholder>> => {
    
    return axios.post(
      `NEXT_PUBLIC_API_PATH/passholders`,
      passholder,options
    );
  }



export const getPostPassholdersMutationOptions = <TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postPassholders>>, TError,{data: NonReadonly<Passholder>}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof postPassholders>>, TError,{data: NonReadonly<Passholder>}, TContext> => {
const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postPassholders>>, {data: NonReadonly<Passholder>}> = (props) => {
          const {data} = props ?? {};

          return  postPassholders(data,axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostPassholdersMutationResult = NonNullable<Awaited<ReturnType<typeof postPassholders>>>
    export type PostPassholdersMutationBody = NonReadonly<Passholder>
    export type PostPassholdersMutationError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

    /**
 * @summary Register a new passholder
 */
export const usePostPassholders = <TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postPassholders>>, TError,{data: NonReadonly<Passholder>}, TContext>, axios?: AxiosRequestConfig}
): UseMutationResult<
        Awaited<ReturnType<typeof postPassholders>>,
        TError,
        {data: NonReadonly<Passholder>},
        TContext
      > => {

      const mutationOptions = getPostPassholdersMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Remove this passholder.

The caller of this request must have `PASSHOLDERS_DELETE` permission.
 * @summary Remove passholder
 */
export const deletePassholdersPassholderId = (
    passholderId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    
    return axios.delete(
      `NEXT_PUBLIC_API_PATH/passholders/${passholderId}`,options
    );
  }



export const getDeletePassholdersPassholderIdMutationOptions = <TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deletePassholdersPassholderId>>, TError,{passholderId: string}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof deletePassholdersPassholderId>>, TError,{passholderId: string}, TContext> => {
const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deletePassholdersPassholderId>>, {passholderId: string}> = (props) => {
          const {passholderId} = props ?? {};

          return  deletePassholdersPassholderId(passholderId,axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeletePassholdersPassholderIdMutationResult = NonNullable<Awaited<ReturnType<typeof deletePassholdersPassholderId>>>
    
    export type DeletePassholdersPassholderIdMutationError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>

    /**
 * @summary Remove passholder
 */
export const useDeletePassholdersPassholderId = <TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deletePassholdersPassholderId>>, TError,{passholderId: string}, TContext>, axios?: AxiosRequestConfig}
): UseMutationResult<
        Awaited<ReturnType<typeof deletePassholdersPassholderId>>,
        TError,
        {passholderId: string},
        TContext
      > => {

      const mutationOptions = getDeletePassholdersPassholderIdMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Retrieve picture of the given passholder.

This endpoint allows you to obtain a short-lived link to the picture of the passholder. After generation, this link remains active for a limited time, enabling you to include it in HTML pages displayed to your users.

The caller of this method must have `PASSHOLDERS_PICTURE_READ` permission for the given passholder.
 * @summary Get picture of passholder
 */
export const getPassholdersPassholderIdPicture = (
    passholderId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<PassholderPicture>> => {
    
    return axios.get(
      `NEXT_PUBLIC_API_PATH/passholders/${passholderId}/picture`,options
    );
  }


export const getGetPassholdersPassholderIdPictureQueryKey = (passholderId: string,) => {
    return [`NEXT_PUBLIC_API_PATH/passholders/${passholderId}/picture`] as const;
    }

    
export const getGetPassholdersPassholderIdPictureQueryOptions = <TData = Awaited<ReturnType<typeof getPassholdersPassholderIdPicture>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>>(passholderId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPassholdersPassholderIdPicture>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetPassholdersPassholderIdPictureQueryKey(passholderId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getPassholdersPassholderIdPicture>>> = ({ signal }) => getPassholdersPassholderIdPicture(passholderId, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(passholderId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getPassholdersPassholderIdPicture>>, TError, TData> & { queryKey: QueryKey }
}

export type GetPassholdersPassholderIdPictureQueryResult = NonNullable<Awaited<ReturnType<typeof getPassholdersPassholderIdPicture>>>
export type GetPassholdersPassholderIdPictureQueryError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>

/**
 * @summary Get picture of passholder
 */
export const useGetPassholdersPassholderIdPicture = <TData = Awaited<ReturnType<typeof getPassholdersPassholderIdPicture>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>>(
 passholderId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPassholdersPassholderIdPicture>>, TError, TData>>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetPassholdersPassholderIdPictureQueryOptions(passholderId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * Retrieve the exact membership price for a new passholder. `cardType`, `postalCode` and `dateOfBirth` are mandatory to determine the correct price. `socialTariff` and `voucher` are optional.

To retrieve a list of prices for a card system if not all details are known yet, you can use [GET /card-systems/{cardSystemId}/membership-prices](/reference/uitpas.json/paths/~1card-systems~1{cardSystemId}~1membership-prices/get).

The caller of this request must have `MEMBERSHIP_PRICES_READ` permission.
 * @summary Retrieve new membership price
 */
export const getPassholdersMembershipPricesCardSystemId = (
    cardSystemId: number,
    params: GetPassholdersMembershipPricesCardSystemIdParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<MembershipPrice>> => {
    
    return axios.get(
      `NEXT_PUBLIC_API_PATH/passholders/membership-prices/${cardSystemId}`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetPassholdersMembershipPricesCardSystemIdQueryKey = (cardSystemId: number,
    params: GetPassholdersMembershipPricesCardSystemIdParams,) => {
    return [`NEXT_PUBLIC_API_PATH/passholders/membership-prices/${cardSystemId}`, ...(params ? [params]: [])] as const;
    }

    
export const getGetPassholdersMembershipPricesCardSystemIdQueryOptions = <TData = Awaited<ReturnType<typeof getPassholdersMembershipPricesCardSystemId>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(cardSystemId: number,
    params: GetPassholdersMembershipPricesCardSystemIdParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPassholdersMembershipPricesCardSystemId>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetPassholdersMembershipPricesCardSystemIdQueryKey(cardSystemId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getPassholdersMembershipPricesCardSystemId>>> = ({ signal }) => getPassholdersMembershipPricesCardSystemId(cardSystemId,params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(cardSystemId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getPassholdersMembershipPricesCardSystemId>>, TError, TData> & { queryKey: QueryKey }
}

export type GetPassholdersMembershipPricesCardSystemIdQueryResult = NonNullable<Awaited<ReturnType<typeof getPassholdersMembershipPricesCardSystemId>>>
export type GetPassholdersMembershipPricesCardSystemIdQueryError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

/**
 * @summary Retrieve new membership price
 */
export const useGetPassholdersMembershipPricesCardSystemId = <TData = Awaited<ReturnType<typeof getPassholdersMembershipPricesCardSystemId>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(
 cardSystemId: number,
    params: GetPassholdersMembershipPricesCardSystemIdParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPassholdersMembershipPricesCardSystemId>>, TError, TData>>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetPassholdersMembershipPricesCardSystemIdQueryOptions(cardSystemId,params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * Retrieve the exact membership price for an existing passholder in a new card system. `cardType` is mandatory to determine the correct price. `socialTariff` and `voucher` are optional.

To retrieve the price for a *new* passholder, use [GET /passholders/membership-prices/{cardSystemId}](/reference/uitpas.json/paths/~1passholders~1membership-prices~1{cardSystemId}/get).

To retrieve a list of prices for a card system if not all details are known yet, you can use [GET /card-systems/{cardSystemId}/membership-prices](/reference/uitpas.json/paths/~1card-systems~1{cardSystemId}~1membership-prices/get).

The caller of this request must have `PASSHOLDERS_SEARCH` and `MEMBERSHIP_PRICES_READ` permission.
 * @summary Retrieve upgrade membership price
 */
export const getPassholdersPassholderIdMembershipPricesCardSystemId = (
    passholderId: string,
    cardSystemId: number,
    params: GetPassholdersPassholderIdMembershipPricesCardSystemIdParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<MembershipPrice>> => {
    
    return axios.get(
      `NEXT_PUBLIC_API_PATH/passholders/${passholderId}/membership-prices/${cardSystemId}`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetPassholdersPassholderIdMembershipPricesCardSystemIdQueryKey = (passholderId: string,
    cardSystemId: number,
    params: GetPassholdersPassholderIdMembershipPricesCardSystemIdParams,) => {
    return [`NEXT_PUBLIC_API_PATH/passholders/${passholderId}/membership-prices/${cardSystemId}`, ...(params ? [params]: [])] as const;
    }

    
export const getGetPassholdersPassholderIdMembershipPricesCardSystemIdQueryOptions = <TData = Awaited<ReturnType<typeof getPassholdersPassholderIdMembershipPricesCardSystemId>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(passholderId: string,
    cardSystemId: number,
    params: GetPassholdersPassholderIdMembershipPricesCardSystemIdParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPassholdersPassholderIdMembershipPricesCardSystemId>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetPassholdersPassholderIdMembershipPricesCardSystemIdQueryKey(passholderId,cardSystemId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getPassholdersPassholderIdMembershipPricesCardSystemId>>> = ({ signal }) => getPassholdersPassholderIdMembershipPricesCardSystemId(passholderId,cardSystemId,params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(passholderId && cardSystemId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getPassholdersPassholderIdMembershipPricesCardSystemId>>, TError, TData> & { queryKey: QueryKey }
}

export type GetPassholdersPassholderIdMembershipPricesCardSystemIdQueryResult = NonNullable<Awaited<ReturnType<typeof getPassholdersPassholderIdMembershipPricesCardSystemId>>>
export type GetPassholdersPassholderIdMembershipPricesCardSystemIdQueryError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

/**
 * @summary Retrieve upgrade membership price
 */
export const useGetPassholdersPassholderIdMembershipPricesCardSystemId = <TData = Awaited<ReturnType<typeof getPassholdersPassholderIdMembershipPricesCardSystemId>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(
 passholderId: string,
    cardSystemId: number,
    params: GetPassholdersPassholderIdMembershipPricesCardSystemIdParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPassholdersPassholderIdMembershipPricesCardSystemId>>, TError, TData>>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetPassholdersPassholderIdMembershipPricesCardSystemIdQueryOptions(passholderId,cardSystemId,params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * Allow passholders to self check-in at an event using a check-in code (typically a QR code the passholder can scan). If you want to check-in a passholder based on an event id, use [POST /checkins](/reference/uitpas.json/paths/~1checkins/post) instead. 

If a user access token of a passholder is used, you can specify the path parameter `passholderId` as:
- the id of the passsholder of the access token (you can retrieve the id using `/passholders/me`)
- `me` as a short form for the passholder of the access token
- a passholder id of one of the passholder's family members

If a user access token of an admin, or a client access token is used, `me` cannot be used as a passholder id.

The caller of this method must have `PASSHOLDERS_SELF_CHECKIN` permission for the given passholder.
 * @summary Check-in passholder using a check-in code
 */
export const postPassholdersPassholderIdCheckin = (
    passholderId: string,
    postPassholdersPassholderIdCheckinBody: PostPassholdersPassholderIdCheckinBody, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<PostPassholdersPassholderIdCheckin201>> => {
    
    return axios.post(
      `NEXT_PUBLIC_API_PATH/passholders/${passholderId}/checkins`,
      postPassholdersPassholderIdCheckinBody,options
    );
  }



export const getPostPassholdersPassholderIdCheckinMutationOptions = <TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postPassholdersPassholderIdCheckin>>, TError,{passholderId: string;data: PostPassholdersPassholderIdCheckinBody}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof postPassholdersPassholderIdCheckin>>, TError,{passholderId: string;data: PostPassholdersPassholderIdCheckinBody}, TContext> => {
const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postPassholdersPassholderIdCheckin>>, {passholderId: string;data: PostPassholdersPassholderIdCheckinBody}> = (props) => {
          const {passholderId,data} = props ?? {};

          return  postPassholdersPassholderIdCheckin(passholderId,data,axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostPassholdersPassholderIdCheckinMutationResult = NonNullable<Awaited<ReturnType<typeof postPassholdersPassholderIdCheckin>>>
    export type PostPassholdersPassholderIdCheckinMutationBody = PostPassholdersPassholderIdCheckinBody
    export type PostPassholdersPassholderIdCheckinMutationError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

    /**
 * @summary Check-in passholder using a check-in code
 */
export const usePostPassholdersPassholderIdCheckin = <TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postPassholdersPassholderIdCheckin>>, TError,{passholderId: string;data: PostPassholdersPassholderIdCheckinBody}, TContext>, axios?: AxiosRequestConfig}
): UseMutationResult<
        Awaited<ReturnType<typeof postPassholdersPassholderIdCheckin>>,
        TError,
        {passholderId: string;data: PostPassholdersPassholderIdCheckinBody},
        TContext
      > => {

      const mutationOptions = getPostPassholdersPassholderIdCheckinMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Retrieve the transaction history of the passholder.

If a user access token of a passholder is used, you can specify the path parameter `passholderId` as:
- the id of the passsholder of the access token (you can retrieve the id using `/passholders/me`)
- `me` as a short form for the passholder of the access token
- a passholder id of one of the passholder's family members

If a user access token of an admin, or a client access token is used, `me` cannot be used as a passholder id.

The caller of this method must have `PASSHOLDERS_SELF_CHECKIN` permission for the given passholder.
 * @summary Retrieve transaction history of a passholder
 */
export const getPassholdersPassholderIdTransactions = (
    passholderId: string,
    params?: GetPassholdersPassholderIdTransactionsParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<TransactionsPaginatedCollection>> => {
    
    return axios.get(
      `NEXT_PUBLIC_API_PATH/passholders/${passholderId}/transactions`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetPassholdersPassholderIdTransactionsQueryKey = (passholderId: string,
    params?: GetPassholdersPassholderIdTransactionsParams,) => {
    return [`NEXT_PUBLIC_API_PATH/passholders/${passholderId}/transactions`, ...(params ? [params]: [])] as const;
    }

    
export const getGetPassholdersPassholderIdTransactionsQueryOptions = <TData = Awaited<ReturnType<typeof getPassholdersPassholderIdTransactions>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(passholderId: string,
    params?: GetPassholdersPassholderIdTransactionsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPassholdersPassholderIdTransactions>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetPassholdersPassholderIdTransactionsQueryKey(passholderId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getPassholdersPassholderIdTransactions>>> = ({ signal }) => getPassholdersPassholderIdTransactions(passholderId,params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(passholderId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getPassholdersPassholderIdTransactions>>, TError, TData> & { queryKey: QueryKey }
}

export type GetPassholdersPassholderIdTransactionsQueryResult = NonNullable<Awaited<ReturnType<typeof getPassholdersPassholderIdTransactions>>>
export type GetPassholdersPassholderIdTransactionsQueryError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

/**
 * @summary Retrieve transaction history of a passholder
 */
export const useGetPassholdersPassholderIdTransactions = <TData = Awaited<ReturnType<typeof getPassholdersPassholderIdTransactions>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(
 passholderId: string,
    params?: GetPassholdersPassholderIdTransactionsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPassholdersPassholderIdTransactions>>, TError, TData>>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetPassholdersPassholderIdTransactionsQueryOptions(passholderId,params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * Retrieve information related to a pass, searched by UiTPAS number.

If the response contains `messages`, they MUST be displayed to the end-user.

The caller of this request must have `PASSES_READ` permission.
 * @summary Retrieve pass by UiTPAS number
 */
export const getPassesUitpasNumber = (
    uitpasNumber: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Pass>> => {
    
    return axios.get(
      `NEXT_PUBLIC_API_PATH/passes/${uitpasNumber}`,options
    );
  }


export const getGetPassesUitpasNumberQueryKey = (uitpasNumber: string,) => {
    return [`NEXT_PUBLIC_API_PATH/passes/${uitpasNumber}`] as const;
    }

    
export const getGetPassesUitpasNumberQueryOptions = <TData = Awaited<ReturnType<typeof getPassesUitpasNumber>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(uitpasNumber: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPassesUitpasNumber>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetPassesUitpasNumberQueryKey(uitpasNumber);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getPassesUitpasNumber>>> = ({ signal }) => getPassesUitpasNumber(uitpasNumber, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(uitpasNumber), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getPassesUitpasNumber>>, TError, TData> & { queryKey: QueryKey }
}

export type GetPassesUitpasNumberQueryResult = NonNullable<Awaited<ReturnType<typeof getPassesUitpasNumber>>>
export type GetPassesUitpasNumberQueryError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

/**
 * @summary Retrieve pass by UiTPAS number
 */
export const useGetPassesUitpasNumber = <TData = Awaited<ReturnType<typeof getPassesUitpasNumber>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(
 uitpasNumber: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPassesUitpasNumber>>, TError, TData>>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetPassesUitpasNumberQueryOptions(uitpasNumber,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * Retrieve information related to a pass, searched by INSZ number.

If the response contains `messages`, they MUST be displayed to the end-user.

The caller of this request must have `PASSES_INSZNUMBERS_READ` permission.
 * @summary Retrieve pass by INSZ number
 */
export const getInszNumbersInszNumber = (
    inszNumber: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Pass>> => {
    
    return axios.get(
      `NEXT_PUBLIC_API_PATH/insz-numbers/${inszNumber}`,options
    );
  }


export const getGetInszNumbersInszNumberQueryKey = (inszNumber: string,) => {
    return [`NEXT_PUBLIC_API_PATH/insz-numbers/${inszNumber}`] as const;
    }

    
export const getGetInszNumbersInszNumberQueryOptions = <TData = Awaited<ReturnType<typeof getInszNumbersInszNumber>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(inszNumber: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getInszNumbersInszNumber>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetInszNumbersInszNumberQueryKey(inszNumber);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getInszNumbersInszNumber>>> = ({ signal }) => getInszNumbersInszNumber(inszNumber, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(inszNumber), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getInszNumbersInszNumber>>, TError, TData> & { queryKey: QueryKey }
}

export type GetInszNumbersInszNumberQueryResult = NonNullable<Awaited<ReturnType<typeof getInszNumbersInszNumber>>>
export type GetInszNumbersInszNumberQueryError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

/**
 * @summary Retrieve pass by INSZ number
 */
export const useGetInszNumbersInszNumber = <TData = Awaited<ReturnType<typeof getInszNumbersInszNumber>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(
 inszNumber: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getInszNumbersInszNumber>>, TError, TData>>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetInszNumbersInszNumberQueryOptions(inszNumber,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * Retrieve information related to a pass, searched by chip number.

If the response contains `messages`, they MUST be displayed to the end-user.

The caller of this request must have `PASSES_CHIPNUMBERS_READ` permission.
 * @summary Retrieve pass by chip number
 */
export const getChipNumbersChipNumber = (
    chipNumber: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Pass>> => {
    
    return axios.get(
      `NEXT_PUBLIC_API_PATH/chip-numbers/${chipNumber}`,options
    );
  }


export const getGetChipNumbersChipNumberQueryKey = (chipNumber: string,) => {
    return [`NEXT_PUBLIC_API_PATH/chip-numbers/${chipNumber}`] as const;
    }

    
export const getGetChipNumbersChipNumberQueryOptions = <TData = Awaited<ReturnType<typeof getChipNumbersChipNumber>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(chipNumber: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getChipNumbersChipNumber>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetChipNumbersChipNumberQueryKey(chipNumber);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getChipNumbersChipNumber>>> = ({ signal }) => getChipNumbersChipNumber(chipNumber, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(chipNumber), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getChipNumbersChipNumber>>, TError, TData> & { queryKey: QueryKey }
}

export type GetChipNumbersChipNumberQueryResult = NonNullable<Awaited<ReturnType<typeof getChipNumbersChipNumber>>>
export type GetChipNumbersChipNumberQueryError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

/**
 * @summary Retrieve pass by chip number
 */
export const useGetChipNumbersChipNumber = <TData = Awaited<ReturnType<typeof getChipNumbersChipNumber>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(
 chipNumber: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getChipNumbersChipNumber>>, TError, TData>>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetChipNumbersChipNumberQueryOptions(chipNumber,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * Retrieve the status of a passholder based on INSZ number.

This endpoint is rate limited.

 * @summary Retrieve the status of a passholder based on INSZ number
 */
export const passholdersStatusInszNumbersInsznumber = (
    inszNumber: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<PassholdersStatusInszNumbersInsznumber200>> => {
    
    return axios.get(
      `NEXT_PUBLIC_API_PATH/passholders/status/insz-numbers/${inszNumber}`,options
    );
  }


export const getPassholdersStatusInszNumbersInsznumberQueryKey = (inszNumber: string,) => {
    return [`NEXT_PUBLIC_API_PATH/passholders/status/insz-numbers/${inszNumber}`] as const;
    }

    
export const getPassholdersStatusInszNumbersInsznumberQueryOptions = <TData = Awaited<ReturnType<typeof passholdersStatusInszNumbersInsznumber>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse | void>>(inszNumber: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof passholdersStatusInszNumbersInsznumber>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPassholdersStatusInszNumbersInsznumberQueryKey(inszNumber);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof passholdersStatusInszNumbersInsznumber>>> = ({ signal }) => passholdersStatusInszNumbersInsznumber(inszNumber, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(inszNumber), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof passholdersStatusInszNumbersInsznumber>>, TError, TData> & { queryKey: QueryKey }
}

export type PassholdersStatusInszNumbersInsznumberQueryResult = NonNullable<Awaited<ReturnType<typeof passholdersStatusInszNumbersInsznumber>>>
export type PassholdersStatusInszNumbersInsznumberQueryError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse | void>

/**
 * @summary Retrieve the status of a passholder based on INSZ number
 */
export const usePassholdersStatusInszNumbersInsznumber = <TData = Awaited<ReturnType<typeof passholdersStatusInszNumbersInsznumber>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse | void>>(
 inszNumber: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof passholdersStatusInszNumbersInsznumber>>, TError, TData>>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getPassholdersStatusInszNumbersInsznumberQueryOptions(inszNumber,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



