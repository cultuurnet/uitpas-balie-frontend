import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';
import { useConfig } from '@/shared/feature-config/context/useConfig';

type UserInfo = {
  email: string;
  email_verified: boolean;
  given_name: string;
  'https://public.be/first_name': string;
  'https://public.be/uitidv1id': string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
};

type Props = {
  enabled?: boolean;
};

const queryKey = ['auth0', 'userInfo'];
const useGetUserInfo = ({ enabled = true }: Props) => {
  const { publicRuntimeConfig } = useConfig();
  const queryClient = useQueryClient();

  return {
    remove: () => queryClient.removeQueries({ queryKey }),
    ...useQuery({
      queryKey,
      queryFn: async () => {
        const session = await getSession();
        const response = await fetch(
          publicRuntimeConfig?.oauthUserInfoPath ?? '',
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken ?? ''}`,
            },
          },
        );
        if (!response.ok) throw new Error(response.statusText);
        const data = (await response.json()) as UserInfo;
        return { data };
      },
      enabled,
    }),
  };
};

export type { UserInfo };
export { useGetUserInfo };
