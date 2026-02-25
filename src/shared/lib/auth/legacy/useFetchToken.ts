import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useConfig } from '@/shared/feature-config/context/useConfig';

const queryKey = ['token'];
export const useFetchToken = () => {
  const { publicRuntimeConfig } = useConfig();
  const queryClient = useQueryClient();

  const { data, refetch, isFetching } = useQuery<{
    data: { token: string };
  }>({
    queryKey,
    queryFn: () => {
      const tokenEndpoint = publicRuntimeConfig?.legacyTokenEndpoint;
      if (!tokenEndpoint)
        throw new Error(
          'Required env variable "NEXT_PUBLIC_LEGACY_TOKEN_ENDPOINT" not set.',
        );

      return axios.get(tokenEndpoint, { withCredentials: true });
    },
    enabled: false,
    // cacheTime relates to the expiration of a specific value, while staleTime will be expiring the validity of a certain query.
    gcTime: 1000, // 1 second
    staleTime: 1000, // 1 second
  });

  const token = data?.data.token;

  return {
    token,
    isFetching,
    fetchToken: refetch,
    removeToken: () => queryClient.removeQueries({ queryKey }),
  };
};
