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
  GetRewardsIdRedeemStatus200,
  GetRewardsIdRedeemStatusParams,
  GetRewardsParams,
  GetRewardsRedeemedParams,
  PostRewardsRedeemedBody,
  RedeemedReward,
  RedeemedRewardsPaginatedResponse,
  Reward,
  RewardsPaginatedResponse,
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
 * Search rewards.

The caller of this request does not need special permissions permission except `REWARDS_PASSHOLDERS_READ` to use the `isRedeemableByPassholderId` and `isInterestingForPassholderId` query parameters.

This endpoint allows authentication with [client identification](/docs/authentication/ZG9jOjExODE5NDY5-client-identification), [client access tokens](/docs/authentication/ZG9jOjExODE5NDY4-client-access-token), and [user access tokens](/docs/authentication/ZG9jOjExODE5NTM5-user-access-token).
 * @summary Search rewards
 */
export const getRewards = (
    params?: GetRewardsParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<RewardsPaginatedResponse>> => {
    
    return axios.get(
      `NEXT_PUBLIC_API_PATH/rewards`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetRewardsQueryKey = (params?: GetRewardsParams,) => {
    
    return [`NEXT_PUBLIC_API_PATH/rewards`, ...(params ? [params]: [])] as const;
    }

    
export const getGetRewardsInfiniteQueryOptions = <TData = Awaited<ReturnType<typeof getRewards>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(params?: GetRewardsParams, options?: { query?:UseInfiniteQueryOptions<Awaited<ReturnType<typeof getRewards>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetRewardsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getRewards>>> = ({ signal }) => getRewards(params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getRewards>>, TError, TData> & { queryKey: QueryKey }
}

export type GetRewardsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getRewards>>>
export type GetRewardsInfiniteQueryError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

/**
 * @summary Search rewards
 */
export const useGetRewardsInfinite = <TData = Awaited<ReturnType<typeof getRewards>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(
 params?: GetRewardsParams, options?: { query?:UseInfiniteQueryOptions<Awaited<ReturnType<typeof getRewards>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetRewardsInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

export const getGetRewardsQueryOptions = <TData = Awaited<ReturnType<typeof getRewards>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(params?: GetRewardsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getRewards>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetRewardsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getRewards>>> = ({ signal }) => getRewards(params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getRewards>>, TError, TData> & { queryKey: QueryKey }
}

export type GetRewardsQueryResult = NonNullable<Awaited<ReturnType<typeof getRewards>>>
export type GetRewardsQueryError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

/**
 * @summary Search rewards
 */
export const useGetRewards = <TData = Awaited<ReturnType<typeof getRewards>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(
 params?: GetRewardsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getRewards>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetRewardsQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * Create a new reward.

The caller of this request must have `REWARDS_WRITE` permission for the given organizer.
 * @summary Create new reward
 */
export const postRewards = (
    reward: NonReadonly<Reward>, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Reward>> => {
    
    return axios.post(
      `NEXT_PUBLIC_API_PATH/rewards`,
      reward,options
    );
  }



export const getPostRewardsMutationOptions = <TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postRewards>>, TError,{data: NonReadonly<Reward>}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof postRewards>>, TError,{data: NonReadonly<Reward>}, TContext> => {
 const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postRewards>>, {data: NonReadonly<Reward>}> = (props) => {
          const {data} = props ?? {};

          return  postRewards(data,axiosOptions)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type PostRewardsMutationResult = NonNullable<Awaited<ReturnType<typeof postRewards>>>
    export type PostRewardsMutationBody = NonReadonly<Reward>
    export type PostRewardsMutationError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

    /**
 * @summary Create new reward
 */
export const usePostRewards = <TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postRewards>>, TError,{data: NonReadonly<Reward>}, TContext>, axios?: AxiosRequestConfig}
) => {

      const mutationOptions = getPostRewardsMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Retrieve reward by ID.

The caller of this request must have `REWARDS_READ` permission for the given organizer.
 * @summary Retrieve reward
 */
export const getRewardsId = (
    rewardId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Reward>> => {
    
    return axios.get(
      `NEXT_PUBLIC_API_PATH/rewards/${rewardId}`,options
    );
  }


export const getGetRewardsIdQueryKey = (rewardId: string,) => {
    
    return [`NEXT_PUBLIC_API_PATH/rewards/${rewardId}`] as const;
    }

    
export const getGetRewardsIdInfiniteQueryOptions = <TData = Awaited<ReturnType<typeof getRewardsId>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>>(rewardId: string, options?: { query?:UseInfiniteQueryOptions<Awaited<ReturnType<typeof getRewardsId>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetRewardsIdQueryKey(rewardId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getRewardsId>>> = ({ signal }) => getRewardsId(rewardId, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(rewardId), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getRewardsId>>, TError, TData> & { queryKey: QueryKey }
}

export type GetRewardsIdInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getRewardsId>>>
export type GetRewardsIdInfiniteQueryError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>

/**
 * @summary Retrieve reward
 */
export const useGetRewardsIdInfinite = <TData = Awaited<ReturnType<typeof getRewardsId>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>>(
 rewardId: string, options?: { query?:UseInfiniteQueryOptions<Awaited<ReturnType<typeof getRewardsId>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetRewardsIdInfiniteQueryOptions(rewardId,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

export const getGetRewardsIdQueryOptions = <TData = Awaited<ReturnType<typeof getRewardsId>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>>(rewardId: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getRewardsId>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetRewardsIdQueryKey(rewardId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getRewardsId>>> = ({ signal }) => getRewardsId(rewardId, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(rewardId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getRewardsId>>, TError, TData> & { queryKey: QueryKey }
}

export type GetRewardsIdQueryResult = NonNullable<Awaited<ReturnType<typeof getRewardsId>>>
export type GetRewardsIdQueryError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>

/**
 * @summary Retrieve reward
 */
export const useGetRewardsId = <TData = Awaited<ReturnType<typeof getRewardsId>>, TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>>(
 rewardId: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getRewardsId>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetRewardsIdQueryOptions(rewardId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * Update reward.
To update a reward correctly, as a client you will typically `GET` the reward first,  make the required changes in the reward json and use this `PUT` request to persist those changes in UiTPAS.

Do note that the following fields are **not editable** after this reward is redeemed by (for POINTS rewards) or granted to (for WELCOME rewards) a passholder:
* redeemPeriod.begin
* grantingPeriod.begin
* points

Attempts to edit such rewards will result in an HTTP 400 error with type `https://api.publiq.be/probs/uitpas/reward-not-editable`

The caller of this request must have `REWARDS_WRITE` permission for the given organizer.
 * @summary Update reward
 */
export const putRewardsId = (
    rewardId: string,
    reward: NonReadonly<Reward>, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Reward>> => {
    
    return axios.put(
      `NEXT_PUBLIC_API_PATH/rewards/${rewardId}`,
      reward,options
    );
  }



export const getPutRewardsIdMutationOptions = <TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putRewardsId>>, TError,{rewardId: string;data: NonReadonly<Reward>}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof putRewardsId>>, TError,{rewardId: string;data: NonReadonly<Reward>}, TContext> => {
 const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putRewardsId>>, {rewardId: string;data: NonReadonly<Reward>}> = (props) => {
          const {rewardId,data} = props ?? {};

          return  putRewardsId(rewardId,data,axiosOptions)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type PutRewardsIdMutationResult = NonNullable<Awaited<ReturnType<typeof putRewardsId>>>
    export type PutRewardsIdMutationBody = NonReadonly<Reward>
    export type PutRewardsIdMutationError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

    /**
 * @summary Update reward
 */
export const usePutRewardsId = <TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putRewardsId>>, TError,{rewardId: string;data: NonReadonly<Reward>}, TContext>, axios?: AxiosRequestConfig}
) => {

      const mutationOptions = getPutRewardsIdMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Check the reward redeem status for a passholder.


The caller of this request must have `REWARDS_REDEEM` permission for the given organizer.
 * @summary Check redeem status of a reward for a passholder
 */
export const getRewardsIdRedeemStatus = (
    rewardId: string,
    params: GetRewardsIdRedeemStatusParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<GetRewardsIdRedeemStatus200>> => {
    
    return axios.get(
      `NEXT_PUBLIC_API_PATH/rewards/${rewardId}/redeem-status`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetRewardsIdRedeemStatusQueryKey = (rewardId: string,
    params: GetRewardsIdRedeemStatusParams,) => {
    
    return [`NEXT_PUBLIC_API_PATH/rewards/${rewardId}/redeem-status`, ...(params ? [params]: [])] as const;
    }

    
export const getGetRewardsIdRedeemStatusInfiniteQueryOptions = <TData = Awaited<ReturnType<typeof getRewardsIdRedeemStatus>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(rewardId: string,
    params: GetRewardsIdRedeemStatusParams, options?: { query?:UseInfiniteQueryOptions<Awaited<ReturnType<typeof getRewardsIdRedeemStatus>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetRewardsIdRedeemStatusQueryKey(rewardId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getRewardsIdRedeemStatus>>> = ({ signal }) => getRewardsIdRedeemStatus(rewardId,params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(rewardId), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getRewardsIdRedeemStatus>>, TError, TData> & { queryKey: QueryKey }
}

export type GetRewardsIdRedeemStatusInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getRewardsIdRedeemStatus>>>
export type GetRewardsIdRedeemStatusInfiniteQueryError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

/**
 * @summary Check redeem status of a reward for a passholder
 */
export const useGetRewardsIdRedeemStatusInfinite = <TData = Awaited<ReturnType<typeof getRewardsIdRedeemStatus>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(
 rewardId: string,
    params: GetRewardsIdRedeemStatusParams, options?: { query?:UseInfiniteQueryOptions<Awaited<ReturnType<typeof getRewardsIdRedeemStatus>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetRewardsIdRedeemStatusInfiniteQueryOptions(rewardId,params,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

export const getGetRewardsIdRedeemStatusQueryOptions = <TData = Awaited<ReturnType<typeof getRewardsIdRedeemStatus>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(rewardId: string,
    params: GetRewardsIdRedeemStatusParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getRewardsIdRedeemStatus>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetRewardsIdRedeemStatusQueryKey(rewardId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getRewardsIdRedeemStatus>>> = ({ signal }) => getRewardsIdRedeemStatus(rewardId,params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(rewardId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getRewardsIdRedeemStatus>>, TError, TData> & { queryKey: QueryKey }
}

export type GetRewardsIdRedeemStatusQueryResult = NonNullable<Awaited<ReturnType<typeof getRewardsIdRedeemStatus>>>
export type GetRewardsIdRedeemStatusQueryError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

/**
 * @summary Check redeem status of a reward for a passholder
 */
export const useGetRewardsIdRedeemStatus = <TData = Awaited<ReturnType<typeof getRewardsIdRedeemStatus>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(
 rewardId: string,
    params: GetRewardsIdRedeemStatusParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getRewardsIdRedeemStatus>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetRewardsIdRedeemStatusQueryOptions(rewardId,params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * Redeem reward.

The caller of this request must have `REWARDS_REDEEM` permission for the given organizer.
 * @summary Redeem reward
 */
export const postRewardsRedeemed = (
    postRewardsRedeemedBody: PostRewardsRedeemedBody, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<RedeemedReward>> => {
    
    return axios.post(
      `NEXT_PUBLIC_API_PATH/rewards/redeemed`,
      postRewardsRedeemedBody,options
    );
  }



export const getPostRewardsRedeemedMutationOptions = <TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postRewardsRedeemed>>, TError,{data: PostRewardsRedeemedBody}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof postRewardsRedeemed>>, TError,{data: PostRewardsRedeemedBody}, TContext> => {
 const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postRewardsRedeemed>>, {data: PostRewardsRedeemedBody}> = (props) => {
          const {data} = props ?? {};

          return  postRewardsRedeemed(data,axiosOptions)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type PostRewardsRedeemedMutationResult = NonNullable<Awaited<ReturnType<typeof postRewardsRedeemed>>>
    export type PostRewardsRedeemedMutationBody = PostRewardsRedeemedBody
    export type PostRewardsRedeemedMutationError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

    /**
 * @summary Redeem reward
 */
export const usePostRewardsRedeemed = <TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postRewardsRedeemed>>, TError,{data: PostRewardsRedeemedBody}, TContext>, axios?: AxiosRequestConfig}
) => {

      const mutationOptions = getPostRewardsRedeemedMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Retrieve redeemed rewards for a passholder.

The caller of this request must have `REWARDS_READ` permission.
 * @summary Retrieve redeemed rewards
 */
export const getRewardsRedeemed = (
    params: GetRewardsRedeemedParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<RedeemedRewardsPaginatedResponse>> => {
    
    return axios.get(
      `NEXT_PUBLIC_API_PATH/rewards/redeemed`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetRewardsRedeemedQueryKey = (params: GetRewardsRedeemedParams,) => {
    
    return [`NEXT_PUBLIC_API_PATH/rewards/redeemed`, ...(params ? [params]: [])] as const;
    }

    
export const getGetRewardsRedeemedInfiniteQueryOptions = <TData = Awaited<ReturnType<typeof getRewardsRedeemed>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(params: GetRewardsRedeemedParams, options?: { query?:UseInfiniteQueryOptions<Awaited<ReturnType<typeof getRewardsRedeemed>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetRewardsRedeemedQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getRewardsRedeemed>>> = ({ signal }) => getRewardsRedeemed(params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getRewardsRedeemed>>, TError, TData> & { queryKey: QueryKey }
}

export type GetRewardsRedeemedInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getRewardsRedeemed>>>
export type GetRewardsRedeemedInfiniteQueryError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

/**
 * @summary Retrieve redeemed rewards
 */
export const useGetRewardsRedeemedInfinite = <TData = Awaited<ReturnType<typeof getRewardsRedeemed>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(
 params: GetRewardsRedeemedParams, options?: { query?:UseInfiniteQueryOptions<Awaited<ReturnType<typeof getRewardsRedeemed>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetRewardsRedeemedInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

export const getGetRewardsRedeemedQueryOptions = <TData = Awaited<ReturnType<typeof getRewardsRedeemed>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(params: GetRewardsRedeemedParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getRewardsRedeemed>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetRewardsRedeemedQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getRewardsRedeemed>>> = ({ signal }) => getRewardsRedeemed(params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getRewardsRedeemed>>, TError, TData> & { queryKey: QueryKey }
}

export type GetRewardsRedeemedQueryResult = NonNullable<Awaited<ReturnType<typeof getRewardsRedeemed>>>
export type GetRewardsRedeemedQueryError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>

/**
 * @summary Retrieve redeemed rewards
 */
export const useGetRewardsRedeemed = <TData = Awaited<ReturnType<typeof getRewardsRedeemed>>, TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>>(
 params: GetRewardsRedeemedParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getRewardsRedeemed>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetRewardsRedeemedQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

