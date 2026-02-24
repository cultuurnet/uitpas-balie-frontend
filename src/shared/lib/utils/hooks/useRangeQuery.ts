import {
  DATE_FORMAT,
  getRangeDateFromSelection,
  TDateSelection,
} from '@/shared/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import dayjs from 'dayjs';

export function useRangeQuery() {
  const searchParams = useSearchParams();

  const rangeQuery = (searchParams.get('range') ??
    'next12Months') as keyof typeof TDateSelection;
  const fromParam = searchParams.get('from');
  const toParam = searchParams.get('to');

  const dateRange = useMemo(() => {
    return (fromParam || toParam) && rangeQuery === 'chooseDate'
      ? getRangeDateFromSelection(rangeQuery, {
          from: fromParam ? String(fromParam) : dayjs().format(DATE_FORMAT),
          to: toParam ? String(toParam) : dayjs().format(DATE_FORMAT),
        })
      : getRangeDateFromSelection(rangeQuery);
  }, [rangeQuery, fromParam, toParam]);

  return {
    rangeQuery,
    dateRange,
  };
}
