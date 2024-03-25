/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import { useMutation } from "@tanstack/react-query";
import type {
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";
import axios from "axios";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import type {
  Checkin,
  Error,
  ForbiddenResponse,
  UnauthorizedResponse,
} from "../model";

// https://stackoverflow.com/questions/49579094/typescript-conditional-types-filter-out-readonly-properties-pick-only-requir/49579497#49579497
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
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

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;
type DistributeReadOnlyOverUnions<T> = T extends any ? NonReadonly<T> : never;

type Writable<T> = Pick<T, WritableKeys<T>>;
type NonReadonly<T> = [T] extends [UnionToIntersection<T>]
  ? {
      [P in keyof Writable<T>]: T[P] extends object
        ? NonReadonly<NonNullable<T[P]>>
        : T[P];
    }
  : DistributeReadOnlyOverUnions<T>;

/**
 * Check in a passholder at a given event.

You will need:
- The `uitpasNumber` of the passholder
- The `eventId` of the UiTdatabank event.

> Checking in a passholder is only possible during the opening hours of the event and a certain period before and after. A client will receive an error of type `https://api.publiq.be/probs/uitpas/checkin-not-allowed` when a check-in is not allowed. The `endUserMessage` field of that error response will also contain a user-readable error message.

If you need to check-in a passholder based on a check-in code (e.g. a QR code), use [POST /passholders/passholderId/checkins](/reference/uitpas.json/paths/~1passholders~1passholderId~1  checkins/post) instead.

The caller of this request must have `CHECKINS_WRITE` permission for the organizer of the given event.

 * @summary Check in passholder
 */
export const postCheckins = (
  checkin: NonReadonly<Checkin>,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<Checkin>> => {
  return axios.post(`NEXT_PUBLIC_API_PATH/checkins`, checkin, options);
};

export const getPostCheckinsMutationOptions = <
  TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postCheckins>>,
    TError,
    { data: NonReadonly<Checkin> },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postCheckins>>,
  TError,
  { data: NonReadonly<Checkin> },
  TContext
> => {
  const { mutation: mutationOptions, axios: axiosOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postCheckins>>,
    { data: NonReadonly<Checkin> }
  > = (props) => {
    const { data } = props ?? {};

    return postCheckins(data, axiosOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostCheckinsMutationResult = NonNullable<
  Awaited<ReturnType<typeof postCheckins>>
>;
export type PostCheckinsMutationBody = NonReadonly<Checkin>;
export type PostCheckinsMutationError = AxiosError<
  Error | UnauthorizedResponse | ForbiddenResponse
>;

/**
 * @summary Check in passholder
 */
export const usePostCheckins = <
  TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postCheckins>>,
    TError,
    { data: NonReadonly<Checkin> },
    TContext
  >;
  axios?: AxiosRequestConfig;
}) => {
  const mutationOptions = getPostCheckinsMutationOptions(options);

  return useMutation(mutationOptions);
};
