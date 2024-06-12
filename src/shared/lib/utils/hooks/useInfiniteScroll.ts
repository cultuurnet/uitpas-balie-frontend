import { QueryKey, UseQueryResult } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";

type ExtractParams<T> = T extends (params: infer P, options?: any) => any
  ? P
  : never;
type ExtractOptions<T> = T extends (params?: any, options?: infer O) => any
  ? O
  : never;

type UseInfiniteQueryProps<TQueryFn> = {
  queryFn: TQueryFn;
  queryParams: ExtractParams<TQueryFn>;
  fetchLimit?: number;
  initialSkip?: number;
};

export const useInfiniteQuery = <TData, TError, TParams, TOptions>({
  queryFn,
  queryParams,
  fetchLimit = 10,
  initialSkip = 0,
}: UseInfiniteQueryProps<
  (
    params: TParams,
    options?: TOptions
  ) => UseQueryResult<TData, TError> & { queryKey: QueryKey }
>) => {
  const [data, setData] = useState<TData[]>([]);
  const [start, setStart] = useState(initialSkip);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchNextPage = useCallback(async () => {
    if (isFetching || !hasMore) return;

    setIsFetching(true);
    try {
      const params = { ...queryParams, start, limit: fetchLimit } as TParams;
      const options: ExtractOptions<typeof queryFn> = {} as ExtractOptions<
        typeof queryFn
      >;
      const result = queryFn(params, options);
      const newData = (await result.data) as TData[];

      setData((prevData) => [...prevData, ...newData]);
      setStart((prevStart) => prevStart + fetchLimit);
      setHasMore(newData.length === fetchLimit);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setIsFetching(false);
    }
  }, [isFetching, hasMore, start, fetchLimit, queryFn, queryParams]);

  useEffect(() => {
    fetchNextPage();
  }, []);

  return { data, fetchNextPage, hasMore, isFetching, error };
};
