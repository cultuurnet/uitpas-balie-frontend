import { dateToISODateTimeString } from '@/shared/lib/utils';
import dayjs from 'dayjs';
import { GetEventsParams } from '@/shared/lib/dataAccess/search/generated/model';

export const getEventParams = (): GetEventsParams => {
  const dateFrom = dateToISODateTimeString(dayjs().startOf('day').toDate());
  const dateTo = dateToISODateTimeString(
    dayjs().add(30, 'days').startOf('day').toDate(),
  );

  return {
    embed: true,
    audienceType: '*',
    uitpas: true,
    dateFrom: dateFrom,
    dateTo: dateTo,
    availableFrom: '*',
    availableTo: '*',
    'sort[availableTo]': 'asc',
  };
};
