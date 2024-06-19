import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useConfig } from "@/shared/feature-config/context/useConfig";

export const useSilexLogout = () => {
  const { publicRuntimeConfig } = useConfig();

  const { refetch } = useQuery<{ data: { token: string } }>({
    queryKey: ["logout"],
    queryFn: () => {
      const tokenEndpoint = publicRuntimeConfig?.legacyLogoutEndpoint;
      if (!tokenEndpoint)
        throw new Error(
          'Required env variable "NEXT_PUBLIC_LEGACY_LOGOUT_ENDPOINT" not set.'
        );

      return axios.get(tokenEndpoint, {
        withCredentials: true,
        headers: {
          Authorization: null,
        },
      });
    },
    enabled: false,
  });

  return refetch;
};
