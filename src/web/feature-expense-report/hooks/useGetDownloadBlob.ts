import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useConfig } from '@/shared/feature-config/context/useConfig';

export const useGetOrganizersFinancialReportsReportIdZip = (
  organizerId: string | number,
  reportId: string | number,
  queryOptions: any,
) => {
  const { publicRuntimeConfig } = useConfig();

  return useQuery<Blob, Error>({
    queryKey: [],
    queryFn: async () => {
      const { data } = await axios.get(
        `${publicRuntimeConfig?.legacyApiPath}/organizers/${organizerId}/financial-reports/${reportId}.zip`,
      );
      return new Blob([data]); //,{type:"application/zip"});
    },
    ...queryOptions.query,
  });
};
